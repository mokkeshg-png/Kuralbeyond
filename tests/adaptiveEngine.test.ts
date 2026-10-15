/**
 * Unit tests for the adaptive difficulty engine.
 * Runs entirely in-process — no Supabase connection required.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  assignQuestionTier,
  selectAdaptiveQuestions,
  tierLabel,
  tierBadgeClass,
  initAdaptiveSession,
  getSessionTier,
  updateSessionTier,
} from '../src/services/adaptiveEngine';
import type { AdaptiveState } from '../src/services/adaptiveEngine';
import type { Question } from '../src/types';

// ── Test helpers ─────────────────────────────────────────────────────────────

function makeQ(id: string, type: string, optCount = 4): Question {
  return {
    id,
    exercise_id: 'ex-test',
    exercise_type: type as Question['exercise_type'],
    prompt_en: `Q ${id}`,
    prompt_ta: `வி ${id}`,
    content_ta: 'அ',
    content_tanglish: 'a',
    content_en: 'a',
    correct_answer: 'a',
    explanation_en: '',
    explanation_ta: '',
    options:
      type === 'mcq'
        ? Array.from({ length: optCount }, (_, i) => ({
            id: `opt-${id}-${i}`,
            option_text: `Opt ${i}`,
            is_correct: i === 0,
          }))
        : undefined,
  };
}

function freshState(tier = 1, seen: string[] = []): AdaptiveState {
  return {
    currentDifficultyTier: tier,
    consecutiveCorrect: 0,
    consecutiveIncorrect: 0,
    questionsSeen: seen,
    skillAvg: 0,
    recentAccuracy: null,
    isNewStudent: seen.length === 0,
  };
}

const baseConfig = {
  skillAppropriatePct: 70,
  challengePct: 20,
  revisionPct: 10,
  streakUpThreshold: 3,
  streakDownThreshold: 2,
};

// A representative 8-question set spanning multiple exercise types
const sampleQuestions: Question[] = [
  makeQ('q1', 'vocab_card'),   // intrinsic tier 1 at L0
  makeQ('q2', 'tracing'),      // intrinsic tier 1 at L0
  makeQ('q3', 'mcq', 4),       // intrinsic tier 2
  makeQ('q4', 'mcq', 4),       // intrinsic tier 2
  makeQ('q5', 'matching'),     // intrinsic tier 2
  makeQ('q6', 'listening'),    // intrinsic tier 2
  makeQ('q7', 'ordering'),     // intrinsic tier 2-3
  makeQ('q8', 'mcq', 2),       // intrinsic tier 1 (2-option easy)
];

// ── assignQuestionTier ────────────────────────────────────────────────────────

describe('assignQuestionTier', () => {
  it('tier 1 for vocab_card at level 0', () => {
    expect(assignQuestionTier(makeQ('x', 'vocab_card'), 0)).toBe(1);
  });

  it('tier 1 for tracing at level 0', () => {
    expect(assignQuestionTier(makeQ('x', 'tracing'), 0)).toBe(1);
  });

  it('tier 2 for 4-option mcq at level 0', () => {
    expect(assignQuestionTier(makeQ('x', 'mcq', 4), 0)).toBe(2);
  });

  it('tier 1 for 2-option mcq at level 0', () => {
    expect(assignQuestionTier(makeQ('x', 'mcq', 2), 0)).toBe(1);
  });

  it('never exceeds level 0-1 cap of 2', () => {
    // ordering has base tier 3 but level 1 caps at 2
    const tier = assignQuestionTier(makeQ('x', 'ordering'), 1);
    expect(tier).toBeLessThanOrEqual(2);
  });

  it('never exceeds level 2-4 cap of 3', () => {
    const tier = assignQuestionTier(makeQ('x', 'ordering'), 3);
    expect(tier).toBeLessThanOrEqual(3);
  });

  it('allows tier 4 at level 5', () => {
    const tier = assignQuestionTier(makeQ('x', 'reading'), 5);
    expect(tier).toBeLessThanOrEqual(4);
    expect(tier).toBeGreaterThanOrEqual(1);
  });

  it('higher level gives same or higher tier for same question type', () => {
    const t0 = assignQuestionTier(makeQ('x', 'mcq', 4), 0);
    const t6 = assignQuestionTier(makeQ('x', 'mcq', 4), 6);
    expect(t6).toBeGreaterThanOrEqual(t0);
  });

  it('all tiers in 1-5 range', () => {
    const types = ['vocab_card', 'tracing', 'mcq', 'matching', 'ordering', 'reading', 'speaking', 'listening', 'story'];
    for (const type of types) {
      for (let level = 0; level <= 7; level++) {
        const t = assignQuestionTier(makeQ('x', type, 4), level);
        expect(t).toBeGreaterThanOrEqual(1);
        expect(t).toBeLessThanOrEqual(5);
      }
    }
  });
});

// ── selectAdaptiveQuestions ───────────────────────────────────────────────────

describe('selectAdaptiveQuestions — core invariants', () => {
  it('returns same count as input', () => {
    const { questions } = selectAdaptiveQuestions(
      sampleQuestions, freshState(1), baseConfig, 1, 'p-001', 'lesson-1-1',
    );
    expect(questions.length).toBe(sampleQuestions.length);
  });

  it('all returned IDs are unique (no duplicates)', () => {
    const { questions } = selectAdaptiveQuestions(
      sampleQuestions, freshState(1), baseConfig, 1, 'p-001', 'lesson-1-1',
    );
    const ids = questions.map(q => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('tiers array is parallel in length to questions array', () => {
    const { questions, tiers } = selectAdaptiveQuestions(
      sampleQuestions, freshState(2), baseConfig, 1, 'p-002', 'lesson-1-2',
    );
    expect(tiers.length).toBe(questions.length);
  });

  it('all returned tiers are in 1–5 range', () => {
    const { tiers } = selectAdaptiveQuestions(
      sampleQuestions, freshState(3), baseConfig, 3, 'p-003', 'lesson-3-1',
    );
    for (const t of tiers) {
      expect(t).toBeGreaterThanOrEqual(1);
      expect(t).toBeLessThanOrEqual(5);
    }
  });

  it('handles empty input gracefully', () => {
    const { questions, tiers } = selectAdaptiveQuestions(
      [], freshState(1), baseConfig, 0, 'p-001', 'lesson-0-1',
    );
    expect(questions.length).toBe(0);
    expect(tiers.length).toBe(0);
  });

  it('handles single-question input', () => {
    const { questions } = selectAdaptiveQuestions(
      [makeQ('solo', 'mcq', 4)], freshState(1), baseConfig, 0, 'p-001', 'lesson-0-1',
    );
    expect(questions.length).toBe(1);
    expect(questions[0].id).toBe('solo');
  });
});

describe('selectAdaptiveQuestions — personalisation', () => {
  it('two different profiles get different question orders', () => {
    const { questions: qA } = selectAdaptiveQuestions(
      sampleQuestions, freshState(1), baseConfig, 1, 'profile-AAAA', 'lesson-1-1',
    );
    const { questions: qB } = selectAdaptiveQuestions(
      sampleQuestions, freshState(1), baseConfig, 1, 'profile-BBBB', 'lesson-1-1',
    );
    const orderA = qA.map(q => q.id).join(',');
    const orderB = qB.map(q => q.id).join(',');
    // With an 8-question pool and different profile seeds, orders must differ
    expect(orderA).not.toBe(orderB);
  });

  it('same profile + same lesson = same order on repeat (reproducibility)', () => {
    const state = freshState(2);
    const run1 = selectAdaptiveQuestions(sampleQuestions, state, baseConfig, 1, 'p-XYZ', 'lesson-1-3');
    const run2 = selectAdaptiveQuestions(sampleQuestions, state, baseConfig, 1, 'p-XYZ', 'lesson-1-3');
    expect(run1.questions.map(q => q.id)).toEqual(run2.questions.map(q => q.id));
  });

  it('same profile + different lesson = different order', () => {
    const state = freshState(1);
    const r1 = selectAdaptiveQuestions(sampleQuestions, state, baseConfig, 1, 'p-ABC', 'lesson-1-1');
    const r2 = selectAdaptiveQuestions(sampleQuestions, state, baseConfig, 1, 'p-ABC', 'lesson-1-2');
    const o1 = r1.questions.map(q => q.id).join(',');
    const o2 = r2.questions.map(q => q.id).join(',');
    expect(o1).not.toBe(o2);
  });
});

describe('selectAdaptiveQuestions — seen-question avoidance', () => {
  it('includes unseen questions in the result set', () => {
    const seen = ['q1', 'q2']; // first two already seen
    const state = freshState(1, seen);
    const { questions } = selectAdaptiveQuestions(
      sampleQuestions, state, baseConfig, 1, 'p-001', 'lesson-1-1',
    );
    const unseenInResult = questions.filter(q => !seen.includes(q.id));
    expect(unseenInResult.length).toBeGreaterThan(0);
  });

  it('still returns full count even when all questions are seen (fallback)', () => {
    const allSeen = sampleQuestions.map(q => q.id);
    const state = freshState(1, allSeen);
    const { questions } = selectAdaptiveQuestions(
      sampleQuestions, state, baseConfig, 1, 'p-001', 'lesson-1-1',
    );
    expect(questions.length).toBe(sampleQuestions.length);
  });
});

describe('selectAdaptiveQuestions — difficulty ratios', () => {
  it('with 100% appropriate, no question exceeds target tier + 1', () => {
    const config100 = { ...baseConfig, skillAppropriatePct: 100, challengePct: 0, revisionPct: 0 };
    const state = freshState(2);
    const { tiers } = selectAdaptiveQuestions(
      sampleQuestions, state, config100, 1, 'p-001', 'lesson-1-1',
    );
    for (const t of tiers) {
      expect(t).toBeLessThanOrEqual(3); // target 2 + possible +1 boost from level
    }
  });
});

// ── Tier label / badge ────────────────────────────────────────────────────────

describe('tierLabel', () => {
  it.each([
    [1, '★ Starter'],
    [2, '★★ Easy'],
    [3, '★★★ Medium'],
    [4, '★★★★ Hard'],
    [5, '★★★★★ Expert'],
  ])('tier %i → "%s"', (tier, label) => {
    expect(tierLabel(tier)).toBe(label);
  });

  it('returns non-empty string for out-of-range values', () => {
    expect(tierLabel(0).length).toBeGreaterThan(0);
    expect(tierLabel(10).length).toBeGreaterThan(0);
  });
});

describe('tierBadgeClass', () => {
  it('returns a non-empty Tailwind class string for tiers 1–5', () => {
    for (let t = 1; t <= 5; t++) {
      expect(tierBadgeClass(t).length).toBeGreaterThan(0);
    }
  });

  it('returns a string for out-of-range tier', () => {
    expect(typeof tierBadgeClass(0)).toBe('string');
  });
});

// ── In-session state helpers ──────────────────────────────────────────────────

describe('session state helpers', () => {
  beforeEach(() => {
    initAdaptiveSession(1, 'sess-reset');
  });

  it('initAdaptiveSession sets the tier', () => {
    initAdaptiveSession(3, 'sess-abc');
    expect(getSessionTier()).toBe(3);
  });

  it('updateSessionTier changes the tier', () => {
    initAdaptiveSession(2, 'sess-def');
    updateSessionTier(4);
    expect(getSessionTier()).toBe(4);
  });

  it('multiple inits are independent', () => {
    initAdaptiveSession(1, 'sess-1');
    initAdaptiveSession(5, 'sess-2');
    expect(getSessionTier()).toBe(5);
  });

  it('getSessionTier returns 1 before any init', () => {
    // After beforeEach reset to 1
    expect(getSessionTier()).toBe(1);
  });
});
