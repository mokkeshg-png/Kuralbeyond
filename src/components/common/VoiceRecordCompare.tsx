import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, RotateCcw, Volume2, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { audioService } from '../../services/audioService';

interface VoiceRecordCompareProps {
  modelAudioId: string;
  tamilText: string;
  tanglish?: string;
  onComplete: () => void;
  className?: string;
}

export const VoiceRecordCompare: React.FC<VoiceRecordCompareProps> = ({
  modelAudioId,
  tamilText,
  tanglish,
  onComplete,
  className = '',
}) => {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    setMicError(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = e => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 9) {
            stopRecording();
            return 10;
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
      setMicError(t('errors.micPermissionNeeded'));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playRecordedAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setRecordingSeconds(0);
  };

  const playModelAudio = () => {
    audioService.play(modelAudioId, tamilText);
  };

  return (
    <div className={`flex flex-col items-center gap-6 bg-paper-dark p-6 rounded-3xl border-2 border-sand shadow-sm max-w-lg w-full ${className}`}>
      {/* Target Word Display */}
      <div className="text-center">
        <h2 className="font-tamil font-bold text-4xl sm:text-5xl text-teal mb-1">
          {tamilText}
        </h2>
        {tanglish && (
          <p className="text-base text-ink-muted font-medium">
            {tanglish}
          </p>
        )}
      </div>

      {/* Model Audio Player */}
      <button
        type="button"
        onClick={playModelAudio}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal text-white font-bold text-sm hover:bg-teal-light transition-all active:scale-95 shadow-md"
      >
        <Volume2 size={20} />
        {t('lesson.listenModel')}
      </button>

      {/* Recording Control Button */}
      <div className="flex flex-col items-center gap-2">
        {!audioUrl ? (
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            aria-label={isRecording ? 'Stop recording' : 'Start microphone recording'}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
              isRecording 
                ? 'bg-maroon text-white animate-pulse ring-8 ring-maroon/30' 
                : 'bg-gold hover:bg-gold-dark text-ink ring-4 ring-gold/30'
            }`}
          >
            {isRecording ? <Square size={32} /> : <Mic size={36} />}
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={playRecordedAudio}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-leaf text-white font-bold text-sm hover:bg-leaf-light transition-all active:scale-95 shadow-md"
            >
              <Play size={18} fill="currentColor" />
              {t('lesson.listenYours')}
            </button>
            <button
              type="button"
              onClick={resetRecording}
              className="p-3 rounded-2xl bg-sand hover:bg-sand-dark text-ink transition-colors"
              title="Record again"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        )}

        <span className="text-xs font-semibold text-ink-muted">
          {isRecording ? `${recordingSeconds}s / 10s` : audioUrl ? 'Playback ready' : t('lesson.recordVoicePrompt')}
        </span>
      </div>

      {micError && (
        <p className="text-xs text-maroon font-semibold bg-maroon/10 px-3 py-1.5 rounded-xl">
          {micError}
        </p>
      )}

      {/* Kind Self-Assessment Prompt (Shown after recording) */}
      {audioUrl && (
        <div className="w-full bg-paper rounded-2xl p-4 border border-sand animate-pop text-center space-y-3">
          <p className="text-xs sm:text-sm font-bold text-ink">
            {t('lesson.selfAssessPrompt')}
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={onComplete}
              className="py-2.5 px-2 rounded-xl bg-leaf-surface border border-leaf/30 text-leaf-dark hover:bg-leaf hover:text-white font-bold text-xs transition-colors flex flex-col items-center gap-1 shadow-sm"
            >
              <span className="text-lg">👍</span>
              <span>{t('lesson.selfAssessGood')}</span>
            </button>

            <button
              type="button"
              onClick={onComplete}
              className="py-2.5 px-2 rounded-xl bg-gold-surface border border-gold/40 text-gold-dark hover:bg-gold hover:text-ink font-bold text-xs transition-colors flex flex-col items-center gap-1 shadow-sm"
            >
              <span className="text-lg">🤔</span>
              <span>{t('lesson.selfAssessOkay')}</span>
            </button>

            <button
              type="button"
              onClick={resetRecording}
              className="py-2.5 px-2 rounded-xl bg-sand border border-ink/10 text-ink-muted hover:bg-sand-dark font-bold text-xs transition-colors flex flex-col items-center gap-1 shadow-sm"
            >
              <span className="text-lg">🔁</span>
              <span>{t('lesson.selfAssessRetry')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Child Privacy Shield Assurance */}
      <div className="flex items-center gap-1.5 text-[11px] text-ink-muted mt-1">
        <ShieldCheck size={14} className="text-leaf" />
        <span>{t('lesson.micNotice')}</span>
      </div>
    </div>
  );
};
