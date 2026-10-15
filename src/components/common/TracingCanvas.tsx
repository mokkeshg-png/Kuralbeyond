import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TracingCanvasProps {
  letter: string;
  outlineSvgPath?: string;
  onComplete: () => void;
  className?: string;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  letter,
  onComplete,
  className = '',
}) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI scaling
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial clear
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0F4C5C';
    ctx.lineWidth = 14;
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasDrawn(false);
    setIsVerified(false);
  };

  const checkTracing = () => {
    if (!hasDrawn) return;
    setIsVerified(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Tracing Board Container */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-paper-dark rounded-3xl border-4 border-sand shadow-inner flex items-center justify-center overflow-hidden touch-none select-none">
        {/* Background Guide Letter Outline */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-sand-dark/50"
          style={{ fontSize: '160px', fontFamily: '"Noto Sans Tamil", sans-serif' }}
        >
          {letter}
        </div>

        {/* Drawing Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="relative z-10 w-full h-full cursor-crosshair"
        />

        {/* Verification Success Overlay */}
        {isVerified && (
          <div className="absolute inset-0 z-20 bg-leaf/20 backdrop-blur-xs flex items-center justify-center animate-pop">
            <div className="w-16 h-16 rounded-full bg-leaf text-white flex items-center justify-center shadow-lg">
              <Check size={36} strokeWidth={3} />
            </div>
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={clearCanvas}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-sand hover:bg-sand-dark text-ink font-semibold text-sm transition-all active:scale-95 shadow-sm"
        >
          <RotateCcw size={16} />
          {t('lesson.clearTrace')}
        </button>

        <button
          type="button"
          onClick={checkTracing}
          disabled={!hasDrawn}
          className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-md ${
            hasDrawn
              ? 'bg-teal text-white hover:bg-teal-light active:scale-95'
              : 'bg-sand/60 text-ink-muted cursor-not-allowed'
          }`}
        >
          <Sparkles size={16} className="text-gold-light" />
          {t('lesson.checkTrace')}
        </button>
      </div>
    </div>
  );
};
