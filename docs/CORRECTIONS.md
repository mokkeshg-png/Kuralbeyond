# TamilPalam (தமிழ் பாலம்) — Content & PRD Corrections Log

This document records all corrections made to the PRD's Tamil content, transliterations, and architectural specifications during implementation.

---

## 1. Letter Inventory & Aytham Correction

| Original PRD Specification | Correction Made | Reason |
| :--- | :--- | :--- |
| Section 21 Letter Sequence lists Phase 1 (`அ, ஆ, இ, ஈ, உ, ஊ`) and Phase 2 (`எ, ஏ, ஐ, ஒ, ஓ, ஔ`), then jumps directly to consonants. **ஃ (Aytham)** was omitted. | Added **ஃ (Aytham)** into Level 1 right after ஔ. Primary Tanglish: `ak`/`akh`. Example word: **எஃகு** (*ehgu* - steel). Phonics audio key: `letter_aytham`. | Standard Tamil primary alphabet consists of 12 Uyir + 1 Aytham + 18 Mei = 31 letters. Omitting Aytham prevents complete alphabet mastery. |

---

## 2. Vocabulary & Transliteration Corrections

| Item ID | Corrupted / Erroneous PRD String | Corrected Tamil | Corrected Tanglish | English Meaning | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `vocab_cat` | `Š‹ன (poona)` | **பூனை** | `poonai` | Cat | The PRD extracted string had corrupted glyphs and used incorrect Tanglish "poona". Replaced with standard "poonai". |
| `vocab_thanks` | `நன்ற‚ (nandri)` | **நன்றி** | `nandri` | Thank you | Corrupted றி ending restored. |
| `vocab_one` | `ஒன்ƒ (ondru)` | **ஒன்று** | `ondru` | One (1) | Corrupted று ending restored. |
| `vocab_two` | `இரண்„ (irandu)` | **இரண்டு** | `irandu` | Two (2) | Corrupted டு ending restored. |
| `vocab_red` | `ச…வப்† (sivappu)` | **சிவப்பு** | `sivappu` | Red | Fixed broken ி and ு diacritics. |
| `vocab_green` | `பச்ைச (pachai)` | **பச்சை** | `pachai` | Green | Rejoined decomposed vowel sign ை with ச. |
| `vocab_rice` | `ேசாƒ (soru)` | **சோறு** | `soru` | Cooked rice | Fixed split vowel sign ோ and corrupted று. |

---

## 3. Sentence Construction Corrections

| Section | Corrupted PRD Text | Corrected Tamil Sentence | Corrected Tanglish | English Translation |
| :--- | :--- | :--- | :--- | :--- |
| Sec 25 L3 | `நல்ல ைபயன் (nalla paiyan)` | **நல்ல பையன்** | `nalla paiyan` | Good boy |
| Sec 25 L4 | `என் ெபயர் ஆரவ் (en peyar Aarav)` | **என் பெயர் ஆரவ்** | `en peyar Aarav` | My name is Aarav |
| Sec 25 L4 | `உனக்  எப்பŽ இ க் ? (unakku eppadi irukku?)` | **உனக்கு எப்படி இருக்கிறது?** (Formal) / **உனக்கு எப்படி இருக்கு?** (Spoken) | `unakku eppadi irukku?` | How are you? |
| Sec 25 L5 | `எனக்  பழம் ப‚Žக் ம். ஆ ல் காய்கற‚ ப‚Žக்கா‘.` | **எனக்கு பழம் பிடிக்கும். ஆனால் காய்கறி பிடிக்காது.** | `enakku pazham pidikkum. aanaal kaaikari pidikkaadhu.` | I like fruit. But I don't like vegetables. |

---

## 4. UI & Error String Corrections

| Section | Corrupted PRD Text | Corrected Tamil UI String | English Meaning |
| :--- | :--- | :--- | :--- |
| Sec 71 | `ம ன்னஞ்சல் அல்ல‘ கட¡ச்ெசால் தவƒ` | **மின்னஞ்சல் அல்லது கடவுச்சொல் தவறு.** | Email or password incorrect. |
| Sec 71 | `உங்கள் அமர்¡ காலாவதியான‘` | **உங்கள் அமர்வு காலாவதியானது.** | Your session has expired. |
| Sec 71 | `நீங்கள் ஆஃப்‹லன ல் உள்ளீர்கள்` | **நீங்கள் ஆஃப்லைனில் உள்ளீர்கள்.** | You are offline. |
| Sec 71 | `ஆŽேயா இப்ேபா‘ இயங்கா‘` | **ஆடியோ இப்போது இயங்காது.** | Audio is currently unavailable. |
| Sec 71 | `ேபச ைமக்ேராஃேபான் ேதைவ` | **பேச மைக்ரோஃபோன் தேவை.** | Microphone required to speak. |
| Sec 71 | `தம ழ் உதவ‚யாளர் ப‚ஸ‚யாக உள்ளார்` | **தமிழ் உதவியாளர் பிஸியாக உள்ளார்.** | Tamil assistant is busy. |
| Sec 71 | `ஏேதா தவƒ நடந்த‘` | **ஏதோ தவறு நடந்தது.** | Something went wrong. |
| Sec 71 | `¢ன்ேனற்றம் ேசம க்க ¢Žயவ‚ல்‹ல` | **முன்னேற்றம் சேமிக்க முடியவில்லை.** | Unable to save progress. |
| Sec 71 | `ெதாடரவா?` | **தொடரவா?** | Do you want to continue? |
| Sec 71 | `இந்த பாடத்தில் ச க்கல்` | **இந்த பாடத்தில் சிக்கல்.** | Issue loading this lesson. |
| Sec 71 | `உங்க¨க்  அ©கல் இல்‹ல` | **உங்களுக்கு அணுகல் இல்லை.** | You do not have access. |
| Sec 71 | `உங்கள் கணக்  நிரந்தரமாக நீக்கப்ப„ம்` | **உங்கள் கணக்கு நிரந்தரமாக நீக்கப்படும்.** | Your account will be permanently deleted. |
