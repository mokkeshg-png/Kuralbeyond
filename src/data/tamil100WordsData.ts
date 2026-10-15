export interface TamilWordItem {
  id: string;
  word_ta: string;
  tanglish: string;
  meaning_en: string;
  category: string;
  sublevel: '2.0' | '2.1';
  audio_id: string;
}

// Exactly 50 Words for Sublevel 2.0
export const WORDS_LEVEL_2_0: TamilWordItem[] = [
  // 1-10: Family & People
  { id: 'w-20-1', word_ta: 'அம்மா', tanglish: 'amma', meaning_en: 'Mother', category: 'Family', sublevel: '2.0', audio_id: 'w_amma' },
  { id: 'w-20-2', word_ta: 'அப்பா', tanglish: 'appa', meaning_en: 'Father', category: 'Family', sublevel: '2.0', audio_id: 'w_appa' },
  { id: 'w-20-3', word_ta: 'அண்ணா', tanglish: 'annaa', meaning_en: 'Elder Brother', category: 'Family', sublevel: '2.0', audio_id: 'w_annaa' },
  { id: 'w-20-4', word_ta: 'அக்கா', tanglish: 'akkaa', meaning_en: 'Elder Sister', category: 'Family', sublevel: '2.0', audio_id: 'w_akkaa' },
  { id: 'w-20-5', word_ta: 'தம்பி', tanglish: 'thambi', meaning_en: 'Younger Brother', category: 'Family', sublevel: '2.0', audio_id: 'w_thambi' },
  { id: 'w-20-6', word_ta: 'தங்கை', tanglish: 'thangai', meaning_en: 'Younger Sister', category: 'Family', sublevel: '2.0', audio_id: 'w_thangai' },
  { id: 'w-20-7', word_ta: 'பாட்டி', tanglish: 'paatti', meaning_en: 'Grandmother', category: 'Family', sublevel: '2.0', audio_id: 'w_paatti' },
  { id: 'w-20-8', word_ta: 'தாத்தா', tanglish: 'thaathaa', meaning_en: 'Grandfather', category: 'Family', sublevel: '2.0', audio_id: 'w_thaathaa' },
  { id: 'w-20-9', word_ta: 'குழந்தை', tanglish: 'kuzhanthai', meaning_en: 'Baby / Child', category: 'People', sublevel: '2.0', audio_id: 'w_kuzhanthai' },
  { id: 'w-20-10', word_ta: 'நண்பன்', tanglish: 'nanban', meaning_en: 'Friend', category: 'People', sublevel: '2.0', audio_id: 'w_nanban' },

  // 11-20: Nature & Universe
  { id: 'w-20-11', word_ta: 'மரம்', tanglish: 'maram', meaning_en: 'Tree', category: 'Nature', sublevel: '2.0', audio_id: 'w_maram' },
  { id: 'w-20-12', word_ta: 'பூ', tanglish: 'poo', meaning_en: 'Flower', category: 'Nature', sublevel: '2.0', audio_id: 'w_poo' },
  { id: 'w-20-13', word_ta: 'இலை', tanglish: 'ilai', meaning_en: 'Leaf', category: 'Nature', sublevel: '2.0', audio_id: 'w_ilai' },
  { id: 'w-20-14', word_ta: 'மழை', tanglish: 'mazhai', meaning_en: 'Rain', category: 'Nature', sublevel: '2.0', audio_id: 'w_mazhai' },
  { id: 'w-20-15', word_ta: 'சூரியன்', tanglish: 'sooriyan', meaning_en: 'Sun', category: 'Nature', sublevel: '2.0', audio_id: 'w_sooriyan' },
  { id: 'w-20-16', word_ta: 'நிலா', tanglish: 'nilaa', meaning_en: 'Moon', category: 'Nature', sublevel: '2.0', audio_id: 'w_nilaa' },
  { id: 'w-20-17', word_ta: 'விண்மீன்', tanglish: 'vinmeen', meaning_en: 'Star', category: 'Nature', sublevel: '2.0', audio_id: 'w_vinmeen' },
  { id: 'w-20-18', word_ta: 'வானம்', tanglish: 'vaanam', meaning_en: 'Sky', category: 'Nature', sublevel: '2.0', audio_id: 'w_vaanam' },
  { id: 'w-20-19', word_ta: 'காற்று', tanglish: 'kaatru', meaning_en: 'Wind', category: 'Nature', sublevel: '2.0', audio_id: 'w_kaatru' },
  { id: 'w-20-20', word_ta: 'நீர்', tanglish: 'neer', meaning_en: 'Water', category: 'Nature', sublevel: '2.0', audio_id: 'w_neer' },

  // 21-30: Body Parts
  { id: 'w-20-21', word_ta: 'கண்', tanglish: 'kaN', meaning_en: 'Eye', category: 'Body', sublevel: '2.0', audio_id: 'w_kan' },
  { id: 'w-20-22', word_ta: 'காது', tanglish: 'kaathu', meaning_en: 'Ear', category: 'Body', sublevel: '2.0', audio_id: 'w_kaathu' },
  { id: 'w-20-23', word_ta: 'மூக்கு', tanglish: 'mookku', meaning_en: 'Nose', category: 'Body', sublevel: '2.0', audio_id: 'w_mookku' },
  { id: 'w-20-24', word_ta: 'வாய்', tanglish: 'vaai', meaning_en: 'Mouth', category: 'Body', sublevel: '2.0', audio_id: 'w_vaai' },
  { id: 'w-20-25', word_ta: 'பல்', tanglish: 'pal', meaning_en: 'Tooth', category: 'Body', sublevel: '2.0', audio_id: 'w_pal' },
  { id: 'w-20-26', word_ta: 'கை', tanglish: 'kai', meaning_en: 'Hand', category: 'Body', sublevel: '2.0', audio_id: 'w_kai' },
  { id: 'w-20-27', word_ta: 'கால்', tanglish: 'kaal', meaning_en: 'Leg / Foot', category: 'Body', sublevel: '2.0', audio_id: 'w_kaal' },
  { id: 'w-20-28', word_ta: 'தலை', tanglish: 'thalai', meaning_en: 'Head', category: 'Body', sublevel: '2.0', audio_id: 'w_thalai' },
  { id: 'w-20-29', word_ta: 'விரல்', tanglish: 'viral', meaning_en: 'Finger', category: 'Body', sublevel: '2.0', audio_id: 'w_viral' },
  { id: 'w-20-30', word_ta: 'மனம்', tanglish: 'manam', meaning_en: 'Heart / Mind', category: 'Body', sublevel: '2.0', audio_id: 'w_manam' },

  // 31-40: Animals & Birds
  { id: 'w-20-31', word_ta: 'பசு', tanglish: 'pasu', meaning_en: 'Cow', category: 'Animals', sublevel: '2.0', audio_id: 'w_pasu' },
  { id: 'w-20-32', word_ta: 'ஆடு', tanglish: 'aadu', meaning_en: 'Goat', category: 'Animals', sublevel: '2.0', audio_id: 'w_aadu' },
  { id: 'w-20-33', word_ta: 'நாய்', tanglish: 'naai', meaning_en: 'Dog', category: 'Animals', sublevel: '2.0', audio_id: 'w_naai' },
  { id: 'w-20-34', word_ta: 'பூனை', tanglish: 'poonai', meaning_en: 'Cat', category: 'Animals', sublevel: '2.0', audio_id: 'w_poonai' },
  { id: 'w-20-35', word_ta: 'யானை', tanglish: 'yaanai', meaning_en: 'Elephant', category: 'Animals', sublevel: '2.0', audio_id: 'w_yaanai' },
  { id: 'w-20-36', word_ta: 'சிங்கம்', tanglish: 'singam', meaning_en: 'Lion', category: 'Animals', sublevel: '2.0', audio_id: 'w_singam' },
  { id: 'w-20-37', word_ta: 'புலி', tanglish: 'puli', meaning_en: 'Tiger', category: 'Animals', sublevel: '2.0', audio_id: 'w_puli' },
  { id: 'w-20-38', word_ta: 'கிளி', tanglish: 'kili', meaning_en: 'Parrot', category: 'Birds', sublevel: '2.0', audio_id: 'w_kili' },
  { id: 'w-20-39', word_ta: 'மயில்', tanglish: 'mayil', meaning_en: 'Peacock', category: 'Birds', sublevel: '2.0', audio_id: 'w_mayil' },
  { id: 'w-20-40', word_ta: 'மீன்', tanglish: 'meen', meaning_en: 'Fish', category: 'Animals', sublevel: '2.0', audio_id: 'w_meen' },

  // 41-50: Daily Food & Basic Items
  { id: 'w-20-41', word_ta: 'பால்', tanglish: 'paal', meaning_en: 'Milk', category: 'Food', sublevel: '2.0', audio_id: 'w_paal' },
  { id: 'w-20-42', word_ta: 'சோறு', tanglish: 'soaru', meaning_en: 'Cooked Rice', category: 'Food', sublevel: '2.0', audio_id: 'w_soaru' },
  { id: 'w-20-43', word_ta: 'பழம்', tanglish: 'pazham', meaning_en: 'Fruit', category: 'Food', sublevel: '2.0', audio_id: 'w_pazham' },
  { id: 'w-20-44', word_ta: 'தேன்', tanglish: 'thaen', meaning_en: 'Honey', category: 'Food', sublevel: '2.0', audio_id: 'w_thaen' },
  { id: 'w-20-45', word_ta: 'வீடு', tanglish: 'veedu', meaning_en: 'House / Home', category: 'Objects', sublevel: '2.0', audio_id: 'w_veedu' },
  { id: 'w-20-46', word_ta: 'புத்தகம்', tanglish: 'puthagam', meaning_en: 'Book', category: 'Objects', sublevel: '2.0', audio_id: 'w_puthagam' },
  { id: 'w-20-47', word_ta: 'பள்ளி', tanglish: 'paLLi', meaning_en: 'School', category: 'Places', sublevel: '2.0', audio_id: 'w_palli' },
  { id: 'w-20-48', word_ta: 'ஊர்', tanglish: 'oor', meaning_en: 'Town / Village', category: 'Places', sublevel: '2.0', audio_id: 'w_oor' },
  { id: 'w-20-49', word_ta: 'நாடு', tanglish: 'naadu', meaning_en: 'Country / Land', category: 'Places', sublevel: '2.0', audio_id: 'w_naadu' },
  { id: 'w-20-50', word_ta: 'தமிழ்', tanglish: 'Thamizh', meaning_en: 'Tamil Language', category: 'Heritage', sublevel: '2.0', audio_id: 'w_thamizh' },
];

