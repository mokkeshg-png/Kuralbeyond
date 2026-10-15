# TamilPalam (தமிழ் பாலம்) — Backend Understanding Document

## 1. Executive Summary & Architectural Mission
**TamilPalam** ("Tamil Bridge") is a gamified, audio-first Tamil language learning platform for school students (Standard 1–12, with primary UI optimization for Standards 1–6) from non-Tamil-speaking backgrounds. The platform utilizes **Progressive Tanglish Reduction (PTR)**—a 5-stage pedagogical ladder (Stages A to E)—to guide learners from Romanized phonetic support to independent, fluent Tamil script reading and listening comprehension.

The frontend is built in React 18 + TypeScript + Vite with a clean, typed service abstraction layer (`src/services/*`) currently powered by a mock `LocalStorageAdapter`. 

Our architectural mission is to design, implement, and wire the **complete production-grade Supabase backend** (PostgreSQL, Supabase Auth, Row Level Security, Supabase Storage, Edge Functions in Deno/TypeScript, and pg_cron) behind these service interfaces. The frontend UI and user experience must remain completely intact—no screen broken, no regressions—while replacing client-side mocks with secure, server-authoritative persistence and privileged Edge Functions.

---

## 2. Scope & Topology: Serverless Supabase Infrastructure
In strict compliance with PRD Sections 51, 52, and 54, the backend architecture excludes standalone API servers (no Express, FastAPI, or custom REST servers). The complete platform operates on:
1. **PostgreSQL 15+ (via Supabase):** Relational data storage, foreign key cascades, Unicode NFC normalization triggers, and server-side business logic implemented as audited `SECURITY DEFINER` stored procedures.
2. **Supabase Auth (GoTrue):** User authentication via email/password and OAuth (Google). Passwords enforce an 8+ character minimum with leaked-password protection where available.
3. **Row Level Security (RLS):** Default-deny on all tables in the `public` schema. Zero queries or mutations without verified authorization policies.
4. **Supabase Storage:** S3-compatible object storage with fine-grained access policies across three buckets:
   - `audio` (public-read CDN for approved, reviewer-verified lesson audio).
   - `audio-staging` (private, admin-only bucket for draft TTS batches awaiting native speaker verification).
   - `recordings` (private, learner-isolated bucket for temporary speaking practice audio, subject to a strict 24-hour retention ceiling).
5. **Supabase Edge Functions (Deno / TypeScript):** Privileged, secret-bearing microservices for:
   - `tts-generate-batch` (Admin batch synthesis with Sarvam AI Bulbul).
   - `tts-get` (Authenticated, rate-limited on-demand TTS with content hash caching).
   - `admin-review-audio` (Admin approval workflow copying staged audio to public CDN).
   - `stt-transcribe` (Feature-flagged speaking practice transcription with Sarvam AI Saaras).
   - `parent-consent-request` & `parent-consent-confirm` (COPPA/GDPR-K verifiable parental consent flow).
   - `export-my-data` (GDPR data portability JSON export).
   - `delete-account` (Complete cascade erasure across DB, storage, and auth).
   - `cleanup-recordings` (Scheduled hard deletion of audio older than 24 hours).
   - `weekly-parent-summary` (Aggregated learning activity reporting).
6. **pg_cron:** Periodic background maintenance (purging unverified temporary data, recording cleanup verification, and daily streak grace rollups).

---

## 3. Server-Authoritative Logic vs. Client Trust
The backend enforces **Zero Client Trust** for progression, gamification, and linguistic state:
- **Experience Points (XP):** XP awards (10 XP per correct response, 5 XP per lesson completion, 50 XP per level completion, 25–35 XP per mission) are computed server-side in the `complete_lesson` and `submit_item_answer` RPCs and logged in an append-only `xp_ledger`. The client cannot manipulate its XP total.
- **Streaks & Grace:** Evaluated server-side. Consecutive daily activity increments the streak; 1-day automatic grace or weekly streak freeze is applied without punitive reset; soft reset to 1 day occurs if inactivity exceeds 2 days.
- **Skill Mastery & SRS Intervals:** Calculated via PostgreSQL function:
  $$\text{Mastery Score} = \left(\frac{\text{Correct}}{\text{Attempts}}\right) \times \exp(-\lambda t) \times \text{Difficulty Modifier}$$
  where $\lambda = \ln(2) / 14$ days. Revision intervals follow the PRD sequence: 1, 3, 7, 14, 30, and 60 days, resetting to 1 day on failed recall.
