export interface AssessmentQuestion {
  id: string;
  category: 'phonics' | 'letter' | 'vocab' | 'sentence';
  prompt_en: string;
  prompt_ta: string;
  audio_id?: string;
  options: {
    id: string;
    text_ta: string;
    text_tanglish?: string;
    text_en?: string;
    is_correct: boolean;
  }[];
  explanation_en: string;
  explanation_ta: string;
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'aq-1',
    category: 'phonics',
    prompt_en: 'Listen to the sound. Which Tamil vowel is being spoken?',
    prompt_ta: 'ஒலியைக் கேளுங்கள். எந்த உயிரெழுத்து ஒலிக்கிறது?',
    audio_id: 'letter_a',
    options: [
      { id: 'aq-1-a', text_ta: 'அ', text_tanglish: 'a', is_correct: true },
      { id: 'aq-1-b', text_ta: 'ஆ', text_tanglish: 'aa', is_correct: false },
      { id: 'aq-1-c', text_ta: 'இ', text_tanglish: 'i', is_correct: false },
      { id: 'aq-1-d', text_ta: 'உ', text_tanglish: 'u', is_correct: false },
    ],
    explanation_en: 'The sound was the short open vowel "a" (அ).',
    explanation_ta: 'ஒலிக்கப்பட்ட எழுத்து குறில் "அ".',
  },
  {
    id: 'aq-2',
    category: 'letter',
    prompt_en: 'Which of these is the long vowel "aa" with the bottom loop?',
    prompt_ta: 'கீழே உள்ளவற்றில் நெடில் "ஆ" எழுத்து எது?',
    options: [
      { id: 'aq-2-a', text_ta: 'அ', text_tanglish: 'a', is_correct: false },
      { id: 'aq-2-b', text_ta: 'ஆ', text_tanglish: 'aa', is_correct: true },
      { id: 'aq-2-c', text_ta: 'ஈ', text_tanglish: 'ee', is_correct: false },
      { id: 'aq-2-d', text_ta: 'ஊ', text_tanglish: 'oo', is_correct: false },
    ],
    explanation_en: 'Correct! "ஆ" has the decorative bottom loop distinguishing it from "அ".',
    explanation_ta: 'சரியான விடை! "ஆ" என்பது நெடில் உயிரெழுத்து.',
  },
  {
    id: 'aq-3',
    category: 'letter',
    prompt_en: 'Which is the unique 3-dot Tamil Aytham letter (ஃ)?',
    prompt_ta: 'மூன்று புள்ளிகளாலான ஆய்த எழுத்து எது?',
    options: [
      { id: 'aq-3-a', text_ta: 'ஃ', text_tanglish: 'ak', is_correct: true },
      { id: 'aq-3-b', text_ta: 'க்', text_tanglish: 'k', is_correct: false },
      { id: 'aq-3-c', text_ta: 'ட்', text_tanglish: 't', is_correct: false },
      { id: 'aq-3-d', text_ta: 'ப்', text_tanglish: 'p', is_correct: false },
    ],
    explanation_en: 'Yes! "ஃ" is the Aytham letter (முப்புள்ளி).',
    explanation_ta: 'ஆம்! "ஃ" என்பது ஆய்த எழுத்து.',
  },
  {
    id: 'aq-4',
    category: 'vocab',
    prompt_en: 'What does the Tamil word "அம்மா" (amma) mean?',
    prompt_ta: '"அம்மா" என்ற சொல்லின் பொருள் என்ன?',
    audio_id: 'vocab_amma',
    options: [
      { id: 'aq-4-a', text_ta: 'Mother', is_correct: true },
      { id: 'aq-4-b', text_ta: 'Father', is_correct: false },
      { id: 'aq-4-c', text_ta: 'Sister', is_correct: false },
      { id: 'aq-4-d', text_ta: 'Friend', is_correct: false },
    ],
    explanation_en: 'அம்மா means Mother.',
    explanation_ta: 'அம்மா என்பது தாயைக் குறிக்கும் சொல்.',
  },
  {
    id: 'aq-5',
    category: 'vocab',
    prompt_en: 'How do you say "Greetings / Hello" politely in Tamil?',
    prompt_ta: 'தமிழில் பிறரை வரவேற்க அல்லது வாழ்த்த என்ன கூறுவோம்?',
    audio_id: 'vocab_vanakkam',
    options: [
      { id: 'aq-5-a', text_ta: 'வணக்கம் (vanakkam)', is_correct: true },
      { id: 'aq-5-b', text_ta: 'நன்றி (nandri)', is_correct: false },
      { id: 'aq-5-c', text_ta: 'வா (vaa)', is_correct: false },
      { id: 'aq-5-d', text_ta: 'சோறு (soru)', is_correct: false },
    ],
    explanation_en: 'வணக்கம் (vanakkam) is the standard respectful greeting in Tamil.',
    explanation_ta: 'வணக்கம் என்பது தமிழர்களின் பண்பாட்டு முகமன்.',
  },
  {
    id: 'aq-6',
    category: 'vocab',
    prompt_en: 'What number is "இரண்டு" (irandu)?',
    prompt_ta: '"இரண்டு" என்பது எந்த எண்?',
    audio_id: 'vocab_irandu',
    options: [
      { id: 'aq-6-a', text_ta: '1 (ஒன்று)', is_correct: false },
      { id: 'aq-6-b', text_ta: '2 (இரண்டு)', is_correct: true },
      { id: 'aq-6-c', text_ta: '3 (மூன்று)', is_correct: false },
      { id: 'aq-6-d', text_ta: '5 (ஐந்து)', is_correct: false },
    ],
    explanation_en: 'இரண்டு (irandu) means Two (2).',
    explanation_ta: 'இரண்டு என்பது 2 ஐக் குறிக்கிறது.',
  },
  {
    id: 'aq-7',
    category: 'vocab',
    prompt_en: 'What color is "பச்சை" (pachai)?',
    prompt_ta: '"பச்சை" என்பது எந்த நிறம்?',
    audio_id: 'vocab_pachai',
    options: [
      { id: 'aq-7-a', text_ta: 'Red (சிவப்பு)', is_correct: false },
      { id: 'aq-7-b', text_ta: 'Green (பச்சை)', is_correct: true },
      { id: 'aq-7-c', text_ta: 'Blue (நீலம்)', is_correct: false },
      { id: 'aq-7-d', text_ta: 'Yellow (மஞ்சள்)', is_correct: false },
    ],
    explanation_en: 'பச்சை (pachai) is Green like fresh leaves.',
    explanation_ta: 'பச்சை என்பது தளிர்களின் வண்ணம்.',
  },
  {
    id: 'aq-8',
    category: 'vocab',
    prompt_en: 'Which Tamil word means "Cat"?',
    prompt_ta: '"Cat" என்பதைக் குறிக்கும் தமிழ்ச் சொல் எது?',
    options: [
      { id: 'aq-8-a', text_ta: 'நாய் (naai)', is_correct: false },
      { id: 'aq-8-b', text_ta: 'பூனை (poonai)', is_correct: true },
      { id: 'aq-8-c', text_ta: 'கிளி (kili)', is_correct: false },
      { id: 'aq-8-d', text_ta: 'யானை (yaanai)', is_correct: false },
    ],
    explanation_en: 'பூனை (poonai) is Cat.',
    explanation_ta: 'பூனை என்பது பூனைக் குட்டியைக் குறிக்கும் சொல்.',
  },
  {
    id: 'aq-9',
    category: 'sentence',
    prompt_en: 'What does "நல்ல பையன்" (nalla paiyan) translate to?',
    prompt_ta: '"நல்ல பையன்" என்பதன் பொருள் என்ன?',
    options: [
      { id: 'aq-9-a', text_ta: 'Good boy', is_correct: true },
      { id: 'aq-9-b', text_ta: 'Tall tree', is_correct: false },
      { id: 'aq-9-c', text_ta: 'Sweet fruit', is_correct: false },
      { id: 'aq-9-d', text_ta: 'Big house', is_correct: false },
    ],
    explanation_en: 'நல்ல (good) + பையன் (boy) = Good boy.',
    explanation_ta: 'நல்ல + பையன் = நல்ல பையன்.',
  },
  {
    id: 'aq-10',
    category: 'sentence',
    prompt_en: 'How do you say "My name is Aarav" in Tamil?',
    prompt_ta: '"My name is Aarav" என்பதைத் தமிழில் எப்படிக் கூறுவோம்?',
    audio_id: 'sent_en_peyar',
    options: [
      { id: 'aq-10-a', text_ta: 'என் பெயர் ஆரவ் (en peyar Aarav)', is_correct: true },
      { id: 'aq-10-b', text_ta: 'எனக்கு பழம் பிடிக்கும்', is_correct: false },
      { id: 'aq-10-c', text_ta: 'வணக்கம் அம்மா', is_correct: false },
      { id: 'aq-10-d', text_ta: 'தண்ணீர் குடி', is_correct: false },
    ],
    explanation_en: 'என் (my) + பெயர் (name) + ஆரவ் (Aarav).',
    explanation_ta: 'என் பெயர் ஆரவ் என்பதே சரியான தொடர்.',
  },
];
