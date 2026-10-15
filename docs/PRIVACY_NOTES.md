# TamilPalam (தமிழ் பாலம்) — Child Safety, Privacy & Processor Disclosure

> [!IMPORTANT]
> **LEGAL NOTICE & DISCLAIMER:**  
> This document and the associated TamilPalam software constitute an **engineering implementation** of technical privacy and child safety controls. This document does **NOT** constitute formal legal advice. Regulatory frameworks governing children's privacy—including COPPA 2.0 (United States FTC), GDPR-K (European Union & United Kingdom), and the Digital Personal Data Protection Act (India)—are subject to evolving statutory interpretations. Items designated as requiring legal review must be audited by qualified privacy counsel prior to commercial public deployment.

---

## 1. Compliance Architecture Overview
TamilPalam is designed specifically for children (Standards 1 to 12, with primary optimization for Standards 1 to 6). Our architecture enforces the highest international standards of child privacy protection, incorporating:
- **COPPA 2.0 (Children's Online Privacy Protection Act):** Full compliance with updated regulations expanding the definition of biometric identifiers and audio data.
- **GDPR-K (General Data Protection Regulation - Kids):** Strict verifiable parental consent thresholds (ages 13–16 depending on jurisdiction), right to data portability, and right to complete erasure.
- **Data Minimization by Default:** Only collecting the absolute minimum information necessary to personalize instruction and monitor curriculum mastery.

---

## 2. Disclosed Third-Party Data Processors

| Processor | Role in Platform | Data Transmitted | Privacy Safeguards & Data Handling |
| :--- | :--- | :--- | :--- |
| **Supabase Inc.** | Backend infrastructure (PostgreSQL database, GoTrue Auth, Object Storage, Edge Functions) | Learner profile (display name, grade, interface preference), learning progress, quiz attempts, mastery scores, parent email, ephemeral recordings. | Enterprise cloud infrastructure with TLS 1.3 in transit and AES-256 encryption at rest. Database protected by strict Row Level Security (RLS) denying public or cross-user access. Service role keys isolated to server-side Edge Functions. |
| **Sarvam AI (Sarvam Technologies Pvt. Ltd.)** | Voice synthesis (TTS) & optional speech recognition (STT) | • **TTS:** Educational Tamil text only (letters, vocabulary words, lesson sentences). **Zero learner PII.**<br>• **STT:** Short (max 10s) child audio recording. Transmitted **without** user ID, name, email, or device metadata. | Processing is conducted ephemerally for transcription inference. Voice data is not retained by Sarvam AI for foundational model training on commercial API tiers. TamilPalam deletes all audio from its private Supabase storage within 24 hours. |

**Prohibited Processors (Zero Tolerance):**
- **NO Third-Party Advertising SDKs:** Zero Google AdMob, Unity Ads, Meta Audience Network, or tracking pixels.
- **NO Behavioral Analytics Trackers:** Zero Google Analytics, Mixpanel, Amplitude, or Hotjar. Application telemetry is restricted to privacy-preserving, anonymized, non-IP-logging database rows in `analytics_events`.

---

## 3. Data Categories & Retention Schedule

| Data Category | Purpose | Collected From | Retention Period | Deletion Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **Display Name** | Personalizing lessons & certificates | Learner or Parent | Until account deletion | Account deletion |
| **Email Address** | Authentication & parental consent | Parent / Guardian | Until account deletion | Account deletion |
| **Date of Birth** | Age mode & consent determination | Learner or Parent | Until account deletion | Account deletion |
| **Learning Progress & Mastery** | Spaced repetition, PTR stage tracking, XP | Automated via learning sessions | Until account deletion | Account deletion |
| **Speaking Practice Audio** | Self-assessment audio comparison | Learner microphone (with consent) | **Maximum 24 hours** | Scheduled automated purge (`cleanup-recordings` / `pg_cron`) |
| **Consent Records** | Legal compliance audit trail | Parent via email code | Retained in audit log for statutory compliance | Account deletion or revocation request |
| **IP Addresses** | Network routing only | Web browser | **Zero retention:** IP addresses are never persisted in the database | Discarded immediately |
| **Camera / Photos** | None | Not collected | N/A | N/A |
| **GPS / Exact Location** | None | Not collected | N/A | N/A |

---

## 4. Parental Control & Rights

### 4.1 Verifiable Parental Consent Flow (Under 13)
1. During signup, if `grade <= 6` or age `< 13`, the account is automatically flagged `is_child = true`.
2. The platform requires the parent or guardian's email address.
3. A verification code and consent link are dispatched to the parent via `parent-consent-request`.
4. Until consent is confirmed via `parent-consent-confirm`, the child is locked to **Demo Mode** (Level 0 preview, zero microphone access, zero progress persistence).
5. Upon confirmation, a cryptographically hashed record is created in `consent_records` specifying the parent email, policy version, and timestamp.

### 4.2 Right to Access & Transparency
Parents can access the **Parent Dashboard** (`/parent`) at any time to:
- Review weekly practice minutes, lesson completion count, and streak status.
- Inspect skill mastery across reading, listening, vocabulary, and speaking.
- Disable microphone access and speaking exercises at any time with a single toggle.

### 4.3 Right to Data Portability (`export-my-data`)
Parents have the statutory right under GDPR Article 20 to export all data associated with their child. The `export-my-data` Edge Function compiles and delivers a structured, human-readable JSON archive containing:
- Profile and preference records
- Full curriculum progress and quiz history
- Skill mastery metrics and SRS revision queue items
- Earned achievements and mission reflections

### 4.4 Right to Complete Erasure (`delete-account`)
When an account deletion is requested:
1. The `delete-account` Edge Function is invoked under parent authentication.
2. PostgreSQL cascades deletion across all foreign keys:
   `profiles` $\to$ `lesson_progress`, `quiz_attempts`, `learner_skill_mastery`, `revision_queue`, `user_achievements`, `daily_learning_activity`, `parent_child_relationships`.
3. All files stored in Supabase Storage under `recordings/{user_id}/` are hard-deleted.
4. The GoTrue user record in `auth.users` is purged.

---

## 5. Items Requiring Formal Legal Review Prior to Public Launch
1. **Verifiable Consent Verification Method:** Confirm whether email plus secondary confirmation (code entry) satisfies FTC COPPA 2.0 standards for your operational jurisdiction, or whether credit card verification / government ID verification is required for paid tiers.
2. **Jurisdiction-Specific Age Thresholds:** GDPR allows member states to set the age of digital consent between 13 and 16 (e.g., 16 in Germany, 13 in the UK). Counsel should review geographic IP policy enforcement.
3. **Sarvam AI Data Processing Agreement (DPA):** Formal DPA must be executed with Sarvam Technologies Pvt. Ltd. confirming their role as a sub-processor under GDPR Article 28 with standard contractual clauses (SCCs) regarding data processing and ephemeral voice handling.
4. **Terms of Service & COPPA Direct Notice:** Review public-facing Children's Privacy Policy copy and direct notice email templates sent to parents.
