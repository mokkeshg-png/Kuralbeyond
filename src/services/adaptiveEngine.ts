/**
 * Adaptive Difficulty Engine — Kuralbeyond
 *
 * Algorithm overview
 * ──────────────────
 * • 5 difficulty tiers:  1 = Starter, 2 = Easy, 3 = Medium, 4 = Hard, 5 = Expert
 * • Per-level question distribution (configurable in difficulty_config table):
 *     Default  →  70 % skill-appropriate  |  20 % challenge (+1 tier)  |  10 % revision (lower tier)
 * • Tier thresholds (configurable per level):
 *     Tier UP   after  3  consecutive correct answers
 *     Tier DOWN after  2  consecutive incorrect answers
 *     (Level 0-1 max tier: 2   |   Level 2-4 max tier: 3   |   Level 5-7 max tier: 4)
 * • Seeded shuffle: reproducible per (profileId + lessonId + questionIndex)
 *     → Same student sees same question order on retry; different students diverge
 * • Seen-question avoidance: DB tracks questions_seen[]; unseen preferred when available
 * • New-student cold start: tier = 1, adapts upward from first correct response
 * • Full localStorage fallback when Supabase is offline/unconfigured
 */

import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { Exercise, Question } from '../types';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface AdaptiveState {
  /** Current difficulty tier 1–5 */
  currentDifficultyTier: number;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  /** Question IDs seen in this (profile, lesson) context */
  questionsSeen: string[];
  /** Average mastery score 0–1 across all skills */
  skillAvg: number;
  /** Accuracy over last 10 responses for this lesson; null = new student */
  recentAccuracy: number | null;
  isNewStudent: boolean;
}

export interface DifficultyConfig {
  skillAppropriatePct: number; // default 70
  challengePct: number;        // default 20
  revisionPct: number;         // default 10
  streakUpThreshold: number;   // default 3
  streakDownThreshold: number; // default 2
}

export interface RecordResponseResult {
  newDifficultyTier: number;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  attemptNumber: number;
}

