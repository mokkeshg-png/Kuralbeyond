import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
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
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const unsubscribe = audioService.subscribe(state => {
      if (state.currentAudioId === audioId) {
        setIsPlaying(state.isPlaying);
        setIsFallback(state.isFallback);
      } else {
        setIsPlaying(false);
      }
    });
    return unsubscribe;
  }, [audioId]);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      audioService.stop();
    } else {
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
        onClick={handlePlay}
        aria-label={isPlaying ? 'Stop audio' : 'Play Tamil pronunciation audio'}
        className={`relative inline-flex items-center justify-center rounded-full font-semibold transition-all shadow-md active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/30 ${
          isPlaying
            ? 'bg-gold text-ink animate-pulse shadow-glow-gold'
            : 'bg-teal text-white hover:bg-teal-light'
        } ${sizeClasses} ${className}`}
      >
        {isPlaying ? <VolumeX size={iconSizes} /> : <Volume2 size={iconSizes} />}
      </button>

      {showFallbackBadge && isFallback && isPlaying && (
        <span className="inline-flex items-center gap-1 text-[10px] text-ink-muted bg-sand px-2 py-0.5 rounded-full font-medium">
          <Sparkles size={10} className="text-teal" />
          Web Speech API (ta-IN)
        </span>
      )}
    </div>
  );
};
