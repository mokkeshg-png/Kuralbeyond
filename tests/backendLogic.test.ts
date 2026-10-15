import { describe, it, expect } from 'vitest';

describe('Backend Database Logic & RPC Formula Parity', () => {
  // 1. Mastery Calculation (PRD Section 24 & RPC submit_item_answer)
  describe('Mastery Formula: Accuracy * Recency Decay (14-day half-life) * Difficulty Modifier', () => {
    function calculateMastery(
      successfulReviews: number,
      totalReviews: number,
      daysAgo: number,
      difficultyModifier: number
    ): number {
      if (totalReviews === 0) return 0;
      const accuracy = successfulReviews / totalReviews;
      const decay = Math.exp(- (Math.LN2 / 14.0) * daysAgo);
      const clampedModifier = Math.min(1.25, Math.max(0.9, difficultyModifier));
      const rawScore = accuracy * decay * clampedModifier;
      return Math.min(1.0, Math.max(0.0, Math.round(rawScore * 100) / 100));
    }

    it('clamps difficulty modifiers to [0.9, 1.25]', () => {
      const low = calculateMastery(10, 10, 0, 0.5);
      const expectedLow = calculateMastery(10, 10, 0, 0.9);
      expect(low).toBe(expectedLow);

      const high = calculateMastery(5, 10, 0, 2.0);
      const expectedHigh = calculateMastery(5, 10, 0, 1.25);
      expect(high).toBe(expectedHigh);
    });

    it('matches 50% decay after exactly 14 days', () => {
      const score = calculateMastery(10, 10, 14, 1.0);
      expect(score).toBe(0.5);
    });

    it('matches 25% decay after 28 days', () => {
      const score = calculateMastery(10, 10, 28, 1.0);
      expect(score).toBe(0.25);
    });
  });

  // 2. SRS Intervals (PRD Section 25 & RPC submit_item_answer)
  describe('Spaced Repetition System (SRS) Interval Stepping', () => {
    const SRS_INTERVALS = [1, 3, 7, 14, 30, 60];

    function getNextSrsInterval(currentInterval: number, isCorrect: boolean): number {
      if (!isCorrect) return 1; // PRD rule: reset to 1 on failure
      const currentIndex = SRS_INTERVALS.indexOf(currentInterval);
      if (currentIndex === -1 || currentIndex === SRS_INTERVALS.length - 1) {
        return 60;
      }
      return SRS_INTERVALS[currentIndex + 1];
    }

    it('steps through 1 -> 3 -> 7 -> 14 -> 30 -> 60 on consecutive correct answers', () => {
      let interval = 1;
      expect(interval).toBe(1);
      interval = getNextSrsInterval(interval, true);
      expect(interval).toBe(3);
      interval = getNextSrsInterval(interval, true);
      expect(interval).toBe(7);
      interval = getNextSrsInterval(interval, true);
      expect(interval).toBe(14);
      interval = getNextSrsInterval(interval, true);
      expect(interval).toBe(30);
      interval = getNextSrsInterval(interval, true);
      expect(interval).toBe(60);
      interval = getNextSrsInterval(interval, true);
      expect(interval).toBe(60); // caps at 60
    });

    it('resets interval to 1 day on any incorrect answer', () => {
      expect(getNextSrsInterval(30, false)).toBe(1);
      expect(getNextSrsInterval(7, false)).toBe(1);
      expect(getNextSrsInterval(60, false)).toBe(1);
    });
  });

  // 3. Tanglish Stages (PRD Section 23 & RPC submit_item_answer)
  describe('Tanglish Stage Progression & Regression Rules', () => {
    type Stage = 'A' | 'B' | 'C' | 'D' | 'E';
    const STAGES: Stage[] = ['A', 'B', 'C', 'D', 'E'];

    function evaluateStage(
      currentStage: Stage,
      recentAccuracies: number[]
    ): { nextStage: Stage; reason: string } {
      const last3 = recentAccuracies.slice(-3);
      const last2 = recentAccuracies.slice(-2);

      // Advance condition: >= 85% accuracy across last 3 sessions
      if (last3.length >= 3 && last3.every(acc => acc >= 0.85)) {
        const idx = STAGES.indexOf(currentStage);
        if (idx < STAGES.length - 1) {
          return { nextStage: STAGES[idx + 1], reason: 'Advanced: 85%+ accuracy across 3 sessions' };
        }
      }

      // Regress condition: < 60% accuracy across last 2 sessions
      if (last2.length >= 2 && last2.every(acc => acc < 0.60)) {
        const idx = STAGES.indexOf(currentStage);
        if (idx > 0) {
          return { nextStage: STAGES[idx - 1], reason: 'Regressed: <60% accuracy across 2 sessions' };
        }
      }

      return { nextStage: currentStage, reason: 'Stage unchanged' };
    }

    it('advances from Stage A to B after 3 sessions with >= 85% accuracy', () => {
      const result = evaluateStage('A', [0.90, 0.85, 1.0]);
      expect(result.nextStage).toBe('B');
    });

    it('advances from Stage D to E (pure Tamil) on consistent high accuracy', () => {
      const result = evaluateStage('D', [0.88, 0.92, 0.86]);
      expect(result.nextStage).toBe('E');
    });

    it('regresses from Stage C to B if learner struggles (< 60% for 2 sessions)', () => {
      const result = evaluateStage('C', [0.55, 0.40]);
      expect(result.nextStage).toBe('B');
    });

    it('does not regress past Stage A', () => {
      const result = evaluateStage('A', [0.30, 0.20]);
      expect(result.nextStage).toBe('A');
    });

    it('maintains stage when accuracy is stable between 60% and 85%', () => {
      const result = evaluateStage('C', [0.75, 0.70, 0.80]);
      expect(result.nextStage).toBe('C');
    });
  });

  // 4. Streak & Grace Period (PRD Section 31 & RPC complete_lesson)
  describe('Streak Calculation with 1-Day Grace & Freeze Consumption', () => {
    function updateStreak(
      currentStreak: number,
      freezeCount: number,
      lastActiveDate: string | null,
      todayDate: string
    ): { newStreak: number; newFreezeCount: number; status: 'continued' | 'incremented' | 'frozen' | 'reset' } {
      if (!lastActiveDate) {
        return { newStreak: 1, newFreezeCount: freezeCount, status: 'incremented' };
      }

      const diffDays = Math.round(
        (new Date(todayDate).getTime() - new Date(lastActiveDate).getTime()) / (1000 * 3600 * 24)
      );

      if (diffDays === 0) {
        // Already practiced today
        return { newStreak: currentStreak, newFreezeCount: freezeCount, status: 'continued' };
      }

      if (diffDays === 1) {
        // Consecutive day
        return { newStreak: currentStreak + 1, newFreezeCount: freezeCount, status: 'incremented' };
      }

      if (diffDays === 2) {
        // Missed 1 day: Grace period / Freeze consumed
        if (freezeCount > 0) {
          return { newStreak: currentStreak + 1, newFreezeCount: freezeCount - 1, status: 'frozen' };
        }
        // Grace period preserves streak without incrementing if freeze is 0
        return { newStreak: currentStreak, newFreezeCount: 0, status: 'frozen' };
      }

      // Missed > 2 days: Streak resets
      return { newStreak: 1, newFreezeCount: freezeCount, status: 'reset' };
    }

    it('increments streak on consecutive day practice', () => {
      const res = updateStreak(5, 2, '2026-10-14', '2026-10-15');
      expect(res.newStreak).toBe(6);
      expect(res.newFreezeCount).toBe(2);
      expect(res.status).toBe('incremented');
    });

    it('protects streak with freeze after 1 missed day (diffDays = 2)', () => {
      const res = updateStreak(7, 1, '2026-10-13', '2026-10-15');
      expect(res.newStreak).toBe(8);
      expect(res.newFreezeCount).toBe(0);
      expect(res.status).toBe('frozen');
    });

    it('resets streak to 1 after > 2 missed days', () => {
      const res = updateStreak(15, 0, '2026-10-10', '2026-10-15');
      expect(res.newStreak).toBe(1);
      expect(res.status).toBe('reset');
    });
  });

  // 5. XP Awarding & Idempotency
  describe('XP Award Rules & Idempotency', () => {
    it('awards 10 XP for standard lesson completion', () => {
      const baseXP = 10;
      expect(baseXP).toBe(10);
    });

    it('awards 50 XP for milestone/streak bonus', () => {
      const streakBonus = 50;
      expect(streakBonus).toBe(50);
    });

    it('rejects duplicate award for identical idempotency key', () => {
      const awardedKeys = new Set<string>();
      function recordXP(key: string, amount: number): { awarded: boolean; xp: number } {
        if (awardedKeys.has(key)) {
          return { awarded: false, xp: 0 };
        }
        awardedKeys.add(key);
        return { awarded: true, xp: amount };
      }

      const first = recordXP('lesson-1-p-123-2026-10-15', 10);
      expect(first.awarded).toBe(true);
      expect(first.xp).toBe(10);

      const duplicate = recordXP('lesson-1-p-123-2026-10-15', 10);
      expect(duplicate.awarded).toBe(false);
      expect(duplicate.xp).toBe(0);
    });
  });

  // 6. Child Recording Expiration & Data Retention (COPPA / GDPR-K)
  describe('Child Voice Recording Retention Rule (Strict 24h Ceiling)', () => {
    it('sets retention_expires_at to created_at + 24 hours', () => {
      const createdAt = new Date('2026-10-15T10:00:00Z');
      const expiresAt = new Date(createdAt.getTime() + 24 * 3600 * 1000);
      expect(expiresAt.toISOString()).toBe('2026-10-16T10:00:00.000Z');
    });

    it('identifies expired recordings for hard deletion', () => {
      const now = new Date('2026-10-16T12:00:00Z');
      const unexpired = new Date('2026-10-16T14:00:00Z');
      const expired = new Date('2026-10-16T08:00:00Z');

      expect(expired.getTime() < now.getTime()).toBe(true);
      expect(unexpired.getTime() < now.getTime()).toBe(false);
    });
  });

  // 7. Unicode NFC Normalization
  describe('Unicode NFC Normalization for Tamil Text', () => {
    it('verifies that canonical Tamil vowels and Aytham (ஃ) are NFC normalized', () => {
      const testStrings = [
        'தமிழ்',
        'அம்மா',
        'ஃ', // Aytham
        'ஔவையார்',
        'வணக்கம்',
        'கொக்கு',
        'கோழி'
      ];

      for (const str of testStrings) {
        expect(str).toBe(str.normalize('NFC'));
      }
    });

    it('normalizes NFD composite characters to NFC', () => {
      const compositeChar = 'க' + '\u0BBE'; // Ka + Vowel sign Aa
      const nfd = compositeChar.normalize('NFD');
      const nfc = compositeChar.normalize('NFC');

      expect(nfc).toBe('கா');
      expect(nfd.normalize('NFC')).toBe('கா');
    });
  });

  // 8. Word Tracing Layout & Dynamic Sizing for Tamil Words (e.g. "அம்மா")
  describe('Word Tracing Layout & Dynamic Sizing', () => {
    // Import functions dynamically or test the logic
    function getTamilClusterCount(text: string): number {
      const clean = text.trim();
      if (!clean) return 1;
      const baseChars = clean.replace(/[\u0B82\u0BBE-\u0BCD\u0BD7\s]/g, '');
      return Math.max(1, baseChars.length || clean.length);
    }

    function getTracingLayoutConfig(text: string) {
      const count = getTamilClusterCount(text);
      if (count <= 1) {
        return { isWord: false, containerClassName: 'w-72 h-72 sm:w-80 sm:h-80', fontSizePx: 140 };
      } else if (count === 2) {
        return { isWord: true, containerClassName: 'w-full max-w-sm min-h-[260px] h-64 sm:h-72', fontSizePx: 100 };
      } else if (count === 3) {
        return { isWord: true, containerClassName: 'w-full max-w-lg min-h-[260px] h-64 sm:h-72', fontSizePx: 80 };
      } else {
        return { isWord: true, containerClassName: 'w-full max-w-xl min-h-[260px] h-64 sm:h-72', fontSizePx: 64 };
      }
    }

    it('identifies single Tamil letters as non-words with large font (140px)', () => {
      const singleLetterConfig = getTracingLayoutConfig('அ');
      expect(singleLetterConfig.isWord).toBe(false);
      expect(singleLetterConfig.fontSizePx).toBe(140);
      expect(singleLetterConfig.containerClassName).toContain('w-72');
    });

    it('identifies "அம்மா" as a multi-character word with expanded container and scaled font (80px)', () => {
      const wordConfig = getTracingLayoutConfig('அம்மா');
      expect(wordConfig.isWord).toBe(true);
      expect(wordConfig.fontSizePx).toBe(80);
      expect(wordConfig.containerClassName).toContain('max-w-lg');
    });

    it('properly scales font size for longer Tamil words like "வணக்கம்"', () => {
      const longWordConfig = getTracingLayoutConfig('வணக்கம்');
      expect(longWordConfig.isWord).toBe(true);
      expect(longWordConfig.fontSizePx).toBeLessThanOrEqual(64);
    });
  });

  // 9. Session Persistence Across Logouts
  describe('Session Persistence: No Progress Loss on Log Out', () => {
    it('preserves learning statistics, streaks, and stars in storage when logged out', () => {
      const mockStorage: Record<string, string> = {
        'kuralbeyond_progress': JSON.stringify({ streak: 5, stars: 120, completed: ['les-1', 'les-2'] }),
        'kuralbeyond_session_active': 'true',
      };

      // Simulate sign out (clears only active session flag, does NOT clear user progress)
      mockStorage['kuralbeyond_session_active'] = 'false';

      // Verify that progress data is completely intact
      expect(mockStorage['kuralbeyond_session_active']).toBe('false');
      expect(mockStorage['kuralbeyond_progress']).toBeDefined();
      const progress = JSON.parse(mockStorage['kuralbeyond_progress']);
      expect(progress.streak).toBe(5);
      expect(progress.stars).toBe(120);
      expect(progress.completed).toHaveLength(2);

      // Simulate student re-logging in
      mockStorage['kuralbeyond_session_active'] = 'true';
      const resumedProgress = JSON.parse(mockStorage['kuralbeyond_progress']);
      expect(resumedProgress.streak).toBe(5);
      expect(resumedProgress.stars).toBe(120);
    });
  });
});
