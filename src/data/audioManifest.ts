export interface AudioEntry {
  id: string;
  tamilText: string;
  tanglish: string;
  ipa?: string;
  filePath: string;
  category: 'letter' | 'word' | 'sentence' | 'story' | 'instruction';
}

export const AUDIO_MANIFEST: Record<string, AudioEntry> = {
  // Uyir Vowels
  'letter_a': { id: 'letter_a', tamilText: 'அ', tanglish: 'a', ipa: '/a/', filePath: '/audio/letters/a.mp3', category: 'letter' },
  'letter_aa': { id: 'letter_aa', tamilText: 'ஆ', tanglish: 'aa', ipa: '/aː/', filePath: '/audio/letters/aa.mp3', category: 'letter' },
  'letter_i': { id: 'letter_i', tamilText: 'இ', tanglish: 'i', ipa: '/i/', filePath: '/audio/letters/i.mp3', category: 'letter' },
  'letter_ee': { id: 'letter_ee', tamilText: 'ஈ', tanglish: 'ee', ipa: '/iː/', filePath: '/audio/letters/ee.mp3', category: 'letter' },
  'letter_u': { id: 'letter_u', tamilText: 'உ', tanglish: 'u', ipa: '/u/', filePath: '/audio/letters/u.mp3', category: 'letter' },
  'letter_oo': { id: 'letter_oo', tamilText: 'ஊ', tanglish: 'oo', ipa: '/uː/', filePath: '/audio/letters/oo.mp3', category: 'letter' },
  'letter_e': { id: 'letter_e', tamilText: 'எ', tanglish: 'e', ipa: '/e/', filePath: '/audio/letters/e.mp3', category: 'letter' },
  'letter_ae': { id: 'letter_ae', tamilText: 'ஏ', tanglish: 'ae', ipa: '/eː/', filePath: '/audio/letters/ae.mp3', category: 'letter' },
  'letter_ai': { id: 'letter_ai', tamilText: 'ஐ', tanglish: 'ai', ipa: '/aɪ/', filePath: '/audio/letters/ai.mp3', category: 'letter' },
  'letter_o': { id: 'letter_o', tamilText: 'ஒ', tanglish: 'o', ipa: '/o/', filePath: '/audio/letters/o.mp3', category: 'letter' },
  'letter_oa': { id: 'letter_oa', tamilText: 'ஓ', tanglish: 'oa', ipa: '/oː/', filePath: '/audio/letters/oa.mp3', category: 'letter' },
  'letter_au': { id: 'letter_au', tamilText: 'ஔ', tanglish: 'au', ipa: '/aʊ/', filePath: '/audio/letters/au.mp3', category: 'letter' },

  // Aytham
  'letter_aytham': { id: 'letter_aytham', tamilText: 'ஃ', tanglish: 'ak', ipa: '/x/', filePath: '/audio/letters/aytham.mp3', category: 'letter' },

  // Mei Consonants
  'letter_k': { id: 'letter_k', tamilText: 'க்', tanglish: 'k', ipa: '/k/', filePath: '/audio/letters/k.mp3', category: 'letter' },
  'letter_ng': { id: 'letter_ng', tamilText: 'ங்', tanglish: 'ng', ipa: '/ŋ/', filePath: '/audio/letters/ng.mp3', category: 'letter' },
  'letter_ch': { id: 'letter_ch', tamilText: 'ச்', tanglish: 'ch', ipa: '/t͡ʃ/', filePath: '/audio/letters/ch.mp3', category: 'letter' },
  'letter_ny': { id: 'letter_ny', tamilText: 'ஞ்', tanglish: 'ny', ipa: '/ɲ/', filePath: '/audio/letters/ny.mp3', category: 'letter' },
  'letter_t': { id: 'letter_t', tamilText: 'ட்', tanglish: 't', ipa: '/ʈ/', filePath: '/audio/letters/t.mp3', category: 'letter' },
  'letter_nn': { id: 'letter_nn', tamilText: 'ண்', tanglish: 'nn', ipa: '/ɳ/', filePath: '/audio/letters/nn.mp3', category: 'letter' },
  'letter_th': { id: 'letter_th', tamilText: 'த்', tanglish: 'th', ipa: '/t̪/', filePath: '/audio/letters/th.mp3', category: 'letter' },
  'letter_n': { id: 'letter_n', tamilText: 'ந்', tanglish: 'n', ipa: '/n̪/', filePath: '/audio/letters/n.mp3', category: 'letter' },
  'letter_p': { id: 'letter_p', tamilText: 'ப்', tanglish: 'p', ipa: '/p/', filePath: '/audio/letters/p.mp3', category: 'letter' },
  'letter_m': { id: 'letter_m', tamilText: 'ம்', tanglish: 'm', ipa: '/m/', filePath: '/audio/letters/m.mp3', category: 'letter' },
  'letter_y': { id: 'letter_y', tamilText: 'ய்', tanglish: 'y', ipa: '/j/', filePath: '/audio/letters/y.mp3', category: 'letter' },
  'letter_r': { id: 'letter_r', tamilText: 'ர்', tanglish: 'r', ipa: '/r/', filePath: '/audio/letters/r.mp3', category: 'letter' },
  'letter_l': { id: 'letter_l', tamilText: 'ல்', tanglish: 'l', ipa: '/l/', filePath: '/audio/letters/l.mp3', category: 'letter' },
  'letter_v': { id: 'letter_v', tamilText: 'வ்', tanglish: 'v', ipa: '/ʋ/', filePath: '/audio/letters/v.mp3', category: 'letter' },
  'letter_zh': { id: 'letter_zh', tamilText: 'ழ்', tanglish: 'zh', ipa: '/ɻ/', filePath: '/audio/letters/zh.mp3', category: 'letter' },
  'letter_ll': { id: 'letter_ll', tamilText: 'ள்', tanglish: 'll', ipa: '/ɭ/', filePath: '/audio/letters/ll.mp3', category: 'letter' },
  'letter_rr': { id: 'letter_rr', tamilText: 'ற்', tanglish: 'rr', ipa: '/r/', filePath: '/audio/letters/rr.mp3', category: 'letter' },
  'letter_na': { id: 'letter_na', tamilText: 'ன்', tanglish: 'n', ipa: '/n/', filePath: '/audio/letters/na.mp3', category: 'letter' },

  // Level 2 Vocabulary: Family
  'vocab_amma': { id: 'vocab_amma', tamilText: 'அம்மா', tanglish: 'amma', filePath: '/audio/vocab/amma.mp3', category: 'word' },
  'vocab_appa': { id: 'vocab_appa', tamilText: 'அப்பா', tanglish: 'appa', filePath: '/audio/vocab/appa.mp3', category: 'word' },
  'vocab_akka': { id: 'vocab_akka', tamilText: 'அக்கா', tanglish: 'akka', filePath: '/audio/vocab/akka.mp3', category: 'word' },
  'vocab_anna': { id: 'vocab_anna', tamilText: 'அண்ணன்', tanglish: 'annan', filePath: '/audio/vocab/anna.mp3', category: 'word' },
  'vocab_thambi': { id: 'vocab_thambi', tamilText: 'தம்பி', tanglish: 'thambi', filePath: '/audio/vocab/thambi.mp3', category: 'word' },
  'vocab_thangai': { id: 'vocab_thangai', tamilText: 'தங்கை', tanglish: 'thangai', filePath: '/audio/vocab/thangai.mp3', category: 'word' },

  // Greetings & Courtesies
  'vocab_vanakkam': { id: 'vocab_vanakkam', tamilText: 'வணக்கம்', tanglish: 'vanakkam', filePath: '/audio/vocab/vanakkam.mp3', category: 'word' },
  'vocab_nandri': { id: 'vocab_nandri', tamilText: 'நன்றி', tanglish: 'nandri', filePath: '/audio/vocab/nandri.mp3', category: 'word' },
  'vocab_nalvaravu': { id: 'vocab_nalvaravu', tamilText: 'நல்வரவு', tanglish: 'nalvaravu', filePath: '/audio/vocab/nalvaravu.mp3', category: 'word' },

  // Numbers 1 to 5
  'vocab_ondru': { id: 'vocab_ondru', tamilText: 'ஒன்று', tanglish: 'ondru', filePath: '/audio/vocab/ondru.mp3', category: 'word' },
  'vocab_irandu': { id: 'vocab_irandu', tamilText: 'இரண்டு', tanglish: 'irandu', filePath: '/audio/vocab/irandu.mp3', category: 'word' },
  'vocab_moondru': { id: 'vocab_moondru', tamilText: 'மூன்று', tanglish: 'moondru', filePath: '/audio/vocab/moondru.mp3', category: 'word' },
  'vocab_naangu': { id: 'vocab_naangu', tamilText: 'நான்கு', tanglish: 'naangu', filePath: '/audio/vocab/naangu.mp3', category: 'word' },
  'vocab_ainthu': { id: 'vocab_ainthu', tamilText: 'ஐந்து', tanglish: 'ainthu', filePath: '/audio/vocab/ainthu.mp3', category: 'word' },

  // Colors
  'vocab_sivappu': { id: 'vocab_sivappu', tamilText: 'சிவப்பு', tanglish: 'sivappu', filePath: '/audio/vocab/sivappu.mp3', category: 'word' },
  'vocab_pachai': { id: 'vocab_pachai', tamilText: 'பச்சை', tanglish: 'pachai', filePath: '/audio/vocab/pachai.mp3', category: 'word' },
  'vocab_neelam': { id: 'vocab_neelam', tamilText: 'நீலம்', tanglish: 'neelam', filePath: '/audio/vocab/neelam.mp3', category: 'word' },
  'vocab_manjal': { id: 'vocab_manjal', tamilText: 'மஞ்சள்', tanglish: 'manjal', filePath: '/audio/vocab/manjal.mp3', category: 'word' },
  'vocab_vellai': { id: 'vocab_vellai', tamilText: 'வெள்ளை', tanglish: 'vellai', filePath: '/audio/vocab/vellai.mp3', category: 'word' },

  // Animals
  'vocab_naai': { id: 'vocab_naai', tamilText: 'நாய்', tanglish: 'naai', filePath: '/audio/vocab/naai.mp3', category: 'word' },
  'vocab_poonai': { id: 'vocab_poonai', tamilText: 'பூனை', tanglish: 'poonai', filePath: '/audio/vocab/poonai.mp3', category: 'word' },
  'vocab_kili': { id: 'vocab_kili', tamilText: 'கிளி', tanglish: 'kili', filePath: '/audio/vocab/kili.mp3', category: 'word' },
  'vocab_yaanai': { id: 'vocab_yaanai', tamilText: 'யானை', tanglish: 'yaanai', filePath: '/audio/vocab/yaanai.mp3', category: 'word' },

  // Food & Objects
  'vocab_soru': { id: 'vocab_soru', tamilText: 'சோறு', tanglish: 'soru', filePath: '/audio/vocab/soru.mp3', category: 'word' },
  'vocab_thanneer': { id: 'vocab_thanneer', tamilText: 'தண்ணீர்', tanglish: 'thanneer', filePath: '/audio/vocab/thanneer.mp3', category: 'word' },
  'vocab_pazham': { id: 'vocab_pazham', tamilText: 'பழம்', tanglish: 'pazham', filePath: '/audio/vocab/pazham.mp3', category: 'word' },
  'vocab_paal': { id: 'vocab_paal', tamilText: 'பால்', tanglish: 'paal', filePath: '/audio/vocab/paal.mp3', category: 'word' },

  // Actions
  'vocab_vaa': { id: 'vocab_vaa', tamilText: 'வா', tanglish: 'vaa', filePath: '/audio/vocab/vaa.mp3', category: 'word' },
  'vocab_po': { id: 'vocab_po', tamilText: 'போ', tanglish: 'po', filePath: '/audio/vocab/po.mp3', category: 'word' },

  // Sentences
  'sent_nalla_paiyan': { id: 'sent_nalla_paiyan', tamilText: 'நல்ல பையன்', tanglish: 'nalla paiyan', filePath: '/audio/sentences/nalla_paiyan.mp3', category: 'sentence' },
  'sent_en_peyar': { id: 'sent_en_peyar', tamilText: 'என் பெயர் ஆரவ்', tanglish: 'en peyar Aarav', filePath: '/audio/sentences/en_peyar.mp3', category: 'sentence' },
  'sent_eppadi_irukku': { id: 'sent_eppadi_irukku', tamilText: 'உனக்கு எப்படி இருக்கிறது?', tanglish: 'unakku eppadi irukku?', filePath: '/audio/sentences/eppadi_irukku.mp3', category: 'sentence' },
  'sent_fruit_like': { id: 'sent_fruit_like', tamilText: 'எனக்கு பழம் பிடிக்கும்', tanglish: 'enakku pazham pidikkum', filePath: '/audio/sentences/fruit_like.mp3', category: 'sentence' },
  'sent_water_drink': { id: 'sent_water_drink', tamilText: 'தண்ணீர் குடி', tanglish: 'thanneer kudi', filePath: '/audio/sentences/water_drink.mp3', category: 'sentence' },

  // Stories
  'story_clever_crow': { id: 'story_clever_crow', tamilText: 'காகமும் தண்ணீரும்', tanglish: 'kaagamum thanneerum', filePath: '/audio/stories/clever_crow.mp3', category: 'story' },
  'story_pongal_feast': { id: 'story_pongal_feast', tamilText: 'பொங்கல் திருவிழா', tanglish: 'pongal thiruvizha', filePath: '/audio/stories/pongal_feast.mp3', category: 'story' },
};
