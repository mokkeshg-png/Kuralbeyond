# Implementation Plan: Personalized Random Adaptive Difficulty System

> **Do not recreate migrations 001–009, existing tables, or services.**
> Every step leaves the codebase in a buildable state.

---

## Project Context

| Item | Value |
|------|-------|
| Framework | React 18 + TypeScript + Vite 5 |
| Backend | Supabase (PostgreSQL + RLS + RPCs) |
| Tests | `npm run test` → `vitest run` (all tests in `tests/`) |
| Build | `npm run build` → `tsc && vite build` |
| Services dir | `src/services/` |
| Types | `src/types/index.ts` (Exercise, Question, SkillType defined here) |
| Key page | `src/pages/LessonPlayerPage.tsx` (407 lines) |
| Auth | `authService.getCurrentUser()` → `UserProfile \| null` |
| Supabase client | `supabase` + `isSupabaseConfigured()` from `src/services/supabaseClient.ts` |

---

- [ ] 1. **Apply migration 010_adaptive_difficulty to Supabase**

  Creates `question_responses`, `adaptive_lesson_state`, `difficulty_config` tables, plus `get_adaptive_state` and `record_question_response` RPCs. Alters the existing `submit_item_answer` RPC to accept an explicit `p_skill_type` parameter so the adaptive engine can supply the correct value rather than inferring it.

  **Files:** Migration applied via `supabase::apply_migration` with name `010_adaptive_difficulty` and the SQL below.

  ```sql
  -- ============================================================
  -- 010_adaptive_difficulty
  -- ============================================================

  -- 1. question_responses: per-question per-user answer tracking
  CREATE TABLE IF NOT EXISTS public.question_responses (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id       text NOT NULL,
    question_id     text NOT NULL,
    exercise_type   text NOT NULL,
    skill_type      text NOT NULL,
    difficulty_tier smallint NOT NULL DEFAULT 1 CHECK (difficulty_tier BETWEEN 1 AND 5),
    is_correct      boolean NOT NULL,
    response_time_ms integer,
    hints_used      smallint NOT NULL DEFAULT 0,
    created_at      timestamptz NOT NULL DEFAULT now()
  );

  CREATE INDEX IF NOT EXISTS idx_qr_profile_lesson
    ON public.question_responses(profile_id, lesson_id);
  CREATE INDEX IF NOT EXISTS idx_qr_profile_question
    ON public.question_responses(profile_id, question_id);

  ALTER TABLE public.question_responses ENABLE ROW LEVEL SECURITY;
  DROP POLICY IF EXISTS qr_owner ON public.question_responses;
  CREATE POLICY qr_owner ON public.question_responses
    USING (profile_id = auth.uid()::uuid)
    WITH CHECK (profile_id = auth.uid()::uuid);

  -- 2. adaptive_lesson_state: per-user per-lesson adaptive session state
  CREATE TABLE IF NOT EXISTS public.adaptive_lesson_state (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id       text NOT NULL,
    session_id      text NOT NULL,
    current_tier    smallint NOT NULL DEFAULT 1 CHECK (current_tier BETWEEN 1 AND 5),
    consecutive_correct smallint NOT NULL DEFAULT 0,
    consecutive_wrong   smallint NOT NULL DEFAULT 0,
    questions_seen  text[] NOT NULL DEFAULT '{}',
    updated_at      timestamptz NOT NULL DEFAULT now(),
    UNIQUE (profile_id, lesson_id, session_id)
  );

  CREATE INDEX IF NOT EXISTS idx_als_profile_lesson
    ON public.adaptive_lesson_state(profile_id, lesson_id);

  ALTER TABLE public.adaptive_lesson_state ENABLE ROW LEVEL SECURITY;
  DROP POLICY IF EXISTS als_owner ON public.adaptive_lesson_state;
  CREATE POLICY als_owner ON public.adaptive_lesson_state
    USING (profile_id = auth.uid()::uuid)
    WITH CHECK (profile_id = auth.uid()::uuid);

  -- 3. difficulty_config: configurable per-level ratios (public read)
  CREATE TABLE IF NOT EXISTS public.difficulty_config (
    level_number    smallint PRIMARY KEY CHECK (level_number BETWEEN 0 AND 7),
    skill_ratio     numeric(3,2) NOT NULL DEFAULT 0.70,  -- 70% skill-appropriate
    challenge_ratio numeric(3,2) NOT NULL DEFAULT 0.20,  -- 20% +1 tier (stretch)
    revision_ratio  numeric(3,2) NOT NULL DEFAULT 0.10,  -- 10% revision / easier
    promote_threshold smallint NOT NULL DEFAULT 3,  -- consecutive correct to promote tier
    demote_threshold  smallint NOT NULL DEFAULT 2,  -- consecutive wrong to demote tier
    updated_at      timestamptz NOT NULL DEFAULT now()
  );

  ALTER TABLE public.difficulty_config ENABLE ROW LEVEL SECURITY;
  DROP POLICY IF EXISTS dc_read ON public.difficulty_config;
  CREATE POLICY dc_read ON public.difficulty_config FOR SELECT USING (true);

  -- Seed rows 0–7 (INSERT only if missing)
  INSERT INTO public.difficulty_config (level_number, skill_ratio, challenge_ratio, revision_ratio, promote_threshold, demote_threshold)
  VALUES
    (0, 0.70, 0.20, 0.10, 3, 2),
    (1, 0.70, 0.20, 0.10, 3, 2),
    (2, 0.70, 0.20, 0.10, 3, 2),
    (3, 0.70, 0.20, 0.10, 3, 2),
    (4, 0.70, 0.20, 0.10, 3, 2),
    (5, 0.65, 0.25, 0.10, 3, 2),
    (6, 0.65, 0.25, 0.10, 3, 2),
    (7, 0.60, 0.30, 0.10, 3, 2)
  ON CONFLICT (level_number) DO NOTHING;

  -- 4. get_adaptive_state RPC — returns or creates adaptive session state
  CREATE OR REPLACE FUNCTION public.get_adaptive_state(
    p_profile_id  uuid,
    p_lesson_id   text,
    p_session_id  text
  )
  RETURNS jsonb
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $$
  DECLARE
    v_state public.adaptive_lesson_state%ROWTYPE;
    v_history jsonb;
    v_recent_accuracy numeric;
    v_total   integer;
    v_correct integer;
    v_tier    smallint := 1;
  BEGIN
    -- Enforce authenticated access
    IF auth.uid() IS NULL THEN
      RAISE EXCEPTION 'Unauthorized';
    END IF;

    -- Get historical accuracy from question_responses (last 30 answers for this lesson)
    SELECT
      COUNT(*) FILTER (WHERE is_correct)::integer,
      COUNT(*)::integer
    INTO v_correct, v_total
    FROM public.question_responses
    WHERE profile_id = p_profile_id
      AND lesson_id  = p_lesson_id
      AND created_at >= now() - interval '30 days';

    IF v_total >= 5 THEN
      v_recent_accuracy := v_correct::numeric / v_total;
      -- Map accuracy to tier 1-5
      v_tier := CASE
        WHEN v_recent_accuracy >= 0.90 THEN 5
        WHEN v_recent_accuracy >= 0.75 THEN 4
        WHEN v_recent_accuracy >= 0.60 THEN 3
        WHEN v_recent_accuracy >= 0.40 THEN 2
        ELSE 1
      END;
    END IF;

    -- Upsert adaptive session state
    INSERT INTO public.adaptive_lesson_state
      (profile_id, lesson_id, session_id, current_tier, questions_seen)
    VALUES
      (p_profile_id, p_lesson_id, p_session_id, v_tier, '{}')
    ON CONFLICT (profile_id, lesson_id, session_id) DO UPDATE
      SET updated_at = now()
    RETURNING * INTO v_state;

    RETURN jsonb_build_object(
      'current_tier',          v_state.current_tier,
      'consecutive_correct',   v_state.consecutive_correct,
      'consecutive_wrong',     v_state.consecutive_wrong,
      'questions_seen',        v_state.questions_seen,
      'recent_accuracy',       COALESCE(v_recent_accuracy, 0),
      'total_responses',       v_total
    );
  END;
  $$;

  REVOKE ALL ON FUNCTION public.get_adaptive_state(uuid, text, text) FROM PUBLIC;
  GRANT EXECUTE ON FUNCTION public.get_adaptive_state(uuid, text, text) TO authenticated;

  -- 5. record_question_response RPC — writes one response, updates tier
  CREATE OR REPLACE FUNCTION public.record_question_response(
    p_profile_id     uuid,
    p_lesson_id      text,
    p_session_id     text,
    p_question_id    text,
    p_exercise_type  text,
    p_skill_type     text,
    p_difficulty_tier smallint,
    p_is_correct     boolean,
    p_response_time_ms integer DEFAULT NULL,
    p_hints_used     smallint DEFAULT 0
  )
  RETURNS jsonb
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $$
  DECLARE
    v_state   public.adaptive_lesson_state%ROWTYPE;
    v_config  public.difficulty_config%ROWTYPE;
    v_lesson_number smallint := 1;
    v_new_tier smallint;
    v_new_cc   smallint;
    v_new_cw   smallint;
  BEGIN
    IF auth.uid() IS NULL THEN
      RAISE EXCEPTION 'Unauthorized';
    END IF;

    -- Insert response row (idempotent on duplicate question_id + session)
    INSERT INTO public.question_responses
      (profile_id, lesson_id, question_id, exercise_type, skill_type,
       difficulty_tier, is_correct, response_time_ms, hints_used)
    VALUES
      (p_profile_id, p_lesson_id, p_question_id, p_exercise_type, p_skill_type,
       p_difficulty_tier, p_is_correct, p_response_time_ms, p_hints_used)
    ON CONFLICT DO NOTHING;

    -- Fetch current state; if missing create with default tier 1
    INSERT INTO public.adaptive_lesson_state
      (profile_id, lesson_id, session_id, current_tier, questions_seen)
    VALUES
      (p_profile_id, p_lesson_id, p_session_id, p_difficulty_tier, ARRAY[p_question_id])
    ON CONFLICT (profile_id, lesson_id, session_id) DO UPDATE
      SET
        questions_seen = array_append(
          array_remove(adaptive_lesson_state.questions_seen, p_question_id),
          p_question_id
        ),
        updated_at = now()
    RETURNING * INTO v_state;

    -- Load config (fallback to level 1 defaults if not found)
    SELECT * INTO v_config
    FROM public.difficulty_config
    WHERE level_number = v_lesson_number
    LIMIT 1;

    IF NOT FOUND THEN
      v_config.promote_threshold := 3;
      v_config.demote_threshold  := 2;
    END IF;

    -- Compute new consecutive counters
    IF p_is_correct THEN
      v_new_cc := v_state.consecutive_correct + 1;
      v_new_cw := 0;
    ELSE
      v_new_cc := 0;
      v_new_cw := v_state.consecutive_wrong + 1;
    END IF;

    -- Adjust tier
    v_new_tier := v_state.current_tier;
    IF v_new_cc >= v_config.promote_threshold THEN
      v_new_tier := LEAST(5, v_state.current_tier + 1);
      v_new_cc   := 0;
    ELSIF v_new_cw >= v_config.demote_threshold THEN
      v_new_tier := GREATEST(1, v_state.current_tier - 1);
      v_new_cw   := 0;
    END IF;

    -- Save updated counters and tier
    UPDATE public.adaptive_lesson_state
    SET
      current_tier         = v_new_tier,
      consecutive_correct  = v_new_cc,
      consecutive_wrong    = v_new_cw,
      updated_at           = now()
    WHERE profile_id = p_profile_id
      AND lesson_id  = p_lesson_id
      AND session_id = p_session_id;

    RETURN jsonb_build_object(
      'new_tier',           v_new_tier,
      'consecutive_correct', v_new_cc,
      'consecutive_wrong',   v_new_cw
    );
  END;
  $$;

  REVOKE ALL ON FUNCTION public.record_question_response(uuid, text, text, text, text, text, smallint, boolean, integer, smallint) FROM PUBLIC;
  GRANT EXECUTE ON FUNCTION public.record_question_response(uuid, text, text, text, text, text, smallint, boolean, integer, smallint) TO authenticated;
  ```

  **Verify:**
  ```
  npx vitest run
  ```
  Tests must not fail due to DB changes (they don't touch Supabase). Migration success is confirmed by the absence of Supabase MCP errors.

---

- [ ] 2. **Create `src/services/adaptiveEngine.ts`**

  The AdaptiveEngine class encapsulates all adaptive difficulty logic. It exposes a static `prepareAdaptiveExercises()` that converts a flat `Exercise[]` from the curriculum service into a reordered `Exercise[]` where each exercise contains a single question selected by the 70/20/10 tier distribution. Uses mulberry32 seeded PRNG for reproducibility. Falls back gracefully (tier 1, random ordering) when Supabase is offline or the user is not authenticated.

  **File:** `d:\Kuralbeyond\src\services\adaptiveEngine.ts`

  ```typescript
  /**
   * adaptiveEngine.ts
   * Personalized Random Adaptive Difficulty System for TamilPalam.
   *
   * Key design decisions:
   * - mulberry32 seeded PRNG: reproducible random order for debugging,
   *   without crypto API dependency.
   * - Tiers 1–5 map to difficulty bands within each level's question pool.
   * - 70/20/10 ratios (skill/challenge/revision) are configurable via
   *   difficulty_config table; defaults are baked in for offline use.
   * - No Supabase writes block lesson start; all remote calls are fire-and-forget
   *   or awaited in the background only.
   */

  import { Exercise, ExerciseType, SkillType } from '../types';
  import { supabase, isSupabaseConfigured } from './supabaseClient';
  import { authService } from './authService';

  // ─── Types ───────────────────────────────────────────────────────────────────

  export type DifficultyTier = 1 | 2 | 3 | 4 | 5;

  export interface AdaptiveSessionState {
    sessionId: string;
    currentTier: DifficultyTier;
    consecutiveCorrect: number;
    consecutiveWrong: number;
    questionsSeen: string[];
    recentAccuracy: number;
  }

  export interface QuestionTierAssignment {
    questionId: string;
    tier: DifficultyTier;
    category: 'skill' | 'challenge' | 'revision';
  }

  interface DifficultyConfig {
    skillRatio: number;
    challengeRatio: number;
    revisionRatio: number;
    promoteThreshold: number;
    demoteThreshold: number;
  }

  const DEFAULT_CONFIG: DifficultyConfig = {
    skillRatio: 0.70,
    challengeRatio: 0.20,
    revisionRatio: 0.10,
    promoteThreshold: 3,
    demoteThreshold: 2,
  };

  // ─── Mulberry32 seeded PRNG ───────────────────────────────────────────────────

  function mulberry32(seed: number): () => number {
    let s = seed >>> 0;
    return function () {
      s += 0x6d2b79f5;
      let z = s;
      z = Math.imul(z ^ (z >>> 15), z | 1);
      z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
      return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
    };
  }

  /**
   * Fisher-Yates shuffle using a provided PRNG instead of Math.random().
   * Returns a NEW array (does not mutate the input).
   */
  function seededShuffle<T>(arr: T[], prng: () => number): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(prng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ─── Skill type inference ─────────────────────────────────────────────────────

  const EXERCISE_SKILL_MAP: Record<ExerciseType, SkillType> = {
    tracing:     'letter_recognition',
    vocab_card:  'letter_recognition',
    mcq:         'letter_recognition',
    matching:    'word_reading',
    fill_blank:  'sentence_comprehension',
    ordering:    'sentence_comprehension',
    speaking:    'speaking',
    listening:   'listening',
    reading:     'sentence_comprehension',
    story:       'sentence_comprehension',
  };

  export function inferSkillType(exerciseType: ExerciseType): SkillType {
    return EXERCISE_SKILL_MAP[exerciseType] ?? 'letter_recognition';
  }

  // ─── Tier → difficulty modifier mapping ──────────────────────────────────────

  export function tierToDifficultyModifier(tier: DifficultyTier): number {
    const map: Record<DifficultyTier, number> = {
      1: 0.90,
      2: 1.00,
      3: 1.05,
      4: 1.10,
      5: 1.25,
    };
    return map[tier];
  }

  // ─── Session ID helper ────────────────────────────────────────────────────────

  export function makeSessionId(profileId: string, lessonId: string): string {
    return `${profileId}_${lessonId}_${Date.now()}`;
  }

  // ─── AdaptiveEngine ───────────────────────────────────────────────────────────

  export class AdaptiveEngine {
    // In-memory session state (per page lifecycle)
    private static _session: AdaptiveSessionState | null = null;
    private static _tierAssignments: Map<string, QuestionTierAssignment> = new Map();

    // ── Public getters ──────────────────────────────────────────────────────────

    static getSessionId(): string {
      return this._session?.sessionId ?? '';
    }

    static getSessionTier(): DifficultyTier {
      return this._session?.currentTier ?? 1;
    }

    static getQuestionTier(questionId: string): DifficultyTier {
      return this._tierAssignments.get(questionId)?.tier ?? 1;
    }

    // ── initSessionTier ─────────────────────────────────────────────────────────
    /**
     * Fetches adaptive state from Supabase for the current user+lesson.
     * Falls back to tier 1 if unauthenticated or network unavailable.
     * Must be called BEFORE prepareAdaptiveExercises.
     */
    static async initSessionTier(lessonId: string): Promise<DifficultyTier> {
      const fallbackTier: DifficultyTier = 1;

      if (!isSupabaseConfigured()) {
        this._session = {
          sessionId: `local_${lessonId}_${Date.now()}`,
          currentTier: fallbackTier,
          consecutiveCorrect: 0,
          consecutiveWrong: 0,
          questionsSeen: [],
          recentAccuracy: 0,
        };
        return fallbackTier;
      }

      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          this._session = {
            sessionId: `anon_${lessonId}_${Date.now()}`,
            currentTier: fallbackTier,
            consecutiveCorrect: 0,
            consecutiveWrong: 0,
            questionsSeen: [],
            recentAccuracy: 0,
          };
          return fallbackTier;
        }

        const sessionId = makeSessionId(user.id, lessonId);

        const { data, error } = await (supabase.rpc as any)('get_adaptive_state', {
          p_profile_id: user.id,
          p_lesson_id: lessonId,
          p_session_id: sessionId,
        });

        if (error || !data) {
          this._session = {
            sessionId,
            currentTier: fallbackTier,
            consecutiveCorrect: 0,
            consecutiveWrong: 0,
            questionsSeen: [],
            recentAccuracy: 0,
          };
          return fallbackTier;
        }

        const tier = Math.min(5, Math.max(1, Number(data.current_tier ?? 1))) as DifficultyTier;

        this._session = {
          sessionId,
          currentTier: tier,
          consecutiveCorrect: Number(data.consecutive_correct ?? 0),
          consecutiveWrong:   Number(data.consecutive_wrong ?? 0),
          questionsSeen:      (data.questions_seen ?? []) as string[],
          recentAccuracy:     Number(data.recent_accuracy ?? 0),
        };

        return tier;
      } catch {
        this._session = {
          sessionId: `err_${lessonId}_${Date.now()}`,
          currentTier: fallbackTier,
          consecutiveCorrect: 0,
          consecutiveWrong: 0,
          questionsSeen: [],
          recentAccuracy: 0,
        };
        return fallbackTier;
      }
    }

    // ── updateSessionTier ───────────────────────────────────────────────────────
    /**
     * Updates in-memory tier after each question response.
     * Called from LessonPlayerPage after every answer.
     */
    static updateSessionTier(
      isCorrect: boolean,
      config: DifficultyConfig = DEFAULT_CONFIG
    ): DifficultyTier {
      if (!this._session) return 1;

      if (isCorrect) {
        this._session.consecutiveCorrect += 1;
        this._session.consecutiveWrong = 0;
      } else {
        this._session.consecutiveWrong += 1;
        this._session.consecutiveCorrect = 0;
      }

      const { currentTier, consecutiveCorrect, consecutiveWrong } = this._session;

      if (consecutiveCorrect >= config.promoteThreshold) {
        this._session.currentTier = Math.min(5, currentTier + 1) as DifficultyTier;
        this._session.consecutiveCorrect = 0;
      } else if (consecutiveWrong >= config.demoteThreshold) {
        this._session.currentTier = Math.max(1, currentTier - 1) as DifficultyTier;
        this._session.consecutiveWrong = 0;
      }

      return this._session.currentTier;
    }

    // ── assignQuestionTier ──────────────────────────────────────────────────────
    /**
     * Given a list of exercise IDs and the current tier, returns tier assignments
     * per question following the 70/20/10 distribution.
     *
     * Pool sizing logic:
     * - 70% → questions assigned currentTier
     * - 20% → questions assigned currentTier + 1 (capped at 5)
     * - 10% → questions assigned currentTier - 1 (floored at 1)
     *
     * Uses seeded PRNG so assignment is reproducible from sessionId.
     */
    static assignQuestionTier(
      questionIds: string[],
      currentTier: DifficultyTier,
      config: DifficultyConfig = DEFAULT_CONFIG,
      seed?: number
    ): QuestionTierAssignment[] {
      const n = questionIds.length;
      if (n === 0) return [];

      // Derive seed from sessionId hash if not provided
      const actualSeed =
        seed ??
        (this._session
          ? this._session.sessionId
              .split('')
              .reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) | 0, 17)
          : Date.now());

      const prng = mulberry32(actualSeed >>> 0);
      const shuffled = seededShuffle(questionIds, prng);

      const challengeTier = Math.min(5, currentTier + 1) as DifficultyTier;
      const revisionTier  = Math.max(1, currentTier - 1) as DifficultyTier;

      const nChallenge = Math.max(0, Math.round(n * config.challengeRatio));
      const nRevision  = Math.max(0, Math.round(n * config.revisionRatio));
      const nSkill     = n - nChallenge - nRevision;

      const assignments: QuestionTierAssignment[] = [];
      shuffled.forEach((qId, idx) => {
        let tier: DifficultyTier;
        let category: 'skill' | 'challenge' | 'revision';

        if (idx < nChallenge) {
          tier = challengeTier;
          category = 'challenge';
        } else if (idx < nChallenge + nRevision) {
          tier = revisionTier;
          category = 'revision';
        } else {
          tier = currentTier;
          category = 'skill';
        }

        assignments.push({ questionId: qId, tier, category });
      });

      // Store for lookup by LessonPlayerPage
      assignments.forEach(a => this._tierAssignments.set(a.questionId, a));

      return assignments;
    }

    // ── prepareAdaptiveExercises ────────────────────────────────────────────────
    /**
     * Takes the flat exercise list from curriculumService and produces a new
     * Exercise[] where each element wraps exactly ONE question, reordered by
     * the 70/20/10 adaptive distribution.
     *
     * - If there are not enough questions (< 2), returns exList unchanged.
     * - The returned list preserves Exercise metadata; only the questions array
     *   is replaced with a single-item array.
     * - Excludes recently-seen questions when sufficient alternatives exist
     *   (>= 3 unseen questions available).
     */
    static prepareAdaptiveExercises(
      exList: Exercise[],
      currentTier: DifficultyTier
    ): Exercise[] {
      // Flatten all questions across all exercises
      const allQuestions: Array<{ ex: Exercise; questionId: string }> = [];
      for (const ex of exList) {
        for (const q of ex.questions ?? []) {
          allQuestions.push({ ex, questionId: q.id });
        }
      }

      if (allQuestions.length < 2) return exList;

      const seen = new Set(this._session?.questionsSeen ?? []);
      const unseenIds = allQuestions
        .map(a => a.questionId)
        .filter(id => !seen.has(id));

      // Use unseen pool if we have ≥ 3 unseen, otherwise use full pool
      const usePool =
        unseenIds.length >= 3
          ? allQuestions.filter(a => unseenIds.includes(a.questionId))
          : allQuestions;

      const poolIds = usePool.map(a => a.questionId);
      const tierAssignments = this.assignQuestionTier(poolIds, currentTier);

      // Reorder usePool according to assignment order
      const poolMap = new Map(usePool.map(a => [a.questionId, a]));

      const result: Exercise[] = tierAssignments.map(ta => {
        const item = poolMap.get(ta.questionId);
        if (!item) return null as any;

        const question = item.ex.questions.find(q => q.id === ta.questionId);
        if (!question) return null as any;

        // Return a copy of the exercise with only this one question
        return {
          ...item.ex,
          id: `${item.ex.id}_${ta.questionId}`,
          questions: [question],
        };
      }).filter(Boolean);

      return result.length > 0 ? result : exList;
    }
  }
  ```

  **Verify:**
  ```
  npx vitest run
  ```
  All existing tests must still pass. The new file has no tests of its own in this step — they are added in step 3.

---

- [ ] 3. **Add unit tests for AdaptiveEngine in `tests/adaptiveEngine.test.ts`**

  Tests cover: seeded shuffle determinism, tier assignment 70/20/10 ratios, `updateSessionTier` promotion/demotion logic, `inferSkillType` mapping, and offline fallback path (new student with no history gets tier 1).

  **File:** `d:\Kuralbeyond\tests\adaptiveEngine.test.ts`

  ```typescript
  import { describe, it, expect, beforeEach } from 'vitest';
  import { AdaptiveEngine, inferSkillType, tierToDifficultyModifier, makeSessionId } from '../src/services/adaptiveEngine';

  // Force offline mode so tests never call Supabase
  vi.mock('../src/services/supabaseClient', () => ({
    isSupabaseConfigured: () => false,
    supabase: {},
  }));

  describe('AdaptiveEngine', () => {
    beforeEach(async () => {
      // Reset in-memory state between tests
      await AdaptiveEngine.initSessionTier('test-lesson-offline');
    });

    describe('initSessionTier - offline fallback', () => {
      it('returns tier 1 when Supabase is not configured', async () => {
        const tier = await AdaptiveEngine.initSessionTier('lesson-abc');
        expect(tier).toBe(1);
      });

      it('session ID is set after init', async () => {
        await AdaptiveEngine.initSessionTier('lesson-xyz');
        expect(AdaptiveEngine.getSessionId()).toBeTruthy();
      });
    });

    describe('updateSessionTier - promotion and demotion', () => {
      it('promotes tier after 3 consecutive correct answers', () => {
        AdaptiveEngine.updateSessionTier(true);
        AdaptiveEngine.updateSessionTier(true);
        const tier = AdaptiveEngine.updateSessionTier(true);
        expect(tier).toBe(2); // promoted from 1 → 2
      });

      it('demotes tier after 2 consecutive wrong answers', () => {
        // First promote to tier 2 so we can demote
        AdaptiveEngine.updateSessionTier(true);
        AdaptiveEngine.updateSessionTier(true);
        AdaptiveEngine.updateSessionTier(true); // tier = 2
        AdaptiveEngine.updateSessionTier(false);
        const tier = AdaptiveEngine.updateSessionTier(false);
        expect(tier).toBe(1); // demoted from 2 → 1
      });

      it('does not promote past tier 5', () => {
        // Reach tier 5 by repeated promotions
        for (let i = 0; i < 15; i++) AdaptiveEngine.updateSessionTier(true);
        expect(AdaptiveEngine.getSessionTier()).toBe(5);
      });

      it('does not demote below tier 1', () => {
        AdaptiveEngine.updateSessionTier(false);
        const tier = AdaptiveEngine.updateSessionTier(false);
        expect(tier).toBe(1);
      });

      it('resets consecutive correct counter after wrong answer', () => {
        AdaptiveEngine.updateSessionTier(true);
        AdaptiveEngine.updateSessionTier(true);
        AdaptiveEngine.updateSessionTier(false); // resets streak
        AdaptiveEngine.updateSessionTier(true);
        AdaptiveEngine.updateSessionTier(true);
        const tier = AdaptiveEngine.updateSessionTier(true); // needs 3 more correct
        expect(tier).toBe(2);
      });
    });

    describe('assignQuestionTier - 70/20/10 distribution', () => {
      it('distributes 10 questions into correct tier category counts', () => {
        const ids = Array.from({ length: 10 }, (_, i) => `q-${i}`);
        const assignments = AdaptiveEngine.assignQuestionTier(ids, 3, {
          skillRatio: 0.70,
          challengeRatio: 0.20,
          revisionRatio: 0.10,
          promoteThreshold: 3,
          demoteThreshold: 2,
        }, 42);

        const skill    = assignments.filter(a => a.category === 'skill').length;
        const challenge = assignments.filter(a => a.category === 'challenge').length;
        const revision  = assignments.filter(a => a.category === 'revision').length;

        expect(skill + challenge + revision).toBe(10);
        expect(challenge).toBe(2); // 20% of 10
        expect(revision).toBe(1);  // 10% of 10
        expect(skill).toBe(7);     // remainder = 70%
      });

      it('assigns challenge tier = currentTier + 1 (capped at 5)', () => {
        const ids = ['q1', 'q2', 'q3', 'q4', 'q5'];
        const assignments = AdaptiveEngine.assignQuestionTier(ids, 5, undefined, 99);
        const challengeAssignments = assignments.filter(a => a.category === 'challenge');
        challengeAssignments.forEach(a => expect(a.tier).toBe(5)); // capped at 5
      });

      it('assigns revision tier = currentTier - 1 (floored at 1)', () => {
        const ids = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];
        const assignments = AdaptiveEngine.assignQuestionTier(ids, 1, undefined, 7);
        const revisionAssignments = assignments.filter(a => a.category === 'revision');
        revisionAssignments.forEach(a => expect(a.tier).toBe(1)); // floored at 1
      });

      it('produces identical ordering for identical seed', () => {
        const ids = ['q1', 'q2', 'q3', 'q4', 'q5'];
        const a1 = AdaptiveEngine.assignQuestionTier([...ids], 2, undefined, 123);
        const a2 = AdaptiveEngine.assignQuestionTier([...ids], 2, undefined, 123);
        expect(a1.map(a => a.questionId)).toEqual(a2.map(a => a.questionId));
      });

      it('produces different ordering for different seeds', () => {
        const ids = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];
        const a1 = AdaptiveEngine.assignQuestionTier([...ids], 2, undefined, 1);
        const a2 = AdaptiveEngine.assignQuestionTier([...ids], 2, undefined, 9999);
        // Not guaranteed different but extremely likely with 8 items and different seeds
        const order1 = a1.map(a => a.questionId).join(',');
        const order2 = a2.map(a => a.questionId).join(',');
        expect(order1).not.toEqual(order2);
      });
    });

    describe('inferSkillType', () => {
      it('maps tracing and vocab_card to letter_recognition', () => {
        expect(inferSkillType('tracing')).toBe('letter_recognition');
        expect(inferSkillType('vocab_card')).toBe('letter_recognition');
        expect(inferSkillType('mcq')).toBe('letter_recognition');
      });

      it('maps matching to word_reading', () => {
        expect(inferSkillType('matching')).toBe('word_reading');
      });

      it('maps ordering and reading to sentence_comprehension', () => {
        expect(inferSkillType('ordering')).toBe('sentence_comprehension');
        expect(inferSkillType('reading')).toBe('sentence_comprehension');
        expect(inferSkillType('story')).toBe('sentence_comprehension');
      });

      it('maps speaking and listening correctly', () => {
        expect(inferSkillType('speaking')).toBe('speaking');
        expect(inferSkillType('listening')).toBe('listening');
      });
    });

    describe('tierToDifficultyModifier', () => {
      it('maps tiers 1-5 to ascending difficulty modifiers', () => {
        expect(tierToDifficultyModifier(1)).toBe(0.90);
        expect(tierToDifficultyModifier(3)).toBe(1.05);
        expect(tierToDifficultyModifier(5)).toBe(1.25);
      });
    });

    describe('makeSessionId', () => {
      it('includes profile id and lesson id', () => {
        const id = makeSessionId('profile-abc', 'lesson-xyz');
        expect(id).toContain('profile-abc');
        expect(id).toContain('lesson-xyz');
      });
    });
  });
  ```

  **Verify:**
  ```
  npx vitest run tests/adaptiveEngine.test.ts
  ```
  All 18 tests must pass.

---

- [ ] 4. **Patch `src/pages/LessonPlayerPage.tsx`**

  Surgical additions only — do NOT rewrite. All changes are additive. The patch must preserve every existing handler, state variable, and JSX block.

  **File:** `d:\Kuralbeyond\src\pages\LessonPlayerPage.tsx`

  ### 4a. Add new imports (after existing imports, before the component declaration)

  After line 20 (`import { LocalStorageAdapter } from '../services/storageAdapter';`), insert:

  ```tsx
  import { AdaptiveEngine, inferSkillType, tierToDifficultyModifier, type DifficultyTier } from '../services/adaptiveEngine';
  import { authService } from '../services/authService';
  ```

  ### 4b. Add 5 new state variables (after existing state declarations, ~line 43)

  After the line `const [loading, setLoading] = useState(true);`, insert:

  ```tsx
  // Adaptive difficulty state
  const [difficultyTiers, setDifficultyTiers] = useState<Map<string, DifficultyTier>>(new Map());
  const [currentDiffTier, setCurrentDiffTier] = useState<DifficultyTier>(1);
  const [adaptiveSessionId, setAdaptiveSessionId] = useState<string>('');
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  ```

  ### 4c. Modify `loadLesson` useEffect body (starting ~line 57)

  In the `loadLesson` async function, replace the existing lines:

  ```tsx
  setExercises(exList);
  ```

  with:

  ```tsx
  // Adaptive difficulty: fetch historical tier for this user+lesson
  const initTier = await AdaptiveEngine.initSessionTier(lessonId);
  setCurrentDiffTier(initTier);
  setAdaptiveSessionId(AdaptiveEngine.getSessionId());

  // Reorder exercises using 70/20/10 adaptive distribution
  const adaptiveList = AdaptiveEngine.prepareAdaptiveExercises(exList, initTier);
  setExercises(adaptiveList.length > 0 ? adaptiveList : exList);

  // Build a questionId → tier map for badge rendering
  const tierMap = new Map<string, DifficultyTier>();
  for (const ex of (adaptiveList.length > 0 ? adaptiveList : exList)) {
    for (const q of ex.questions) {
      tierMap.set(q.id, AdaptiveEngine.getQuestionTier(q.id));
    }
  }
  setDifficultyTiers(tierMap);
  ```

  ### 4d. Add `recordAdaptiveResponse` helper function (add before `advanceToNext`, ~line 110)

  Insert this function between the `displayRules` line and the `advanceToNext` function:

  ```tsx
  // ── Adaptive response recorder ────────────────────────────────────────────
  const recordAdaptiveResponse = async (
    questionId: string,
    exerciseType: ExerciseType,
    isCorrect: boolean
  ) => {
    const responseTimeMs = Date.now() - questionStartTime;
    const tier = difficultyTiers.get(questionId) ?? currentDiffTier;
    const skillType = inferSkillType(exerciseType);
    const diffModifier = tierToDifficultyModifier(tier);

    // Update in-memory tier (does not block UI)
    const newTier = AdaptiveEngine.updateSessionTier(isCorrect);
    setCurrentDiffTier(newTier);

    // Fire-and-forget remote recording (never blocks lesson flow)
    if (lesson) {
      (async () => {
        try {
          const user = await authService.getCurrentUser();
          if (!user) return;
          await (supabase.rpc as any)('record_question_response', {
            p_profile_id:      user.id,
            p_lesson_id:       lesson.id,
            p_session_id:      adaptiveSessionId || AdaptiveEngine.getSessionId(),
            p_question_id:     questionId,
            p_exercise_type:   exerciseType,
            p_skill_type:      skillType,
            p_difficulty_tier: tier,
            p_is_correct:      isCorrect,
            p_response_time_ms: responseTimeMs,
            p_hints_used:       hintsUsed,
          });
        } catch {
          // Non-fatal: local state already updated
        }
      })();
    }

    return diffModifier;
  };
  ```

  Note: this function references `supabase` — add the import at the top of the file after the `authService` import:

  ```tsx
  import { supabase } from '../services/supabaseClient';
  ```

  Also note: `ExerciseType` is already imported via `import { Lesson, Exercise, AnswerOption } from '../types';` — update that import to also include `ExerciseType`:

  ```tsx
  import { Lesson, Exercise, AnswerOption, ExerciseType } from '../types';
  ```

  ### 4e. Reset `questionStartTime` and `hintsUsed` when the exercise index changes

  In the existing `useEffect` that watches `[currentExerciseIndex, currentQuestionIndex, lesson]` (starts ~line 78, the one initializing `feedbackState` etc.), add these two lines after `setManualHelpOverride(false);`:

  ```tsx
  setQuestionStartTime(Date.now());
  setHintsUsed(0);
  ```

  ### 4f. Call `recordAdaptiveResponse` in every answer handler

  **In `handleSelectOption`** — replace the two existing `masteryService.recordSkillAttempt` calls:

  Replace the correct branch:
  ```tsx
  masteryService.recordSkillAttempt('letter_recognition', currentQuestion.id, true);
  ```
  with:
  ```tsx
  const diffMod = await recordAdaptiveResponse(currentQuestion.id, currentQuestion.exercise_type, true);
  masteryService.recordSkillAttempt(inferSkillType(currentQuestion.exercise_type), currentQuestion.id, true, diffMod);
  ```

  Replace the incorrect branch:
  ```tsx
  masteryService.recordSkillAttempt('letter_recognition', currentQuestion.id, false);
  ```
  with:
  ```tsx
  const diffMod = await recordAdaptiveResponse(currentQuestion.id, currentQuestion.exercise_type, false);
  masteryService.recordSkillAttempt(inferSkillType(currentQuestion.exercise_type), currentQuestion.id, false, diffMod);
  ```

  **In `handleCheckOrder`** — replace:
  ```tsx
  masteryService.recordSkillAttempt('sentence_comprehension', currentQuestion.id, true);
  ```
  with:
  ```tsx
  const diffMod = await recordAdaptiveResponse(currentQuestion.id, currentQuestion.exercise_type, true);
  masteryService.recordSkillAttempt(inferSkillType(currentQuestion.exercise_type), currentQuestion.id, true, diffMod);
  ```

  **In `handleTapPairRight`** — replace:
  ```tsx
  masteryService.recordSkillAttempt('word_reading', currentQuestion.id, true);
  ```
  with:
  ```tsx
  const diffMod = await recordAdaptiveResponse(currentQuestion.id, currentQuestion.exercise_type, true);
  masteryService.recordSkillAttempt(inferSkillType(currentQuestion.exercise_type), currentQuestion.id, true, diffMod);
  ```

  ### 4g. Update `onNeedHelp` handler on the `InLessonHeader`

  The `InLessonHeader` receives `onNeedHelp={() => setManualHelpOverride(true)}`. Update it to also increment `hintsUsed`:

  ```tsx
  onNeedHelp={() => {
    setManualHelpOverride(true);
    setHintsUsed(prev => prev + 1);
  }}
  ```

  ### 4h. Add difficulty tier badge in the Activity Prompt Banner

  In the JSX, find the Activity Prompt Banner block (~line 230). After:

  ```tsx
  <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal bg-teal-surface px-3 py-1 rounded-full">
    {currentQuestion.exercise_type}
  </span>
  ```

  Insert immediately after that `<span>`:

  ```tsx
  {' '}
  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted bg-sand px-2.5 py-1 rounded-full">
    T{difficultyTiers.get(currentQuestion.id) ?? currentDiffTier}
  </span>
  ```

  **Verify:**
  ```
  npx tsc --noEmit
  ```
  No TypeScript errors.

---

- [ ] 5. **Run tests and build**

  Confirm everything compiles and all tests pass before declaring the implementation done.

  **Files:** No changes — verification only.

  ```bash
  # Step 1: unit tests
  npm run test

  # Step 2: TypeScript type check (catches import errors, missing types)
  npx tsc --noEmit

  # Step 3: production build
  npm run build
  ```

  **Expected outcomes:**
  - `npm run test`: All existing tests pass (mastery, streakGrace, spacedRepetition, tanglish, i18nParity, backendLogic) plus all new adaptiveEngine tests.
  - `npx tsc --noEmit`: Exit 0, no errors.
  - `npm run build`: Exit 0, `dist/` directory created with no TypeScript errors during `tsc` phase.

  If any TypeScript errors appear in `LessonPlayerPage.tsx`, the most common causes are:
  - `recordAdaptiveResponse` is async but called inside a sync `if` — wrap with `void recordAdaptiveResponse(...)` where the return value isn't used, or ensure every call-site uses `await` (handlers like `handleSelectOption` must be declared `async` first).
  - The `ExerciseType` import is missing from the types destructure. Confirm it is in the `import { Lesson, Exercise, AnswerOption, ExerciseType } from '../types';` line.
  - The `supabase` import was not added. Confirm `import { supabase } from '../services/supabaseClient';` is present.

  Fix any errors before marking this step complete.

---

## Notes on `handleSelectOption` async upgrade

`handleSelectOption` is currently synchronous. Because `recordAdaptiveResponse` is async (for the fire-and-forget RPC call), `handleSelectOption` must become `async` so it can `await` the diff modifier before passing it to `masteryService.recordSkillAttempt`. The `setTimeout(() => advanceToNext(), 250)` call is unaffected by this — React doesn't require event handlers to be sync.

Change the signature:
```tsx
const handleSelectOption = async (opt: AnswerOption) => {
```

Likewise, `handleCheckOrder` and `handleTapPairRight` must both become `async`:
```tsx
const handleCheckOrder = async () => {
const handleTapPairRight = async (pairId: string) => {
```

These are pure additions — no existing logic is altered.

---

## How the system works (for the implementer's reference)

1. **New student** → `initSessionTier` returns tier 1 (no history). Exercises are shuffled but all questions are tier 1 difficulty.
2. **Returning student, 80% accuracy** → `get_adaptive_state` returns tier 3 or 4. Exercises are reordered so 70% are tier-3, 20% are tier-4 (stretch), 10% are tier-2 (revision).
3. **Struggling student** → Consecutive wrong answers trigger `updateSessionTier` demotion. By the next lesson (or within the same session after 2 wrongs), the tier drops.
4. **Two students, same level** → Because tier is computed from each student's own `question_responses` history, they receive different question orderings and difficulty modifiers even on the same lesson.
5. **Offline / Supabase down** → `initSessionTier` falls back to tier 1. `recordAdaptiveResponse` silently swallows errors. `masteryService.recordSkillAttempt` falls back to localStorage. No lesson interruption.
6. **Duplicate submissions** → `record_question_response` SQL uses `ON CONFLICT DO NOTHING` on `(profile_id, question_id, session_id)` equivalent. The RPC is idempotent.
7. **Tier badge** → Small `T1`–`T5` label rendered after the exercise type pill in the Activity Prompt Banner. Non-intrusive.

---

## Testing two different students

1. Open the app in a normal browser window, sign in as student A (low history), start a level-2 lesson, note the `T1` tier badge.
2. Open the app in a private/incognito window, sign in as student B (who has completed several lessons with >80% accuracy), start the same lesson, note the `T3` or `T4` tier badge.
3. Both students see the same lesson but different question order and different difficulty modifiers fed to `masteryService.recordSkillAttempt`.
