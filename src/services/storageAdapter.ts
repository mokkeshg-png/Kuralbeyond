import { 
  UserProfile, 
  UserPreferences, 
  LessonProgress, 
  QuizAttempt, 
  LearnerSkillMastery, 
  RevisionItem, 
  AchievementBadge, 
  RealLifeMission, 
  DailyActivityLog,
  UserStats
} from '../types';
import { INITIAL_BADGES } from '../data/badgesData';
import { INITIAL_MISSIONS } from '../data/missionsData';

const STORAGE_KEYS = {
  PROFILE: 'kuralbeyond_profile',
  PREFERENCES: 'kuralbeyond_preferences',
  PROGRESS: 'kuralbeyond_progress',
  QUIZ_ATTEMPTS: 'kuralbeyond_quiz_attempts',
  SKILL_MASTERY: 'kuralbeyond_skill_mastery',
  REVISION_QUEUE: 'kuralbeyond_revision_queue',
  BADGES: 'kuralbeyond_badges',
  MISSIONS: 'kuralbeyond_missions',
  ACTIVITY_LOG: 'kuralbeyond_activity_log',
  USER_STATS: 'kuralbeyond_user_stats',
  INITIALIZED: 'kuralbeyond_initialized_v1',
};

// Default seed user
export const DEFAULT_PROFILE: UserProfile = {
  id: 'usr-default-1',
  email: 'learner@kuralbeyond.edu',
  display_name: 'Aarav',
  interface_language: 'en',
  grade: 3,
  age_mode: 'sprouts',
  is_child: true,
  parental_consent: true,
  parent_email: 'parent@example.com',
  avatar_id: 'avatar-kili',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  daily_goal: 1,
  audio_speed: 1.0,
  reduced_motion: false,
  tanglish_enabled: true,
  notifications_enabled: true,
  high_contrast: false,
  text_size_multiplier: 1.0,
};

export const DEFAULT_STATS: UserStats = {
  xp: 120,
  streak_days: 5,
  streak_freeze_available: true,
  streak_freeze_active: false,
  last_streak_date: new Date().toISOString().split('T')[0],
  script_power_stage: 'B',
  script_power_percentage: 42,
  words_learned: 18,
  letters_mastered: 6,
  daily_goal_progress: 1,
  daily_goal_target: 1,
};

export const INITIAL_REVISION_QUEUE: RevisionItem[] = [
  {
    id: 'rev-1',
    profile_id: DEFAULT_PROFILE.id,
    item_type: 'letter',
    item_id: 'letter_a',
    content_ta: 'அ',
    content_tanglish: 'a',
    content_en: 'Short a (அம்மா - Mother)',
    audio_id: 'letter_a',
    next_review_at: new Date().toISOString(),
    interval_days: 1,
    ease_factor: 2.5,
    consecutive_correct: 1,
  },
  {
    id: 'rev-2',
    profile_id: DEFAULT_PROFILE.id,
    item_type: 'letter',
    item_id: 'letter_aa',
    content_ta: 'ஆ',
    content_tanglish: 'aa',
    content_en: 'Long aa (ஆடு - Goat)',
    audio_id: 'letter_aa',
    next_review_at: new Date().toISOString(),
    interval_days: 3,
    ease_factor: 2.5,
    consecutive_correct: 2,
  },
  {
    id: 'rev-3',
    profile_id: DEFAULT_PROFILE.id,
    item_type: 'word',
    item_id: 'vocab_vanakkam',
    content_ta: 'வணக்கம்',
    content_tanglish: 'vanakkam',
    content_en: 'Greetings / Hello',
    audio_id: 'vocab_vanakkam',
    next_review_at: new Date().toISOString(),
    interval_days: 1,
    ease_factor: 2.5,
    consecutive_correct: 1,
  },
];

export const INITIAL_ACTIVITY_LOGS: DailyActivityLog[] = [
  { date: '2026-10-10', lessons_completed: 1, xp_earned: 25, minutes_spent: 8 },
  { date: '2026-10-11', lessons_completed: 2, xp_earned: 45, minutes_spent: 15 },
  { date: '2026-10-12', lessons_completed: 1, xp_earned: 20, minutes_spent: 9 },
  { date: '2026-10-13', lessons_completed: 1, xp_earned: 25, minutes_spent: 10 },
  { date: '2026-10-14', lessons_completed: 2, xp_earned: 50, minutes_spent: 16 },
  { date: '2026-10-15', lessons_completed: 1, xp_earned: 30, minutes_spent: 11 },
];

