import { describe, it, expect } from 'vitest';
import { TanglishService } from '../src/services/tanglishService';

describe('TanglishService - 5-Stage Progressive Reduction & Display Rules', () => {
  const tanglishService = new TanglishService();

  it('Stage A displays Tamil, Tanglish, and English by default with autoplay audio', () => {
    const rules = tanglishService.getDisplayRules('A');
    expect(rules.showTamil).toBe(true);
    expect(rules.showTanglishDefault).toBe(true);
    expect(rules.showEnglishDefault).toBe(true);
    expect(rules.autoplayAudio).toBe(true);
  });

  it('Stage B hides English by default but allows on demand, keeps Tanglish', () => {
    const rules = tanglishService.getDisplayRules('B');
    expect(rules.showTamil).toBe(true);
    expect(rules.showTanglishDefault).toBe(true);
    expect(rules.showEnglishDefault).toBe(false);
    expect(rules.showEnglishOnDemand).toBe(true);
    expect(rules.autoplayAudio).toBe(true);
  });

  it('Stage C hides Tanglish and English by default, provides Tanglish on demand', () => {
    const rules = tanglishService.getDisplayRules('C');
    expect(rules.showTamil).toBe(true);
    expect(rules.showTanglishDefault).toBe(false);
    expect(rules.showTanglishOnDemand).toBe(true);
    expect(rules.showEnglishDefault).toBe(false);
    expect(rules.autoplayAudio).toBe(false);
  });

  it('Stage D and E immerse learner in pure Tamil script', () => {
    const rulesD = tanglishService.getDisplayRules('D');
    expect(rulesD.showTamil).toBe(true);
    expect(rulesD.showTanglishDefault).toBe(false);
    expect(rulesD.showEnglishDefault).toBe(false);

    const rulesE = tanglishService.getDisplayRules('E');
    expect(rulesE.showTamil).toBe(true);
    expect(rulesE.showTanglishDefault).toBe(false);
    expect(rulesE.showEnglishDefault).toBe(false);
  });

  it('manual "Need help?" override always restores Tanglish and audio guidance at any stage', () => {
    const rulesEWithHelp = tanglishService.getDisplayRules('E', true);
    expect(rulesEWithHelp.showTanglishDefault).toBe(true);
    expect(rulesEWithHelp.showEnglishDefault).toBe(true);
    expect(rulesEWithHelp.autoplayAudio).toBe(true);
  });

  it('provides bilingual descriptions for every stage in Script Power meter', () => {
    const stageA = tanglishService.getStageLabel('A');
    expect(stageA.title_en).toContain('Stage A');
    expect(stageA.title_ta).toContain('நிலை அ');

    const stageE = tanglishService.getStageLabel('E');
    expect(stageE.title_en).toContain('Stage E');
    expect(stageE.title_ta).toContain('நிலை உ');
  });
});
