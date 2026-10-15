-- ============================================================
-- Migration: Link profiles.user_id → auth.users(id)
-- and harden RLS on INSERT
-- Run this in: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Add FK from profiles.user_id → auth.users(id) ON DELETE CASCADE
--    (only if it doesn't already exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'profiles_user_id_fkey'
      AND table_schema = 'public'
      AND table_name = 'profiles'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_user_id_fkey
      FOREIGN KEY (user_id)
      REFERENCES auth.users(id)
      ON DELETE CASCADE;
  END IF;
END $$;

-- 2. Drop the permissive INSERT policy that allows anyone to insert
DROP POLICY IF EXISTS "profiles: own insert" ON public.profiles;

-- 3. Recreate INSERT policy: only the authenticated user may insert
--    a row whose user_id matches their own auth.uid()
CREATE POLICY "profiles: own insert"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

-- 4. Backfill: for any existing auth users who have no profile row,
--    this is a no-op (the app handles it at signup).
--    If you want to see orphaned auth users, run:
--    SELECT id FROM auth.users u
--    WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = u.id);
