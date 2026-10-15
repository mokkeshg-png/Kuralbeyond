-- Migration 00004: Triggers, Unicode NFC Normalization, and Comprehensive Indexes

-- 1. Shared updated_at Function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_user_preferences_updated_at ON public.user_preferences;
CREATE TRIGGER trg_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_learning_levels_updated_at ON public.learning_levels;
CREATE TRIGGER trg_learning_levels_updated_at BEFORE UPDATE ON public.learning_levels FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_lessons_updated_at ON public.lessons;
CREATE TRIGGER trg_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_lesson_items_updated_at ON public.lesson_items;
CREATE TRIGGER trg_lesson_items_updated_at BEFORE UPDATE ON public.lesson_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_lesson_progress_updated_at ON public.lesson_progress;
CREATE TRIGGER trg_lesson_progress_updated_at BEFORE UPDATE ON public.lesson_progress FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_learner_skill_mastery_updated_at ON public.learner_skill_mastery;
CREATE TRIGGER trg_learner_skill_mastery_updated_at BEFORE UPDATE ON public.learner_skill_mastery FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_revision_queue_updated_at ON public.revision_queue;
CREATE TRIGGER trg_revision_queue_updated_at BEFORE UPDATE ON public.revision_queue FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_daily_learning_activity_updated_at ON public.daily_learning_activity;
CREATE TRIGGER trg_daily_learning_activity_updated_at BEFORE UPDATE ON public.daily_learning_activity FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_streaks_updated_at ON public.streaks;
CREATE TRIGGER trg_streaks_updated_at BEFORE UPDATE ON public.streaks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_audio_assets_updated_at ON public.audio_assets;
CREATE TRIGGER trg_audio_assets_updated_at BEFORE UPDATE ON public.audio_assets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_voice_usage_updated_at ON public.voice_usage;
CREATE TRIGGER trg_voice_usage_updated_at BEFORE UPDATE ON public.voice_usage FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2. Unicode NFC Normalization Functions & Triggers
CREATE OR REPLACE FUNCTION public.normalize_tamil_nfc()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'tamil_letters' THEN
        IF NEW.letter IS NOT NULL THEN NEW.letter = normalize(NEW.letter, NFC); END IF;
        IF NEW.example_word_ta IS NOT NULL THEN NEW.example_word_ta = normalize(NEW.example_word_ta, NFC); END IF;
    ELSIF TG_TABLE_NAME = 'vocabulary_items' THEN
        IF NEW.word_ta IS NOT NULL THEN NEW.word_ta = normalize(NEW.word_ta, NFC); END IF;
    ELSIF TG_TABLE_NAME = 'lesson_items' THEN
        IF NEW.content_ta IS NOT NULL THEN NEW.content_ta = normalize(NEW.content_ta, NFC); END IF;
    ELSIF TG_TABLE_NAME = 'audio_assets' THEN
        IF NEW.tamil_text IS NOT NULL THEN NEW.tamil_text = normalize(NEW.tamil_text, NFC); END IF;
    ELSIF TG_TABLE_NAME = 'questions' THEN
        IF NEW.content_ta IS NOT NULL THEN NEW.content_ta = normalize(NEW.content_ta, NFC); END IF;
        IF NEW.prompt_ta IS NOT NULL THEN NEW.prompt_ta = normalize(NEW.prompt_ta, NFC); END IF;
        IF NEW.correct_answer IS NOT NULL THEN NEW.correct_answer = normalize(NEW.correct_answer, NFC); END IF;
    ELSIF TG_TABLE_NAME = 'answer_options' THEN
        IF NEW.option_text IS NOT NULL THEN NEW.option_text = normalize(NEW.option_text, NFC); END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_tamil_letters_nfc ON public.tamil_letters;
CREATE TRIGGER trg_tamil_letters_nfc BEFORE INSERT OR UPDATE ON public.tamil_letters FOR EACH ROW EXECUTE FUNCTION public.normalize_tamil_nfc();

DROP TRIGGER IF EXISTS trg_vocabulary_items_nfc ON public.vocabulary_items;
CREATE TRIGGER trg_vocabulary_items_nfc BEFORE INSERT OR UPDATE ON public.vocabulary_items FOR EACH ROW EXECUTE FUNCTION public.normalize_tamil_nfc();

