import React from 'react';
import { Volume2 } from 'lucide-react';
import { audioService } from '../../services/audioService';

export type MascotMood = 'idle' | 'happy' | 'thinking' | 'cheering' | 'talking';

interface KiliParrotProps {
  mood?: MascotMood;
  speechText?: string;
  speechTextTa?: string;
  audioPromptId?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSpeech?: boolean;
  onOpenVoiceAssistant?: () => void;
  onClick?: () => void;
}

export const KiliParrot: React.FC<KiliParrotProps> = ({
  mood = 'idle',
  speechText,
  speechTextTa,
  audioPromptId,
  size = 'md',
  className = '',
  showSpeech = true,
  onOpenVoiceAssistant,
  onClick,
}) => {
  const handleClick = () => {
    if (onOpenVoiceAssistant) {
      onOpenVoiceAssistant();
      return;
    }
    if (onClick) {
      onClick();
      return;
    }
    if (audioPromptId || speechTextTa || speechText) {
      audioService.play(
        audioPromptId || `kili_${speechTextTa || speechText}`,
        speechTextTa || speechText
      );
    }
  };

  const dimensions = {
    sm: { width: 48, height: 48 },
    md: { width: 72, height: 72 },
    lg: { width: 110, height: 110 },
  }[size];

  const moodAnimation = {
    idle: 'animate-float',
    happy: 'animate-bounce',
    cheering: 'animate-pop scale-110',
    thinking: '-rotate-6 transition-transform',
    talking: 'animate-pulse-subtle',
  }[mood];

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {/* Kili Character SVG */}
      <div 
        className={`relative flex-shrink-0 cursor-pointer ${moodAnimation}`}
        onClick={handleClick}
        title="Kili the Tamil Parrot (கிளி)"
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tail feather */}
          <path d="M 25 75 Q 15 90 10 95 Q 25 88 32 80 Z" fill="#15803D" />
          
          {/* Main Body (Vibrant Parrot Green) */}
          <ellipse cx="48" cy="58" rx="28" ry="26" fill="#22C55E" />

          {/* Wing with feather layer */}
          <path d="M 32 50 Q 20 65 35 76 Q 48 78 52 65 Z" fill="#16A34A" />
          <path d="M 38 52 Q 28 64 40 72 Z" fill="#4ADE80" opacity="0.9" />

          {/* Head */}
          <circle cx="58" cy="38" r="22" fill="#22C55E" />

          {/* Golden Yellow Crest Feathers */}
          <path d="M 54 18 Q 50 8 42 12 Q 50 18 52 22 Z" fill="#F59E0B" />
          <path d="M 60 18 Q 62 6 54 8 Q 58 18 59 22 Z" fill="#FDE68A" />

          {/* Big Cheerful Eyes */}
          <circle cx="68" cy="34" r="7" fill="#FFFFFF" />
          <circle cx="70" cy="34" r="3.5" fill="#111827" />
          <circle cx="71.5" cy="32.5" r="1.5" fill="#FFFFFF" />

          {/* Curved Bright Red Beak */}
          <path d="M 76 34 Q 92 40 88 48 Q 78 46 75 42 Z" fill="#E11D48" />
          <path d="M 76 42 Q 84 45 80 48 Z" fill="#F43F5E" />

          {/* Cute Little Feet */}
          <path d="M 42 84 L 40 92 M 45 84 L 46 92 M 52 84 L 54 92" stroke="#E8B84B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Optional Speech / Hint Bubble */}
      {showSpeech && (speechText || speechTextTa) && (
        <div 
          onClick={handleClick}
          className="relative max-w-xs bg-paper-dark border-2 border-teal/20 rounded-2xl p-3 shadow-md text-ink cursor-pointer hover:border-teal/40 transition-colors"
        >
          {speechTextTa && (
            <p className="font-tamil font-bold text-base text-teal leading-relaxed">
              {speechTextTa}
            </p>
          )}
          {speechText && (
            <p className="text-xs text-ink-muted font-medium mt-0.5">
              {speechText}
            </p>
          )}
          {audioPromptId && (
            <span className="inline-flex items-center gap-1 text-[10px] text-teal font-semibold mt-1">
              <Volume2 size={12} />
              Tap to hear
            </span>
          )}
        </div>
      )}
    </div>
  );
};
