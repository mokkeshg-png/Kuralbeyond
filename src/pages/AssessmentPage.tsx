import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Award } from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../data/assessmentData';
import { AudioButton } from '../components/common/AudioButton';
import { LocalStorageAdapter } from '../services/storageAdapter';

export const AssessmentPage: React.FC = () => {
  const { i18n } = useTranslation();
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

  const scorePercentage = Math.round((correctCount / ASSESSMENT_QUESTIONS.length) * 100);

  // Beginner-level classification in English as requested
  const getProficiencyClassification = () => {
    if (scorePercentage <= 20) {
      return {
        level: 1,
        title: 'Complete Beginner',
        badgeColor: 'bg-teal-surface text-teal border-teal/30',
        summary: 'You are taking your first steps in Tamil literacy! You will start at Level 1 to master all foundational Tamil letters through writing and speaking.',
        recommendedLevelTitle: 'Level 1: Tamil Letters',
      };
    }
    if (scorePercentage <= 60) {
      return {
        level: 1,
        title: 'Elementary Beginner',
        badgeColor: 'bg-gold-surface text-ink border-gold/40',
        summary: 'You recognize some core Tamil sounds and letter shapes! Starting at Level 1 will solidify your mastery of all 240 letters before building words.',
        recommendedLevelTitle: 'Level 1: Tamil Letters',
      };
    }
    return {
      level: 2,
      title: 'Proficient Beginner',
      badgeColor: 'bg-leaf-surface text-leaf-dark border-leaf/40',
      summary: 'You have solid familiarity with Tamil letters and syllables! You can proceed to Level 2 to learn your first 100 essential Tamil words.',
      recommendedLevelTitle: 'Level 2: Tamil Words',
    };
  };

  const classification = getProficiencyClassification();

  const handleAcceptRecommendation = async () => {
    const stats = LocalStorageAdapter.getStats();
    stats.xp += 50; // XP reward for diagnostic assessment
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
                  Tamil Knowledge Assessment
                </span>
                <h1 className="font-heading font-extrabold text-xl text-ink">
                  Question {currentIndex + 1} of {ASSESSMENT_QUESTIONS.length}
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
                    {isTa ? 'ஒலியைக் கேட்க தட்டவும்' : 'Tap to listen'}
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
          /* Results View (Displayed in English with Percentage and Classification) */
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-gold text-ink mx-auto flex items-center justify-center shadow-lg animate-pop">
              <Award size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="font-heading font-extrabold text-3xl text-ink">
                Tamil Assessment Result
              </h2>
              <p className="text-sm font-semibold text-ink-muted">
                Your diagnostic assessment is complete!
              </p>
            </div>

            {/* Score & Classification Card in English */}
            <div className="bg-paper-dark rounded-3xl border-2 border-teal/20 p-6 space-y-4 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand pb-3">
                <div>
                  <span className="text-xs font-bold text-ink-muted uppercase">
                    Your Tamil Knowledge Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-heading font-extrabold text-3xl text-teal">
                      {scorePercentage}%
                    </span>
                    <span className="text-xs font-bold text-ink-muted">
                      ({correctCount} of {ASSESSMENT_QUESTIONS.length} correct)
                    </span>
                  </div>
                </div>

                <div className={`px-3.5 py-1.5 rounded-full border text-xs font-extrabold w-fit ${classification.badgeColor}`}>
                  Level: {classification.title}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-teal uppercase tracking-wider block">
                  Recommended Starting Path
                </span>
                <h3 className="text-lg font-extrabold text-ink mt-0.5">
                  {classification.recommendedLevelTitle}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed mt-1">
                  {classification.summary}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAcceptRecommendation}
                className="w-full py-4 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Continue to Learning Dashboard</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
