import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TracingCanvasProps {
  letter: string;
  outlineSvgPath?: string;
  onComplete: () => void;
  className?: string;
}

interface TracingScoreResult {
  score: number;
  passed: boolean; // score >= 75
  coverage: number;
  precision: number;
}

/**
 * Counts visual Tamil grapheme clusters (e.g. 'அ' = 1, 'க்' = 1, 'அம்மா' = 3: அ, ம், மா).
 */
export function getTamilClusterCount(text: string): number {
  const clean = text.trim();
  if (!clean) return 1;
  if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
    try {
      const segmenter = new (Intl as any).Segmenter('ta', { granularity: 'grapheme' });
      const segments = Array.from(segmenter.segment(clean));
      return Math.max(1, segments.length);
    } catch {
      // fallback
    }
  }
  // Fallback: strip Tamil combining marks
  const baseChars = clean.replace(/[\u0B82\u0BBE-\u0BCD\u0BD7\s]/g, '');
  return Math.max(1, baseChars.length || clean.length);
}

/**
 * Returns dynamic container dimensions, font size, stroke width, and tolerance
 * based on whether the item is a single letter or a multi-character word like "அம்மா".
 */
export function getTracingLayoutConfig(text: string) {
  const count = getTamilClusterCount(text);

  if (count <= 1) {
    return {
      clusterCount: count,
      isWord: false,
      containerClassName: 'w-72 h-72 sm:w-80 sm:h-80',
      fontSizePx: 140,
      lineWidth: 14,
      tolerancePx: 18,
    };
  } else if (count === 2) {
    return {
      clusterCount: count,
      isWord: true,
      containerClassName: 'w-full max-w-sm min-h-[260px] h-64 sm:h-72',
      fontSizePx: 100,
      lineWidth: 12,
      tolerancePx: 16,
    };
  } else if (count === 3) {
    // e.g. "அம்மா", "அப்பா", "படம்"
    return {
      clusterCount: count,
      isWord: true,
      containerClassName: 'w-full max-w-lg min-h-[260px] h-64 sm:h-72',
      fontSizePx: 80,
      lineWidth: 11,
      tolerancePx: 15,
    };
  } else if (count === 4) {
    return {
      clusterCount: count,
      isWord: true,
      containerClassName: 'w-full max-w-xl min-h-[260px] h-64 sm:h-72',
      fontSizePx: 64,
      lineWidth: 10,
      tolerancePx: 14,
    };
  } else {
    // 5+ clusters (e.g. "வணக்கம்")
    const fontSize = Math.max(46, Math.floor(300 / count));
    return {
      clusterCount: count,
      isWord: true,
      containerClassName: 'w-full max-w-2xl min-h-[260px] h-64 sm:h-72',
      fontSizePx: fontSize,
      lineWidth: 9,
      tolerancePx: 13,
    };
  }
}

/**
 * Accurately compares the user's canvas strokes against the reference Tamil letter glyph.
 * Computes coverage (did the user trace the letter strokes) and precision.
 * Returns passed=true only when accuracy is at least 75%.
 */
