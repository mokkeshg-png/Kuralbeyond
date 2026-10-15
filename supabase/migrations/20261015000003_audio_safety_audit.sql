-- Migration 00003: Audio Assets, Review, Speaking Recordings, Safety, and Privacy
-- Tables: audio_assets, speaking_recordings, consent_records, parent_child_relationships,
--         content_reports, feature_flags, voice_usage, audit_log, analytics_events

-- 1. Audio Assets Table (Human-reviewed audio staging pipeline)
CREATE TABLE IF NOT EXISTS public.audio_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_type TEXT NOT NULL CHECK (item_type IN ('letter', 'word', 'sentence', 'story', 'instruction')),
    item_id TEXT NOT NULL,
    tamil_text TEXT NOT NULL,
    tanglish TEXT,
    voice TEXT NOT NULL DEFAULT 'meera',
    pace NUMERIC NOT NULL DEFAULT 0.85,
    sha256 TEXT NOT NULL UNIQUE,
    storage_path TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected')),
    reviewer_id UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMPTZ,
    review_notes TEXT,
    needs_review BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Speaking Recordings Table (Private, 24-hour retention ceiling)
CREATE TABLE IF NOT EXISTS public.speaking_recordings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    storage_path TEXT NOT NULL,
    duration_seconds NUMERIC CHECK (duration_seconds <= 10.0),
    target_text TEXT,
    transcription TEXT,
    similarity_score NUMERIC CHECK (similarity_score BETWEEN 0.0 AND 1.0),
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('uploading', 'completed', 'failed', 'deleted')),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '24 hours'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Consent Records Table (COPPA 2.0 / GDPR-K verifiable parental consent audit trail)
CREATE TABLE IF NOT EXISTS public.consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_email TEXT NOT NULL,
    child_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    consent_method TEXT NOT NULL CHECK (consent_method IN ('email_verification_code', 'text_plus', 'parent_dashboard_manual')),
    policy_version TEXT NOT NULL DEFAULT '1.0',
    verification_token_hash TEXT,
    verified_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Parent Child Relationships Table
CREATE TABLE IF NOT EXISTS public.parent_child_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    child_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL DEFAULT 'parent' CHECK (relationship_type IN ('parent', 'guardian', 'educator')),
    verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (parent_profile_id, child_profile_id)
);

-- 5. Content Reports Table (In-app "Report an issue")
CREATE TABLE IF NOT EXISTS public.content_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    item_id TEXT,
    report_type TEXT NOT NULL CHECK (report_type IN ('audio_defect', 'spelling_grammar', 'transliteration_error', 'rendering_issue', 'other')),
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    resolved_by UUID REFERENCES auth.users(id),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Feature Flags Table
CREATE TABLE IF NOT EXISTS public.feature_flags (
    flag_key TEXT PRIMARY KEY,
    is_enabled BOOLEAN NOT NULL DEFAULT false,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default feature flags
INSERT INTO public.feature_flags (flag_key, is_enabled, description) VALUES
('speaking_practice_stt', false, 'Optional P1 Speech-to-Text transcription (Sarvam AI Saaras)'),
('sarvam_tts_enabled', true, 'Text-to-Speech synthesis (Sarvam AI Bulbul)'),
('strict_parental_consent', true, 'Lock under-13 accounts to demo until parent email confirmed')
ON CONFLICT (flag_key) DO NOTHING;

-- 7. Voice Usage Table (Daily quota enforcement)
CREATE TABLE IF NOT EXISTS public.voice_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
    provider TEXT NOT NULL DEFAULT 'sarvam_ai',
    tts_characters_count INTEGER NOT NULL DEFAULT 0,
    stt_seconds_count INTEGER NOT NULL DEFAULT 0,
    cost_estimate_inr NUMERIC NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (usage_date, provider)
);

-- 8. Audit Log Table
CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Analytics Events Table (Minimal, no IP, privacy-first)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name TEXT NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    properties JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