export interface AdaptiveExercisePlan {
  /** Flat list of questions in adaptive order */
  questions: Question[];
  /** Parallel array: difficulty tier for each question */
  difficultyTiers: number[];
  sessionId: string;
  adaptiveState: AdaptiveState;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DEFAULT_CONFIG: DifficultyConfig = {
  skillAppropriatePct: 70,
  challengePct: 20,
  revisionPct: 10,
  streakUpThreshold: 3,
  streakDownThreshold: 2,
};

/** Max tier allowed per level band (prevents too-hard questions at low levels) */
function maxTierForLevel(levelNumber: number): number {
  if (levelNumber <= 1) return 2;
  if (levelNumber <= 4) return 3;
  return 4;
}

// ─── Seeded PRNG (mulberry32) ─────────────────────────────────────────────────
// Reproducible shuffle: same (profile, lesson, offset) → same sequence

function mulberry32(seed: number): () => number {
  return function () {
    /* eslint-disable no-bitwise */
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    /* eslint-enable no-bitwise */
  };
}

function hashCode(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ─── Tier assignment heuristics ──────────────────────────────────────────────

/**
 * Assign a 1–5 difficulty tier to a question based on exercise type and level.
 * Exported so tests can verify assignments directly.
 */
export function assignQuestionTier(q: Question, levelNumber: number): number {
  const typeBaseTier: Record<string, number> = {
    vocab_card:   1,
    tracing:      1,
    mcq:          2,
    listening:    2,
    speaking:     2,
    matching:     2,
    fill_blank:   3,
    ordering:     3,
    reading:      3,
    story:        3,
  };

  let tier = typeBaseTier[q.exercise_type] ?? 2;

  // MCQ with only 2 options is simpler
  if (q.exercise_type === 'mcq' && q.options && q.options.length <= 2) {
    tier = Math.max(1, tier - 1);
  }

  // Boost tier for higher levels (+1 every 2 levels)
  const levelBoost = Math.floor(levelNumber / 2);
  tier = Math.min(5, tier + levelBoost);

  // Never exceed level max
  return Math.min(tier, maxTierForLevel(levelNumber));
}

// ─── Core selection algorithm ─────────────────────────────────────────────────

interface Rated { q: Question; tier: number }

function buildBuckets(
  withTiers: Rated[],
  targetTier: number,
  seenSet: Set<string>,
): { appropriate: Rated[]; challenge: Rated[]; revision: Rated[] } {
  const preferUnseen = (bucket: Rated[]) => {
    const unseen = bucket.filter(x => !seenSet.has(x.q.id));
    return unseen.length > 0 ? unseen : bucket; // fall back to seen if exhausted
  };

  return {
    appropriate: preferUnseen(withTiers.filter(x => x.tier === targetTier)),
    challenge:   preferUnseen(withTiers.filter(x => x.tier === targetTier + 1)),
    revision:    preferUnseen(withTiers.filter(x => x.tier <  targetTier)),
  };
}

export function selectAdaptiveQuestions(
  allQuestions: Question[],
  adaptiveState: AdaptiveState,
  config: DifficultyConfig,
  levelNumber: number,
  profileId: string,
  lessonId: string,
  questionIndexOffset = 0,
): { questions: Question[]; tiers: number[] } {
  if (allQuestions.length === 0) return { questions: [], tiers: [] };

  const withTiers: Rated[] = allQuestions.map(q => ({
    q,
    tier: assignQuestionTier(q, levelNumber),
  }));

  const targetTier = Math.min(
    adaptiveState.currentDifficultyTier,
    maxTierForLevel(levelNumber),
  );
  const seenSet = new Set(adaptiveState.questionsSeen);
  const seed    = hashCode(`${profileId}_${lessonId}_${questionIndexOffset}`);
  const shuffle = <T>(arr: T[]) => seededShuffle(arr, seed + arr.length);

  const total      = allQuestions.length;
  const nAppropriate = Math.max(1, Math.round((config.skillAppropriatePct / 100) * total));
  const nChallenge   = Math.round((config.challengePct / 100) * total);
  const nRevision    = Math.max(0, total - nAppropriate - nChallenge);

  const { appropriate, challenge, revision } = buildBuckets(withTiers, targetTier, seenSet);

  // Fallback when a bucket is empty: use adjacent tiers
  const nearFallback = withTiers.filter(x => Math.abs(x.tier - targetTier) <= 1);

  const picked: Rated[] = [];
  const pickedIds = new Set<string>();

  const addFrom = (bucket: Rated[], count: number) => {
    const source = shuffle(bucket.length > 0 ? bucket : shuffle(nearFallback));
    for (const item of source) {
      if (picked.length >= total) break;
      if (count <= 0) break;
      if (!pickedIds.has(item.q.id)) {
        picked.push(item);
        pickedIds.add(item.q.id);
        count--;
      }
    }
  };

  addFrom(appropriate, nAppropriate);
  addFrom(challenge,   nChallenge);
  addFrom(revision,    nRevision);

  // Fill any remaining slots (all questions may not perfectly divide)
  const remaining = shuffle(withTiers.filter(x => !pickedIds.has(x.q.id)));
  for (const item of remaining) {
    if (picked.length >= total) break;
    picked.push(item);
    pickedIds.add(item.q.id);
  }

  // Final seeded shuffle of the full selected set
  const finalOrder = seededShuffle(picked, seed + total + 13);

  return {
    questions: finalOrder.map(x => x.q),
    tiers:     finalOrder.map(x => x.tier),
  };
}

// ─── AdaptiveEngine class ─────────────────────────────────────────────────────

export class AdaptiveEngine {
  /** Fetch adaptive state from Supabase; localStorage fallback returns new-student defaults */
  static async getAdaptiveState(
    profileId: string,
    lessonId: string,
  ): Promise<AdaptiveState> {
    const fallback: AdaptiveState = {
      currentDifficultyTier: 1,
      consecutiveCorrect:    0,
      consecutiveIncorrect:  0,
      questionsSeen:         [],
      skillAvg:              0,
      recentAccuracy:        null,
      isNewStudent:          true,
    };

    if (!isSupabaseConfigured()) return fallback;

    try {
      const { data, error } = await (supabase.rpc as any)('get_adaptive_state', {
        p_profile_id: profileId,
        p_lesson_id:  lessonId,
      });
      if (error || !data) return fallback;
      const d = data as Record<string, unknown>;
      return {
        currentDifficultyTier: (d.current_difficulty_tier as number) ?? 1,
        consecutiveCorrect:    (d.consecutive_correct    as number) ?? 0,
        consecutiveIncorrect:  (d.consecutive_incorrect  as number) ?? 0,
        questionsSeen:         (d.questions_seen         as string[]) ?? [],
        skillAvg:              (d.skill_avg              as number) ?? 0,
        recentAccuracy:        d.recent_accuracy != null
                                 ? (d.recent_accuracy as number)
                                 : null,
        isNewStudent:          (d.is_new_student as boolean) ?? true,
      };
    } catch {
      return fallback;
    }
  }

  /** Load per-level difficulty config; DEFAULT_CONFIG fallback */
  static async getDifficultyConfig(levelNumber: number): Promise<DifficultyConfig> {
    if (!isSupabaseConfigured()) return DEFAULT_CONFIG;
    try {
      const { data, error } = await supabase
        .from('difficulty_config')
        .select('*')
        .eq('level_number', levelNumber)
        .single();
      if (error || !data) return DEFAULT_CONFIG;
      const d = data as Record<string, unknown>;
      return {
        skillAppropriatePct: (d.skill_appropriate_pct as number) ?? 70,
        challengePct:        (d.challenge_pct         as number) ?? 20,
        revisionPct:         (d.revision_pct          as number) ?? 10,
        streakUpThreshold:   (d.streak_up_threshold   as number) ?? 3,
        streakDownThreshold: (d.streak_down_threshold as number) ?? 2,
      };
    } catch {
      return DEFAULT_CONFIG;
    }
  }

  /** Persist a single question response; returns new tier */
  static async recordResponse(params: {
    profileId:      string;
    lessonId:       string;
    questionId:     string;
    skillType:      string;
    difficultyTier: number;
    isCorrect:      boolean;
    responseTimeMs: number;
    hintsUsed:      number;
    sessionId:      string;
  }): Promise<RecordResponseResult | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const { data, error } = await (supabase.rpc as any)(
        'record_question_response',
        {
          p_profile_id:      params.profileId,
          p_lesson_id:       params.lessonId,
          p_question_id:     params.questionId,
          p_skill_type:      params.skillType,
          p_difficulty_tier: params.difficultyTier,
          p_is_correct:      params.isCorrect,
          p_response_time_ms:params.responseTimeMs,
          p_hints_used:      params.hintsUsed,
          p_session_id:      params.sessionId,
        },
      );
      if (error || !data) return null;
      const d = data as Record<string, unknown>;
      return {
        newDifficultyTier:   (d.new_difficulty_tier   as number) ?? params.difficultyTier,
        consecutiveCorrect:  (d.consecutive_correct   as number) ?? 0,
        consecutiveIncorrect:(d.consecutive_incorrect as number) ?? 0,
        attemptNumber:       (d.attempt_number        as number) ?? 1,
      };
    } catch {
      return null;
    }
  }

