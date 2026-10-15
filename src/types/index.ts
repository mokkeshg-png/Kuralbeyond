export type AgeMode = 'sprouts' | 'explorers' | 'scholars';

export type StandardGrade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type InterfaceLanguage = 'en' | 'ta';

export type TanglishStage = 'A' | 'B' | 'C' | 'D' | 'E';

export type SkillType = 
  | 'letter_recognition' 
  | 'word_reading' 
  | 'sentence_comprehension' 
  | 'listening' 
  | 'speaking';

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  interface_language: InterfaceLanguage;
  grade: StandardGrade;
  age_mode: AgeMode;
  is_child: boolean;
  parental_consent: boolean;
  parent_email?: string;
  parent_phone?: string;
  avatar_id: string;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  daily_goal: number; // 1, 2, or 3 lessons
  audio_speed: number; // 0.5, 0.75, 1.0
  reduced_motion: boolean;
  tanglish_enabled: boolean; // manual "Need help" override
  notifications_enabled: boolean;
  high_contrast: boolean;
  text_size_multiplier: number; // 1.0, 1.15, 1.3
}

export interface LearningLevel {
  id: string;
  level_number: number; // 0 to 7
  title_en: string;
  title_ta: string;
  description_en: string;
  description_ta: string;
  cefr: string; // Pre-A1, A1, A1+, A2, etc.
  estimated_minutes: number;
  total_lessons: number;
  completed_lessons: number;
  is_unlocked: boolean;
  is_completed: boolean;
  icon: string;
}

export type LessonType = 
  | 'letters' 
  | 'vocabulary' 
  | 'sentences' 
  | 'listening' 
  | 'speaking' 
  | 'reading' 
  | 'story';

export interface Lesson {
  id: string;
  level_id: string;
  level_number: number;
  title_en: string;
  title_ta: string;
  description_en: string;
  description_ta: string;
  sequence_order: number;
  lesson_type: LessonType;
  estimated_minutes: number;
  tanglish_stage: TanglishStage;
  items_count: number;
  is_completed: boolean;
  score?: number;
  stars?: number; // 1, 2, or 3
  last_item_index?: number;
}

export interface LessonItem {
  id: string;
  lesson_id: string;
  item_type: 'letter' | 'word' | 'sentence' | 'story_panel';
  content_ta: string;
  content_tanglish: string;
  content_en: string;
  audio_id: string;
  image_url?: string;
  phonics_guide?: string;
  ipa?: string;
  tracing_svg_path?: string;
  sequence_order: number;
}

export type ExerciseType = 
  | 'tracing'
  | 'vocab_card'
  | 'mcq' 
  | 'matching' 
  | 'fill_blank' 
  | 'ordering' 
  | 'speaking' 
  | 'listening' 
  | 'reading'
  | 'story';

export interface AnswerOption {
  id: string;
  option_text: string;
  option_tanglish?: string;
  option_en?: string;
  is_correct: boolean;
  audio_id?: string;
  image_url?: string;
}

export interface Question {
  id: string;
  exercise_id: string;
  exercise_type: ExerciseType;
  prompt_en: string;
  prompt_ta: string;
  audio_prompt_id?: string;
  audio_id?: string;
  content_ta: string;
  content_tanglish?: string;
  content_en?: string;
  correct_answer: string;
  explanation_en: string;
  explanation_ta: string;
  options?: AnswerOption[];
  word_bank?: { id: string; text_ta: string; text_tanglish?: string; audio_id?: string }[];
  ordered_solution?: string[];
  pairs?: { id: string; left_ta: string; right_en: string; audio_id?: string }[];
  reading_passage_ta?: string;
  reading_passage_tanglish?: string;
  story_panels?: {
    image_url: string;
    caption_ta: string;
    caption_tanglish: string;
    caption_en: string;
    audio_id: string;
  }[];
  tracing_data?: {
    letter: string;
    outline_path: string;
    guide_dots?: { x: number; y: number }[];
  };
}

export interface Exercise {
  id: string;
  lesson_id: string;
  exercise_type: ExerciseType;
  prompt_en: string;
  prompt_ta: string;
  sequence_order: number;
  questions: Question[];
}

export interface LessonProgress {
  id: string;
  profile_id: string;
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number;
  attempts: number;
  last_item_index: number;
  completed_at?: string;
}

export interface QuizAttempt {
  id: string;
  profile_id: string;
  lesson_id: string;
  score: number;
  correct_count: number;
  total_count: number;
  time_spent_seconds: number;
  created_at: string;
  weak_item_ids: string[];
}

export interface LearnerSkillMastery {
  id: string;
  profile_id: string;
  skill_type: SkillType;
  skill_item_id: string;
  mastery_score: number; // 0.0 to 1.0
  attempts: number;
  correct: number;
  last_attempted_at: string;
  tanglish_stage: TanglishStage;
}

export interface RevisionItem {
  id: string;
  profile_id: string;
  item_type: 'letter' | 'word' | 'sentence';
  item_id: string;
  content_ta: string;
  content_tanglish: string;
  content_en: string;
  audio_id: string;
  next_review_at: string;
  interval_days: number;
  ease_factor: number;
  consecutive_correct: number;
}

export interface AchievementBadge {
  id: string;
  name_en: string;
  name_ta: string;
  description_en: string;
  description_ta: string;
  icon: string;
  category: 'letters' | 'vocabulary' | 'reading' | 'streak' | 'mastery';
  criteria_type: string;
  criteria_value: number;
  is_earned: boolean;
  earned_at?: string;
}

export interface RealLifeMission {
  id: string;
  level_number: number;
  title_en: string;
  title_ta: string;
  prompt_en: string;
  prompt_ta: string;
  category: 'family' | 'home' | 'nature' | 'community' | 'culture';
  target_words_ta: string[];
  target_words_en: string[];
  xp_reward: number;
  is_completed: boolean;
  completed_at?: string;
  student_reflection?: string;
}

export interface DailyActivityLog {
  date: string; // YYYY-MM-DD
  lessons_completed: number;
  xp_earned: number;
  minutes_spent: number;
}

export interface UserStats {
  xp: number;
  streak_days: number;
  streak_freeze_available: boolean;
  streak_freeze_active: boolean;
  last_streak_date: string;
  script_power_stage: TanglishStage;
  script_power_percentage: number;
  words_learned: number;
  letters_mastered: number;
  daily_goal_progress: number;
  daily_goal_target: number;
}

export interface ParentSummary {
  child_name: string;
  grade: StandardGrade;
  age_mode: AgeMode;
  total_xp: number;
  current_streak: number;
  total_minutes_week: number;
  completed_lessons_count: number;
  mastery_by_skill: Record<SkillType, number>;
  recent_activity: DailyActivityLog[];
  items_needing_revision: number;
}
