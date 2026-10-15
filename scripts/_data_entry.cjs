"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// scripts/_data_entry.ts
var data_entry_exports = {};
__export(data_entry_exports, {
  ALL_LESSONS: () => ALL_LESSONS,
  ASSESSMENT_QUESTIONS: () => ASSESSMENT_QUESTIONS,
  AUDIO_MANIFEST: () => AUDIO_MANIFEST,
  INITIAL_BADGES: () => INITIAL_BADGES,
  INITIAL_MISSIONS: () => INITIAL_MISSIONS,
  LEARNING_LEVELS: () => LEARNING_LEVELS,
  LESSON_EXERCISES: () => LESSON_EXERCISES
});
module.exports = __toCommonJS(data_entry_exports);

// src/data/curriculumData.ts
var LEARNING_LEVELS = [
  {
    id: "level-0",
    level_number: 0,
    title_en: "Tamil Discovery",
    title_ta: "\u0BA4\u0BCA\u0B9F\u0B95\u0BCD\u0B95 \u0BA8\u0BBF\u0BB2\u0BC8",
    description_en: "Discover the ancient beauty of Tamil script, phonics, and everyday greetings.",
    description_ta: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B85\u0BB4\u0B95\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B87\u0BA9\u0BBF\u0BAF \u0B92\u0BB2\u0BBF\u0B95\u0BB3\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BA4\u0BCA\u0B9F\u0B95\u0BCD\u0B95 \u0BA8\u0BBF\u0BB2\u0BC8\u0BAF\u0BBF\u0BB2\u0BC7\u0BAF\u0BC7 \u0B89\u0BA3\u0BB0\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
    cefr: "Pre-A1",
    estimated_minutes: 15,
    total_lessons: 3,
    completed_lessons: 0,
    is_unlocked: true,
    is_completed: false,
    icon: "Sparkles"
  },
  {
    id: "level-1",
    level_number: 1,
    title_en: "Vowels & Basic Consonants",
    title_ta: "\u0B89\u0BAF\u0BBF\u0BB0\u0BC1\u0BAE\u0BCD \u0BAE\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0BAE\u0BCD",
    description_en: "Learn all 12 Uyir vowels (\u0B85\u2013\u0B94), the Aytham (\u0B83), and fundamental consonants with tracing.",
    description_ta: "12 \u0B89\u0BAF\u0BBF\u0BB0\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD, \u0B86\u0BAF\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 (\u0B83) \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B85\u0B9F\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC8 \u0BAE\u0BC6\u0BAF\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BB1\u0BCD\u0BB1\u0BC1 \u0BB5\u0BB0\u0BC8\u0B95.",
    cefr: "Pre-A1",
    estimated_minutes: 45,
    total_lessons: 5,
    completed_lessons: 0,
    is_unlocked: true,
    is_completed: false,
    icon: "BookOpen"
  },
  {
    id: "level-2",
    level_number: 2,
    title_en: "First Words & Everyday Life",
    title_ta: "\u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BCD",
    description_en: "Explore 50+ core words: family, greetings, numbers, vibrant colors, animals, and food.",
    description_ta: "\u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA\u0BAE\u0BCD, \u0BB5\u0BBE\u0BB4\u0BCD\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BB3\u0BCD, \u0B8E\u0BA3\u0BCD\u0B95\u0BB3\u0BCD, \u0BB5\u0BA3\u0BCD\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BCD, \u0BB5\u0BBF\u0BB2\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B89\u0BA3\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0BA4\u0BCD\u0BA4 50+ \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BCD.",
    cefr: "A1 (Receptive)",
    estimated_minutes: 60,
    total_lessons: 6,
    completed_lessons: 0,
    is_unlocked: false,
    is_completed: false,
    icon: "Grid"
  },
  {
    id: "level-3",
    level_number: 3,
    title_en: "Syllables & Early Reading",
    title_ta: "\u0B89\u0BAF\u0BBF\u0BB0\u0BCD\u0BAE\u0BC6\u0BAF\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD",
    description_en: "Combine vowels and consonants into Uyirmei syllables to read simple 2\u20133 letter words.",
    description_ta: "\u0B89\u0BAF\u0BBF\u0BB0\u0BCD\u0BAE\u0BC6\u0BAF\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BC8 \u0B87\u0BA3\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0B8E\u0BB3\u0BBF\u0BAF 2\u20133 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC8 \u0BB5\u0BBE\u0B9A\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD \u0BAA\u0BB4\u0B95\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
    cefr: "A1",
    estimated_minutes: 60,
    total_lessons: 5,
    completed_lessons: 0,
    is_unlocked: false,
    is_completed: false,
    icon: "Puzzle"
  },
  {
    id: "level-4",
    level_number: 4,
    title_en: "Simple Sentences & Self",
    title_ta: "\u0B8E\u0BB3\u0BBF\u0BAF \u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BAF\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
    description_en: "Build Subject-Object-Verb sentences, introduce yourself, and ask everyday questions.",
    description_ta: "\u0B8E\u0BB3\u0BBF\u0BAF \u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BAF\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B85\u0BAE\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BC8 \u0B85\u0BB1\u0BBF\u0BAE\u0BC1\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF \u0B95\u0BC7\u0BB3\u0BCD\u0BB5\u0BBF\u0B95\u0BB3\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
    cefr: "A1+",
    estimated_minutes: 75,
    total_lessons: 5,
    completed_lessons: 0,
    is_unlocked: false,
    is_completed: false,
    icon: "Layers"
  },
  {
    id: "level-5",
    level_number: 5,
    title_en: "Conversations & Daily Life",
    title_ta: "\u0B89\u0BB0\u0BC8\u0BAF\u0BBE\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BCD",
    description_en: "Follow practical dialogues: school life, market visits, and polite social requests.",
    description_ta: "\u0BAA\u0BB3\u0BCD\u0BB3\u0BBF \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B9A\u0BA8\u0BCD\u0BA4\u0BC8 \u0B9A\u0BC2\u0BB4\u0BB2\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BA8\u0B9F\u0BC8\u0BAE\u0BC1\u0BB1\u0BC8 \u0B89\u0BB0\u0BC8\u0BAF\u0BBE\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B9F\u0BC1\u0BAA\u0BCD \u0BAA\u0BC1\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1 \u0B95\u0BCA\u0BB3\u0BCD\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
    cefr: "A2 (Listening)",
    estimated_minutes: 80,
    total_lessons: 4,
    completed_lessons: 0,
    is_unlocked: false,
    is_completed: false,
    icon: "MessageCircle"
  },
  {
    id: "level-6",
    level_number: 6,
    title_en: "Stories & Reading",
    title_ta: "\u0B95\u0BA4\u0BC8\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0BB5\u0BBE\u0B9A\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0BAE\u0BCD",
    description_en: "Read short heritage paragraphs and cultural stories with comprehension quizzes.",
    description_ta: "\u0B95\u0BBE\u0B95\u0BAE\u0BC1\u0BAE\u0BCD \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BC1\u0BAE\u0BCD, \u0BAA\u0BCA\u0B99\u0BCD\u0B95\u0BB2\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBF\u0BB4\u0BBE \u0BAA\u0BCB\u0BA9\u0BCD\u0BB1 \u0B9A\u0BBF\u0BB1\u0BC1 \u0B95\u0BA4\u0BC8\u0B95\u0BB3\u0BC8\u0BAA\u0BCD \u0BAA\u0B9F\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1\u0BAA\u0BCD \u0BAA\u0BC1\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0B95\u0BCA\u0BB3\u0BCD\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
    cefr: "A2",
    estimated_minutes: 90,
    total_lessons: 4,
    completed_lessons: 0,
    is_unlocked: false,
    is_completed: false,
    icon: "Feather"
  },
  {
    id: "level-7",
    level_number: 7,
    title_en: "Real-World Tamil & Heritage",
    title_ta: "\u0BA8\u0B9F\u0BC8\u0BAE\u0BC1\u0BB1\u0BC8\u0BA4\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",
    description_en: "Complete real-life family missions, explore Thirukkural wisdom, and express thoughts.",
    description_ta: "\u0BA4\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BB1\u0BB3\u0BCD \u0BA8\u0BB2\u0BCD\u0BB5\u0BB4\u0BBF\u0B95\u0BB3\u0BCD, \u0BAA\u0BB4\u0BAE\u0BCA\u0BB4\u0BBF\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA8\u0B9F\u0BC8\u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BCD \u0BAA\u0BA3\u0BBF\u0B95\u0BB3\u0BC1\u0B9F\u0BA9\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B86\u0BB3\u0BC1\u0BAE\u0BC8 \u0BAA\u0BC6\u0BB1\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
    cefr: "A2+",
    estimated_minutes: 90,
    total_lessons: 4,
    completed_lessons: 0,
    is_unlocked: false,
    is_completed: false,
    icon: "Award"
  }
];
var ALL_LESSONS = [
  // Level 0 Lessons
  {
    id: "lesson-0-1",
    level_id: "level-0",
    level_number: 0,
    title_en: "The Tamil Sound World",
    title_ta: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B92\u0BB2\u0BBF \u0B89\u0BB2\u0B95\u0BAE\u0BCD",
    description_en: "Introduction to Tamil sounds and greeting with Vanakkam.",
    description_ta: '\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B92\u0BB2\u0BBF\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B85\u0BB1\u0BBF\u0BAE\u0BC1\u0B95\u0BAE\u0BC1\u0BAE\u0BCD "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD" \u0B95\u0BC2\u0BB1\u0BBF \u0BB5\u0BBE\u0BB4\u0BCD\u0BA4\u0BCD\u0BA4\u0BC1\u0BB5\u0BA4\u0BC1\u0BAE\u0BCD.',
    sequence_order: 1,
    lesson_type: "vocabulary",
    estimated_minutes: 5,
    tanglish_stage: "A",
    items_count: 5,
    is_completed: false
  },
  {
    id: "lesson-0-2",
    level_id: "level-0",
    level_number: 0,
    title_en: "Script Discovery",
    title_ta: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD",
    description_en: "Recognize the curvy, circular shapes of Tamil letters.",
    description_ta: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B85\u0BB4\u0B95\u0BBF\u0BAF \u0BB5\u0B9F\u0BCD\u0B9F \u0BB5\u0B9F\u0BBF\u0BB5\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B85\u0BB1\u0BBF\u0BA4\u0BB2\u0BCD.",
    sequence_order: 2,
    lesson_type: "letters",
    estimated_minutes: 5,
    tanglish_stage: "A",
    items_count: 5,
    is_completed: false
  },
  // Level 1 Lessons
  {
    id: "lesson-1-1",
    level_id: "level-1",
    level_number: 1,
    title_en: "First Vowels: \u0B85 & \u0B86",
    title_ta: "\u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD: \u0B85 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B86",
    description_en: 'Short "a" and long "aa" with tracing, audio phonics, and example words.',
    description_ta: '"\u0B85" \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD "\u0B86" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B92\u0BB2\u0BBF \u0BB5\u0BC7\u0BB1\u0BC1\u0BAA\u0BBE\u0B9F\u0BC1\u0BAE\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BC1\u0BA4\u0BB2\u0BC1\u0BAE\u0BCD.',
    sequence_order: 1,
    lesson_type: "letters",
    estimated_minutes: 8,
    tanglish_stage: "A",
    items_count: 6,
    is_completed: false
  },
  {
    id: "lesson-1-2",
    level_id: "level-1",
    level_number: 1,
    title_en: "Vowels: \u0B87 & \u0B88",
    title_ta: "\u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD: \u0B87 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B88",
    description_en: 'Short "i" and long "ee" with interactive outline tracing.',
    description_ta: '"\u0B87" \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD "\u0B88" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B92\u0BB2\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD \u0BB5\u0BB0\u0BC8\u0BA4\u0BB2\u0BCD \u0BAA\u0BAF\u0BBF\u0BB1\u0BCD\u0B9A\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD.',
    sequence_order: 2,
    lesson_type: "letters",
    estimated_minutes: 8,
    tanglish_stage: "A",
    items_count: 6,
    is_completed: false
  },
  {
    id: "lesson-1-3",
    level_id: "level-1",
    level_number: 1,
    title_en: "Vowels: \u0B89 & \u0B8A",
    title_ta: "\u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD: \u0B89 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B8A",
    description_en: 'Rounded vowels "u" and "oo" with audio comparison.',
    description_ta: '"\u0B89" \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD "\u0B8A" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B87\u0BA9\u0BBF\u0BAF \u0B92\u0BB2\u0BBF\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC1\u0BAE\u0BCD.',
    sequence_order: 3,
    lesson_type: "letters",
    estimated_minutes: 8,
    tanglish_stage: "A",
    items_count: 6,
    is_completed: false
  },
  {
    id: "lesson-1-4",
    level_id: "level-1",
    level_number: 1,
    title_en: "Vowels: \u0B8E, \u0B8F, \u0B90, \u0B92, \u0B93, \u0B94",
    title_ta: "\u0BAE\u0BC0\u0BA4\u0BAE\u0BC1\u0BB3\u0BCD\u0BB3 \u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD",
    description_en: "Master the remaining vowels and discover their unique rhythm.",
    description_ta: "\u0B8E, \u0B8F, \u0B90, \u0B92, \u0B93, \u0B94 \u0B86\u0B95\u0BBF\u0BAF \u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BC8\u0BAA\u0BCD \u0BAA\u0BAF\u0BBF\u0BB2\u0BC1\u0BA4\u0BB2\u0BCD.",
    sequence_order: 4,
    lesson_type: "letters",
    estimated_minutes: 10,
    tanglish_stage: "A",
    items_count: 6,
    is_completed: false
  },
  {
    id: "lesson-1-5",
    level_id: "level-1",
    level_number: 1,
    title_en: "The Aytham Letter: \u0B83 (Ak)",
    title_ta: "\u0B86\u0BAF\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1: \u0B83",
    description_en: "Learn the special 3-dot Aytham letter and first consonants (\u0B95\u0BCD, \u0B9F\u0BCD).",
    description_ta: "\u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BBE\u0BB2\u0BBE\u0BA9 \u0B86\u0BAF\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 (\u0B83) \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAE\u0BC6\u0BAF\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD.",
    sequence_order: 5,
    lesson_type: "letters",
    estimated_minutes: 8,
    tanglish_stage: "B",
    items_count: 6,
    is_completed: false
  },
  // Level 2 Lessons
  {
    id: "lesson-2-1",
    level_id: "level-2",
    level_number: 2,
    title_en: "Family & Loved Ones",
    title_ta: "\u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0B89\u0BB1\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
    description_en: "Learn \u0B85\u0BAE\u0BCD\u0BAE\u0BBE (amma), \u0B85\u0BAA\u0BCD\u0BAA\u0BBE (appa), \u0B85\u0B95\u0BCD\u0B95\u0BBE (akka), \u0B85\u0BA3\u0BCD\u0BA3\u0BA9\u0BCD (annan).",
    description_ta: "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE, \u0B85\u0BAA\u0BCD\u0BAA\u0BBE, \u0B85\u0B95\u0BCD\u0B95\u0BBE, \u0B85\u0BA3\u0BCD\u0BA3\u0BA9\u0BCD \u0BAA\u0BCB\u0BA9\u0BCD\u0BB1 \u0B87\u0BA9\u0BBF\u0BAF \u0B89\u0BB1\u0BB5\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BCD.",
    sequence_order: 1,
    lesson_type: "vocabulary",
    estimated_minutes: 10,
    tanglish_stage: "B",
    items_count: 6,
    is_completed: false
  },
  {
    id: "lesson-2-2",
    level_id: "level-2",
    level_number: 2,
    title_en: "Counting 1 to 5",
    title_ta: "\u0B8E\u0BA3\u0BCD\u0B95\u0BB3\u0BCD 1 \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD 5 \u0BB5\u0BB0\u0BC8",
    description_en: "\u0B92\u0BA9\u0BCD\u0BB1\u0BC1 (ondru), \u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1 (irandu), \u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1 (moondru), \u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BC1, \u0B90\u0BA8\u0BCD\u0BA4\u0BC1.",
    description_ta: "\u0B92\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0B90\u0BA8\u0BCD\u0BA4\u0BC1 \u0BB5\u0BB0\u0BC8\u0BAF\u0BBF\u0BB2\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BB1\u0BCD\u0BB1\u0BB2\u0BCD.",
    sequence_order: 2,
    lesson_type: "vocabulary",
    estimated_minutes: 8,
    tanglish_stage: "B",
    items_count: 6,
    is_completed: false
  },
  {
    id: "lesson-2-3",
    level_id: "level-2",
    level_number: 2,
    title_en: "Rainbow of Colors",
    title_ta: "\u0BB5\u0BA3\u0BCD\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B89\u0BB2\u0B95\u0BAE\u0BCD",
    description_en: "\u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1 (sivappu - red), \u0BAA\u0B9A\u0BCD\u0B9A\u0BC8 (pachai - green), \u0BA8\u0BC0\u0BB2\u0BAE\u0BCD (neelam - blue), \u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD (manjal - yellow).",
    description_ta: "\u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1, \u0BAA\u0B9A\u0BCD\u0B9A\u0BC8, \u0BA8\u0BC0\u0BB2\u0BAE\u0BCD, \u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD \u0BAA\u0BCB\u0BA9\u0BCD\u0BB1 \u0BAE\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BAF \u0BB5\u0BA3\u0BCD\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
    sequence_order: 3,
    lesson_type: "vocabulary",
    estimated_minutes: 8,
    tanglish_stage: "B",
    items_count: 6,
    is_completed: false
  },
  {
    id: "lesson-2-4",
    level_id: "level-2",
    level_number: 2,
    title_en: "Animals & Pets",
    title_ta: "\u0BB5\u0BBF\u0BB2\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B9A\u0BC6\u0BB2\u0BCD\u0BB2\u0BAA\u0BCD \u0BAA\u0BBF\u0BB0\u0BBE\u0BA3\u0BBF\u0B95\u0BB3\u0BC1\u0BAE\u0BCD",
    description_en: "\u0BA8\u0BBE\u0BAF\u0BCD (naai), \u0BAA\u0BC2\u0BA9\u0BC8 (poonai), \u0B95\u0BBF\u0BB3\u0BBF (kili), \u0BAF\u0BBE\u0BA9\u0BC8 (yaanai).",
    description_ta: "\u0BA8\u0BBE\u0BAF\u0BCD, \u0BAA\u0BC2\u0BA9\u0BC8, \u0B95\u0BBF\u0BB3\u0BBF \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAF\u0BBE\u0BA9\u0BC8 \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BB1\u0BCD\u0BB1\u0BB2\u0BCD.",
    sequence_order: 4,
    lesson_type: "vocabulary",
    estimated_minutes: 8,
    tanglish_stage: "B",
    items_count: 6,
    is_completed: false
  },
  {
    id: "lesson-2-5",
    level_id: "level-2",
    level_number: 2,
    title_en: "Delicious Food & Drinks",
    title_ta: "\u0B89\u0BA3\u0BB5\u0BC1\u0BAE\u0BCD \u0BAA\u0BBE\u0BA9\u0BAE\u0BC1\u0BAE\u0BCD",
    description_en: "\u0B9A\u0BCB\u0BB1\u0BC1 (soru), \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD (thanneer), \u0BAA\u0BB4\u0BAE\u0BCD (pazham), \u0BAA\u0BBE\u0BB2\u0BCD (paal).",
    description_ta: "\u0B9A\u0BCB\u0BB1\u0BC1, \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD, \u0BAA\u0BB4\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAA\u0BBE\u0BB2\u0BCD \u0BAA\u0BCB\u0BA9\u0BCD\u0BB1 \u0B85\u0BA9\u0BCD\u0BB1\u0BBE\u0B9F \u0B89\u0BA3\u0BB5\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BCD.",
    sequence_order: 5,
    lesson_type: "vocabulary",
    estimated_minutes: 8,
    tanglish_stage: "B",
    items_count: 6,
    is_completed: false
  },
  // Level 3 Lessons
  {
    id: "lesson-3-1",
    level_id: "level-3",
    level_number: 3,
    title_en: "Combining Sounds: \u0B95 to \u0B95\u0BBE",
    title_ta: "\u0B89\u0BAF\u0BBF\u0BB0\u0BCD\u0BAE\u0BC6\u0BAF\u0BCD: \u0B95 \u0BB5\u0BB0\u0BBF\u0B9A\u0BC8",
    description_en: "See how adding the vowel sign turns \u0B95\u0BCD into \u0B95 and \u0B95\u0BBE.",
    description_ta: "\u0B95\u0BCD \u0B89\u0B9F\u0BA9\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC1 \u0B89\u0BB0\u0BC1\u0BB5\u0BBE\u0B95\u0BC1\u0BAE\u0BCD \u0B95 \u0BB5\u0BB0\u0BBF\u0B9A\u0BC8.",
    sequence_order: 1,
    lesson_type: "letters",
    estimated_minutes: 10,
    tanglish_stage: "B",
    items_count: 6,
    is_completed: false
  },
  {
    id: "lesson-3-2",
    level_id: "level-3",
    level_number: 3,
    title_en: "Two-Syllable Word Reading",
    title_ta: "\u0B88\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC8\u0BAA\u0BCD \u0BAA\u0B9F\u0BBF\u0BA4\u0BCD\u0BA4\u0BB2\u0BCD",
    description_en: "Read simple words like \u0B95\u0BB2\u0BCD (kal - stone), \u0B95\u0BA3\u0BCD (kan - eye), \u0BAA\u0BBE\u0BB2\u0BCD (paal - milk).",
    description_ta: "\u0B95\u0BB2\u0BCD, \u0B95\u0BA3\u0BCD, \u0BAA\u0BBE\u0BB2\u0BCD \u0BAA\u0BCB\u0BA9\u0BCD\u0BB1 \u0B8E\u0BB3\u0BBF\u0BAF \u0B88\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC8 \u0BB5\u0BBE\u0B9A\u0BBF\u0BA4\u0BCD\u0BA4\u0BB2\u0BCD.",
    sequence_order: 2,
    lesson_type: "reading",
    estimated_minutes: 10,
    tanglish_stage: "C",
    items_count: 6,
    is_completed: false
  },
  // Level 4 Lessons
  {
    id: "lesson-4-1",
    level_id: "level-4",
    level_number: 4,
    title_en: "Subject-Object-Verb Order",
    title_ta: "\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BAF \u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1 \u0BAE\u0BC1\u0BB1\u0BC8",
    description_en: 'Build your first sentences: "\u0BA8\u0BBE\u0BA9\u0BCD \u0BAA\u0BBE\u0BB2\u0BCD \u0B95\u0BC1\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BC7\u0BA9\u0BCD" (I drink milk).',
    description_ta: "\u0B8E\u0BB4\u0BC1\u0BB5\u0BBE\u0BAF\u0BCD-\u0B9A\u0BC6\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAA\u0BCA\u0BB0\u0BC1\u0BB3\u0BCD-\u0BAA\u0BAF\u0BA9\u0BBF\u0BB2\u0BC8 \u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BBF\u0BB2\u0BCD \u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BAF\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B89\u0BB0\u0BC1\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BC1\u0BA4\u0BB2\u0BCD.",
    sequence_order: 1,
    lesson_type: "sentences",
    estimated_minutes: 10,
    tanglish_stage: "C",
    items_count: 6,
    is_completed: false
  },
  {
    id: "lesson-4-2",
    level_id: "level-4",
    level_number: 4,
    title_en: "Introducing Yourself",
    title_ta: "\u0B9A\u0BC1\u0BAF \u0B85\u0BB1\u0BBF\u0BAE\u0BC1\u0B95\u0BAE\u0BCD",
    description_en: 'Say your name with pride: "\u0B8E\u0BA9\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD..." (en peyar...)',
    description_ta: '"\u0B8E\u0BA9\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD..." \u0B8E\u0BA9\u0BCD\u0BB1\u0BC1 \u0B95\u0BC2\u0BB1\u0BBF \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BC8\u0BA4\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BBF\u0BB2\u0BCD \u0B85\u0BB1\u0BBF\u0BAE\u0BC1\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0BA4\u0BB2\u0BCD.',
    sequence_order: 2,
    lesson_type: "speaking",
    estimated_minutes: 10,
    tanglish_stage: "C",
    items_count: 5,
    is_completed: false
  },
  // Level 6 Story Lesson
  {
    id: "lesson-6-1",
    level_id: "level-6",
    level_number: 6,
    title_en: "Cultural Story: The Clever Crow",
    title_ta: "\u0BAA\u0BBE\u0BB0\u0BAE\u0BCD\u0BAA\u0BB0\u0BBF\u0BAF\u0B95\u0BCD \u0B95\u0BA4\u0BC8: \u0B95\u0BBE\u0B95\u0BAE\u0BC1\u0BAE\u0BCD \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BC1\u0BAE\u0BCD",
    description_en: "A 4-panel illustrated classic tale with sentence-by-sentence audio narration.",
    description_ta: '\u0BAA\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0B9F\u0BA9\u0BCD \u0B95\u0BC2\u0B9F\u0BBF\u0BAF "\u0B95\u0BBE\u0B95\u0BAE\u0BC1\u0BAE\u0BCD \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BC1\u0BAE\u0BCD" \u0B9A\u0BBF\u0BB1\u0BC1 \u0B95\u0BA4\u0BC8 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB5\u0BBF\u0BA9\u0BBE\u0B95\u0BCD\u0B95\u0BB3\u0BCD.',
    sequence_order: 1,
    lesson_type: "story",
    estimated_minutes: 12,
    tanglish_stage: "D",
    items_count: 5,
    is_completed: false
  }
];
var LESSON_EXERCISES = {
  // Lesson 0-1: The Tamil Sound World
  "lesson-0-1": [
    {
      id: "ex-0-1-1",
      lesson_id: "lesson-0-1",
      exercise_type: "vocab_card",
      prompt_en: 'Listen to the universal Tamil greeting: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD" (vanakkam):',
      prompt_ta: '\u0BA4\u0BAE\u0BBF\u0BB4\u0BBF\u0BA9\u0BCD \u0B89\u0BA9\u0BCD\u0BA9\u0BA4 \u0BB5\u0BBE\u0BB4\u0BCD\u0BA4\u0BCD\u0BA4\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BBE\u0BA9 "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD" \u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD:',
      sequence_order: 1,
      questions: [
        {
          id: "q-0-1-1",
          exercise_id: "ex-0-1-1",
          exercise_type: "vocab_card",
          prompt_en: "Universal Tamil Greeting",
          prompt_ta: "\u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0BB5\u0BBE\u0BB4\u0BCD\u0BA4\u0BCD\u0BA4\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD",
          content_ta: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
          content_tanglish: "vanakkam",
          content_en: "Hello / Greetings / Welcome",
          correct_answer: "listened",
          explanation_en: '"\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD" (vanakkam) is said with palms together to greet anyone with respect and warmth.',
          explanation_ta: '"\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B87\u0BB0\u0BC1 \u0B95\u0BB0\u0BAE\u0BCD \u0B95\u0BC2\u0BAA\u0BCD\u0BAA\u0BBF \u0B85\u0BA9\u0BC8\u0BB5\u0BB0\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B85\u0BA9\u0BCD\u0BAA\u0BC1\u0B9F\u0BA9\u0BCD \u0BB5\u0BB0\u0BB5\u0BC7\u0BB1\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD.',
          audio_id: "vocab_vanakkam"
        }
      ]
    },
    {
      id: "ex-0-1-2",
      lesson_id: "lesson-0-1",
      exercise_type: "mcq",
      prompt_en: 'Which word means "Hello" or "Greetings" in Tamil?',
      prompt_ta: '"Hello / Greetings" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BB1\u0BCD\u0B95\u0BBE\u0BA9 \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD \u0B8E\u0BA4\u0BC1?',
      sequence_order: 2,
      questions: [
        {
          id: "q-0-1-2",
          exercise_id: "ex-0-1-2",
          exercise_type: "mcq",
          prompt_en: "Choose the greeting:",
          prompt_ta: "\u0BB5\u0BBE\u0BB4\u0BCD\u0BA4\u0BCD\u0BA4\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
          content_ta: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
          content_tanglish: "vanakkam",
          correct_answer: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD (vanakkam)",
          explanation_en: 'Wonderful! "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD" (vanakkam) is the standard greeting.',
          explanation_ta: "\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BB0\u0BBF! \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B85\u0BA9\u0BC8\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BAA\u0BCA\u0BA4\u0BC1\u0BB5\u0BBE\u0BA9 \u0BB5\u0BBE\u0BB4\u0BCD\u0BA4\u0BCD\u0BA4\u0BC1.",
          audio_id: "vocab_vanakkam",
          options: [
            { id: "opt-v-1", option_text: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD (vanakkam)", option_tanglish: "Hello", is_correct: true, audio_id: "vocab_vanakkam" },
            { id: "opt-v-2", option_text: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF (nandri)", option_tanglish: "Thank you", is_correct: false, audio_id: "vocab_nandri" },
            { id: "opt-v-3", option_text: "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE (amma)", option_tanglish: "Mother", is_correct: false, audio_id: "vocab_amma" }
          ]
        }
      ]
    },
    {
      id: "ex-0-1-3",
      lesson_id: "lesson-0-1",
      exercise_type: "vocab_card",
      prompt_en: 'Listen to how we say "Thank you" in Tamil: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF" (nandri):',
      prompt_ta: '"\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF" \u0B8E\u0BA9\u0BCD\u0BB1\u0BC1 \u0B8E\u0BB5\u0BCD\u0BB5\u0BBE\u0BB1\u0BC1 \u0B95\u0BC2\u0BB1\u0BC1\u0BB5\u0BA4\u0BC1 \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC8\u0B95\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD:',
      sequence_order: 3,
      questions: [
        {
          id: "q-0-1-3",
          exercise_id: "ex-0-1-3",
          exercise_type: "vocab_card",
          prompt_en: "Expressing Gratitude",
          prompt_ta: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF \u0BA8\u0BB5\u0BBF\u0BB2\u0BCD\u0BA4\u0BB2\u0BCD",
          content_ta: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF",
          content_tanglish: "nandri",
          content_en: "Thank you",
          correct_answer: "listened",
          explanation_en: '"\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF" (nandri) means Thank you in Tamil.',
          explanation_ta: '"\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B92\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BA8\u0BA9\u0BCD\u0BB1\u0BBF \u0BA4\u0BC6\u0BB0\u0BBF\u0BB5\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD \u0BAA\u0BAF\u0BA9\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD.',
          audio_id: "vocab_nandri"
        }
      ]
    },
    {
      id: "ex-0-1-4",
      lesson_id: "lesson-0-1",
      exercise_type: "mcq",
      prompt_en: 'What do you say to say "Thank you" in Tamil?',
      prompt_ta: '"Thank you" \u0B8E\u0BA9\u0BCD\u0BB1\u0BC1 \u0B95\u0BC2\u0BB1 \u0B8E\u0BA8\u0BCD\u0BA4\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAA\u0BCD \u0BAA\u0BAF\u0BA9\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0BB5\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BCD?',
      sequence_order: 4,
      questions: [
        {
          id: "q-0-1-4",
          exercise_id: "ex-0-1-4",
          exercise_type: "mcq",
          prompt_en: "Select Thank You:",
          prompt_ta: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
          content_ta: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF",
          content_tanglish: "nandri",
          correct_answer: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF (nandri)",
          explanation_en: 'Excellent! "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF" (nandri) expresses gratitude.',
          explanation_ta: '\u0B85\u0BB1\u0BCD\u0BAA\u0BC1\u0BA4\u0BAE\u0BCD! "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9F\u0BC8.',
          audio_id: "vocab_nandri",
          options: [
            { id: "opt-n-1", option_text: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF (nandri)", option_tanglish: "Thank you", is_correct: true, audio_id: "vocab_nandri" },
            { id: "opt-n-2", option_text: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD (vanakkam)", option_tanglish: "Hello", is_correct: false, audio_id: "vocab_vanakkam" },
            { id: "opt-n-3", option_text: "\u0B85\u0BAA\u0BCD\u0BAA\u0BBE (appa)", option_tanglish: "Father", is_correct: false, audio_id: "vocab_appa" }
          ]
        }
      ]
    },
    {
      id: "ex-0-1-5",
      lesson_id: "lesson-0-1",
      exercise_type: "speaking",
      prompt_en: 'Try speaking "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD" (vanakkam). Tap record and greet!',
      prompt_ta: '"\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD" \u0B8E\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAA\u0BC7\u0B9A\u0BBF\u0BAA\u0BCD \u0BAA\u0BB4\u0B95\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD. \u0B92\u0BB2\u0BBF\u0BAA\u0BCD\u0BAA\u0BA4\u0BBF\u0BB5\u0BC8\u0BA4\u0BCD \u0BA4\u0B9F\u0BCD\u0B9F\u0BBF\u0BAA\u0BCD \u0BAA\u0BC7\u0B9A\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD!',
      sequence_order: 5,
      questions: [
        {
          id: "q-0-1-5",
          exercise_id: "ex-0-1-5",
          exercise_type: "speaking",
          prompt_en: "Say: \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD (vanakkam)",
          prompt_ta: "\u0BAA\u0BC7\u0B9A\u0BB5\u0BC1\u0BAE\u0BCD: \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
          content_ta: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
          content_tanglish: "vanakkam",
          content_en: "Greetings / Hello",
          correct_answer: "recorded",
          explanation_en: "Arpudham! You just spoke your first Tamil greeting with warmth.",
          explanation_ta: "\u0B85\u0BB1\u0BCD\u0BAA\u0BC1\u0BA4\u0BAE\u0BCD! \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0BB5\u0BBE\u0BB4\u0BCD\u0BA4\u0BCD\u0BA4\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8 \u0B85\u0BB4\u0B95\u0BBE\u0B95\u0BAA\u0BCD \u0BAA\u0BC7\u0B9A\u0BBF\u0BB5\u0BBF\u0B9F\u0BCD\u0B9F\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BCD.",
          audio_id: "vocab_vanakkam"
        }
      ]
    }
  ],
  // Lesson 0-2: Script Discovery
  "lesson-0-2": [
    {
      id: "ex-0-2-1",
      lesson_id: "lesson-0-2",
      exercise_type: "tracing",
      prompt_en: 'Discover the curvy outline of the first Tamil letter "\u0B85" (a):',
      prompt_ta: '\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BA9 "\u0B85" \u0B87\u0BA9\u0BCD \u0B85\u0BB4\u0B95\u0BBE\u0BA9 \u0BB5\u0BB3\u0BC8\u0BB5\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95:',
      sequence_order: 1,
      questions: [
        {
          id: "q-0-2-1",
          exercise_id: "ex-0-2-1",
          exercise_type: "tracing",
          prompt_en: "Trace letter \u0B85 (a)",
          prompt_ta: "\u0B85 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95",
          content_ta: "\u0B85",
          content_tanglish: "a",
          content_en: 'First Tamil Letter "\u0B85" / \u0B85\u0BAE\u0BCD\u0BAE\u0BBE (amma)',
          correct_answer: "completed",
          explanation_en: "Tamil letters are round and flowing. \u0B85 begins with a central loop!",
          explanation_ta: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD \u0BB5\u0B9F\u0BCD\u0B9F \u0BB5\u0B9F\u0BBF\u0BB5\u0BAE\u0BBE\u0BA9\u0BB5\u0BC8. \u0BA8\u0B9F\u0BC1\u0BB5\u0BBF\u0BB2\u0BCD \u0B9A\u0BC1\u0BB4\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1\u0BA4\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1!",
          audio_id: "letter_a",
          tracing_data: {
            letter: "\u0B85",
            outline_path: "M 40 35 C 30 35, 25 45, 25 55 C 25 70, 40 75, 55 70 C 65 65, 70 50, 60 40 C 50 30, 35 30, 35 45 C 35 60, 50 70, 70 70 L 85 70 M 70 70 L 70 25 L 70 85"
          }
        }
      ]
    },
    {
      id: "ex-0-2-2",
      lesson_id: "lesson-0-2",
      exercise_type: "mcq",
      prompt_en: 'Which of the following is the Tamil letter "\u0B85"?',
      prompt_ta: '\u0B87\u0BB5\u0BB1\u0BCD\u0BB1\u0BC1\u0BB3\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BA9 "\u0B85" \u0B8E\u0BA4\u0BC1?',
      sequence_order: 2,
      questions: [
        {
          id: "q-0-2-2",
          exercise_id: "ex-0-2-2",
          exercise_type: "mcq",
          prompt_en: 'Identify the letter "\u0B85":',
          prompt_ta: '"\u0B85" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0B95\u0BBE\u0BA3\u0BCD\u0B95:',
          content_ta: "\u0B85",
          content_tanglish: "a",
          correct_answer: "\u0B85",
          explanation_en: 'Yes! "\u0B85" is the letter you just traced.',
          explanation_ta: '\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9F\u0BC8! "\u0B85" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1.',
          audio_id: "letter_a",
          options: [
            { id: "opt-s-1", option_text: "\u0B85", option_tanglish: "Short a", is_correct: true, audio_id: "letter_a" },
            { id: "opt-s-2", option_text: "A", option_tanglish: "English A", is_correct: false },
            { id: "opt-s-3", option_text: "1", option_tanglish: "Number 1", is_correct: false }
          ]
        }
      ]
    },
    {
      id: "ex-0-2-3",
      lesson_id: "lesson-0-2",
      exercise_type: "matching",
      prompt_en: "Match greetings and words with their English meanings:",
      prompt_ta: "\u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC8 \u0B85\u0BB5\u0BB1\u0BCD\u0BB1\u0BBF\u0BA9\u0BCD \u0B86\u0B99\u0BCD\u0B95\u0BBF\u0BB2\u0BAA\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BB3\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95:",
      sequence_order: 3,
      questions: [
        {
          id: "q-0-2-3",
          exercise_id: "ex-0-2-3",
          exercise_type: "matching",
          prompt_en: "Match pairs:",
          prompt_ta: "\u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95:",
          content_ta: "\u0BB5\u0BBE\u0BB4\u0BCD\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD",
          correct_answer: "matched",
          explanation_en: "Great job! You know the foundations of Tamil vocabulary.",
          explanation_ta: "\u0B85\u0BB0\u0BC1\u0BAE\u0BC8! \u0BA4\u0BCA\u0B9F\u0B95\u0BCD\u0B95 \u0BA8\u0BBF\u0BB2\u0BC8 \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC8\u0B9A\u0BCD \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0B95\u0BAA\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BCD.",
          pairs: [
            { id: "p0-1", left_ta: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD (vanakkam)", right_en: "Hello", audio_id: "vocab_vanakkam" },
            { id: "p0-2", left_ta: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF (nandri)", right_en: "Thank you", audio_id: "vocab_nandri" },
            { id: "p0-3", left_ta: "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE (amma)", right_en: "Mother", audio_id: "vocab_amma" }
          ]
        }
      ]
    }
  ],
  // Lesson 1-1: First Vowels (அ & ஆ)
  "lesson-1-1": [
    {
      id: "ex-1-1-1",
      lesson_id: "lesson-1-1",
      exercise_type: "tracing",
      prompt_en: 'Trace the letter "\u0B85" (a) carefully inside the outline:',
      prompt_ta: '"\u0B85" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0B8E\u0BB2\u0BCD\u0BB2\u0BC8\u0B95\u0BCD\u0B95\u0BCB\u0B9F\u0BC1 \u0BAE\u0BC0\u0BA4\u0BC1 \u0BB5\u0BBF\u0BB0\u0BB2\u0BBE\u0BB2\u0BCD \u0BB5\u0BB0\u0BC8\u0B95:',
      sequence_order: 1,
      questions: [
        {
          id: "q-1-1-1",
          exercise_id: "ex-1-1-1",
          exercise_type: "tracing",
          prompt_en: "Trace letter \u0B85 (a)",
          prompt_ta: "\u0B85 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95",
          content_ta: "\u0B85",
          content_tanglish: "a",
          content_en: 'Short "a" as in America / \u0B85\u0BAE\u0BCD\u0BAE\u0BBE (amma)',
          correct_answer: "completed",
          explanation_en: "\u0B85 is the very first letter of the Tamil alphabet. It begins from the center spiral!",
          explanation_ta: "\u0B85 \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0BA4\u0BAE\u0BBF\u0BB4\u0BBF\u0BA9\u0BCD \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1. \u0BA8\u0B9F\u0BC1\u0BB5\u0BBF\u0BB2\u0BCD \u0B9A\u0BC1\u0BB4\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1\u0BA4\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1!",
          audio_id: "letter_a",
          tracing_data: {
            letter: "\u0B85",
            outline_path: "M 40 35 C 30 35, 25 45, 25 55 C 25 70, 40 75, 55 70 C 65 65, 70 50, 60 40 C 50 30, 35 30, 35 45 C 35 60, 50 70, 70 70 L 85 70 M 70 70 L 70 25 L 70 85"
          }
        }
      ]
    },
    {
      id: "ex-1-1-2",
      lesson_id: "lesson-1-1",
      exercise_type: "vocab_card",
      prompt_en: 'Listen to the sound of "\u0B85" (a) and its example word:',
      prompt_ta: '"\u0B85" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B8E\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD:',
      sequence_order: 2,
      questions: [
        {
          id: "q-1-1-2",
          exercise_id: "ex-1-1-2",
          exercise_type: "vocab_card",
          prompt_en: "Listen to the vowel and word",
          prompt_ta: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
          content_ta: "\u0B85 \u2192 \u0B85\u0BAE\u0BCD\u0BAE\u0BBE",
          content_tanglish: "a \u2192 amma",
          content_en: "Mother / Mom",
          correct_answer: "listened",
          explanation_en: '"\u0B85\u0BAE\u0BCD\u0BAE\u0BBE" (amma) means Mother. It begins with the short vowel "\u0B85".',
          explanation_ta: '"\u0B85\u0BAE\u0BCD\u0BAE\u0BBE" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B9A\u0BCA\u0BB2\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD "\u0B85" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.',
          audio_id: "vocab_amma"
        }
      ]
    },
    {
      id: "ex-1-1-3",
      lesson_id: "lesson-1-1",
      exercise_type: "mcq",
      prompt_en: 'Which letter makes the short sound "a" as in "amma"?',
      prompt_ta: '"\u0B85\u0BAE\u0BCD\u0BAE\u0BBE" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD "\u0B85" \u0B92\u0BB2\u0BBF \u0B8E\u0BA8\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1?',
      sequence_order: 3,
      questions: [
        {
          id: "q-1-1-3",
          exercise_id: "ex-1-1-3",
          exercise_type: "mcq",
          prompt_en: 'Select the letter that makes the "a" sound:',
          prompt_ta: '"\u0B85" \u0B92\u0BB2\u0BBF \u0BA4\u0BB0\u0BC1\u0BAE\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:',
          content_ta: "\u0B85",
          content_tanglish: "a",
          correct_answer: "\u0B85",
          explanation_en: 'Correct! "\u0B85" is the short vowel /a/.',
          explanation_ta: '\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9F\u0BC8! "\u0B85" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1.',
          audio_id: "letter_a",
          options: [
            { id: "opt-1", option_text: "\u0B85", option_tanglish: "a", is_correct: true, audio_id: "letter_a" },
            { id: "opt-2", option_text: "\u0B86", option_tanglish: "aa", is_correct: false, audio_id: "letter_aa" },
            { id: "opt-3", option_text: "\u0B87", option_tanglish: "i", is_correct: false, audio_id: "letter_i" },
            { id: "opt-4", option_text: "\u0B88", option_tanglish: "ee", is_correct: false, audio_id: "letter_ee" }
          ]
        }
      ]
    },
    {
      id: "ex-1-1-4",
      lesson_id: "lesson-1-1",
      exercise_type: "tracing",
      prompt_en: 'Now trace the long vowel "\u0B86" (aa) with its graceful lower loop:',
      prompt_ta: '\u0BA8\u0BC0\u0BA3\u0BCD\u0B9F "\u0B86" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0B85\u0BB4\u0B95\u0BBF\u0BAF \u0B95\u0BC0\u0BB4\u0BCD \u0B9A\u0BC1\u0BB4\u0BBF\u0BAF\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95:',
      sequence_order: 4,
      questions: [
        {
          id: "q-1-1-4",
          exercise_id: "ex-1-1-4",
          exercise_type: "tracing",
          prompt_en: "Trace letter \u0B86 (aa)",
          prompt_ta: "\u0B86 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95",
          content_ta: "\u0B86",
          content_tanglish: "aa",
          content_en: 'Long "aa" as in father / \u0B85\u0BAA\u0BCD\u0BAA\u0BBE (appa begins with a, but \u0B86\u0B9F\u0BC1 / aadu begins with aa)',
          correct_answer: "completed",
          explanation_en: 'Notice the cute loop at the bottom right that makes "\u0B85" into the long "\u0B86"!',
          explanation_ta: '"\u0B85" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0BB5\u0BB2\u0BA4\u0BC1 \u0B95\u0BC0\u0BB4\u0BCD \u0BAA\u0B95\u0BCD\u0B95\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B9A\u0BC1\u0BB4\u0BBF \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD "\u0B86" \u0B86\u0B95\u0BBF\u0BB1\u0BA4\u0BC1!',
          audio_id: "letter_aa",
          tracing_data: {
            letter: "\u0B86",
            outline_path: "M 35 35 C 25 35, 20 45, 20 55 C 20 70, 35 75, 50 70 C 60 65, 65 50, 55 40 C 45 30, 30 30, 30 45 L 65 70 M 65 70 L 65 25 L 65 85 C 65 95, 80 95, 85 85 C 90 75, 75 75, 75 80"
          }
        }
      ]
    },
    {
      id: "ex-1-1-5",
      lesson_id: "lesson-1-1",
      exercise_type: "listening",
      prompt_en: 'Listen to the audio sound. Is it the short "a" or the long "aa"?',
      prompt_ta: '\u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD. \u0B85\u0BA4\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD "\u0B85" \u0B92\u0BB2\u0BBF\u0BAF\u0BBE \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD "\u0B86" \u0B92\u0BB2\u0BBF\u0BAF\u0BBE?',
      sequence_order: 5,
      questions: [
        {
          id: "q-1-1-5",
          exercise_id: "ex-1-1-5",
          exercise_type: "listening",
          prompt_en: "Identify the spoken vowel:",
          prompt_ta: "\u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
          content_ta: "\u0B86",
          content_tanglish: "aa",
          correct_answer: "\u0B86",
          explanation_en: 'The sound was stretched long: "aa" (\u0B86)!',
          explanation_ta: '\u0BA8\u0BC0\u0BA3\u0BCD\u0B9F \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD \u0B92\u0BB2\u0BBF: "\u0B86" (aa)!',
          audio_id: "letter_aa",
          options: [
            { id: "opt-aa-1", option_text: "\u0B85 (Short a)", option_tanglish: "a", is_correct: false, audio_id: "letter_a" },
            { id: "opt-aa-2", option_text: "\u0B86 (Long aa)", option_tanglish: "aa", is_correct: true, audio_id: "letter_aa" }
          ]
        }
      ]
    },
    {
      id: "ex-1-1-6",
      lesson_id: "lesson-1-1",
      exercise_type: "speaking",
      prompt_en: 'Try speaking "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE" (amma). Tap record, say it clearly, and listen to your playback!',
      prompt_ta: '"\u0B85\u0BAE\u0BCD\u0BAE\u0BBE" \u0B8E\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAA\u0BC7\u0B9A\u0BAA\u0BCD \u0BAA\u0BB4\u0B95\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD. \u0BAA\u0BA4\u0BBF\u0BB5\u0BC8\u0BA4\u0BCD \u0BA4\u0B9F\u0BCD\u0B9F\u0BBF\u0BAA\u0BCD \u0BAA\u0BC7\u0B9A\u0BBF, \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BC1\u0BB0\u0BB2\u0BC8\u0B95\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD!',
      sequence_order: 6,
      questions: [
        {
          id: "q-1-1-6",
          exercise_id: "ex-1-1-6",
          exercise_type: "speaking",
          prompt_en: "Say: \u0B85\u0BAE\u0BCD\u0BAE\u0BBE (amma)",
          prompt_ta: "\u0BAA\u0BC7\u0B9A\u0BB5\u0BC1\u0BAE\u0BCD: \u0B85\u0BAE\u0BCD\u0BAE\u0BBE",
          content_ta: "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE",
          content_tanglish: "amma",
          content_en: "Mother",
          correct_answer: "recorded",
          explanation_en: "Wonderful! Hearing your own voice alongside model Tamil is the fastest way to build confidence.",
          explanation_ta: "\u0BAE\u0BBF\u0B95 \u0BA8\u0BA9\u0BCD\u0BB1\u0BC1! \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BC1\u0BB0\u0BB2\u0BC8 \u0BB5\u0BB4\u0BBF\u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BBF \u0B92\u0BB2\u0BBF\u0BAF\u0BC1\u0B9F\u0BA9\u0BCD \u0B92\u0BAA\u0BCD\u0BAA\u0BBF\u0B9F\u0BCD\u0B9F\u0BC1\u0BAA\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BA4\u0BC1 \u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0BAA\u0BAF\u0BBF\u0BB1\u0BCD\u0B9A\u0BBF.",
          audio_id: "vocab_amma"
        }
      ]
    }
  ],
  // Lesson 1-2: Vowels (இ & ஈ)
  "lesson-1-2": [
    {
      id: "ex-1-2-1",
      lesson_id: "lesson-1-2",
      exercise_type: "tracing",
      prompt_en: 'Trace the letter "\u0B87" (i) starting from the inner loop:',
      prompt_ta: '"\u0B87" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0BB5\u0BB3\u0BC8\u0BA8\u0BCD\u0BA4 \u0B8E\u0BB2\u0BCD\u0BB2\u0BC8\u0B95\u0BCD\u0B95\u0BCB\u0B9F\u0BC1 \u0BAE\u0BC0\u0BA4\u0BC1 \u0BB5\u0BBF\u0BB0\u0BB2\u0BBE\u0BB2\u0BCD \u0BB5\u0BB0\u0BC8\u0B95:',
      sequence_order: 1,
      questions: [
        {
          id: "q-1-2-1",
          exercise_id: "ex-1-2-1",
          exercise_type: "tracing",
          prompt_en: "Trace letter \u0B87 (i)",
          prompt_ta: "\u0B87 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95",
          content_ta: "\u0B87",
          content_tanglish: "i",
          content_en: 'Short "i" as in igloo / \u0B87\u0BB2\u0BC8 (ilai - leaf)',
          correct_answer: "completed",
          explanation_en: "\u0B87 is a short vowel. It sweeps smoothly upward and curls around!",
          explanation_ta: "\u0B87 \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1. \u0B85\u0BB4\u0B95\u0BBF\u0BAF \u0BAE\u0BC7\u0BB2\u0BCD \u0BB5\u0BB3\u0BC8\u0BB5\u0BC1\u0B9F\u0BA9\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0B95\u0BBF\u0BB1\u0BA4\u0BC1!",
          audio_id: "letter_i",
          tracing_data: {
            letter: "\u0B87",
            outline_path: "M 35 35 C 25 35, 20 45, 20 55 C 20 70, 35 75, 50 70 C 60 65, 65 50, 55 40 C 45 30, 30 30, 30 45 C 30 65, 50 80, 75 75 C 85 70, 85 55, 75 50 L 50 50"
          }
        }
      ]
    },
    {
      id: "ex-1-2-2",
      lesson_id: "lesson-1-2",
      exercise_type: "vocab_card",
      prompt_en: 'Listen to the sound of "\u0B87" (i) and the word "\u0B87\u0BB2\u0BC8" (ilai):',
      prompt_ta: '"\u0B87" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD "\u0B87\u0BB2\u0BC8" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD:',
      sequence_order: 2,
      questions: [
        {
          id: "q-1-2-2",
          exercise_id: "ex-1-2-2",
          exercise_type: "vocab_card",
          prompt_en: "Listen to the vowel and word",
          prompt_ta: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
          content_ta: "\u0B87 \u2192 \u0B87\u0BB2\u0BC8",
          content_tanglish: "i \u2192 ilai",
          content_en: "Leaf",
          correct_answer: "listened",
          explanation_en: '"\u0B87\u0BB2\u0BC8" (ilai) means Leaf. It starts with the short vowel "\u0B87".',
          explanation_ta: '"\u0B87\u0BB2\u0BC8" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B9A\u0BCA\u0BB2\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD "\u0B87" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.',
          audio_id: "letter_i"
        }
      ]
    },
    {
      id: "ex-1-2-3",
      lesson_id: "lesson-1-2",
      exercise_type: "mcq",
      prompt_en: 'Which letter makes the short sound "i" as in "ilai"?',
      prompt_ta: '"\u0B87\u0BB2\u0BC8" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD "\u0B87" \u0B92\u0BB2\u0BBF \u0B8E\u0BA4\u0BC1?',
      sequence_order: 3,
      questions: [
        {
          id: "q-1-2-3",
          exercise_id: "ex-1-2-3",
          exercise_type: "mcq",
          prompt_en: 'Select the letter that makes the "i" sound:',
          prompt_ta: '"\u0B87" \u0B92\u0BB2\u0BBF \u0BA4\u0BB0\u0BC1\u0BAE\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:',
          content_ta: "\u0B87",
          content_tanglish: "i",
          correct_answer: "\u0B87",
          explanation_en: 'Correct! "\u0B87" is the short vowel /i/.',
          explanation_ta: '\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9F\u0BC8! "\u0B87" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1.',
          audio_id: "letter_i",
          options: [
            { id: "opt-i-1", option_text: "\u0B87", option_tanglish: "i", is_correct: true, audio_id: "letter_i" },
            { id: "opt-i-2", option_text: "\u0B88", option_tanglish: "ee", is_correct: false, audio_id: "letter_ee" },
            { id: "opt-i-3", option_text: "\u0B85", option_tanglish: "a", is_correct: false, audio_id: "letter_a" },
            { id: "opt-i-4", option_text: "\u0B86", option_tanglish: "aa", is_correct: false, audio_id: "letter_aa" }
          ]
        }
      ]
    },
    {
      id: "ex-1-2-4",
      lesson_id: "lesson-1-2",
      exercise_type: "tracing",
      prompt_en: 'Now trace the long vowel "\u0B88" (ee) with its distinctive two vertical eyes:',
      prompt_ta: '\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1 \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD \u0B95\u0BCA\u0BA3\u0BCD\u0B9F \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD "\u0B88" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95:',
      sequence_order: 4,
      questions: [
        {
          id: "q-1-2-4",
          exercise_id: "ex-1-2-4",
          exercise_type: "tracing",
          prompt_en: "Trace letter \u0B88 (ee)",
          prompt_ta: "\u0B88 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95",
          content_ta: "\u0B88",
          content_tanglish: "ee",
          content_en: 'Long "ee" as in eel / \u0B88\u0B9F\u0BCD\u0B9F\u0BBF (eetti - spear) or \u0B88 (ee - housefly)',
          correct_answer: "completed",
          explanation_en: "\u0B88 is uniquely shaped with a central pillar and two dots inside and outside!",
          explanation_ta: "\u0B88 \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0BA4\u0BA9\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1\u0BB5\u0BAE\u0BBE\u0BA9 \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1!",
          audio_id: "letter_ee",
          tracing_data: {
            letter: "\u0B88",
            outline_path: "M 25 30 L 25 80 M 25 30 L 75 30 L 75 80 M 50 30 L 50 80 M 37 55 L 38 55 M 63 55 L 64 55"
          }
        }
      ]
    },
    {
      id: "ex-1-2-5",
      lesson_id: "lesson-1-2",
      exercise_type: "listening",
      prompt_en: 'Listen to the audio sound. Is it the short "i" or the long "ee"?',
      prompt_ta: '\u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD. \u0B85\u0BA4\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD "\u0B87" \u0B92\u0BB2\u0BBF\u0BAF\u0BBE \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD "\u0B88" \u0B92\u0BB2\u0BBF\u0BAF\u0BBE?',
      sequence_order: 5,
      questions: [
        {
          id: "q-1-2-5",
          exercise_id: "ex-1-2-5",
          exercise_type: "listening",
          prompt_en: "Identify the spoken vowel:",
          prompt_ta: "\u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
          content_ta: "\u0B88",
          content_tanglish: "ee",
          correct_answer: "\u0B88",
          explanation_en: 'The sound was stretched long: "ee" (\u0B88)!',
          explanation_ta: '\u0BA8\u0BC0\u0BA3\u0BCD\u0B9F \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD \u0B92\u0BB2\u0BBF: "\u0B88" (ee)!',
          audio_id: "letter_ee",
          options: [
            { id: "opt-ee-1", option_text: "\u0B87 (Short i)", option_tanglish: "i", is_correct: false, audio_id: "letter_i" },
            { id: "opt-ee-2", option_text: "\u0B88 (Long ee)", option_tanglish: "ee", is_correct: true, audio_id: "letter_ee" }
          ]
        }
      ]
    }
  ],
  // Lesson 1-3: Vowels (உ & ஊ)
  "lesson-1-3": [
    {
      id: "ex-1-3-1",
      lesson_id: "lesson-1-3",
      exercise_type: "tracing",
      prompt_en: 'Trace the curved letter "\u0B89" (u) with its bottom loop:',
      prompt_ta: '"\u0B89" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0B85\u0B9F\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0BB1 \u0BB5\u0BB3\u0BC8\u0BB5\u0BC8 \u0BB5\u0BBF\u0BB0\u0BB2\u0BBE\u0BB2\u0BCD \u0BB5\u0BB0\u0BC8\u0B95:',
      sequence_order: 1,
      questions: [
        {
          id: "q-1-3-1",
          exercise_id: "ex-1-3-1",
          exercise_type: "tracing",
          prompt_en: "Trace letter \u0B89 (u)",
          prompt_ta: "\u0B89 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95",
          content_ta: "\u0B89",
          content_tanglish: "u",
          content_en: 'Short "u" as in put / \u0B89\u0BB2\u0B95\u0BAE\u0BCD (ulagam - world)',
          correct_answer: "completed",
          explanation_en: "\u0B89 is the short rounded vowel. It starts with a small loop and extends flat along the base.",
          explanation_ta: "\u0B89 \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1. \u0B9A\u0BC1\u0BB4\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1\u0BA4\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BBF \u0B95\u0BC0\u0BB4\u0BC7 \u0BA8\u0BC7\u0BB0\u0BCD\u0B95\u0BCB\u0B9F\u0BBE\u0B95 \u0BB5\u0BBF\u0BB0\u0BBF\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.",
          audio_id: "letter_u",
          tracing_data: {
            letter: "\u0B89",
            outline_path: "M 35 35 C 25 35, 20 45, 20 55 C 20 70, 35 75, 50 70 C 60 65, 65 50, 55 40 L 40 40 L 40 75 L 85 75"
          }
        }
      ]
    },
    {
      id: "ex-1-3-2",
      lesson_id: "lesson-1-3",
      exercise_type: "vocab_card",
      prompt_en: 'Listen to the sound of "\u0B89" (u) and "\u0B89\u0BB2\u0B95\u0BAE\u0BCD" (ulagam):',
      prompt_ta: '"\u0B89" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD "\u0B89\u0BB2\u0B95\u0BAE\u0BCD" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD:',
      sequence_order: 2,
      questions: [
        {
          id: "q-1-3-2",
          exercise_id: "ex-1-3-2",
          exercise_type: "vocab_card",
          prompt_en: "Listen to the vowel and word",
          prompt_ta: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
          content_ta: "\u0B89 \u2192 \u0B89\u0BB2\u0B95\u0BAE\u0BCD",
          content_tanglish: "u \u2192 ulagam",
          content_en: "World",
          correct_answer: "listened",
          explanation_en: '"\u0B89\u0BB2\u0B95\u0BAE\u0BCD" (ulagam) means World. It begins with the short vowel "\u0B89".',
          explanation_ta: '"\u0B89\u0BB2\u0B95\u0BAE\u0BCD" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B9A\u0BCA\u0BB2\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD "\u0B89" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.',
          audio_id: "letter_u"
        }
      ]
    },
    {
      id: "ex-1-3-3",
      lesson_id: "lesson-1-3",
      exercise_type: "mcq",
      prompt_en: 'Which letter represents the short sound "u"?',
      prompt_ta: '\u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD "\u0B89" \u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B8E\u0BA4\u0BC1?',
      sequence_order: 3,
      questions: [
        {
          id: "q-1-3-3",
          exercise_id: "ex-1-3-3",
          exercise_type: "mcq",
          prompt_en: "Select the letter:",
          prompt_ta: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
          content_ta: "\u0B89",
          content_tanglish: "u",
          correct_answer: "\u0B89",
          explanation_en: 'Super! "\u0B89" is the short rounded vowel.',
          explanation_ta: '\u0B85\u0BB0\u0BC1\u0BAE\u0BC8! "\u0B89" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1.',
          audio_id: "letter_u",
          options: [
            { id: "opt-u-1", option_text: "\u0B89", option_tanglish: "u", is_correct: true, audio_id: "letter_u" },
            { id: "opt-u-2", option_text: "\u0B8A", option_tanglish: "oo", is_correct: false, audio_id: "letter_oo" },
            { id: "opt-u-3", option_text: "\u0B87", option_tanglish: "i", is_correct: false, audio_id: "letter_i" },
            { id: "opt-u-4", option_text: "\u0B85", option_tanglish: "a", is_correct: false, audio_id: "letter_a" }
          ]
        }
      ]
    },
    {
      id: "ex-1-3-4",
      lesson_id: "lesson-1-3",
      exercise_type: "tracing",
      prompt_en: 'Now trace "\u0B8A" (oo) which has the special "\u0BB3" crown on top:',
      prompt_ta: '\u0BAE\u0BC7\u0BB2\u0BC7 "\u0BB3" \u0BA4\u0BC1\u0BA3\u0BC8 \u0B95\u0BCA\u0BA3\u0BCD\u0B9F \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD "\u0B8A" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95:',
      sequence_order: 4,
      questions: [
        {
          id: "q-1-3-4",
          exercise_id: "ex-1-3-4",
          exercise_type: "tracing",
          prompt_en: "Trace letter \u0B8A (oo)",
          prompt_ta: "\u0B8A \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95",
          content_ta: "\u0B8A",
          content_tanglish: "oo",
          content_en: 'Long "oo" as in moon / \u0B8A\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD (oonjal - swing)',
          correct_answer: "completed",
          explanation_en: "\u0B8A is made by writing \u0B89 and placing a mini \u0BB3 symbol above it!",
          explanation_ta: '\u0B89 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0BAE\u0BC7\u0BB2\u0BCD "\u0BB3" \u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC8 \u0BB5\u0BC8\u0BA4\u0BCD\u0BA4\u0BBE\u0BB2\u0BCD \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD "\u0B8A" \u0B86\u0B95\u0BBF\u0BB1\u0BA4\u0BC1!',
          audio_id: "letter_oo",
          tracing_data: {
            letter: "\u0B8A",
            outline_path: "M 25 45 C 20 45, 15 52, 15 60 C 15 72, 25 75, 40 75 L 75 75 M 45 25 C 40 25, 35 30, 35 38 C 35 48, 55 48, 55 38 L 70 38"
          }
        }
      ]
    },
    {
      id: "ex-1-3-5",
      lesson_id: "lesson-1-3",
      exercise_type: "listening",
      prompt_en: 'Listen to the sound. Is it "u" or "oo"?',
      prompt_ta: "\u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B9F\u0BC1 \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
      sequence_order: 5,
      questions: [
        {
          id: "q-1-3-5",
          exercise_id: "ex-1-3-5",
          exercise_type: "listening",
          prompt_en: "Identify the spoken vowel:",
          prompt_ta: "\u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
          content_ta: "\u0B8A",
          content_tanglish: "oo",
          correct_answer: "\u0B8A",
          explanation_en: 'Correct! The sound was elongated: "oo" (\u0B8A)!',
          explanation_ta: '\u0B9A\u0BB0\u0BBF! \u0BA8\u0BC0\u0BA3\u0BCD\u0B9F \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD \u0B92\u0BB2\u0BBF: "\u0B8A" (oo)!',
          audio_id: "letter_oo",
          options: [
            { id: "opt-oo-1", option_text: "\u0B89 (Short u)", option_tanglish: "u", is_correct: false, audio_id: "letter_u" },
            { id: "opt-oo-2", option_text: "\u0B8A (Long oo)", option_tanglish: "oo", is_correct: true, audio_id: "letter_oo" }
          ]
        }
      ]
    }
  ],
  // Lesson 1-4: Vowels (எ & ஏ)
  "lesson-1-4": [
    {
      id: "ex-1-4-1",
      lesson_id: "lesson-1-4",
      exercise_type: "vocab_card",
      prompt_en: 'Listen to the short vowel "\u0B8E" (e) and word "\u0B8E\u0BB1\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1" (erumbu):',
      prompt_ta: '"\u0B8E" \u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD "\u0B8E\u0BB1\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD:',
      sequence_order: 1,
      questions: [
        {
          id: "q-1-4-1",
          exercise_id: "ex-1-4-1",
          exercise_type: "vocab_card",
          prompt_en: "Listen to the vowel and word",
          prompt_ta: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
          content_ta: "\u0B8E \u2192 \u0B8E\u0BB1\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1",
          content_tanglish: "e \u2192 erumbu",
          content_en: "Ant",
          correct_answer: "listened",
          explanation_en: '"\u0B8E\u0BB1\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1" (erumbu) means Ant. It begins with the short vowel "\u0B8E".',
          explanation_ta: '"\u0B8E\u0BB1\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B9A\u0BCA\u0BB2\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD "\u0B8E" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.',
          audio_id: "letter_e"
        }
      ]
    },
    {
      id: "ex-1-4-2",
      lesson_id: "lesson-1-4",
      exercise_type: "mcq",
      prompt_en: 'Which letter makes the short "e" sound as in "elephant"?',
      prompt_ta: '"\u0B8E" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD \u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BB0\u0BC1\u0BAE\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B8E\u0BA4\u0BC1?',
      sequence_order: 2,
      questions: [
        {
          id: "q-1-4-2",
          exercise_id: "ex-1-4-2",
          exercise_type: "mcq",
          prompt_en: "Select the letter:",
          prompt_ta: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
          content_ta: "\u0B8E",
          content_tanglish: "e",
          correct_answer: "\u0B8E",
          explanation_en: 'Correct! "\u0B8E" is the short /e/ vowel.',
          explanation_ta: '\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9F\u0BC8! "\u0B8E" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1.',
          audio_id: "letter_e",
          options: [
            { id: "opt-e-1", option_text: "\u0B8E", option_tanglish: "e", is_correct: true, audio_id: "letter_e" },
            { id: "opt-e-2", option_text: "\u0B8F", option_tanglish: "ee/ae", is_correct: false, audio_id: "letter_ee" },
            { id: "opt-e-3", option_text: "\u0B85", option_tanglish: "a", is_correct: false, audio_id: "letter_a" },
            { id: "opt-e-4", option_text: "\u0B87", option_tanglish: "i", is_correct: false, audio_id: "letter_i" }
          ]
        }
      ]
    },
    {
      id: "ex-1-4-3",
      lesson_id: "lesson-1-4",
      exercise_type: "vocab_card",
      prompt_en: 'Listen to the long vowel "\u0B8F" (ae) and word "\u0B8F\u0BA3\u0BBF" (eani):',
      prompt_ta: '"\u0B8F" \u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD "\u0B8F\u0BA3\u0BBF" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD:',
      sequence_order: 3,
      questions: [
        {
          id: "q-1-4-3",
          exercise_id: "ex-1-4-3",
          exercise_type: "vocab_card",
          prompt_en: "Listen to the vowel and word",
          prompt_ta: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
          content_ta: "\u0B8F \u2192 \u0B8F\u0BA3\u0BBF",
          content_tanglish: "ae \u2192 eani",
          content_en: "Ladder",
          correct_answer: "listened",
          explanation_en: '"\u0B8F\u0BA3\u0BBF" (eani) means Ladder. It begins with the long vowel "\u0B8F".',
          explanation_ta: '"\u0B8F\u0BA3\u0BBF" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B9A\u0BCA\u0BB2\u0BCD \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD "\u0B8F" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.',
          audio_id: "letter_ee"
        }
      ]
    }
  ],
  // Lesson 1-5: The Aytham Letter: ஃ (Ak)
  "lesson-1-5": [
    {
      id: "ex-1-5-1",
      lesson_id: "lesson-1-5",
      exercise_type: "tracing",
      prompt_en: 'Trace the 3 iconic triangular dots of the Aytham letter "\u0B83" (ak):',
      prompt_ta: '\u0B86\u0BAF\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BA9 "\u0B83" \u0B87\u0BA9\u0BCD \u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAE\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95:',
      sequence_order: 1,
      questions: [
        {
          id: "q-1-5-1",
          exercise_id: "ex-1-5-1",
          exercise_type: "tracing",
          prompt_en: "Trace \u0B83 (aytham)",
          prompt_ta: "\u0B83 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB0\u0BC8\u0B95",
          content_ta: "\u0B83",
          content_tanglish: "ak",
          content_en: "Aytham (\u0B86\u0BAF\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1) \u2014 3 dots shaped like a warrior shield / \u0B8E\u0B83\u0B95\u0BC1 (ehgu - steel)",
          correct_answer: "completed",
          explanation_en: "\u0B83 is called Aytham (\u0B86\u0BAF\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1) or Muppulli (\u0BAE\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF). It has 1 top dot and 2 bottom dots!",
          explanation_ta: "\u0B83 \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B86\u0BAF\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BAE\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF \u0B8E\u0BA9 \u0B85\u0BB4\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD \u0BA4\u0BA9\u0BBF \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1!",
          audio_id: "letter_aytham",
          tracing_data: {
            letter: "\u0B83",
            outline_path: "M 50 30 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 35 65 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 65 65 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0"
          }
        }
      ]
    },
    {
      id: "ex-1-5-2",
      lesson_id: "lesson-1-5",
      exercise_type: "mcq",
      prompt_en: "How many dots make up the Tamil Aytham letter (\u0B83)?",
      prompt_ta: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B86\u0BAF\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD (\u0B83) \u0B8E\u0BA4\u0BCD\u0BA4\u0BA9\u0BC8 \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA9?",
      sequence_order: 2,
      questions: [
        {
          id: "q-1-5-2",
          exercise_id: "ex-1-5-2",
          exercise_type: "mcq",
          prompt_en: "Count the dots in \u0B83:",
          prompt_ta: "\u0B83 \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B8E\u0BA3\u0BCD\u0BA3\u0BBF\u0B95\u0BCD\u0B95\u0BC8:",
          content_ta: "\u0B83",
          content_tanglish: "ak",
          correct_answer: "3",
          explanation_en: "Yes! Exactly 3 dots arranged in a triangle (\u0BAE\u0BC1\u0BAA\u0BCD\u0BAA\u0BBE\u0BB1\u0BCD\u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF).",
          explanation_ta: "\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9F\u0BC8! \u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD \u0BAE\u0BC1\u0B95\u0BCD\u0B95\u0BCB\u0BA3 \u0BB5\u0B9F\u0BBF\u0BB5\u0BBF\u0BB2\u0BCD \u0B85\u0BAE\u0BC8\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.",
          audio_id: "letter_aytham",
          options: [
            { id: "opt-ay-1", option_text: "1", is_correct: false },
            { id: "opt-ay-2", option_text: "2", is_correct: false },
            { id: "opt-ay-3", option_text: "3 (\u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1)", is_correct: true },
            { id: "opt-ay-4", option_text: "4", is_correct: false }
          ]
        }
      ]
    }
  ],
  // Lesson 2-1: Family & Loved Ones
  "lesson-2-1": [
    {
      id: "ex-2-1-1",
      lesson_id: "lesson-2-1",
      exercise_type: "vocab_card",
      prompt_en: "Tap to hear each family word in authentic Tamil:",
      prompt_ta: "\u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0B89\u0BB1\u0BB5\u0BC1\u0B9A\u0BCD \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B95 \u0BA4\u0B9F\u0BCD\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD:",
      sequence_order: 1,
      questions: [
        {
          id: "q-2-1-1",
          exercise_id: "ex-2-1-1",
          exercise_type: "vocab_card",
          prompt_en: "Learn Family Words",
          prompt_ta: "\u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA\u0B9A\u0BCD \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BCD",
          content_ta: "\u0B85\u0BAA\u0BCD\u0BAA\u0BBE",
          content_tanglish: "appa",
          content_en: "Father / Dad",
          correct_answer: "listened",
          explanation_en: '"\u0B85\u0BAA\u0BCD\u0BAA\u0BBE" (appa) is Father.',
          explanation_ta: '"\u0B85\u0BAA\u0BCD\u0BAA\u0BBE" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0BA4\u0BA8\u0BCD\u0BA4\u0BC8\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD.',
          audio_id: "vocab_appa"
        }
      ]
    },
    {
      id: "ex-2-1-2",
      lesson_id: "lesson-2-1",
      exercise_type: "matching",
      prompt_en: "Match each Tamil family word with its English meaning:",
      prompt_ta: "\u0B92\u0BB5\u0BCD\u0BB5\u0BCA\u0BB0\u0BC1 \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B85\u0BA4\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BB3\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95:",
      sequence_order: 2,
      questions: [
        {
          id: "q-2-1-2",
          exercise_id: "ex-2-1-2",
          exercise_type: "matching",
          prompt_en: "Tap pairs to match:",
          prompt_ta: "\u0B87\u0BA3\u0BC8\u0B95\u0BCD\u0B95 \u0BA4\u0B9F\u0BCD\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD:",
          content_ta: "\u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA\u0BAE\u0BCD",
          correct_answer: "matched",
          explanation_en: "Superb! \u0B85\u0BAE\u0BCD\u0BAE\u0BBE is Mother, \u0B85\u0BAA\u0BCD\u0BAA\u0BBE is Father, and \u0B85\u0B95\u0BCD\u0B95\u0BBE is Elder Sister.",
          explanation_ta: "\u0B85\u0BB0\u0BC1\u0BAE\u0BC8! \u0B85\u0BAE\u0BCD\u0BAE\u0BBE, \u0B85\u0BAA\u0BCD\u0BAA\u0BBE, \u0B85\u0B95\u0BCD\u0B95\u0BBE \u0B89\u0BB1\u0BB5\u0BC1\u0B95\u0BB3\u0BC8\u0B9A\u0BCD \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0B95\u0BAA\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BCD.",
          pairs: [
            { id: "p1", left_ta: "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE (amma)", right_en: "Mother", audio_id: "vocab_amma" },
            { id: "p2", left_ta: "\u0B85\u0BAA\u0BCD\u0BAA\u0BBE (appa)", right_en: "Father", audio_id: "vocab_appa" },
            { id: "p3", left_ta: "\u0B85\u0B95\u0BCD\u0B95\u0BBE (akka)", right_en: "Elder Sister", audio_id: "vocab_akka" }
          ]
        }
      ]
    },
    {
      id: "ex-2-1-3",
      lesson_id: "lesson-2-1",
      exercise_type: "mcq",
      prompt_en: 'What is the Tamil word for "Thank you"?',
      prompt_ta: '"Thank you" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BA9\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD \u0B8E\u0BA4\u0BC1?',
      sequence_order: 3,
      questions: [
        {
          id: "q-2-1-3",
          exercise_id: "ex-2-1-3",
          exercise_type: "mcq",
          prompt_en: "Choose the correct word for Thank You:",
          prompt_ta: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF \u0B9A\u0BC6\u0BB2\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
          content_ta: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF",
          content_tanglish: "nandri",
          correct_answer: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF (nandri)",
          explanation_en: '"\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF" (nandri) means Thank you in Tamil!',
          explanation_ta: '"\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0BA8\u0BA9\u0BCD\u0BB1\u0BBF \u0BA8\u0BB5\u0BBF\u0BB4\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD!',
          audio_id: "vocab_nandri",
          options: [
            { id: "opt-ty-1", option_text: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD (vanakkam)", option_en: "Hello / Greetings", is_correct: false, audio_id: "vocab_vanakkam" },
            { id: "opt-ty-2", option_text: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF (nandri)", option_en: "Thank you", is_correct: true, audio_id: "vocab_nandri" },
            { id: "opt-ty-3", option_text: "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE (amma)", option_en: "Mother", is_correct: false, audio_id: "vocab_amma" }
          ]
        }
      ]
    }
  ],
  // Lesson 2-4: Animals & Pets (includes பூனை - poonai audit item)
  "lesson-2-4": [
    {
      id: "ex-2-4-1",
      lesson_id: "lesson-2-4",
      exercise_type: "mcq",
      prompt_en: 'What is the Tamil word and correct Tanglish for "Cat"?',
      prompt_ta: '"Cat" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BA9\u0BCD \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0BAE\u0BCD \u0BA4\u0B99\u0BCD\u0B95\u0BBF\u0BB2\u0BBF\u0BB7\u0BC1\u0BAE\u0BCD \u0B8E\u0BA4\u0BC1?',
      sequence_order: 1,
      questions: [
        {
          id: "q-2-4-1",
          exercise_id: "ex-2-4-1",
          exercise_type: "mcq",
          prompt_en: "Select the cat:",
          prompt_ta: "\u0BAA\u0BC2\u0BA9\u0BC8\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD:",
          content_ta: "\u0BAA\u0BC2\u0BA9\u0BC8",
          content_tanglish: "poonai",
          correct_answer: "\u0BAA\u0BC2\u0BA9\u0BC8 (poonai)",
          explanation_en: 'Exactly! Cat is \u0BAA\u0BC2\u0BA9\u0BC8 and transliterated as "poonai" with the "-ai" diphthong.',
          explanation_ta: "\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9F\u0BC8! \u0BAA\u0BC2\u0BA9\u0BC8 (poonai) \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BA4\u0B99\u0BCD\u0B95\u0BBF\u0BB2\u0BBF\u0BB7\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD.",
          audio_id: "vocab_poonai",
          options: [
            { id: "opt-cat-1", option_text: "\u0BAA\u0BC2\u0BA9\u0BC8 (poonai)", option_en: "Cat", is_correct: true, audio_id: "vocab_poonai" },
            { id: "opt-cat-2", option_text: "\u0BA8\u0BBE\u0BAF\u0BCD (naai)", option_en: "Dog", is_correct: false, audio_id: "vocab_naai" },
            { id: "opt-cat-3", option_text: "\u0B95\u0BBF\u0BB3\u0BBF (kili)", option_en: "Parrot", is_correct: false, audio_id: "vocab_kili" },
            { id: "opt-cat-4", option_text: "\u0BAF\u0BBE\u0BA9\u0BC8 (yaanai)", option_en: "Elephant", is_correct: false, audio_id: "vocab_yaanai" }
          ]
        }
      ]
    },
    {
      id: "ex-2-4-2",
      lesson_id: "lesson-2-4",
      exercise_type: "matching",
      prompt_en: "Connect each animal with its Tamil name:",
      prompt_ta: "\u0BB5\u0BBF\u0BB2\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BB3\u0BC8 \u0B85\u0BB5\u0BB1\u0BCD\u0BB1\u0BBF\u0BA9\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD\u0BAA\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD\u0B95\u0BB3\u0BC1\u0B9F\u0BA9\u0BCD \u0B87\u0BA3\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0B95:",
      sequence_order: 2,
      questions: [
        {
          id: "q-2-4-2",
          exercise_id: "ex-2-4-2",
          exercise_type: "matching",
          prompt_en: "Match Animals:",
          prompt_ta: "\u0BB5\u0BBF\u0BB2\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BB3\u0BC8\u0BAA\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95:",
          content_ta: "\u0BB5\u0BBF\u0BB2\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BB3\u0BCD",
          correct_answer: "matched",
          explanation_en: "Great job matching all four animals!",
          explanation_ta: "\u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BBF\u0BB2\u0B99\u0BCD\u0B95\u0BC1\u0B95\u0BB3\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0B95\u0BAA\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BCD!",
          pairs: [
            { id: "pa1", left_ta: "\u0BA8\u0BBE\u0BAF\u0BCD (naai)", right_en: "Dog", audio_id: "vocab_naai" },
            { id: "pa2", left_ta: "\u0BAA\u0BC2\u0BA9\u0BC8 (poonai)", right_en: "Cat", audio_id: "vocab_poonai" },
            { id: "pa3", left_ta: "\u0B95\u0BBF\u0BB3\u0BBF (kili)", right_en: "Parrot", audio_id: "vocab_kili" }
          ]
        }
      ]
    }
  ],
  // Lesson 4-1: Sentence Construction (Subject-Object-Verb & Word Ordering)
  "lesson-4-1": [
    {
      id: "ex-4-1-1",
      lesson_id: "lesson-4-1",
      exercise_type: "ordering",
      prompt_en: 'Arrange the 3D tiles into a correct Tamil sentence: "I like fruit" (\u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BB4\u0BAE\u0BCD \u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD):',
      prompt_ta: '\u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC8\u0B9A\u0BCD \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BB0\u0BBF\u0B9A\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B92\u0BB4\u0BC1\u0B99\u0BCD\u0B95\u0BC1\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95: "\u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BB4\u0BAE\u0BCD \u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD":',
      sequence_order: 1,
      questions: [
        {
          id: "q-4-1-1",
          exercise_id: "ex-4-1-1",
          exercise_type: "ordering",
          prompt_en: 'Build the sentence: "I like fruit"',
          prompt_ta: "\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BAF\u0BA4\u0BCD\u0BA4\u0BC8 \u0B85\u0BAE\u0BC8\u0B95\u0BCD\u0B95: \u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BB4\u0BAE\u0BCD \u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD",
          content_ta: "\u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BB4\u0BAE\u0BCD \u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD",
          content_tanglish: "enakku pazham pidikkum",
          content_en: "I like fruit",
          correct_answer: "\u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BB4\u0BAE\u0BCD \u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD",
          explanation_en: "Tamil uses Subject (\u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1) - Object (\u0BAA\u0BB4\u0BAE\u0BCD) - Verb (\u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD) sentence structure!",
          explanation_ta: '\u0BA4\u0BAE\u0BBF\u0BB4\u0BBF\u0BB2\u0BCD "\u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1 (To me) + \u0BAA\u0BB4\u0BAE\u0BCD (fruit) + \u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD (is liked)" \u0B8E\u0BA9\u0BCD\u0BB1 \u0BB5\u0B9F\u0BBF\u0BB5\u0BBF\u0BB2\u0BCD \u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BAF\u0BAE\u0BCD \u0B85\u0BAE\u0BC8\u0B95\u0BBF\u0BB1\u0BA4\u0BC1!',
          ordered_solution: ["\u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1", "\u0BAA\u0BB4\u0BAE\u0BCD", "\u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD"],
          word_bank: [
            { id: "w1", text_ta: "\u0BAA\u0BB4\u0BAE\u0BCD", text_tanglish: "pazham", audio_id: "vocab_pazham" },
            { id: "w2", text_ta: "\u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1", text_tanglish: "enakku", audio_id: "sent_fruit_like" },
            { id: "w3", text_ta: "\u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", text_tanglish: "pidikkum", audio_id: "sent_fruit_like" }
          ]
        }
      ]
    },
    {
      id: "ex-4-1-2",
      lesson_id: "lesson-4-1",
      exercise_type: "ordering",
      prompt_en: 'Arrange the tiles to say: "Drink water" (\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD \u0B95\u0BC1\u0B9F\u0BBF):',
      prompt_ta: '\u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC8 \u0B92\u0BB4\u0BC1\u0B99\u0BCD\u0B95\u0BC1\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95: "\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD \u0B95\u0BC1\u0B9F\u0BBF":',
      sequence_order: 2,
      questions: [
        {
          id: "q-4-1-2",
          exercise_id: "ex-4-1-2",
          exercise_type: "ordering",
          prompt_en: "Build: Drink water",
          prompt_ta: "\u0B85\u0BAE\u0BC8\u0B95\u0BCD\u0B95: \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD \u0B95\u0BC1\u0B9F\u0BBF",
          content_ta: "\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD \u0B95\u0BC1\u0B9F\u0BBF",
          content_tanglish: "thanneer kudi",
          content_en: "Drink water",
          correct_answer: "\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD \u0B95\u0BC1\u0B9F\u0BBF",
          explanation_en: '"\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD" (water) + "\u0B95\u0BC1\u0B9F\u0BBF" (drink). Well done!',
          explanation_ta: '"\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD" + "\u0B95\u0BC1\u0B9F\u0BBF" = \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD \u0B95\u0BC1\u0B9F\u0BBF!',
          ordered_solution: ["\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD", "\u0B95\u0BC1\u0B9F\u0BBF"],
          word_bank: [
            { id: "w-kudi", text_ta: "\u0B95\u0BC1\u0B9F\u0BBF", text_tanglish: "kudi", audio_id: "sent_water_drink" },
            { id: "w-thanneer", text_ta: "\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD", text_tanglish: "thanneer", audio_id: "vocab_thanneer" }
          ]
        }
      ]
    }
  ],
  // Lesson 6-1: Illustrated Cultural Story (The Clever Crow / காகமும் தண்ணீரும்)
  "lesson-6-1": [
    {
      id: "ex-6-1-1",
      lesson_id: "lesson-6-1",
      exercise_type: "story",
      prompt_en: "Read and listen to the illustrated story panel by panel:",
      prompt_ta: "\u0BAA\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0B9F\u0BA9\u0BCD \u0B95\u0BA4\u0BC8\u0BAF\u0BC8 \u0B89\u0BB1\u0BCD\u0BB1\u0BC1\u0BA8\u0BCB\u0B95\u0BCD\u0B95\u0BBF \u0BB5\u0BBE\u0B9A\u0BBF\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD:",
      sequence_order: 1,
      questions: [
        {
          id: "q-6-1-1",
          exercise_id: "ex-6-1-1",
          exercise_type: "story",
          prompt_en: "Story: The Clever Crow (\u0B95\u0BBE\u0B95\u0BAE\u0BC1\u0BAE\u0BCD \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BC1\u0BAE\u0BCD)",
          prompt_ta: "\u0B95\u0BA4\u0BC8: \u0B95\u0BBE\u0B95\u0BAE\u0BC1\u0BAE\u0BCD \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BC1\u0BAE\u0BCD",
          content_ta: "\u0B92\u0BB0\u0BC1 \u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0BA4\u0BBE\u0B95\u0BA4\u0BCD\u0BA4\u0BC1\u0B9F\u0BA9\u0BCD \u0B92\u0BB0\u0BC1 \u0B95\u0BBE\u0B95\u0BAE\u0BCD \u0BAA\u0BB1\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1.",
          content_tanglish: "oru kaattil thaagathudan oru kaagam parandhadhu.",
          content_en: "A thirsty crow flew across the forest looking for water.",
          correct_answer: "finished",
          explanation_en: "This classic story teaches us that patience and intelligence solve any problem!",
          explanation_ta: "\u0BAA\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0B9A\u0BBE\u0BB2\u0BBF\u0BA4\u0BCD\u0BA4\u0BA9\u0BAE\u0BC1\u0BAE\u0BCD \u0BB5\u0BBF\u0B9F\u0BBE\u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD \u0B8E\u0BA8\u0BCD\u0BA4 \u0B9A\u0BB5\u0BBE\u0BB2\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BB5\u0BC6\u0BB2\u0BCD\u0BB2\u0BC1\u0BAE\u0BCD \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC8\u0B95\u0BCD \u0B95\u0BA4\u0BC8 \u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1!",
          audio_id: "story_clever_crow",
          story_panels: [
            {
              image_url: "crow_thirsty",
              caption_ta: "\u0B92\u0BB0\u0BC1 \u0BA8\u0BBE\u0BB3\u0BCD \u0B92\u0BB0\u0BC1 \u0B95\u0BBE\u0B95\u0BA4\u0BCD\u0BA4\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0BAE\u0BBF\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0BA4\u0BBE\u0B95\u0BAE\u0BCD \u0B8E\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BA4\u0BC1.",
              caption_tanglish: "Oru naal oru kaagathirku migavum thaagam eduthadhu.",
              caption_en: "One sunny day, a crow felt very thirsty.",
              audio_id: "story_clever_crow"
            },
            {
              image_url: "crow_pot",
              caption_ta: "\u0B85\u0BA4\u0BC1 \u0BA4\u0BCB\u0B9F\u0BCD\u0B9F\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B92\u0BB0\u0BC1 \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD \u0BAA\u0BBE\u0BA9\u0BC8\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BA3\u0BCD\u0B9F\u0BA4\u0BC1.",
              caption_tanglish: "Adhu thottathil oru siriya thanneer paanaiyai kandadhu.",
              caption_en: "It spotted a small water pot in a peaceful garden.",
              audio_id: "story_clever_crow"
            },
            {
              image_url: "crow_pebbles",
              caption_ta: "\u0BAA\u0BBE\u0BA9\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BA8\u0BC0\u0BB0\u0BCD \u0B95\u0BC1\u0BB1\u0BC8\u0BB5\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BA4\u0BBE\u0BB2\u0BCD, \u0B95\u0BBE\u0B95\u0BAE\u0BCD \u0B95\u0BC2\u0BB4\u0BBE\u0B99\u0BCD\u0B95\u0BB1\u0BCD\u0B95\u0BB3\u0BC8\u0BAA\u0BCD \u0BAA\u0BCB\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.",
              caption_tanglish: "Paanaiyil neer kuraivaaga irundhadhaal, kaagam koozhaangarkalai pottadhu.",
              caption_en: "The water was too deep, so the clever crow dropped pebbles inside.",
              audio_id: "story_clever_crow"
            },
            {
              image_url: "crow_drinks",
              caption_ta: "\u0BA8\u0BC0\u0BB0\u0BCD \u0BAE\u0BC7\u0BB2\u0BC7 \u0BB5\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1! \u0B95\u0BBE\u0B95\u0BAE\u0BCD \u0BAE\u0B95\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD\u0B9A\u0BBF\u0BAF\u0BBE\u0B95\u0BA4\u0BCD \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD \u0B95\u0BC1\u0B9F\u0BBF\u0BA4\u0BCD\u0BA4\u0BA4\u0BC1.",
              caption_tanglish: "Neer maele vandhadhu! Kaagam magizhchiyaaga thanneer kudithadhu.",
              caption_en: "The water rose to the top! The joyful crow drank and flew happily.",
              audio_id: "story_clever_crow"
            }
          ]
        }
      ]
    },
    {
      id: "ex-6-1-2",
      lesson_id: "lesson-6-1",
      exercise_type: "reading",
      prompt_en: "Comprehension Question: What did the clever crow drop into the pot?",
      prompt_ta: "\u0B95\u0BA4\u0BC8 \u0BB5\u0BBF\u0BA9\u0BBE: \u0BAA\u0BBE\u0BA9\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BA8\u0BC0\u0BB0\u0BCD \u0BAE\u0BC7\u0BB2\u0BC7 \u0BB5\u0BB0 \u0B95\u0BBE\u0B95\u0BAE\u0BCD \u0B8E\u0BA4\u0BC8\u0BAA\u0BCD \u0BAA\u0BCB\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1?",
      sequence_order: 2,
      questions: [
        {
          id: "q-6-1-2",
          exercise_id: "ex-6-1-2",
          exercise_type: "reading",
          prompt_en: "What did the crow drop into the water pot?",
          prompt_ta: "\u0B95\u0BBE\u0B95\u0BAE\u0BCD \u0BAA\u0BBE\u0BA9\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BB3\u0BCD \u0B8E\u0BA4\u0BC8\u0BAA\u0BCD \u0BAA\u0BCB\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1?",
          content_ta: "\u0B95\u0BC2\u0BB4\u0BBE\u0B99\u0BCD\u0B95\u0BB1\u0BCD\u0B95\u0BB3\u0BCD",
          content_tanglish: "koozhaangarkal",
          correct_answer: "\u0B95\u0BC2\u0BB4\u0BBE\u0B99\u0BCD\u0B95\u0BB1\u0BCD\u0B95\u0BB3\u0BCD (Pebbles)",
          explanation_en: "Correct! By dropping pebbles (\u0B95\u0BC2\u0BB4\u0BBE\u0B99\u0BCD\u0B95\u0BB1\u0BCD\u0B95\u0BB3\u0BCD), the water level rose to the top.",
          explanation_ta: "\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9F\u0BC8! \u0B95\u0BC2\u0BB4\u0BBE\u0B99\u0BCD\u0B95\u0BB1\u0BCD\u0B95\u0BB3\u0BC8\u0BAA\u0BCD \u0BAA\u0BCB\u0B9F\u0BCD\u0B9F\u0BC1 \u0BA8\u0BC0\u0BB0\u0BCD \u0BAE\u0B9F\u0BCD\u0B9F\u0BA4\u0BCD\u0BA4\u0BC8 \u0BAE\u0BC7\u0BB2\u0BC7 \u0B89\u0BAF\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF\u0BA4\u0BC1.",
          options: [
            { id: "opt-cr-1", option_text: "\u0B87\u0BB2\u0BC8\u0B95\u0BB3\u0BCD (Leaves)", is_correct: false },
            { id: "opt-cr-2", option_text: "\u0B95\u0BC2\u0BB4\u0BBE\u0B99\u0BCD\u0B95\u0BB1\u0BCD\u0B95\u0BB3\u0BCD (Pebbles)", is_correct: true },
            { id: "opt-cr-3", option_text: "\u0BAA\u0BB4\u0B99\u0BCD\u0B95\u0BB3\u0BCD (Fruits)", is_correct: false }
          ]
        }
      ]
    }
  ]
};

// src/data/audioManifest.ts
var AUDIO_MANIFEST = {
  // Uyir Vowels
  "letter_a": { id: "letter_a", tamilText: "\u0B85", tanglish: "a", ipa: "/a/", filePath: "/audio/letters/a.mp3", category: "letter" },
  "letter_aa": { id: "letter_aa", tamilText: "\u0B86", tanglish: "aa", ipa: "/a\u02D0/", filePath: "/audio/letters/aa.mp3", category: "letter" },
  "letter_i": { id: "letter_i", tamilText: "\u0B87", tanglish: "i", ipa: "/i/", filePath: "/audio/letters/i.mp3", category: "letter" },
  "letter_ee": { id: "letter_ee", tamilText: "\u0B88", tanglish: "ee", ipa: "/i\u02D0/", filePath: "/audio/letters/ee.mp3", category: "letter" },
  "letter_u": { id: "letter_u", tamilText: "\u0B89", tanglish: "u", ipa: "/u/", filePath: "/audio/letters/u.mp3", category: "letter" },
  "letter_oo": { id: "letter_oo", tamilText: "\u0B8A", tanglish: "oo", ipa: "/u\u02D0/", filePath: "/audio/letters/oo.mp3", category: "letter" },
  "letter_e": { id: "letter_e", tamilText: "\u0B8E", tanglish: "e", ipa: "/e/", filePath: "/audio/letters/e.mp3", category: "letter" },
  "letter_ae": { id: "letter_ae", tamilText: "\u0B8F", tanglish: "ae", ipa: "/e\u02D0/", filePath: "/audio/letters/ae.mp3", category: "letter" },
  "letter_ai": { id: "letter_ai", tamilText: "\u0B90", tanglish: "ai", ipa: "/a\u026A/", filePath: "/audio/letters/ai.mp3", category: "letter" },
  "letter_o": { id: "letter_o", tamilText: "\u0B92", tanglish: "o", ipa: "/o/", filePath: "/audio/letters/o.mp3", category: "letter" },
  "letter_oa": { id: "letter_oa", tamilText: "\u0B93", tanglish: "oa", ipa: "/o\u02D0/", filePath: "/audio/letters/oa.mp3", category: "letter" },
  "letter_au": { id: "letter_au", tamilText: "\u0B94", tanglish: "au", ipa: "/a\u028A/", filePath: "/audio/letters/au.mp3", category: "letter" },
  // Aytham
  "letter_aytham": { id: "letter_aytham", tamilText: "\u0B83", tanglish: "ak", ipa: "/x/", filePath: "/audio/letters/aytham.mp3", category: "letter" },
  // Mei Consonants
  "letter_k": { id: "letter_k", tamilText: "\u0B95\u0BCD", tanglish: "k", ipa: "/k/", filePath: "/audio/letters/k.mp3", category: "letter" },
  "letter_ng": { id: "letter_ng", tamilText: "\u0B99\u0BCD", tanglish: "ng", ipa: "/\u014B/", filePath: "/audio/letters/ng.mp3", category: "letter" },
  "letter_ch": { id: "letter_ch", tamilText: "\u0B9A\u0BCD", tanglish: "ch", ipa: "/t\u0361\u0283/", filePath: "/audio/letters/ch.mp3", category: "letter" },
  "letter_ny": { id: "letter_ny", tamilText: "\u0B9E\u0BCD", tanglish: "ny", ipa: "/\u0272/", filePath: "/audio/letters/ny.mp3", category: "letter" },
  "letter_t": { id: "letter_t", tamilText: "\u0B9F\u0BCD", tanglish: "t", ipa: "/\u0288/", filePath: "/audio/letters/t.mp3", category: "letter" },
  "letter_nn": { id: "letter_nn", tamilText: "\u0BA3\u0BCD", tanglish: "nn", ipa: "/\u0273/", filePath: "/audio/letters/nn.mp3", category: "letter" },
  "letter_th": { id: "letter_th", tamilText: "\u0BA4\u0BCD", tanglish: "th", ipa: "/t\u032A/", filePath: "/audio/letters/th.mp3", category: "letter" },
  "letter_n": { id: "letter_n", tamilText: "\u0BA8\u0BCD", tanglish: "n", ipa: "/n\u032A/", filePath: "/audio/letters/n.mp3", category: "letter" },
  "letter_p": { id: "letter_p", tamilText: "\u0BAA\u0BCD", tanglish: "p", ipa: "/p/", filePath: "/audio/letters/p.mp3", category: "letter" },
  "letter_m": { id: "letter_m", tamilText: "\u0BAE\u0BCD", tanglish: "m", ipa: "/m/", filePath: "/audio/letters/m.mp3", category: "letter" },
  "letter_y": { id: "letter_y", tamilText: "\u0BAF\u0BCD", tanglish: "y", ipa: "/j/", filePath: "/audio/letters/y.mp3", category: "letter" },
  "letter_r": { id: "letter_r", tamilText: "\u0BB0\u0BCD", tanglish: "r", ipa: "/r/", filePath: "/audio/letters/r.mp3", category: "letter" },
  "letter_l": { id: "letter_l", tamilText: "\u0BB2\u0BCD", tanglish: "l", ipa: "/l/", filePath: "/audio/letters/l.mp3", category: "letter" },
  "letter_v": { id: "letter_v", tamilText: "\u0BB5\u0BCD", tanglish: "v", ipa: "/\u028B/", filePath: "/audio/letters/v.mp3", category: "letter" },
  "letter_zh": { id: "letter_zh", tamilText: "\u0BB4\u0BCD", tanglish: "zh", ipa: "/\u027B/", filePath: "/audio/letters/zh.mp3", category: "letter" },
  "letter_ll": { id: "letter_ll", tamilText: "\u0BB3\u0BCD", tanglish: "ll", ipa: "/\u026D/", filePath: "/audio/letters/ll.mp3", category: "letter" },
  "letter_rr": { id: "letter_rr", tamilText: "\u0BB1\u0BCD", tanglish: "rr", ipa: "/r/", filePath: "/audio/letters/rr.mp3", category: "letter" },
  "letter_na": { id: "letter_na", tamilText: "\u0BA9\u0BCD", tanglish: "n", ipa: "/n/", filePath: "/audio/letters/na.mp3", category: "letter" },
  // Level 2 Vocabulary: Family
  "vocab_amma": { id: "vocab_amma", tamilText: "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE", tanglish: "amma", filePath: "/audio/vocab/amma.mp3", category: "word" },
  "vocab_appa": { id: "vocab_appa", tamilText: "\u0B85\u0BAA\u0BCD\u0BAA\u0BBE", tanglish: "appa", filePath: "/audio/vocab/appa.mp3", category: "word" },
  "vocab_akka": { id: "vocab_akka", tamilText: "\u0B85\u0B95\u0BCD\u0B95\u0BBE", tanglish: "akka", filePath: "/audio/vocab/akka.mp3", category: "word" },
  "vocab_anna": { id: "vocab_anna", tamilText: "\u0B85\u0BA3\u0BCD\u0BA3\u0BA9\u0BCD", tanglish: "annan", filePath: "/audio/vocab/anna.mp3", category: "word" },
  "vocab_thambi": { id: "vocab_thambi", tamilText: "\u0BA4\u0BAE\u0BCD\u0BAA\u0BBF", tanglish: "thambi", filePath: "/audio/vocab/thambi.mp3", category: "word" },
  "vocab_thangai": { id: "vocab_thangai", tamilText: "\u0BA4\u0B99\u0BCD\u0B95\u0BC8", tanglish: "thangai", filePath: "/audio/vocab/thangai.mp3", category: "word" },
  // Greetings & Courtesies
  "vocab_vanakkam": { id: "vocab_vanakkam", tamilText: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD", tanglish: "vanakkam", filePath: "/audio/vocab/vanakkam.mp3", category: "word" },
  "vocab_nandri": { id: "vocab_nandri", tamilText: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF", tanglish: "nandri", filePath: "/audio/vocab/nandri.mp3", category: "word" },
  "vocab_nalvaravu": { id: "vocab_nalvaravu", tamilText: "\u0BA8\u0BB2\u0BCD\u0BB5\u0BB0\u0BB5\u0BC1", tanglish: "nalvaravu", filePath: "/audio/vocab/nalvaravu.mp3", category: "word" },
  // Numbers 1 to 5
  "vocab_ondru": { id: "vocab_ondru", tamilText: "\u0B92\u0BA9\u0BCD\u0BB1\u0BC1", tanglish: "ondru", filePath: "/audio/vocab/ondru.mp3", category: "word" },
  "vocab_irandu": { id: "vocab_irandu", tamilText: "\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1", tanglish: "irandu", filePath: "/audio/vocab/irandu.mp3", category: "word" },
  "vocab_moondru": { id: "vocab_moondru", tamilText: "\u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1", tanglish: "moondru", filePath: "/audio/vocab/moondru.mp3", category: "word" },
  "vocab_naangu": { id: "vocab_naangu", tamilText: "\u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BC1", tanglish: "naangu", filePath: "/audio/vocab/naangu.mp3", category: "word" },
  "vocab_ainthu": { id: "vocab_ainthu", tamilText: "\u0B90\u0BA8\u0BCD\u0BA4\u0BC1", tanglish: "ainthu", filePath: "/audio/vocab/ainthu.mp3", category: "word" },
  // Colors
  "vocab_sivappu": { id: "vocab_sivappu", tamilText: "\u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1", tanglish: "sivappu", filePath: "/audio/vocab/sivappu.mp3", category: "word" },
  "vocab_pachai": { id: "vocab_pachai", tamilText: "\u0BAA\u0B9A\u0BCD\u0B9A\u0BC8", tanglish: "pachai", filePath: "/audio/vocab/pachai.mp3", category: "word" },
  "vocab_neelam": { id: "vocab_neelam", tamilText: "\u0BA8\u0BC0\u0BB2\u0BAE\u0BCD", tanglish: "neelam", filePath: "/audio/vocab/neelam.mp3", category: "word" },
  "vocab_manjal": { id: "vocab_manjal", tamilText: "\u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD", tanglish: "manjal", filePath: "/audio/vocab/manjal.mp3", category: "word" },
  "vocab_vellai": { id: "vocab_vellai", tamilText: "\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BC8", tanglish: "vellai", filePath: "/audio/vocab/vellai.mp3", category: "word" },
  // Animals
  "vocab_naai": { id: "vocab_naai", tamilText: "\u0BA8\u0BBE\u0BAF\u0BCD", tanglish: "naai", filePath: "/audio/vocab/naai.mp3", category: "word" },
  "vocab_poonai": { id: "vocab_poonai", tamilText: "\u0BAA\u0BC2\u0BA9\u0BC8", tanglish: "poonai", filePath: "/audio/vocab/poonai.mp3", category: "word" },
  "vocab_kili": { id: "vocab_kili", tamilText: "\u0B95\u0BBF\u0BB3\u0BBF", tanglish: "kili", filePath: "/audio/vocab/kili.mp3", category: "word" },
  "vocab_yaanai": { id: "vocab_yaanai", tamilText: "\u0BAF\u0BBE\u0BA9\u0BC8", tanglish: "yaanai", filePath: "/audio/vocab/yaanai.mp3", category: "word" },
  // Food & Objects
  "vocab_soru": { id: "vocab_soru", tamilText: "\u0B9A\u0BCB\u0BB1\u0BC1", tanglish: "soru", filePath: "/audio/vocab/soru.mp3", category: "word" },
  "vocab_thanneer": { id: "vocab_thanneer", tamilText: "\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD", tanglish: "thanneer", filePath: "/audio/vocab/thanneer.mp3", category: "word" },
  "vocab_pazham": { id: "vocab_pazham", tamilText: "\u0BAA\u0BB4\u0BAE\u0BCD", tanglish: "pazham", filePath: "/audio/vocab/pazham.mp3", category: "word" },
  "vocab_paal": { id: "vocab_paal", tamilText: "\u0BAA\u0BBE\u0BB2\u0BCD", tanglish: "paal", filePath: "/audio/vocab/paal.mp3", category: "word" },
  // Actions
  "vocab_vaa": { id: "vocab_vaa", tamilText: "\u0BB5\u0BBE", tanglish: "vaa", filePath: "/audio/vocab/vaa.mp3", category: "word" },
  "vocab_po": { id: "vocab_po", tamilText: "\u0BAA\u0BCB", tanglish: "po", filePath: "/audio/vocab/po.mp3", category: "word" },
  // Sentences
  "sent_nalla_paiyan": { id: "sent_nalla_paiyan", tamilText: "\u0BA8\u0BB2\u0BCD\u0BB2 \u0BAA\u0BC8\u0BAF\u0BA9\u0BCD", tanglish: "nalla paiyan", filePath: "/audio/sentences/nalla_paiyan.mp3", category: "sentence" },
  "sent_en_peyar": { id: "sent_en_peyar", tamilText: "\u0B8E\u0BA9\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD \u0B86\u0BB0\u0BB5\u0BCD", tanglish: "en peyar Aarav", filePath: "/audio/sentences/en_peyar.mp3", category: "sentence" },
  "sent_eppadi_irukku": { id: "sent_eppadi_irukku", tamilText: "\u0B89\u0BA9\u0B95\u0BCD\u0B95\u0BC1 \u0B8E\u0BAA\u0BCD\u0BAA\u0B9F\u0BBF \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1?", tanglish: "unakku eppadi irukku?", filePath: "/audio/sentences/eppadi_irukku.mp3", category: "sentence" },
  "sent_fruit_like": { id: "sent_fruit_like", tamilText: "\u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BB4\u0BAE\u0BCD \u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", tanglish: "enakku pazham pidikkum", filePath: "/audio/sentences/fruit_like.mp3", category: "sentence" },
  "sent_water_drink": { id: "sent_water_drink", tamilText: "\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD \u0B95\u0BC1\u0B9F\u0BBF", tanglish: "thanneer kudi", filePath: "/audio/sentences/water_drink.mp3", category: "sentence" },
  // Stories
  "story_clever_crow": { id: "story_clever_crow", tamilText: "\u0B95\u0BBE\u0B95\u0BAE\u0BC1\u0BAE\u0BCD \u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BC1\u0BAE\u0BCD", tanglish: "kaagamum thanneerum", filePath: "/audio/stories/clever_crow.mp3", category: "story" },
  "story_pongal_feast": { id: "story_pongal_feast", tamilText: "\u0BAA\u0BCA\u0B99\u0BCD\u0B95\u0BB2\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBF\u0BB4\u0BBE", tanglish: "pongal thiruvizha", filePath: "/audio/stories/pongal_feast.mp3", category: "story" }
};

// src/data/badgesData.ts
var INITIAL_BADGES = [
  {
    id: "badge-uyir-explorer",
    name_en: "Uyir Explorer",
    name_ta: "\u0B89\u0BAF\u0BBF\u0BB0\u0BCD \u0B86\u0BAF\u0BCD\u0BB5\u0BBE\u0BB3\u0BB0\u0BCD",
    description_en: "Recognize your first Tamil vowels (\u0B85, \u0B86, \u0B87, \u0B88).",
    description_ta: "\u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BC8 \u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0B95\u0BBE\u0BA3\u0BC1\u0BA4\u0BB2\u0BCD.",
    icon: "Sparkles",
    category: "letters",
    criteria_type: "letters_mastered",
    criteria_value: 4,
    is_earned: true,
    earned_at: "2026-10-14"
  },
  {
    id: "badge-mei-master",
    name_en: "Mei Master",
    name_ta: "\u0BAE\u0BC6\u0BAF\u0BCD \u0BAE\u0BC7\u0BA4\u0BC8",
    description_en: "Master 10 basic Tamil consonants with correct sounds.",
    description_ta: "10 \u0B85\u0B9F\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC8 \u0BAE\u0BC6\u0BAF\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B92\u0BB2\u0BBF\u0B95\u0BB3\u0BC8 \u0B85\u0BB1\u0BBF\u0BA4\u0BB2\u0BCD.",
    icon: "Shield",
    category: "letters",
    criteria_type: "letters_mastered",
    criteria_value: 10,
    is_earned: false
  },
  {
    id: "badge-word-collector",
    name_en: "Word Collector 25",
    name_ta: "\u0B9A\u0BCA\u0BB2\u0BCD \u0B9A\u0BC7\u0B95\u0BB0\u0BBF\u0BAA\u0BCD\u0BAA\u0BBE\u0BB3\u0BB0\u0BCD 25",
    description_en: "Learn 25 Tamil everyday words across family and nature.",
    description_ta: "\u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B87\u0BAF\u0BB1\u0BCD\u0B95\u0BC8 \u0B9A\u0BBE\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4 25 \u0B9A\u0BCA\u0BB1\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BB1\u0BCD\u0BB1\u0BB2\u0BCD.",
    icon: "BookOpen",
    category: "vocabulary",
    criteria_type: "words_learned",
    criteria_value: 25,
    is_earned: false
  },
  {
    id: "badge-first-reader",
    name_en: "First Reader",
    name_ta: "\u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0BB5\u0BBE\u0B9A\u0B95\u0BB0\u0BCD",
    description_en: "Read your first pure Tamil word without Tanglish assistance.",
    description_ta: "\u0BA4\u0B99\u0BCD\u0B95\u0BBF\u0BB2\u0BBF\u0BB7\u0BCD \u0B89\u0BA4\u0BB5\u0BBF\u0BAF\u0BBF\u0BA9\u0BCD\u0BB1\u0BBF \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8 \u0BB5\u0BBE\u0B9A\u0BBF\u0BA4\u0BCD\u0BA4\u0BB2\u0BCD.",
    icon: "Eye",
    category: "reading",
    criteria_type: "words_read",
    criteria_value: 1,
    is_earned: true,
    earned_at: "2026-10-15"
  },
  {
    id: "badge-first-sentence",
    name_en: "First Sentence Maker",
    name_ta: "\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BAF \u0B9A\u0BBF\u0BB1\u0BCD\u0BAA\u0BBF",
    description_en: "Construct your first complete Tamil sentence in Subject-Object-Verb order.",
    description_ta: "\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BAF \u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BBF\u0BB2\u0BCD \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BAF\u0BA4\u0BCD\u0BA4\u0BC8 \u0B89\u0BB0\u0BC1\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BC1\u0BA4\u0BB2\u0BCD.",
    icon: "Feather",
    category: "reading",
    criteria_type: "sentences_constructed",
    criteria_value: 1,
    is_earned: false
  },
  {
    id: "badge-story-reader",
    name_en: "Story Reader",
    name_ta: "\u0B95\u0BA4\u0BC8 \u0BB5\u0BBE\u0B9A\u0B95\u0BB0\u0BCD",
    description_en: "Complete reading an illustrated cultural Tamil story.",
    description_ta: "\u0BAA\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0B9F\u0BA9\u0BCD \u0B95\u0BC2\u0B9F\u0BBF\u0BAF \u0BAA\u0BA3\u0BCD\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BCD \u0B95\u0BA4\u0BC8\u0BAF\u0BC8\u0BAA\u0BCD \u0BAA\u0B9F\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1 \u0BAE\u0BC1\u0B9F\u0BBF\u0BA4\u0BCD\u0BA4\u0BB2\u0BCD.",
    icon: "Smile",
    category: "reading",
    criteria_type: "stories_read",
    criteria_value: 1,
    is_earned: false
  },
  {
    id: "badge-week-warrior",
    name_en: "Week Warrior",
    name_ta: "\u0BB5\u0BBE\u0BB0\u0BAA\u0BCD \u0BAA\u0BCB\u0BB0\u0BBE\u0BB3\u0BBF",
    description_en: "Maintain a 7-day uninterrupted Tamil learning streak.",
    description_ta: "7 \u0BA8\u0BBE\u0B9F\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BCA\u0B9F\u0BB0\u0BCD\u0B9A\u0BCD\u0B9A\u0BBF\u0BAF\u0BBE\u0B95\u0BA4\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD\u0BAA\u0BCD \u0BAA\u0BAF\u0BBF\u0BB1\u0BCD\u0B9A\u0BBF \u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BB2\u0BCD.",
    icon: "Flame",
    category: "streak",
    criteria_type: "streak_days",
    criteria_value: 7,
    is_earned: false
  },
  {
    id: "badge-script-power-e",
    name_en: "Script Independent",
    name_ta: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BA4\u0BA9\u0BCD\u0BA9\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF",
    description_en: "Reach Stage E in Script Power \u2014 full independence from Tanglish!",
    description_ta: "\u0BA4\u0B99\u0BCD\u0B95\u0BBF\u0BB2\u0BBF\u0BB7\u0BCD \u0B87\u0BA9\u0BCD\u0BB1\u0BBF \u0BA4\u0BC2\u0BAF \u0BA4\u0BAE\u0BBF\u0BB4\u0BBF\u0BB2\u0BCD \u0B87\u0BAF\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BA8\u0BBF\u0BB2\u0BC8 \u0B89 \u0BB5\u0BC8 \u0B85\u0B9F\u0BC8\u0BA4\u0BB2\u0BCD!",
    icon: "Award",
    category: "mastery",
    criteria_type: "script_power_stage",
    criteria_value: 5,
    is_earned: false
  }
];

// src/data/missionsData.ts
var INITIAL_MISSIONS = [
  {
    id: "mission-vanakkam",
    level_number: 1,
    title_en: "The Morning Vanakkam",
    title_ta: "\u0B95\u0BBE\u0BB2\u0BC8 \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
    prompt_en: 'Greet your parents or grandparents in the morning with a warm hands-together "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD" (vanakkam).',
    prompt_ta: '\u0B95\u0BBE\u0BB2\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BAA\u0BC6\u0BB1\u0BCD\u0BB1\u0BCB\u0BB0\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BCB\u0BB0\u0BBF\u0B9F\u0BAE\u0BCD \u0B95\u0BC8\u0B95\u0BC2\u0BAA\u0BCD\u0BAA\u0BBF "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD" \u0B8E\u0BA9\u0BCD\u0BB1\u0BC1 \u0B85\u0BA9\u0BCD\u0BAA\u0BC1\u0B9F\u0BA9\u0BCD \u0B95\u0BC2\u0BB1\u0BBF \u0BAE\u0B95\u0BBF\u0BB4\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.',
    category: "family",
    target_words_ta: ["\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD"],
    target_words_en: ["Greetings / Hello"],
    xp_reward: 25,
    is_completed: true,
    completed_at: "2026-10-14",
    student_reflection: "Grandma smiled so big and hugged me when I said vanakkam!"
  },
  {
    id: "mission-three-colors",
    level_number: 2,
    title_en: "Rainbow Spotter",
    title_ta: "\u0BB5\u0BA3\u0BCD\u0BA3 \u0BB5\u0BC7\u0B9F\u0BCD\u0B9F\u0BC8",
    prompt_en: "Find 3 items in your bedroom or kitchen and name their colors in Tamil (\u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1, \u0BAA\u0B9A\u0BCD\u0B9A\u0BC8, \u0BA8\u0BC0\u0BB2\u0BAE\u0BCD, \u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD).",
    prompt_ta: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0BB1\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3 \u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAA\u0BCA\u0BB0\u0BC1\u0B9F\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BA3\u0BCD\u0B9F\u0BB1\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1 \u0B85\u0BB5\u0BB1\u0BCD\u0BB1\u0BBF\u0BA9\u0BCD \u0BB5\u0BA3\u0BCD\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0BA4\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BBF\u0BB2\u0BCD \u0B95\u0BC2\u0BB1\u0BC1\u0B95.",
    category: "home",
    target_words_ta: ["\u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1", "\u0BAA\u0B9A\u0BCD\u0B9A\u0BC8", "\u0BA8\u0BC0\u0BB2\u0BAE\u0BCD", "\u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD"],
    target_words_en: ["Red", "Green", "Blue", "Yellow"],
    xp_reward: 30,
    is_completed: false
  },
  {
    id: "mission-food-thanks",
    level_number: 2,
    title_en: "Thank You for Food",
    title_ta: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF \u0BA8\u0BB5\u0BBF\u0BB2\u0BCD\u0BA4\u0BB2\u0BCD",
    prompt_en: 'After dinner, thank whoever cooked by saying "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF" (nandri) and ask for water using "\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD" (thanneer).',
    prompt_ta: '\u0B89\u0BA3\u0BB5\u0BC1 \u0B89\u0BA3\u0BCD\u0B9F \u0BAA\u0BBF\u0BA9\u0BCD \u0B9A\u0BAE\u0BC8\u0BA4\u0BCD\u0BA4\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1 "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF" \u0B8E\u0BA9\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD, \u0BA8\u0BC0\u0BB0\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BC1\u0BAE\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 "\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD" \u0B8E\u0BA9\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B95\u0BC2\u0BB1\u0BBF\u0BAA\u0BCD \u0BAA\u0BB4\u0B95\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.',
    category: "family",
    target_words_ta: ["\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF", "\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD"],
    target_words_en: ["Thank you", "Water"],
    xp_reward: 35,
    is_completed: false
  },
  {
    id: "mission-nature-walk",
    level_number: 3,
    title_en: "Nature Walk & Birds",
    title_ta: "\u0B87\u0BAF\u0BB1\u0BCD\u0B95\u0BC8 \u0B89\u0BB2\u0BBE",
    prompt_en: "Go outside or look out the window. Can you spot a bird or pet and say its name in Tamil (\u0B95\u0BBF\u0BB3\u0BBF, \u0BA8\u0BBE\u0BAF\u0BCD, \u0BAA\u0BC2\u0BA9\u0BC8)?",
    prompt_ta: "\u0BB5\u0BC6\u0BB3\u0BBF\u0BAF\u0BC7 \u0B9A\u0BC6\u0BB2\u0BCD\u0BB2\u0BC1\u0BAE\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0B95\u0BBE\u0BA3\u0BC1\u0BAE\u0BCD \u0BAA\u0BB1\u0BB5\u0BC8 \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BB5\u0BBF\u0BB2\u0B99\u0BCD\u0B95\u0BBF\u0BA9\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BC8\u0BA4\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BBF\u0BB2\u0BCD \u0B95\u0BC2\u0BB1\u0BC1\u0B95.",
    category: "nature",
    target_words_ta: ["\u0B95\u0BBF\u0BB3\u0BBF", "\u0BA8\u0BBE\u0BAF\u0BCD", "\u0BAA\u0BC2\u0BA9\u0BC8"],
    target_words_en: ["Parrot", "Dog", "Cat"],
    xp_reward: 30,
    is_completed: false
  }
];

// src/data/assessmentData.ts
var ASSESSMENT_QUESTIONS = [
  {
    id: "aq-1",
    category: "phonics",
    prompt_en: "Listen to the sound. Which Tamil vowel is being spoken?",
    prompt_ta: "\u0B92\u0BB2\u0BBF\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD. \u0B8E\u0BA8\u0BCD\u0BA4 \u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B92\u0BB2\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1?",
    audio_id: "letter_a",
    options: [
      { id: "aq-1-a", text_ta: "\u0B85", text_tanglish: "a", is_correct: true },
      { id: "aq-1-b", text_ta: "\u0B86", text_tanglish: "aa", is_correct: false },
      { id: "aq-1-c", text_ta: "\u0B87", text_tanglish: "i", is_correct: false },
      { id: "aq-1-d", text_ta: "\u0B89", text_tanglish: "u", is_correct: false }
    ],
    explanation_en: 'The sound was the short open vowel "a" (\u0B85).',
    explanation_ta: '\u0B92\u0BB2\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B95\u0BC1\u0BB1\u0BBF\u0BB2\u0BCD "\u0B85".'
  },
  {
    id: "aq-2",
    category: "letter",
    prompt_en: 'Which of these is the long vowel "aa" with the bottom loop?',
    prompt_ta: '\u0B95\u0BC0\u0BB4\u0BC7 \u0B89\u0BB3\u0BCD\u0BB3\u0BB5\u0BB1\u0BCD\u0BB1\u0BBF\u0BB2\u0BCD \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD "\u0B86" \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B8E\u0BA4\u0BC1?',
    options: [
      { id: "aq-2-a", text_ta: "\u0B85", text_tanglish: "a", is_correct: false },
      { id: "aq-2-b", text_ta: "\u0B86", text_tanglish: "aa", is_correct: true },
      { id: "aq-2-c", text_ta: "\u0B88", text_tanglish: "ee", is_correct: false },
      { id: "aq-2-d", text_ta: "\u0B8A", text_tanglish: "oo", is_correct: false }
    ],
    explanation_en: 'Correct! "\u0B86" has the decorative bottom loop distinguishing it from "\u0B85".',
    explanation_ta: '\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9F\u0BC8! "\u0B86" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0BA8\u0BC6\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BAF\u0BBF\u0BB0\u0BC6\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1.'
  },
  {
    id: "aq-3",
    category: "letter",
    prompt_en: "Which is the unique 3-dot Tamil Aytham letter (\u0B83)?",
    prompt_ta: "\u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BBE\u0BB2\u0BBE\u0BA9 \u0B86\u0BAF\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B8E\u0BA4\u0BC1?",
    options: [
      { id: "aq-3-a", text_ta: "\u0B83", text_tanglish: "ak", is_correct: true },
      { id: "aq-3-b", text_ta: "\u0B95\u0BCD", text_tanglish: "k", is_correct: false },
      { id: "aq-3-c", text_ta: "\u0B9F\u0BCD", text_tanglish: "t", is_correct: false },
      { id: "aq-3-d", text_ta: "\u0BAA\u0BCD", text_tanglish: "p", is_correct: false }
    ],
    explanation_en: 'Yes! "\u0B83" is the Aytham letter (\u0BAE\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF).',
    explanation_ta: '\u0B86\u0BAE\u0BCD! "\u0B83" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B86\u0BAF\u0BCD\u0BA4 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1.'
  },
  {
    id: "aq-4",
    category: "vocab",
    prompt_en: 'What does the Tamil word "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE" (amma) mean?',
    prompt_ta: '"\u0B85\u0BAE\u0BCD\u0BAE\u0BBE" \u0B8E\u0BA9\u0BCD\u0BB1 \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BBF\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BB3\u0BCD \u0B8E\u0BA9\u0BCD\u0BA9?',
    audio_id: "vocab_amma",
    options: [
      { id: "aq-4-a", text_ta: "Mother", is_correct: true },
      { id: "aq-4-b", text_ta: "Father", is_correct: false },
      { id: "aq-4-c", text_ta: "Sister", is_correct: false },
      { id: "aq-4-d", text_ta: "Friend", is_correct: false }
    ],
    explanation_en: "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE means Mother.",
    explanation_ta: "\u0B85\u0BAE\u0BCD\u0BAE\u0BBE \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0BA4\u0BBE\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD."
  },
  {
    id: "aq-5",
    category: "vocab",
    prompt_en: 'How do you say "Greetings / Hello" politely in Tamil?',
    prompt_ta: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BBF\u0BB2\u0BCD \u0BAA\u0BBF\u0BB1\u0BB0\u0BC8 \u0BB5\u0BB0\u0BB5\u0BC7\u0BB1\u0BCD\u0B95 \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BB5\u0BBE\u0BB4\u0BCD\u0BA4\u0BCD\u0BA4 \u0B8E\u0BA9\u0BCD\u0BA9 \u0B95\u0BC2\u0BB1\u0BC1\u0BB5\u0BCB\u0BAE\u0BCD?",
    audio_id: "vocab_vanakkam",
    options: [
      { id: "aq-5-a", text_ta: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD (vanakkam)", is_correct: true },
      { id: "aq-5-b", text_ta: "\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF (nandri)", is_correct: false },
      { id: "aq-5-c", text_ta: "\u0BB5\u0BBE (vaa)", is_correct: false },
      { id: "aq-5-d", text_ta: "\u0B9A\u0BCB\u0BB1\u0BC1 (soru)", is_correct: false }
    ],
    explanation_en: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD (vanakkam) is the standard respectful greeting in Tamil.",
    explanation_ta: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0BA4\u0BAE\u0BBF\u0BB4\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0BAA\u0BA3\u0BCD\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1 \u0BAE\u0BC1\u0B95\u0BAE\u0BA9\u0BCD."
  },
  {
    id: "aq-6",
    category: "vocab",
    prompt_en: 'What number is "\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1" (irandu)?',
    prompt_ta: '"\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B8E\u0BA8\u0BCD\u0BA4 \u0B8E\u0BA3\u0BCD?',
    audio_id: "vocab_irandu",
    options: [
      { id: "aq-6-a", text_ta: "1 (\u0B92\u0BA9\u0BCD\u0BB1\u0BC1)", is_correct: false },
      { id: "aq-6-b", text_ta: "2 (\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1)", is_correct: true },
      { id: "aq-6-c", text_ta: "3 (\u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1)", is_correct: false },
      { id: "aq-6-d", text_ta: "5 (\u0B90\u0BA8\u0BCD\u0BA4\u0BC1)", is_correct: false }
    ],
    explanation_en: "\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1 (irandu) means Two (2).",
    explanation_ta: "\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1 \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 2 \u0B90\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1."
  },
  {
    id: "aq-7",
    category: "vocab",
    prompt_en: 'What color is "\u0BAA\u0B9A\u0BCD\u0B9A\u0BC8" (pachai)?',
    prompt_ta: '"\u0BAA\u0B9A\u0BCD\u0B9A\u0BC8" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0B8E\u0BA8\u0BCD\u0BA4 \u0BA8\u0BBF\u0BB1\u0BAE\u0BCD?',
    audio_id: "vocab_pachai",
    options: [
      { id: "aq-7-a", text_ta: "Red (\u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1)", is_correct: false },
      { id: "aq-7-b", text_ta: "Green (\u0BAA\u0B9A\u0BCD\u0B9A\u0BC8)", is_correct: true },
      { id: "aq-7-c", text_ta: "Blue (\u0BA8\u0BC0\u0BB2\u0BAE\u0BCD)", is_correct: false },
      { id: "aq-7-d", text_ta: "Yellow (\u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD)", is_correct: false }
    ],
    explanation_en: "\u0BAA\u0B9A\u0BCD\u0B9A\u0BC8 (pachai) is Green like fresh leaves.",
    explanation_ta: "\u0BAA\u0B9A\u0BCD\u0B9A\u0BC8 \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0BA4\u0BB3\u0BBF\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0BB5\u0BA3\u0BCD\u0BA3\u0BAE\u0BCD."
  },
  {
    id: "aq-8",
    category: "vocab",
    prompt_en: 'Which Tamil word means "Cat"?',
    prompt_ta: '"Cat" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD \u0B8E\u0BA4\u0BC1?',
    options: [
      { id: "aq-8-a", text_ta: "\u0BA8\u0BBE\u0BAF\u0BCD (naai)", is_correct: false },
      { id: "aq-8-b", text_ta: "\u0BAA\u0BC2\u0BA9\u0BC8 (poonai)", is_correct: true },
      { id: "aq-8-c", text_ta: "\u0B95\u0BBF\u0BB3\u0BBF (kili)", is_correct: false },
      { id: "aq-8-d", text_ta: "\u0BAF\u0BBE\u0BA9\u0BC8 (yaanai)", is_correct: false }
    ],
    explanation_en: "\u0BAA\u0BC2\u0BA9\u0BC8 (poonai) is Cat.",
    explanation_ta: "\u0BAA\u0BC2\u0BA9\u0BC8 \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1 \u0BAA\u0BC2\u0BA9\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0B9F\u0BCD\u0B9F\u0BBF\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD."
  },
  {
    id: "aq-9",
    category: "sentence",
    prompt_en: 'What does "\u0BA8\u0BB2\u0BCD\u0BB2 \u0BAA\u0BC8\u0BAF\u0BA9\u0BCD" (nalla paiyan) translate to?',
    prompt_ta: '"\u0BA8\u0BB2\u0BCD\u0BB2 \u0BAA\u0BC8\u0BAF\u0BA9\u0BCD" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BB3\u0BCD \u0B8E\u0BA9\u0BCD\u0BA9?',
    options: [
      { id: "aq-9-a", text_ta: "Good boy", is_correct: true },
      { id: "aq-9-b", text_ta: "Tall tree", is_correct: false },
      { id: "aq-9-c", text_ta: "Sweet fruit", is_correct: false },
      { id: "aq-9-d", text_ta: "Big house", is_correct: false }
    ],
    explanation_en: "\u0BA8\u0BB2\u0BCD\u0BB2 (good) + \u0BAA\u0BC8\u0BAF\u0BA9\u0BCD (boy) = Good boy.",
    explanation_ta: "\u0BA8\u0BB2\u0BCD\u0BB2 + \u0BAA\u0BC8\u0BAF\u0BA9\u0BCD = \u0BA8\u0BB2\u0BCD\u0BB2 \u0BAA\u0BC8\u0BAF\u0BA9\u0BCD."
  },
  {
    id: "aq-10",
    category: "sentence",
    prompt_en: 'How do you say "My name is Aarav" in Tamil?',
    prompt_ta: '"My name is Aarav" \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BAE\u0BBF\u0BB4\u0BBF\u0BB2\u0BCD \u0B8E\u0BAA\u0BCD\u0BAA\u0B9F\u0BBF\u0B95\u0BCD \u0B95\u0BC2\u0BB1\u0BC1\u0BB5\u0BCB\u0BAE\u0BCD?',
    audio_id: "sent_en_peyar",
    options: [
      { id: "aq-10-a", text_ta: "\u0B8E\u0BA9\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD \u0B86\u0BB0\u0BB5\u0BCD (en peyar Aarav)", is_correct: true },
      { id: "aq-10-b", text_ta: "\u0B8E\u0BA9\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BB4\u0BAE\u0BCD \u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD", is_correct: false },
      { id: "aq-10-c", text_ta: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD \u0B85\u0BAE\u0BCD\u0BAE\u0BBE", is_correct: false },
      { id: "aq-10-d", text_ta: "\u0BA4\u0BA3\u0BCD\u0BA3\u0BC0\u0BB0\u0BCD \u0B95\u0BC1\u0B9F\u0BBF", is_correct: false }
    ],
    explanation_en: "\u0B8E\u0BA9\u0BCD (my) + \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD (name) + \u0B86\u0BB0\u0BB5\u0BCD (Aarav).",
    explanation_ta: "\u0B8E\u0BA9\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD \u0B86\u0BB0\u0BB5\u0BCD \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BC7 \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BA4\u0BCA\u0B9F\u0BB0\u0BCD."
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ALL_LESSONS,
  ASSESSMENT_QUESTIONS,
  AUDIO_MANIFEST,
  INITIAL_BADGES,
  INITIAL_MISSIONS,
  LEARNING_LEVELS,
  LESSON_EXERCISES
});
