export interface TamilLineItem {
  id: string;
  line_ta: string;
  tanglish: string;
  meaning_en: string;
  word_count: number;
  source: string;
}

export interface TamilParagraphItem {
  id: string;
  title_ta: string;
  title_en: string;
  paragraph_ta: string;
  sentences: string[];
  tanglish: string;
  summary_en: string;
  summary_ta: string;
}

// Level 3: Complete Tamil Lines (5 to 6 words or more)
export const TAMIL_LINES_LEVEL_3: TamilLineItem[] = [
  {
    id: 'line-1',
    line_ta: 'யாதும் ஊரே யாவரும் கேளிர் தீதும் நன்றும் பிறர்தர வாரா',
    tanglish: 'yaathum oorae yaavarum kaelir theethum nandrum pirarthara vaaraa',
    meaning_en: 'To us all towns are one, all people our kin; good and evil do not come from others.',
    word_count: 8,
    source: 'Purananuru (கணியன் பூங்குன்றனார்)',
  },
  {
    id: 'line-2',
    line_ta: 'கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக',
    tanglish: 'karka kasadarak karpavai katrapin nirka atharkuth thaga',
    meaning_en: 'Learn flawlessly whatever you learn; after learning, conduct yourself worthy of that learning.',
    word_count: 7,
    source: 'Thirukkural 391',
  },
  {
    id: 'line-3',
    line_ta: 'அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு',
    tanglish: 'agara mudhala ezhuththellaam aathi bagavan mudhatrae ulagu',
    meaning_en: '"A" is the starting of all letters; the Primordial Lord is the beginning of the universe.',
    word_count: 7,
    source: 'Thirukkural 1',
  },
  {
    id: 'line-4',
    line_ta: 'தீயினால் சுட்ட புண் உள்ளாறும் ஆறாதே நாவினால் சுட்ட வடு',
    tanglish: 'theeyinaal sutta puN uLLaarum aaraathae naavinaal sutta vadu',
    meaning_en: 'A burn caused by fire will heal from within; the scar left by harsh words will never heal.',
    word_count: 8,
    source: 'Thirukkural 129',
  },
  {
    id: 'line-5',
    line_ta: 'இனிய உளவாக இன்னாத கூறல் கனிஇருப்பக் காய்கவர்ந் தற்று',
    tanglish: 'iniya uLavaga innaatha kooral kani-iruppak kaai-kavarn thatru',
    meaning_en: 'To speak harsh words when sweet words exist is like choosing raw fruit when ripe fruit is available.',
    word_count: 7,
    source: 'Thirukkural 100',
  },
];

// Level 4: Connected Sentences and Paragraphs (~5 lines) with Summary & Assessments
export const TAMIL_PARAGRAPHS_LEVEL_4: TamilParagraphItem[] = [
  {
    id: 'para-1',
    title_ta: 'தமிழ்த்தாய் வாழ்த்தும் சிறப்பும்',
    title_en: 'The Heritage and Sweetness of Tamil',
    sentences: [
      'தமிழ் எங்கள் உயிருக்கு நேர்.',
      'இன்பத் தமிழ் எங்கள் அறிவுக்குத் தோள்.',
      'தமிழ் எங்கள் இளமைக்குப் பால் போன்றது.',
      'எங்கள் வாழ்வுக்கு நிருமித்த ஊர் தமிழ் ஆகும்.',
      'தமிழைப் போற்றிப் பயில்வது நம் அனைவரின் பெருமை.',
    ],
    paragraph_ta: 'தமிழ் எங்கள் உயிருக்கு நேர். இன்பத் தமிழ் எங்கள் அறிவுக்குத் தோள். தமிழ் எங்கள் இளமைக்குப் பால் போன்றது. எங்கள் வாழ்வுக்கு நிருமித்த ஊர் தமிழ் ஆகும். தமிழைப் போற்றிப் பயில்வது நம் அனைவரின் பெருமை.',
    tanglish: 'Thamizh engal uyirukku naer. Inbath thamizh engal arivukku thoal. Thamizh engal ilamaikku paal poandrathu. Engal vaazhvukku nirumiththa oor thamizh aagum. Thamizhai poatri payilvathu nam anaivarin perumai.',
    summary_en: 'Summary: Tamil is like life itself to its speakers. It nourishes the mind with strength, enriches youth like sweet milk, and forms the foundation of culture and community.',
    summary_ta: 'சுருக்கம்: தமிழ் நமது உயிருக்கு இணையானது, அறிவுக்கு வலிமை சேர்ப்பது, பண்பாட்டின் ஆணிவேராகத் திகழ்வது.',
  },
  {
    id: 'para-2',
    title_ta: 'இயற்கையைப் பாதுகாப்போம்',
    title_en: 'Preserving Mother Nature',
    sentences: [
      'இயற்கையை நாம் எப்போதும் போற்றிப் பாதுகாக்க வேண்டும்.',
      'மரங்கள் நமக்குத் தூய காற்றையும் குளிர்ந்த நிழலையும் தருகின்றன.',
      'காடுகளைப் பாதுகாப்பது நல்ல மழை வளத்தை உருவாக்கும்.',
      'நீர் நிலைகளைத் தூய்மையாக வைப்பது நம் முக்கிய கடமையாகும்.',
      'பசுமையான உலகமே எதிர்காலத் தலைமுறைக்கு மகிழ்ச்சியைத் தரும்.',
    ],
    paragraph_ta: 'இயற்கையை நாம் எப்போதும் போற்றிப் பாதுகாக்க வேண்டும். மரங்கள் நமக்குத் தூய காற்றையும் குளிர்ந்த நிழலையும் தருகின்றன. காடுகளைப் பாதுகாப்பது நல்ல மழை வளத்தை உருவாக்கும். நீர் நிலைகளைத் தூய்மையாக வைப்பது நம் முக்கிய கடமையாகும். பசுமையான உலகமே எதிர்காலத் தலைமுறைக்கு மகிழ்ச்சியைத் தரும்.',
    tanglish: 'Iyarkaiyai naam eppoadhum poatri paadhukaakka vaendum. Marangal namakkuth thooya kaatrayum kulirntha nizhalaiyum tharugindrana. Kaadugalai paadhukaappathu nalla mazhai valaththai uruvaakkum. Neer nilaikalai thooymaiyaaga vaippathu nam mukkiya kadamaiyaagum. Pasumaiyaana ulagamae ethirkaalath thalaimuraikku magizhchiyai tharum.',
    summary_en: 'Summary: We must preserve nature. Trees provide clean air and shade, forests sustain rainfall, and keeping water resources pure ensures a joyful, sustainable green world for the future.',
    summary_ta: 'சுருக்கம்: இயற்கையைப் பாதுகாத்து மரம் வளர்ப்பதும் நீர்நிலைகளைத் தூய்மையாக வைப்பதும் பசுமையான உலகை உருவாக்கும்.',
  },
];
