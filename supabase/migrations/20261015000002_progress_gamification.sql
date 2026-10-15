-- Migration 00002: Progress, Gamification, and Missions
-- Tables: lesson_progress, quiz_attempts, learner_skill_mastery, revision_queue,
--         achievements, user_achievements, daily_learning_activity, streaks,
--         xp_ledger, missions, mission_progress

-- 1. Lesson Progress Table
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    score NUMERIC NOT NULL DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
    attempts INTEGER NOT NULL DEFAULT 0,
    last_item_index INTEGER NOT NULL DEFAULT 0,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (profile_id, lesson_id)
);

-- 2. Quiz Attempts Table
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    score NUMERIC NOT NULL CHECK (score BETWEEN 0 AND 100),
    correct_count INTEGER NOT NULL DEFAULT 0,
    total_count INTEGER NOT NULL DEFAULT 0,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    weak_item_ids TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Learner Skill Mastery Table
CREATE TABLE IF NOT EXISTS public.learner_skill_mastery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_type TEXT NOT NULL CHECK (skill_type IN ('letter_recognition', 'word_reading', 'sentence_comprehension', 'listening', 'speaking')),
    skill_item_id TEXT NOT NULL,
    mastery_score NUMERIC NOT NULL DEFAULT 0.0 CHECK (mastery_score BETWEEN 0.0 AND 1.0),
    attempts INTEGER NOT NULL DEFAULT 0,
    correct INTEGER NOT NULL DEFAULT 0,
    last_attempted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    tanglish_stage TEXT NOT NULL DEFAULT 'A' CHECK (tanglish_stage IN ('A', 'B', 'C', 'D', 'E')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (profile_id, skill_type, skill_item_id)
);

-- 4. Revision Queue Table (Spaced Repetition System)
CREATE TABLE IF NOT EXISTS public.revision_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('letter', 'word', 'sentence')),
    item_id TEXT NOT NULL,
    content_ta TEXT NOT NULL,
    content_tanglish TEXT,
    content_en TEXT,
    audio_id TEXT,
    next_review_at TIMESTAMPTZ NOT NULL,
    interval_days INTEGER NOT NULL DEFAULT 1 CHECK (interval_days >= 1),
    ease_factor NUMERIC NOT NULL DEFAULT 2.5,
    consecutive_correct INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (profile_id, item_id)
);

-- 5. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_ta TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ta TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Sparkles',
    category TEXT NOT NULL CHECK (category IN ('letters', 'vocabulary', 'reading', 'streak', 'mastery')),
    criteria_type TEXT NOT NULL,
    criteria_value INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. User Achievements Table
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    earned_at DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (profile_id, achievement_id)
);

-- 7. Daily Learning Activity Table
CREATE TABLE IF NOT EXISTS public.daily_learning_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
    lessons_completed INTEGER NOT NULL DEFAULT 0,
    xp_earned INTEGER NOT NULL DEFAULT 0,
    minutes_spent INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (profile_id, activity_date)
);

-- 8. Streaks Table (Server-Authoritative tracking)
CREATE TABLE IF NOT EXISTS public.streaks (
    profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    freeze_count INTEGER NOT NULL DEFAULT 1,
    freeze_active BOOLEAN NOT NULL DEFAULT false,
    last_active_date DATE,
    grace_used_date DATE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. XP Ledger (Append-Only Immutable Ledger)
CREATE TABLE IF NOT EXISTS public.xp_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL CHECK (amount > 0),
    reason TEXT NOT NULL CHECK (reason IN ('correct_answer', 'lesson_completion', 'level_completion', 'mission_completion', 'revision_completion')),
    source_id TEXT,
    idempotency_key TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. Missions Table (Real-Life Tamil Missions)
CREATE TABLE IF NOT EXISTS public.missions (
    id TEXT PRIMARY KEY,
    level_number INTEGER NOT NULL,
    title_en TEXT NOT NULL,
    title_ta TEXT NOT NULL,
    prompt_en TEXT NOT NULL,
    prompt_ta TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('family', 'home', 'nature', 'community', 'culture')),
    target_words_ta TEXT[] NOT NULL DEFAULT '{}',
    target_words_en TEXT[] NOT NULL DEFAULT '{}',
    xp_reward INTEGER NOT NULL DEFAULT 25,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. Mission Progress Table
CREATE TABLE IF NOT EXISTS public.mission_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    mission_id TEXT NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    completed_at DATE,
    student_reflection TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (profile_id, mission_id)
);
