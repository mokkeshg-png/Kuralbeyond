import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../data/assessmentData';
import { AudioButton } from '../components/common/AudioButton';
import { LocalStorageAdapter } from '../services/storageAdapter';

export const AssessmentPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isTa = i18n.language === 'ta';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);

  const question = ASSESSMENT_QUESTIONS[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (hasAnsweredCurrent) return;
    setSelectedOptionId(optId);
    setHasAnsweredCurrent(true);

    const isCorrect = question.options.find(o => o.id === optId)?.is_correct || false;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    // Snappy 250ms pause for visual feedback then proceed immediately
    setTimeout(() => {
      if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOptionId(null);
        setHasAnsweredCurrent(false);
      } else {
        setIsCompleted(true);
      }
    }, 250);
  };

  // Determine recommended level based on score
  const getRecommendedLevel = () => {
    if (correctCount <= 3) return 0;
    if (correctCount <= 6) return 1;
    if (correctCount <= 8) return 2;
    return 3;
  };

  const recommendedLevel = getRecommendedLevel();

  const handleAcceptRecommendation = async () => {
    const stats = LocalStorageAdapter.getStats();
    stats.xp += 30; // Welcome XP for assessment completion
    LocalStorageAdapter.setStats(stats);

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-6 sm:p-8 space-y-6 animate-pop">
        {!isCompleted ? (
          <>
            {/* Header with question count */}
            <div className="flex items-center justify-between border-b border-sand pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal">
                  {t('assessment.title')}
                </span>
                <h1 className="font-heading font-extrabold text-xl text-ink">
                  {t('assessment.questionProgress', { current: currentIndex + 1, total: ASSESSMENT_QUESTIONS.length })}
                </h1>
              </div>

              {/* Progress pill */}
              <span className="text-xs font-bold text-ink bg-sand px-3 py-1 rounded-full">
                {Math.round(((currentIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100)}%
              </span>
            </div>

            {/* Prompt with Audio */}
            <div className="space-y-4">
              <p className="font-bold text-base sm:text-lg text-ink leading-relaxed">
                {isTa ? question.prompt_ta : question.prompt_en}
              </p>

              {question.audio_id && (
                <div className="flex items-center gap-2">
                  <AudioButton
                    audioId={question.audio_id}
                    size="sm"
                  />
                  <span className="text-xs font-bold text-ink-muted">
                    {t('common.tapToListen')}
                  </span>
                </div>
              )}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {question.options.map(option => {
                const isSelected = selectedOptionId === option.id;
                let optionStyle = 'bg-paper-dark border-2 border-sand hover:border-teal/50 text-ink';

                if (hasAnsweredCurrent) {
                  if (option.is_correct) {
                    optionStyle = 'bg-leaf-surface border-2 border-leaf text-leaf-dark ring-2 ring-leaf/20 shadow-md';
                  } else if (isSelected && !option.is_correct) {
                    optionStyle = 'bg-sand border-2 border-ink-muted/30 text-ink-muted';
                  }
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    disabled={hasAnsweredCurrent}
                    className={`p-4 rounded-2xl font-bold text-sm sm:text-base text-left transition-all active:scale-98 flex flex-col justify-center min-h-[64px] ${optionStyle}`}
                  >
                    <span className="font-tamil text-lg font-bold text-teal leading-tight">
                      {option.text_ta}
                    </span>
                    {option.text_tanglish && (
                      <span className="text-xs text-ink-muted font-normal mt-0.5">
                        {option.text_tanglish}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          /* Results View */
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-gold text-ink mx-auto flex items-center justify-center shadow-lg animate-pop">
              <Sparkles size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="font-heading font-extrabold text-3xl text-ink">
                {t('assessment.resultsTitle')}
              </h2>
              <p className="text-sm font-semibold text-teal">
                {isTa 
                  ? `நீங்கள் 10 வினாக்களில் ${correctCount} வினாக்களுக்குச் சரியாக விடையளித்தீர்கள்!` 
                  : `You answered ${correctCount} of 10 questions correctly!`}
              </p>
            </div>

            {/* Recommendation Box */}
            <div className="bg-paper-dark rounded-3xl border-2 border-teal/30 p-6 space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal text-white flex items-center justify-center font-bold">
                  {recommendedLevel}
                </div>
                <div>
                  <span className="text-xs font-bold text-ink-muted uppercase">
                    {t('assessment.recommendedLevel')}
                  </span>
                  <h3 className="text-base font-extrabold text-ink">
                    Level {recommendedLevel}: {recommendedLevel === 0 ? 'Tamil Discovery' : recommendedLevel === 1 ? 'Vowels & Consonants' : recommendedLevel === 2 ? 'First Words' : 'Syllables & Sentences'}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                {t('assessment.reasoning')}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAcceptRecommendation}
                className="w-full py-4 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>{t('assessment.acceptRecommendation', { level: recommendedLevel })}</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={handleAcceptRecommendation}
                className="w-full py-3 bg-sand hover:bg-sand-dark text-ink font-semibold rounded-2xl text-xs transition-colors"
              >
                {t('assessment.overrideOption')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
