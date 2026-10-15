import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TanglishStage } from '../../types';
import { tanglishService } from '../../services/tanglishService';
import { Sparkles, Info, X } from 'lucide-react';

interface ScriptPowerMeterProps {
  stage: TanglishStage;
  percentage?: number;
  compact?: boolean;
  className?: string;
}

export const ScriptPowerMeter: React.FC<ScriptPowerMeterProps> = ({
  stage,
  percentage = 40,
  compact = false,
  className = '',
}) => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const isTa = i18n.language === 'ta';

  const stages: TanglishStage[] = ['A', 'B', 'C', 'D', 'E'];
  const stageInfo = tanglishService.getStageLabel(stage);

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center gap-2 cursor-pointer rounded-2xl transition-all hover:bg-teal-surface/60 ${
          compact ? 'px-2 py-1 bg-paper-dark border border-teal/20' : 'p-3 bg-paper-dark border-2 border-teal/20 w-full'
        } ${className}`}
        role="button"
        aria-label="View Script Power details"
      >
        <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <Sparkles size={16} className="text-gold-light" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-bold text-teal flex items-center gap-1 truncate">
              {t('dashboard.scriptPowerTitle')}
            </span>
            <span className="text-xs font-extrabold text-ink bg-sand px-1.5 py-0.5 rounded-md">
              {isTa ? `நிலை ${stage}` : `Stage ${stage}`}
            </span>
          </div>

          {/* 5-Segmented Bar */}
          <div className="flex items-center gap-1 mt-1.5">
            {stages.map((s, idx) => {
              const currentIdx = stages.indexOf(stage);
              const isFilled = idx <= currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    isFilled 
                      ? isCurrent 
                        ? 'bg-gold shadow-glow-gold' 
                        : 'bg-teal' 
                      : 'bg-sand'
                  }`}
                  title={`Stage ${s}`}
                />
              );
            })}
          </div>
        </div>

        {!compact && (
          <Info size={16} className="text-ink-muted flex-shrink-0 hover:text-teal" />
        )}
      </div>

      {/* Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-paper rounded-3xl max-w-md w-full p-6 border-2 border-teal shadow-2xl relative animate-pop">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-sand text-ink-muted hover:text-ink transition-colors"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal text-gold flex items-center justify-center shadow-md">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">
                  {isTa ? 'எழுத்து ஆற்றல் (Script Power)' : 'Script Power'}
                </h3>
                <p className="text-xs text-ink-muted">
                  {isTa ? 'தங்கிலிஷிலிருந்து தூய தமிழ் வாசிப்பு வரை' : 'Progressive Tanglish Reduction (Stages A–E)'}
                </p>
              </div>
            </div>

            <div className="bg-paper-dark rounded-2xl p-4 border border-sand mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-teal">
                  {isTa ? stageInfo.title_ta : stageInfo.title_en}
                </span>
                <span className="text-xs font-bold text-maroon bg-gold/20 px-2 py-0.5 rounded-full">
                  {percentage}% Power
                </span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                {isTa ? stageInfo.desc_ta : stageInfo.desc_en}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-sand/40">
                <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center font-bold text-[10px]">A</span>
                <span>{isTa ? 'பால நிலை: தங்கிலிஷ் மற்றும் ஆங்கிலம் எப்போதும் தோன்றும்' : 'Full Bridge: Tanglish + English always visible'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-sand/40">
                <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center font-bold text-[10px]">B</span>
                <span>{isTa ? 'தொடக்க நிலை: ஆங்கிலப் பொருள் தேவைக்கேற்ப' : 'Emerging: English on demand'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-sand/40">
                <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center font-bold text-[10px]">C</span>
                <span>{isTa ? 'வளர்ச்சி நிலை: தங்கிலிஷ் உதவி தேவைக்கேற்ப' : 'Growing: Tanglish on demand'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-sand/40">
                <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center font-bold text-[10px]">D</span>
                <span>{isTa ? 'முன்னேறிய நிலை: தூய தமிழ் வாசிப்பு' : 'Advanced: Pure Tamil script immersion'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-sand/40">
                <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center font-bold text-[10px]">E</span>
                <span>{isTa ? 'தன்னாட்சி நிலை: 100% தூய தமிழ் தேர்ச்சி' : 'Mastery: Independent script literacy!'}</span>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full py-3 bg-teal text-white font-bold rounded-2xl hover:bg-teal-light transition-all shadow-md active:scale-98"
            >
              {isTa ? 'புரிந்தது' : 'Got it!'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
