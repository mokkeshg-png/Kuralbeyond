# TamilPalam (தமிழ் பாலம்) — Audio Recording Manifest & Studio TODO

This document tracks all audio assets required for the complete TamilPalam curriculum.

## Audio Architecture & Player Logic
1. **Primary Playback:** The `AudioPlayer` attempts to load the prerecorded native audio file from `/audio/{id}.mp3`.
2. **Graceful Fallback:** If the file is not yet recorded or fails network load, the system automatically falls back to browser **SpeechSynthesis (Web Speech API)** using a Tamil voice (`ta-IN` or `ta_IN`), while displaying a visible, honest badge indicating *"Speech synthesis fallback"*.
3. **Speed Controls:** Supports 0.5x, 0.75x, and 1.0x playback rates.
4. **Child Privacy:** No learner speaking recordings are ever uploaded to a server or external API.

---

## 1. Letters & Phonics Audio TODO

| ID | Tamil Glyph | Tanglish | Target Studio File | Phonics Note | Status in Build |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `letter_a` | அ | a | `/audio/letters/a.mp3` | Short open back unrounded vowel /a/ | Manifest registered; TTS fallback active |
| `letter_aa` | ஆ | aa | `/audio/letters/aa.mp3` | Long open back unrounded vowel /aː/ | Manifest registered; TTS fallback active |
| `letter_i` | இ | i | `/audio/letters/i.mp3` | Short close front unrounded vowel /i/ | Manifest registered; TTS fallback active |
| `letter_ee` | ஈ | ee | `/audio/letters/ee.mp3` | Long close front unrounded vowel /iː/ | Manifest registered; TTS fallback active |
| `letter_u` | உ | u | `/audio/letters/u.mp3` | Short close back rounded vowel /u/ | Manifest registered; TTS fallback active |
| `letter_oo` | ஊ | oo | `/audio/letters/oo.mp3` | Long close back rounded vowel /uː/ | Manifest registered; TTS fallback active |
| `letter_e` | எ | e | `/audio/letters/e.mp3` | Short close-mid front unrounded vowel /e/ | Manifest registered; TTS fallback active |
| `letter_ae` | ஏ | ae | `/audio/letters/ae.mp3` | Long close-mid front unrounded vowel /eː/ | Manifest registered; TTS fallback active |
| `letter_ai` | ஐ | ai | `/audio/letters/ai.mp3` | Diphthong front-to-close /aɪ/ | Manifest registered; TTS fallback active |
| `letter_o` | ஒ | o | `/audio/letters/o.mp3` | Short close-mid back rounded vowel /o/ | Manifest registered; TTS fallback active |
| `letter_oa` | ஓ | oa | `/audio/letters/oa.mp3` | Long close-mid back rounded vowel /oː/ | Manifest registered; TTS fallback active |
| `letter_au` | ஔ | au | `/audio/letters/au.mp3` | Diphthong back-to-close /aʊ/ | Manifest registered; TTS fallback active |
| `letter_aytham`| ஃ | ak | `/audio/letters/aytham.mp3` | Voiceless glottal fricative /x/ or /h/ | Manifest registered; TTS fallback active |
| `letter_k` | க் | k | `/audio/letters/k.mp3` | Velar plosive /k/ | Manifest registered; TTS fallback active |
| `letter_ng`| ங் | ng | `/audio/letters/ng.mp3` | Velar nasal /ŋ/ | Manifest registered; TTS fallback active |
| `letter_ch`| ச் | ch | `/audio/letters/ch.mp3` | Palatal plosive /t͡ʃ/ | Manifest registered; TTS fallback active |
| `letter_ny`| ஞ் | ny | `/audio/letters/ny.mp3` | Palatal nasal /ɲ/ | Manifest registered; TTS fallback active |
| `letter_t` | ட் | t | `/audio/letters/t.mp3` | Retroflex plosive /ʈ/ | Manifest registered; TTS fallback active |
| `letter_nn`| ண் | nn | `/audio/letters/nn.mp3` | Retroflex nasal /ɳ/ | Manifest registered; TTS fallback active |

---

## 2. Level 2 Vocabulary Audio TODO

