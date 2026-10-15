export interface AssessmentQuestion {
  id: string;
  category: 'phonics' | 'letter' | 'syllable' | 'vocab';
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

// 5 Simple Diagnostic Questions to evaluate whether user knows Tamil letters or is a complete beginner
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'aq-1',
    category: 'phonics',
    prompt_en: 'Listen to the sound. Which Tamil vowel is being spoken?',
    prompt_ta: 'ஒலியைக் கேளுங்கள். எந்த உயிரெழுத்து ஒலிக்கிறது?',
    audio_id: 'letter_a',
    options: [
      { id: 'aq-1-a', text_ta: 'அ', text_tanglish: 'a (Short a)', is_correct: true },
      { id: 'aq-1-b', text_ta: 'ஆ', text_tanglish: 'aa (Long aa)', is_correct: false },
      { id: 'aq-1-c', text_ta: 'இ', text_tanglish: 'i (Short i)', is_correct: false },
      { id: 'aq-1-d', text_ta: 'உ', text_tanglish: 'u (Short u)', is_correct: false },
    ],
    explanation_en: 'The sound is the first short Tamil vowel "a" (அ).',
    explanation_ta: 'ஒலிக்கப்பட்ட எழுத்து குறில் உயிரெழுத்து "அ".',
  },
  {
    id: 'aq-2',
    category: 'letter',
    prompt_en: 'Which of the following is the long vowel "aa" (with the bottom loop)?',
    prompt_ta: 'கீழே உள்ளவற்றில் நெடில் "ஆ" எழுத்து எது?',
    options: [
      { id: 'aq-2-a', text_ta: 'அ', text_tanglish: 'a', is_correct: false },
      { id: 'aq-2-b', text_ta: 'ஆ', text_tanglish: 'aa', is_correct: true },
      { id: 'aq-2-c', text_ta: 'ஈ', text_tanglish: 'ee', is_correct: false },
      { id: 'aq-2-d', text_ta: 'ஊ', text_tanglish: 'oo', is_correct: false },
    ],
    explanation_en: 'Correct! "ஆ" is the long vowel sound (aa).',
    explanation_ta: 'சரியான விடை! "ஆ" என்பது நெடில் உயிரெழுத்து.',
  },
  {
    id: 'aq-3',
    category: 'letter',
    prompt_en: 'Which of these is the Tamil consonant "k" (க்)?',
    prompt_ta: 'இவற்றுள் "க்" என்ற மெய்யெழுத்து எது?',
    options: [
      { id: 'aq-3-a', text_ta: 'க்', text_tanglish: 'k', is_correct: true },
      { id: 'aq-3-b', text_ta: 'ச்', text_tanglish: 'ch', is_correct: false },
      { id: 'aq-3-c', text_ta: 'ட்', text_tanglish: 't', is_correct: false },
      { id: 'aq-3-d', text_ta: 'த்', text_tanglish: 'th', is_correct: false },
    ],
    explanation_en: 'Accurate! "க்" is the first consonant (வல்லின மெய்) in Tamil.',
    explanation_ta: 'ஆம்! "க்" என்பது முதல் மெய்யெழுத்து.',
  },
  {
    id: 'aq-4',
    category: 'syllable',
    prompt_en: 'When the consonant க் (k) combines with vowel ஆ (aa), what letter is formed?',
    prompt_ta: 'க் + ஆ இரண்டும் இணைந்தால் உருவாகும் உயிர்மெய் எழுத்து எது?',
    options: [
      { id: 'aq-4-a', text_ta: 'கா', text_tanglish: 'kaa', is_correct: true },
      { id: 'aq-4-b', text_ta: 'கி', text_tanglish: 'ki', is_correct: false },
      { id: 'aq-4-c', text_ta: 'கூ', text_tanglish: 'koo', is_correct: false },
      { id: 'aq-4-d', text_ta: 'கை', text_tanglish: 'kai', is_correct: false },
    ],
    explanation_en: 'Spot on! க் + ஆ = கா (kaa). Consonant + Vowel forms an Uyirmei syllable.',
    explanation_ta: 'மிகச் சரி! க் + ஆ = கா.',
  },
  {
    id: 'aq-5',
    category: 'vocab',
    prompt_en: 'Which simple word contains the vowel "அ" and consonant "ண்" (meaning "Eye")?',
    prompt_ta: 'உயிர் "அ" மற்றும் மெய் "ண்" கொண்ட சொல் எது?',
    options: [
      { id: 'aq-5-a', text_ta: 'கண்', text_tanglish: 'kaN (Eye)', is_correct: true },
      { id: 'aq-5-b', text_ta: 'கல்', text_tanglish: 'kal (Stone)', is_correct: false },
      { id: 'aq-5-c', text_ta: 'பல்', text_tanglish: 'pal (Tooth)', is_correct: false },
      { id: 'aq-5-d', text_ta: 'மண்', text_tanglish: 'maN (Soil)', is_correct: false },
    ],
    explanation_en: 'Excellent! கண் (kaN) means Eye.',
    explanation_ta: 'அருமை! கண் என்பது சரியான விடை.',
  },
];
