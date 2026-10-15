# TamilPalam (தமிழ் பாலம்) — PRD Audit & Corrections Log

This document audits the PRD for contradictions, omissions, typographical and linguistic errors, and pedagogical gaps, logging the precise engineering and design decisions adopted in this build.

---

## 1. Contradictions & Scope Clarifications

### (a) Target Audience & Grade Range
- **PRD Text:** Sections 9 and 10 state the target audience is "Children aged 7–12" with personas Aarav (8) and Meera (10).
- **Prompt Specification:** Requires support for **School Students from Standard 1 to Standard 12** (~ages 6 to 18), with UI optimized for Standards 1–6 across three dedicated Age Modes.
- **Audit Finding:** Restricting to ages 7–12 ignores primary Grade 1–2 learners (Sprouts) and older Grade 7–12 students (Scholars) preparing for board exams or diaspora heritage fluency.
- **Decision:**
  - Build a single, highly adaptable design system powering three age modes configured automatically upon Grade selection (and switchable in Settings):
    1. **Sprouts (Std 1–3, ~ages 6–9):** Minimum touch target 64px, primary buttons 72px, audio-first instructions, max 6 words of copy, tap-to-select and tap-to-place only (no drag & drop), 96–140px Tamil glyphs, segmented progress.
    2. **Explorers (Std 4–6, ~ages 9–12):** Minimum touch target 52px, multi-modal interaction (drag-and-drop + tap alternative), 40–72px Tamil font, gamified missions, streak calendar, and companion mascot hints (**Kili / கிளி**).
    3. **Scholars (Std 7–12, ~ages 12–18):** Minimum touch target 44px, cleaner and denser layout, no mascot chatter, faster flow, skip option for basic phonics, and mature tone.

---

### (b) Omission of ஃ (Aytham) in Letter Inventory
- **PRD Text:** Section 21 lists Phase 1 as `அ, ஆ, இ, ஈ, உ, ஊ` and Phase 2 as `எ, ஏ, ஐ, ஒ, ஓ, ஔ`, followed immediately by Phase 3 consonants `க, ங, ச...`.
- **Audit Finding:** The fundamental Tamil alphabet consists of 12 Uyir vowels (உயிர் எழுத்துக்கள்), 18 Mei consonants (மெய் எழுத்துக்கள்), and **1 Aytham letter (ஆய்த எழுத்து — ஃ)**, totaling 31 primary letters. Omitting **ஃ** is a critical pedagogical error for any Tamil foundational course.
- **Decision:**
  - Introduce **ஃ** (Aytham) immediately following ஔ in Level 1 (Uyir & Aytham lesson).
  - Phonics sound: guttural voiceless velar/glottal stop (/x/ or /h/ sound).
  - Primary Tanglish: `ak` / `akh`.
  - Example word: **எஃகு** (*ehgu* / steel/weapon).
  - SVG tracing template provided for the 3 iconic triangular dots (முப்புள்ளி / முப்பாற்புள்ளி).

---

### (c) Auditing Tamil Words, Sentences, and Transliterations

The PRD PDF contains multiple font rendering/encoding corruptions and transliteration inconsistencies. Every instance has been audited and corrected below:

| PRD Corrupted / Erroneous String | Intended Tamil Word | Correct Standard Tanglish | English Meaning | Audit Note & Correction |
| :--- | :--- | :--- | :--- | :--- |
| `Š‹ன (poona)` | **பூனை** | `poonai` | Cat | Fixed glyph encoding; replaced incorrect Tanglish "poona" with standard diphthong "poonai" (`-ai` for ை). |
| `நன்ற‚ (nandri)` | **நன்றி** | `nandri` | Thank you | Fixed corrupted றி glyph. |
| `ஒன்ƒ (ondru)` | **ஒன்று** | `ondru` | One (1) | Fixed corrupted று glyph. |
| `இரண்„ (irandu)` | **இரண்டு** | `irandu` | Two (2) | Fixed corrupted டு glyph. |
| `ச…வப்† (sivappu)` | **சிவப்பு** | `sivappu` | Red | Fixed broken ி and ு diacritics. |
| `பச்ைச (pachai)` | **பச்சை** | `pachai` | Green | Fixed split diphthong ை. |
| `ேசாƒ (soru)` | **சோறு** | `soru` | Cooked rice | Fixed split vowel sign ோ and corrupted று. |
| `நல்ல ைபயன் (nalla paiyan)` | **நல்ல பையன்** | `nalla paiyan` | Good boy | Rejoined vowel sign ை with consonant ப. |
| `என் ெபயர் ஆரவ் (en peyar Aarav)` | **என் பெயர் ஆரவ்** | `en peyar Aarav` | My name is Aarav | Fixed decomposed vowel sign ெ. |
| `உனக்  எப்பŽ இ க் ? (unakku eppadi irukku?)` | **உனக்கு எப்படி இருக்கிறது?** / **உனக்கு எப்படி இருக்கு?** | `unakku eppadi irukku?` | How are you? | Restored missing glyphs கு, டி, ரு. Supported spoken form with correct spelling. |
| `எனக்  பழம் ப‚Žக் ம். ஆ ல் காய்கற‚ ப‚Žக்கா‘.` | **எனக்கு பழம் பிடிக்கும். ஆனால் காய்கறி பிடிக்காது.** | `enakku pazham pidikkum. aanaal kaaikari pidikkaadhu.` | I like fruit. But I don't like vegetables. | Heavily corrupted in PRD. Restored correct standard grammar and spelling. |
| `ம ன்னஞ்சல் அல்ல‘ கட¡ச்ெசால் தவƒ` | **மின்னஞ்சல் அல்லது கடவுச்சொல் தவறு.** | `minnanjal alladhu kadavuchol thavaru.` | Incorrect email or password. | Restored authentication error string. |
| `உங்கள் அமர்¡ காலாவதியான‘` | **உங்கள் அமர்வு காலாவதியானது.** | `ungal amarvu kaalaavathiyaanadhu.` | Your session has expired. | Restored session expiration message. |
| `நீங்கள் ஆஃப்‹லன ல் உள்ளீர்கள்` | **நீங்கள் ஆஃப்லைனில் உள்ளீர்கள்.** | `neengal offline-il ulleergal.` | You are offline. | Fixed corrupted "offline" Tamil transliteration. |
| `ஆŽேயா இப்ேபா‘ இயங்கா‘` | **ஆடியோ இப்போது இயங்காது.** | `audio ippodhu iyangaadhu.` | Audio is currently unavailable. | Restored audio error string. |
| `ேபச ைமக்ேராஃேபான் ேதைவ` | **பேச மைக்ரோஃபோன் தேவை.** | `pesa microphone thevai.` | Microphone access required to speak. | Restored permission prompt string. |
| `¢ன்ேனற்றம் ேசம க்க ¢Žயவ‚ல்‹ல` | **முன்னேற்றம் சேமிக்க முடியவில்லை.** | `munnetram semikka mudiyavillai.` | Unable to save progress. | Restored error banner message. |
| `உங்கள் கணக்  நிரந்தரமாக நீக்கப்ப„ம்` | **உங்கள் கணக்கு நிரந்தரமாக நீக்கப்படும்.** | `ungal kanakku nirantharamaaga neekkappadum.` | Your account will be permanently deleted. | Restored account deletion prompt. |

