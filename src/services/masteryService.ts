import { SkillType, LearnerSkillMastery } from '../types';
import { LocalStorageAdapter } from './storageAdapter';
import { SupabaseAdapter } from './supabaseAdapter';

export interface IMasteryService {
  getSkillMasteries(): Promise<LearnerSkillMastery[]>;
  getMasteryBySkillType(): Promise<Record<SkillType, number>>;
  recordSkillAttempt(
    skillType: SkillType, 
    itemId: string, 
    isCorrect: boolean, 
    difficultyModifier?: number
  ): Promise<LearnerSkillMastery>;
  calculateMasteryScore(correct: number, attempts: number, lastDate: string, difficulty?: number): number;
}

export class MasteryService implements IMasteryService {
  calculateMasteryScore(
    correct: number, 
    attempts: number, 
    lastDate: string, 
    difficulty = 1.0
  ): number {
    if (attempts === 0) return 0;
    const baseAccuracy = correct / attempts;

    // Exponential decay over 14 days half-life: lambda = ln(2) / 14 ~ 0.0495
    const daysSince = Math.max(0, (Date.now() - new Date(lastDate).getTime()) / (1000 * 3600 * 24));
    const recencyWeight = Math.exp(-0.0495 * daysSince);

    // Apply difficulty modifier (clamped to [0.9, 1.25])
    const diffMod = Math.min(1.25, Math.max(0.9, difficulty));

    const finalScore = baseAccuracy * recencyWeight * diffMod;
    return Math.min(1.0, Math.max(0.0, parseFloat(finalScore.toFixed(2))));
  }

  async getSkillMasteries(): Promise<LearnerSkillMastery[]> {
    return LocalStorageAdapter.getSkillMastery();
  }

  async getMasteryBySkillType(): Promise<Record<SkillType, number>> {
    const masteries = LocalStorageAdapter.getSkillMastery();
    const skills: SkillType[] = [
      'letter_recognition', 
      'word_reading', 
      'sentence_comprehension', 
      'listening', 
      'speaking'
    ];

    const result: Record<SkillType, number> = {
      letter_recognition: 0.85,
      word_reading: 0.70,
      sentence_comprehension: 0.60,
      listening: 0.80,
      speaking: 0.65,
    };

    skills.forEach(skill => {
      const items = masteries.filter(m => m.skill_type === skill);
      if (items.length > 0) {
        const total = items.reduce((acc, curr) => acc + curr.mastery_score, 0);
        result[skill] = parseFloat((total / items.length).toFixed(2));
      }
    });

    return result;
  }

  async recordSkillAttempt(
    skillType: SkillType, 
    itemId: string, 
    isCorrect: boolean, 
    difficultyModifier = 1.0
  ): Promise<LearnerSkillMastery> {
    // Attempt server-authoritative mastery update via Supabase RPC
    const remoteMastery = await SupabaseAdapter.submitItemAnswer(
      skillType,
      itemId,
      isCorrect,
      difficultyModifier
    );

    const masteries = LocalStorageAdapter.getSkillMastery();
    if (remoteMastery) {
      const idx = masteries.findIndex(m => m.skill_type === skillType && m.skill_item_id === itemId);
      if (idx >= 0) masteries[idx] = remoteMastery;
      else masteries.push(remoteMastery);
      LocalStorageAdapter.setSkillMastery(masteries);
      return remoteMastery;
    }

    const profile = LocalStorageAdapter.getProfile();
    const existing = masteries.find(
      m => m.skill_type === skillType && m.skill_item_id === itemId
    );


    const now = new Date().toISOString();
    let updated: LearnerSkillMastery;

    if (existing) {
      existing.attempts += 1;
      if (isCorrect) existing.correct += 1;
      existing.last_attempted_at = now;
      existing.mastery_score = this.calculateMasteryScore(
        existing.correct, 
        existing.attempts, 
        now, 
        difficultyModifier
      );

      // Progressive Tanglish stage for this item
      if (existing.mastery_score >= 0.90) existing.tanglish_stage = 'E';
      else if (existing.mastery_score >= 0.85) existing.tanglish_stage = 'D';
      else if (existing.mastery_score >= 0.75) existing.tanglish_stage = 'C';
      else if (existing.mastery_score >= 0.60) existing.tanglish_stage = 'B';
      else existing.tanglish_stage = 'A';

      updated = existing;
    } else {
      const initialScore = isCorrect ? 0.8 * difficultyModifier : 0.2;
      updated = {
        id: 'sm-' + Math.random().toString(36).substring(2, 9),
        profile_id: profile.id,
        skill_type: skillType,
        skill_item_id: itemId,
        attempts: 1,
        correct: isCorrect ? 1 : 0,
        mastery_score: Math.min(1.0, initialScore),
        last_attempted_at: now,
        tanglish_stage: isCorrect ? 'B' : 'A',
      };
      masteries.push(updated);
    }

    LocalStorageAdapter.setSkillMastery(masteries);
    return updated;
  }
}

export const masteryService = new MasteryService();
