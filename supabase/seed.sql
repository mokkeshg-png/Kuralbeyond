-- =========================================================================
-- TamilPalam Seed Curriculum & Assets (Generated from Frontend Single Source of Truth)
-- Normalization: All Tamil text is guaranteed Unicode NFC normalized
-- =========================================================================

-- 1. Learning Levels
INSERT INTO public.learning_levels (id, level_number, title_en, title_ta, description_en, description_ta, cefr, estimated_minutes, total_lessons, icon)
VALUES ('level-0', 0, 'Tamil Discovery', 'தொடக்க நிலை', 'Discover the ancient beauty of Tamil script, phonics, and everyday greetings.', 'தமிழ் எழுத்துக்களின் அழகையும் இனிய ஒலிகளையும் தொடக்க நிலையிலேயே உணருங்கள்.', 'Pre-A1', 15, 3, 'Sparkles')
ON CONFLICT (level_number) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  cefr = EXCLUDED.cefr,
  estimated_minutes = EXCLUDED.estimated_minutes,
  total_lessons = EXCLUDED.total_lessons,
  icon = EXCLUDED.icon;
INSERT INTO public.learning_levels (id, level_number, title_en, title_ta, description_en, description_ta, cefr, estimated_minutes, total_lessons, icon)
VALUES ('level-1', 1, 'Vowels & Basic Consonants', 'உயிரும் மெய்யும்', 'Learn all 12 Uyir vowels (அ–ஔ), the Aytham (ஃ), and fundamental consonants with tracing.', '12 உயிர் எழுத்துக்கள், ஆய்த எழுத்து (ஃ) மற்றும் அடிப்படை மெய் எழுத்துக்களைக் கற்று வரைக.', 'Pre-A1', 45, 5, 'BookOpen')
ON CONFLICT (level_number) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  cefr = EXCLUDED.cefr,
  estimated_minutes = EXCLUDED.estimated_minutes,
  total_lessons = EXCLUDED.total_lessons,
  icon = EXCLUDED.icon;
INSERT INTO public.learning_levels (id, level_number, title_en, title_ta, description_en, description_ta, cefr, estimated_minutes, total_lessons, icon)
VALUES ('level-2', 2, 'First Words & Everyday Life', 'முதல் சொற்கள்', 'Explore 50+ core words: family, greetings, numbers, vibrant colors, animals, and food.', 'குடும்பம், வாழ்த்துகள், எண்கள், வண்ணங்கள், விலங்குகள் மற்றும் உணவுகள் குறித்த 50+ சொற்கள்.', 'A1 (Receptive)', 60, 6, 'Grid')
ON CONFLICT (level_number) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  cefr = EXCLUDED.cefr,
  estimated_minutes = EXCLUDED.estimated_minutes,
  total_lessons = EXCLUDED.total_lessons,
  icon = EXCLUDED.icon;
INSERT INTO public.learning_levels (id, level_number, title_en, title_ta, description_en, description_ta, cefr, estimated_minutes, total_lessons, icon)
VALUES ('level-3', 3, 'Syllables & Early Reading', 'உயிர்மெய் எழுத்துக்கள்', 'Combine vowels and consonants into Uyirmei syllables to read simple 2–3 letter words.', 'உயிர்மெய் எழுத்துக்களை இணைத்து எளிய 2–3 எழுத்துச் சொற்களை வாசிக்கப் பழகுங்கள்.', 'A1', 60, 5, 'Puzzle')
ON CONFLICT (level_number) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  cefr = EXCLUDED.cefr,
  estimated_minutes = EXCLUDED.estimated_minutes,
  total_lessons = EXCLUDED.total_lessons,
  icon = EXCLUDED.icon;
INSERT INTO public.learning_levels (id, level_number, title_en, title_ta, description_en, description_ta, cefr, estimated_minutes, total_lessons, icon)
VALUES ('level-4', 4, 'Simple Sentences & Self', 'எளிய வாக்கியங்கள்', 'Build Subject-Object-Verb sentences, introduce yourself, and ask everyday questions.', 'எளிய வாக்கியங்களை அமைத்து உங்கள் பெயரை அறிமுகப்படுத்தி கேள்விகள் கேளுங்கள்.', 'A1+', 75, 5, 'Layers')
ON CONFLICT (level_number) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  cefr = EXCLUDED.cefr,
  estimated_minutes = EXCLUDED.estimated_minutes,
  total_lessons = EXCLUDED.total_lessons,
  icon = EXCLUDED.icon;
INSERT INTO public.learning_levels (id, level_number, title_en, title_ta, description_en, description_ta, cefr, estimated_minutes, total_lessons, icon)
VALUES ('level-5', 5, 'Conversations & Daily Life', 'உரையாடல்கள்', 'Follow practical dialogues: school life, market visits, and polite social requests.', 'பள்ளி மற்றும் சந்தை சூழல்களில் நடைமுறை உரையாடல்களைக் கேட்டுப் புரிந்து கொள்ளுங்கள்.', 'A2 (Listening)', 80, 4, 'MessageCircle')
ON CONFLICT (level_number) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  cefr = EXCLUDED.cefr,
  estimated_minutes = EXCLUDED.estimated_minutes,
  total_lessons = EXCLUDED.total_lessons,
  icon = EXCLUDED.icon;
INSERT INTO public.learning_levels (id, level_number, title_en, title_ta, description_en, description_ta, cefr, estimated_minutes, total_lessons, icon)
VALUES ('level-6', 6, 'Stories & Reading', 'கதைகளும் வாசிப்பும்', 'Read short heritage paragraphs and cultural stories with comprehension quizzes.', 'காகமும் தண்ணீரும், பொங்கல் திருவிழா போன்ற சிறு கதைகளைப் படித்துப் புரிந்துகொள்ளுங்கள்.', 'A2', 90, 4, 'Feather')
ON CONFLICT (level_number) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  cefr = EXCLUDED.cefr,
  estimated_minutes = EXCLUDED.estimated_minutes,
  total_lessons = EXCLUDED.total_lessons,
  icon = EXCLUDED.icon;
INSERT INTO public.learning_levels (id, level_number, title_en, title_ta, description_en, description_ta, cefr, estimated_minutes, total_lessons, icon)
VALUES ('level-7', 7, 'Real-World Tamil & Heritage', 'நடைமுறைத் தமிழ்', 'Complete real-life family missions, explore Thirukkural wisdom, and express thoughts.', 'திருக்குறள் நல்வழிகள், பழமொழிகள் மற்றும் நடைமுறைப் பணிகளுடன் தமிழ் ஆளுமை பெறுங்கள்.', 'A2+', 90, 4, 'Award')
ON CONFLICT (level_number) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  cefr = EXCLUDED.cefr,
  estimated_minutes = EXCLUDED.estimated_minutes,
  total_lessons = EXCLUDED.total_lessons,
  icon = EXCLUDED.icon;