export class LocalStorageAdapter {
  private static init() {
    if (typeof window === 'undefined') return;
    const isInit = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!isInit) {
      // Migrate legacy tamilpalam_* keys if present
      const legacyInit = localStorage.getItem('tamilpalam_initialized_v1');
      if (legacyInit) {
        const legacyMap: Record<string, string> = {
          'tamilpalam_profile': STORAGE_KEYS.PROFILE,
          'tamilpalam_preferences': STORAGE_KEYS.PREFERENCES,
          'tamilpalam_progress': STORAGE_KEYS.PROGRESS,
          'tamilpalam_quiz_attempts': STORAGE_KEYS.QUIZ_ATTEMPTS,
          'tamilpalam_skill_mastery': STORAGE_KEYS.SKILL_MASTERY,
          'tamilpalam_revision_queue': STORAGE_KEYS.REVISION_QUEUE,
          'tamilpalam_badges': STORAGE_KEYS.BADGES,
          'tamilpalam_missions': STORAGE_KEYS.MISSIONS,
          'tamilpalam_activity_log': STORAGE_KEYS.ACTIVITY_LOG,
          'tamilpalam_user_stats': STORAGE_KEYS.USER_STATS,
        };
        for (const [oldKey, newKey] of Object.entries(legacyMap)) {
          const val = localStorage.getItem(oldKey);
          if (val) localStorage.setItem(newKey, val);
        }
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
        return;
      }

      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(DEFAULT_PREFERENCES));
      localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(DEFAULT_STATS));
      localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(INITIAL_BADGES));
      localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(INITIAL_MISSIONS));
      localStorage.setItem(STORAGE_KEYS.REVISION_QUEUE, JSON.stringify(INITIAL_REVISION_QUEUE));
      localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOG, JSON.stringify(INITIAL_ACTIVITY_LOGS));
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.SKILL_MASTERY, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    }
  }

  static get<T>(key: string, defaultValue: T): T {
    this.init();
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    this.init();
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage quota or serialization error', e);
    }
  }

  // Domain helpers
  static getProfile(): UserProfile {
    return this.get<UserProfile>(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
  }
  static setProfile(p: UserProfile): void {
    this.set(STORAGE_KEYS.PROFILE, p);
  }

  static getPreferences(): UserPreferences {
    return this.get<UserPreferences>(STORAGE_KEYS.PREFERENCES, DEFAULT_PREFERENCES);
  }
  static setPreferences(pref: UserPreferences): void {
    this.set(STORAGE_KEYS.PREFERENCES, pref);
  }

  static getStats(): UserStats {
    return this.get<UserStats>(STORAGE_KEYS.USER_STATS, DEFAULT_STATS);
  }
  static setStats(s: UserStats): void {
    this.set(STORAGE_KEYS.USER_STATS, s);
  }

  static getLessonProgress(): LessonProgress[] {
    return this.get<LessonProgress[]>(STORAGE_KEYS.PROGRESS, []);
  }
  static setLessonProgress(lp: LessonProgress[]): void {
    this.set(STORAGE_KEYS.PROGRESS, lp);
  }

  static getQuizAttempts(): QuizAttempt[] {
    return this.get<QuizAttempt[]>(STORAGE_KEYS.QUIZ_ATTEMPTS, []);
  }
  static setQuizAttempts(qa: QuizAttempt[]): void {
    this.set(STORAGE_KEYS.QUIZ_ATTEMPTS, qa);
  }

  static getSkillMastery(): LearnerSkillMastery[] {
    return this.get<LearnerSkillMastery[]>(STORAGE_KEYS.SKILL_MASTERY, []);
  }
  static setSkillMastery(sm: LearnerSkillMastery[]): void {
    this.set(STORAGE_KEYS.SKILL_MASTERY, sm);
  }

  static getRevisionQueue(): RevisionItem[] {
    return this.get<RevisionItem[]>(STORAGE_KEYS.REVISION_QUEUE, INITIAL_REVISION_QUEUE);
  }
  static setRevisionQueue(rq: RevisionItem[]): void {
    this.set(STORAGE_KEYS.REVISION_QUEUE, rq);
  }

  static getBadges(): AchievementBadge[] {
    return this.get<AchievementBadge[]>(STORAGE_KEYS.BADGES, INITIAL_BADGES);
  }
  static setBadges(b: AchievementBadge[]): void {
    this.set(STORAGE_KEYS.BADGES, b);
  }

  static getMissions(): RealLifeMission[] {
    return this.get<RealLifeMission[]>(STORAGE_KEYS.MISSIONS, INITIAL_MISSIONS);
  }
  static setMissions(m: RealLifeMission[]): void {
    this.set(STORAGE_KEYS.MISSIONS, m);
  }

  static getActivityLogs(): DailyActivityLog[] {
    return this.get<DailyActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOG, INITIAL_ACTIVITY_LOGS);
  }
  static setActivityLogs(al: DailyActivityLog[]): void {
    this.set(STORAGE_KEYS.ACTIVITY_LOG, al);
  }

  static resetAll(): void {
    localStorage.clear();
    this.init();
  }
}