  /**
   * Full pipeline: given a lesson's exercises, return an adaptively ordered
   * flat question list with difficulty tiers assigned per student history.
   */
  static async prepareAdaptiveExercises(
    exercises:   Exercise[],
    profileId:   string,
    lessonId:    string,
    levelNumber: number,
  ): Promise<AdaptiveExercisePlan> {
    const sessionId = `${profileId.slice(0, 8)}_${lessonId}_${Date.now()}`;

    // Parallel fetch — both can run concurrently
    const [adaptiveState, config] = await Promise.all([
      this.getAdaptiveState(profileId, lessonId),
      this.getDifficultyConfig(levelNumber),
    ]);

    // Flatten all questions from all exercises
    const allQuestions = exercises.flatMap(ex => ex.questions ?? []);

    if (allQuestions.length === 0) {
      return { questions: [], difficultyTiers: [], sessionId, adaptiveState };
    }

    const { questions, tiers } = selectAdaptiveQuestions(
      allQuestions,
      adaptiveState,
      config,
      levelNumber,
      profileId,
      lessonId,
    );

    return { questions, difficultyTiers: tiers, sessionId, adaptiveState };
  }
}

// ─── Lightweight in-session state (avoids DB round-trips per question) ────────

interface SessionState {
  tier:      number;
  sessionId: string;
}

let _session: SessionState | null = null;

export function initAdaptiveSession(tier: number, sessionId: string): void {
  _session = { tier, sessionId };
}

export function getSessionTier(): number {
  return _session?.tier ?? 1;
}

export function getSessionId(): string {
  return _session?.sessionId ?? '';
}

export function updateSessionTier(newTier: number): void {
  if (_session) _session.tier = newTier;
}

/** Human-readable label for a difficulty tier */
export function tierLabel(tier: number): string {
  switch (tier) {
    case 1: return '★ Starter';
    case 2: return '★★ Easy';
    case 3: return '★★★ Medium';
    case 4: return '★★★★ Hard';
    case 5: return '★★★★★ Expert';
    default: return '★★ Easy';
  }
}

/** Tailwind colour classes for a difficulty tier badge */
export function tierBadgeClass(tier: number): string {
  switch (tier) {
    case 1: return 'bg-leaf-surface text-leaf';
    case 2: return 'bg-teal-surface text-teal';
    case 3: return 'bg-gold-surface text-ink';
    case 4: return 'bg-sand text-ink-muted';
    case 5: return 'bg-maroon/10 text-maroon';
    default: return 'bg-teal-surface text-teal';
  }
}
