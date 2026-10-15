# Kuralbeyond — TamilPalam

A Tamil learning platform for school students (Standard 1–12, UI optimised for Std 1–6) who are non-Tamil speakers. Built with React + TypeScript + Vite (frontend) and Supabase (backend).

## Quick Start (Frontend only, mock mode)

```bash
npm install
npm run dev
```

This runs the app with the `LocalStorageAdapter` — no Supabase needed. All data is stored in the browser.

---

## Backend Setup (Supabase)

### Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) ≥ 1.150
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for local Supabase)
- Node.js ≥ 18

### 1. Create your Supabase project

```bash
# Start local Supabase (requires Docker)
npx supabase init   # already done — supabase/ dir exists
npx supabase start
```

Or create a hosted project at [supabase.com](https://supabase.com).

### 2. Configure environment

```bash
cp .env.example .env
# Fill in your values:
#   VITE_SUPABASE_URL=http://localhost:54321    (local) or https://xxx.supabase.co (hosted)
#   VITE_SUPABASE_ANON_KEY=<your-anon-key>
#   VITE_USE_MOCK_STORAGE=false
```

### 3. Run migrations & seed

```bash
npx supabase db reset          # Runs all migrations + seed.sql from scratch
# OR apply incrementally:
npx supabase db push           # Push migrations to linked project
npx supabase db seed            # Run seed.sql
```

The 6 migration files create:
| Migration | Contents |
|---|---|
| `000001_core_schema` | profiles, roles, preferences, levels, lessons, items, letters, vocabulary |
| `000002_progress_gamification` | progress, attempts, mastery, revision_queue, achievements, streaks, XP ledger, missions |
| `000003_audio_safety_audit` | audio_assets, speaking_recordings, consent, parent-child, content_reports, feature_flags, voice_usage |
| `000004_triggers_indexes` | `set_updated_at()`, `normalize_tamil_nfc()` triggers, indexes on all FKs & RLS columns |
| `000005_rls_policies` | RLS enabled on all 31 tables, default-deny, `(select auth.uid())` pattern |
| `000006_rpc_functions` | `submit_item_answer`, `complete_lesson`, `get_resume_point`, `get_dashboard_summary`, `recommend_next_lesson`, `get_parent_summary` |

### 4. Set Edge Function secrets

```bash
supabase secrets set SARVAM_API_KEY=<your-sarvam-key>
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
supabase secrets set ALLOWED_ORIGIN=http://localhost:5173
```

> ⚠️ **NEVER** put `SARVAM_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in the frontend `.env` or in the repo.

### 5. Deploy Edge Functions

```bash
supabase functions deploy tts-get
supabase functions deploy tts-generate-batch
supabase functions deploy stt-transcribe
supabase functions deploy admin-review-audio
supabase functions deploy parent-consent-request
supabase functions deploy parent-consent-confirm
supabase functions deploy delete-account
supabase functions deploy export-my-data
supabase functions deploy cleanup-recordings
supabase functions deploy weekly-parent-summary
```

### 6. Create the first admin user

After signing up via the app:

```sql
-- Run in SQL Editor or psql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<auth-user-uuid>', 'admin');
```

Admin users can:
- Review & approve TTS audio (`admin-review-audio`)
- Generate batch TTS (`tts-generate-batch`)
- Manage content reports

### 7. Sarvam AI voice setup

1. Sign up at [dashboard.sarvam.ai](https://dashboard.sarvam.ai)
2. Create an API subscription key
3. Set the key via `supabase secrets set SARVAM_API_KEY=<key>`
4. Generate TTS audio for lesson items via the `tts-generate-batch` Edge Function
5. Review and approve audio via `admin-review-audio`
6. Only **approved** audio is served to learners

See [docs/SARVAM_NOTES.md](docs/SARVAM_NOTES.md) for API details, models, and limits.

### 8. Publishing reviewed audio

```
Audio lifecycle:
  1. tts-generate-batch → audio stored in `audio-staging` bucket, status = pending_review
  2. Admin reviews via admin-review-audio → status = approved/rejected
  3. Approved audio is copied to `audio` bucket (public CDN)
  4. Lesson items reference the public_url from approved audio_assets
```

### 9. Storage buckets

| Bucket | Access | Purpose |
|---|---|---|
| `audio` | Public read, admin write | Approved TTS audio served to learners |
| `audio-staging` | Private, admin only | Unreviewed TTS audio awaiting review |
| `recordings` | Private, per-user path | Child speaking recordings (hard-deleted after 24h) |

---

## Switching between mock and Supabase

| Mode | How | Use case |
|---|---|---|
| Mock (localStorage) | `VITE_USE_MOCK_STORAGE=true` or no Supabase env vars | Offline demos, frontend-only dev |
| Supabase | `VITE_USE_MOCK_STORAGE=false` + valid `VITE_SUPABASE_URL` and key | Full backend with auth, RLS, voice |

The service layer automatically selects the adapter based on these env vars. No UI code changes needed.

---

## Running tests

```bash
npm test                    # Run all vitest tests
node scripts/secret-scan.js # Scan for leaked secrets
node scripts/generate-seed.js # Regenerate seed.sql from frontend data
```

---

## Project structure

```
src/
  services/           # Service layer with adapter pattern
    supabaseAdapter.ts # Supabase implementation
    supabaseClient.ts  # Typed Supabase client
    index.ts           # Adapter selection logic
  types/
    database.ts        # Generated DB types
supabase/
  migrations/          # 6 ordered SQL migrations
  seed.sql             # Full curriculum seed (generated)
  functions/           # 10 Edge Functions + _shared/
  config.toml          # Supabase project config
scripts/
  generate-seed.js     # Generates seed.sql from frontend data
  secret-scan.js       # Scans for leaked secrets
docs/
  BACKEND_UNDERSTANDING.md
  BACKEND_AUDIT.md
  BACKEND_PLAN.md
  SARVAM_NOTES.md
  PRIVACY_NOTES.md
  DECISIONS.md
  BACKEND_QA_REPORT.md
tests/
  backendLogic.test.ts  # 20 backend formula tests
  mastery.test.ts       # Mastery decay tests
  spacedRepetition.test.ts
  streakGrace.test.ts
  tanglish.test.ts
  i18nParity.test.ts
```

---

## Documentation

| Document | Contents |
|---|---|
| [BACKEND_UNDERSTANDING](docs/BACKEND_UNDERSTANDING.md) | Architecture summary, rationale |
| [BACKEND_AUDIT](docs/BACKEND_AUDIT.md) | PRD gaps found and how each was resolved |
| [BACKEND_PLAN](docs/BACKEND_PLAN.md) | 9-phase execution plan |
| [SARVAM_NOTES](docs/SARVAM_NOTES.md) | Sarvam API verification (models, limits, auth) |
| [PRIVACY_NOTES](docs/PRIVACY_NOTES.md) | COPPA/GDPR-K compliance notes |
| [DECISIONS](docs/DECISIONS.md) | Design decisions log |
| [BACKEND_QA_REPORT](docs/BACKEND_QA_REPORT.md) | Quality gates evidence |
| [TAMIL_REVIEW](docs/TAMIL_REVIEW.md) | Tamil strings needing native speaker review |