function evaluateTracing(
  canvas: HTMLCanvasElement,
  letter: string,
  fontSizePx: number,
  tolerance: number,
  outlineSvgPath?: string,
  threshold: number = 0.75
): TracingScoreResult {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.width;
  const height = canvas.height;
  if (!width || !height) return { score: 0, passed: false, coverage: 0, precision: 0 };

  const refCanvas = document.createElement('canvas');
  refCanvas.width = width;
  refCanvas.height = height;
  const refCtx = refCanvas.getContext('2d');
  const userCtx = canvas.getContext('2d');
  if (!refCtx || !userCtx) return { score: 0, passed: false, coverage: 0, precision: 0 };

  refCtx.scale(dpr, dpr);
  const logicalW = width / dpr;
  const logicalH = height / dpr;

  // Render the reference letter/word glyph exactly aligned with the background guide
  refCtx.clearRect(0, 0, logicalW, logicalH);
  refCtx.font = `${fontSizePx}px "Noto Sans Tamil", sans-serif`;
  refCtx.textAlign = 'center';
  refCtx.textBaseline = 'middle';
  refCtx.fillStyle = '#000000';
  refCtx.fillText(letter, logicalW / 2, logicalH / 2);

  // If outline SVG path is provided, also stroke it on the reference canvas to reinforce guide lines
  if (outlineSvgPath) {
    try {
      const p = new Path2D(outlineSvgPath);
      refCtx.save();
      const scale = Math.min(logicalW / 100, logicalH / 100) * 0.75;
      const offsetX = (logicalW - 100 * scale) / 2;
      const offsetY = (logicalH - 100 * scale) / 2;
      refCtx.translate(offsetX, offsetY);
      refCtx.scale(scale, scale);
      refCtx.lineWidth = Math.min(18, Math.max(10, tolerance));
      refCtx.lineCap = 'round';
      refCtx.lineJoin = 'round';
      refCtx.strokeStyle = '#000000';
      refCtx.stroke(p);
      refCtx.restore();
    } catch {
      // ignore Path2D error
    }
  }

  // Read pixel data
  const refImg = refCtx.getImageData(0, 0, width, height).data;
  const userImg = userCtx.getImageData(0, 0, width, height).data;

  // Grid sampling step for fast, smooth performance
  const sampleStep = Math.max(3, Math.round(dpr * 3));
  const cols = Math.floor(width / sampleStep);
  const rows = Math.floor(height / sampleStep);

  const refGrid = new Uint8Array(cols * rows);
  const userGrid = new Uint8Array(cols * rows);
  let targetTotal = 0;
  let userTotal = 0;

  for (let r = 0; r < rows; r++) {
    const y = r * sampleStep;
    const rowOffset = y * width;
    for (let c = 0; c < cols; c++) {
      const x = c * sampleStep;
      const idx = (rowOffset + x) * 4;

      if (refImg[idx + 3] > 30) {
        refGrid[r * cols + c] = 1;
        targetTotal++;
      }
      if (userImg[idx + 3] > 30) {
        userGrid[r * cols + c] = 1;
        userTotal++;
      }
    }
  }

  if (userTotal === 0 || targetTotal === 0) {
    return { score: 0, passed: false, coverage: 0, precision: 0 };
  }

  // Radius for hit tolerance based on character size & stroke width
  const hitTolerance = tolerance * dpr;
  const radiusSteps = Math.max(2, Math.ceil(hitTolerance / sampleStep));
  const r2 = radiusSteps * radiusSteps;

  // Check how much of the target letter was covered by the student
  let targetHit = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (refGrid[r * cols + c] === 1) {
        let hit = false;
        for (let dr = -radiusSteps; dr <= radiusSteps && !hit; dr++) {
          const nr = r + dr;
          if (nr < 0 || nr >= rows) continue;
          for (let dc = -radiusSteps; dc <= radiusSteps && !hit; dc++) {
            const nc = c + dc;
            if (nc < 0 || nc >= cols) continue;
            if (dr * dr + dc * dc <= r2) {
              if (userGrid[nr * cols + nc] === 1) {
                hit = true;
              }
            }
          }
        }
        if (hit) targetHit++;
      }
    }
  }

  // Check precision: did the student draw inside/near the letter or wildly off-canvas
  let userHit = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (userGrid[r * cols + c] === 1) {
        let hit = false;
        for (let dr = -radiusSteps; dr <= radiusSteps && !hit; dr++) {
          const nr = r + dr;
          if (nr < 0 || nr >= rows) continue;
          for (let dc = -radiusSteps; dc <= radiusSteps && !hit; dc++) {
            const nc = c + dc;
            if (nc < 0 || nc >= cols) continue;
            if (dr * dr + dc * dc <= r2) {
              if (refGrid[nr * cols + nc] === 1) {
                hit = true;
              }
            }
          }
        }
        if (hit) userHit++;
      }
    }
  }

  const coverage = targetHit / targetTotal;
  const precision = userTotal > 0 ? userHit / userTotal : 0;

  // Slight penalty only if strokes are mostly outside the letter (< 40% precision)
  const precisionPenalty = precision < 0.4 ? precision / 0.4 : 1.0;
  const rawScore = coverage * precisionPenalty;
  const scorePercent = Math.min(100, Math.round(rawScore * 100));

  const passedThreshold = Math.round(threshold * 100); // 75%
  const passed = scorePercent >= passedThreshold;

  return {
    score: scorePercent,
    passed,
    coverage: Math.round(coverage * 100),
    precision: Math.round(precision * 100),
  };
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  letter,
  outlineSvgPath,
  onComplete,
  className = '',
}) => {
  const { t, i18n } = useTranslation();
  const isTa = i18n.language === 'ta';

  const config = getTracingLayoutConfig(letter);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; passed: boolean } | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI scaling matching client bounding box
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dpr = window.devicePixelRatio || 1;
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    canvas.width = targetW;
    canvas.height = targetH;
    ctx.scale(dpr, dpr);

    // Initial stroke style
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0F4C5C';
    ctx.lineWidth = config.lineWidth;
  };

  useEffect(() => {
    setupCanvas();
    const timer = setTimeout(setupCanvas, 60);
    clearCanvas();
    return () => clearTimeout(timer);
  }, [letter, config.lineWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      ctx.scale(dpr, dpr);
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0F4C5C';
    ctx.lineWidth = config.lineWidth;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);

    // Clear unsuccessful feedback when continuing to draw
    if (feedback && !feedback.passed) {
      setFeedback(null);
    }
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
    setFeedback(null);
    setIsShaking(false);
  };

  const checkTracing = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;

    // Evaluate accuracy with 75% threshold
    const result = evaluateTracing(
      canvas,
      letter,
      config.fontSizePx,
      config.tolerancePx,
      outlineSvgPath,
      0.75
    );

    if (result.passed) {
      setIsVerified(true);
      setFeedback({ score: result.score, passed: true });
      setTimeout(() => {
        onComplete();
      }, 750);
    } else {
      setIsVerified(false);
      setFeedback({ score: result.score, passed: false });
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 600);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 w-full ${className}`}>
      {/* Tracing Board Container - dynamically sized for single letters vs words */}
      <div 
        className={`relative ${config.containerClassName} bg-paper-dark rounded-3xl border-4 transition-all shadow-inner flex items-center justify-center overflow-hidden touch-none select-none ${
          isVerified
            ? 'border-leaf ring-4 ring-leaf/20'
            : feedback && !feedback.passed
            ? 'border-maroon/60 ring-4 ring-maroon/20 animate-shake'
            : 'border-sand'
        } ${isShaking ? 'animate-shake' : ''}`}
      >
        {/* Background Guide Letter Outline */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-sand-dark/50"
          style={{ fontSize: `${config.fontSizePx}px`, fontFamily: '"Noto Sans Tamil", sans-serif' }}
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

        {/* Verification Success Overlay (Only shown when passed >= 75%) */}
        {isVerified && (
          <div className="absolute inset-0 z-20 bg-leaf/25 backdrop-blur-xs flex flex-col items-center justify-center gap-2 animate-pop">
            <div className="w-16 h-16 rounded-full bg-leaf text-white flex items-center justify-center shadow-lg">
              <Check size={36} strokeWidth={3} />
            </div>
            {feedback && (
              <span className="bg-leaf text-white font-extrabold text-sm px-3 py-1 rounded-full shadow-md">
                {feedback.score}% • {isTa ? 'அருமை!' : 'Great job!'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Accuracy Feedback Warning (Shown if score < 75%) */}
      {feedback && !feedback.passed && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-maroon/10 border-2 border-maroon/30 text-maroon text-xs sm:text-sm font-bold animate-fade-in shadow-xs max-w-sm text-center">
          <AlertCircle size={18} className="flex-shrink-0 text-maroon" />
          <span>
            {isTa 
              ? `${config.isWord ? 'சொல்லை' : 'எழுத்தை'} முழுமையாக வரைக: ${feedback.score}% (75% தேவை)` 
              : `Trace more of the ${config.isWord ? 'word' : 'letter'}: ${feedback.score}% (75% required to pass)`}
          </span>
        </div>
      )}

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
          disabled={!hasDrawn || isVerified}
          className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-md ${
            hasDrawn && !isVerified
              ? 'bg-teal text-white hover:bg-teal-light active:scale-95'
              : 'bg-sand/60 text-ink-muted cursor-not-allowed'
          }`}
        >
          <Sparkles size={16} className="text-gold-light" />
          <span>{t('lesson.checkTrace')}</span>
        </button>
      </div>
    </div>
  );
};

