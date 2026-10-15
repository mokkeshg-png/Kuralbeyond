-- Migration 00005: Row Level Security (RLS) Policies on Every Table
-- Zero-tolerance security: Default-deny, explicit USING and WITH CHECK, (select auth.uid()) pattern

-- 1. Helper Functions (SECURITY DEFINER with strict search_path)
CREATE OR REPLACE FUNCTION public.has_role(check_role TEXT)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = (SELECT auth.uid())
          AND role = check_role
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.owns_profile(p_profile_id UUID)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = p_profile_id
          AND (user_id = (SELECT auth.uid()) OR parent_user_id = (SELECT auth.uid()))
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.is_parent_of_profile(p_child_profile_id UUID)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.parent_child_relationships pcr
        JOIN public.profiles parent_p ON pcr.parent_profile_id = parent_p.id
        WHERE pcr.child_profile_id = p_child_profile_id
          AND (parent_p.user_id = (SELECT auth.uid()) OR parent_p.parent_user_id = (SELECT auth.uid()))
          AND pcr.verified = true
    );
END;
$$ LANGUAGE plpgsql;

-- 2. Enable RLS on EVERY Public Table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tamil_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_skill_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revision_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_learning_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_child_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- 3. POLICIES: User Profiles & Roles
-- =========================================================================

-- Profiles
CREATE POLICY "profiles_select_own_or_parent_or_admin" ON public.profiles
FOR SELECT TO authenticated
USING (
    user_id = (SELECT auth.uid()) 
    OR parent_user_id = (SELECT auth.uid()) 
    OR public.is_parent_of_profile(id) 
    OR public.has_role('admin')
);

CREATE POLICY "profiles_insert_own_or_child" ON public.profiles
FOR INSERT TO authenticated
WITH CHECK (
    user_id = (SELECT auth.uid()) 
    OR parent_user_id = (SELECT auth.uid()) 
    OR public.has_role('admin')
);

CREATE POLICY "profiles_update_own_or_child" ON public.profiles
FOR UPDATE TO authenticated
USING (
    user_id = (SELECT auth.uid()) 
    OR parent_user_id = (SELECT auth.uid()) 
    OR public.has_role('admin')
)
WITH CHECK (
    user_id = (SELECT auth.uid()) 
    OR parent_user_id = (SELECT auth.uid()) 
    OR public.has_role('admin')
);

CREATE POLICY "profiles_delete_own_or_child" ON public.profiles
FOR DELETE TO authenticated
USING (
    user_id = (SELECT auth.uid()) 
    OR parent_user_id = (SELECT auth.uid()) 
    OR public.has_role('admin')
);

-- User Roles: Read own roles or admin; modifications admin-only
CREATE POLICY "user_roles_select" ON public.user_roles
FOR SELECT TO authenticated
USING (user_id = (SELECT auth.uid()) OR public.has_role('admin'));

CREATE POLICY "user_roles_admin_all" ON public.user_roles
FOR ALL TO authenticated
USING (public.has_role('admin'))
WITH CHECK (public.has_role('admin'));

-- User Preferences
CREATE POLICY "preferences_select" ON public.user_preferences
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.is_parent_of_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "preferences_modify" ON public.user_preferences
FOR ALL TO authenticated
USING (public.owns_profile(profile_id) OR public.has_role('admin'))
WITH CHECK (public.owns_profile(profile_id) OR public.has_role('admin'));

-- =========================================================================
-- 4. POLICIES: Curriculum & Content Tables (Public / Authenticated Read, Admin Write)
-- =========================================================================