-- 2. Lessons
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-0-1', 'level-0', 0, 'The Tamil Sound World', 'தமிழ் ஒலி உலகம்', 'Introduction to Tamil sounds and greeting with Vanakkam.', 'தமிழ் ஒலிகளின் அறிமுகமும் "வணக்கம்" கூறி வாழ்த்துவதும்.', 1, 'vocabulary', 5, 'A', 5)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-0-2', 'level-0', 0, 'Script Discovery', 'எழுத்துக்களின் அடையாளம்', 'Recognize the curvy, circular shapes of Tamil letters.', 'தமிழ் எழுத்துக்களின் அழகிய வட்ட வடிவங்களை அறிதல்.', 2, 'letters', 5, 'A', 5)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-1-1', 'level-1', 1, 'First Vowels: அ & ஆ', 'முதல் உயிரெழுத்துக்கள்: அ மற்றும் ஆ', 'Short "a" and long "aa" with tracing, audio phonics, and example words.', '"அ" மற்றும் "ஆ" எழுத்துக்களின் ஒலி வேறுபாடும் எழுதுதலும்.', 1, 'letters', 8, 'A', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-1-2', 'level-1', 1, 'Vowels: இ & ஈ', 'உயிரெழுத்துக்கள்: இ மற்றும் ஈ', 'Short "i" and long "ee" with interactive outline tracing.', '"இ" மற்றும் "ஈ" எழுத்துக்களின் ஒலியும் வரைதல் பயிற்சியும்.', 2, 'letters', 8, 'A', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-1-3', 'level-1', 1, 'Vowels: உ & ஊ', 'உயிரெழுத்துக்கள்: உ மற்றும் ஊ', 'Rounded vowels "u" and "oo" with audio comparison.', '"உ" மற்றும் "ஊ" எழுத்துக்களின் இனிய ஒலிகளும் சொற்களும்.', 3, 'letters', 8, 'A', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-1-4', 'level-1', 1, 'Vowels: எ, ஏ, ஐ, ஒ, ஓ, ஔ', 'மீதமுள்ள உயிரெழுத்துக்கள்', 'Master the remaining vowels and discover their unique rhythm.', 'எ, ஏ, ஐ, ஒ, ஓ, ஔ ஆகிய உயிரெழுத்துக்களைப் பயிலுதல்.', 4, 'letters', 10, 'A', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-1-5', 'level-1', 1, 'The Aytham Letter: ஃ (Ak)', 'ஆய்த எழுத்து: ஃ', 'Learn the special 3-dot Aytham letter and first consonants (க், ட்).', 'மூன்று புள்ளிகளாலான ஆய்த எழுத்து (ஃ) மற்றும் மெய் எழுத்துக்கள்.', 5, 'letters', 8, 'B', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-2-1', 'level-2', 2, 'Family & Loved Ones', 'குடும்ப உறவுகள்', 'Learn அம்மா (amma), அப்பா (appa), அக்கா (akka), அண்ணன் (annan).', 'அம்மா, அப்பா, அக்கா, அண்ணன் போன்ற இனிய உறவுச் சொற்கள்.', 1, 'vocabulary', 10, 'B', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-2-2', 'level-2', 2, 'Counting 1 to 5', 'எண்கள் 1 முதல் 5 வரை', 'ஒன்று (ondru), இரண்டு (irandu), மூன்று (moondru), நான்கு, ஐந்து.', 'ஒன்று முதல் ஐந்து வரையிலான எண்களைக் கற்றல்.', 2, 'vocabulary', 8, 'B', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-2-3', 'level-2', 2, 'Rainbow of Colors', 'வண்ணங்களின் உலகம்', 'சிவப்பு (sivappu - red), பச்சை (pachai - green), நீலம் (neelam - blue), மஞ்சள் (manjal - yellow).', 'சிவப்பு, பச்சை, நீலம், மஞ்சள் போன்ற முக்கிய வண்ணங்கள்.', 3, 'vocabulary', 8, 'B', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-2-4', 'level-2', 2, 'Animals & Pets', 'விலங்குகளும் செல்லப் பிராணிகளும்', 'நாய் (naai), பூனை (poonai), கிளி (kili), யானை (yaanai).', 'நாய், பூனை, கிளி மற்றும் யானை சொற்களைக் கற்றல்.', 4, 'vocabulary', 8, 'B', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-2-5', 'level-2', 2, 'Delicious Food & Drinks', 'உணவும் பானமும்', 'சோறு (soru), தண்ணீர் (thanneer), பழம் (pazham), பால் (paal).', 'சோறு, தண்ணீர், பழம் மற்றும் பால் போன்ற அன்றாட உணவுச் சொற்கள்.', 5, 'vocabulary', 8, 'B', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-3-1', 'level-3', 3, 'Combining Sounds: க to கா', 'உயிர்மெய்: க வரிசை', 'See how adding the vowel sign turns க் into க and கா.', 'க் உடன் உயிர் எழுத்துக்கள் சேர்ந்து உருவாகும் க வரிசை.', 1, 'letters', 10, 'B', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-3-2', 'level-3', 3, 'Two-Syllable Word Reading', 'ஈரெழுத்துச் சொற்களைப் படித்தல்', 'Read simple words like கல் (kal - stone), கண் (kan - eye), பால் (paal - milk).', 'கல், கண், பால் போன்ற எளிய ஈரெழுத்துச் சொற்களை வாசித்தல்.', 2, 'reading', 10, 'C', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-4-1', 'level-4', 4, 'Subject-Object-Verb Order', 'வாக்கிய அமைப்பு முறை', 'Build your first sentences: "நான் பால் குடிக்கிறேன்" (I drink milk).', 'எழுவாய்-செயப்படுபொருள்-பயனிலை அமைப்பில் வாக்கியங்களை உருவாக்குதல்.', 1, 'sentences', 10, 'C', 6)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-4-2', 'level-4', 4, 'Introducing Yourself', 'சுய அறிமுகம்', 'Say your name with pride: "என் பெயர்..." (en peyar...)', '"என் பெயர்..." என்று கூறி உங்கள் பெயரைத் தமிழில் அறிமுகப்படுத்துதல்.', 2, 'speaking', 10, 'C', 5)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;
INSERT INTO public.lessons (id, level_id, level_number, title_en, title_ta, description_en, description_ta, sequence_order, lesson_type, estimated_minutes, tanglish_stage, items_count)
VALUES ('lesson-6-1', 'level-6', 6, 'Cultural Story: The Clever Crow', 'பாரம்பரியக் கதை: காகமும் தண்ணீரும்', 'A 4-panel illustrated classic tale with sentence-by-sentence audio narration.', 'படங்களுடன் கூடிய "காகமும் தண்ணீரும்" சிறு கதை மற்றும் வினாக்கள்.', 1, 'story', 12, 'D', 5)
ON CONFLICT (level_id, sequence_order) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  lesson_type = EXCLUDED.lesson_type,
  tanglish_stage = EXCLUDED.tanglish_stage,
  items_count = EXCLUDED.items_count;

-- 3. Tamil Letters (Including ஃ / Aytham)
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('அ', 'U+0B85', 'vowel', 'a', '{}'::text[], '/a/', 'அம்மா', 'Mother', 'vocab_amma')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ஆ', 'U+0B86', 'vowel', 'aa', '{"a"}'::text[], '/aː/', 'ஆடு', 'Goat', 'letter_aa')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('இ', 'U+0B87', 'vowel', 'i', '{}'::text[], '/i/', 'இலை', 'Leaf', 'letter_i')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ஈ', 'U+0B88', 'vowel', 'ee', '{"i"}'::text[], '/iː/', 'ஈட்டி', 'Spear', 'letter_ee')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('உ', 'U+0B89', 'vowel', 'u', '{}'::text[], '/u/', 'உரல்', 'Mortar', 'letter_u')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ஊ', 'U+0B8A', 'vowel', 'oo', '{"u"}'::text[], '/uː/', 'ஊஞ்சல்', 'Swing', 'letter_oo')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('எ', 'U+0B8E', 'vowel', 'e', '{}'::text[], '/e/', 'எலி', 'Rat', 'letter_e')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ஏ', 'U+0B8F', 'vowel', 'ae', '{"e"}'::text[], '/eː/', 'ஏணி', 'Ladder', 'letter_ae')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ஐ', 'U+0B90', 'vowel', 'ai', '{}'::text[], '/aɪ/', 'ஐந்து', 'Five', 'letter_ai')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ஒ', 'U+0B92', 'vowel', 'o', '{}'::text[], '/o/', 'ஒட்டகம்', 'Camel', 'letter_o')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ஓ', 'U+0B93', 'vowel', 'oa', '{"o"}'::text[], '/oː/', 'ஓடம்', 'Boat', 'letter_oa')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ஔ', 'U+0B94', 'vowel', 'au', '{"ou"}'::text[], '/aʊ/', 'ஔவையார்', 'Avvaiyar (Poet)', 'letter_au')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ஃ', 'U+0B83', 'aytham', 'ak', '{"akh"}'::text[], '/x/', 'எஃகு', 'Steel/Weapon', 'letter_aytham')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('க்', 'U+0B95+U+0BCD', 'consonant', 'k', '{"g"}'::text[], '/k/', 'கண்', 'Eye', 'letter_k')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ங்', 'U+0B99+U+0BCD', 'consonant', 'ng', '{}'::text[], '/ŋ/', 'சிங்கம்', 'Lion', 'letter_ng')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ச்', 'U+0B9A+U+0BCD', 'consonant', 'ch', '{"s"}'::text[], '/t͡ʃ/', 'சட்டை', 'Shirt', 'letter_ch')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ஞ்', 'U+0B9E+U+0BCD', 'consonant', 'ny', '{"gn"}'::text[], '/ɲ/', 'ஞாயிறு', 'Sun/Sunday', 'letter_ny')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ட்', 'U+0B9F+U+0BCD', 'consonant', 't', '{"d"}'::text[], '/ʈ/', 'பட்டம்', 'Kite', 'letter_t')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ண்', 'U+0BA3+U+0BCD', 'consonant', 'nn', '{"N"}'::text[], '/ɳ/', 'வண்டு', 'Beetle', 'letter_nn')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('த்', 'U+0BA4+U+0BCD', 'consonant', 'th', '{"d"}'::text[], '/t̪/', 'தவளை', 'Frog', 'letter_th')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ந்', 'U+0BA8+U+0BCD', 'consonant', 'n', '{}'::text[], '/n̪/', 'நரி', 'Fox', 'letter_n')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ப்', 'U+0BAA+U+0BCD', 'consonant', 'p', '{"b"}'::text[], '/p/', 'பந்து', 'Ball', 'letter_p')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ம்', 'U+0BAE+U+0BCD', 'consonant', 'm', '{}'::text[], '/m/', 'மரம்', 'Tree', 'letter_m')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ய்', 'U+0BAF+U+0BCD', 'consonant', 'y', '{}'::text[], '/j/', 'பாய்', 'Mat', 'letter_y')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ர்', 'U+0BB0+U+0BCD', 'consonant', 'r', '{}'::text[], '/r/', 'ஏர்', 'Plow', 'letter_r')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ல்', 'U+0BB2+U+0BCD', 'consonant', 'l', '{}'::text[], '/l/', 'பல்', 'Tooth', 'letter_l')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('வ்', 'U+0BB5+U+0BCD', 'consonant', 'v', '{"w"}'::text[], '/ʋ/', 'வண்டி', 'Cart/Vehicle', 'letter_v')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ழ்', 'U+0BB4+U+0BCD', 'consonant', 'zh', '{"z","l"}'::text[], '/ɻ/', 'தமிழ்', 'Tamil', 'letter_zh')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ள்', 'U+0BB3+U+0BCD', 'consonant', 'll', '{"L"}'::text[], '/ɭ/', 'வாள்', 'Sword', 'letter_ll')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ற்', 'U+0BB1+U+0BCD', 'consonant', 'rr', '{"r","tr"}'::text[], '/r/', 'காற்று', 'Wind/Air', 'letter_rr')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;
INSERT INTO public.tamil_letters (letter, unicode_codepoint, letter_type, tanglish_primary, tanglish_alternatives, ipa, example_word_ta, example_word_en, example_word_audio_id)
VALUES ('ன்', 'U+0BA9+U+0BCD', 'consonant', 'na', '{"n"}'::text[], '/n/', 'மீன்', 'Fish', 'letter_na')
ON CONFLICT (letter) DO UPDATE SET
  unicode_codepoint = EXCLUDED.unicode_codepoint,
  letter_type = EXCLUDED.letter_type,
  tanglish_primary = EXCLUDED.tanglish_primary,
  tanglish_alternatives = EXCLUDED.tanglish_alternatives,
  ipa = EXCLUDED.ipa,
  example_word_ta = EXCLUDED.example_word_ta,
  example_word_en = EXCLUDED.example_word_en,
  example_word_audio_id = EXCLUDED.example_word_audio_id;

