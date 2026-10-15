import React from 'react';
import { Check } from 'lucide-react';

interface DailyGoalRingProps {
  completed: number;
  target: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const DailyGoalRing: React.FC<DailyGoalRingProps> = ({
  completed,
  target,
  size = 72,
  strokeWidth = 6,
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = target > 0 ? Math.min(1, completed / target) : 0;
  const offset = circumference - progressRatio * circumference;
  const isGoalReached = completed >= target && target > 0;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E8DCC8"
          strokeWidth={strokeWidth}
        />
        {/* Progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isGoalReached ? '#4A7C59' : '#E8B84B'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Inner status */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {isGoalReached ? (
          <div className="w-7 h-7 rounded-full bg-leaf text-white flex items-center justify-center animate-pop">
            <Check size={16} strokeWidth={3} />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-ink leading-none">
              {completed}/{target}
            </span>
            <span className="text-[10px] text-ink-muted uppercase font-semibold">
              Goal
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
