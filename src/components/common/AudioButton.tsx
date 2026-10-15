import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface AudioButtonProps {
  audioId: string;
  fallbackText?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showFallbackBadge?: boolean;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  audioId,
  fallbackText,
  size = 'md',
  className = '',
  showFallbackBadge = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = audioService.subscribe(state => {
      if (state.currentAudioId === audioId) {
        setIsPlaying(state.isPlaying);
        setIsLoading(state.isLoading);
        setError(state.error || null);
      } else {
        setIsPlaying(false);
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [audioId]);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return; // Prevent duplicate clicks while generating
    if (isPlaying) {
      audioService.stop();
    } else {
      setError(null);
      audioService.play(audioId, fallbackText);
    }
  };

  const sizeClasses = {
    sm: 'w-9 h-9 p-1.5 text-xs',
    md: 'w-12 h-12 p-2.5 text-sm',
    lg: 'w-16 h-16 p-3.5 text-base',
    hero: 'w-20 h-20 p-4 text-lg',
  }[size];

  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 32,
    hero: 40,
  }[size];

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <button
        type="button"
        disabled={isLoading}
        onClick={handlePlay}
        aria-label={
          isLoading
            ? 'Generating Sarvam AI voice...'
            : isPlaying
            ? 'Stop audio'
            : 'Play Tamil pronunciation audio (Sarvam AI)'
        }
        title={
          error
            ? error
            : isLoading
            ? 'Sarvam AI குரல் தயாராகிறது...'
            : 'Sarvam AI குரலில் கேட்க (Listen in Sarvam AI voice)'
        }
        className={`relative inline-flex items-center justify-center rounded-full font-semibold transition-all shadow-md active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/30 ${
          isLoading
            ? 'bg-sand text-teal opacity-90 cursor-wait ring-2 ring-teal/30'
            : isPlaying
            ? 'bg-gold text-ink animate-pulse shadow-glow-gold'
            : 'bg-teal text-white hover:bg-teal-light'
        } ${sizeClasses} ${className}`}
      >
        {isLoading ? (
          <Loader2 size={iconSizes} className="animate-spin text-teal" />
        ) : isPlaying ? (
          <VolumeX size={iconSizes} />
        ) : (
          <Volume2 size={iconSizes} />
        )}
      </button>

      {/* Sarvam AI Voice Indicator Badge */}
      {showFallbackBadge && isPlaying && (
        <span className="inline-flex items-center gap-1 text-[10px] text-teal-dark bg-teal-surface border border-teal/20 px-2 py-0.5 rounded-full font-bold shadow-xs animate-fade-in">
          <Sparkles size={10} className="text-gold" />
          Sarvam AI (ta-IN)
        </span>
      )}

      {/* Error Badge */}
      {error && !isLoading && !isPlaying && (
        <span className="inline-flex items-center gap-1 text-[10px] text-maroon bg-maroon-surface px-2 py-0.5 rounded-full font-medium" title={error}>
          <AlertCircle size={10} />
          குரல் பெற முடியவில்லை
        </span>
      )}
    </div>
  );
};
