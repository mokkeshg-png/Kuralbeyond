import { TanglishStage } from '../types';
import { LocalStorageAdapter } from './storageAdapter';

export interface TanglishDisplayRules {
  showTamil: boolean;
  showTanglishDefault: boolean;
  showTanglishOnDemand: boolean;
  showEnglishDefault: boolean;
  showEnglishOnDemand: boolean;
  autoplayAudio: boolean;
}

export interface ITanglishService {
  getCurrentStage(): TanglishStage;
  getScriptPowerPercentage(): number;
  getDisplayRules(stage: TanglishStage, manualHelpOverride?: boolean): TanglishDisplayRules;
  evaluateOverallStage(): Promise<TanglishStage>;
  getStageLabel(stage: TanglishStage): { title_en: string; title_ta: string; desc_en: string; desc_ta: string };
}

export class TanglishService implements ITanglishService {
  getCurrentStage(): TanglishStage {
    const stats = LocalStorageAdapter.getStats();
    return stats.script_power_stage;
  }

  getScriptPowerPercentage(): number {
    const stats = LocalStorageAdapter.getStats();
    return stats.script_power_percentage;
  }

  getDisplayRules(stage: TanglishStage, manualHelpOverride = false): TanglishDisplayRules {
    // If the learner explicitly tapped "Need help? / உதவி தேவை", always reveal Tanglish and audio
    if (manualHelpOverride) {
      return {
        showTamil: true,
        showTanglishDefault: true,
        showTanglishOnDemand: true,
        showEnglishDefault: true,
        showEnglishOnDemand: true,
        autoplayAudio: true,
      };
    }

    switch (stage) {
      case 'A':
        return {
          showTamil: true,
          showTanglishDefault: true,
          showTanglishOnDemand: true,
          showEnglishDefault: true,
          showEnglishOnDemand: true,
          autoplayAudio: true,
        };
      case 'B':
        return {
          showTamil: true,
          showTanglishDefault: true,
          showTanglishOnDemand: true,
          showEnglishDefault: false,
          showEnglishOnDemand: true, // revealed on tap
          autoplayAudio: true,
        };
      case 'C':
        return {
          showTamil: true,
          showTanglishDefault: false,
          showTanglishOnDemand: true, // revealed on tap
          showEnglishDefault: false,
          showEnglishOnDemand: false,
          autoplayAudio: false, // on demand
        };
      case 'D':
        return {
          showTamil: true,
          showTanglishDefault: false,
          showTanglishOnDemand: false, // hidden, only via "Need help"
          showEnglishDefault: false,
          showEnglishOnDemand: false,
          autoplayAudio: false,
        };
      case 'E':
      default:
        return {
          showTamil: true,
          showTanglishDefault: false,
          showTanglishOnDemand: false,
          showEnglishDefault: false,
          showEnglishOnDemand: false,
          autoplayAudio: false,
        };
    }
  }

  async evaluateOverallStage(): Promise<TanglishStage> {
    const masteries = LocalStorageAdapter.getSkillMastery();
    const stats = LocalStorageAdapter.getStats();

    if (masteries.length === 0) {
      return 'A';
    }

    const avgMastery = masteries.reduce((sum, m) => sum + m.mastery_score, 0) / masteries.length;
    let newStage: TanglishStage = 'A';
    let percentage = Math.round(avgMastery * 100);

    if (avgMastery >= 0.90) newStage = 'E';
    else if (avgMastery >= 0.85) newStage = 'D';
    else if (avgMastery >= 0.70) newStage = 'C';
    else if (avgMastery >= 0.50) newStage = 'B';
    else newStage = 'A';

    stats.script_power_stage = newStage;
    stats.script_power_percentage = Math.max(10, Math.min(100, percentage));
    LocalStorageAdapter.setStats(stats);

    return newStage;
  }

  getStageLabel(stage: TanglishStage) {
    switch (stage) {
      case 'A':
        return {
          title_en: 'Stage A: Full Bridge',
          title_ta: 'நிலை அ: பால நிலை',
          desc_en: 'Tanglish and English always visible to guide your first steps.',
          desc_ta: 'தொடக்கத்தில் எளிதாகக் கற்க தங்கிலிஷ் மற்றும் ஆங்கிலம் எப்போதும் தோன்றும்.',
        };
      case 'B':
        return {
          title_en: 'Stage B: Emerging Reader',
          title_ta: 'நிலை ஆ: தொடக்க நிலை',
          desc_en: 'English meaning on demand. Hearing and reading Tamil script.',
          desc_ta: 'ஆங்கிலப் பொருள் தேவைப்படும்போது மட்டும். தமிழ் எழுத்துக்களின் அறிமுகம்.',
        };
      case 'C':
        return {
          title_en: 'Stage C: Growing Independence',
          title_ta: 'நிலை இ: வளர்ச்சி நிலை',
          desc_en: 'Tanglish on demand. Relying primarily on authentic Tamil letters.',
          desc_ta: 'தங்கிலிஷ் உதவி தேவைப்படும்போது மட்டும். பெரும்பாலும் தமிழ் எழுத்துக்கள்.',
        };
      case 'D':
        return {
          title_en: 'Stage D: Script Immersion',
          title_ta: 'நிலை ஈ: முன்னேறிய நிலை',
          desc_en: 'Pure Tamil reading. Audio on demand.',
          desc_ta: 'தூய தமிழ் வாசிப்பு. ஒலி வழிகாட்டல் தேவைக்கேற்ப.',
        };
      case 'E':
      default:
        return {
          title_en: 'Stage E: Script Mastery',
          title_ta: 'நிலை உ: தன்னாட்சி நிலை',
          desc_en: '100% independent Tamil script reader and speaker!',
          desc_ta: 'தங்கிலிஷ் இன்றி தன்னாட்சியுடன் தமிழ் வாசிக்கும் வல்லமை!',
        };
    }
  }
}

export const tanglishService = new TanglishService();
