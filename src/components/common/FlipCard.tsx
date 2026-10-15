import React, { useState } from 'react';
import { RotateCw, Volume2 } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface FlipCardProps {
  contentTa: string;
  contentTanglish?: string;
  contentEn?: string;
  audioId?: string;
  phonicsGuide?: string;
  className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  contentTa,
  contentTanglish,
  contentEn,
  audioId,
  phonicsGuide,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioId) {
      audioService.play(audioId, contentTa);
    }
  };

  return (
    <div
      onClick={handleFlip}
      className={`relative w-64 h-80 sm:w-72 sm:h-96 perspective-1000 cursor-pointer select-none ${className}`}
      role="button"
      aria-label={`Flip card for ${contentTa}`}
    >
      <div
        className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of Card: Tamil Script First */}
        <div className="absolute inset-0 backface-hidden bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-6 flex flex-col items-center justify-between text-center bg-kolam-subtle">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-surface px-2.5 py-1 rounded-full">
              தமிழ்
            </span>
            <span className="text-xs font-semibold text-ink-muted flex items-center gap-1">
              <RotateCw size={14} />
              Tap to flip
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center my-2 w-full px-2 overflow-hidden">
            <div className={`font-tamil font-bold text-teal mb-3 leading-tight filter drop-shadow-sm max-w-full break-words text-center ${
              contentTa.trim().length <= 2
                ? 'text-6xl sm:text-7xl'
                : contentTa.trim().length <= 6
                ? 'text-4xl sm:text-5xl'
                : contentTa.trim().length <= 12
                ? 'text-2xl sm:text-3xl'
                : 'text-xl sm:text-2xl'
            }`}>
              {contentTa}
            </div>
            {contentTanglish && (
              <span className="text-base sm:text-lg font-semibold text-ink-muted bg-sand/60 px-3 py-1 rounded-xl max-w-full break-words text-center">
                {contentTanglish}
              </span>
            )}
          </div>

          <div className="w-full flex items-center justify-center gap-3">
            {audioId && (
              <button
                type="button"
                onClick={handleAudio}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal text-white font-bold text-sm shadow-md hover:bg-teal-light active:scale-95 transition-all"
              >
                <Volume2 size={18} />
                Listen
              </button>
            )}
          </div>
        </div>

        {/* Back of Card: Meaning & Phonics */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-paper-dark rounded-3xl border-4 border-teal/30 shadow-card-elevated p-6 flex flex-col items-center justify-between text-center">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon bg-maroon-surface px-2.5 py-1 rounded-full">
              Meaning
            </span>
            <span className="text-xs font-semibold text-ink-muted flex items-center gap-1">
              <RotateCw size={14} />
              Tap to flip
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-3 w-full px-2 overflow-hidden">
            <div className={`font-tamil font-bold text-teal max-w-full break-words text-center ${
              contentTa.trim().length <= 6 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}>
              {contentTa}
            </div>
            {contentTanglish && (
              <div className="text-lg sm:text-xl font-bold text-ink max-w-full break-words text-center">
                "{contentTanglish}"
              </div>
            )}
            {contentEn && (
              <p className="text-xs sm:text-sm font-medium text-ink-muted bg-paper px-4 py-2 rounded-xl border border-sand max-w-full break-words text-center">
                {contentEn}
              </p>
            )}
            {phonicsGuide && (
              <p className="text-xs text-ink-muted italic">
                {phonicsGuide}
              </p>
            )}
          </div>

          <div className="text-xs text-ink-muted font-medium">
            TamilPalam Phonics Bridge
          </div>
        </div>
      </div>
    </div>
  );
};
