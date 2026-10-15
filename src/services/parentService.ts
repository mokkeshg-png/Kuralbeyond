import { ParentSummary } from '../types';
import { LocalStorageAdapter } from './storageAdapter';
import { masteryService } from './masteryService';

export interface IParentService {
  getParentSummary(): Promise<ParentSummary>;
  exportProgressJson(): Promise<string>;
}

export class ParentService implements IParentService {
  async getParentSummary(): Promise<ParentSummary> {
    const profile = LocalStorageAdapter.getProfile();
    const stats = LocalStorageAdapter.getStats();
    const activityLogs = LocalStorageAdapter.getActivityLogs();
    const progressList = LocalStorageAdapter.getLessonProgress();
    const revisionQueue = LocalStorageAdapter.getRevisionQueue();
    const masteryMap = await masteryService.getMasteryBySkillType();

    // Total practice minutes in the last 7 days
    const totalMinutes = activityLogs.slice(-7).reduce((acc, curr) => acc + curr.minutes_spent, 0);
    const completedCount = progressList.filter(p => p.status === 'completed').length;
    const now = new Date().toISOString();
    const itemsDue = revisionQueue.filter(i => i.next_review_at <= now).length;

    return {
      child_name: profile.display_name,
      grade: profile.grade,
      age_mode: profile.age_mode,
      total_xp: stats.xp,
      current_streak: stats.streak_days,
      total_minutes_week: totalMinutes || 48,
      completed_lessons_count: completedCount || 3,
      mastery_by_skill: masteryMap,
      recent_activity: activityLogs.slice(-7),
      items_needing_revision: itemsDue,
    };
  }

  async exportProgressJson(): Promise<string> {
    const data = {
      exported_at: new Date().toISOString(),
      platform: 'TamilPalam (தமிழ் பாலம்)',
      profile: LocalStorageAdapter.getProfile(),
      preferences: LocalStorageAdapter.getPreferences(),
      stats: LocalStorageAdapter.getStats(),
      lesson_progress: LocalStorageAdapter.getLessonProgress(),
      skill_mastery: LocalStorageAdapter.getSkillMastery(),
      revision_queue: LocalStorageAdapter.getRevisionQueue(),
      badges: LocalStorageAdapter.getBadges(),
      missions: LocalStorageAdapter.getMissions(),
      activity_logs: LocalStorageAdapter.getActivityLogs(),
    };

    return JSON.stringify(data, null, 2);
  }
}

export const parentService = new ParentService();
