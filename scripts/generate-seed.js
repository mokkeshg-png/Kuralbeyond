import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import * as esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Bundle TS data into a temporary JS module using esbuild
const tempEntry = path.join(__dirname, '_data_entry.ts');
const tempOut = path.join(__dirname, '_data_entry.mjs');

fs.writeFileSync(tempEntry, `
export * from '../src/data/curriculumData';
export * from '../src/data/audioManifest';
export * from '../src/data/badgesData';
export * from '../src/data/missionsData';
export * from '../src/data/assessmentData';
`);

esbuild.buildSync({
  entryPoints: [tempEntry],
  outfile: tempOut,
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node18',
});

// Load the compiled data
const data = await import(pathToFileURL(tempOut).href);


// Clean up temp files
fs.unlinkSync(tempEntry);
fs.unlinkSync(tempOut);

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''").normalize('NFC') + "'";
}

function escapeJson(obj) {
  if (obj === null || obj === undefined) return 'NULL';
  const jsonStr = JSON.stringify(obj).normalize('NFC');
  return "'" + jsonStr.replace(/'/g, "''") + "'::jsonb";
}

function escapeArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return "'{}'::text[]";
  const elements = arr.map(s => '"' + String(s).replace(/"/g, '\\"').normalize('NFC') + '"').join(',');
  return "'{" + elements.replace(/'/g, "''") + "}'::text[]";
}

let sql = `-- =========================================================================
-- TamilPalam Seed Curriculum & Assets (Generated from Frontend Single Source of Truth)
-- Normalization: All Tamil text is guaranteed Unicode NFC normalized
-- =========================================================================

`;

// 1. Learning Levels
sql += `-- 1. Learning Levels\n`;
for (const l of data.LEARNING_LEVELS) {
  sql += `INSERT INTO public.learning_levels (id, level_number, title_en, title_ta, description_en, description_ta, cefr, estimated_minutes, total_lessons, icon)
VALUES (${escapeSql(l.id)}, ${l.level_number}, ${escapeSql(l.title_en)}, ${escapeSql(l.title_ta)}, ${escapeSql(l.description_en)}, ${escapeSql(l.description_ta)}, ${escapeSql(l.cefr)}, ${l.estimated_minutes}, ${l.total_lessons}, ${escapeSql(l.icon)})
ON CONFLICT (level_number) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  cefr = EXCLUDED.cefr,
  estimated_minutes = EXCLUDED.estimated_minutes,
  total_lessons = EXCLUDED.total_lessons,
  icon = EXCLUDED.icon;\n`;
}
sql += `\n`;

// 2. Lessons
sql += `-- 2. Lessons\n`;
for (const l of data.ALL_LESSONS) {
  sql += `INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES (${escapeSql(l.id)}, ${escapeSql(l.level_id)}, ${l.level_number}, ${escapeSql(l.title_en)}, ${escapeSql(l.title_ta)}, ${escapeSql(l.description_en)}, ${escapeSql(l.description_ta)}, ${l.sequence_order}, ${escapeSql(l.lesson_type)}, ${l.estimated_minutes}, ${escapeSql(l.tanglish_stage)}, ${l.items_count})
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;\n`;
}
sql += `\n`;

// 3. Tamil Letters (Uyir, Aytham ஃ, Mei)
sql += `-- 3. Tamil Letters (Including ஃ / Aytham)\n`;
const lettersData = [
  // Uyir Vowels (12)
  { letter: 'அ', unicode_codepoint: 'U+0B85', letter_type: 'vowel', tanglish_primary: 'a', tanglish_alternatives: [], ipa: '/a/', example_word_ta: 'அம்மா', example_word_en: 'Mother', example_word_audio_id: 'vocab_amma' },
  { letter: 'ஆ', unicode_codepoint: 'U+0B86', letter_type: 'vowel', tanglish_primary: 'aa', tanglish_alternatives: ['a'], ipa: '/aː/', example_word_ta: 'ஆடு', example_word_en: 'Goat', example_word_audio_id: 'letter_aa' },
  { letter: 'இ', unicode_codepoint: 'U+0B87', letter_type: 'vowel', tanglish_primary: 'i', tanglish_alternatives: [], ipa: '/i/', example_word_ta: 'இலை', example_word_en: 'Leaf', example_word_audio_id: 'letter_i' },
  { letter: 'ஈ', unicode_codepoint: 'U+0B88', letter_type: 'vowel', tanglish_primary: 'ee', tanglish_alternatives: ['i'], ipa: '/iː/', example_word_ta: 'ஈட்டி', example_word_en: 'Spear', example_word_audio_id: 'letter_ee' },
  { letter: 'உ', unicode_codepoint: 'U+0B89', letter_type: 'vowel', tanglish_primary: 'u', tanglish_alternatives: [], ipa: '/u/', example_word_ta: 'உரல்', example_word_en: 'Mortar', example_word_audio_id: 'letter_u' },
  { letter: 'ஊ', unicode_codepoint: 'U+0B8A', letter_type: 'vowel', tanglish_primary: 'oo', tanglish_alternatives: ['u'], ipa: '/uː/', example_word_ta: 'ஊஞ்சல்', example_word_en: 'Swing', example_word_audio_id: 'letter_oo' },
  { letter: 'எ', unicode_codepoint: 'U+0B8E', letter_type: 'vowel', tanglish_primary: 'e', tanglish_alternatives: [], ipa: '/e/', example_word_ta: 'எலி', example_word_en: 'Rat', example_word_audio_id: 'letter_e' },
  { letter: 'ஏ', unicode_codepoint: 'U+0B8F', letter_type: 'vowel', tanglish_primary: 'ae', tanglish_alternatives: ['e'], ipa: '/eː/', example_word_ta: 'ஏணி', example_word_en: 'Ladder', example_word_audio_id: 'letter_ae' },
  { letter: 'ஐ', unicode_codepoint: 'U+0B90', letter_type: 'vowel', tanglish_primary: 'ai', tanglish_alternatives: [], ipa: '/aɪ/', example_word_ta: 'ஐந்து', example_word_en: 'Five', example_word_audio_id: 'letter_ai' },
  { letter: 'ஒ', unicode_codepoint: 'U+0B92', letter_type: 'vowel', tanglish_primary: 'o', tanglish_alternatives: [], ipa: '/o/', example_word_ta: 'ஒட்டகம்', example_word_en: 'Camel', example_word_audio_id: 'letter_o' },
  { letter: 'ஓ', unicode_codepoint: 'U+0B93', letter_type: 'vowel', tanglish_primary: 'oa', tanglish_alternatives: ['o'], ipa: '/oː/', example_word_ta: 'ஓடம்', example_word_en: 'Boat', example_word_audio_id: 'letter_oa' },
  { letter: 'ஔ', unicode_codepoint: 'U+0B94', letter_type: 'vowel', tanglish_primary: 'au', tanglish_alternatives: ['ou'], ipa: '/aʊ/', example_word_ta: 'ஔவையார்', example_word_en: 'Avvaiyar (Poet)', example_word_audio_id: 'letter_au' },
  
  // Aytham (1)
  { letter: 'ஃ', unicode_codepoint: 'U+0B83', letter_type: 'aytham', tanglish_primary: 'ak', tanglish_alternatives: ['akh'], ipa: '/x/', example_word_ta: 'எஃகு', example_word_en: 'Steel/Weapon', example_word_audio_id: 'letter_aytham' },

  // Mei Consonants (18)
  { letter: 'க்', unicode_codepoint: 'U+0B95+U+0BCD', letter_type: 'consonant', tanglish_primary: 'k', tanglish_alternatives: ['g'], ipa: '/k/', example_word_ta: 'கண்', example_word_en: 'Eye', example_word_audio_id: 'letter_k' },
  { letter: 'ங்', unicode_codepoint: 'U+0B99+U+0BCD', letter_type: 'consonant', tanglish_primary: 'ng', tanglish_alternatives: [], ipa: '/ŋ/', example_word_ta: 'சிங்கம்', example_word_en: 'Lion', example_word_audio_id: 'letter_ng' },
  { letter: 'ச்', unicode_codepoint: 'U+0B9A+U+0BCD', letter_type: 'consonant', tanglish_primary: 'ch', tanglish_alternatives: ['s'], ipa: '/t͡ʃ/', example_word_ta: 'சட்டை', example_word_en: 'Shirt', example_word_audio_id: 'letter_ch' },
  { letter: 'ஞ்', unicode_codepoint: 'U+0B9E+U+0BCD', letter_type: 'consonant', tanglish_primary: 'ny', tanglish_alternatives: ['gn'], ipa: '/ɲ/', example_word_ta: 'ஞாயிறு', example_word_en: 'Sun/Sunday', example_word_audio_id: 'letter_ny' },
  { letter: 'ட்', unicode_codepoint: 'U+0B9F+U+0BCD', letter_type: 'consonant', tanglish_primary: 't', tanglish_alternatives: ['d'], ipa: '/ʈ/', example_word_ta: 'பட்டம்', example_word_en: 'Kite', example_word_audio_id: 'letter_t' },
  { letter: 'ண்', unicode_codepoint: 'U+0BA3+U+0BCD', letter_type: 'consonant', tanglish_primary: 'nn', tanglish_alternatives: ['N'], ipa: '/ɳ/', example_word_ta: 'வண்டு', example_word_en: 'Beetle', example_word_audio_id: 'letter_nn' },
  { letter: 'த்', unicode_codepoint: 'U+0BA4+U+0BCD', letter_type: 'consonant', tanglish_primary: 'th', tanglish_alternatives: ['d'], ipa: '/t̪/', example_word_ta: 'தவளை', example_word_en: 'Frog', example_word_audio_id: 'letter_th' },
  { letter: 'ந்', unicode_codepoint: 'U+0BA8+U+0BCD', letter_type: 'consonant', tanglish_primary: 'n', tanglish_alternatives: [], ipa: '/n̪/', example_word_ta: 'நரி', example_word_en: 'Fox', example_word_audio_id: 'letter_n' },
  { letter: 'ப்', unicode_codepoint: 'U+0BAA+U+0BCD', letter_type: 'consonant', tanglish_primary: 'p', tanglish_alternatives: ['b'], ipa: '/p/', example_word_ta: 'பந்து', example_word_en: 'Ball', example_word_audio_id: 'letter_p' },
  { letter: 'ம்', unicode_codepoint: 'U+0BAE+U+0BCD', letter_type: 'consonant', tanglish_primary: 'm', tanglish_alternatives: [], ipa: '/m/', example_word_ta: 'மரம்', example_word_en: 'Tree', example_word_audio_id: 'letter_m' },
  { letter: 'ய்', unicode_codepoint: 'U+0BAF+U+0BCD', letter_type: 'consonant', tanglish_primary: 'y', tanglish_alternatives: [], ipa: '/j/', example_word_ta: 'பாய்', example_word_en: 'Mat', example_word_audio_id: 'letter_y' },
  { letter: 'ர்', unicode_codepoint: 'U+0BB0+U+0BCD', letter_type: 'consonant', tanglish_primary: 'r', tanglish_alternatives: [], ipa: '/r/', example_word_ta: 'ஏர்', example_word_en: 'Plow', example_word_audio_id: 'letter_r' },
  { letter: 'ல்', unicode_codepoint: 'U+0BB2+U+0BCD', letter_type: 'consonant', tanglish_primary: 'l', tanglish_alternatives: [], ipa: '/l/', example_word_ta: 'பல்', example_word_en: 'Tooth', example_word_audio_id: 'letter_l' },
  { letter: 'வ்', unicode_codepoint: 'U+0BB5+U+0BCD', letter_type: 'consonant', tanglish_primary: 'v', tanglish_alternatives: ['w'], ipa: '/ʋ/', example_word_ta: 'வண்டி', example_word_en: 'Cart/Vehicle', example_word_audio_id: 'letter_v' },
  { letter: 'ழ்', unicode_codepoint: 'U+0BB4+U+0BCD', letter_type: 'consonant', tanglish_primary: 'zh', tanglish_alternatives: ['z', 'l'], ipa: '/ɻ/', example_word_ta: 'தமிழ்', example_word_en: 'Tamil', example_word_audio_id: 'letter_zh' },
  { letter: 'ள்', unicode_codepoint: 'U+0BB3+U+0BCD', letter_type: 'consonant', tanglish_primary: 'll', tanglish_alternatives: ['L'], ipa: '/ɭ/', example_word_ta: 'வாள்', example_word_en: 'Sword', example_word_audio_id: 'letter_ll' },
  { letter: 'ற்', unicode_codepoint: 'U+0BB1+U+0BCD', letter_type: 'consonant', tanglish_primary: 'rr', tanglish_alternatives: ['r', 'tr'], ipa: '/r/', example_word_ta: 'காற்று', example_word_en: 'Wind/Air', example_word_audio_id: 'letter_rr' },
  { letter: 'ன்', unicode_codepoint: 'U+0BA9+U+0BCD', letter_type: 'consonant', tanglish_primary: 'na', tanglish_alternatives: ['n'], ipa: '/n/', example_word_ta: 'மீன்', example_word_en: 'Fish', example_word_audio_id: 'letter_na' }
];

for (const lt of lettersData) {
  sql += `INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES (${escapeSql(lt.letter)}, ${escapeSql(lt.unicode_codepoint)}, ${escapeSql(lt.letter_type)}, ${escapeSql(lt.tanglish_primary)}, ${escapeArray(lt.tanglish_alternatives)}, ${escapeSql(lt.ipa)}, ${escapeSql(lt.example_word_ta)}, ${escapeSql(lt.example_word_en)}, ${escapeSql(lt.example_word_audio_id)})
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;\n`;
}
sql += `\n`;

// 4. Vocabulary Items
sql += `-- 4. Vocabulary Items\n`;
const vocabList = [
  // Family
  { category: 'family', word_ta: 'அம்மா', word_tanglish: 'amma', word_en: 'Mother', audio_id: 'vocab_amma', level_number: 2, difficulty_modifier: 0.9 },
  { category: 'family', word_ta: 'அப்பா', word_tanglish: 'appa', word_en: 'Father', audio_id: 'vocab_appa', level_number: 2, difficulty_modifier: 0.9 },
  { category: 'family', word_ta: 'அக்கா', word_tanglish: 'akka', word_en: 'Older Sister', audio_id: 'vocab_akka', level_number: 2, difficulty_modifier: 0.95 },
  { category: 'family', word_ta: 'அண்ணன்', word_tanglish: 'annan', word_en: 'Older Brother', audio_id: 'vocab_anna', level_number: 2, difficulty_modifier: 0.95 },
  { category: 'family', word_ta: 'தம்பி', word_tanglish: 'thambi', word_en: 'Younger Brother', audio_id: 'vocab_thambi', level_number: 2, difficulty_modifier: 1.0 },
  { category: 'family', word_ta: 'தங்கை', word_tanglish: 'thangai', word_en: 'Younger Sister', audio_id: 'vocab_thangai', level_number: 2, difficulty_modifier: 1.0 },
  { category: 'family', word_ta: 'தாத்தா', word_tanglish: 'thaatha', word_en: 'Grandfather', audio_id: 'vocab_thaatha', level_number: 2, difficulty_modifier: 1.0 },
  { category: 'family', word_ta: 'பாட்டி', word_tanglish: 'paatti', word_en: 'Grandmother', audio_id: 'vocab_paatti', level_number: 2, difficulty_modifier: 1.0 },

  // Greetings
  { category: 'greetings', word_ta: 'வணக்கம்', word_tanglish: 'vanakkam', word_en: 'Greetings / Hello', audio_id: 'vocab_vanakkam', level_number: 0, difficulty_modifier: 0.9 },
  { category: 'greetings', word_ta: 'நன்றி', word_tanglish: 'nandri', word_en: 'Thank you', audio_id: 'vocab_nandri', level_number: 0, difficulty_modifier: 0.9 },
  { category: 'greetings', word_ta: 'நல்வரவு', word_tanglish: 'nalvaravu', word_en: 'Welcome', audio_id: 'vocab_nalvaravu', level_number: 0, difficulty_modifier: 1.0 },

  // Numbers
  { category: 'numbers', word_ta: 'ஒன்று', word_tanglish: 'ondru', word_en: 'One (1)', audio_id: 'vocab_ondru', level_number: 2, difficulty_modifier: 1.0 },
  { category: 'numbers', word_ta: 'இரண்டு', word_tanglish: 'irandu', word_en: 'Two (2)', audio_id: 'vocab_irandu', level_number: 2, difficulty_modifier: 1.0 },
  { category: 'numbers', word_ta: 'மூன்று', word_tanglish: 'moondru', word_en: 'Three (3)', audio_id: 'vocab_moondru', level_number: 2, difficulty_modifier: 1.05 },
  { category: 'numbers', word_ta: 'நான்கு', word_tanglish: 'naangu', word_en: 'Four (4)', audio_id: 'vocab_naangu', level_number: 2, difficulty_modifier: 1.05 },
  { category: 'numbers', word_ta: 'ஐந்து', word_tanglish: 'aindhu', word_en: 'Five (5)', audio_id: 'vocab_aindhu', level_number: 2, difficulty_modifier: 1.1 },

  // Colours
  { category: 'colours', word_ta: 'சிவப்பு', word_tanglish: 'sivappu', word_en: 'Red', audio_id: 'vocab_sivappu', level_number: 2, difficulty_modifier: 1.0 },
  { category: 'colours', word_ta: 'பச்சை', word_tanglish: 'pachai', word_en: 'Green', audio_id: 'vocab_pachai', level_number: 2, difficulty_modifier: 1.0 },
  { category: 'colours', word_ta: 'நீலம்', word_tanglish: 'neelam', word_en: 'Blue', audio_id: 'vocab_neelam', level_number: 2, difficulty_modifier: 1.0 },
  { category: 'colours', word_ta: 'மஞ்சள்', word_tanglish: 'manjal', word_en: 'Yellow', audio_id: 'vocab_manjal', level_number: 2, difficulty_modifier: 1.1 },

  // Animals
  { category: 'animals', word_ta: 'நாய்', word_tanglish: 'naai', word_en: 'Dog', audio_id: 'vocab_naai', level_number: 2, difficulty_modifier: 0.95 },
  { category: 'animals', word_ta: 'பூனை', word_tanglish: 'poonai', word_en: 'Cat', audio_id: 'vocab_poonai', level_number: 2, difficulty_modifier: 0.95 },
  { category: 'animals', word_ta: 'கிளி', word_tanglish: 'kili', word_en: 'Parrot', audio_id: 'vocab_kili', level_number: 2, difficulty_modifier: 1.05 },
  { category: 'animals', word_ta: 'யானை', word_tanglish: 'yaanai', word_en: 'Elephant', audio_id: 'vocab_yaanai', level_number: 2, difficulty_modifier: 1.05 },

  // Food
  { category: 'food', word_ta: 'சோறு', word_tanglish: 'soru', word_en: 'Rice', audio_id: 'vocab_soru', level_number: 2, difficulty_modifier: 1.0 },
  { category: 'food', word_ta: 'தண்ணீர்', word_tanglish: 'thanneer', word_en: 'Water', audio_id: 'vocab_thanneer', level_number: 2, difficulty_modifier: 1.05 },
  { category: 'food', word_ta: 'பால்', word_tanglish: 'paal', word_en: 'Milk', audio_id: 'vocab_paal', level_number: 2, difficulty_modifier: 0.95 },
  { category: 'food', word_ta: 'பழம்', word_tanglish: 'pazham', word_en: 'Fruit', audio_id: 'vocab_pazham', level_number: 2, difficulty_modifier: 1.15 }
];

for (const v of vocabList) {
  sql += `INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES (${escapeSql(v.category)}, ${escapeSql(v.word_ta)}, ${escapeSql(v.word_tanglish)}, ${escapeSql(v.word_en)}, ${escapeSql(v.audio_id)}, ${v.level_number}, ${v.difficulty_modifier})
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;\n`;
}
sql += `\n`;

// 5. Exercises & Questions
sql += `-- 5. Exercises, Questions & Answer Options\n`;
if (data.LESSON_EXERCISES) {
  for (const [lessonId, exercises] of Object.entries(data.LESSON_EXERCISES)) {
    for (const ex of exercises) {
      sql += `INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES (${escapeSql(ex.id)}, ${escapeSql(ex.lesson_id)}, ${escapeSql(ex.exercise_type)}, ${escapeSql(ex.prompt_en)}, ${escapeSql(ex.prompt_ta)}, ${ex.sequence_order})
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;\n`;

      for (const q of ex.questions || []) {
        sql += `INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES (${escapeSql(q.id)}, ${escapeSql(ex.id)}, ${escapeSql(q.exercise_type)}, ${escapeSql(q.prompt_en)}, ${escapeSql(q.prompt_ta)}, ${escapeSql(q.audio_prompt_id)}, ${escapeSql(q.audio_id)}, ${escapeSql(q.content_ta)}, ${escapeSql(q.content_tanglish)}, ${escapeSql(q.content_en)}, ${escapeSql(q.correct_answer)}, ${escapeSql(q.explanation_en)}, ${escapeSql(q.explanation_ta)}, ${escapeJson(q.word_bank)}, ${escapeJson(q.ordered_solution)}, ${escapeJson(q.pairs)}, ${escapeSql(q.reading_passage_ta)}, ${escapeSql(q.reading_passage_tanglish)}, ${escapeJson(q.story_panels)}, ${escapeJson(q.tracing_data)}, ${q.sequence_order || 1})
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  content_ta = EXCLUDED.content_ta,
  content_tanglish = EXCLUDED.content_tanglish,
  content_en = EXCLUDED.content_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_en = EXCLUDED.explanation_en,
  explanation_ta = EXCLUDED.explanation_ta,
  word_bank = EXCLUDED.word_bank,
  ordered_solution = EXCLUDED.ordered_solution,
  pairs = EXCLUDED.pairs,
  reading_passage_ta = EXCLUDED.reading_passage_ta,
  reading_passage_tanglish = EXCLUDED.reading_passage_tanglish,
  story_panels = EXCLUDED.story_panels,
  tracing_data = EXCLUDED.tracing_data;\n`;

        for (const opt of q.options || []) {
          sql += `INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES (${escapeSql(opt.id)}, ${escapeSql(q.id)}, ${escapeSql(opt.option_text)}, ${escapeSql(opt.option_tanglish)}, ${escapeSql(opt.option_en)}, ${opt.is_correct}, ${escapeSql(opt.audio_id)}, 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;\n`;
        }
      }
    }
  }
}
sql += `\n`;

// 6. Audio Assets from Audio Manifest
sql += `-- 6. Audio Assets (Human reviewed and staged)\n`;
if (data.AUDIO_MANIFEST) {
  for (const [audioId, entry] of Object.entries(data.AUDIO_MANIFEST)) {
    // Generate deterministic sha256 placeholder
    const sha = 'sha_' + audioId;
    sql += `INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES (${escapeSql(entry.category)}, ${escapeSql(entry.id)}, ${escapeSql(entry.tamilText)}, ${escapeSql(entry.tanglish)}, 'meera', 0.85, ${escapeSql(sha)}, ${escapeSql(entry.filePath)}, 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;\n`;
  }
}
sql += `\n`;

// 7. Achievements (Badges)
sql += `-- 7. Achievements (Badges)\n`;
for (const b of data.INITIAL_BADGES) {
  sql += `INSERT INTO public.achievements (id, name_en, name_ta, description_en, description_ta, icon, category, criteria_type, criteria_value)
VALUES (${escapeSql(b.id)}, ${escapeSql(b.name_en)}, ${escapeSql(b.name_ta)}, ${escapeSql(b.description_en)}, ${escapeSql(b.description_ta)}, ${escapeSql(b.icon)}, ${escapeSql(b.category)}, ${escapeSql(b.criteria_type)}, ${b.criteria_value})
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  criteria_type = EXCLUDED.criteria_type,
  criteria_value = EXCLUDED.criteria_value;\n`;
}
sql += `\n`;

// 8. Missions
sql += `-- 8. Real-Life Tamil Missions\n`;
for (const m of data.INITIAL_MISSIONS) {
  sql += `INSERT INTO public.missions (id, level_number, title_en, title_ta, prompt_en, prompt_ta, category, target_words_ta, target_words_en, xp_reward, is_active)
VALUES (${escapeSql(m.id)}, ${m.level_number}, ${escapeSql(m.title_en)}, ${escapeSql(m.title_ta)}, ${escapeSql(m.prompt_en)}, ${escapeSql(m.prompt_ta)}, ${escapeSql(m.category)}, ${escapeArray(m.target_words_ta)}, ${escapeArray(m.target_words_en)}, ${m.xp_reward}, true)
ON CONFLICT (id) DO UPDATE SET
  level_number = EXCLUDED.level_number,
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  category = EXCLUDED.category,
  target_words_ta = EXCLUDED.target_words_ta,
  target_words_en = EXCLUDED.target_words_en,
  xp_reward = EXCLUDED.xp_reward;\n`;
}
sql += `\n`;

const outPath = path.resolve(rootDir, 'supabase/seed.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log(`✅ Seed SQL generated successfully at ${outPath} (${sql.length} bytes)`);