| ID | Tamil Word | Tanglish | English Meaning | Target Studio File | Status in Build |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `vocab_amma` | அம்மா | amma | Mother | `/audio/vocab/amma.mp3` | Manifest registered; TTS fallback active |
| `vocab_appa` | அப்பா | appa | Father | `/audio/vocab/appa.mp3` | Manifest registered; TTS fallback active |
| `vocab_akka` | அக்கா | akka | Elder sister | `/audio/vocab/akka.mp3` | Manifest registered; TTS fallback active |
| `vocab_anna` | அண்ணன் | annan | Elder brother | `/audio/vocab/anna.mp3` | Manifest registered; TTS fallback active |
| `vocab_vanakkam`| வணக்கம் | vanakkam | Greetings / Hello | `/audio/vocab/vanakkam.mp3` | Manifest registered; TTS fallback active |
| `vocab_nandri` | நன்றி | nandri | Thank you | `/audio/vocab/nandri.mp3` | Manifest registered; TTS fallback active |
| `vocab_ondru` | ஒன்று | ondru | One (1) | `/audio/vocab/ondru.mp3` | Manifest registered; TTS fallback active |
| `vocab_irandu` | இரண்டு | irandu | Two (2) | `/audio/vocab/irandu.mp3` | Manifest registered; TTS fallback active |
| `vocab_moondru`| மூன்று | moondru | Three (3) | `/audio/vocab/moondru.mp3` | Manifest registered; TTS fallback active |
| `vocab_sivappu`| சிவப்பு | sivappu | Red | `/audio/vocab/sivappu.mp3` | Manifest registered; TTS fallback active |
| `vocab_pachai` | பச்சை | pachai | Green | `/audio/vocab/pachai.mp3` | Manifest registered; TTS fallback active |
| `vocab_neelam` | நீலம் | neelam | Blue | `/audio/vocab/neelam.mp3` | Manifest registered; TTS fallback active |
| `vocab_manjal` | மஞ்சள் | manjal | Yellow | `/audio/vocab/manjal.mp3` | Manifest registered; TTS fallback active |
| `vocab_naai` | நாய் | naai | Dog | `/audio/vocab/naai.mp3` | Manifest registered; TTS fallback active |
| `vocab_poonai` | பூனை | poonai | Cat | `/audio/vocab/poonai.mp3` | Manifest registered; TTS fallback active |
| `vocab_kili` | கிளி | kili | Parrot | `/audio/vocab/kili.mp3` | Manifest registered; TTS fallback active |
| `vocab_soru` | சோறு | soru | Rice | `/audio/vocab/soru.mp3` | Manifest registered; TTS fallback active |
| `vocab_thanneer`| தண்ணீர் | thanneer | Water | `/audio/vocab/thanneer.mp3` | Manifest registered; TTS fallback active |
| `vocab_pazham` | பழம் | pazham | Fruit | `/audio/vocab/pazham.mp3` | Manifest registered; TTS fallback active |

---

## 3. Sentences & Stories Audio TODO

| ID | Tamil Text | Target File | Status in Build |
| :--- | :--- | :--- | :--- |
| `sent_nalla_paiyan` | நல்ல பையன் | `/audio/sentences/nalla_paiyan.mp3` | Manifest registered; TTS fallback active |
| `sent_en_peyar` | என் பெயர் ஆரவ் | `/audio/sentences/en_peyar.mp3` | Manifest registered; TTS fallback active |
| `sent_eppadi_irukku`| உனக்கு எப்படி இருக்கிறது? | `/audio/sentences/eppadi_irukku.mp3` | Manifest registered; TTS fallback active |
| `sent_fruit_like` | எனக்கு பழம் பிடிக்கும் | `/audio/sentences/fruit_like.mp3` | Manifest registered; TTS fallback active |
| `story_clever_crow` | காகமும் தண்ணீரும் | `/audio/stories/clever_crow.mp3` | Manifest registered; TTS fallback active |
| `story_pongal_feast`| பொங்கல் திருவிழா | `/audio/stories/pongal_feast.mp3` | Manifest registered; TTS fallback active |
