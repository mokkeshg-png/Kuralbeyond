/*
=============================================================
  FILE: supabase_full_wiring.sql
  Run in: Supabase Dashboard > SQL Editor
  Safe to run multiple times — all statements are idempotent.
  No DROP TABLE, no DROP COLUMN, no destructive changes.
=============================================================

  SECTION 1: RLS POLICY ADDITIONS
    Adds missing INSERT / UPDATE / UPSERT policies for the
    tables that currently only have SELECT (own-read) policies.
    Covers:
      - user_preferences  : INSERT + UPDATE
      - mission_progress  : INSERT + UPDATE
      - user_achievements : INSERT
      - consent_records   : INSERT
      - parent_child_relationships : INSERT
      - voice_usage       : INSERT + UPDATE (upsert support)
      - daily_learning_activity : INSERT + UPDATE (upsert support)
      - xp_ledger         : INSERT

    Every policy uses:
      auth.uid()          — for user_id / parent_user_id columns
      my_profile_id()     — for profile_id columns (existing DB helper)

  SECTION 2: VERIFICATION QUERIES
    SELECT statements to confirm all policies were applied.
    Run these after the main block to verify.

=============================================================
*/

-- ============================================================
-- SECTION 1: RLS POLICY ADDITIONS
-- ============================================================


-- ------------------------------------------------------------
-- 1a. user_preferences
--     Gap: own CRUD claimed in gap analysis; verify INSERT +
--     UPDATE policies exist and add them if missing.
-- ------------------------------------------------------------

DO $$ BEGIN
  CREATE POLICY "user_preferences: own insert"
    ON public.user_preferences
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "user_preferences: own update"
    ON public.user_preferences
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ------------------------------------------------------------
-- 1b. mission_progress
--     Gap: own CRUD claimed; verify INSERT + UPDATE exist.
-- ------------------------------------------------------------

DO $$ BEGIN
  CREATE POLICY "mission_progress: own insert"
    ON public.mission_progress
    FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = my_profile_id());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "mission_progress: own update"
    ON public.mission_progress
    FOR UPDATE
    TO authenticated
    USING (profile_id = my_profile_id())
    WITH CHECK (profile_id = my_profile_id());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ------------------------------------------------------------
-- 1c. user_achievements
--     Gap: only own-read policy exists; badge unlock logic
--     must INSERT rows, so an INSERT policy is needed.
-- ------------------------------------------------------------

DO $$ BEGIN
  CREATE POLICY "user_achievements: own insert"
    ON public.user_achievements
    FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = my_profile_id());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ------------------------------------------------------------
-- 1d. consent_records
--     Gap: parent-read policy exists; ParentConsentPage needs
--     to INSERT a consent record for the COPPA audit trail.
--     The inserting session is the *parent* whose auth.uid()
--     should match parent_user_id (or equivalent FK column).
--     Using auth.uid() here; adjust column name if your schema
--     uses a different identifier for the consenting parent.
-- ------------------------------------------------------------

DO $$ BEGIN
  CREATE POLICY "consent_records: parent insert"
    ON public.consent_records
    FOR INSERT
    TO authenticated
    WITH CHECK (parent_user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ------------------------------------------------------------
-- 1e. parent_child_relationships
--     Gap: parent-read policy exists; after consent the app
--     needs to INSERT a parent↔child link row.
-- ------------------------------------------------------------

DO $$ BEGIN
  CREATE POLICY "parent_child_relationships: parent insert"
    ON public.parent_child_relationships
    FOR INSERT
    TO authenticated
    WITH CHECK (parent_user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ------------------------------------------------------------
-- 1f. voice_usage
--     Gap: own-read policy exists; sarvamVoiceService needs
--     to INSERT/upsert a usage row after each TTS/STT call.
-- ------------------------------------------------------------

DO $$ BEGIN
  CREATE POLICY "voice_usage: own insert"
    ON public.voice_usage
    FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = my_profile_id());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "voice_usage: own update"
    ON public.voice_usage
    FOR UPDATE
    TO authenticated
    USING (profile_id = my_profile_id())
    WITH CHECK (profile_id = my_profile_id());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ------------------------------------------------------------
-- 1g. daily_learning_activity
--     Gap: own CRUD claimed; progressService upserts activity
--     rows — verify INSERT + UPDATE policies exist.
-- ------------------------------------------------------------

DO $$ BEGIN
  CREATE POLICY "daily_learning_activity: own insert"
    ON public.daily_learning_activity
    FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = my_profile_id());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "daily_learning_activity: own update"
    ON public.daily_learning_activity
    FOR UPDATE
    TO authenticated
    USING (profile_id = my_profile_id())
    WITH CHECK (profile_id = my_profile_id());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ------------------------------------------------------------
-- 1h. xp_ledger
--     Gap: own-read policy exists; all local XP events (missions,
--     assessment) need to INSERT rows.  The ledger is append-only
--     so only INSERT is required (no UPDATE).
-- ------------------------------------------------------------

DO $$ BEGIN
  CREATE POLICY "xp_ledger: own insert"
    ON public.xp_ledger
    FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = my_profile_id());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ============================================================
-- SECTION 2: VERIFICATION QUERIES
-- Run these after the block above to confirm all policies exist.
-- ============================================================

SELECT
  schemaname,
  tablename,
  policyname,
  cmd        AS operation,
  roles
FROM pg_policies
WHERE tablename IN (
  'user_preferences',
  'mission_progress',
  'user_achievements',
  'consent_records',
  'parent_child_relationships',
  'voice_usage',
  'daily_learning_activity',
  'xp_ledger'
)
ORDER BY tablename, policyname;
