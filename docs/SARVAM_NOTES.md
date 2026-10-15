# Sarvam AI API Integration Notes & Technical Verification

**Date of Verification:** October 15, 2026  
**Official Documentation Reference:** [https://docs.sarvam.ai](https://docs.sarvam.ai)  
**API Gateway Base URL:** `https://api.sarvam.ai`  
**Authentication Header:** `api-subscription-key: <SARVAM_API_KEY>`

---

## 1. Scope & Strict Constraint: Voice Only
In accordance with PRD Sections 8, 33, and 54, Sarvam AI is integrated **strictly for voice**:
1. **Text-to-Speech (TTS):** Producing authentic Tamil spoken audio for letters, words, and sentences.
2. **Speech-to-Text (STT):** Transcribing short (max 10s) child speaking practice recordings for tolerant text comparison.

**Absolute Prohibitions:**
- **NO LLM / Chat / Translation APIs:** Foundational curriculum content is 100% human-designed and verified. Generative AI is strictly forbidden from creating unverified letters, words, or grammar rules.
- **NO Client-Side Key Exposure:** The `SARVAM_API_KEY` exists exclusively in Supabase Edge Function secrets. It is never exposed in the client bundle, network requests to the browser, source control, or client-side storage.

---

## 2. Text-to-Speech (TTS) — Bulbul Model Family

### 2.1 Endpoint & Specification
- **Method & Path:** `POST https://api.sarvam.ai/text-to-speech`
- **Supported Models:** 
  - `bulbul:v4-flash` (Latest high-speed, expressive Indic speech generation)
  - `bulbul:v1` / `bulbul:v3` (Stable production releases)
- **Target Language:** Tamil (`ta-IN`)
- **Voices / Speakers:** 
  - `meera` (Warm, clear female tone; recommended for child learner audio)
  - `vidya` (Articulate instructional female voice)
  - `arvind` / `shubh` (Clear male tone)
- **Audio Formats & Codecs:** `mp3` (default for CDN storage) or `wav`
- **Supported Sample Rates:** `22050` Hz, `24000` Hz, `16000` Hz, `48000` Hz (We standardize on `22050` Hz MP3 for low bandwidth mobile delivery).
- **Pace / Speed Control:** Float multiplier from `0.5` to `1.5`:
  - Learner Standard Pace: `0.85` (slower, deliberate articulation for non-Tamil speakers)
  - Slow Phonics Variant: `0.70` (used for retroflex consonants and vowel distinction)
- **Payload Limits:** Maximum 2,500 characters per synchronous request.

### 2.2 Request Schema
```json
{
  "inputs": [
    "வணக்கம், தமிழ் பாலத்திற்கு நல்வரவு!"
  ],
  "target_language_code": "ta-IN",
  "speaker": "meera",
  "model": "bulbul:v1",
  "pace": 0.85,
  "speech_sample_rate": 22050,
  "output_audio_codec": "mp3"
}
```

### 2.3 Response Schema
```json
{
  "request_id": "req_84f923b7a1",
  "audios": [
    "//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAA..."
  ]
}
```
*Note: The audio payload is returned as base64-encoded audio within the `audios` array matching the order of the `inputs` array.*

### 2.4 Audio Review & Caching Pipeline
1. **Unicode Normalization:** Before calling the TTS API, input Tamil text is strictly normalized to Unicode NFC.
2. **Hashing & Caching:** Requests are hashed via `sha256(text + voice + pace)`. If an asset with this hash already exists in `audio_assets`, the stored file is returned immediately without contacting Sarvam AI.
3. **Staging vs Public Bucket:**
   - Freshly generated audio is saved in `audio-staging/{hash}.mp3` with status `pending_review`.
   - A native Tamil speaker reviews the asset against the verification checklist (pronunciation of retroflexes ட, ண, ள, ழ, ற, ன and long vowels).
   - Only `approved` assets are moved to the public `audio` CDN bucket. Learners are **never** served unreviewed AI audio as authoritative learning material.

---

## 3. Speech-to-Text (STT) — Saaras Model Family

### 3.1 Endpoint & Specification
- **Method & Path:** `POST https://api.sarvam.ai/speech-to-text`
- **Content-Type:** `multipart/form-data`
- **Supported Models:** `saaras:v4` (Primary Indic ASR engine supporting 22 Indian languages) and `saaras:v3`.
- **Modes:** `transcribe` (transcribes in target language script), `verbatim`, `translate`. We use `mode=transcribe`.
- **Audio Inputs:** Supports WebM, WAV, MP3, AAC, OGG, OPUS, FLAC. Browser recordings captured via `MediaRecorder` (`audio/webm`) are transmitted directly.
- **Maximum Audio Duration:** TamilPalam enforces a strict 10-second ceiling for child recordings (well within Sarvam's 30s synchronous limit).

### 3.2 Request Structure
```bash
curl -X POST https://api.sarvam.ai/speech-to-text \
  -H "api-subscription-key: $SARVAM_API_KEY" \
  -F "file=@recording.webm" \
  -F "model=saaras:v4" \
  -F "mode=transcribe" \
  -F "language_code=ta-IN"
```

### 3.3 Response Schema
```json
{
  "transcript": "வணக்கம்"
}
```

### 3.4 Speech Matching & Child Privacy Safeguards
- **PRD Section 27 Constraint:** Indic speech recognition models on children's speech exhibit high Word Error Rates (WER $0.55–0.71$). Therefore:
  - Transcriptions are compared server-side against target text using a tolerant Levenshtein / character similarity metric over NFC-normalized Tamil characters.
  - The result is explicitly framed to the learner as *"Speech recognition match"*, **never** as a formal pronunciation grade.
  - Low match scores **never** block lesson progression; the self-assessment flow (*"Did it sound close?"*) remains the authoritative completion mechanism.
- **Privacy & Retention:**
  - Microphone access requires verified parental consent for children under 13.
  - Audio files are stored in the private `recordings/{user_id}/...` bucket with an explicit 24-hour expiration timestamp.
  - An automated `pg_cron` / Edge Function task deletes all recording assets older than 24 hours.
  - No child audio is shared with third parties or retained for machine learning training.

---

## 4. Reliability, Quotas & Rate Limiting

### 4.1 Daily Quota & Cost Guardrails
To prevent runaway billing or denial-of-service credit drainage:
- **Daily TTS Cap:** 50,000 characters / day.
- **Daily STT Cap:** 1,200 audio seconds / day.
- **Per-User Limits:** Maximum 20 TTS on-demand requests and 10 STT attempts per user per hour.
- **Circuit Breaker:** If `voice_usage` exceeds the daily quota, or if the Sarvam API returns 429/500 errors consecutively, Edge Functions fail gracefully to browser Web Speech API (`ta-IN`) and return error code `AI_TIMEOUT` (`"Tamil helper is busy. Try again."` / `"தமிழ் உதவியாளர் பிஸியாக உள்ளார்."`).

### 4.2 Error Handling Mapping
| Sarvam API Status | Platform Error Code | User-Facing Message (EN) | User-Facing Message (TA) | Action |
| :--- | :--- | :--- | :--- | :--- |
| `401 Unauthorized` | `AUTH_SERVICE_KEY_INVALID` | Audio system configuration error. | ஆடியோ கட்டமைப்பு பிழை. | Alert admin; fallback to Web Speech. |
| `429 Rate Limited` | `VOICE_RATE_LIMIT` | Tamil helper is busy. Try again soon. | தமிழ் உதவியாளர் பிஸியாக உள்ளார். | Fallback to Web Speech or static retry. |
| `504 Gateway Timeout` | `AI_TIMEOUT` | Audio taking longer than expected. | ஆடியோ தாமதமாகிறது. | Fallback to Web Speech synthesis. |
| `No Tamil Voice` | `SPEECH_FALLBACK_ACTIVE` | Using standard device voice. | சாதனத்தின் குரல் பயன்படுத்தப்படுகிறது. | Fallback badge displayed honestly. |
