import { describe, it, expect, beforeEach } from 'vitest';
import { RevisionService } from '../src/services/revisionService';
import { LocalStorageAdapter } from '../src/services/storageAdapter';

describe('RevisionService - Spaced Repetition (1, 3, 7, 14, 30, 60 days)', () => {
  let revisionService: RevisionService;

  beforeEach(() => {
    localStorage.clear();
    revisionService = new RevisionService();
  });

  it('adds new items to queue with 1-day initial interval', async () => {
    const item = await revisionService.addToQueue({
      item_type: 'letter',
      item_id: 'test_letter_a',
      content_ta: 'அ',
      content_tanglish: 'a',
      content_en: 'Short a',
      audio_id: 'letter_a',
    });

    expect(item.interval_days).toBe(1);
    expect(item.consecutive_correct).toBe(0);
  });

  it('progresses intervals on successful recalls (1 -> 3 -> 7 -> 14 days)', async () => {
    const item = await revisionService.addToQueue({
      item_type: 'word',
      item_id: 'test_word_amma',
      content_ta: 'அம்மா',
      content_tanglish: 'amma',
      content_en: 'Mother',
      audio_id: 'vocab_amma',
    });

    // 1st recall
    const r1 = await revisionService.recordReview(item.id, true);
    expect(r1?.consecutive_correct).toBe(1);
    expect(r1?.interval_days).toBe(3);

    // 2nd recall
    const r2 = await revisionService.recordReview(item.id, true);
    expect(r2?.consecutive_correct).toBe(2);
    expect(r2?.interval_days).toBe(7);

    // 3rd recall
    const r3 = await revisionService.recordReview(item.id, true);
    expect(r3?.consecutive_correct).toBe(3);
    expect(r3?.interval_days).toBe(14);
  });

  it('resets interval to 1 day on failed recall per PRD Section 24 rule', async () => {
    const item = await revisionService.addToQueue({
      item_type: 'word',
      item_id: 'test_word_soru',
      content_ta: 'சோறு',
      content_tanglish: 'soru',
      content_en: 'Rice',
      audio_id: 'vocab_soru',
    });

    // 2 successful recalls
    await revisionService.recordReview(item.id, true);
    await revisionService.recordReview(item.id, true);

    // Failed recall
    const failed = await revisionService.recordReview(item.id, false);
    expect(failed?.interval_days).toBe(1);
    expect(failed?.consecutive_correct).toBe(0);
  });
});