- **Progressive Tanglish Reduction (PTR):** Evaluated per-item and aggregated globally based on demonstrated accuracy thresholds:
  - Stage A $\to$ B: 80% accuracy across 10 items.
  - Stage B $\to$ C: 85% accuracy across 15 items.
  - Stage C $\to$ D: 85% accuracy across 15 items + 3 distinct sessions.
  - Stage D $\to$ E: 90% accuracy across 20 items.
  - Item regression occurs automatically when accuracy drops below 70%, without demoting the user's global unlocked level.

---

## 4. Voice Architecture: Sarvam AI Integration Rules
Sarvam AI is used **strictly for voice** (Text-to-Speech and optional Speech-to-Text). In adherence to the prompt and PRD Section 33, **no LLMs or unconstrained generative AI** are used for foundational educational content.

### 4.1 Text-to-Speech (TTS) Pipeline
- **Reviewer-Gated Batch Generation:** Admin-triggered Edge Function (`tts-generate-batch`) normalizes Tamil text to Unicode NFC and calls Sarvam TTS (`https://api.sarvam.ai/text-to-speech`) using model `bulbul:v1` / `bulbul:v4-flash` with a child-friendly voice (e.g., `meera`) and learner pace ($0.85\times$).
- **Staging Bucket:** Generated MP3 files are stored in `audio-staging` with an `audio_assets` database row set to `pending_review`.
- **Native Speaker Review:** A native Tamil speaker must approve every audio asset via `admin-review-audio` checking retroflex consonants (ட, ண, ள, ழ, ற, ன) and vowel lengths (அ/ஆ, இ/ஈ). Upon approval, the asset is copied to the public `audio` bucket.
- **Dynamic TTS Fallback (`tts-get`):** Authenticated, rate-limited on-demand endpoint for dynamic sentences. Responses are cached by SHA256(`text + voice + pace`).
- **Frontend Fallback Chain:** Approved Stored File $\to$ Cached TTS $\to$ `tts-get` $\to$ Web Speech API (`ta-IN`) $\to$ Text retry prompt.

### 4.2 Speaking Practice (STT) & Privacy
- **P1 Feature Flag:** Speaking transcription is behind feature flag `speaking_practice_stt` (default `false`).
- **Consent Gate:** For learners under 13, verified parental consent must exist before microphone access or audio upload is allowed.
- **Record-and-Compare Primary:** Audio is played back to the child alongside model audio for self-assessment.
- **Speech Recognition Match Only:** When STT is active, the audio (max 10s) is transcribed via Sarvam `saaras:v4` (`https://api.sarvam.ai/speech-to-text`) and compared server-side against target text using Tamil string normalization. It is presented strictly as *"Speech recognition match"*, never as a certified pronunciation grade.
- **24-Hour Ephemeral Retention:** Stored in `recordings/{user_id}/...`, never public, never used for AI training, and hard-deleted within 24 hours.

---

## 5. Child Safety, COPPA 2.0 & GDPR-K Compliance
- **Under-13 Flow:** Accounts flagged as `is_child = true` or with DOB under 13 require verified parental consent. Until consent is verified via parent email confirmation code, child accounts operate in restricted demo mode.
- **Data Minimization:** No personal data collected beyond display name, age mode/grade, and optional DOB. Zero phone numbers, zero biometrics, zero behavioral ads, zero third-party trackers.
- **Parental Rights:** Parents can link to child profiles, view learning progress read-only, trigger a GDPR JSON data export (`export-my-data`), and permanently delete all child data (`delete-account`).
- **Cascade Erasure:** Account deletion cascades across `profiles`, `lesson_progress`, `quiz_attempts`, `learner_skill_mastery`, `revision_queue`, `user_achievements`, `daily_learning_activity`, and cleans all associated storage files in `recordings`.

---

## 6. Frontend Integration & Service Layer Preservation
The frontend service layer (`src/services/*`) will be augmented with a `SupabaseAdapter` implementing the existing interfaces:
- `authService`: GoTrue sign-in, sign-up, sign-out, session restoration, and parental consent verification.
- `curriculumService`: Fetching learning levels, lessons, and exercises with single-query joins.
- `progressService`: Interfacing with `complete_lesson` RPC, streak maintenance, badge queries, and activity logs.
- `masteryService`: Interfacing with `submit_item_answer` RPC for real-time skill score updates.
- `tanglishService`: Deriving stage display rules from server-calculated `script_power_stage`.
- `revisionService`: Interfacing with `get_due_revision_items` and `record_revision_attempt` RPCs.
- `missionService`: Fetching and recording real-life missions.
- `parentService`: Fetching aggregated parent summaries and JSON data export.
- `audioService`: Interfacing with Supabase Storage public CDN and `tts-get` Edge Function fallback.

An environment flag `VITE_USE_MOCK_STORAGE` will allow toggling between the real Supabase backend and the local mock adapter for offline demos and isolated client testing.
