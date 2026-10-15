import { LearningLevel, Lesson, Exercise } from '../types';
import { LEARNING_LEVELS, ALL_LESSONS, LESSON_EXERCISES } from '../data/curriculumData';
import { LocalStorageAdapter } from './storageAdapter';
import { SupabaseAdapter } from './supabaseAdapter';
import { 
  ALL_247_TAMIL_LETTERS, 
  UYIR_LETTERS, 
  TamilLetterInfo 
} from '../data/tamilLettersData';
import { WORDS_LEVEL_2_0, WORDS_LEVEL_2_1, TamilWordItem } from '../data/tamil100WordsData';
import { TAMIL_LINES_LEVEL_3, TAMIL_PARAGRAPHS_LEVEL_4, TamilLineItem, TamilParagraphItem } from '../data/tamilLinesData';

export interface ICurriculumService {
  getLevels(): Promise<LearningLevel[]>;
  getLevel(levelNumber: number): Promise<LearningLevel | null>;
  getLessonsByLevel(levelNumber: number): Promise<Lesson[]>;
  getLesson(lessonId: string): Promise<Lesson | null>;
  getLessonExercises(lessonId: string): Promise<Exercise[]>;
}

export class CurriculumService implements ICurriculumService {
  async getLevels(): Promise<LearningLevel[]> {
    const remoteLevels = await SupabaseAdapter.getLevels();
    if (remoteLevels && remoteLevels.length > 0) {
      return remoteLevels;
    }

    const progressList = LocalStorageAdapter.getLessonProgress();
    const completedLessonIds = new Set(
      progressList.filter(p => p.status === 'completed').map(p => p.lesson_id)
    );

    return LEARNING_LEVELS.map(level => {
      const lessons = ALL_LESSONS.filter(l => l.level_number === level.level_number);
      const completedCount = lessons.filter(l => completedLessonIds.has(l.id)).length;
      const isCompleted = lessons.length > 0 && completedCount === lessons.length;

      // Unlocking rule: all levels are accessible for hackathon demo / free progression
      const isUnlocked = true;

      return {
        ...level,
        completed_lessons: completedCount,
        is_completed: isCompleted,
        is_unlocked: isUnlocked,
      };
    });
  }

  async getLevel(levelNumber: number): Promise<LearningLevel | null> {
    const levels = await this.getLevels();
    return levels.find(l => l.level_number === levelNumber) || null;
  }

  async getLessonsByLevel(levelNumber: number): Promise<Lesson[]> {
    const remoteLessons = await SupabaseAdapter.getLessonsByLevel(levelNumber);
    if (remoteLessons && remoteLessons.length > 0) {
      return remoteLessons;
    }

    const progressList = LocalStorageAdapter.getLessonProgress();
    const progressMap = new Map(progressList.map(p => [p.lesson_id, p]));

    return ALL_LESSONS.filter(l => l.level_number === levelNumber).map(lesson => {
      const p = progressMap.get(lesson.id);
      return {
        ...lesson,
        is_completed: p?.status === 'completed',
        score: p?.score,
        last_item_index: p?.last_item_index || 0,
      };
    });
  }

  async getLesson(lessonId: string): Promise<Lesson | null> {
    const lesson = ALL_LESSONS.find(l => l.id === lessonId);
    if (!lesson) return null;

    const progressList = LocalStorageAdapter.getLessonProgress();
    const p = progressList.find(pr => pr.lesson_id === lessonId);

    return {
      ...lesson,
      is_completed: p?.status === 'completed',
      score: p?.score,
      last_item_index: p?.last_item_index || 0,
    };
  }

