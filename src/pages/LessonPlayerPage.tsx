import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Volume2, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { Lesson, Exercise, AnswerOption } from '../types';
import { curriculumService } from '../services/curriculumService';
import { progressService } from '../services/progressService';
import { masteryService } from '../services/masteryService';
import { tanglishService } from '../services/tanglishService';
import { audioService } from '../services/audioService';
import { InLessonHeader } from '../components/layout/InLessonHeader';
import { TracingCanvas } from '../components/common/TracingCanvas';
import { VoiceRecordCompare } from '../components/common/VoiceRecordCompare';
import { FlipCard } from '../components/common/FlipCard';
import { AudioButton } from '../components/common/AudioButton';
import { KiliParrot } from '../components/mascot/KiliParrot';
import { LocalStorageAdapter } from '../services/storageAdapter';

export const LessonPlayerPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isTa = i18n.language === 'ta';

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Interaction states
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'try_again'>('idle');
  const [manualHelpOverride, setManualHelpOverride] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime] = useState<number>(Date.now());
  const [loading, setLoading] = useState(true);

  // Word ordering state
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<{ id: string; text_ta: string; text_tanglish?: string }[]>([]);

  // Matching state
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());

  // Story reader active panel index
  const [activeStoryPanel, setActiveStoryPanel] = useState(0);

  const profile = LocalStorageAdapter.getProfile();
  const isScholars = profile.age_mode === 'scholars';

  useEffect(() => {
    async function loadLesson() {
      if (!lessonId) return;
      const data = await curriculumService.getLesson(lessonId);
      if (!data) {
        navigate('/learn');
        return;
      }
      setLesson(data);

      const exList = await curriculumService.getLessonExercises(lessonId);
      if (!exList || exList.length === 0) {
        navigate('/learn');
        return;
      }
      setExercises(exList);

      // Resume from last saved item if present
      if (data.last_item_index && data.last_item_index < exList.length) {
        setCurrentExerciseIndex(data.last_item_index);
      } else {
        setCurrentExerciseIndex(0);
      }
      setCurrentQuestionIndex(0);

      setLoading(false);
    }
    loadLesson();
  }, [lessonId, navigate]);

  // Current question helper
  const currentExercise = exercises[currentExerciseIndex];
  const currentQuestion = currentExercise?.questions ? currentExercise.questions[currentQuestionIndex] : undefined;

  // Initialize specific exercise states when current exercise changes
  useEffect(() => {
    if (!currentQuestion) return;
    setFeedbackState('idle');
    setSelectedOptionId(null);
    setManualHelpOverride(false);

    // Auto play audio if Tanglish rules allow
    const rules = tanglishService.getDisplayRules(lesson?.tanglish_stage || 'A');
    if (rules.autoplayAudio && (currentQuestion.audio_id || currentQuestion.content_ta)) {
      audioService.play(currentQuestion.audio_id || `q_${currentQuestion.content_ta}`, currentQuestion.content_ta);
    }

    // Initialize ordering word bank
    if (currentQuestion.exercise_type === 'ordering' && currentQuestion.word_bank) {
      setAvailableWords([...currentQuestion.word_bank]);
      setPlacedWords([]);
    }

    // Initialize matching pairs
    if (currentQuestion.exercise_type === 'matching') {
      setSelectedLeft(null);
      setMatchedPairs(new Set());
    }

    // Initialize story panels
    if (currentQuestion.exercise_type === 'story') {
      setActiveStoryPanel(0);
    }
  }, [currentExerciseIndex, currentQuestionIndex, lesson]);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!lesson || !currentExercise || !currentQuestion) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4 text-center space-y-4">
        <p className="font-bold text-ink">Preparing lesson activities...</p>
        <button
          type="button"
          onClick={() => navigate('/learn')}
          className="px-6 py-2.5 bg-teal text-white font-bold rounded-2xl text-sm"
        >
          Return to Learning Map
        </button>
      </div>
    );
  }

  // Tanglish visibility rules
  const displayRules = tanglishService.getDisplayRules(lesson.tanglish_stage, manualHelpOverride);

  // Advance to next question or complete lesson
  const advanceToNext = async () => {
    const nextIdx = currentExerciseIndex + 1;
    if (nextIdx < exercises.length) {
      // Save item progress for resume capability
      await progressService.saveItemProgress(lesson.id, nextIdx);
      setCurrentExerciseIndex(nextIdx);
      setCurrentQuestionIndex(0);
    } else {
      // Lesson Complete!
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      await progressService.completeLesson(lesson.id, correctCount, exercises.length, timeSpent);
      navigate(`/lesson/${lesson.id}/results`);
    }
  };

  // MCQ answer selection
  const handleSelectOption = (opt: AnswerOption) => {
    if (feedbackState === 'correct') return;
    setSelectedOptionId(opt.id);

    if (opt.audio_id || opt.option_text) {
      audioService.play(opt.audio_id || `opt_${opt.option_text}`, opt.option_text);
    }

    if (opt.is_correct) {
      setFeedbackState('correct');
      setCorrectCount(prev => prev + 1);
      masteryService.recordSkillAttempt('letter_recognition', currentQuestion.id, true);

      setTimeout(() => {
        advanceToNext();
      }, 250);
    } else {
      setFeedbackState('try_again');
      masteryService.recordSkillAttempt('letter_recognition', currentQuestion.id, false);
    }
  };

  // Word Ordering handlers
  const handlePlaceWord = (wordObj: { id: string; text_ta: string }) => {
    setPlacedWords(prev => [...prev, wordObj.text_ta]);
    setAvailableWords(prev => prev.filter(w => w.id !== wordObj.id));
  };

  const handleRemoveWord = (wordText: string, idx: number) => {
    setPlacedWords(prev => prev.filter((_, i) => i !== idx));
    setAvailableWords(prev => [...prev, { id: 'w-' + Math.random(), text_ta: wordText }]);
  };

  const handleCheckOrder = () => {
    const solution = currentQuestion.ordered_solution || [];
    const isMatched = placedWords.join(' ') === solution.join(' ');

    if (isMatched) {
      setFeedbackState('correct');
      setCorrectCount(prev => prev + 1);
      masteryService.recordSkillAttempt('sentence_comprehension', currentQuestion.id, true);
      setTimeout(() => advanceToNext(), 250);
    } else {
      setFeedbackState('try_again');
    }
  };

  // Matching pair handler
  const handleTapPairLeft = (pairId: string, audioId?: string, textTa?: string) => {
    if (audioId || textTa) {
      audioService.play(audioId || `pair_${textTa}`, textTa);
    }
    setSelectedLeft(pairId);
  };

  const handleTapPairRight = (pairId: string) => {
    if (!selectedLeft) return;
    if (selectedLeft === pairId) {
      // Match found
      const updated = new Set(matchedPairs);
      updated.add(pairId);
      setMatchedPairs(updated);
      setSelectedLeft(null);

      // Check if all matched
      if (currentQuestion.pairs && updated.size === currentQuestion.pairs.length) {
        setFeedbackState('correct');
        setCorrectCount(prev => prev + 1);
        masteryService.recordSkillAttempt('word_reading', currentQuestion.id, true);
        setTimeout(() => advanceToNext(), 250);
      }
    } else {
      // Wrong pair, gentle try again
      setSelectedLeft(null);
    }
  };

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle flex flex-col justify-between">
      {/* Top Header */}
      <InLessonHeader
        currentIndex={currentExerciseIndex}
        totalItems={exercises.length}
        stage={lesson.tanglish_stage}
        onExit={() => navigate('/learn')}
        onNeedHelp={() => setManualHelpOverride(true)}
        helpActive={manualHelpOverride}
      />

      {/* Center Learning Arena */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 flex flex-col items-center justify-center">
        {/* Activity Prompt Banner */}
        <div className="text-center space-y-2 mb-6 w-full">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal bg-teal-surface px-3 py-1 rounded-full">
            {currentQuestion.exercise_type}
          </span>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-ink leading-relaxed">
            {isTa ? currentQuestion.prompt_ta : currentQuestion.prompt_en}
          </h2>
        </div>

        {/* 1. Tracing Activity Type */}
        {currentQuestion.exercise_type === 'tracing' && currentQuestion.tracing_data && (
          <div className="space-y-4 flex flex-col items-center">
            <TracingCanvas
              letter={currentQuestion.tracing_data.letter}
              outlineSvgPath={currentQuestion.tracing_data.outline_path}
              onComplete={() => {
                setCorrectCount(prev => prev + 1);
                advanceToNext();
              }}
            />
          </div>
        )}

        {/* 2. Vocabulary Card / FlipCard Activity Type */}
        {currentQuestion.exercise_type === 'vocab_card' && (
          <div className="flex flex-col items-center space-y-6">
            <FlipCard
              contentTa={currentQuestion.content_ta}
              contentTanglish={displayRules.showTanglishDefault || manualHelpOverride ? currentQuestion.content_tanglish : undefined}
              contentEn={displayRules.showEnglishDefault || manualHelpOverride ? currentQuestion.content_en : undefined}
              audioId={currentQuestion.audio_id}
              phonicsGuide={currentQuestion.explanation_en}
            />

            <button
              type="button"
              onClick={() => {
                setCorrectCount(prev => prev + 1);
                advanceToNext();
              }}
              className="px-8 py-3.5 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-base shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span>{t('common.continue')}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* 3. MCQ Activity Type */}
        {currentQuestion.exercise_type === 'mcq' && currentQuestion.options && (
          <div className="w-full max-w-xl mx-auto space-y-6">
            {/* Visual / Target Glyph Prompt */}
            {currentQuestion.content_ta && (
              <div className="text-center p-6 sm:p-8 bg-paper rounded-3xl border-2 border-sand shadow-sm bg-palm-subtle flex flex-col items-center justify-center overflow-hidden">
                <span className={`font-tamil font-extrabold text-teal block leading-normal filter drop-shadow-sm mb-2 max-w-full break-words px-2 ${
                  currentQuestion.content_ta.trim().length <= 2 
                    ? 'text-5xl sm:text-6xl md:text-7xl' 
                    : currentQuestion.content_ta.trim().length <= 6 
                    ? 'text-3xl sm:text-4xl md:text-5xl' 
                    : currentQuestion.content_ta.trim().length <= 14 
                    ? 'text-2xl sm:text-3xl' 
                    : 'text-xl sm:text-2xl'
                }`}>
                  {currentQuestion.content_ta}
                </span>
                {(displayRules.showTanglishDefault || manualHelpOverride) && currentQuestion.content_tanglish && (
                  <span className="text-sm sm:text-base font-bold text-ink-muted bg-sand/60 px-3 py-1 rounded-xl max-w-full break-words">
                    {currentQuestion.content_tanglish}
                  </span>
                )}
                {(currentQuestion.audio_id || currentQuestion.content_ta) && (
                  <div className="mt-3">
                    <AudioButton
                      audioId={currentQuestion.audio_id || `mcq_${currentQuestion.content_ta}`}
                      fallbackText={currentQuestion.content_ta}
                      size="sm"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOptionId === option.id;
                let optionClass = 'bg-paper-dark border-2 border-sand hover:border-teal/50 text-ink';

                if (isSelected) {
                  if (option.is_correct) {
                    optionClass = 'bg-leaf-surface border-2 border-leaf text-leaf-dark ring-2 ring-leaf/20 shadow-md';
                  } else {
                    optionClass = 'bg-gold-surface border-2 border-gold text-ink ring-2 ring-gold/20';
                  }
                }

                const isLastOdd = currentQuestion.options && currentQuestion.options.length % 2 === 1 && idx === currentQuestion.options.length - 1;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    className={`p-4 rounded-2xl font-bold text-center transition-all active:scale-98 min-h-[64px] flex flex-col items-center justify-center ${optionClass} ${
                      isLastOdd ? 'sm:col-span-2 sm:max-w-md sm:mx-auto w-full' : 'w-full'
                    }`}
                  >
                    <span className={`font-tamil font-bold leading-snug break-words max-w-full px-1 ${
                      option.option_text.length > 12 ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
                    }`}>
                      {option.option_text}
                    </span>
                    {(displayRules.showTanglishDefault || manualHelpOverride) && option.option_tanglish && (
                      <span className="text-xs text-ink-muted font-normal mt-0.5 break-words max-w-full px-1">
                        {option.option_tanglish}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Sentence Word Ordering Activity Type */}
        {currentQuestion.exercise_type === 'ordering' && (
          <div className="w-full max-w-lg space-y-6">
            {/* Placed Words Tray */}
            <div className="min-h-[72px] bg-paper-dark border-2 border-dashed border-teal/40 rounded-3xl p-4 flex flex-wrap items-center justify-center gap-2 shadow-inner">
              {placedWords.length === 0 ? (
                <span className="text-xs text-ink-muted font-medium">
                  {t('lesson.arrangeTilesPrompt')}
                </span>
              ) : (
                placedWords.map((word, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleRemoveWord(word, idx)}
                    className="px-4 py-2.5 rounded-2xl bg-teal text-white font-tamil font-bold text-lg shadow-tile active:scale-95 transition-all animate-pop flex items-center gap-1.5"
                  >
                    <span>{word}</span>
                  </button>
                ))
              )}
            </div>

            {/* Available Word Bank (Tiles) */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {availableWords.map(wordObj => (
                <button
                  key={wordObj.id}
                  type="button"
                  onClick={() => handlePlaceWord(wordObj)}
                  className="px-5 py-3 rounded-2xl bg-paper border-2 border-sand hover:border-teal font-tamil font-bold text-lg text-ink shadow-tile active:scale-95 transition-all"
                >
                  {wordObj.text_ta}
                </button>
              ))}
            </div>

            {/* Check Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={handleCheckOrder}
                disabled={placedWords.length === 0}
                className={`px-8 py-3.5 rounded-2xl font-extrabold text-sm transition-all shadow-md ${
                  placedWords.length > 0
                    ? 'bg-teal hover:bg-teal-light text-white active:scale-95'
                    : 'bg-sand text-ink-muted cursor-not-allowed'
                }`}
              >
                {t('common.submit')}
              </button>
            </div>
          </div>
        )}

        {/* 5. Matching Pairs Activity Type */}
        {currentQuestion.exercise_type === 'matching' && currentQuestion.pairs && (
          <div className="w-full max-w-md space-y-4">
            <p className="text-xs text-center text-ink-muted">
              {t('lesson.tapToMatchPrompt')}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* Left Column (Tamil) */}
              <div className="space-y-3">
                {currentQuestion.pairs.map(pair => {
                  const isMatched = matchedPairs.has(pair.id);
                  const isSelected = selectedLeft === pair.id;

                  return (
                    <button
                      key={'left-' + pair.id}
                      type="button"
                      onClick={() => handleTapPairLeft(pair.id, pair.audio_id, pair.left_ta)}
                      disabled={isMatched}
                      className={`w-full p-3.5 rounded-2xl font-tamil font-bold text-base transition-all text-center min-h-[56px] shadow-sm break-words max-w-full px-2 overflow-hidden flex items-center justify-center ${
                        isMatched
                          ? 'bg-leaf-surface text-leaf border-2 border-leaf line-through opacity-70'
                          : isSelected
                          ? 'bg-gold text-ink border-2 border-gold-dark ring-2 ring-gold/30'
                          : 'bg-paper-dark border-2 border-sand hover:border-teal/50 text-ink'
                      }`}
                    >
                      {pair.left_ta}
                    </button>
                  );
                })}
              </div>

              {/* Right Column (English) */}
              <div className="space-y-3">
                {currentQuestion.pairs.map(pair => {
                  const isMatched = matchedPairs.has(pair.id);

                  return (
                    <button
                      key={'right-' + pair.id}
                      type="button"
                      onClick={() => handleTapPairRight(pair.id)}
                      disabled={isMatched}
                      className={`w-full p-3.5 rounded-2xl font-bold text-sm transition-all text-center min-h-[56px] shadow-sm break-words max-w-full px-2 overflow-hidden flex items-center justify-center ${
                        isMatched
                          ? 'bg-leaf-surface text-leaf border-2 border-leaf line-through opacity-70'
                          : 'bg-paper-dark border-2 border-sand hover:border-teal/50 text-ink'
                      }`}
                    >
                      {pair.right_en}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 6. Listening Drill Activity Type */}
        {currentQuestion.exercise_type === 'listening' && currentQuestion.options && (
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="p-6 bg-paper-dark rounded-3xl border-2 border-sand flex flex-col items-center justify-center space-y-3">
              <AudioButton
                audioId={currentQuestion.audio_id || `listen_${currentQuestion.content_ta}`}
                fallbackText={currentQuestion.content_ta}
                size="lg"
              />
              <span className="text-xs font-bold text-ink-muted">
                {t('lesson.listenPrompt')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {currentQuestion.options.map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className={`p-4 rounded-2xl bg-paper border-2 border-sand hover:border-teal font-tamil font-bold text-ink text-center shadow-sm active:scale-95 break-words max-w-full px-2 ${
                    option.option_text.length > 8 ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
                  }`}
                >
                  {option.option_text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 7. Speaking Practice Activity Type */}
        {currentQuestion.exercise_type === 'speaking' && (
          <VoiceRecordCompare
            modelAudioId={currentQuestion.audio_id || 'vocab_amma'}
            tamilText={currentQuestion.content_ta}
            tanglish={currentQuestion.content_tanglish}
            onComplete={() => {
              setCorrectCount(prev => prev + 1);
              advanceToNext();
            }}
          />
        )}

        {/* 8. Illustrated 4-Panel Story Reader Activity Type */}
        {currentQuestion.exercise_type === 'story' && currentQuestion.story_panels && (
          <div className="w-full max-w-lg bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-6 space-y-6 animate-pop">
            <div className="flex items-center justify-between text-xs font-bold text-ink-muted">
              <span>Panel {activeStoryPanel + 1} of {currentQuestion.story_panels.length}</span>
              <button
                type="button"
                onClick={() => audioService.play(
                  currentQuestion.story_panels![activeStoryPanel].audio_id,
                  currentQuestion.story_panels![activeStoryPanel].caption_ta
                )}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal text-white text-xs font-bold hover:bg-teal-light active:scale-95 shadow-sm"
              >
                <Volume2 size={16} />
                <span>Hear Panel</span>
              </button>
            </div>

            {/* Illustrated Panel Card */}
            <div className="p-6 bg-paper-dark rounded-2xl border-2 border-sand text-center space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-gold/20 text-teal flex items-center justify-center mx-auto text-4xl shadow-sm">
                🦅
              </div>

              <p className="font-tamil font-bold text-xl sm:text-2xl text-teal leading-relaxed">
                {currentQuestion.story_panels[activeStoryPanel].caption_ta}
              </p>

              {(displayRules.showTanglishDefault || manualHelpOverride) && (
                <p className="text-sm text-ink-muted italic">
                  {currentQuestion.story_panels[activeStoryPanel].caption_tanglish}
                </p>
              )}

              {(displayRules.showEnglishDefault || manualHelpOverride) && (
                <p className="text-xs text-ink font-medium bg-sand/40 p-2.5 rounded-xl">
                  {currentQuestion.story_panels[activeStoryPanel].caption_en}
                </p>
              )}
            </div>

            {/* Panel Pagination */}
            <div className="flex justify-between items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveStoryPanel(prev => Math.max(0, prev - 1))}
                disabled={activeStoryPanel === 0}
                className="px-4 py-2.5 rounded-2xl bg-sand hover:bg-sand-dark text-ink font-bold text-xs disabled:opacity-40"
              >
                Previous
              </button>

              {activeStoryPanel < currentQuestion.story_panels.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveStoryPanel(prev => prev + 1)}
                  className="px-6 py-2.5 rounded-2xl bg-teal text-white font-bold text-xs hover:bg-teal-light shadow-md"
                >
                  Next Panel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setCorrectCount(prev => prev + 1);
                    advanceToNext();
                  }}
                  className="px-6 py-2.5 rounded-2xl bg-leaf text-white font-bold text-xs hover:bg-leaf-light shadow-md flex items-center gap-1.5"
                >
                  <Check size={16} />
                  Complete Story
                </button>
              )}
            </div>
          </div>
        )}

        {/* 9. Reading Comprehension Passage Activity Type */}
        {currentQuestion.exercise_type === 'reading' && currentQuestion.options && (
          <div className="w-full max-w-lg space-y-6">
            <div className="p-6 bg-paper-dark rounded-3xl border-2 border-sand space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal bg-teal-surface px-2.5 py-0.5 rounded-full">
                Reading Passage
              </span>
              <p className="font-tamil font-bold text-lg text-ink leading-relaxed">
                {currentQuestion.content_ta}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentQuestion.options.map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className="p-4 rounded-2xl bg-paper border-2 border-sand hover:border-teal font-tamil font-bold text-sm text-ink text-center shadow-sm active:scale-95"
                >
                  {option.option_text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Kind Try Again Feedback Banner */}
        {feedbackState === 'try_again' && (
          <div className="mt-6 w-full max-w-lg bg-sand/60 border-2 border-gold/40 rounded-2xl p-4 text-center animate-pop">
            <p className="text-xs sm:text-sm font-bold text-ink">
              {t('common.keepGoing')} {currentQuestion.explanation_en}
            </p>
          </div>
        )}
      </main>

      {/* Footer Support / Mascot Prompt */}
      <footer className="p-4 flex items-center justify-center">
        {!isScholars && (
          <KiliParrot
            mood={feedbackState === 'correct' ? 'cheering' : 'idle'}
            speechText={feedbackState === 'correct' ? 'Arpudham! Spot on!' : 'Take your time, you are doing great!'}
            speechTextTa={feedbackState === 'correct' ? 'அற்புதம்! மிகச் சரியான விடை!' : 'பொறுமையாகக் கற்கவும், நீங்கள் அருமையாகக் கற்கிறீர்கள்!'}
            size="sm"
          />
        )}
      </footer>
    </div>
  );
};
