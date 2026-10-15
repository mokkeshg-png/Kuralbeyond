import React, { useState, useEffect, useRef } from 'react';
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fallbackTimerRef = useRef<number | null>(null);

  // Subscribe to audioService playback state to sync beak movement
  useEffect(() => {
    const unsubscribe = audioService.subscribe(state => {
      if (state.isPlaying) {
        setIsSpeaking(true);
      } else {
        setIsSpeaking(false);
      }
    });

    return () => {
      unsubscribe();
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (onOpenVoiceAssistant) {
      onOpenVoiceAssistant();
      return;
    }
    if (onClick) {
      onClick();
      return;
    }

    // Default friendly Tamil dialogue when parrot is clicked
    const textToSpeak = speechTextTa || speechText || 'வணக்கம்! நான் கிளி! வாருங்கள் தமிழ் கற்போம்!';
    const promptId = audioPromptId || `kili_${Date.now()}`;

    setIsSpeaking(true);
    audioService.play(promptId, textToSpeak);

    // Fallback timer to ensure beak returns to rest if audio ends without notification
    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
    }
    fallbackTimerRef.current = window.setTimeout(() => {
      setIsSpeaking(false);
    }, 4000);
  };

  const dimensions = {
    sm: { width: 54, height: 54 },
    md: { width: 84, height: 84 },
    lg: { width: 124, height: 124 },
  }[size];

  const moodAnimation = {
    idle: isSpeaking ? 'animate-kili-speaking' : 'animate-kili-3d-idle',
    happy: 'animate-bounce',
    cheering: 'animate-pop scale-110',
    thinking: '-rotate-6 transition-transform',
    talking: 'animate-kili-speaking',
  }[isSpeaking ? 'talking' : mood];

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {/* 3D Distinctive Animated Kili Mascot */}
      <div
        className={`relative flex-shrink-0 cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 ${moodAnimation}`}
        onClick={handleClick}
        title="Kili the Tamil Parrot (கிளி) — கிளிக் செய்து கேட்கவும்!"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md"
        >
          <defs>
            {/* 3D Depth Lighting Gradients */}
            <radialGradient id="kiliHead3D" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="35%" stopColor="#22C55E" />
              <stop offset="85%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#14532D" />
            </radialGradient>

            <radialGradient id="kiliBody3D" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="45%" stopColor="#16A34A" />
              <stop offset="90%" stopColor="#166534" />
              <stop offset="100%" stopColor="#0F3A1E" />
            </radialGradient>

            <radialGradient id="kiliBelly3D" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="60%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#CA8A04" />
            </radialGradient>

            <linearGradient id="kiliWing3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="50%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>

            <linearGradient id="kiliUpperBeak3D" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="40%" stopColor="#E11D48" />
              <stop offset="90%" stopColor="#9F1239" />
              <stop offset="100%" stopColor="#4C0519" />
            </linearGradient>

            <linearGradient id="kiliLowerBeak3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="50%" stopColor="#BE123C" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>

            <linearGradient id="kiliCrestGold" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="60%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>

            <filter id="kiliSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Floor / Shadow */}
          <ellipse cx="58" cy="112" rx="28" ry="5" fill="#0F172A" opacity="0.18" />

          {/* Long Emerald Tail Feathers with 3D Depth */}
          <g filter="url(#kiliSoftShadow)">
            <path
              d="M 28 82 Q 10 102 4 116 Q 22 108 36 94 Z"
              fill="url(#kiliWing3D)"
            />
            <path
              d="M 33 86 Q 18 106 14 118 Q 28 110 38 96 Z"
              fill="#14532D"
              opacity="0.75"
            />
          </g>

          {/* 3D Main Body */}
          <g filter="url(#kiliSoftShadow)">
            <ellipse cx="56" cy="74" rx="32" ry="28" fill="url(#kiliBody3D)" />

            {/* Warm Golden Belly Accent */}
            <path
              d="M 64 64 Q 82 74 74 96 Q 58 104 50 96 Q 44 82 52 68 Q 58 64 64 64 Z"
              fill="url(#kiliBelly3D)"
              opacity="0.85"
            />
          </g>

          {/* Layered 3D Wing */}
          <g filter="url(#kiliSoftShadow)">
            <path
              d="M 34 60 C 22 78 30 96 46 98 C 58 98 62 88 60 74 C 54 62 42 56 34 60 Z"
              fill="url(#kiliWing3D)"
            />
            {/* Wing Feather Highlights */}
            <path
              d="M 38 66 C 30 78 36 90 48 92 C 44 82 42 74 38 66 Z"
              fill="#4ADE80"
              opacity="0.6"
            />
            <path
              d="M 44 70 C 38 80 42 88 52 88 C 48 80 46 75 44 70 Z"
              fill="#86EFAC"
              opacity="0.45"
            />
          </g>

          {/* Cute Little 3D Claws */}
          <path d="M 46 102 L 44 111 M 50 102 L 51 112 M 56 102 L 58 111" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <path d="M 66 102 L 64 111 M 70 102 L 71 112 M 76 102 L 78 111" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />

          {/* 3D Spherical Head */}
          <g filter="url(#kiliSoftShadow)">
            <circle cx="68" cy="46" r="26" fill="url(#kiliHead3D)" />

            {/* Specular Ambient 3D Rim Light Highlight */}
            <path
              d="M 52 32 C 60 24 76 25 84 32 C 86 33 82 31 74 30 C 64 29 55 31 52 32 Z"
              fill="#FFFFFF"
              opacity="0.5"
            />
          </g>

          {/* Golden 3D Royal Crown / Crest Feathers */}
          <g filter="url(#kiliSoftShadow)">
            <path
              d="M 64 24 Q 58 8 46 14 Q 56 22 60 28 Z"
              fill="url(#kiliCrestGold)"
            />
            <path
              d="M 72 23 Q 74 6 62 10 Q 68 22 70 27 Z"
              fill="url(#kiliCrestGold)"
            />
            <path
              d="M 78 26 Q 86 12 76 15 Q 77 24 76 29 Z"
              fill="#FDE68A"
            />
          </g>

          {/* Glossy 3D Cheerful Eye */}
          <g filter="url(#kiliSoftShadow)">
            {/* White Sclera */}
            <circle cx="79" cy="42" r="8.5" fill="#FFFFFF" />
            {/* Dark Iris */}
            <circle cx="81.5" cy="42" r="5" fill="#0F172A" />
            {/* Amber Ring */}
            <circle cx="81.5" cy="42" r="4.2" fill="#D97706" opacity="0.3" />
            <circle cx="82" cy="42" r="3" fill="#090D16" />
            {/* Primary Specular Light Catch */}
            <circle cx="83.5" cy="40" r="2.2" fill="#FFFFFF" />
            {/* Secondary Light Catch */}
            <circle cx="80" cy="44" r="1.1" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* Soft Cheek Blush */}
          <circle cx="73" cy="53" r="5" fill="#F43F5E" opacity="0.25" />

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* Synchronized 3D Beak Mechanics */}
          {/* ══════════════════════════════════════════════════════════════════ */}

          {/* Inside Mouth (Visible when lower beak drops open) */}
          {isSpeaking && (
            <path
              d="M 88 47 Q 100 50 94 56 Q 87 53 88 47 Z"
              fill="#991B1B"
            />
          )}

          {/* Lower Beak (Flaps downward during speech) */}
          <g
            id="kili-lower-beak"
            className={isSpeaking ? 'animate-kili-lower-beak' : ''}
            style={{
              transformOrigin: '88px 51px',
              transition: 'transform 0.1s ease-in-out',
            }}
          >
            <path
              d="M 88 50 Q 103 54 96 60 Q 86 57 87 50 Z"
              fill="url(#kiliLowerBeak3D)"
            />
            {/* Lower Beak Shadow Detail */}
            <path
              d="M 88 51 Q 97 54 94 57 Z"
              fill="#4C0519"
              opacity="0.4"
            />
          </g>

          {/* Upper Beak (Sturdy curved 3D beak) */}
          <g
            id="kili-upper-beak"
            className={isSpeaking ? 'animate-kili-upper-beak' : ''}
            style={{
              transformOrigin: '87px 42px',
              transition: 'transform 0.1s ease-in-out',
            }}
          >
            <path
              d="M 87 40 Q 112 47 106 56 Q 93 54 87 50 Z"
              fill="url(#kiliUpperBeak3D)"
            />
            {/* 3D Specular Highlight Ridge on Upper Beak */}
            <path
              d="M 89 42 Q 104 46 105 50 Q 98 47 89 45 Z"
              fill="#FDA4AF"
              opacity="0.65"
            />
          </g>

          {/* Speech Waves Indicator (Active during speech) */}
          {isSpeaking && (
            <g className="animate-pulse">
              <path
                d="M 108 42 Q 114 46 108 52"
                stroke="#E11D48"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M 112 38 Q 120 46 112 56"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Embedded 3D Keyframe Animations specifically for Kili Parrot */}
      <style>{`
        @keyframes kili3dIdle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) rotateY(0deg);
          }
          50% {
            transform: translateY(-4px) rotate(1.5deg) rotateY(-8deg);
          }
        }
        .animate-kili-3d-idle {
          animation: kili3dIdle 3.2s ease-in-out infinite;
        }

        @keyframes kiliSpeaking {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-3px) rotate(-2deg) scale(1.03);
          }
          75% {
            transform: translateY(-1px) rotate(2deg) scale(1.02);
          }
        }
        .animate-kili-speaking {
          animation: kiliSpeaking 0.4s ease-in-out infinite;
        }

        @keyframes kiliLowerBeakFlap {
          0%, 100% {
            transform: rotate(0deg) translateY(0px);
          }
          50% {
            transform: rotate(24deg) translateY(4px);
          }
        }
        .animate-kili-lower-beak {
          animation: kiliLowerBeakFlap 0.18s ease-in-out infinite;
        }

        @keyframes kiliUpperBeakFlap {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-4deg);
          }
        }
        .animate-kili-upper-beak {
          animation: kiliUpperBeakFlap 0.18s ease-in-out infinite;
        }
      `}</style>

      {/* Optional Speech / Hint Bubble */}
      {showSpeech && (speechText || speechTextTa) && (
        <div 
          onClick={handleClick}
          className={`relative max-w-xs bg-paper-dark border-2 rounded-2xl p-3 shadow-md text-ink cursor-pointer transition-all ${
            isSpeaking 
              ? 'border-leaf ring-2 ring-leaf/20 scale-[1.02]' 
              : 'border-teal/20 hover:border-teal/40'
          }`}
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
          <span className="inline-flex items-center gap-1 text-[10px] text-teal font-semibold mt-1">
            <Volume2 size={12} className={isSpeaking ? 'text-leaf animate-pulse' : ''} />
            {isSpeaking ? 'பேசுகிறது... (Speaking)' : 'Tap parrot to hear'}
          </span>
        </div>
      )}
    </div>
  );
};
