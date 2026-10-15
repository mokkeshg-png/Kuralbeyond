import React, { useState, useEffect } from 'react';
import { RotateCw, Volume2, VolumeX, Loader2, Sparkles, AlertCircle } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveAudioId = audioId || `vocab_${contentTa}`;

  useEffect(() => {
    const unsubscribe = audioService.subscribe(state => {
      if (state.currentAudioId === effectiveAudioId) {
        setIsPlaying(state.isPlaying);
        setIsLoading(state.isLoading);
        setError(state.error || null);
      } else {
        setIsPlaying(false);
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [effectiveAudioId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return; // Prevent duplicate clicks while generating
    if (isPlaying) {
      audioService.stop();
    } else {
      setError(null);
      // Pass contentTa as the exact text to speak in Sarvam AI Tamil voice
      audioService.play(effectiveAudioId, contentTa);
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
            <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-surface px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles size={12} className="text-gold" />
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

          <div className="w-full flex flex-col items-center justify-center gap-1.5">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleAudio}
              title={
                error
                  ? error
                  : isLoading
                  ? 'Sarvam AI குரல் தயாராகிறது...'
                  : `Listen to "${contentTa}" in authentic Sarvam AI Tamil voice`
              }
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95 ${
                isLoading
                  ? 'bg-sand text-teal opacity-90 cursor-wait'
                  : isPlaying
                  ? 'bg-gold text-ink animate-pulse shadow-glow-gold'
                  : 'bg-teal text-white hover:bg-teal-light'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-teal" />
                  <span>தயாராகிறது...</span>
                </>
              ) : isPlaying ? (
                <>
                  <VolumeX size={18} />
                  <span>நிறுத்து</span>
                </>
              ) : (
                <>
                  <Volume2 size={18} />
                  <span>Listen</span>
                </>
              )}
            </button>

            {/* Error notice if voice service is unavailable */}
            {error && !isLoading && !isPlaying && (
              <span className="inline-flex items-center gap-1 text-[10px] text-maroon bg-maroon-surface px-2 py-0.5 rounded-full font-medium" title={error}>
                <AlertCircle size={10} />
                குரல் பெற முடியவில்லை
              </span>
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

          <div className="w-full flex items-center justify-between text-xs text-ink-muted font-medium">
            <span>TamilPalam Phonics Bridge</span>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleAudio}
              className="inline-flex items-center gap-1 text-teal font-bold hover:underline"
              title="Listen again"
            >
              {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Volume2 size={12} />}
              <span>Listen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