CREATE POLICY "learning_levels_read" ON public.learning_levels FOR SELECT TO public USING (true);
CREATE POLICY "learning_levels_admin" ON public.learning_levels FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE POLICY "lessons_read" ON public.lessons FOR SELECT TO public USING (true);
CREATE POLICY "lessons_admin" ON public.lessons FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE POLICY "lesson_items_read" ON public.lesson_items FOR SELECT TO public USING (true);
CREATE POLICY "lesson_items_admin" ON public.lesson_items FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE POLICY "tamil_letters_read" ON public.tamil_letters FOR SELECT TO public USING (true);
CREATE POLICY "tamil_letters_admin" ON public.tamil_letters FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE POLICY "vocabulary_items_read" ON public.vocabulary_items FOR SELECT TO public USING (true);
CREATE POLICY "vocabulary_items_admin" ON public.vocabulary_items FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE POLICY "exercises_read" ON public.exercises FOR SELECT TO public USING (true);
CREATE POLICY "exercises_admin" ON public.exercises FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE POLICY "questions_read" ON public.questions FOR SELECT TO public USING (true);
CREATE POLICY "questions_admin" ON public.questions FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE POLICY "answer_options_read" ON public.answer_options FOR SELECT TO public USING (true);
CREATE POLICY "answer_options_admin" ON public.answer_options FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE POLICY "achievements_read" ON public.achievements FOR SELECT TO public USING (true);
CREATE POLICY "achievements_admin" ON public.achievements FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE POLICY "missions_read" ON public.missions FOR SELECT TO public USING (true);
CREATE POLICY "missions_admin" ON public.missions FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

-- =========================================================================
-- 5. POLICIES: Learner Progress & Gamification Tables
-- =========================================================================

-- Lesson Progress
CREATE POLICY "lesson_progress_select" ON public.lesson_progress
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.is_parent_of_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "lesson_progress_modify" ON public.lesson_progress
FOR ALL TO authenticated
USING (public.owns_profile(profile_id) OR public.has_role('admin'))
WITH CHECK (public.owns_profile(profile_id) OR public.has_role('admin'));

-- Quiz Attempts
CREATE POLICY "quiz_attempts_select" ON public.quiz_attempts
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.is_parent_of_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "quiz_attempts_insert" ON public.quiz_attempts
FOR INSERT TO authenticated
WITH CHECK (public.owns_profile(profile_id) OR public.has_role('admin'));

-- Learner Skill Mastery
CREATE POLICY "learner_skill_mastery_select" ON public.learner_skill_mastery
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.is_parent_of_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "learner_skill_mastery_modify" ON public.learner_skill_mastery
FOR ALL TO authenticated
USING (public.owns_profile(profile_id) OR public.has_role('admin'))
WITH CHECK (public.owns_profile(profile_id) OR public.has_role('admin'));

-- Revision Queue
CREATE POLICY "revision_queue_select" ON public.revision_queue
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.is_parent_of_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "revision_queue_modify" ON public.revision_queue
FOR ALL TO authenticated
USING (public.owns_profile(profile_id) OR public.has_role('admin'))
WITH CHECK (public.owns_profile(profile_id) OR public.has_role('admin'));

-- User Achievements
CREATE POLICY "user_achievements_select" ON public.user_achievements
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.is_parent_of_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "user_achievements_modify" ON public.user_achievements
FOR ALL TO authenticated
USING (public.owns_profile(profile_id) OR public.has_role('admin'))
WITH CHECK (public.owns_profile(profile_id) OR public.has_role('admin'));

-- Daily Learning Activity
CREATE POLICY "daily_learning_activity_select" ON public.daily_learning_activity
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.is_parent_of_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "daily_learning_activity_modify" ON public.daily_learning_activity
FOR ALL TO authenticated
USING (public.owns_profile(profile_id) OR public.has_role('admin'))
WITH CHECK (public.owns_profile(profile_id) OR public.has_role('admin'));

-- Streaks
CREATE POLICY "streaks_select" ON public.streaks
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.is_parent_of_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "streaks_modify" ON public.streaks
FOR ALL TO authenticated
USING (public.owns_profile(profile_id) OR public.has_role('admin'))
WITH CHECK (public.owns_profile(profile_id) OR public.has_role('admin'));

