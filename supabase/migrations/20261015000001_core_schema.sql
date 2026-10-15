-- Migration 00001: Core Schema
-- Tables: profiles, user_roles, user_preferences, learning_levels, lessons, lesson_items,
--         tamil_letters, vocabulary_items, exercises, questions, answer_options

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    parent_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    interface_language TEXT NOT NULL DEFAULT 'en' CHECK (interface_language IN ('en', 'ta')),
    grade INTEGER NOT NULL DEFAULT 3 CHECK (grade BETWEEN 1 AND 12),
    age_mode TEXT NOT NULL DEFAULT 'explorers' CHECK (age_mode IN ('sprouts', 'explorers', 'scholars')),
    date_of_birth DATE,
    is_child BOOLEAN NOT NULL DEFAULT false,
    parental_consent BOOLEAN NOT NULL DEFAULT false,
    parent_email TEXT,
    parent_phone TEXT,
    avatar_id TEXT NOT NULL DEFAULT 'avatar-kili',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure a user cannot have duplicate profiles unless they are distinct child profiles
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_user_id_unique ON public.profiles (user_id) WHERE user_id IS NOT NULL;

-- 2. User Roles Table (Security Definer verified, no raw_user_meta_data trust)
CREATE TABLE IF NOT EXISTS public.user_roles (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('learner', 'parent', 'teacher', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, role)
);

-- 3. User Preferences Table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    daily_goal INTEGER NOT NULL DEFAULT 1 CHECK (daily_goal BETWEEN 1 AND 3),
    audio_speed NUMERIC NOT NULL DEFAULT 1.0 CHECK (audio_speed IN (0.5, 0.75, 1.0)),
    reduced_motion BOOLEAN NOT NULL DEFAULT false,
    tanglish_enabled BOOLEAN NOT NULL DEFAULT true,
    notifications_enabled BOOLEAN NOT NULL DEFAULT true,
    high_contrast BOOLEAN NOT NULL DEFAULT false,
    text_size_multiplier NUMERIC NOT NULL DEFAULT 1.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Learning Levels Table
CREATE TABLE IF NOT EXISTS public.learning_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level_number INTEGER NOT NULL UNIQUE CHECK (level_number BETWEEN 0 AND 7),
    title_en TEXT NOT NULL,
    title_ta TEXT NOT NULL,
    description_en TEXT,
    description_ta TEXT,
    cefr TEXT NOT NULL DEFAULT 'Pre-A1',
    estimated_minutes INTEGER NOT NULL DEFAULT 15,
    total_lessons INTEGER NOT NULL DEFAULT 0,
    icon TEXT NOT NULL DEFAULT 'Sparkles',
    prerequisite_level_id UUID REFERENCES public.learning_levels(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level_id UUID NOT NULL REFERENCES public.learning_levels(id) ON DELETE CASCADE,
    level_number INTEGER NOT NULL CHECK (level_number BETWEEN 0 AND 7),
    title_en TEXT NOT NULL,
    title_ta TEXT NOT NULL,
    description_en TEXT,
    description_ta TEXT,
    sequence_order INTEGER NOT NULL,
    lesson_type TEXT NOT NULL CHECK (lesson_type IN ('letters', 'vocabulary', 'sentences', 'listening', 'speaking', 'reading', 'story')),
    estimated_minutes INTEGER NOT NULL DEFAULT 10,
    tanglish_stage TEXT NOT NULL DEFAULT 'A' CHECK (tanglish_stage IN ('A', 'B', 'C', 'D', 'E')),
    items_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (level_id, sequence_order)
);

-- 6. Lesson Items Table
CREATE TABLE IF NOT EXISTS public.lesson_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('letter', 'word', 'sentence', 'passage', 'story_panel')),
    content_ta TEXT NOT NULL,
    content_tanglish TEXT,
    content_en TEXT,
    audio_id TEXT,
    audio_url TEXT,
    image_url TEXT,
    phonics_guide TEXT,
    ipa TEXT,
    tracing_svg_path TEXT,
    sequence_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Tamil Letters Table (includes ஃ / Aytham)
CREATE TABLE IF NOT EXISTS public.tamil_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    letter TEXT NOT NULL UNIQUE,
    unicode_codepoint TEXT,
    letter_type TEXT NOT NULL CHECK (letter_type IN ('vowel', 'consonant', 'aytham', 'vowel_sign', 'virama', 'uyirmei')),
    tanglish_primary TEXT NOT NULL,
    tanglish_alternatives TEXT[] DEFAULT '{}',
    ipa TEXT,
    example_word_ta TEXT,
    example_word_en TEXT,
    example_word_audio_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Vocabulary Items Table
CREATE TABLE IF NOT EXISTS public.vocabulary_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL CHECK (category IN ('family', 'greetings', 'numbers', 'colours', 'food', 'animals', 'actions', 'nature', 'community', 'school')),
    word_ta TEXT NOT NULL UNIQUE,
    word_tanglish TEXT NOT NULL,
    word_en TEXT NOT NULL,
    audio_id TEXT,
    image_url TEXT,
    level_number INTEGER NOT NULL DEFAULT 2,
    difficulty_modifier NUMERIC NOT NULL DEFAULT 1.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Exercises Table
CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    exercise_type TEXT NOT NULL CHECK (exercise_type IN ('tracing', 'vocab_card', 'mcq', 'matching', 'fill_blank', 'ordering', 'speaking', 'listening', 'reading', 'story')),
    prompt_en TEXT NOT NULL,
    prompt_ta TEXT NOT NULL,
    sequence_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
    exercise_type TEXT NOT NULL,
    prompt_en TEXT NOT NULL,
    prompt_ta TEXT NOT NULL,
    audio_prompt_id TEXT,
    audio_id TEXT,
    content_ta TEXT,
    content_tanglish TEXT,
    content_en TEXT,
    correct_answer TEXT NOT NULL,
    explanation_en TEXT,
    explanation_ta TEXT,
    word_bank JSONB,
    ordered_solution JSONB,
    pairs JSONB,
    reading_passage_ta TEXT,
    reading_passage_tanglish TEXT,
    story_panels JSONB,
    tracing_data JSONB,
    sequence_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. Answer Options Table
CREATE TABLE IF NOT EXISTS public.answer_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    option_tanglish TEXT,
    option_en TEXT,
    is_correct BOOLEAN NOT NULL DEFAULT false,
    audio_id TEXT,
    image_url TEXT,
    sequence_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
