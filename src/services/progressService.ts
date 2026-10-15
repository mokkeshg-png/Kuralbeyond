import { QuizAttempt, UserStats, DailyActivityLog, AchievementBadge } from '../types';
import { LocalStorageAdapter } from './storageAdapter';

export interface IProgressService {
  getStats(): Promise<UserStats>;
  saveItemProgress(lessonId: string, itemIndex: number): Promise<void>;
  completeLesson(lessonId: string, correctCount: number, totalCount: number, timeSpentSeconds: number): Promise<QuizAttempt>;
  useStreakFreeze(): Promise<boolean>;
  getBadges(): Promise<AchievementBadge[]>;
  getActivityLogs(): Promise<DailyActivityLog[]>;
}

export class ProgressService implements IProgressService {
  async getStats(): Promise<UserStats> {
    const stats = LocalStorageAdapter.getStats();
    this.checkStreakGrace(stats);
    return stats;
  }

  private checkStreakGrace(stats: UserStats): void {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = stats.last_streak_date;
    if (!lastDate) return;

    const diffDays = Math.floor((new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 3600 * 24));

    if (diffDays === 0) {
      // Practiced today, streak active
    } else if (diffDays === 1) {
      // Normal 1-day continuation
    } else if (diffDays === 2) {
      // Grace period or streak freeze
      if (stats.streak_freeze_active) {
        // Protected by streak freeze
        stats.streak_freeze_active = false;
        LocalStorageAdapter.setStats(stats);
      } else {
        // Automatic 1-day grace: maintain streak without penalty
      }
    } else {
      // Greater than 2 days: grace expired, but never punitive shame
      if (stats.streak_days > 1) {
        stats.streak_days = 1; // Soft reset to 1 instead of 0
        LocalStorageAdapter.setStats(stats);
      }
    }
  }

  async saveItemProgress(lessonId: string, itemIndex: number): Promise<void> {
    const profile = LocalStorageAdapter.getProfile();
    const progressList = LocalStorageAdapter.getLessonProgress();
    const existingIdx = progressList.findIndex(p => p.lesson_id === lessonId);

    if (existingIdx >= 0) {
      progressList[existingIdx].last_item_index = itemIndex;
      progressList[existingIdx].status = 'in_progress';
    } else {
      progressList.push({
        id: 'lp-' + Math.random().toString(36).substring(2, 9),
        profile_id: profile.id,
        lesson_id: lessonId,
        status: 'in_progress',
        score: 0,
        attempts: 1,
        last_item_index: itemIndex,
      });
    }

    LocalStorageAdapter.setLessonProgress(progressList);
  }

  async completeLesson(
    lessonId: string, 
    correctCount: number, 
    totalCount: number, 
    timeSpentSeconds: number
  ): Promise<QuizAttempt> {
    const profile = LocalStorageAdapter.getProfile();
    const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 100;
    
    // 1. Save lesson progress
    const progressList = LocalStorageAdapter.getLessonProgress();
    const existingIdx = progressList.findIndex(p => p.lesson_id === lessonId);
    
    if (existingIdx >= 0) {
      progressList[existingIdx].status = 'completed';
      progressList[existingIdx].score = accuracy;
      progressList[existingIdx].attempts += 1;
      progressList[existingIdx].completed_at = new Date().toISOString();
      progressList[existingIdx].last_item_index = 0;
    } else {
      progressList.push({
        id: 'lp-' + Math.random().toString(36).substring(2, 9),
        profile_id: profile.id,
        lesson_id: lessonId,
        status: 'completed',
        score: accuracy,
        attempts: 1,
        last_item_index: 0,
        completed_at: new Date().toISOString(),
      });
    }
    LocalStorageAdapter.setLessonProgress(progressList);

    // 2. Save quiz attempt
    const attempt: QuizAttempt = {
      id: 'qa-' + Math.random().toString(36).substring(2, 9),
      profile_id: profile.id,
      lesson_id: lessonId,
      score: accuracy,
      correct_count: correctCount,
      total_count: totalCount,
      time_spent_seconds: timeSpentSeconds,
      created_at: new Date().toISOString(),
      weak_item_ids: [],
    };
    const attempts = LocalStorageAdapter.getQuizAttempts();
    attempts.unshift(attempt);
    LocalStorageAdapter.setQuizAttempts(attempts);

    // 3. Update stats: XP, Daily Goal & Streak
    const stats = LocalStorageAdapter.getStats();
    const xpGained = (correctCount * 10) + 5; // 10 XP per correct + 5 XP for completion
    stats.xp += xpGained;
    stats.daily_goal_progress = Math.min(stats.daily_goal_target, stats.daily_goal_progress + 1);

    const today = new Date().toISOString().split('T')[0];
    if (stats.last_streak_date !== today) {
      stats.streak_days += 1;
      stats.last_streak_date = today;
    }

    // Letters & words increment
    stats.letters_mastered += 2;
    stats.words_learned += 3;
    LocalStorageAdapter.setStats(stats);

    // 4. Update activity log
    const activityLogs = LocalStorageAdapter.getActivityLogs();
    const todayLogIdx = activityLogs.findIndex(a => a.date === today);
    const minutes = Math.max(1, Math.round(timeSpentSeconds / 60));

    if (todayLogIdx >= 0) {
      activityLogs[todayLogIdx].lessons_completed += 1;
      activityLogs[todayLogIdx].xp_earned += xpGained;
      activityLogs[todayLogIdx].minutes_spent += minutes;
    } else {
      activityLogs.push({
        date: today,
        lessons_completed: 1,
        xp_earned: xpGained,
        minutes_spent: minutes,
      });
    }
    LocalStorageAdapter.setActivityLogs(activityLogs);

    // 5. Check and unlock badges
    this.evaluateBadges(stats);

    return attempt;
  }

  private evaluateBadges(stats: UserStats): void {
    const badges = LocalStorageAdapter.getBadges();
    let updated = false;

    for (const b of badges) {
      if (!b.is_earned) {
        if (b.criteria_type === 'streak_days' && stats.streak_days >= b.criteria_value) {
          b.is_earned = true;
          b.earned_at = new Date().toISOString().split('T')[0];
          updated = true;
        } else if (b.criteria_type === 'words_learned' && stats.words_learned >= b.criteria_value) {
          b.is_earned = true;
          b.earned_at = new Date().toISOString().split('T')[0];
          updated = true;
        } else if (b.criteria_type === 'letters_mastered' && stats.letters_mastered >= b.criteria_value) {
          b.is_earned = true;
          b.earned_at = new Date().toISOString().split('T')[0];
          updated = true;
        }
      }
    }

    if (updated) {
      LocalStorageAdapter.setBadges(badges);
    }
  }

  async useStreakFreeze(): Promise<boolean> {
    const stats = LocalStorageAdapter.getStats();
    if (stats.streak_freeze_available && !stats.streak_freeze_active) {
      stats.streak_freeze_active = true;
      stats.streak_freeze_available = false;
      LocalStorageAdapter.setStats(stats);
      return true;
    }
    return false;
  }

  async getBadges(): Promise<AchievementBadge[]> {
    return LocalStorageAdapter.getBadges();
  }

  async getActivityLogs(): Promise<DailyActivityLog[]> {
    return LocalStorageAdapter.getActivityLogs();
  }
}

export const progressService = new ProgressService();
