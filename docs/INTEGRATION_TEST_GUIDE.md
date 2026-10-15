# TamilPalam — Live Integration Test Guide

This document describes the manual browser tests required to verify the full
Supabase integration. These tests cannot be automated without a headless browser
and real auth tokens.

## Prerequisites

1. `.env` file present with valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. Dev server running: `npm run dev`
3. Open browser at `http://localhost:5173`

---

## Test 1: Supabase Connection

In your browser console at any page:

```js
import('/src/services/supabaseClient.ts')
  .then(m => m.checkSupabaseConnection())
  .then(r => console.log('Connection result:', r));
```

**Expected:** `{ ok: true, configured: true, url: "https://asjrokbgclzfmjpafzpt.supabase.co" }`

---

## Test 2: Email Confirmation Setting

Before testing signup, check your Supabase project setting:

**Supabase Dashboard → Authentication → Providers → Email**

- If "Confirm email" is **ON**: Users must click a verification link before
  they can sign in. The app will show a "Check your email" message after signup.
- If "Confirm email" is **OFF**: Users can sign in immediately after signup.

Do NOT disable email confirmation solely for testing convenience. Use a real
email address you control.

---

## Test 3: New User Signup + Profile Creation

1. Navigate to `/auth`
2. Fill in: Name, Email, Password, Grade → click **Sign Up**
3. If email confirmation is ON: check your email, click the link, then sign in
4. After signing in, go to `/dashboard`

**Verify in Supabase Dashboard → Table Editor:**
- `profiles` table: row exists with your `user_id`, `display_name`, `grade`
- `streaks` table: row exists with `profile_id` = your profile UUID, `current_streak = 0`
- `user_roles` table: row exists with `role = 'learner'`

---

## Test 4: Complete a Lesson + Verify Persistence

1. Sign in and navigate to `/learn`
2. Click any lesson → complete it → submit answers
3. After results screen, check Supabase Dashboard:

**Tables to check:**
- `lesson_progress`: row with `profile_id`, `lesson_id`, `status = 'completed'`
- `quiz_attempts`: row with `profile_id`, `lesson_id`, `percentage`
- `daily_learning_activity`: row with today's date, `lessons_completed >= 1`
- `xp_ledger`: row with `reason = 'lesson_completed'`
- `streaks`: `current_streak` incremented, `last_active_date = today`

**Persistence test:** Refresh the browser. Navigate to `/dashboard`.
XP, streak, and daily goal progress should match what's in the database.

---

## Test 5: Data Isolation (Two Accounts)

1. Sign in as User A → complete a lesson → note dashboard XP
2. Sign out → sign in as User B (different email)
3. User B's dashboard should show 0 XP, 0 streak, their own data only

**RLS verification:** In Supabase Dashboard → Table Editor → `lesson_progress`,
filter by `profile_id`. You should only see rows for the currently signed-in user.

---

## Test 6: Session Restoration

1. Sign in as any user
2. Close the browser tab completely
3. Reopen `http://localhost:5173/dashboard`

**Expected:** Dashboard loads with the same user's data without showing the
auth page. The Supabase session is restored from `localStorage`.

---

## Test 7: Sign Out

1. Navigate to `/profile` → click Sign Out
2. Try to navigate to `/dashboard`

**Expected:** Redirected to `/auth` page. Supabase session is cleared.

---

## Known Limitations (Browser-Only)

| Item | Why it can't be agent-verified |
|---|---|
| Auth signup/signin flow | Requires real browser + email inbox |
| Session token refresh | Requires live Supabase JWT lifecycle |
| RLS cross-user test | Requires two separate authenticated sessions |
| Edge Function calls (TTS/STT) | Requires deployed Edge Functions + Sarvam API key |
| Audio playback | Requires browser audio API |
