import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  RotateCw, 
  Check, 
  X, 
  Calendar,
  ArrowRight
} from 'lucide-react';
import { RevisionItem } from '../types';
import { revisionService } from '../services/revisionService';
import { AudioButton } from '../components/common/AudioButton';

export const RevisionPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [dueItems, setDueItems] = useState<RevisionItem[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRevisionDeck() {
      const all = await revisionService.getAllItems();
      setDueItems(all);
      setLoading(false);
    }
    loadRevisionDeck();
  }, []);

  const currentItem = dueItems[activeCardIndex];

  const handleReviewAnswer = async (remembered: boolean) => {
    if (!currentItem) return;
    await revisionService.recordReview(currentItem.id, remembered);

    setIsFlipped(false);
    if (activeCardIndex < dueItems.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    } else {
      // Completed current deck review
      const updated = await revisionService.getAllItems();
      setDueItems(updated);
      setActiveCardIndex(0);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle pb-28 md:pb-16 flex flex-col justify-between">
      <div className="max-w-2xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-surface px-3 py-1 rounded-full">
            {t('common.revision')}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink">
            {t('revision.title')}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted">
            {t('revision.subtitle')}
          </p>
        </div>

        {currentItem ? (
          <div className="space-y-6 flex flex-col items-center">
            {/* Progress counter */}
            <div className="flex items-center justify-between w-full max-w-sm text-xs font-bold text-ink-muted">
              <span>Card {activeCardIndex + 1} of {dueItems.length}</span>
              <span className="text-teal flex items-center gap-1">
                <Calendar size={14} />
                Interval: {currentItem.interval_days} {currentItem.interval_days === 1 ? 'day' : 'days'}
              </span>
            </div>

            {/* 3D Interactive Revision Flashcard */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-72 h-88 sm:w-80 sm:h-96 perspective-1000 cursor-pointer select-none"
            >
              <div
                className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side: Tamil Script */}
                <div className="absolute inset-0 backface-hidden bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-8 flex flex-col items-center justify-between text-center bg-palm-subtle">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-surface px-2.5 py-0.5 rounded-full">
                      {currentItem.item_type}
                    </span>
                    <span className="text-xs font-semibold text-ink-muted flex items-center gap-1">
                      <RotateCw size={14} />
                      {t('revision.tapToFlip')}
                    </span>
                  </div>

                  <div className="my-auto flex flex-col items-center w-full px-2 overflow-hidden">
                    <span className={`font-tamil font-extrabold text-teal block leading-tight filter drop-shadow max-w-full break-words text-center ${
                      currentItem.content_ta.trim().length <= 2
                        ? 'text-6xl sm:text-7xl md:text-8xl'
                        : currentItem.content_ta.trim().length <= 6
                        ? 'text-4xl sm:text-5xl'
                        : currentItem.content_ta.trim().length <= 12
                        ? 'text-2xl sm:text-3xl'
                        : 'text-xl sm:text-2xl'
                    }`}>
                      {currentItem.content_ta}
                    </span>
                    <div className="mt-4">
                      <AudioButton
                        audioId={currentItem.audio_id || `rev_${currentItem.content_ta}`}
                        fallbackText={currentItem.content_ta}
                        size="md"
                      />
                    </div>
                  </div>

                  <span className="text-xs text-ink-muted font-medium">
                    Do you remember the meaning?
                  </span>
                </div>

                {/* Back Side: Transliteration & Meaning */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-paper-dark rounded-3xl border-4 border-teal/30 shadow-card-elevated p-8 flex flex-col items-center justify-between text-center overflow-hidden">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-maroon bg-maroon-surface px-2.5 py-0.5 rounded-full">
                      Answer
                    </span>
                    <span className="text-xs font-semibold text-ink-muted flex items-center gap-1">
                      <RotateCw size={14} />
                      Tap to flip
                    </span>
                  </div>

                  <div className="my-auto space-y-3 w-full px-2 overflow-hidden">
                    <div className={`font-tamil font-bold text-teal max-w-full break-words text-center ${
                      currentItem.content_ta.trim().length <= 6 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                    }`}>
                      {currentItem.content_ta}
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-ink max-w-full break-words text-center">
                      "{currentItem.content_tanglish}"
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-ink-muted bg-paper p-3 rounded-2xl border border-sand max-w-full break-words text-center">
                      {currentItem.content_en}
                    </p>
                  </div>

                  <span className="text-xs font-bold text-teal">
                    Consecutive Recalls: {currentItem.consecutive_correct}
                  </span>
                </div>
              </div>
            </div>

            {/* Assessment Feedback Buttons */}
            {isFlipped ? (
              <div className="flex items-center gap-4 w-full max-w-sm pt-2 animate-pop">
                <button
                  type="button"
                  onClick={() => handleReviewAnswer(false)}
                  className="flex-1 py-3.5 px-4 bg-sand hover:bg-sand-dark text-maroon font-bold rounded-2xl text-xs sm:text-sm transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  <span>{t('revision.needPractice')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleReviewAnswer(true)}
                  className="flex-1 py-3.5 px-4 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
                >
                  <Check size={18} strokeWidth={3} />
                  <span>{t('revision.iGotIt')}</span>
                </button>
              </div>
            ) : (
              <p className="text-xs text-ink-muted italic">
                {t('revision.tapToFlip')}
              </p>
            )}
          </div>
        ) : (
          /* Empty Deck State */
          <div className="bg-paper rounded-3xl border-2 border-sand p-8 text-center space-y-5 max-w-md mx-auto animate-pop">
            <div className="w-16 h-16 rounded-full bg-leaf-surface text-leaf mx-auto flex items-center justify-center">
              <Check size={32} strokeWidth={3} />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-xl text-ink">
                {t('revision.allCaughtUp')}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {t('revision.checkBackSoon')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
              <button
                type="button"
                onClick={() => navigate('/learn')}
                className="px-6 py-3.5 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{t('learn.title')}</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-paper-dark hover:bg-sand border-2 border-sand text-ink font-bold rounded-2xl text-xs transition-all active:scale-95"
              >
                {t('common.home')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
