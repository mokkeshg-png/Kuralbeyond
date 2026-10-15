import { describe, it, expect, beforeEach } from 'vitest';
import { ProgressService } from '../src/services/progressService';
import { LocalStorageAdapter } from '../src/services/storageAdapter';

describe('ProgressService - Streak Grace, Freeze & Non-Punitive Reset', () => {
  let progressService: ProgressService;

  beforeEach(() => {
    localStorage.clear();
    progressService = new ProgressService();
  });

  it('increments streak when lesson is completed on a new day', async () => {
    const initialStats = await progressService.getStats();
    const initialStreak = initialStats.streak_days;

    // Advance streak date to simulate yesterday
    initialStats.last_streak_date = '2026-10-14';
    LocalStorageAdapter.setStats(initialStats);

    await progressService.completeLesson('lesson-1-1', 5, 5, 120);
    const updatedStats = await progressService.getStats();

    expect(updatedStats.streak_days).toBe(initialStreak + 1);
  });

  it('activates streak freeze when requested if freeze is available', async () => {
    const stats = await progressService.getStats();
    stats.streak_freeze_available = true;
    stats.streak_freeze_active = false;
    LocalStorageAdapter.setStats(stats);

    const used = await progressService.useStreakFreeze();
    expect(used).toBe(true);

    const updated = await progressService.getStats();
    expect(updated.streak_freeze_active).toBe(true);
    expect(updated.streak_freeze_available).toBe(false);
  });

  it('awards XP according to effort and accuracy: 10 XP per correct + 5 XP completion', async () => {
    const initialStats = await progressService.getStats();
    const initialXP = initialStats.xp;

    // 4 correct out of 5: (4 * 10) + 5 = 45 XP
    await progressService.completeLesson('lesson-1-2', 4, 5, 180);

    const updatedStats = await progressService.getStats();
    expect(updatedStats.xp).toBe(initialXP + 45);
  });
});