DROP TRIGGER IF EXISTS trg_lesson_items_nfc ON public.lesson_items;
CREATE TRIGGER trg_lesson_items_nfc BEFORE INSERT OR UPDATE ON public.lesson_items FOR EACH ROW EXECUTE FUNCTION public.normalize_tamil_nfc();

DROP TRIGGER IF EXISTS trg_audio_assets_nfc ON public.audio_assets;
CREATE TRIGGER trg_audio_assets_nfc BEFORE INSERT OR UPDATE ON public.audio_assets FOR EACH ROW EXECUTE FUNCTION public.normalize_tamil_nfc();

DROP TRIGGER IF EXISTS trg_questions_nfc ON public.questions;
CREATE TRIGGER trg_questions_nfc BEFORE INSERT OR UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION public.normalize_tamil_nfc();

DROP TRIGGER IF EXISTS trg_answer_options_nfc ON public.answer_options;
CREATE TRIGGER trg_answer_options_nfc BEFORE INSERT OR UPDATE ON public.answer_options FOR EACH ROW EXECUTE FUNCTION public.normalize_tamil_nfc();

-- 3. Comprehensive Indexes on Foreign Keys, RLS and Filter Columns
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_parent_user_id ON public.profiles(parent_user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_user_preferences_profile_id ON public.user_preferences(profile_id);

CREATE INDEX IF NOT EXISTS idx_learning_levels_level_number ON public.learning_levels(level_number);
CREATE INDEX IF NOT EXISTS idx_lessons_level_id ON public.lessons(level_id);
CREATE INDEX IF NOT EXISTS idx_lessons_level_sequence ON public.lessons(level_number, sequence_order);
CREATE INDEX IF NOT EXISTS idx_lesson_items_lesson_id ON public.lesson_items(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_items_sequence ON public.lesson_items(lesson_id, sequence_order);

CREATE INDEX IF NOT EXISTS idx_exercises_lesson_id ON public.exercises(lesson_id);
CREATE INDEX IF NOT EXISTS idx_questions_exercise_id ON public.questions(exercise_id);
CREATE INDEX IF NOT EXISTS idx_answer_options_question_id ON public.answer_options(question_id);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_profile_id ON public.lesson_progress(profile_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON public.lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_status ON public.lesson_progress(profile_id, status);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_profile_id ON public.quiz_attempts(profile_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_lesson_id ON public.quiz_attempts(lesson_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at ON public.quiz_attempts(profile_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_learner_skill_mastery_profile ON public.learner_skill_mastery(profile_id);
CREATE INDEX IF NOT EXISTS idx_learner_skill_mastery_lookup ON public.learner_skill_mastery(profile_id, skill_type, skill_item_id);

CREATE INDEX IF NOT EXISTS idx_revision_queue_profile_id ON public.revision_queue(profile_id);
CREATE INDEX IF NOT EXISTS idx_revision_queue_due ON public.revision_queue(profile_id, next_review_at);

CREATE INDEX IF NOT EXISTS idx_user_achievements_profile_id ON public.user_achievements(profile_id);
CREATE INDEX IF NOT EXISTS idx_daily_learning_activity_profile_date ON public.daily_learning_activity(profile_id, activity_date DESC);
CREATE INDEX IF NOT EXISTS idx_xp_ledger_profile_id ON public.xp_ledger(profile_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mission_progress_profile_id ON public.mission_progress(profile_id);

CREATE INDEX IF NOT EXISTS idx_audio_assets_lookup ON public.audio_assets(item_type, item_id);
CREATE INDEX IF NOT EXISTS idx_audio_assets_status ON public.audio_assets(status);
CREATE INDEX IF NOT EXISTS idx_speaking_recordings_profile_expires ON public.speaking_recordings(profile_id, expires_at);
CREATE INDEX IF NOT EXISTS idx_speaking_recordings_expires_at ON public.speaking_recordings(expires_at);

CREATE INDEX IF NOT EXISTS idx_consent_records_child ON public.consent_records(child_profile_id);
CREATE INDEX IF NOT EXISTS idx_consent_records_parent ON public.consent_records(parent_email);
CREATE INDEX IF NOT EXISTS idx_parent_child_parent ON public.parent_child_relationships(parent_profile_id);
CREATE INDEX IF NOT EXISTS idx_parent_child_child ON public.parent_child_relationships(child_profile_id);
CREATE INDEX IF NOT EXISTS idx_content_reports_status ON public.content_reports(status);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name_profile ON public.analytics_events(event_name, profile_id);
