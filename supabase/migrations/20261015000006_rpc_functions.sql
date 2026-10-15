-- Migration 00006: Server-Authoritative Logic & Stored Procedures (RPCs)
-- All procedures are SECURITY DEFINER with fixed search_path = public

-- =========================================================================
-- 1. submit_item_answer: Mastery math, SRS intervals & Tanglish stage evaluation
-- =========================================================================
CREATE OR REPLACE FUNCTION public.submit_item_answer(
    p_profile_id UUID,
    p_skill_type TEXT,
    p_item_id TEXT,
    p_is_correct BOOLEAN,
    p_difficulty NUMERIC DEFAULT 1.0
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_existing_mastery RECORD;
    v_attempts INT;
    v_correct INT;
    v_days_since NUMERIC;
    v_recency_weight NUMERIC;
    v_clamped_diff NUMERIC;
    v_new_mastery_score NUMERIC;
    v_new_stage TEXT;
    v_queue_item RECORD;
    v_new_interval INT;
    v_consecutive INT;
    v_next_review TIMESTAMPTZ;
    v_intervals INT[] := ARRAY[1, 3, 7, 14, 30, 60];
    v_step_idx INT;
    v_xp_awarded INT := 0;
    v_idempotency_key TEXT;
BEGIN
    -- Verify permission
    IF NOT public.owns_profile(p_profile_id) AND NOT public.has_role('admin') THEN
        RAISE EXCEPTION 'Not authorized to record progress for profile %', p_profile_id;
    END IF;

    -- 1. Update learner_skill_mastery with exponential recency decay over 14 days
    SELECT * INTO v_existing_mastery FROM public.learner_skill_mastery
    WHERE profile_id = p_profile_id AND skill_type = p_skill_type AND skill_item_id = p_item_id;

    IF FOUND THEN
        v_attempts := v_existing_mastery.attempts + 1;
        v_correct := v_existing_mastery.correct + (CASE WHEN p_is_correct THEN 1 ELSE 0 END);
        v_days_since := GREATEST(0, EXTRACT(EPOCH FROM (now() - v_existing_mastery.last_attempted_at)) / 86400.0);
        v_recency_weight := exp(-0.0495 * v_days_since);
        v_clamped_diff := LEAST(1.25, GREATEST(0.90, COALESCE(p_difficulty, 1.0)));
        v_new_mastery_score := LEAST(1.0, GREATEST(0.0, ROUND(((v_correct::numeric / v_attempts) * v_recency_weight * v_clamped_diff)::numeric, 2)));

        -- Tanglish stage determination per PRD Section 23
        IF v_new_mastery_score >= 0.90 THEN v_new_stage := 'E';
        ELSIF v_new_mastery_score >= 0.85 THEN v_new_stage := 'D';
        ELSIF v_new_mastery_score >= 0.70 THEN v_new_stage := 'C';
        ELSIF v_new_mastery_score >= 0.50 THEN v_new_stage := 'B';
        ELSE v_new_stage := 'A';
        END IF;

        UPDATE public.learner_skill_mastery
        SET attempts = v_attempts,
            correct = v_correct,
            mastery_score = v_new_mastery_score,
            tanglish_stage = v_new_stage,
            last_attempted_at = now(),
            updated_at = now()
        WHERE id = v_existing_mastery.id;
    ELSE
        v_attempts := 1;
        v_correct := CASE WHEN p_is_correct THEN 1 ELSE 0 END;
        v_new_mastery_score := CASE WHEN p_is_correct THEN LEAST(1.0, 0.80 * COALESCE(p_difficulty, 1.0)) ELSE 0.20 END;
        v_new_stage := CASE WHEN p_is_correct THEN 'B' ELSE 'A' END;

        INSERT INTO public.learner_skill_mastery (
            profile_id, skill_type, skill_item_id, mastery_score, attempts, correct, last_attempted_at, tanglish_stage
        ) VALUES (
            p_profile_id, p_skill_type, p_item_id, v_new_mastery_score, v_attempts, v_correct, now(), v_new_stage
        );
    END IF;

    -- 2. Update revision_queue intervals (1 -> 3 -> 7 -> 14 -> 30 -> 60 days, reset to 1 on failure)
    SELECT * INTO v_queue_item FROM public.revision_queue
    WHERE profile_id = p_profile_id AND item_id = p_item_id;

    IF FOUND THEN
        IF p_is_correct THEN
            v_consecutive := v_queue_item.consecutive_correct + 1;
            v_step_idx := LEAST(v_consecutive + 1, 6); -- 1-indexed in PostgreSQL
            v_new_interval := v_intervals[v_step_idx];
        ELSE
            v_consecutive := 0;
            v_new_interval := 1;
        END IF;

        v_next_review := now() + (v_new_interval * interval '1 day');

        UPDATE public.revision_queue
        SET interval_days = v_new_interval,
            consecutive_correct = v_consecutive,
            next_review_at = v_next_review,
            updated_at = now()
        WHERE id = v_queue_item.id;
    END IF;

    -- 3. Award XP for correct answer if applicable
    IF p_is_correct THEN
        v_xp_awarded := 10;
        v_idempotency_key := 'item_' || p_profile_id::text || '_' || p_item_id || '_' || now()::date::text;
        INSERT INTO public.xp_ledger (profile_id, amount, reason, source_id, idempotency_key)
        VALUES (p_profile_id, v_xp_awarded, 'correct_answer', p_item_id, v_idempotency_key)
        ON CONFLICT (idempotency_key) DO NOTHING;
    END IF;

    RETURN jsonb_build_object(
        'item_id', p_item_id,
        'skill_type', p_skill_type,
        'mastery_score', v_new_mastery_score,
        'tanglish_stage', v_new_stage,
        'next_review_at', v_next_review,
        'xp_awarded', v_xp_awarded
    );
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- 2. complete_lesson: Idempotent lesson completion, XP award & streak grace
-- =========================================================================
CREATE OR REPLACE FUNCTION public.complete_lesson(
    p_profile_id UUID,
    p_lesson_id UUID,
    p_correct_count INTEGER,
    p_total_count INTEGER,
    p_time_spent_seconds INTEGER,
    p_idempotency_key TEXT
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_accuracy NUMERIC;
    v_minutes INT;
    v_xp_awarded INT := 0;
    v_streak_row RECORD;
    v_current_streak INT := 1;
    v_longest_streak INT := 1;
    v_today DATE := CURRENT_DATE;
    v_is_level_complete BOOLEAN := false;
    v_lesson_record RECORD;
    v_uncompleted_in_level INT;
    v_attempt_id UUID;
    v_already_processed BOOLEAN := false;
BEGIN
    -- Verify caller ownership
    IF NOT public.owns_profile(p_profile_id) AND NOT public.has_role('admin') THEN
        RAISE EXCEPTION 'Not authorized to complete lesson for profile %', p_profile_id;
    END IF;

    -- Idempotency check: if key was already processed, return existing status
    IF p_idempotency_key IS NOT NULL THEN
        SELECT EXISTS(SELECT 1 FROM public.xp_ledger WHERE idempotency_key = p_idempotency_key) INTO v_already_processed;
        IF v_already_processed THEN
            SELECT id INTO v_attempt_id FROM public.quiz_attempts 
            WHERE profile_id = p_profile_id AND lesson_id = p_lesson_id 
            ORDER BY created_at DESC LIMIT 1;

            RETURN jsonb_build_object(
                'status', 'already_completed',
                'quiz_attempt_id', v_attempt_id,
                'message', 'Lesson submission already processed (idempotent)'
            );
        END IF;
    END IF;

    SELECT * INTO v_lesson_record FROM public.lessons WHERE id = p_lesson_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Lesson with ID % not found', p_lesson_id;
    END IF;

    v_accuracy := ROUND(((p_correct_count::numeric / GREATEST(p_total_count, 1)) * 100)::numeric, 0);
    v_minutes := GREATEST(1, ROUND(p_time_spent_seconds / 60.0));

    -- 1. Upsert lesson_progress
    INSERT INTO public.lesson_progress (
        profile_id, lesson_id, status, score, attempts, last_item_index, completed_at
    ) VALUES (
        p_profile_id, p_lesson_id, 'completed', v_accuracy, 1, 0, now()
    )
    ON CONFLICT (profile_id, lesson_id) DO UPDATE SET
        status = 'completed',
        score = EXCLUDED.score,
        attempts = public.lesson_progress.attempts + 1,
        last_item_index = 0,
        completed_at = now(),
        updated_at = now();

    -- 2. Insert quiz_attempts
    INSERT INTO public.quiz_attempts (
        profile_id, lesson_id, score, correct_count, total_count, time_spent_seconds
    ) VALUES (
        p_profile_id, p_lesson_id, v_accuracy, p_correct_count, p_total_count, p_time_spent_seconds
    ) RETURNING id INTO v_attempt_id;

    -- 3. Calculate and award XP: 10 per correct + 5 for lesson completion
    v_xp_awarded := (p_correct_count * 10) + 5;

    -- Check if this completes the entire level (Level completion awards +50 XP per PRD Section 30)
    SELECT COUNT(*) INTO v_uncompleted_in_level
    FROM public.lessons l
    LEFT JOIN public.lesson_progress lp ON l.id = lp.lesson_id AND lp.profile_id = p_profile_id AND lp.status = 'completed'
    WHERE l.level_id = v_lesson_record.level_id AND (lp.id IS NULL OR l.id = p_lesson_id);

    -- If all lessons in level are now complete
    IF v_uncompleted_in_level = 0 THEN
        v_is_level_complete := true;
        v_xp_awarded := v_xp_awarded + 50;
    END IF;

    -- Record in immutable XP ledger
    INSERT INTO public.xp_ledger (profile_id, amount, reason, source_id, idempotency_key)
    VALUES (
        p_profile_id, 
        v_xp_awarded, 
        CASE WHEN v_is_level_complete THEN 'level_completion' ELSE 'lesson_completion' END,
        p_lesson_id::text, 
        COALESCE(p_idempotency_key, 'comp_' || p_profile_id::text || '_' || p_lesson_id::text || '_' || now()::text)
    );

    -- 4. Update daily_learning_activity
    INSERT INTO public.daily_learning_activity (
        profile_id, activity_date, lessons_completed, xp_earned, minutes_spent
    ) VALUES (
        p_profile_id, v_today, 1, v_xp_awarded, v_minutes
    )
    ON CONFLICT (profile_id, activity_date) DO UPDATE SET
        lessons_completed = public.daily_learning_activity.lessons_completed + 1,
        xp_earned = public.daily_learning_activity.xp_earned + v_xp_awarded,
        minutes_spent = public.daily_learning_activity.minutes_spent + v_minutes,
        updated_at = now();

    -- 5. Streak & Grace Calculation (Server-Authoritative)
    SELECT * INTO v_streak_row FROM public.streaks WHERE profile_id = p_profile_id;
    IF NOT FOUND THEN
        v_current_streak := 1;
        v_longest_streak := 1;
        INSERT INTO public.streaks (profile_id, current_streak, longest_streak, last_active_date)
        VALUES (p_profile_id, 1, 1, v_today);
    ELSE
        IF v_streak_row.last_active_date = v_today THEN
            -- Already practiced today; maintain streak
            v_current_streak := v_streak_row.current_streak;
            v_longest_streak := v_streak_row.longest_streak;
        ELSIF v_streak_row.last_active_date = (v_today - 1) THEN
            -- Consecutive day continuation!
            v_current_streak := v_streak_row.current_streak + 1;
            v_longest_streak := GREATEST(v_streak_row.longest_streak, v_current_streak);
            UPDATE public.streaks
            SET current_streak = v_current_streak,
                longest_streak = v_longest_streak,
                last_active_date = v_today,
                updated_at = now()
            WHERE profile_id = p_profile_id;
        ELSIF v_streak_row.last_active_date = (v_today - 2) THEN
            -- 1 Day missed! Evaluate Streak Freeze or Automatic Grace
            IF v_streak_row.freeze_active THEN
                v_current_streak := v_streak_row.current_streak + 1;
                v_longest_streak := GREATEST(v_streak_row.longest_streak, v_current_streak);
                UPDATE public.streaks
                SET current_streak = v_current_streak,
                    longest_streak = v_longest_streak,
                    freeze_active = false,
                    last_active_date = v_today,
                    updated_at = now()
                WHERE profile_id = p_profile_id;
            ELSE
                -- Automatic 1-day grace period applied per PRD Section 30
                v_current_streak := v_streak_row.current_streak + 1;
                v_longest_streak := GREATEST(v_streak_row.longest_streak, v_current_streak);
                UPDATE public.streaks
                SET current_streak = v_current_streak,
                    longest_streak = v_longest_streak,
                    grace_used_date = v_today,
                    last_active_date = v_today,
                    updated_at = now()
                WHERE profile_id = p_profile_id;
            END IF;
        ELSE
            -- Greater than 2 days missed: Soft reset to 1 day (never punitive 0)
            v_current_streak := 1;
            v_longest_streak := v_streak_row.longest_streak;
            UPDATE public.streaks
            SET current_streak = 1,
                last_active_date = v_today,
                updated_at = now()
            WHERE profile_id = p_profile_id;
        END IF;
    END IF;

    -- 6. Evaluate and Unlock Badges
    IF v_current_streak >= 7 THEN
        INSERT INTO public.user_achievements (profile_id, achievement_id, earned_at)
        VALUES (p_profile_id, 'badge-week-warrior', v_today) ON CONFLICT DO NOTHING;
    END IF;

    IF v_is_level_complete AND v_lesson_record.level_number = 1 THEN
        INSERT INTO public.user_achievements (profile_id, achievement_id, earned_at)
        VALUES (p_profile_id, 'badge-first-reader', v_today) ON CONFLICT DO NOTHING;
    END IF;

    RETURN jsonb_build_object(
        'quiz_attempt_id', v_attempt_id,
        'lesson_id', p_lesson_id,
        'score', v_accuracy,
        'xp_awarded', v_xp_awarded,
        'current_streak', v_current_streak,
        'longest_streak', v_longest_streak,
        'is_level_complete', v_is_level_complete
    );
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- 3. get_resume_point: Fetch exact lesson item index for uninterrupted resume
-- =========================================================================
CREATE OR REPLACE FUNCTION public.get_resume_point(
    p_profile_id UUID,
    p_lesson_id UUID
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_progress RECORD;
BEGIN
    IF NOT public.owns_profile(p_profile_id) AND NOT public.has_role('admin') THEN
        RAISE EXCEPTION 'Not authorized to query progress for profile %', p_profile_id;
    END IF;

    SELECT * INTO v_progress FROM public.lesson_progress
    WHERE profile_id = p_profile_id AND lesson_id = p_lesson_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'lesson_id', p_lesson_id,
            'status', 'not_started',
            'last_item_index', 0,
            'score', 0
        );
    END IF;

    RETURN jsonb_build_object(
        'lesson_id', p_lesson_id,
        'status', v_progress.status,
        'last_item_index', v_progress.last_item_index,
        'score', v_progress.score,
        'completed_at', v_progress.completed_at
    );
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- 4. get_dashboard_summary: Aggregated stats from authoritative ledger
-- =========================================================================
CREATE OR REPLACE FUNCTION public.get_dashboard_summary(
    p_profile_id UUID
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_total_xp INT := 0;
    v_streak_row RECORD;
    v_avg_mastery NUMERIC := 0.0;
    v_stage TEXT := 'A';
    v_percentage INT := 10;
    v_today DATE := CURRENT_DATE;
    v_today_completed INT := 0;
    v_pref RECORD;
BEGIN
    IF NOT public.owns_profile(p_profile_id) AND NOT public.is_parent_of_profile(p_profile_id) AND NOT public.has_role('admin') THEN
        RAISE EXCEPTION 'Not authorized to access summary for profile %', p_profile_id;
    END IF;

    -- Total XP from ledger
    SELECT COALESCE(SUM(amount), 0) INTO v_total_xp FROM public.xp_ledger WHERE profile_id = p_profile_id;

    -- Streak info
    SELECT * INTO v_streak_row FROM public.streaks WHERE profile_id = p_profile_id;

    -- Average skill mastery
    SELECT COALESCE(AVG(mastery_score), 0.0) INTO v_avg_mastery FROM public.learner_skill_mastery WHERE profile_id = p_profile_id;
    v_percentage := LEAST(100, GREATEST(10, ROUND((v_avg_mastery * 100)::numeric, 0)));

    IF v_avg_mastery >= 0.90 THEN v_stage := 'E';
    ELSIF v_avg_mastery >= 0.85 THEN v_stage := 'D';
    ELSIF v_avg_mastery >= 0.70 THEN v_stage := 'C';
    ELSIF v_avg_mastery >= 0.50 THEN v_stage := 'B';
    ELSE v_stage := 'A';
    END IF;

    -- Daily goal progress
    SELECT COALESCE(lessons_completed, 0) INTO v_today_completed 
    FROM public.daily_learning_activity 
    WHERE profile_id = p_profile_id AND activity_date = v_today;

    SELECT * INTO v_pref FROM public.user_preferences WHERE profile_id = p_profile_id;

    RETURN jsonb_build_object(
        'xp', v_total_xp,
        'streak_days', COALESCE(v_streak_row.current_streak, 0),
        'streak_freeze_available', COALESCE(v_streak_row.freeze_count > 0, true),
        'streak_freeze_active', COALESCE(v_streak_row.freeze_active, false),
        'last_streak_date', v_streak_row.last_active_date,
        'script_power_stage', v_stage,
        'script_power_percentage', v_percentage,
        'words_learned', (SELECT COUNT(*) FROM public.learner_skill_mastery WHERE profile_id = p_profile_id AND skill_type = 'word_reading' AND mastery_score >= 0.70),
        'letters_mastered', (SELECT COUNT(*) FROM public.learner_skill_mastery WHERE profile_id = p_profile_id AND skill_type = 'letter_recognition' AND mastery_score >= 0.80),
        'daily_goal_progress', v_today_completed,
        'daily_goal_target', COALESCE(v_pref.daily_goal, 1)
    );
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- 5. recommend_next_lesson: Rule-based recommendation engine with transparent "Why this"
-- =========================================================================
CREATE OR REPLACE FUNCTION public.recommend_next_lesson(
    p_profile_id UUID
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_weak_item RECORD;
    v_next_lesson RECORD;
BEGIN
    IF NOT public.owns_profile(p_profile_id) AND NOT public.has_role('admin') THEN
        RAISE EXCEPTION 'Not authorized to request recommendation for profile %', p_profile_id;
    END IF;

    -- 1. Check if learner is struggling with retroflex or difficult letters
    SELECT * INTO v_weak_item 
    FROM public.learner_skill_mastery
    WHERE profile_id = p_profile_id AND mastery_score < 0.60
    ORDER BY last_attempted_at DESC LIMIT 1;

    IF FOUND THEN
        RETURN jsonb_build_object(
            'type', 'revision',
            'item_id', v_weak_item.skill_item_id,
            'reason_en', 'Practice retroflex and challenging sounds to strengthen your script power.',
            'reason_ta', 'உங்கள் எழுத்து ஆற்றலை அதிகரிக்க ஒலிப்புப் பயிற்சி தேவைப்படுகிறது.'
        );
    END IF;

    -- 2. Find next sequential incomplete lesson in unlocked levels
    SELECT l.* INTO v_next_lesson
    FROM public.lessons l
    LEFT JOIN public.lesson_progress lp ON l.id = lp.lesson_id AND lp.profile_id = p_profile_id
    WHERE (lp.status IS NULL OR lp.status != 'completed')
    ORDER BY l.level_number ASC, l.sequence_order ASC
    LIMIT 1;

    IF FOUND THEN
        RETURN jsonb_build_object(
            'type', 'lesson',
            'lesson_id', v_next_lesson.id,
            'level_number', v_next_lesson.level_number,
            'title_en', v_next_lesson.title_en,
            'title_ta', v_next_lesson.title_ta,
            'reason_en', 'Continue your structured learning journey on ' || v_next_lesson.title_en || '.',
            'reason_ta', v_next_lesson.title_ta || ' பாடத்தைத் தொடர்ந்து கற்று முன்னேறுங்கள்.'
        );
    END IF;

    -- Fallback: Level 1 Lesson 1
    RETURN jsonb_build_object(
        'type', 'complete',
        'reason_en', 'Great job! You have explored all current lessons. Review your revision queue!',
        'reason_ta', 'அருமை! அனைத்துப் பாடங்களையும் முடித்துவிட்டீர்கள். திருப்புதல் பயிற்சியைத் தொடருங்கள்!'
    );
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- 6. get_parent_summary: Aggregated reporting for Parent Dashboard
-- =========================================================================
CREATE OR REPLACE FUNCTION public.get_parent_summary(
    p_child_profile_id UUID
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_profile RECORD;
    v_stats JSONB;
    v_completed_count INT;
    v_total_minutes INT;
    v_items_due INT;
    v_mastery_json JSONB;
BEGIN
    IF NOT public.owns_profile(p_child_profile_id) AND NOT public.is_parent_of_profile(p_child_profile_id) AND NOT public.has_role('admin') THEN
        RAISE EXCEPTION 'Not authorized to view parent summary for child %', p_child_profile_id;
    END IF;

    SELECT * INTO v_profile FROM public.profiles WHERE id = p_child_profile_id;
    v_stats := public.get_dashboard_summary(p_child_profile_id);

    SELECT COUNT(*) INTO v_completed_count FROM public.lesson_progress WHERE profile_id = p_child_profile_id AND status = 'completed';
    SELECT COALESCE(SUM(minutes_spent), 0) INTO v_total_minutes FROM public.daily_learning_activity WHERE profile_id = p_child_profile_id AND activity_date >= (CURRENT_DATE - 7);
    SELECT COUNT(*) INTO v_items_due FROM public.revision_queue WHERE profile_id = p_child_profile_id AND next_review_at <= now();

    SELECT jsonb_object_agg(
        skill_type, 
        ROUND(avg_score::numeric, 2)
    ) INTO v_mastery_json
    FROM (
        SELECT skill_type, AVG(mastery_score) as avg_score 
        FROM public.learner_skill_mastery 
        WHERE profile_id = p_child_profile_id 
        GROUP BY skill_type
    ) s;

    RETURN jsonb_build_object(
        'child_name', v_profile.display_name,
        'grade', v_profile.grade,
        'age_mode', v_profile.age_mode,
        'total_xp', (v_stats->>'xp')::int,
        'current_streak', (v_stats->>'streak_days')::int,
        'total_minutes_week', v_total_minutes,
        'completed_lessons_count', v_completed_count,
        'items_needing_revision', v_items_due,
        'mastery_by_skill', COALESCE(v_mastery_json, '{}'::jsonb)
    );
END;
$$ LANGUAGE plpgsql;
