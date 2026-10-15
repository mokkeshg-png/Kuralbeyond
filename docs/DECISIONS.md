# TamilPalam (தமிழ் பாலம்) — Technical & Pedagogical Decision Log

## Architecture & Product Decisions

### 1. Unified Responsive Design System with 3 Adaptive Age Modes
- **Context:** The prompt mandates supporting Standards 1 to 12 with special optimization for Standards 1 to 6, split into three age cohorts (Sprouts, Explorers, Scholars).
- **Decision:** Rather than separate applications, we implement a unified design token system applied dynamically via data attributes (`data-age-mode="sprouts" | "explorers" | "scholars"`).
  - *Sprouts:* 64px min touch target, 72px buttons, 96–140px Tamil letters, audio-led instructions, segmented progress steps, tap-only interactions.
  - *Explorers:* 52px min touch target, 40–72px Tamil font, drag-and-drop with tap alternative, companion mascot (Kili), missions, streak calendar.
  - *Scholars:* 44px min touch target, mature styling, no mascot, dense layouts, direct phonics skips.
- **Rationale:** Ensures complete code reusability, seamless state migration as a child advances in grade, and maintainability.

### 2. Typed Service Layer with Local Storage Mock Adapter
- **Context:** Frontend build must be 100% functional end-to-end without requiring a live remote backend server, while ensuring clean decoupling for future Supabase plug-in.
- **Decision:** Every domain is accessed via typed interfaces (`IAuthService`, `ICurriculumService`, `IProgressService`, `IMasteryService`, `ITanglishService`, `IRevisionService`, `IMissionService`, `IParentService`) implemented by a resilient `LocalMockAdapter` utilizing `localStorage` and seed JSON.
- **Rationale:** Zero external network latency, full offline PWA resilience, and instant migration path to Supabase.

### 3. Progressive Tanglish Reduction (PTR) Formula & "Script Power"
- **Context:** PRD Section 23 specifies stages A through E with recency weighting.
- **Decision:**
  - Implemented the exact mathematical formula:
    $$\text{Mastery Score} = \left(\frac{\text{Correct Recalls}}{\text{Total Attempts}}\right) \times \exp(-\lambda t) \times \text{Difficulty Modifier}$$
    where $\lambda = \ln(2) / 14$ days.
  - Visualized as a 5-tier "Script Power" (எழுத்து ஆற்றல்) gauge in the header, celebrating the reduction of Tanglish as an achievement rather than a deprivation.
  - Provided a persistent "Need help? / உதவி தேவை" button allowing the student to view Tanglish on demand at any stage without penalty.

### 4. Interactive Letter Tracing as Core P0 Activity
- **Context:** PRD mentions writing as a goal in Section 7, but omitted it from the P0 activity matrix in Section 15.
- **Decision:** Added interactive SVG canvas tracing with outline guides and touch/mouse drawing to the lesson player. Verified on both mobile touchscreens and desktop pointer devices.

### 5. Speaking Practice via Client-Side Record-and-Compare
- **Context:** Speech-to-text WER for Tamil children's speech is too inaccurate (0.55–0.71 WER) to support automated grading.
- **Decision:** HTML5 `MediaRecorder` captures audio locally. The learner plays their recording side-by-side with the native model audio and self-evaluates with friendly emoji feedback. Recordings never leave the client device and are discarded after 24 hours.

### 6. Original Mascot Character: Kili the Parrot (கிளி)
- **Context:** Absolute prohibition on copyrighted or imitating existing characters (e.g., Duolingo owl). Friendly guide permitted if functional.
- **Decision:** Created an original green Tamil parrot named **Kili (கிளி)** inspired by traditional Tamil literature where parrots symbolize sweet learning and speech (கிளிப்பேச்சு). Kili provides hints, praises effort, and acts as audio speaker. Disabled automatically in Scholars mode.

### 7. Dual Audio Architecture (Manifest + Web Speech API Fallback)
- **Context:** Prerecorded audio files are designated in the audio manifest. For items where recorded MP3s are pending, the player falls back gracefully to browser SpeechSynthesis with `ta-IN` voice and an honest fallback indicator.

### 8. Server-Authoritative Progression & Zero Client Trust (RPC Architecture)
- **Context:** PRD specified client-side tracking for streaks, XP, and mastery. A malicious or buggy client could forge XP totals, bypass SRS intervals, or falsify level completions.
- **Decision:** All gamification and learning logic is enforced server-side via PostgreSQL `SECURITY DEFINER` stored procedures (`submit_item_answer`, `complete_lesson`, `get_resume_point`, `get_dashboard_summary`). All XP awards are appended to an immutable `xp_ledger`. The client cannot directly mutate XP, streaks, or mastery tables.

### 9. Secure Role Architecture via PostgreSQL `user_roles`
- **Context:** Storing roles (admin, parent, teacher) in Supabase `raw_user_meta_data` is insecure because `supabase.auth.updateUser()` allows clients to overwrite their own metadata.
- **Decision:** Roles are stored in an explicit `user_roles` database table with default-deny RLS. Privileges are checked via a `SECURITY DEFINER` helper function `has_role(check_role TEXT)`. User metadata is never trusted for authorization.

### 10. Parent-Managed Multi-Profile Model for COPPA 2.0 / GDPR-K
- **Context:** PRD Section 57 specified 1:1 user-to-profile mapping, but COPPA 2.0 and GDPR-K require verifiable parental consent and prohibit unmonitored accounts for children under 13. Furthermore, Section 72 requires parent profile switching.
- **Decision:** Designed a parent-managed child profile model where one authenticated parent account can create and manage multiple child profiles (`is_child = true`). Child accounts operate in restricted demo mode until verified parental consent is recorded in `consent_records`.

### 11. Database-Level Unicode NFC Normalization
- **Context:** Tamil script has multiple Unicode representations (decomposed vs precomposed characters). Inconsistent normalization causes string search failures, broken index lookups, and audio asset misses.
- **Decision:** Applied PostgreSQL triggers on all Tamil text columns calling `normalize(NEW.col, NFC)` to enforce Unicode NFC normalization at the database storage layer, supplemented by build-time validation.

### 12. Human-Reviewed Audio Staging Pipeline for Sarvam AI TTS
- **Context:** Unconstrained or unreviewed AI-generated audio may mispronounce nuanced Tamil phonemes (such as retroflex consonants ள, ழ, ண or vowel lengths அ/ஆ).
- **Decision:** AI audio generated via Sarvam TTS is saved to a private `audio-staging` bucket with status `pending_review`. A native Tamil speaker must review and approve the asset before it is copied to the public CDN `audio` bucket. Never auto-publish unreviewed TTS to young learners.

### 13. Ephemeral Retention & Tolerant Matching for Speaking Practice
- **Context:** Indic speech recognition on children's speech has high Word Error Rates (WER 0.55–0.71). Storing child audio indefinitely poses privacy hazards.
- **Decision:** Client recordings are uploaded to a private bucket with a 24-hour expiration timestamp and hard-deleted automatically via `cleanup-recordings` Edge Function / `pg_cron`. The STT transcript is compared using a tolerant character-similarity algorithm and framed as "Speech recognition match" without assigning punitive pronunciation grades.