// Exactly 50 Words for Sublevel 2.1 (Total 100 Words)
export const WORDS_LEVEL_2_1: TamilWordItem[] = [
  // 51-60: Colors & Appearance
  { id: 'w-21-1', word_ta: 'சிவப்பு', tanglish: 'sivappu', meaning_en: 'Red', category: 'Colors', sublevel: '2.1', audio_id: 'w_sivappu' },
  { id: 'w-21-2', word_ta: 'பச்சை', tanglish: 'pachai', meaning_en: 'Green', category: 'Colors', sublevel: '2.1', audio_id: 'w_pachai' },
  { id: 'w-21-3', word_ta: 'நீலம்', tanglish: 'neelam', meaning_en: 'Blue', category: 'Colors', sublevel: '2.1', audio_id: 'w_neelam' },
  { id: 'w-21-4', word_ta: 'மஞ்சள்', tanglish: 'manjal', meaning_en: 'Yellow', category: 'Colors', sublevel: '2.1', audio_id: 'w_manjal' },
  { id: 'w-21-5', word_ta: 'வெள்ளை', tanglish: 'veLLai', meaning_en: 'White', category: 'Colors', sublevel: '2.1', audio_id: 'w_vellai' },
  { id: 'w-21-6', word_ta: 'கருப்பு', tanglish: 'karuppu', meaning_en: 'Black', category: 'Colors', sublevel: '2.1', audio_id: 'w_karuppu' },
  { id: 'w-21-7', word_ta: 'அழகு', tanglish: 'azhagu', meaning_en: 'Beauty', category: 'Qualities', sublevel: '2.1', audio_id: 'w_azhagu' },
  { id: 'w-21-8', word_ta: 'பெரிய', tanglish: 'periya', meaning_en: 'Big / Large', category: 'Qualities', sublevel: '2.1', audio_id: 'w_periya' },
  { id: 'w-21-9', word_ta: 'சிறிய', tanglish: 'siriya', meaning_en: 'Small / Tiny', category: 'Qualities', sublevel: '2.1', audio_id: 'w_siriya' },
  { id: 'w-21-10', word_ta: 'இனிப்பு', tanglish: 'inippu', meaning_en: 'Sweet', category: 'Taste', sublevel: '2.1', audio_id: 'w_inippu' },

  // 61-70: Common Action Verbs
  { id: 'w-21-11', word_ta: 'வா', tanglish: 'vaa', meaning_en: 'Come', category: 'Actions', sublevel: '2.1', audio_id: 'w_vaa' },
  { id: 'w-21-12', word_ta: 'போ', tanglish: 'po', meaning_en: 'Go', category: 'Actions', sublevel: '2.1', audio_id: 'w_po' },
  { id: 'w-21-13', word_ta: 'படி', tanglish: 'padi', meaning_en: 'Read / Study', category: 'Actions', sublevel: '2.1', audio_id: 'w_padi' },
  { id: 'w-21-14', word_ta: 'எழுது', tanglish: 'ezhuthu', meaning_en: 'Write', category: 'Actions', sublevel: '2.1', audio_id: 'w_ezhuthu' },
  { id: 'w-21-15', word_ta: 'பேசு', tanglish: 'paesu', meaning_en: 'Speak / Talk', category: 'Actions', sublevel: '2.1', audio_id: 'w_paesu' },
  { id: 'w-21-16', word_ta: 'கேள்', tanglish: 'kael', meaning_en: 'Listen / Ask', category: 'Actions', sublevel: '2.1', audio_id: 'w_kael' },
  { id: 'w-21-17', word_ta: 'பார்', tanglish: 'paar', meaning_en: 'Look / See', category: 'Actions', sublevel: '2.1', audio_id: 'w_paar' },
  { id: 'w-21-18', word_ta: 'சாப்பிடு', tanglish: 'saappidu', meaning_en: 'Eat', category: 'Actions', sublevel: '2.1', audio_id: 'w_saappidu' },
  { id: 'w-21-19', word_ta: 'குடி', tanglish: 'kudi', meaning_en: 'Drink', category: 'Actions', sublevel: '2.1', audio_id: 'w_kudi' },
  { id: 'w-21-20', word_ta: 'தூங்கு', tanglish: 'thoongu', meaning_en: 'Sleep', category: 'Actions', sublevel: '2.1', audio_id: 'w_thoongu' },

  // 71-80: Core Numbers (1 to 10)
  { id: 'w-21-21', word_ta: 'ஒன்று', tanglish: 'ondru', meaning_en: 'One (1)', category: 'Numbers', sublevel: '2.1', audio_id: 'w_ondru' },
  { id: 'w-21-22', word_ta: 'இரண்டு', tanglish: 'irandu', meaning_en: 'Two (2)', category: 'Numbers', sublevel: '2.1', audio_id: 'w_irandu' },
  { id: 'w-21-23', word_ta: 'மூன்று', tanglish: 'moondru', meaning_en: 'Three (3)', category: 'Numbers', sublevel: '2.1', audio_id: 'w_moondru' },
  { id: 'w-21-24', word_ta: 'நான்கு', tanglish: 'naangu', meaning_en: 'Four (4)', category: 'Numbers', sublevel: '2.1', audio_id: 'w_naangu' },
  { id: 'w-21-25', word_ta: 'ஐந்து', tanglish: 'ainthu', meaning_en: 'Five (5)', category: 'Numbers', sublevel: '2.1', audio_id: 'w_ainthu' },
  { id: 'w-21-26', word_ta: 'ஆறு', tanglish: 'aaru', meaning_en: 'Six (6) / River', category: 'Numbers', sublevel: '2.1', audio_id: 'w_aaru' },
  { id: 'w-21-27', word_ta: 'ஏழு', tanglish: 'aezhu', meaning_en: 'Seven (7)', category: 'Numbers', sublevel: '2.1', audio_id: 'w_aezhu' },
  { id: 'w-21-28', word_ta: 'எட்டு', tanglish: 'ettu', meaning_en: 'Eight (8)', category: 'Numbers', sublevel: '2.1', audio_id: 'w_ettu' },
  { id: 'w-21-29', word_ta: 'ஒன்பது', tanglish: 'onpathu', meaning_en: 'Nine (9)', category: 'Numbers', sublevel: '2.1', audio_id: 'w_onpathu' },
  { id: 'w-21-30', word_ta: 'பத்து', tanglish: 'pathu', meaning_en: 'Ten (10)', category: 'Numbers', sublevel: '2.1', audio_id: 'w_pathu' },

  // 81-90: Time, Greeting & Social
  { id: 'w-21-31', word_ta: 'காலை', tanglish: 'kaalai', meaning_en: 'Morning', category: 'Time', sublevel: '2.1', audio_id: 'w_kaalai' },
  { id: 'w-21-32', word_ta: 'இரவு', tanglish: 'iravu', meaning_en: 'Night', category: 'Time', sublevel: '2.1', audio_id: 'w_iravu' },
  { id: 'w-21-33', word_ta: 'இன்று', tanglish: 'indru', meaning_en: 'Today', category: 'Time', sublevel: '2.1', audio_id: 'w_indru' },
  { id: 'w-21-34', word_ta: 'நாளை', tanglish: 'naalai', meaning_en: 'Tomorrow', category: 'Time', sublevel: '2.1', audio_id: 'w_naalai' },
  { id: 'w-21-35', word_ta: 'நேரம்', tanglish: 'naeram', meaning_en: 'Time', category: 'Time', sublevel: '2.1', audio_id: 'w_naeram' },
  { id: 'w-21-36', word_ta: 'வணக்கம்', tanglish: 'vanakkam', meaning_en: 'Greetings / Hello', category: 'Social', sublevel: '2.1', audio_id: 'w_vanakkam' },
  { id: 'w-21-37', word_ta: 'நன்றி', tanglish: 'nandri', meaning_en: 'Thank you', category: 'Social', sublevel: '2.1', audio_id: 'w_nandri' },
  { id: 'w-21-38', word_ta: 'வாழ்க', tanglish: 'vaazhga', meaning_en: 'Long live / Prosper', category: 'Social', sublevel: '2.1', audio_id: 'w_vaazhga' },
  { id: 'w-21-39', word_ta: 'அன்பு', tanglish: 'anbu', meaning_en: 'Love / Kindness', category: 'Feelings', sublevel: '2.1', audio_id: 'w_anbu' },
  { id: 'w-21-40', word_ta: 'மகிழ்ச்சி', tanglish: 'magizhchi', meaning_en: 'Joy / Happiness', category: 'Feelings', sublevel: '2.1', audio_id: 'w_magizhchi' },

  // 91-100: Daily Objects & Values
  { id: 'w-21-41', word_ta: 'வண்டி', tanglish: 'vandi', meaning_en: 'Cart / Vehicle', category: 'Objects', sublevel: '2.1', audio_id: 'w_vandi' },
  { id: 'w-21-42', word_ta: 'பந்து', tanglish: 'panthu', meaning_en: 'Ball', category: 'Objects', sublevel: '2.1', audio_id: 'w_panthu' },
  { id: 'w-21-43', word_ta: 'பட்டம்', tanglish: 'pattam', meaning_en: 'Kite', category: 'Objects', sublevel: '2.1', audio_id: 'w_pattam' },
  { id: 'w-21-44', word_ta: 'கப்பல்', tanglish: 'kappal', meaning_en: 'Ship', category: 'Objects', sublevel: '2.1', audio_id: 'w_kappal' },
  { id: 'w-21-45', word_ta: 'குடை', tanglish: 'kudai', meaning_en: 'Umbrella', category: 'Objects', sublevel: '2.1', audio_id: 'w_kudai' },
  { id: 'w-21-46', word_ta: 'ஆடை', tanglish: 'aadai', meaning_en: 'Dress / Garment', category: 'Objects', sublevel: '2.1', audio_id: 'w_aadai' },
  { id: 'w-21-47', word_ta: 'பாடல்', tanglish: 'paadal', meaning_en: 'Song', category: 'Arts', sublevel: '2.1', audio_id: 'w_paadal' },
  { id: 'w-21-48', word_ta: 'கல்வி', tanglish: 'kalvi', meaning_en: 'Education', category: 'Values', sublevel: '2.1', audio_id: 'w_kalvi' },
  { id: 'w-21-49', word_ta: 'அறிவு', tanglish: 'arivu', meaning_en: 'Wisdom / Knowledge', category: 'Values', sublevel: '2.1', audio_id: 'w_arivu' },
  { id: 'w-21-50', word_ta: 'உண்மை', tanglish: 'unmai', meaning_en: 'Truth', category: 'Values', sublevel: '2.1', audio_id: 'w_unmai' },
];

export const ALL_100_TAMIL_WORDS = [...WORDS_LEVEL_2_0, ...WORDS_LEVEL_2_1];
