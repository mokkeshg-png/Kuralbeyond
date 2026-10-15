import { LearningLevel, Lesson, Exercise } from '../types';
import { LEARNING_LEVELS, ALL_LESSONS, LESSON_EXERCISES } from '../data/curriculumData';
import { LocalStorageAdapter } from './storageAdapter';
import { SupabaseAdapter } from './supabaseAdapter';

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

      // Unlock rule: Level 0 and 1 are unlocked by default. Level N unlocked if Level N-1 has at least 1 completed lesson or is completed.
      let isUnlocked = level.level_number <= 1;
      if (level.level_number > 1) {
        const prevLevelLessons = ALL_LESSONS.filter(l => l.level_number === level.level_number - 1);
        const prevCompleted = prevLevelLessons.filter(l => completedLessonIds.has(l.id)).length;
        if (prevCompleted > 0) {
          isUnlocked = true;
        }
      }

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

    if (LESSON_EXERCISES[lessonId] && LESSON_EXERCISES[lessonId].length > 0) {
      return LESSON_EXERCISES[lessonId];
    }


    const lesson = ALL_LESSONS.find(l => l.id === lessonId);
    const titleTa = lesson ? lesson.title_ta : 'தமிழ் பாடம்';
    const titleEn = lesson ? lesson.title_en : 'Tamil Lesson';

    // Extract a clean, concise focus term to avoid long title overflow in cards
    const focusTa = titleTa.includes(':') ? titleTa.split(':')[1].trim() : titleTa;
    const focusEn = titleEn.includes(':') ? titleEn.split(':')[1].trim() : titleEn;

    return [
      {
        id: `ex-${lessonId}-1`,
        lesson_id: lessonId,
        exercise_type: 'vocab_card',
        prompt_en: `Explore key vocabulary for ${titleEn}:`,
        prompt_ta: `${titleTa} பற்றிய முக்கிய சொற்களைக் கேளுங்கள்:`,
        sequence_order: 1,
        questions: [
          {
            id: `q-${lessonId}-1`,
            exercise_id: `ex-${lessonId}-1`,
            exercise_type: 'vocab_card',
            prompt_en: titleEn,
            prompt_ta: titleTa,
            content_ta: focusTa,
            content_tanglish: focusEn,
            content_en: titleEn,
            correct_answer: 'listened',
            explanation_en: `Introduction to ${titleEn}. Practice speaking and listening to master this topic!`,
            explanation_ta: `${titleTa} பாடம். ஒலிவழிக் கேட்டுப் பேசிப் பழகுங்கள்!`,
            audio_id: 'vocab_vanakkam',
          },
        ],
      },
      {
        id: `ex-${lessonId}-2`,
        lesson_id: lessonId,
        exercise_type: 'mcq',
        prompt_en: `Test your understanding of ${titleEn}:`,
        prompt_ta: `${titleTa} பற்றிய வினா:`,
        sequence_order: 2,
        questions: [
          {
            id: `q-${lessonId}-2`,
            exercise_id: `ex-${lessonId}-2`,
            exercise_type: 'mcq',
            prompt_en: 'Choose the correct Tamil representation:',
            prompt_ta: 'சரியான விடையைத் தேர்ந்தெடுக்கவும்:',
            content_ta: focusTa,
            content_tanglish: focusEn,
            correct_answer: focusTa,
            explanation_en: 'Excellent! You picked the accurate answer.',
            explanation_ta: 'மிக நன்று! சரியான விடையைத் தேர்ந்தெடுத்தீர்கள்.',
            audio_id: 'vocab_vanakkam',
            options: [
              { id: 'opt-f-1', option_text: focusTa, option_tanglish: 'Correct', is_correct: true, audio_id: 'vocab_vanakkam' },
              { id: 'opt-f-2', option_text: 'வணக்கம்', option_tanglish: 'Hello', is_correct: false, audio_id: 'vocab_vanakkam' },
              { id: 'opt-f-3', option_text: 'நன்றி', option_tanglish: 'Thank you', is_correct: false, audio_id: 'vocab_nandri' },
              { id: 'opt-f-4', option_text: 'அம்மா', option_tanglish: 'Mother', is_correct: false, audio_id: 'vocab_amma' },
            ],
          },
        ],
      },
      {
        id: `ex-${lessonId}-3`,
        lesson_id: lessonId,
        exercise_type: 'matching',
        prompt_en: 'Match these essential Tamil words with English meanings:',
        prompt_ta: 'சொற்களை அவற்றின் ஆங்கிலப் பொருளுடன் பொருத்துக:',
        sequence_order: 3,
        questions: [
          {
            id: `q-${lessonId}-3`,
            exercise_id: `ex-${lessonId}-3`,
            exercise_type: 'matching',
            prompt_en: 'Match pairs:',
            prompt_ta: 'பொருத்துக:',
            content_ta: 'சொற்கள்',
            correct_answer: 'matched',
            explanation_en: 'Superb! All pairs matched accurately.',
            explanation_ta: 'அருமை! அனைத்துச் சொற்களையும் சரியாகப் பொருத்தினீர்கள்.',
            pairs: [
              { id: 'p1', left_ta: 'வணக்கம்', right_en: 'Hello', audio_id: 'vocab_vanakkam' },
              { id: 'p2', left_ta: 'நன்றி', right_en: 'Thank you', audio_id: 'vocab_nandri' },
              { id: 'p3', left_ta: 'அம்மா', right_en: 'Mother', audio_id: 'vocab_amma' },
              { id: 'p4', left_ta: 'அன்பு', right_en: 'Love', audio_id: 'vocab_anbu' },
            ],
          },
        ],
      },
      {
        id: `ex-${lessonId}-4`,
        lesson_id: lessonId,
        exercise_type: 'speaking',
        prompt_en: `Pronunciation Practice for ${titleEn}. Tap record and say:`,
        prompt_ta: 'பேசிப் பழகுங்கள். ஒலிப்பதிவைத் தட்டிப் பேசுங்கள்:',
        sequence_order: 4,
        questions: [
          {
            id: `q-${lessonId}-4`,
            exercise_id: `ex-${lessonId}-4`,
            exercise_type: 'speaking',
            prompt_en: `Speak: ${titleTa}`,
            prompt_ta: `பேசவும்: ${titleTa}`,
            content_ta: titleTa,
            content_tanglish: 'vanakkam',
            content_en: titleEn,
            correct_answer: 'recorded',
            explanation_en: 'Great job practicing your spoken Tamil pronunciation!',
            explanation_ta: 'அருமை! உங்கள் உச்சரிப்புப் பயிற்சி சிறப்பாக முடிந்தது.',
            audio_id: 'vocab_vanakkam',
          },
        ],
      },
    ];
  }
}

export const curriculumService = new CurriculumService();