#### Transliteration Rule Consistency
The platform enforces a standardized primary Tanglish convention:
- **ழ (Retroflex approximant):** Primary `zha` (e.g., தமிழ் = *Tamizh*, பழம் = *pazham*), secondary `la`.
- **ள (Retroflex lateral):** Primary `la` / `La` (e.g., கிளி = *kili*, பள்ளி = *palli*).
- **ல (Alveolar lateral):** Primary `la` (e.g., பால் = *paal*).
- **ற (Alveolar trill / hard r):** Primary `ra` / `tra` (e.g., காற்று = *kaatru*, பறவை = *paravai*).
- **ர (Soft flap r):** Primary `ra` (e.g., மரம் = *maram*).
- **ண (Retroflex nasal, 3-loop):** Primary `na` / `Na` (e.g., கண் = *kan*).
- **ன (Alveolar nasal, 2-loop):** Primary `na` (e.g., மனிதன் = *manidhan*).
- **ந (Dental nasal):** Primary `na` (e.g., நன்றி = *nandri*).
- **Short vs. Long Vowels:**
  - அ = `a` vs. ஆ = `aa`
  - இ = `i` vs. ஈ = `ee`
  - உ = `u` vs. ஊ = `oo`
  - எ = `e` vs. ஏ = `ae`
  - ஒ = `o` vs. ஓ = `oa`

---

### (d) Omission of Writing & Tracing in P0 MVP Matrix
- **PRD Text:** Section 7 declares: "How to help learners gradually develop real Tamil reading, **writing**, listening, and speaking skills." However, in Section 15 (MVP Prioritisation) and Section 46, "writing" or "tracing" is completely omitted from the activity types.
- **Audit Finding:** Writing is essential for young learners (Standards 1–3) to develop motor memory and recognize the curvy contours of Tamil characters.
- **Decision:**
  - Implement **Guided Letter Tracing** in the Lesson Player as a core P0 activity type.
  - Interactive SVG canvas with letter outline, directional arrow cues, smooth touch/mouse drawing, stroke clear, and accuracy check.
  - No unsupported claims about strict ancient stroke-order enforcement; uses outline-coverage verification.

---

### (e) Speaking Practice & Audio Assessment Constraints
- **PRD Text:** Mentions speaking practice in Section 7, but Section 27 explicitly observes: *"Phoneme-level pronunciation assessment for Tamil is not commercially reliable at MVP scale. Tamil speech recognition models achieve WER of 0.55–0.71 on dialectal speech, and children's speech performs worse."*
- **Audit Finding:** Attempting automated speech-to-text scoring would produce false negatives for children, demoralizing them.
- **Decision:**
  - Build **Record-and-Compare** using the native browser `MediaRecorder` API.
  - The model audio plays first $\rightarrow$ student records (up to 10s) $\rightarrow$ playback allows student to listen to their own voice followed by the model audio $\rightarrow$ child completes a kind self-assessment prompt (*"Did it sound close?"*).
  - Recordings are stored strictly in local memory and automatically purged. No cloud uploads, ensuring zero child privacy exposure.

---

### (f) Parent Dashboard Implementation
- **PRD Text:** Section 46 categorizes Parent Dashboard as P1, and Section 86 lists it as the first item to cut under time constraints.
- **Audit Finding:** For school students (especially under 13), parental visibility is critical for adoption and trust.
- **Decision:**
  - Implement the **Parent Dashboard (`/parent`)** fully in frontend code using our typed mock service adapter.
  - Includes weekly learning minutes chart, 5-skill mastery matrix, recent lessons review, and one-click JSON export.

---

### (g) Research Assistant (P2)
- **PRD Text:** Section 46 & 97 describe a Tamil Research Assistant (P2).
- **Prompt Directive:** *"Skip P2 (Research Assistant) except an honest 'coming soon' is NOT allowed either: do not add placeholder or dead screens at all. Every visible control must work."*
- **Decision:**
  - Completely omit the P2 Research Assistant from navigation, menus, and routes.
  - Ensure 100% of links, buttons, tabs, and interactive controls on screen are fully functional and lead to working flows. Zero dead ends.
