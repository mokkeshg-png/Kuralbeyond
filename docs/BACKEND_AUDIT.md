# TamilPalam (தமிழ் பாலம்) — Backend Audit & Gap Resolution Log

This document audits the PRD (Sections 21–35, 51–64, 65–67, 69–72, 75) against security best practices, database normalization, child safety regulations (COPPA 2.0, GDPR-K), and the frontend service contracts (`src/services/*`). Every gap, contradiction, and vulnerability is documented below along with the implemented architectural decision.

---

## 1. Schema Gaps & Omissions in PRD Data Dictionary

| # | Missing Entity / Field in PRD | Risk / Gap Description | Implemented Resolution |
| :--- | :--- | :--- | :--- |
| **G-01** | **`audio_assets` & Review Workflow** | PRD Section 56/57 mentions `pronunciation_assets` in ER diagram but omits it from the Data Dictionary. No schema exists for tracking audio review status (`pending_review`, `approved`, `rejected`), voice model, pace, checksum, or native reviewer sign-off. | Implemented dedicated `audio_assets` table with `sha256`, `voice`, `pace`, `status` (`pending_review`, `approved`, `rejected`), `reviewer_id`, `reviewed_at`, and `review_notes`. Reviewer checklist requires validating retroflex consonants (ட, ண, ள, ழ, ற, ன) and vowel durations before promotion to public CDN. |
| **G-02** | **`speaking_recordings` & 24h Purge** | PRD Section 27 and 58 mandate that speaking recordings be deleted within 24 hours, but no table tracks upload metadata, expires_at timestamps, or consent linkage. | Created `speaking_recordings` table with `expires_at = now() + interval '24 hours'`, `storage_path`, `similarity_score`, and status. Automatic cleanup enforced via scheduled `cleanup-recordings` Edge Function and `pg_cron` job. |
| **G-03** | **`consent_records` (COPPA/GDPR-K)** | PRD Section 57 has a simple boolean `parental_consent` on `profiles`. A boolean flag is legally insufficient under COPPA 2.0 (June 2025/April 2026) and GDPR-K, which require verifiable audit records of who consented, method, policy version, and revocation capability. | Created `consent_records` table tracking `parent_email`, `child_profile_id`, `consent_method` (`email_code`, `text_plus`), `policy_version`, `verification_token_hash`, `verified_at`, and `revoked_at`. |
| **G-04** | **`xp_ledger` & Idempotency** | PRD stores XP only as an aggregate counter in `daily_learning_activity`. Clients can manipulate counts or double-submit network requests. | Created append-only `xp_ledger` table with `profile_id`, `amount`, `reason`, `source_id`, and `idempotency_key UNIQUE`. User XP total is verified server-side. |
| **G-05** | **`streaks` Table & Grace Logic** | PRD lacks an explicit streaks table, relying on client calculation in `progressService.ts`. | Created `streaks` table storing `current_streak`, `longest_streak`, `freeze_count`, `freeze_active`, `last_active_date`, and `grace_used_date`. Logic runs entirely in server RPC. |
| **G-06** | **`content_reports` ("Report an Issue")** | PRD Section 66 mandates an in-app "Report an issue" button on every lesson item, but provides no database schema to receive user reports. | Created `content_reports` table linking `profile_id`, `lesson_id`, `item_id`, `report_type`, `notes`, and `status` (`pending`, `reviewed`, `resolved`). |
| **G-07** | **`missions` and `mission_progress`** | Real-Life Tamil Missions (Levels 1–7) are specified in PRD Section 14 and present in frontend data (`src/data/missionsData.ts`), but completely omitted from Section 57 schema. | Created `missions` (static definition) and `mission_progress` (learner status, completion date, student reflection, XP awarded). |
| **G-08** | **`tanglish_stage_state`** | PRD tracks stage advancement per skill/item, but Section 57 only has `tanglish_stage` in `learner_skill_mastery` without historical window tracking. | Added `tanglish_stage_history` and structured per-item stage calculation directly in `learner_skill_mastery`. |
| **G-09** | **`voice_usage` & Daily Cap** | No usage tracking exists to prevent exhaustion of Sarvam AI API credits or denial-of-service abuse. | Created `voice_usage` table logging daily character counts (TTS) and audio seconds (STT) with a hard daily quota enforcement in Edge Functions. |
| **G-10** | **`user_roles` Security** | PRD lists roles (`parent`, `teacher`, `admin`, `authenticated`, `anon`) without specifying storage mechanism. Storing roles in `user_metadata` creates privilege escalation vulnerabilities. | Created secure `user_roles` table in PostgreSQL. Public access is denied; roles are verified exclusively via `SECURITY DEFINER` functions (`has_role()`). |

---

## 2. Row Level Security (RLS) Performance & Security Audit

### Issue (b): Slow Subqueries at Scale
- **PRD Example:**
  ```sql
  CREATE POLICY "Users can view own progress" ON lesson_progress
  FOR SELECT TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));
  ```
- **Vulnerability / Performance Bottleneck:** 
  In PostgreSQL, an unindexed subquery in `USING` clauses runs for every examined row. Calling `auth.uid()` directly inside the subquery prevents the query planner from treating the result as an invariant constant, leading to N+1 sequential scans on high-traffic tables (`lesson_progress`, `learner_skill_mastery`).