-- XP Ledger (Read own/child; Writes strictly via Security Definer RPCs or admin)
CREATE POLICY "xp_ledger_select" ON public.xp_ledger
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.is_parent_of_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "xp_ledger_insert_admin" ON public.xp_ledger
FOR INSERT TO authenticated
WITH CHECK (public.has_role('admin'));

-- Mission Progress
CREATE POLICY "mission_progress_select" ON public.mission_progress
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.is_parent_of_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "mission_progress_modify" ON public.mission_progress
FOR ALL TO authenticated
USING (public.owns_profile(profile_id) OR public.has_role('admin'))
WITH CHECK (public.owns_profile(profile_id) OR public.has_role('admin'));

-- =========================================================================
-- 6. POLICIES: Audio Assets, Speaking Recordings, and Consent
-- =========================================================================

-- Audio Assets: Approved audio is public read; drafts/staging visible only to admin
CREATE POLICY "audio_assets_read_approved" ON public.audio_assets
FOR SELECT TO public
USING (status = 'approved' OR public.has_role('admin'));

CREATE POLICY "audio_assets_admin_all" ON public.audio_assets
FOR ALL TO authenticated
USING (public.has_role('admin'))
WITH CHECK (public.has_role('admin'));

-- Speaking Recordings: Strictly private to profile owner and admin; hard-deleted after 24h
CREATE POLICY "speaking_recordings_select" ON public.speaking_recordings
FOR SELECT TO authenticated
USING (public.owns_profile(profile_id) OR public.has_role('admin'));

CREATE POLICY "speaking_recordings_insert" ON public.speaking_recordings
FOR INSERT TO authenticated
WITH CHECK (public.owns_profile(profile_id));

CREATE POLICY "speaking_recordings_delete" ON public.speaking_recordings
FOR DELETE TO authenticated
USING (public.owns_profile(profile_id) OR public.has_role('admin'));

-- Consent Records: Visible to parent or child owner; inserts via Edge Function or admin
CREATE POLICY "consent_records_select" ON public.consent_records
FOR SELECT TO authenticated
USING (
    parent_email = (SELECT email FROM auth.users WHERE id = (SELECT auth.uid()))
    OR public.owns_profile(child_profile_id)
    OR public.has_role('admin')
);

CREATE POLICY "consent_records_admin_write" ON public.consent_records
FOR ALL TO authenticated
USING (public.has_role('admin'))
WITH CHECK (public.has_role('admin'));

-- Parent Child Relationships: Visible to involved parent or child
CREATE POLICY "parent_child_select" ON public.parent_child_relationships
FOR SELECT TO authenticated
USING (
    public.owns_profile(parent_profile_id) 
    OR public.owns_profile(child_profile_id) 
    OR public.has_role('admin')
);

CREATE POLICY "parent_child_modify" ON public.parent_child_relationships
FOR ALL TO authenticated
USING (public.owns_profile(parent_profile_id) OR public.has_role('admin'))
WITH CHECK (public.owns_profile(parent_profile_id) OR public.has_role('admin'));

-- Content Reports
CREATE POLICY "content_reports_select" ON public.content_reports
FOR SELECT TO authenticated
USING (
    (profile_id IS NOT NULL AND public.owns_profile(profile_id))
    OR public.has_role('admin')
);

CREATE POLICY "content_reports_insert" ON public.content_reports
FOR INSERT TO authenticated
WITH CHECK (true);

-- Feature Flags: Public read; admin write
CREATE POLICY "feature_flags_read" ON public.feature_flags FOR SELECT TO public USING (true);
CREATE POLICY "feature_flags_admin" ON public.feature_flags FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

-- Voice Usage & Audit Log: Admin only
CREATE POLICY "voice_usage_admin" ON public.voice_usage FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));
CREATE POLICY "audit_log_admin" ON public.audit_log FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

-- Analytics Events: Insert allowed for telemetry; read admin only
CREATE POLICY "analytics_events_insert" ON public.analytics_events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "analytics_events_admin_select" ON public.analytics_events FOR SELECT TO authenticated USING (public.has_role('admin'));