  async getLessonExercises(lessonId: string): Promise<Exercise[]> {
    const remoteExercises = await SupabaseAdapter.getLessonExercises(lessonId);
    if (remoteExercises && remoteExercises.length > 0) {
      return remoteExercises;
    }

    // If pre-authored exercises exist, use them
    if (LESSON_EXERCISES[lessonId] && LESSON_EXERCISES[lessonId].length > 0) {
      return LESSON_EXERCISES[lessonId];
    }

    const lesson = ALL_LESSONS.find(l => l.id === lessonId);
    const levelNumber = lesson ? lesson.level_number : 1;

    // ══════════════════════════════════════════════════════════════════════════
    // LEVEL 2 — TAMIL WORDS (Sublevel 2.0 & 2.1 — 100 Words Total)
    // ══════════════════════════════════════════════════════════════════════════
    if (levelNumber === 2) {
      const isSublevel2_1 = lessonId === 'lesson-2-1' || (lesson && lesson.sequence_order === 2);
      const wordBank = isSublevel2_1 ? WORDS_LEVEL_2_1 : WORDS_LEVEL_2_0;

      // Pick words for this session
      const seq = lesson ? lesson.sequence_order : 1;
      const startIndex = ((seq - 1) * 3) % wordBank.length;
      const targetWord: TamilWordItem = wordBank[startIndex] || wordBank[0];
      const optWord1: TamilWordItem = wordBank[(startIndex + 1) % wordBank.length] || wordBank[1];
      const optWord2: TamilWordItem = wordBank[(startIndex + 2) % wordBank.length] || wordBank[2];

      const exercises: Exercise[] = [
        // 1. FlipCard Vocabulary Card
        {
          id: `ex-${lessonId}-1`,
          lesson_id: lessonId,
          exercise_type: 'vocab_card',
          prompt_en: `Listen and learn Tamil word "${targetWord.word_ta}" (${targetWord.meaning_en}):`,
          prompt_ta: `"${targetWord.word_ta}" என்ற சொல்லின் ஒலியைக் கேளுங்கள்:`,
          sequence_order: 1,
          questions: [
            {
              id: `q-${lessonId}-1`,
              exercise_id: `ex-${lessonId}-1`,
              exercise_type: 'vocab_card',
              prompt_en: `Word: ${targetWord.word_ta}`,
              prompt_ta: `சொல்: ${targetWord.word_ta}`,
              content_ta: targetWord.word_ta,
              content_tanglish: targetWord.tanglish,
              content_en: `${targetWord.meaning_en} (${targetWord.category})`,
              correct_answer: 'listened',
              explanation_en: `"${targetWord.word_ta}" means "${targetWord.meaning_en}". Tanglish sound: "${targetWord.tanglish}".`,
              explanation_ta: `"${targetWord.word_ta}" என்பது "${targetWord.meaning_en}" என்பதைக் குறிக்கும்.`,
              audio_id: targetWord.audio_id,
            },
          ],
        },

        // 2. Speaking Practice
        {
          id: `ex-${lessonId}-2`,
          lesson_id: lessonId,
          exercise_type: 'speaking',
          prompt_en: `Speak the word "${targetWord.word_ta}" (${targetWord.meaning_en}) into the microphone:`,
          prompt_ta: `"${targetWord.word_ta}" என்று தெளிவாகப் பேசிப் பழகுங்கள்:`,
          sequence_order: 2,
          questions: [
            {
              id: `q-${lessonId}-2`,
              exercise_id: `ex-${lessonId}-2`,
              exercise_type: 'speaking',
              prompt_en: `Speak: ${targetWord.word_ta}`,
              prompt_ta: `பேசவும்: ${targetWord.word_ta}`,
              content_ta: targetWord.word_ta,
              content_tanglish: targetWord.tanglish,
              content_en: targetWord.meaning_en,
              correct_answer: 'recorded',
              explanation_en: `Great pronunciation of "${targetWord.word_ta}"! Speaking reinforces memory.`,
              explanation_ta: `அருமை! "${targetWord.word_ta}" சொல்லை மிகத் தெளிவாக உச்சரித்தீர்கள்.`,
              audio_id: targetWord.audio_id,
            },
          ],
        },

        // 3. Word Tracing / Writing Canvas Practice
        {
          id: `ex-${lessonId}-3`,
          lesson_id: lessonId,
          exercise_type: 'tracing',
          prompt_en: `Write / trace the word "${targetWord.word_ta}" on the canvas:`,
          prompt_ta: `"${targetWord.word_ta}" என்ற சொல்லை அழகாக வரைக:`,
          sequence_order: 3,
          questions: [
            {
              id: `q-${lessonId}-3`,
              exercise_id: `ex-${lessonId}-3`,
              exercise_type: 'tracing',
              prompt_en: `Trace word: ${targetWord.word_ta}`,
              prompt_ta: `${targetWord.word_ta} சொல்லை வரைக`,
              content_ta: targetWord.word_ta,
              content_tanglish: targetWord.tanglish,
              content_en: targetWord.meaning_en,
              correct_answer: 'completed',
              explanation_en: `Excellent writing! You traced "${targetWord.word_ta}".`,
              explanation_ta: `அற்புதம்! "${targetWord.word_ta}" சொல்லை மிக அழகாக எழுதிவிட்டீர்கள்.`,
              audio_id: targetWord.audio_id,
              tracing_data: {
                letter: targetWord.word_ta,
                outline_path: '',
              },
            },
          ],
        },

        // 4. MCQ Word Recognition
        {
          id: `ex-${lessonId}-4`,
          lesson_id: lessonId,
          exercise_type: 'mcq',
          prompt_en: `Which Tamil word means "${targetWord.meaning_en}"?`,
          prompt_ta: `"${targetWord.meaning_en}" என்ற பொருளுடைய தமிழ் சொல் எது?`,
          sequence_order: 4,
          questions: [
            {
              id: `q-${lessonId}-4`,
              exercise_id: `ex-${lessonId}-4`,
              exercise_type: 'mcq',
              prompt_en: `Choose word for "${targetWord.meaning_en}":`,
              prompt_ta: `"${targetWord.meaning_en}" பொருளைக் கொண்ட சொல்லைத் தேர்ந்தெடுக்கவும்:`,
              content_ta: targetWord.meaning_en,
              content_tanglish: targetWord.tanglish,
              correct_answer: `${targetWord.word_ta} (${targetWord.tanglish})`,
              explanation_en: `Correct! "${targetWord.word_ta}" means "${targetWord.meaning_en}".`,
              explanation_ta: `மிகச் சரி! "${targetWord.word_ta}" என்பது சரியான விடை.`,
              audio_id: targetWord.audio_id,
              options: [
                {
                  id: `opt-${lessonId}-1`,
                  option_text: `${targetWord.word_ta} (${targetWord.tanglish})`,
                  option_tanglish: targetWord.tanglish,
                  is_correct: true,
                  audio_id: targetWord.audio_id,
                },
                {
                  id: `opt-${lessonId}-2`,
                  option_text: `${optWord1.word_ta} (${optWord1.tanglish})`,
                  option_tanglish: optWord1.tanglish,
                  is_correct: false,
                  audio_id: optWord1.audio_id,
                },
                {
                  id: `opt-${lessonId}-3`,
                  option_text: `${optWord2.word_ta} (${optWord2.tanglish})`,
                  option_tanglish: optWord2.tanglish,
                  is_correct: false,
                  audio_id: optWord2.audio_id,
                },
              ],
            },
          ],
        },

        // 5. Word Matching
        {
          id: `ex-${lessonId}-5`,
          lesson_id: lessonId,
          exercise_type: 'matching',
          prompt_en: 'Match each Tamil word with its English meaning:',
          prompt_ta: 'தமிழ் சொற்களை அவற்றின் ஆங்கிலப் பொருளுடன் பொருத்துக:',
          sequence_order: 5,
          questions: [
            {
              id: `q-${lessonId}-5`,
              exercise_id: `ex-${lessonId}-5`,
              exercise_type: 'matching',
              prompt_en: 'Match words:',
              prompt_ta: 'பொருத்துக:',
              content_ta: 'சொல் பொருத்துதல்',
              correct_answer: 'matched',
              explanation_en: 'Superb! You correctly matched all Tamil words.',
              explanation_ta: 'அற்புதம்! அனைத்து சொற்களையும் சரியாகப் பொருத்தினீர்கள்.',
              pairs: [
                { id: 'p1', left_ta: targetWord.word_ta, right_en: targetWord.meaning_en, audio_id: targetWord.audio_id },
                { id: 'p2', left_ta: optWord1.word_ta, right_en: optWord1.meaning_en, audio_id: optWord1.audio_id },
                { id: 'p3', left_ta: optWord2.word_ta, right_en: optWord2.meaning_en, audio_id: optWord2.audio_id },
              ],
            },
          ],
        },
      ];

      return exercises;
    }

    // ══════════════════════════════════════════════════════════════════════════
    // LEVEL 3 — TAMIL LINES (~5 to 6 words or more with Speaking & Writing)
    // ══════════════════════════════════════════════════════════════════════════
    if (levelNumber === 3) {
      const seq = lesson ? lesson.sequence_order : 1;
      const lineIndex = (seq - 1) % TAMIL_LINES_LEVEL_3.length;
      const targetLine: TamilLineItem = TAMIL_LINES_LEVEL_3[lineIndex] || TAMIL_LINES_LEVEL_3[0];
      const wordsInLine = targetLine.line_ta.split(' ').filter(Boolean);

      const exercises: Exercise[] = [
        // 1. Full Line Listening & Reading Card
        {
          id: `ex-${lessonId}-1`,
          lesson_id: lessonId,
          exercise_type: 'vocab_card',
          prompt_en: `Listen to this complete Tamil line (${targetLine.word_count} words):`,
          prompt_ta: `இந்த முழுத் தமிழ் வரியைக் கேளுங்கள் (${targetLine.word_count} சொற்கள்):`,
          sequence_order: 1,
          questions: [
            {
              id: `q-${lessonId}-1`,
              exercise_id: `ex-${lessonId}-1`,
              exercise_type: 'vocab_card',
              prompt_en: `Tamil Line (${targetLine.source}):`,
              prompt_ta: `தமிழ் வரி (${targetLine.source}):`,
              content_ta: targetLine.line_ta,
              content_tanglish: targetLine.tanglish,
              content_en: targetLine.meaning_en,
              correct_answer: 'listened',
              explanation_en: `Complete line: "${targetLine.line_ta}" (${targetLine.meaning_en}). Source: ${targetLine.source}.`,
              explanation_ta: `முழு வரி: "${targetLine.line_ta}". பொருள்: ${targetLine.meaning_en}.`,
              audio_id: `line_${targetLine.id}`,
            },
          ],
        },

        // 2. Full Line Speaking Practice
        {
          id: `ex-${lessonId}-2`,
          lesson_id: lessonId,
          exercise_type: 'speaking',
          prompt_en: `Speak the complete line clearly into the microphone:`,
          prompt_ta: `முழு வரியையும் தெளிவாக மைக்ரோஃபோனில் பேசிப் பழகுங்கள்:`,
          sequence_order: 2,
          questions: [
            {
              id: `q-${lessonId}-2`,
              exercise_id: `ex-${lessonId}-2`,
              exercise_type: 'speaking',
              prompt_en: `Speak: "${targetLine.line_ta}"`,
              prompt_ta: `பேசவும்: "${targetLine.line_ta}"`,
              content_ta: targetLine.line_ta,
              content_tanglish: targetLine.tanglish,
              content_en: targetLine.meaning_en,
              correct_answer: 'recorded',
              explanation_en: `Awesome speaking! You recited a full ${targetLine.word_count}-word Tamil line with confidence.`,
              explanation_ta: `மிக அருமை! முழு வரியையும் அழகாக உச்சரித்துப் பேசிவிட்டீர்கள்.`,
              audio_id: `line_${targetLine.id}`,
            },
          ],
        },

        // 3. Line Writing / Tracing Practice
        {
          id: `ex-${lessonId}-3`,
          lesson_id: lessonId,
          exercise_type: 'tracing',
          prompt_en: `Practice writing key phrase from the line:`,
          prompt_ta: `இவ்வரியின் முக்கிய பகுதியை விரலால் எழுதிப் பழகுங்கள்:`,
          sequence_order: 3,
          questions: [
            {
              id: `q-${lessonId}-3`,
              exercise_id: `ex-${lessonId}-3`,
              exercise_type: 'tracing',
              prompt_en: `Write: ${wordsInLine.slice(0, 2).join(' ')}`,
              prompt_ta: `எழுதுக: ${wordsInLine.slice(0, 2).join(' ')}`,
              content_ta: wordsInLine.slice(0, 2).join(' '),
              content_tanglish: targetLine.tanglish,
              content_en: `Write key words from: ${targetLine.meaning_en}`,
              correct_answer: 'completed',
              explanation_en: `Great writing practice! Forming Tamil letters builds fluency.`,
              explanation_ta: `அருமை! சொற்களை மிக அழகாக வரைந்து பழகியுள்ளீர்கள்.`,
              audio_id: `line_${targetLine.id}`,
              tracing_data: {
                letter: wordsInLine[0] || 'தமிழ்',
                outline_path: '',
              },
            },
          ],
        },

        // 4. Interactive Word Ordering (Rearrange 5-6 words to form line)
        {
          id: `ex-${lessonId}-4`,
          lesson_id: lessonId,
          exercise_type: 'ordering',
          prompt_en: `Arrange the words in order to form the complete Tamil line:`,
          prompt_ta: `சொற்களைச் சரியான வரிசையில் அடுக்கி முழு வரியை அமைக்கவும்:`,
          sequence_order: 4,
          questions: [
            {
              id: `q-${lessonId}-4`,
              exercise_id: `ex-${lessonId}-4`,
              exercise_type: 'ordering',
              prompt_en: `Order the line: "${targetLine.meaning_en}"`,
              prompt_ta: `வரிசையமைக்க: "${targetLine.line_ta}"`,
              content_ta: targetLine.line_ta,
              content_tanglish: targetLine.tanglish,
              correct_answer: wordsInLine.join(' '),
              explanation_en: `Superb! The correct order is: "${targetLine.line_ta}".`,
              explanation_ta: `அற்புதம்! சரியான வரிசை: "${targetLine.line_ta}".`,
              word_bank: [...wordsInLine]
                .sort(() => Math.random() - 0.5)
                .map((w, idx) => ({ id: `tile-${idx}`, text_ta: w })),
            },
          ],
        },

        // 5. Comprehension MCQ
        {
          id: `ex-${lessonId}-5`,
          lesson_id: lessonId,
          exercise_type: 'mcq',
          prompt_en: `What is the meaning of: "${targetLine.line_ta}"?`,
          prompt_ta: `"${targetLine.line_ta}" என்ற வரியின் ஆங்கிலப் பொருள் என்ன?`,
          sequence_order: 5,
          questions: [
            {
              id: `q-${lessonId}-5`,
              exercise_id: `ex-${lessonId}-5`,
              exercise_type: 'mcq',
              prompt_en: `Select the meaning:`,
              prompt_ta: `சரியான பொருளைத் தேர்ந்தெடுக்கவும்:`,
              content_ta: targetLine.line_ta,
              content_tanglish: targetLine.tanglish,
              correct_answer: targetLine.meaning_en,
              explanation_en: `Spot on! "${targetLine.line_ta}" means "${targetLine.meaning_en}".`,
              explanation_ta: `மிகச் சரி! சரியான பொருள் தெரிவு செய்யப்பட்டது.`,
              audio_id: `line_${targetLine.id}`,
              options: [
                {
                  id: `opt-${lessonId}-1`,
                  option_text: targetLine.meaning_en,
                  option_tanglish: targetLine.tanglish,
                  is_correct: true,
                },
                {
                  id: `opt-${lessonId}-2`,
                  option_text: 'The moon shines bright across the lake at night',
                  option_tanglish: '',
                  is_correct: false,
                },
                {
                  id: `opt-${lessonId}-3`,
                  option_text: 'We walk through the mountain valley in summer',
                  option_tanglish: '',
                  is_correct: false,
                },
              ],
            },
          ],
        },
      ];

      return exercises;
    }

    // ══════════════════════════════════════════════════════════════════════════
    // LEVEL 4 — TAMIL SENTENCES & PARAGRAPHS (~5 Lines with Summary)
    // ══════════════════════════════════════════════════════════════════════════
    if (levelNumber === 4) {
      const seq = lesson ? lesson.sequence_order : 1;
      const pIndex = (seq - 1) % TAMIL_PARAGRAPHS_LEVEL_4.length;
      const targetP: TamilParagraphItem = TAMIL_PARAGRAPHS_LEVEL_4[pIndex] || TAMIL_PARAGRAPHS_LEVEL_4[0];

      const exercises: Exercise[] = [
        // 1. Reading Passage with Summary (Displayed in English)
        {
          id: `ex-${lessonId}-1`,
          lesson_id: lessonId,
          exercise_type: 'reading',
          prompt_en: `Read the 5-line paragraph and review its English summary:`,
          prompt_ta: `இப்பத்தியைப் படித்து அதன் சுருக்கத்தை அறிக:`,
          sequence_order: 1,
          questions: [
            {
              id: `q-${lessonId}-1`,
              exercise_id: `ex-${lessonId}-1`,
              exercise_type: 'reading',
              prompt_en: `Title: ${targetP.title_en} (Summary: ${targetP.summary_en})`,
              prompt_ta: `தலைப்பு: ${targetP.title_ta}`,
              content_ta: `${targetP.paragraph_ta}\n\n[Summary in English]: ${targetP.summary_en}`,
              content_tanglish: targetP.tanglish,
              content_en: targetP.summary_en,
              correct_answer: 'listened',
              explanation_en: `Summary: ${targetP.summary_en}`,
              explanation_ta: `சுருக்கம்: ${targetP.summary_ta}`,
              audio_id: `para_${targetP.id}`,
              options: [
                { id: `opt-p-1`, option_text: 'முழுமையாக வாசித்தேன் (I have read completely)', is_correct: true },
                { id: `opt-p-2`, option_text: 'மீண்டும் வாசிக்க வேண்டும் (Read again)', is_correct: false },
              ],
            },
          ],
        },

        // 2. Speaking Assessment (Connected Sentences)
        {
          id: `ex-${lessonId}-2`,
          lesson_id: lessonId,
          exercise_type: 'speaking',
          prompt_en: `Practice speaking a connected sentence from the paragraph:`,
          prompt_ta: `பத்தியிலிருந்து ஒரு தொடர் வாக்கியத்தைப் பேசிப் பழகுங்கள்:`,
          sequence_order: 2,
          questions: [
            {
              id: `q-${lessonId}-2`,
              exercise_id: `ex-${lessonId}-2`,
              exercise_type: 'speaking',
              prompt_en: `Speak: "${targetP.sentences[0] || targetP.title_ta}"`,
              prompt_ta: `பேசவும்: "${targetP.sentences[0] || targetP.title_ta}"`,
              content_ta: targetP.sentences[0] || targetP.paragraph_ta.split('.')[0] + '.',
              content_tanglish: targetP.tanglish.split('.')[0],
              content_en: `From ${targetP.title_en}: ${targetP.summary_en}`,
              correct_answer: 'recorded',
              explanation_en: `Impressive speaking! You articulated a complete multi-word connected sentence fluently.`,
              explanation_ta: `அற்புதம்! முழுத் தொடர் வாக்கியத்தையும் மிகத் தெளிவாகப் பேசி முடித்தீர்கள்.`,
              audio_id: `para_${targetP.id}`,
            },
          ],
        },

        // 3. Writing / Tracing Assessment
        {
          id: `ex-${lessonId}-3`,
          lesson_id: lessonId,
          exercise_type: 'tracing',
          prompt_en: `Writing Practice: Trace the central theme word from the paragraph:`,
          prompt_ta: `எழுத்துப் பயிற்சி: இப்பத்தியின் முக்கிய மையச் சொல்லை விரலால் எழுதுக:`,
          sequence_order: 3,
          questions: [
            {
              id: `q-${lessonId}-3`,
              exercise_id: `ex-${lessonId}-3`,
              exercise_type: 'tracing',
              prompt_en: `Write theme word`,
              prompt_ta: `மையச் சொல்லை வரைக`,
              content_ta: targetP.title_ta,
              content_tanglish: targetP.title_en,
              content_en: `Write theme: ${targetP.title_en}`,
              correct_answer: 'completed',
              explanation_en: `Excellent writing! Tracing builds writing confidence for longer Tamil passages.`,
              explanation_ta: `அருமை! மையச் சொல்லை மிக அழகாக எழுதி முடித்துள்ளீர்கள்.`,
              audio_id: `para_${targetP.id}`,
              tracing_data: {
                letter: targetP.title_ta.split(' ')[0] || 'தமிழ்',
                outline_path: '',
              },
            },
          ],
        },

        // 4. Reading Comprehension Assessment MCQ
        {
          id: `ex-${lessonId}-4`,
          lesson_id: lessonId,
          exercise_type: 'mcq',
          prompt_en: `Assessment: What is the primary moral or takeaway of "${targetP.title_en}"?`,
          prompt_ta: `மதிப்பீடு: "${targetP.title_ta}" என்பதன் முதன்மைக் கருத்து என்ன?`,
          sequence_order: 4,
          questions: [
            {
              id: `q-${lessonId}-4`,
              exercise_id: `ex-${lessonId}-4`,
              exercise_type: 'mcq',
              prompt_en: `Select the correct summary conclusion:`,
              prompt_ta: `சரியான சுருக்கத் தெரிவைத் தேர்ந்தெடுக்கவும்:`,
              content_ta: targetP.title_ta,
              content_tanglish: targetP.title_en,
              correct_answer: targetP.summary_en,
              explanation_en: `Well done! Based on the summary: ${targetP.summary_en}.`,
              explanation_ta: `மிகச் சரி! பத்தியின் சுருக்கத்தின்படி: ${targetP.summary_ta}.`,
              audio_id: `para_${targetP.id}`,
              options: [
                {
                  id: `opt-comp-1`,
                  option_text: targetP.summary_en,
                  is_correct: true,
                },
                {
                  id: `opt-comp-2`,
                  option_text: 'It describes an imaginary space voyage to distant galaxies.',
                  is_correct: false,
                },
                {
                  id: `opt-comp-3`,
                  option_text: 'It teaches how to cook traditional south Indian recipes.',
                  is_correct: false,
                },
              ],
            },
          ],
        },
      ];

      return exercises;
    }

    // ══════════════════════════════════════════════════════════════════════════
    // LEVEL 1 (AND 0) — TAMIL LETTERS (Exclusively Letters, All 240+ Retained)
    // ══════════════════════════════════════════════════════════════════════════
    let targetLetters: TamilLetterInfo[] = ALL_247_TAMIL_LETTERS;

    // Pick 3-4 distinct letters for this lesson based on lesson sequence order
    const seq = lesson ? lesson.sequence_order : 1;
    const startIndex = ((seq - 1) * 3) % Math.max(1, targetLetters.length);
    const selected = [
      targetLetters[startIndex % targetLetters.length],
      targetLetters[(startIndex + 1) % targetLetters.length],
      targetLetters[(startIndex + 2) % targetLetters.length],
    ].filter(Boolean);

    const primaryLetter = selected[0] || UYIR_LETTERS[0];
    const secondaryLetter = selected[1] || UYIR_LETTERS[1];
    const tertiaryLetter = selected[2] || UYIR_LETTERS[2];

    const exercises: Exercise[] = [
      // 1. FlipCard Phonics Card for Primary Letter (Strictly letter only, no words like "அம்மா")
      {
        id: `ex-${lessonId}-1`,
        lesson_id: lessonId,
        exercise_type: 'vocab_card',
        prompt_en: `Listen and learn letter "${primaryLetter.letter}" (${primaryLetter.tanglish}):`,
        prompt_ta: `"${primaryLetter.letter}" எழுத்தின் ஒலியைக் கேளுங்கள்:`,
        sequence_order: 1,
        questions: [
          {
            id: `q-${lessonId}-1`,
            exercise_id: `ex-${lessonId}-1`,
            exercise_type: 'vocab_card',
            prompt_en: `Letter ${primaryLetter.letter}`,
            prompt_ta: `${primaryLetter.letter} எழுத்துப் பயிற்சி`,
            content_ta: primaryLetter.letter,
            content_tanglish: primaryLetter.tanglish,
            content_en: `${primaryLetter.categoryLabelEn} • Sound: "${primaryLetter.tanglish}"`,
            correct_answer: 'listened',
            explanation_en: `${primaryLetter.letter} makes the sound "${primaryLetter.tanglish}". Category: ${primaryLetter.categoryLabelEn}.`,
            explanation_ta: `"${primaryLetter.letter}" என்பது ${primaryLetter.categoryLabelTa}.`,
            audio_id: `letter_${primaryLetter.id}`,
          },
        ],
      },

      // 2. Interactive Letter Tracing with 75% accuracy validator
      {
        id: `ex-${lessonId}-2`,
        lesson_id: lessonId,
        exercise_type: 'tracing',
        prompt_en: `Trace the letter "${primaryLetter.letter}" on the canvas:`,
        prompt_ta: `"${primaryLetter.letter}" எழுத்தை அழகாக வரைக (75% துல்லியம் தேவை):`,
        sequence_order: 2,
        questions: [
          {
            id: `q-${lessonId}-2`,
            exercise_id: `ex-${lessonId}-2`,
            exercise_type: 'tracing',
            prompt_en: `Trace letter ${primaryLetter.letter} (${primaryLetter.tanglish})`,
            prompt_ta: `${primaryLetter.letter} எழுத்தை வரைக`,
            content_ta: primaryLetter.letter,
            content_tanglish: primaryLetter.tanglish,
            content_en: `Trace letter ${primaryLetter.letter}`,
            correct_answer: 'completed',
            explanation_en: `Great job tracing "${primaryLetter.letter}"! Practice builds script muscle memory.`,
            explanation_ta: `அருமை! "${primaryLetter.letter}" எழுத்தை மிக அழகாக வரைந்துள்ளீர்கள்.`,
            audio_id: `letter_${primaryLetter.id}`,
            tracing_data: {
              letter: primaryLetter.letter,
              outline_path: '',
            },
          },
        ],
      },

      // 3. Speaking Practice for the Letter
      {
        id: `ex-${lessonId}-3`,
        lesson_id: lessonId,
        exercise_type: 'speaking',
        prompt_en: `Speak the letter "${primaryLetter.letter}" (${primaryLetter.tanglish}) into the microphone:`,
        prompt_ta: `"${primaryLetter.letter}" எழுத்தின் ஒலியை மைக்ரோஃபோனில் பேசிப் பழகுங்கள்:`,
        sequence_order: 3,
        questions: [
          {
            id: `q-${lessonId}-3`,
            exercise_id: `ex-${lessonId}-3`,
            exercise_type: 'speaking',
            prompt_en: `Speak letter: ${primaryLetter.letter}`,
            prompt_ta: `பேசவும்: ${primaryLetter.letter}`,
            content_ta: primaryLetter.letter,
            content_tanglish: primaryLetter.tanglish,
            content_en: `Letter ${primaryLetter.letter} (${primaryLetter.tanglish})`,
            correct_answer: 'recorded',
            explanation_en: `Brilliant! You pronounced the letter "${primaryLetter.letter}" clearly.`,
            explanation_ta: `அற்புதம்! "${primaryLetter.letter}" எழுத்தின் ஒலியைத் துல்லியமாக உச்சரித்தீர்கள்.`,
            audio_id: `letter_${primaryLetter.id}`,
          },
        ],
      },

      // 4. MCQ Letter Recognition
      {
        id: `ex-${lessonId}-4`,
        lesson_id: lessonId,
        exercise_type: 'mcq',
        prompt_en: `Which of the following is the Tamil letter "${primaryLetter.letter}" (${primaryLetter.tanglish})?`,
        prompt_ta: `இவற்றுள் "${primaryLetter.letter}" (${primaryLetter.tanglish}) எழுத்து எது?`,
        sequence_order: 4,
        questions: [
          {
            id: `q-${lessonId}-4`,
            exercise_id: `ex-${lessonId}-4`,
            exercise_type: 'mcq',
            prompt_en: `Select letter ${primaryLetter.letter}:`,
            prompt_ta: `"${primaryLetter.letter}" எழுத்தைத் தேர்ந்தெடுக்கவும்:`,
            content_ta: primaryLetter.letter,
            content_tanglish: primaryLetter.tanglish,
            correct_answer: `${primaryLetter.letter} (${primaryLetter.tanglish})`,
            explanation_en: `Spot on! "${primaryLetter.letter}" corresponds to "${primaryLetter.tanglish}".`,
            explanation_ta: `மிகச் சரி! "${primaryLetter.letter}" என்பது சரியான விடை.`,
            audio_id: `letter_${primaryLetter.id}`,
            options: [
              {
                id: `opt-${lessonId}-1`,
                option_text: `${primaryLetter.letter} (${primaryLetter.tanglish})`,
                option_tanglish: primaryLetter.tanglish,
                is_correct: true,
                audio_id: `letter_${primaryLetter.id}`,
              },
              {
                id: `opt-${lessonId}-2`,
                option_text: `${secondaryLetter.letter} (${secondaryLetter.tanglish})`,
                option_tanglish: secondaryLetter.tanglish,
                is_correct: false,
                audio_id: `letter_${secondaryLetter.id}`,
              },
              {
                id: `opt-${lessonId}-3`,
                option_text: `${tertiaryLetter.letter} (${tertiaryLetter.tanglish})`,
                option_tanglish: tertiaryLetter.tanglish,
                is_correct: false,
                audio_id: `letter_${tertiaryLetter.id}`,
              },
            ],
          },
        ],
      },

      // 5. Letter-Sound Matching
      {
        id: `ex-${lessonId}-5`,
        lesson_id: lessonId,
        exercise_type: 'matching',
        prompt_en: 'Match each Tamil letter with its phonetic sound:',
        prompt_ta: 'தமிழ் எழுத்துக்களை அவற்றின் ஒலியுடன் பொருத்துக:',
        sequence_order: 5,
        questions: [
          {
            id: `q-${lessonId}-5`,
            exercise_id: `ex-${lessonId}-5`,
            exercise_type: 'matching',
            prompt_en: 'Match letters:',
            prompt_ta: 'பொருத்துக:',
            content_ta: 'எழுத்துப் பொருத்துதல்',
            correct_answer: 'matched',
            explanation_en: 'Superb! You correctly identified all the letter sounds.',
            explanation_ta: 'அற்புதம்! அனைத்து எழுத்து ஒலிகளையும் சரியாகப் பொருத்தினீர்கள்.',
            pairs: [
              { id: 'p1', left_ta: primaryLetter.letter, right_en: primaryLetter.tanglish, audio_id: `letter_${primaryLetter.id}` },
              { id: 'p2', left_ta: secondaryLetter.letter, right_en: secondaryLetter.tanglish, audio_id: `letter_${secondaryLetter.id}` },
              { id: 'p3', left_ta: tertiaryLetter.letter, right_en: tertiaryLetter.tanglish, audio_id: `letter_${tertiaryLetter.id}` },
            ],
          },
        ],
      },
    ];

    return exercises;
  }
}

export const curriculumService = new CurriculumService();
