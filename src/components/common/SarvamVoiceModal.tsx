import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Mic, 
  Square, 
  Volume2, 
  Send, 
  Sparkles, 
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Radio
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sarvamVoiceService, SarvamChatMessage } from '../../services/sarvamVoiceService';
import { KiliParrot } from '../mascot/KiliParrot';

interface SarvamVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SarvamVoiceModal: React.FC<SarvamVoiceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { i18n } = useTranslation();
  const isTa = i18n.language === 'ta';
  const [messages, setMessages] = useState<SarvamChatMessage[]>([
    {
      role: 'assistant',
      content: 'வணக்கம்! நான் உங்கள் தமிழ் தோழன் கிளி (Kili). என்னிடம் தமிழ் இலக்கணம், திருக்குறள் அல்லது சொற்கள் பற்றி கேளுங்கள்!',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [status, setStatus] = useState<'idle' | 'recording' | 'thinking' | 'speaking'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Check backend server status on open and lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      sarvamVoiceService.checkHealth().then(res => {
        setServerOnline(res.isOnline);
      });
    } else {
      document.body.style.overflow = '';
      sarvamVoiceService.stopAudio();
      stopRecording();
      setStatus('idle');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto-scroll chat history
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sarvamVoiceService.stopAudio();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];
    sarvamVoiceService.stopAudio();

    if (
      typeof window !== 'undefined' &&
      !window.isSecureContext &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      setErrorMessage(
        'உலாவி பாதுகாப்பு காரணமாக, http://localhost:5173 முகவரியைப் பயன்படுத்தவும் அல்லது கீழே தட்டச்சு செய்து அனுப்பவும். (Browsers restrict microphone on plain HTTP network IPs. Use http://localhost:5173 or type below).'
      );
      setStatus('idle');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        stream.getTracks().forEach(track => track.stop());
        await handleVoiceSubmit(audioBlob);
      };

      recorder.start();
      setIsRecording(true);
      setStatus('recording');
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 14) {
            stopRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: any) {
      setIsRecording(false);
      setStatus('idle');
      setErrorMessage('மைக்ரோஃபோனை அணுக முடியவில்லை. அனுமதி உள்ளதா என சரிபார்க்கவும். (Could not access microphone. Please allow mic permission).');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleVoiceSubmit = async (audioBlob: Blob) => {
    if (audioBlob.size < 500) {
      setErrorMessage('ஒலிப்பதிவு மிகவும் குறுகியது. மீண்டும் பேசவும். (Recording was too short).');
      setStatus('idle');
      return;
    }

    setStatus('thinking');
    setErrorMessage(null);

    const result = await sarvamVoiceService.sendVoice(audioBlob, messages);

    if (result.success && result.transcript) {
      const userMsg: SarvamChatMessage = {
        role: 'user',
        content: result.transcript,
      };
      const assistantMsg: SarvamChatMessage = {
        role: 'assistant',
        content: result.reply,
        audio: result.audio || undefined,
      };

      setMessages(prev => [...prev, userMsg, assistantMsg]);

      if (result.audio) {
        setStatus('speaking');
        try {
          await sarvamVoiceService.playAudio(result.audio);
        } catch {
          // Audio playback ended or failed
        }
      }
      setStatus('idle');
    } else {
      if (result.transcript) {
        setMessages(prev => [
          ...prev,
          { role: 'user', content: result.transcript },
          { role: 'assistant', content: result.reply },
        ]);
      } else {
        setErrorMessage(result.reply || result.error || 'குரலை செயலாக்க முடியவில்லை.');
      }
      setStatus('idle');
    }
  };

  const handleTextSubmit = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    setInputText('');
    setErrorMessage(null);
    sarvamVoiceService.stopAudio();

    const userMsg: SarvamChatMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setStatus('thinking');

    const result = await sarvamVoiceService.sendText(query, messages);

    if (result.success) {
      const assistantMsg: SarvamChatMessage = {
        role: 'assistant',
        content: result.reply,
        audio: result.audio || undefined,
      };
      setMessages(prev => [...prev, assistantMsg]);

      if (result.audio) {
        setStatus('speaking');
        try {
          await sarvamVoiceService.playAudio(result.audio);
        } catch {
          // Finished playback
        }
      }
      setStatus('idle');
    } else {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: result.reply },
      ]);
      setErrorMessage(result.error || null);
      setStatus('idle');
    }
  };

  const samplePrompts = [
    'குறள் 1 விளக்கம் கூறு (Explain Kural 1)',
    'வல்லினம் மெல்லினம் என்றால் என்ன? (What are consonant groups?)',
    'வாழ்த்துச் சொற்கள் (Tamil greetings)',
    'எனக்கு ஒரு பழமொழி சொல் (Tell a Tamil proverb)',
  ];

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-2xl bg-paper rounded-3xl border-4 border-teal/20 shadow-2xl flex flex-col max-h-[88vh] my-auto overflow-hidden animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Kili Branding */}
        <div className="flex items-center justify-between px-6 py-4 bg-paper-dark border-b-2 border-sand">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-surface border-2 border-teal/30 flex items-center justify-center">
              <KiliParrot mood="idle" size="sm" showSpeech={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-teal">
                  கிளி தமிழ் AI உதவியாளர்
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-teal text-white">
                  Sarvam AI
                </span>
              </div>
              <p className="text-xs text-ink-muted">
                Kili Tamil Voice Assistant • Standards 6–8
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {serverOnline === false && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-maroon bg-maroon-surface px-2.5 py-1 rounded-full" title="Start backend: python sarvam_server.py">
                <AlertCircle size={13} />
                <span>Backend Offline</span>
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-2xl hover:bg-sand/70 text-ink-muted hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Conversation Message List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-teal-surface flex items-center justify-center flex-shrink-0 mt-1">
                  <KiliParrot mood="idle" size="sm" showSpeech={false} />
                </div>
              )}

              <div
                className={`max-w-[82%] sm:max-w-[75%] p-4 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-teal text-white rounded-br-none shadow-sm'
                    : 'bg-paper-dark border-2 border-sand text-ink rounded-bl-none shadow-sm'
                }`}
              >
                <p className="font-tamil font-medium whitespace-pre-wrap break-words">
                  {msg.content}
                </p>

                {msg.role === 'assistant' && msg.audio && (
                  <button
                    type="button"
                    onClick={() => sarvamVoiceService.playAudio(msg.audio!)}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal text-white text-xs font-bold hover:bg-teal-light transition-all active:scale-95 shadow-sm"
                  >
                    <Volume2 size={14} />
                    <span>{isTa ? 'மீண்டும் கேள்' : 'Listen Again'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Dynamic Status Display */}
          {status === 'thinking' && (
            <div className="flex items-center gap-3 p-3 bg-paper-dark rounded-2xl border border-sand w-fit animate-pulse">
              <KiliParrot mood="thinking" size="sm" showSpeech={false} />
              <span className="text-xs font-bold text-teal flex items-center gap-1.5">
                <Sparkles size={14} className="animate-spin text-gold" />
                {isTa ? 'கிளி யோசித்து பதில் தயாரிக்கிறது...' : 'Kili is thinking with Sarvam AI...'}
              </span>
            </div>
          )}

          {status === 'speaking' && (
            <div className="flex items-center gap-3 p-3 bg-leaf-surface rounded-2xl border border-leaf/30 w-fit">
              <Radio size={16} className="text-leaf animate-pulse" />
              <span className="text-xs font-bold text-leaf-dark">
                {isTa ? 'கிளி தமிழில் பேசுகிறது...' : 'Kili speaking in Tamil via Sarvam TTS'}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Notification Bar */}
        {errorMessage && (
          <div className="px-6 py-2 bg-maroon-surface text-maroon text-xs flex items-center gap-2 border-t border-maroon/20">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span className="break-words">{errorMessage}</span>
          </div>
        )}

        {/* Suggested Prompts Carousel */}
        <div className="px-4 sm:px-6 py-2 bg-paper-dark/60 border-t border-sand flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-ink-muted flex items-center gap-1 flex-shrink-0">
            <HelpCircle size={13} />
            <span>எ.கா:</span>
          </span>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              disabled={status !== 'idle'}
              onClick={() => handleTextSubmit(prompt)}
              className="text-xs bg-paper border border-sand hover:border-teal hover:text-teal text-ink px-3 py-1 rounded-full whitespace-nowrap transition-colors flex-shrink-0 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Voice and Text Control Bar */}
        <div className="p-4 sm:p-5 bg-paper-dark border-t-2 border-sand flex flex-col gap-3">
          {/* Main Action Area */}
          <div className="flex items-center gap-3">
            {/* Big Mic Button */}
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={status === 'thinking'}
              className={`relative px-5 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 ${
                isRecording
                  ? 'bg-maroon hover:bg-maroon-light text-white animate-pulse'
                  : 'bg-teal hover:bg-teal-light text-white'
              } disabled:opacity-50`}
            >
              {isRecording ? (
                <>
                  <Square size={18} fill="currentColor" />
                  <span>{isTa ? 'நிறுத்து' : 'Stop'} ({15 - recordingSeconds}s)</span>
                </>
              ) : (
                <>
                  <Mic size={18} />
                  <span>{isTa ? 'பேசு' : 'Speak'}</span>
                </>
              )}
            </button>

            {/* Alternative Text Input */}
            <div className="flex-1 flex items-center gap-2 bg-paper border-2 border-sand rounded-2xl px-3 py-1.5 focus-within:border-teal transition-colors">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTextSubmit()}
                placeholder={isTa ? 'அல்லது தட்டச்சு செய்யவும்... (or type your question)' : 'Or type your question here...'}
                disabled={isRecording || status === 'thinking'}
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none font-tamil py-1"
              />
              <button
                type="button"
                onClick={() => handleTextSubmit()}
                disabled={!inputText.trim() || status === 'thinking'}
                className="p-2 rounded-xl bg-teal text-white disabled:opacity-40 hover:bg-teal-light transition-colors"
                aria-label="Send"
              >
                <Send size={15} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-ink-muted px-1">
            <span>Powered by Sarvam AI: Saaras v4 (STT) • 105B (Chat) • Bulbul (TTS)</span>
            {messages.length > 1 && (
              <button
                type="button"
                onClick={() => setMessages([messages[0]])}
                className="hover:text-teal flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={12} />
                <span>அழிக்க (Clear)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