-- 4. Vocabulary Items
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('family', 'அம்மா', 'amma', 'Mother', 'vocab_amma', 2, 0.9)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('family', 'அப்பா', 'appa', 'Father', 'vocab_appa', 2, 0.9)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('family', 'அக்கா', 'akka', 'Older Sister', 'vocab_akka', 2, 0.95)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('family', 'அண்ணன்', 'annan', 'Older Brother', 'vocab_anna', 2, 0.95)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('family', 'தம்பி', 'thambi', 'Younger Brother', 'vocab_thambi', 2, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('family', 'தங்கை', 'thangai', 'Younger Sister', 'vocab_thangai', 2, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('family', 'தாத்தா', 'thaatha', 'Grandfather', 'vocab_thaatha', 2, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('family', 'பாட்டி', 'paatti', 'Grandmother', 'vocab_paatti', 2, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('greetings', 'வணக்கம்', 'vanakkam', 'Greetings / Hello', 'vocab_vanakkam', 0, 0.9)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('greetings', 'நன்றி', 'nandri', 'Thank you', 'vocab_nandri', 0, 0.9)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('greetings', 'நல்வரவு', 'nalvaravu', 'Welcome', 'vocab_nalvaravu', 0, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('numbers', 'ஒன்று', 'ondru', 'One (1)', 'vocab_ondru', 2, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('numbers', 'இரண்டு', 'irandu', 'Two (2)', 'vocab_irandu', 2, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('numbers', 'மூன்று', 'moondru', 'Three (3)', 'vocab_moondru', 2, 1.05)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('numbers', 'நான்கு', 'naangu', 'Four (4)', 'vocab_naangu', 2, 1.05)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('numbers', 'ஐந்து', 'aindhu', 'Five (5)', 'vocab_aindhu', 2, 1.1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('colours', 'சிவப்பு', 'sivappu', 'Red', 'vocab_sivappu', 2, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('colours', 'பச்சை', 'pachai', 'Green', 'vocab_pachai', 2, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('colours', 'நீலம்', 'neelam', 'Blue', 'vocab_neelam', 2, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('colours', 'மஞ்சள்', 'manjal', 'Yellow', 'vocab_manjal', 2, 1.1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('animals', 'நாய்', 'naai', 'Dog', 'vocab_naai', 2, 0.95)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('animals', 'பூனை', 'poonai', 'Cat', 'vocab_poonai', 2, 0.95)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('animals', 'கிளி', 'kili', 'Parrot', 'vocab_kili', 2, 1.05)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('animals', 'யானை', 'yaanai', 'Elephant', 'vocab_yaanai', 2, 1.05)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('food', 'சோறு', 'soru', 'Rice', 'vocab_soru', 2, 1)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('food', 'தண்ணீர்', 'thanneer', 'Water', 'vocab_thanneer', 2, 1.05)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('food', 'பால்', 'paal', 'Milk', 'vocab_paal', 2, 0.95)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;
INSERT INTO public.vocabulary_items (category, word_ta, word_tanglish, word_en, audio_id, level_number, difficulty_modifier)
VALUES ('food', 'பழம்', 'pazham', 'Fruit', 'vocab_pazham', 2, 1.15)
ON CONFLICT (word_ta) DO UPDATE SET
  category = EXCLUDED.category,
  word_tanglish = EXCLUDED.word_tanglish,
  word_en = EXCLUDED.word_en,
  audio_id = EXCLUDED.audio_id,
  level_number = EXCLUDED.level_number,
  difficulty_modifier = EXCLUDED.difficulty_modifier;

-- 5. Exercises, Questions & Answer Options
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-0-1-1', 'lesson-0-1', 'vocab_card', 'Listen to the universal Tamil greeting: "வணக்கம்" (vanakkam):', 'தமிழின் உன்னத வாழ்த்துச் சொல்லான "வணக்கம்" ஒலியைக் கேளுங்கள்:', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-0-1-1', 'ex-0-1-1', 'vocab_card', 'Universal Tamil Greeting', 'முதல் வாழ்த்துச் சொல்', NULL, 'vocab_vanakkam', 'வணக்கம்', 'vanakkam', 'Hello / Greetings / Welcome', 'listened', '"வணக்கம்" (vanakkam) is said with palms together to greet anyone with respect and warmth.', '"வணக்கம்" என்பது இரு கரம் கூப்பி அனைவரையும் அன்புடன் வரவேற்கும் சொல்.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-0-1-2', 'lesson-0-1', 'mcq', 'Which word means "Hello" or "Greetings" in Tamil?', '"Hello / Greetings" என்பதற்கான தமிழ்ச் சொல் எது?', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-0-1-2', 'ex-0-1-2', 'mcq', 'Choose the greeting:', 'வாழ்த்துச் சொல்லைத் தேர்ந்தெடுக்கவும்:', NULL, 'vocab_vanakkam', 'வணக்கம்', 'vanakkam', NULL, 'வணக்கம் (vanakkam)', 'Wonderful! "வணக்கம்" (vanakkam) is the standard greeting.', 'மிகச் சரி! வணக்கம் என்பது அனைவருக்கும் பொதுவான வாழ்த்து.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-v-1', 'q-0-1-2', 'வணக்கம் (vanakkam)', 'Hello', NULL, true, 'vocab_vanakkam', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-v-2', 'q-0-1-2', 'நன்றி (nandri)', 'Thank you', NULL, false, 'vocab_nandri', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-v-3', 'q-0-1-2', 'அம்மா (amma)', 'Mother', NULL, false, 'vocab_amma', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-0-1-3', 'lesson-0-1', 'vocab_card', 'Listen to how we say "Thank you" in Tamil: "நன்றி" (nandri):', '"நன்றி" என்று எவ்வாறு கூறுவது என்பதைக் கேளுங்கள்:', 3)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-0-1-3', 'ex-0-1-3', 'vocab_card', 'Expressing Gratitude', 'நன்றி நவில்தல்', NULL, 'vocab_nandri', 'நன்றி', 'nandri', 'Thank you', 'listened', '"நன்றி" (nandri) means Thank you in Tamil.', '"நன்றி" என்பது ஒருவருக்கு நன்றி தெரிவிக்கப் பயன்படும் சொல்.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-0-1-4', 'lesson-0-1', 'mcq', 'What do you say to say "Thank you" in Tamil?', '"Thank you" என்று கூற எந்தச் சொல்லைப் பயன்படுத்துவீர்கள்?', 4)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-0-1-4', 'ex-0-1-4', 'mcq', 'Select Thank You:', 'நன்றி சொல்லும் சொல்லைத் தேர்ந்தெடுக்கவும்:', NULL, 'vocab_nandri', 'நன்றி', 'nandri', NULL, 'நன்றி (nandri)', 'Excellent! "நன்றி" (nandri) expresses gratitude.', 'அற்புதம்! "நன்றி" என்பது சரியான விடை.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-n-1', 'q-0-1-4', 'நன்றி (nandri)', 'Thank you', NULL, true, 'vocab_nandri', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-n-2', 'q-0-1-4', 'வணக்கம் (vanakkam)', 'Hello', NULL, false, 'vocab_vanakkam', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-n-3', 'q-0-1-4', 'அப்பா (appa)', 'Father', NULL, false, 'vocab_appa', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-0-1-5', 'lesson-0-1', 'speaking', 'Try speaking "வணக்கம்" (vanakkam). Tap record and greet!', '"வணக்கம்" என்று பேசிப் பழகுங்கள். ஒலிப்பதிவைத் தட்டிப் பேசுங்கள்!', 5)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-0-1-5', 'ex-0-1-5', 'speaking', 'Say: வணக்கம் (vanakkam)', 'பேசவும்: வணக்கம்', NULL, 'vocab_vanakkam', 'வணக்கம்', 'vanakkam', 'Greetings / Hello', 'recorded', 'Arpudham! You just spoke your first Tamil greeting with warmth.', 'அற்புதம்! உங்கள் முதல் வாழ்த்துச் சொல்லை அழகாகப் பேசிவிட்டீர்கள்.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-0-2-1', 'lesson-0-2', 'tracing', 'Discover the curvy outline of the first Tamil letter "அ" (a):', 'தமிழ் முதல் எழுத்தான "அ" இன் அழகான வளைவை வரைக:', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-0-2-1', 'ex-0-2-1', 'tracing', 'Trace letter அ (a)', 'அ எழுத்தை வரைக', NULL, 'letter_a', 'அ', 'a', 'First Tamil Letter "அ" / அம்மா (amma)', 'completed', 'Tamil letters are round and flowing. அ begins with a central loop!', 'தமிழ் எழுத்துக்கள் வட்ட வடிவமானவை. நடுவில் சுழித்துத் தொடங்குகிறது!', NULL, NULL, NULL, NULL, NULL, NULL, '{"letter":"அ","outline_path":"M 40 35 C 30 35, 25 45, 25 55 C 25 70, 40 75, 55 70 C 65 65, 70 50, 60 40 C 50 30, 35 30, 35 45 C 35 60, 50 70, 70 70 L 85 70 M 70 70 L 70 25 L 70 85"}'::jsonb, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-0-2-2', 'lesson-0-2', 'mcq', 'Which of the following is the Tamil letter "அ"?', 'இவற்றுள் தமிழ் எழுத்தான "அ" எது?', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-0-2-2', 'ex-0-2-2', 'mcq', 'Identify the letter "அ":', '"அ" எழுத்தை அடையாளம் காண்க:', NULL, 'letter_a', 'அ', 'a', NULL, 'அ', 'Yes! "அ" is the letter you just traced.', 'சரியான விடை! "அ" என்பது முதல் தமிழ் உயிர் எழுத்து.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-s-1', 'q-0-2-2', 'அ', 'Short a', NULL, true, 'letter_a', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-s-2', 'q-0-2-2', 'A', 'English A', NULL, false, NULL, 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-s-3', 'q-0-2-2', '1', 'Number 1', NULL, false, NULL, 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-0-2-3', 'lesson-0-2', 'matching', 'Match greetings and words with their English meanings:', 'சொற்களை அவற்றின் ஆங்கிலப் பொருளுடன் பொருத்துக:', 3)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-0-2-3', 'ex-0-2-3', 'matching', 'Match pairs:', 'பொருத்துக:', NULL, NULL, 'வாழ்த்துக்கள்', NULL, NULL, 'matched', 'Great job! You know the foundations of Tamil vocabulary.', 'அருமை! தொடக்க நிலை சொற்களைச் சரியாகப் பொருத்தினீர்கள்.', NULL, NULL, '[{"id":"p0-1","left_ta":"வணக்கம் (vanakkam)","right_en":"Hello","audio_id":"vocab_vanakkam"},{"id":"p0-2","left_ta":"நன்றி (nandri)","right_en":"Thank you","audio_id":"vocab_nandri"},{"id":"p0-3","left_ta":"அம்மா (amma)","right_en":"Mother","audio_id":"vocab_amma"}]'::jsonb, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-1-1', 'lesson-1-1', 'tracing', 'Trace the letter "அ" (a) carefully inside the outline:', '"அ" எழுத்தின் எல்லைக்கோடு மீது விரலால் வரைக:', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-1-1', 'ex-1-1-1', 'tracing', 'Trace letter அ (a)', 'அ எழுத்தை வரைக', NULL, 'letter_a', 'அ', 'a', 'Short "a" as in America / அம்மா (amma)', 'completed', 'அ is the very first letter of the Tamil alphabet. It begins from the center spiral!', 'அ என்பது தமிழின் முதல் உயிர் எழுத்து. நடுவில் சுழித்துத் தொடங்குகிறது!', NULL, NULL, NULL, NULL, NULL, NULL, '{"letter":"அ","outline_path":"M 40 35 C 30 35, 25 45, 25 55 C 25 70, 40 75, 55 70 C 65 65, 70 50, 60 40 C 50 30, 35 30, 35 45 C 35 60, 50 70, 70 70 L 85 70 M 70 70 L 70 25 L 70 85"}'::jsonb, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-1-2', 'lesson-1-1', 'vocab_card', 'Listen to the sound of "அ" (a) and its example word:', '"அ" எழுத்தின் ஒலியையும் எடுத்துக்காட்டுச் சொல்லையும் கேளுங்கள்:', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-1-2', 'ex-1-1-2', 'vocab_card', 'Listen to the vowel and word', 'எழுத்தையும் சொல்லையும் கேளுங்கள்', NULL, 'vocab_amma', 'அ → அம்மா', 'a → amma', 'Mother / Mom', 'listened', '"அம்மா" (amma) means Mother. It begins with the short vowel "அ".', '"அம்மா" என்ற சொல் குறில் "அ" எழுத்தில் தொடங்குகிறது.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-1-3', 'lesson-1-1', 'mcq', 'Which letter makes the short sound "a" as in "amma"?', '"அம்மா" என்பதில் தொடங்கும் குறில் "அ" ஒலி எந்த எழுத்து?', 3)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-1-3', 'ex-1-1-3', 'mcq', 'Select the letter that makes the "a" sound:', '"அ" ஒலி தரும் எழுத்தைத் தேர்ந்தெடுக்கவும்:', NULL, 'letter_a', 'அ', 'a', NULL, 'அ', 'Correct! "அ" is the short vowel /a/.', 'சரியான விடை! "அ" என்பது குறில் உயிரெழுத்து.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-1', 'q-1-1-3', 'அ', 'a', NULL, true, 'letter_a', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-2', 'q-1-1-3', 'ஆ', 'aa', NULL, false, 'letter_aa', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-3', 'q-1-1-3', 'இ', 'i', NULL, false, 'letter_i', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-4', 'q-1-1-3', 'ஈ', 'ee', NULL, false, 'letter_ee', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-1-4', 'lesson-1-1', 'tracing', 'Now trace the long vowel "ஆ" (aa) with its graceful lower loop:', 'நீண்ட "ஆ" எழுத்தின் அழகிய கீழ் சுழியை வரைக:', 4)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-1-4', 'ex-1-1-4', 'tracing', 'Trace letter ஆ (aa)', 'ஆ எழுத்தை வரைக', NULL, 'letter_aa', 'ஆ', 'aa', 'Long "aa" as in father / அப்பா (appa begins with a, but ஆடு / aadu begins with aa)', 'completed', 'Notice the cute loop at the bottom right that makes "அ" into the long "ஆ"!', '"அ" எழுத்தின் வலது கீழ் பக்கத்தில் சுழி சேர்க்கும்போது நெடில் "ஆ" ஆகிறது!', NULL, NULL, NULL, NULL, NULL, NULL, '{"letter":"ஆ","outline_path":"M 35 35 C 25 35, 20 45, 20 55 C 20 70, 35 75, 50 70 C 60 65, 65 50, 55 40 C 45 30, 30 30, 30 45 L 65 70 M 65 70 L 65 25 L 65 85 C 65 95, 80 95, 85 85 C 90 75, 75 75, 75 80"}'::jsonb, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-1-5', 'lesson-1-1', 'listening', 'Listen to the audio sound. Is it the short "a" or the long "aa"?', 'ஒலியைக் கேளுங்கள். அது குறில் "அ" ஒலியா அல்லது நெடில் "ஆ" ஒலியா?', 5)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-1-5', 'ex-1-1-5', 'listening', 'Identify the spoken vowel:', 'கேட்கப்பட்ட எழுத்தைத் தேர்ந்தெடுக்கவும்:', NULL, 'letter_aa', 'ஆ', 'aa', NULL, 'ஆ', 'The sound was stretched long: "aa" (ஆ)!', 'நீண்ட நெடில் ஒலி: "ஆ" (aa)!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-aa-1', 'q-1-1-5', 'அ (Short a)', 'a', NULL, false, 'letter_a', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-aa-2', 'q-1-1-5', 'ஆ (Long aa)', 'aa', NULL, true, 'letter_aa', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-1-6', 'lesson-1-1', 'speaking', 'Try speaking "அம்மா" (amma). Tap record, say it clearly, and listen to your playback!', '"அம்மா" என்று பேசப் பழகுங்கள். பதிவைத் தட்டிப் பேசி, உங்கள் குரலைக் கேளுங்கள்!', 6)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-1-6', 'ex-1-1-6', 'speaking', 'Say: அம்மா (amma)', 'பேசவும்: அம்மா', NULL, 'vocab_amma', 'அம்மா', 'amma', 'Mother', 'recorded', 'Wonderful! Hearing your own voice alongside model Tamil is the fastest way to build confidence.', 'மிக நன்று! உங்கள் குரலை வழிகாட்டி ஒலியுடன் ஒப்பிட்டுப் பார்ப்பது சிறந்த பயிற்சி.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-2-1', 'lesson-1-2', 'tracing', 'Trace the letter "இ" (i) starting from the inner loop:', '"இ" எழுத்தின் வளைந்த எல்லைக்கோடு மீது விரலால் வரைக:', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-2-1', 'ex-1-2-1', 'tracing', 'Trace letter இ (i)', 'இ எழுத்தை வரைக', NULL, 'letter_i', 'இ', 'i', 'Short "i" as in igloo / இலை (ilai - leaf)', 'completed', 'இ is a short vowel. It sweeps smoothly upward and curls around!', 'இ என்பது குறில் உயிர் எழுத்து. அழகிய மேல் வளைவுடன் முடிகிறது!', NULL, NULL, NULL, NULL, NULL, NULL, '{"letter":"இ","outline_path":"M 35 35 C 25 35, 20 45, 20 55 C 20 70, 35 75, 50 70 C 60 65, 65 50, 55 40 C 45 30, 30 30, 30 45 C 30 65, 50 80, 75 75 C 85 70, 85 55, 75 50 L 50 50"}'::jsonb, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-2-2', 'lesson-1-2', 'vocab_card', 'Listen to the sound of "இ" (i) and the word "இலை" (ilai):', '"இ" எழுத்தின் ஒலியையும் "இலை" என்ற சொல்லையும் கேளுங்கள்:', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-2-2', 'ex-1-2-2', 'vocab_card', 'Listen to the vowel and word', 'எழுத்தையும் சொல்லையும் கேளுங்கள்', NULL, 'letter_i', 'இ → இலை', 'i → ilai', 'Leaf', 'listened', '"இலை" (ilai) means Leaf. It starts with the short vowel "இ".', '"இலை" என்ற சொல் குறில் "இ" எழுத்தில் தொடங்குகிறது.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-2-3', 'lesson-1-2', 'mcq', 'Which letter makes the short sound "i" as in "ilai"?', '"இலை" என்பதில் தொடங்கும் குறில் "இ" ஒலி எது?', 3)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-2-3', 'ex-1-2-3', 'mcq', 'Select the letter that makes the "i" sound:', '"இ" ஒலி தரும் எழுத்தைத் தேர்ந்தெடுக்கவும்:', NULL, 'letter_i', 'இ', 'i', NULL, 'இ', 'Correct! "இ" is the short vowel /i/.', 'சரியான விடை! "இ" என்பது குறில் உயிரெழுத்து.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-i-1', 'q-1-2-3', 'இ', 'i', NULL, true, 'letter_i', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-i-2', 'q-1-2-3', 'ஈ', 'ee', NULL, false, 'letter_ee', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-i-3', 'q-1-2-3', 'அ', 'a', NULL, false, 'letter_a', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-i-4', 'q-1-2-3', 'ஆ', 'aa', NULL, false, 'letter_aa', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-2-4', 'lesson-1-2', 'tracing', 'Now trace the long vowel "ஈ" (ee) with its distinctive two vertical eyes:', 'இரண்டு புள்ளிகள் கொண்ட நெடில் "ஈ" எழுத்தை வரைக:', 4)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-2-4', 'ex-1-2-4', 'tracing', 'Trace letter ஈ (ee)', 'ஈ எழுத்தை வரைக', NULL, 'letter_ee', 'ஈ', 'ee', 'Long "ee" as in eel / ஈட்டி (eetti - spear) or ஈ (ee - housefly)', 'completed', 'ஈ is uniquely shaped with a central pillar and two dots inside and outside!', 'ஈ என்பது தனித்துவமான நெடில் உயிர் எழுத்து!', NULL, NULL, NULL, NULL, NULL, NULL, '{"letter":"ஈ","outline_path":"M 25 30 L 25 80 M 25 30 L 75 30 L 75 80 M 50 30 L 50 80 M 37 55 L 38 55 M 63 55 L 64 55"}'::jsonb, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-2-5', 'lesson-1-2', 'listening', 'Listen to the audio sound. Is it the short "i" or the long "ee"?', 'ஒலியைக் கேளுங்கள். அது குறில் "இ" ஒலியா அல்லது நெடில் "ஈ" ஒலியா?', 5)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-2-5', 'ex-1-2-5', 'listening', 'Identify the spoken vowel:', 'கேட்கப்பட்ட எழுத்தைத் தேர்ந்தெடுக்கவும்:', NULL, 'letter_ee', 'ஈ', 'ee', NULL, 'ஈ', 'The sound was stretched long: "ee" (ஈ)!', 'நீண்ட நெடில் ஒலி: "ஈ" (ee)!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-ee-1', 'q-1-2-5', 'இ (Short i)', 'i', NULL, false, 'letter_i', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-ee-2', 'q-1-2-5', 'ஈ (Long ee)', 'ee', NULL, true, 'letter_ee', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-3-1', 'lesson-1-3', 'tracing', 'Trace the curved letter "உ" (u) with its bottom loop:', '"உ" எழுத்தின் அடிப்புற வளைவை விரலால் வரைக:', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-3-1', 'ex-1-3-1', 'tracing', 'Trace letter உ (u)', 'உ எழுத்தை வரைக', NULL, 'letter_u', 'உ', 'u', 'Short "u" as in put / உலகம் (ulagam - world)', 'completed', 'உ is the short rounded vowel. It starts with a small loop and extends flat along the base.', 'உ என்பது குறில் உயிர் எழுத்து. சுழித்துத் தொடங்கி கீழே நேர்கோடாக விரிகிறது.', NULL, NULL, NULL, NULL, NULL, NULL, '{"letter":"உ","outline_path":"M 35 35 C 25 35, 20 45, 20 55 C 20 70, 35 75, 50 70 C 60 65, 65 50, 55 40 L 40 40 L 40 75 L 85 75"}'::jsonb, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-3-2', 'lesson-1-3', 'vocab_card', 'Listen to the sound of "உ" (u) and "உலகம்" (ulagam):', '"உ" எழுத்தின் ஒலியையும் "உலகம்" என்ற சொல்லையும் கேளுங்கள்:', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-3-2', 'ex-1-3-2', 'vocab_card', 'Listen to the vowel and word', 'எழுத்தையும் சொல்லையும் கேளுங்கள்', NULL, 'letter_u', 'உ → உலகம்', 'u → ulagam', 'World', 'listened', '"உலகம்" (ulagam) means World. It begins with the short vowel "உ".', '"உலகம்" என்ற சொல் குறில் "உ" எழுத்தில் தொடங்குகிறது.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-3-3', 'lesson-1-3', 'mcq', 'Which letter represents the short sound "u"?', 'குறில் "உ" ஒலியைக் குறிக்கும் எழுத்து எது?', 3)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-3-3', 'ex-1-3-3', 'mcq', 'Select the letter:', 'எழுத்தைத் தேர்ந்தெடுக்கவும்:', NULL, 'letter_u', 'உ', 'u', NULL, 'உ', 'Super! "உ" is the short rounded vowel.', 'அருமை! "உ" என்பது குறில் உயிரெழுத்து.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-u-1', 'q-1-3-3', 'உ', 'u', NULL, true, 'letter_u', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-u-2', 'q-1-3-3', 'ஊ', 'oo', NULL, false, 'letter_oo', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-u-3', 'q-1-3-3', 'இ', 'i', NULL, false, 'letter_i', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-u-4', 'q-1-3-3', 'அ', 'a', NULL, false, 'letter_a', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-3-4', 'lesson-1-3', 'tracing', 'Now trace "ஊ" (oo) which has the special "ள" crown on top:', 'மேலே "ள" துணை கொண்ட நெடில் "ஊ" எழுத்தை வரைக:', 4)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-3-4', 'ex-1-3-4', 'tracing', 'Trace letter ஊ (oo)', 'ஊ எழுத்தை வரைக', NULL, 'letter_oo', 'ஊ', 'oo', 'Long "oo" as in moon / ஊஞ்சல் (oonjal - swing)', 'completed', 'ஊ is made by writing உ and placing a mini ள symbol above it!', 'உ எழுத்தின் மேல் "ள" அமைப்பை வைத்தால் நெடில் "ஊ" ஆகிறது!', NULL, NULL, NULL, NULL, NULL, NULL, '{"letter":"ஊ","outline_path":"M 25 45 C 20 45, 15 52, 15 60 C 15 72, 25 75, 40 75 L 75 75 M 45 25 C 40 25, 35 30, 35 38 C 35 48, 55 48, 55 38 L 70 38"}'::jsonb, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-3-5', 'lesson-1-3', 'listening', 'Listen to the sound. Is it "u" or "oo"?', 'ஒலியைக் கேட்டு சரியான எழுத்தைத் தேர்ந்தெடுக்கவும்:', 5)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-3-5', 'ex-1-3-5', 'listening', 'Identify the spoken vowel:', 'கேட்கப்பட்ட எழுத்தைத் தேர்ந்தெடுக்கவும்:', NULL, 'letter_oo', 'ஊ', 'oo', NULL, 'ஊ', 'Correct! The sound was elongated: "oo" (ஊ)!', 'சரி! நீண்ட நெடில் ஒலி: "ஊ" (oo)!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-oo-1', 'q-1-3-5', 'உ (Short u)', 'u', NULL, false, 'letter_u', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-oo-2', 'q-1-3-5', 'ஊ (Long oo)', 'oo', NULL, true, 'letter_oo', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-4-1', 'lesson-1-4', 'vocab_card', 'Listen to the short vowel "எ" (e) and word "எறும்பு" (erumbu):', '"எ" ஒலியையும் "எறும்பு" என்ற சொல்லையும் கேளுங்கள்:', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-4-1', 'ex-1-4-1', 'vocab_card', 'Listen to the vowel and word', 'எழுத்தையும் சொல்லையும் கேளுங்கள்', NULL, 'letter_e', 'எ → எறும்பு', 'e → erumbu', 'Ant', 'listened', '"எறும்பு" (erumbu) means Ant. It begins with the short vowel "எ".', '"எறும்பு" என்ற சொல் குறில் "எ" எழுத்தில் தொடங்குகிறது.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-4-2', 'lesson-1-4', 'mcq', 'Which letter makes the short "e" sound as in "elephant"?', '"எ" என்ற குறில் ஒலியைத் தரும் எழுத்து எது?', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-4-2', 'ex-1-4-2', 'mcq', 'Select the letter:', 'எழுத்தைத் தேர்ந்தெடுக்கவும்:', NULL, 'letter_e', 'எ', 'e', NULL, 'எ', 'Correct! "எ" is the short /e/ vowel.', 'சரியான விடை! "எ" என்பது குறில் உயிரெழுத்து.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-e-1', 'q-1-4-2', 'எ', 'e', NULL, true, 'letter_e', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-e-2', 'q-1-4-2', 'ஏ', 'ee/ae', NULL, false, 'letter_ee', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-e-3', 'q-1-4-2', 'அ', 'a', NULL, false, 'letter_a', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-e-4', 'q-1-4-2', 'இ', 'i', NULL, false, 'letter_i', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-4-3', 'lesson-1-4', 'vocab_card', 'Listen to the long vowel "ஏ" (ae) and word "ஏணி" (eani):', '"ஏ" ஒலியையும் "ஏணி" என்ற சொல்லையும் கேளுங்கள்:', 3)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-4-3', 'ex-1-4-3', 'vocab_card', 'Listen to the vowel and word', 'எழுத்தையும் சொல்லையும் கேளுங்கள்', NULL, 'letter_ee', 'ஏ → ஏணி', 'ae → eani', 'Ladder', 'listened', '"ஏணி" (eani) means Ladder. It begins with the long vowel "ஏ".', '"ஏணி" என்ற சொல் நெடில் "ஏ" எழுத்தில் தொடங்குகிறது.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-5-1', 'lesson-1-5', 'tracing', 'Trace the 3 iconic triangular dots of the Aytham letter "ஃ" (ak):', 'ஆய்த எழுத்தான "ஃ" இன் மூன்று முப்புள்ளிகளை வரைக:', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-5-1', 'ex-1-5-1', 'tracing', 'Trace ஃ (aytham)', 'ஃ எழுத்தை வரைக', NULL, 'letter_aytham', 'ஃ', 'ak', 'Aytham (ஆய்த எழுத்து) — 3 dots shaped like a warrior shield / எஃகு (ehgu - steel)', 'completed', 'ஃ is called Aytham (ஆய்த எழுத்து) or Muppulli (முப்புள்ளி). It has 1 top dot and 2 bottom dots!', 'ஃ என்பது ஆய்த எழுத்து அல்லது முப்புள்ளி என அழைக்கப்படும் தனி எழுத்து!', NULL, NULL, NULL, NULL, NULL, NULL, '{"letter":"ஃ","outline_path":"M 50 30 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 35 65 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 65 65 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0"}'::jsonb, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-1-5-2', 'lesson-1-5', 'mcq', 'How many dots make up the Tamil Aytham letter (ஃ)?', 'தமிழ் ஆய்த எழுத்தில் (ஃ) எத்தனை புள்ளிகள் உள்ளன?', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-1-5-2', 'ex-1-5-2', 'mcq', 'Count the dots in ஃ:', 'ஃ புள்ளிகளின் எண்ணிக்கை:', NULL, 'letter_aytham', 'ஃ', 'ak', NULL, '3', 'Yes! Exactly 3 dots arranged in a triangle (முப்பாற்புள்ளி).', 'சரியான விடை! மூன்று புள்ளிகள் முக்கோண வடிவில் அமைந்திருக்கும்.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-ay-1', 'q-1-5-2', '1', NULL, NULL, false, NULL, 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-ay-2', 'q-1-5-2', '2', NULL, NULL, false, NULL, 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-ay-3', 'q-1-5-2', '3 (மூன்று)', NULL, NULL, true, NULL, 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-ay-4', 'q-1-5-2', '4', NULL, NULL, false, NULL, 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-2-1-1', 'lesson-2-1', 'vocab_card', 'Tap to hear each family word in authentic Tamil:', 'குடும்ப உறவுச் சொற்களைக் கேட்க தட்டவும்:', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-2-1-1', 'ex-2-1-1', 'vocab_card', 'Learn Family Words', 'குடும்பச் சொற்கள்', NULL, 'vocab_appa', 'அப்பா', 'appa', 'Father / Dad', 'listened', '"அப்பா" (appa) is Father.', '"அப்பா" என்பது தந்தையைக் குறிக்கும் சொல்.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-2-1-2', 'lesson-2-1', 'matching', 'Match each Tamil family word with its English meaning:', 'ஒவ்வொரு தமிழ்ச் சொல்லையும் அதன் பொருளுடன் பொருத்துக:', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-2-1-2', 'ex-2-1-2', 'matching', 'Tap pairs to match:', 'இணைக்க தட்டவும்:', NULL, NULL, 'குடும்பம்', NULL, NULL, 'matched', 'Superb! அம்மா is Mother, அப்பா is Father, and அக்கா is Elder Sister.', 'அருமை! அம்மா, அப்பா, அக்கா உறவுகளைச் சரியாகப் பொருத்தினீர்கள்.', NULL, NULL, '[{"id":"p1","left_ta":"அம்மா (amma)","right_en":"Mother","audio_id":"vocab_amma"},{"id":"p2","left_ta":"அப்பா (appa)","right_en":"Father","audio_id":"vocab_appa"},{"id":"p3","left_ta":"அக்கா (akka)","right_en":"Elder Sister","audio_id":"vocab_akka"}]'::jsonb, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-2-1-3', 'lesson-2-1', 'mcq', 'What is the Tamil word for "Thank you"?', '"Thank you" என்பதன் தமிழ்ச் சொல் எது?', 3)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-2-1-3', 'ex-2-1-3', 'mcq', 'Choose the correct word for Thank You:', 'நன்றி செலுத்தும் சொல்லைத் தேர்ந்தெடுக்கவும்:', NULL, 'vocab_nandri', 'நன்றி', 'nandri', NULL, 'நன்றி (nandri)', '"நன்றி" (nandri) means Thank you in Tamil!', '"நன்றி" என்பது நன்றி நவிழும் சொல்!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-ty-1', 'q-2-1-3', 'வணக்கம் (vanakkam)', NULL, 'Hello / Greetings', false, 'vocab_vanakkam', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-ty-2', 'q-2-1-3', 'நன்றி (nandri)', NULL, 'Thank you', true, 'vocab_nandri', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-ty-3', 'q-2-1-3', 'அம்மா (amma)', NULL, 'Mother', false, 'vocab_amma', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-2-4-1', 'lesson-2-4', 'mcq', 'What is the Tamil word and correct Tanglish for "Cat"?', '"Cat" என்பதன் சரியான தமிழ்ச் சொல்லும் தங்கிலிஷும் எது?', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-2-4-1', 'ex-2-4-1', 'mcq', 'Select the cat:', 'பூனைக்கான சொல்லைத் தேர்ந்தெடுக்கவும்:', NULL, 'vocab_poonai', 'பூனை', 'poonai', NULL, 'பூனை (poonai)', 'Exactly! Cat is பூனை and transliterated as "poonai" with the "-ai" diphthong.', 'சரியான விடை! பூனை (poonai) என்பது சரியான தங்கிலிஷ் மற்றும் தமிழ்ச் சொல்.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-cat-1', 'q-2-4-1', 'பூனை (poonai)', NULL, 'Cat', true, 'vocab_poonai', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-cat-2', 'q-2-4-1', 'நாய் (naai)', NULL, 'Dog', false, 'vocab_naai', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-cat-3', 'q-2-4-1', 'கிளி (kili)', NULL, 'Parrot', false, 'vocab_kili', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-cat-4', 'q-2-4-1', 'யானை (yaanai)', NULL, 'Elephant', false, 'vocab_yaanai', 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-2-4-2', 'lesson-2-4', 'matching', 'Connect each animal with its Tamil name:', 'விலங்குகளை அவற்றின் தமிழ்ப் பெயர்களுடன் இணைக்குக:', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-2-4-2', 'ex-2-4-2', 'matching', 'Match Animals:', 'விலங்குகளைப் பொருத்துக:', NULL, NULL, 'விலங்குகள்', NULL, NULL, 'matched', 'Great job matching all four animals!', 'அனைத்து விலங்குகளையும் மிகச் சரியாகப் பொருத்தினீர்கள்!', NULL, NULL, '[{"id":"pa1","left_ta":"நாய் (naai)","right_en":"Dog","audio_id":"vocab_naai"},{"id":"pa2","left_ta":"பூனை (poonai)","right_en":"Cat","audio_id":"vocab_poonai"},{"id":"pa3","left_ta":"கிளி (kili)","right_en":"Parrot","audio_id":"vocab_kili"}]'::jsonb, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-4-1-1', 'lesson-4-1', 'ordering', 'Arrange the 3D tiles into a correct Tamil sentence: "I like fruit" (எனக்கு பழம் பிடிக்கும்):', 'சொற்களைச் சரியான வரிசையில் ஒழுங்குபடுத்துக: "எனக்கு பழம் பிடிக்கும்":', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-4-1-1', 'ex-4-1-1', 'ordering', 'Build the sentence: "I like fruit"', 'வாக்கியத்தை அமைக்க: எனக்கு பழம் பிடிக்கும்', NULL, NULL, 'எனக்கு பழம் பிடிக்கும்', 'enakku pazham pidikkum', 'I like fruit', 'எனக்கு பழம் பிடிக்கும்', 'Tamil uses Subject (எனக்கு) - Object (பழம்) - Verb (பிடிக்கும்) sentence structure!', 'தமிழில் "எனக்கு (To me) + பழம் (fruit) + பிடிக்கும் (is liked)" என்ற வடிவில் வாக்கியம் அமைகிறது!', '[{"id":"w1","text_ta":"பழம்","text_tanglish":"pazham","audio_id":"vocab_pazham"},{"id":"w2","text_ta":"எனக்கு","text_tanglish":"enakku","audio_id":"sent_fruit_like"},{"id":"w3","text_ta":"பிடிக்கும்","text_tanglish":"pidikkum","audio_id":"sent_fruit_like"}]'::jsonb, '["எனக்கு","பழம்","பிடிக்கும்"]'::jsonb, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-4-1-2', 'lesson-4-1', 'ordering', 'Arrange the tiles to say: "Drink water" (தண்ணீர் குடி):', 'சொற்களை ஒழுங்குபடுத்துக: "தண்ணீர் குடி":', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-4-1-2', 'ex-4-1-2', 'ordering', 'Build: Drink water', 'அமைக்க: தண்ணீர் குடி', NULL, NULL, 'தண்ணீர் குடி', 'thanneer kudi', 'Drink water', 'தண்ணீர் குடி', '"தண்ணீர்" (water) + "குடி" (drink). Well done!', '"தண்ணீர்" + "குடி" = தண்ணீர் குடி!', '[{"id":"w-kudi","text_ta":"குடி","text_tanglish":"kudi","audio_id":"sent_water_drink"},{"id":"w-thanneer","text_ta":"தண்ணீர்","text_tanglish":"thanneer","audio_id":"vocab_thanneer"}]'::jsonb, '["தண்ணீர்","குடி"]'::jsonb, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-6-1-1', 'lesson-6-1', 'story', 'Read and listen to the illustrated story panel by panel:', 'படங்களுடன் கதையை உற்றுநோக்கி வாசியுங்கள்:', 1)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-6-1-1', 'ex-6-1-1', 'story', 'Story: The Clever Crow (காகமும் தண்ணீரும்)', 'கதை: காகமும் தண்ணீரும்', NULL, 'story_clever_crow', 'ஒரு காட்டில் தாகத்துடன் ஒரு காகம் பறந்தது.', 'oru kaattil thaagathudan oru kaagam parandhadhu.', 'A thirsty crow flew across the forest looking for water.', 'finished', 'This classic story teaches us that patience and intelligence solve any problem!', 'புத்திசாலித்தனமும் விடாமுயற்சியும் எந்த சவாலையும் வெல்லும் என்பதைக் கதை காட்டுகிறது!', NULL, NULL, NULL, NULL, NULL, '[{"image_url":"crow_thirsty","caption_ta":"ஒரு நாள் ஒரு காகத்திற்கு மிகவும் தாகம் எடுத்தது.","caption_tanglish":"Oru naal oru kaagathirku migavum thaagam eduthadhu.","caption_en":"One sunny day, a crow felt very thirsty.","audio_id":"story_clever_crow"},{"image_url":"crow_pot","caption_ta":"அது தோட்டத்தில் ஒரு சிறிய தண்ணீர் பானையைக் கண்டது.","caption_tanglish":"Adhu thottathil oru siriya thanneer paanaiyai kandadhu.","caption_en":"It spotted a small water pot in a peaceful garden.","audio_id":"story_clever_crow"},{"image_url":"crow_pebbles","caption_ta":"பானையில் நீர் குறைவாக இருந்ததால், காகம் கூழாங்கற்களைப் போட்டது.","caption_tanglish":"Paanaiyil neer kuraivaaga irundhadhaal, kaagam koozhaangarkalai pottadhu.","caption_en":"The water was too deep, so the clever crow dropped pebbles inside.","audio_id":"story_clever_crow"},{"image_url":"crow_drinks","caption_ta":"நீர் மேலே வந்தது! காகம் மகிழ்ச்சியாகத் தண்ணீர் குடித்தது.","caption_tanglish":"Neer maele vandhadhu! Kaagam magizhchiyaaga thanneer kudithadhu.","caption_en":"The water rose to the top! The joyful crow drank and flew happily.","audio_id":"story_clever_crow"}]'::jsonb, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.exercises (id, lesson_id, exercise_type, prompt_en, prompt_ta, sequence_order)
VALUES ('ex-6-1-2', 'lesson-6-1', 'reading', 'Comprehension Question: What did the clever crow drop into the pot?', 'கதை வினா: பானையில் நீர் மேலே வர காகம் எதைப் போட்டது?', 2)
ON CONFLICT (id) DO UPDATE SET
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  sequence_order = EXCLUDED.sequence_order;
INSERT INTO public.questions (id, exercise_id, exercise_type, prompt_en, prompt_ta, audio_prompt_id, audio_id, content_ta, content_tanglish, content_en, correct_answer, explanation_en, explanation_ta, word_bank, ordered_solution, pairs, reading_passage_ta, reading_passage_tanglish, story_panels, tracing_data, sequence_order)
VALUES ('q-6-1-2', 'ex-6-1-2', 'reading', 'What did the crow drop into the water pot?', 'காகம் பானைக்குள் எதைப் போட்டது?', NULL, NULL, 'கூழாங்கற்கள்', 'koozhaangarkal', NULL, 'கூழாங்கற்கள் (Pebbles)', 'Correct! By dropping pebbles (கூழாங்கற்கள்), the water level rose to the top.', 'சரியான விடை! கூழாங்கற்களைப் போட்டு நீர் மட்டத்தை மேலே உயர்த்தியது.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
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
  tracing_data = EXCLUDED.tracing_data;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-cr-1', 'q-6-1-2', 'இலைகள் (Leaves)', NULL, NULL, false, NULL, 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-cr-2', 'q-6-1-2', 'கூழாங்கற்கள் (Pebbles)', NULL, NULL, true, NULL, 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;
INSERT INTO public.answer_options (id, question_id, option_text, option_tanglish, option_en, is_correct, audio_id, sequence_order)
VALUES ('opt-cr-3', 'q-6-1-2', 'பழங்கள் (Fruits)', NULL, NULL, false, NULL, 1)
ON CONFLICT (id) DO UPDATE SET
  option_text = EXCLUDED.option_text,
  option_tanglish = EXCLUDED.option_tanglish,
  option_en = EXCLUDED.option_en,
  is_correct = EXCLUDED.is_correct,
  audio_id = EXCLUDED.audio_id;

-- 6. Audio Assets (Human reviewed and staged)
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_a', 'அ', 'a', 'meera', 0.85, 'sha_letter_a', '/audio/letters/a.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_aa', 'ஆ', 'aa', 'meera', 0.85, 'sha_letter_aa', '/audio/letters/aa.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_i', 'இ', 'i', 'meera', 0.85, 'sha_letter_i', '/audio/letters/i.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_ee', 'ஈ', 'ee', 'meera', 0.85, 'sha_letter_ee', '/audio/letters/ee.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_u', 'உ', 'u', 'meera', 0.85, 'sha_letter_u', '/audio/letters/u.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_oo', 'ஊ', 'oo', 'meera', 0.85, 'sha_letter_oo', '/audio/letters/oo.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_e', 'எ', 'e', 'meera', 0.85, 'sha_letter_e', '/audio/letters/e.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_ae', 'ஏ', 'ae', 'meera', 0.85, 'sha_letter_ae', '/audio/letters/ae.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_ai', 'ஐ', 'ai', 'meera', 0.85, 'sha_letter_ai', '/audio/letters/ai.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_o', 'ஒ', 'o', 'meera', 0.85, 'sha_letter_o', '/audio/letters/o.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_oa', 'ஓ', 'oa', 'meera', 0.85, 'sha_letter_oa', '/audio/letters/oa.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_au', 'ஔ', 'au', 'meera', 0.85, 'sha_letter_au', '/audio/letters/au.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_aytham', 'ஃ', 'ak', 'meera', 0.85, 'sha_letter_aytham', '/audio/letters/aytham.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_k', 'க்', 'k', 'meera', 0.85, 'sha_letter_k', '/audio/letters/k.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_ng', 'ங்', 'ng', 'meera', 0.85, 'sha_letter_ng', '/audio/letters/ng.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_ch', 'ச்', 'ch', 'meera', 0.85, 'sha_letter_ch', '/audio/letters/ch.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_ny', 'ஞ்', 'ny', 'meera', 0.85, 'sha_letter_ny', '/audio/letters/ny.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_t', 'ட்', 't', 'meera', 0.85, 'sha_letter_t', '/audio/letters/t.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_nn', 'ண்', 'nn', 'meera', 0.85, 'sha_letter_nn', '/audio/letters/nn.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_th', 'த்', 'th', 'meera', 0.85, 'sha_letter_th', '/audio/letters/th.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_n', 'ந்', 'n', 'meera', 0.85, 'sha_letter_n', '/audio/letters/n.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_p', 'ப்', 'p', 'meera', 0.85, 'sha_letter_p', '/audio/letters/p.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_m', 'ம்', 'm', 'meera', 0.85, 'sha_letter_m', '/audio/letters/m.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_y', 'ய்', 'y', 'meera', 0.85, 'sha_letter_y', '/audio/letters/y.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_r', 'ர்', 'r', 'meera', 0.85, 'sha_letter_r', '/audio/letters/r.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_l', 'ல்', 'l', 'meera', 0.85, 'sha_letter_l', '/audio/letters/l.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_v', 'வ்', 'v', 'meera', 0.85, 'sha_letter_v', '/audio/letters/v.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_zh', 'ழ்', 'zh', 'meera', 0.85, 'sha_letter_zh', '/audio/letters/zh.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_ll', 'ள்', 'll', 'meera', 0.85, 'sha_letter_ll', '/audio/letters/ll.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_rr', 'ற்', 'rr', 'meera', 0.85, 'sha_letter_rr', '/audio/letters/rr.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('letter', 'letter_na', 'ன்', 'n', 'meera', 0.85, 'sha_letter_na', '/audio/letters/na.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_amma', 'அம்மா', 'amma', 'meera', 0.85, 'sha_vocab_amma', '/audio/vocab/amma.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_appa', 'அப்பா', 'appa', 'meera', 0.85, 'sha_vocab_appa', '/audio/vocab/appa.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_akka', 'அக்கா', 'akka', 'meera', 0.85, 'sha_vocab_akka', '/audio/vocab/akka.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_anna', 'அண்ணன்', 'annan', 'meera', 0.85, 'sha_vocab_anna', '/audio/vocab/anna.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_thambi', 'தம்பி', 'thambi', 'meera', 0.85, 'sha_vocab_thambi', '/audio/vocab/thambi.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_thangai', 'தங்கை', 'thangai', 'meera', 0.85, 'sha_vocab_thangai', '/audio/vocab/thangai.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_vanakkam', 'வணக்கம்', 'vanakkam', 'meera', 0.85, 'sha_vocab_vanakkam', '/audio/vocab/vanakkam.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_nandri', 'நன்றி', 'nandri', 'meera', 0.85, 'sha_vocab_nandri', '/audio/vocab/nandri.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_nalvaravu', 'நல்வரவு', 'nalvaravu', 'meera', 0.85, 'sha_vocab_nalvaravu', '/audio/vocab/nalvaravu.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_ondru', 'ஒன்று', 'ondru', 'meera', 0.85, 'sha_vocab_ondru', '/audio/vocab/ondru.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_irandu', 'இரண்டு', 'irandu', 'meera', 0.85, 'sha_vocab_irandu', '/audio/vocab/irandu.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_moondru', 'மூன்று', 'moondru', 'meera', 0.85, 'sha_vocab_moondru', '/audio/vocab/moondru.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_naangu', 'நான்கு', 'naangu', 'meera', 0.85, 'sha_vocab_naangu', '/audio/vocab/naangu.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_ainthu', 'ஐந்து', 'ainthu', 'meera', 0.85, 'sha_vocab_ainthu', '/audio/vocab/ainthu.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_sivappu', 'சிவப்பு', 'sivappu', 'meera', 0.85, 'sha_vocab_sivappu', '/audio/vocab/sivappu.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_pachai', 'பச்சை', 'pachai', 'meera', 0.85, 'sha_vocab_pachai', '/audio/vocab/pachai.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_neelam', 'நீலம்', 'neelam', 'meera', 0.85, 'sha_vocab_neelam', '/audio/vocab/neelam.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_manjal', 'மஞ்சள்', 'manjal', 'meera', 0.85, 'sha_vocab_manjal', '/audio/vocab/manjal.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_vellai', 'வெள்ளை', 'vellai', 'meera', 0.85, 'sha_vocab_vellai', '/audio/vocab/vellai.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_naai', 'நாய்', 'naai', 'meera', 0.85, 'sha_vocab_naai', '/audio/vocab/naai.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_poonai', 'பூனை', 'poonai', 'meera', 0.85, 'sha_vocab_poonai', '/audio/vocab/poonai.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_kili', 'கிளி', 'kili', 'meera', 0.85, 'sha_vocab_kili', '/audio/vocab/kili.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_yaanai', 'யானை', 'yaanai', 'meera', 0.85, 'sha_vocab_yaanai', '/audio/vocab/yaanai.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_soru', 'சோறு', 'soru', 'meera', 0.85, 'sha_vocab_soru', '/audio/vocab/soru.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_thanneer', 'தண்ணீர்', 'thanneer', 'meera', 0.85, 'sha_vocab_thanneer', '/audio/vocab/thanneer.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_pazham', 'பழம்', 'pazham', 'meera', 0.85, 'sha_vocab_pazham', '/audio/vocab/pazham.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_paal', 'பால்', 'paal', 'meera', 0.85, 'sha_vocab_paal', '/audio/vocab/paal.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_vaa', 'வா', 'vaa', 'meera', 0.85, 'sha_vocab_vaa', '/audio/vocab/vaa.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('word', 'vocab_po', 'போ', 'po', 'meera', 0.85, 'sha_vocab_po', '/audio/vocab/po.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('sentence', 'sent_nalla_paiyan', 'நல்ல பையன்', 'nalla paiyan', 'meera', 0.85, 'sha_sent_nalla_paiyan', '/audio/sentences/nalla_paiyan.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('sentence', 'sent_en_peyar', 'என் பெயர் ஆரவ்', 'en peyar Aarav', 'meera', 0.85, 'sha_sent_en_peyar', '/audio/sentences/en_peyar.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('sentence', 'sent_eppadi_irukku', 'உனக்கு எப்படி இருக்கிறது?', 'unakku eppadi irukku?', 'meera', 0.85, 'sha_sent_eppadi_irukku', '/audio/sentences/eppadi_irukku.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('sentence', 'sent_fruit_like', 'எனக்கு பழம் பிடிக்கும்', 'enakku pazham pidikkum', 'meera', 0.85, 'sha_sent_fruit_like', '/audio/sentences/fruit_like.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('sentence', 'sent_water_drink', 'தண்ணீர் குடி', 'thanneer kudi', 'meera', 0.85, 'sha_sent_water_drink', '/audio/sentences/water_drink.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('story', 'story_clever_crow', 'காகமும் தண்ணீரும்', 'kaagamum thanneerum', 'meera', 0.85, 'sha_story_clever_crow', '/audio/stories/clever_crow.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;
INSERT INTO public.audio_assets (item_type, item_id, tamil_text, tanglish, voice, pace, sha256, storage_path, status, needs_review)
VALUES ('story', 'story_pongal_feast', 'பொங்கல் திருவிழா', 'pongal thiruvizha', 'meera', 0.85, 'sha_story_pongal_feast', '/audio/stories/pongal_feast.mp3', 'approved', false)
ON CONFLICT (sha256) DO UPDATE SET
  tamil_text = EXCLUDED.tamil_text,
  tanglish = EXCLUDED.tanglish,
  storage_path = EXCLUDED.storage_path,
  status = EXCLUDED.status;

-- 7. Achievements (Badges)
INSERT INTO public.achievements (id, name_en, name_ta, description_en, description_ta, icon, category, criteria_type, criteria_value)
VALUES ('badge-uyir-explorer', 'Uyir Explorer', 'உயிர் ஆய்வாளர்', 'Recognize your first Tamil vowels (அ, ஆ, இ, ஈ).', 'முதல் தமிழ் உயிர் எழுத்துக்களை அடையாளம் காணுதல்.', 'Sparkles', 'letters', 'letters_mastered', 4)
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  criteria_type = EXCLUDED.criteria_type,
  criteria_value = EXCLUDED.criteria_value;
INSERT INTO public.achievements (id, name_en, name_ta, description_en, description_ta, icon, category, criteria_type, criteria_value)
VALUES ('badge-mei-master', 'Mei Master', 'மெய் மேதை', 'Master 10 basic Tamil consonants with correct sounds.', '10 அடிப்படை மெய் எழுத்துக்களின் ஒலிகளை அறிதல்.', 'Shield', 'letters', 'letters_mastered', 10)
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  criteria_type = EXCLUDED.criteria_type,
  criteria_value = EXCLUDED.criteria_value;
INSERT INTO public.achievements (id, name_en, name_ta, description_en, description_ta, icon, category, criteria_type, criteria_value)
VALUES ('badge-word-collector', 'Word Collector 25', 'சொல் சேகரிப்பாளர் 25', 'Learn 25 Tamil everyday words across family and nature.', 'குடும்பம் மற்றும் இயற்கை சார்ந்த 25 சொற்களைக் கற்றல்.', 'BookOpen', 'vocabulary', 'words_learned', 25)
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  criteria_type = EXCLUDED.criteria_type,
  criteria_value = EXCLUDED.criteria_value;
INSERT INTO public.achievements (id, name_en, name_ta, description_en, description_ta, icon, category, criteria_type, criteria_value)
VALUES ('badge-first-reader', 'First Reader', 'முதல் வாசகர்', 'Read your first pure Tamil word without Tanglish assistance.', 'தங்கிலிஷ் உதவியின்றி முதல் தமிழ்ச் சொல்லை வாசித்தல்.', 'Eye', 'reading', 'words_read', 1)
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  criteria_type = EXCLUDED.criteria_type,
  criteria_value = EXCLUDED.criteria_value;
INSERT INTO public.achievements (id, name_en, name_ta, description_en, description_ta, icon, category, criteria_type, criteria_value)
VALUES ('badge-first-sentence', 'First Sentence Maker', 'வாக்கிய சிற்பி', 'Construct your first complete Tamil sentence in Subject-Object-Verb order.', 'சரியான வாக்கிய அமைப்பில் முதல் தமிழ் வாக்கியத்தை உருவாக்குதல்.', 'Feather', 'reading', 'sentences_constructed', 1)
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  criteria_type = EXCLUDED.criteria_type,
  criteria_value = EXCLUDED.criteria_value;
INSERT INTO public.achievements (id, name_en, name_ta, description_en, description_ta, icon, category, criteria_type, criteria_value)
VALUES ('badge-story-reader', 'Story Reader', 'கதை வாசகர்', 'Complete reading an illustrated cultural Tamil story.', 'படங்களுடன் கூடிய பண்பாட்டுக் கதையைப் படித்து முடித்தல்.', 'Smile', 'reading', 'stories_read', 1)
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  criteria_type = EXCLUDED.criteria_type,
  criteria_value = EXCLUDED.criteria_value;
INSERT INTO public.achievements (id, name_en, name_ta, description_en, description_ta, icon, category, criteria_type, criteria_value)
VALUES ('badge-week-warrior', 'Week Warrior', 'வாரப் போராளி', 'Maintain a 7-day uninterrupted Tamil learning streak.', '7 நாட்கள் தொடர்ச்சியாகத் தமிழ்ப் பயிற்சி செய்தல்.', 'Flame', 'streak', 'streak_days', 7)
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  criteria_type = EXCLUDED.criteria_type,
  criteria_value = EXCLUDED.criteria_value;
INSERT INTO public.achievements (id, name_en, name_ta, description_en, description_ta, icon, category, criteria_type, criteria_value)
VALUES ('badge-script-power-e', 'Script Independent', 'எழுத்து தன்னாட்சி', 'Reach Stage E in Script Power — full independence from Tanglish!', 'தங்கிலிஷ் இன்றி தூய தமிழில் இயங்கும் நிலை உ வை அடைதல்!', 'Award', 'mastery', 'script_power_stage', 5)
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description_en = EXCLUDED.description_en,
  description_ta = EXCLUDED.description_ta,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  criteria_type = EXCLUDED.criteria_type,
  criteria_value = EXCLUDED.criteria_value;

-- 8. Real-Life Tamil Missions
INSERT INTO public.missions (id, level_number, title_en, title_ta, prompt_en, prompt_ta, category, target_words_ta, target_words_en, xp_reward, is_active)
VALUES ('mission-vanakkam', 1, 'The Morning Vanakkam', 'காலை வணக்கம்', 'Greet your parents or grandparents in the morning with a warm hands-together "வணக்கம்" (vanakkam).', 'காலையில் பெற்றோர் அல்லது பெரியோரிடம் கைகூப்பி "வணக்கம்" என்று அன்புடன் கூறி மகிழுங்கள்.', 'family', '{"வணக்கம்"}'::text[], '{"Greetings / Hello"}'::text[], 25, true)
ON CONFLICT (id) DO UPDATE SET
  level_number = EXCLUDED.level_number,
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  category = EXCLUDED.category,
  target_words_ta = EXCLUDED.target_words_ta,
  target_words_en = EXCLUDED.target_words_en,
  xp_reward = EXCLUDED.xp_reward;
INSERT INTO public.missions (id, level_number, title_en, title_ta, prompt_en, prompt_ta, category, target_words_ta, target_words_en, xp_reward, is_active)
VALUES ('mission-three-colors', 2, 'Rainbow Spotter', 'வண்ண வேட்டை', 'Find 3 items in your bedroom or kitchen and name their colors in Tamil (சிவப்பு, பச்சை, நீலம், மஞ்சள்).', 'உங்கள் அறையில் உள்ள மூன்று பொருட்களைக் கண்டறிந்து அவற்றின் வண்ணங்களைத் தமிழில் கூறுக.', 'home', '{"சிவப்பு","பச்சை","நீலம்","மஞ்சள்"}'::text[], '{"Red","Green","Blue","Yellow"}'::text[], 30, true)
ON CONFLICT (id) DO UPDATE SET
  level_number = EXCLUDED.level_number,
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  category = EXCLUDED.category,
  target_words_ta = EXCLUDED.target_words_ta,
  target_words_en = EXCLUDED.target_words_en,
  xp_reward = EXCLUDED.xp_reward;
INSERT INTO public.missions (id, level_number, title_en, title_ta, prompt_en, prompt_ta, category, target_words_ta, target_words_en, xp_reward, is_active)
VALUES ('mission-food-thanks', 2, 'Thank You for Food', 'நன்றி நவில்தல்', 'After dinner, thank whoever cooked by saying "நன்றி" (nandri) and ask for water using "தண்ணீர்" (thanneer).', 'உணவு உண்ட பின் சமைத்தவருக்கு "நன்றி" என்றும், நீர் கேட்கும்போது "தண்ணீர்" என்றும் கூறிப் பழகுங்கள்.', 'family', '{"நன்றி","தண்ணீர்"}'::text[], '{"Thank you","Water"}'::text[], 35, true)
ON CONFLICT (id) DO UPDATE SET
  level_number = EXCLUDED.level_number,
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  category = EXCLUDED.category,
  target_words_ta = EXCLUDED.target_words_ta,
  target_words_en = EXCLUDED.target_words_en,
  xp_reward = EXCLUDED.xp_reward;
INSERT INTO public.missions (id, level_number, title_en, title_ta, prompt_en, prompt_ta, category, target_words_ta, target_words_en, xp_reward, is_active)
VALUES ('mission-nature-walk', 3, 'Nature Walk & Birds', 'இயற்கை உலா', 'Go outside or look out the window. Can you spot a bird or pet and say its name in Tamil (கிளி, நாய், பூனை)?', 'வெளியே செல்லும்போது காணும் பறவை அல்லது விலங்கின் பெயரைத் தமிழில் கூறுக.', 'nature', '{"கிளி","நாய்","பூனை"}'::text[], '{"Parrot","Dog","Cat"}'::text[], 30, true)
ON CONFLICT (id) DO UPDATE SET
  level_number = EXCLUDED.level_number,
  title_en = EXCLUDED.title_en,
  title_ta = EXCLUDED.title_ta,
  prompt_en = EXCLUDED.prompt_en,
  prompt_ta = EXCLUDED.prompt_ta,
  category = EXCLUDED.category,
  target_words_ta = EXCLUDED.target_words_ta,
  target_words_en = EXCLUDED.target_words_en,
  xp_reward = EXCLUDED.xp_reward;

