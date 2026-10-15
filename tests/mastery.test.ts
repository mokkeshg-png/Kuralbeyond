import { describe, it, expect } from 'vitest';
import { MasteryService } from '../src/services/masteryService';

describe('MasteryService - Recency Decay & Difficulty Modifier', () => {
  const masteryService = new MasteryService();

  it('calculates perfect 1.0 score for 100% accuracy on immediate attempt', () => {
    const now = new Date().toISOString();
    const score = masteryService.calculateMasteryScore(10, 10, now, 1.0);
    expect(score).toBe(1.0);
  });

  it('calculates 0 score when there are 0 attempts', () => {
    const now = new Date().toISOString();
    const score = masteryService.calculateMasteryScore(0, 0, now, 1.0);
    expect(score).toBe(0);
  });

  it('decays score over 14 days using half-life exponential formula', () => {
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString();
    const score = masteryService.calculateMasteryScore(10, 10, fourteenDaysAgo, 1.0);
    // After 1 half-life (14 days), recency weight should be ~0.50
    expect(score).toBeGreaterThanOrEqual(0.48);
    expect(score).toBeLessThanOrEqual(0.52);
  });

  it('boosts score with difficulty modifier for harder retroflex consonants', () => {
    const now = new Date().toISOString();
    const normalScore = masteryService.calculateMasteryScore(8, 10, now, 1.0);
    const retroflexScore = masteryService.calculateMasteryScore(8, 10, now, 1.2);
    expect(retroflexScore).toBeGreaterThan(normalScore);
    expect(retroflexScore).toBeCloseTo(0.96, 2);
  });
});
