import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Volume2, HelpCircle, Sparkles, ChevronDown } from 'lucide-react';
import { TanglishStage } from '../../types';
import { LocalStorageAdapter } from '../../services/storageAdapter';

interface InLessonHeaderProps {
  currentIndex: number;
  totalItems: number;
  stage: TanglishStage;
  onExit: () => void;
  onNeedHelp: () => void;
  helpActive: boolean;
}

export const InLessonHeader: React.FC<InLessonHeaderProps> = ({
  currentIndex,
  totalItems,
  stage,
  onExit,
  onNeedHelp,
  helpActive,
}) => {
  const { t, i18n } = useTranslation();
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(
    LocalStorageAdapter.getPreferences().audio_speed || 1.0
  );

  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed);
    const pref = LocalStorageAdapter.getPreferences();
    pref.audio_speed = speed;
    LocalStorageAdapter.setPreferences(pref);
    setShowSpeedMenu(false);
  };

  const isTa = i18n.language === 'ta';

  return (
    <>
      <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur-md border-b-2 border-sand px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Exit Button */}
          <button
            type="button"
            onClick={() => setShowExitModal(true)}
            aria-label="Exit lesson"
            className="w-10 h-10 rounded-2xl bg-sand hover:bg-sand-dark text-ink flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
          >
            <X size={20} />
          </button>

          {/* Segmented Progress Bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="flex items-center gap-1.5 w-full">
              {Array.from({ length: totalItems }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-3 flex-1 rounded-full transition-all duration-400 ${
                    idx < currentIndex
                      ? 'bg-leaf shadow-sm'
                      : idx === currentIndex
                      ? 'bg-gold shadow-glow-gold'
                      : 'bg-sand'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[11px] font-bold text-ink-muted mt-1 px-1">
              <span>{t('lesson.questionNum', { current: currentIndex + 1, total: totalItems })}</span>
              <span className="text-teal font-extrabold flex items-center gap-1">
                <Sparkles size={11} className="text-gold" />
                {isTa ? `நிலை ${stage}` : `Stage ${stage}`}
              </span>
            </div>
          </div>

          {/* Right Action Controls: Sound Speed + Need Help */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Speed Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-sand text-xs font-bold text-ink hover:bg-sand-dark transition-all"
                title="Playback speed"
              >
                <Volume2 size={16} className="text-teal" />
                <span>{currentSpeed}x</span>
                <ChevronDown size={12} />
              </button>

              {showSpeedMenu && (
                <div className="absolute right-0 top-full mt-2 z-40 bg-paper rounded-2xl shadow-xl border-2 border-sand p-2 min-w-[130px] space-y-1 animate-pop">
                  {[0.5, 0.75, 1.0].map(speed => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => handleSpeedChange(speed)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        currentSpeed === speed
                          ? 'bg-teal text-white'
                          : 'text-ink hover:bg-sand'
                      }`}
                    >
                      {speed}x {speed === 1.0 ? '(Normal)' : speed === 0.5 ? '(Slow)' : '(Gentle)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Persistent Need Help Button */}
            <button
              type="button"
              onClick={onNeedHelp}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
                helpActive
                  ? 'bg-gold text-ink ring-2 ring-gold-dark'
                  : 'bg-paper-dark border-2 border-teal/20 text-teal hover:bg-teal-surface'
              }`}
              title={t('common.helpTooltip')}
            >
              <HelpCircle size={16} />
              <span className="hidden sm:inline">{t('common.needHelp')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-paper rounded-3xl max-w-sm w-full p-6 border-2 border-teal shadow-2xl text-center space-y-4 animate-pop">
            <div className="w-14 h-14 rounded-2xl bg-gold/20 text-teal mx-auto flex items-center justify-center shadow-sm">
              <HelpCircle size={28} />
            </div>

            <h3 className="text-lg font-bold text-ink">
              {t('lesson.exitTitle')}
            </h3>

            <p className="text-xs text-ink-muted leading-relaxed">
              {t('lesson.exitMessage')}
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="w-full py-3 bg-teal text-white font-bold rounded-2xl hover:bg-teal-light transition-all shadow-md active:scale-98"
              >
                {t('lesson.resumeAction')}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowExitModal(false);
                  onExit();
                }}
                className="w-full py-2.5 bg-sand hover:bg-sand-dark text-ink font-semibold rounded-2xl text-xs transition-colors"
              >
                {t('lesson.exitAction')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