- **Engineered Fix:**
  1. Wrap `auth.uid()` as `(SELECT auth.uid())` so PostgreSQL caches the scalar UUID across the query execution plan.
  2. Index all join and foreign key columns:
     ```sql
     CREATE INDEX idx_profiles_user_id ON profiles(user_id);
     CREATE INDEX idx_lesson_progress_profile_id ON lesson_progress(profile_id);
     CREATE INDEX idx_learner_skill_mastery_profile ON learner_skill_mastery(profile_id, skill_type);
     ```
  3. Formulate policies using direct equality joins:
     ```sql
     CREATE POLICY "Users can view own progress" ON lesson_progress
     FOR SELECT TO authenticated
     USING (profile_id IN (SELECT id FROM profiles WHERE user_id = (SELECT auth.uid())));
     ```
  4. For parent child relationships:
     ```sql
     CREATE POLICY "Parents can view child progress" ON lesson_progress
     FOR SELECT TO authenticated
     USING (profile_id IN (
       SELECT child_profile_id FROM parent_child_relationships 
       WHERE parent_profile_id IN (SELECT id FROM profiles WHERE user_id = (SELECT auth.uid()))
       AND verified = true
     ));
     ```

---

## 3. Child Account Model & COPPA 2.0 / GDPR-K Decision

### Issue (d): Parent-Managed Multi-Profile vs. One-Profile-Per-Auth-User
- **PRD Contradiction:** 
  Section 57 shows `profiles.user_id FK auth.users UNIQUE` (strict 1:1 relation), whereas Section 64 and Section 72 note: *"Multiple children under one parent: Parent can switch between child profiles"*.
- **Privacy & Safety Analysis:**
  COPPA 2.0 (effective June 2025, mandatory full compliance April 2026) and GDPR-K explicitly prohibit children under 13 from establishing unmonitored online accounts. Requiring every 7-year-old child to have an independent email address and password violates data minimization and introduces security risks.
- **Architectural Decision:**
  We adopt a **Unified Parent-Managed Multi-Profile Model**:
  1. Parents or guardians create a primary authenticated account (`auth.users`).
  2. Multiple learner profiles (`profiles`) can be associated with a single parent account.
  3. For older learners ($\ge 13$), `profiles.user_id = auth.uid()`.
  4. For child learners ($< 13$), `profiles.parent_user_id = auth.uid()`.
  5. The active profile context is managed securely via session tokens.
  6. Direct child signups require immediate parental email input and enter `demo_only` state until the parent completes email confirmation.
  7. This guarantees 100% compliance with COPPA/GDPR-K, allows parents to monitor all their children in one view, and preserves full backward compatibility with the frontend `UserProfile` structure.

---

## 4. Server-Side Progression & Gamification Authority

### Issue (e): Client-Side Gamification Trust
- **PRD Weakness:** 
  The frontend `progressService.ts` currently calculates XP gains, updates streaks, and unlocks badges in browser memory (`localStorage`).
- **Security & Integrity Decision:**
  All gamification logic is migrated to server-side PostgreSQL functions (`SECURITY DEFINER`):
  1. `complete_lesson(p_lesson_id UUID, p_correct_count INT, p_total_count INT, p_time_spent INT, p_idempotency_key TEXT)`:
     - Validates lesson existence and calculates score: $\text{score} = \text{round}((\text{correct} / \text{total}) \times 100)$.
     - Records `quiz_attempts` with weak item analysis.
     - Logs XP award in `xp_ledger` (10 XP per correct + 5 XP completion).
     - Checks and updates daily activity log.
     - Evaluates streak: increments if last practiced yesterday; maintains streak if practicing today; triggers 1-day grace or streak freeze if 1 day was missed; resets to 1 only after 2+ missed days.
     - Automatically evaluates and inserts unlocked badges into `user_achievements`.
  2. `submit_item_answer(p_skill_type TEXT, p_item_id TEXT, p_is_correct BOOLEAN, p_difficulty NUMERIC)`:
     - Updates `learner_skill_mastery` using exponential recency decay ($\lambda = \ln(2)/14$).
     - Evaluates Tanglish stage advance/regression.
     - Updates SRS `revision_queue` intervals (1 $\to$ 3 $\to$ 7 $\to$ 14 $\to$ 30 $\to$ 60 days on success; resets to 1 day on failure).
  3. The client receives the calculated result and reflects it in the UI; direct client writes to XP, streaks, or mastery tables are strictly prohibited by RLS.

---

## 5. Unicode NFC Normalization Audit

### Issue: Tamil Complex Script Rendering
- **Linguistic Finding:** Tamil Unicode characters can be encoded either as precomposed glyphs or decomposing combining characters (e.g., base consonant + virama + separate vowel sign). Inconsistent normalization causes string inequality in SQL queries, broken SRS queue indexing, and failure in audio asset lookups.
- **Decision:**
  1. Create a PostgreSQL trigger `trg_enforce_tamil_nfc` running `normalize(NEW.column, NFC)` on insert/update across:
     - `lesson_items.content_ta`
     - `vocabulary_items.word_ta`
     - `tamil_letters.letter`
     - `audio_assets.tamil_text`
  2. Enforce NFC normalization in the seed generator script (`scripts/seed-curriculum.ts`).
  3. Validate all seeded strings with `validate-tamil.js`.
