import { AUDIO_MANIFEST, AudioEntry } from '../data/audioManifest';
import { LocalStorageAdapter } from './storageAdapter';
import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface PlaybackState {
  isPlaying: boolean;
  isFallback: boolean;
  currentAudioId: string | null;
  speed: number;
}

export type PlaybackListener = (state: PlaybackState) => void;

export class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  private listeners: Set<PlaybackListener> = new Set();
  private isFallbackActive = false;
  private currentId: string | null = null;

  subscribe(listener: PlaybackListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(isPlaying: boolean) {
    const preferences = LocalStorageAdapter.getPreferences();
    const state: PlaybackState = {
      isPlaying,
      isFallback: this.isFallbackActive,
      currentAudioId: this.currentId,
      speed: preferences.audio_speed || 1.0,
    };
    this.listeners.forEach(l => l(state));
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.notify(false);
  }

  async play(audioId: string, fallbackText?: string): Promise<boolean> {
    this.stop();
    this.currentId = audioId;
    this.isFallbackActive = false;

    const entry: AudioEntry | undefined = AUDIO_MANIFEST[audioId];
    const textToSpeak = entry ? entry.tamilText : (fallbackText || audioId);
    const preferences = LocalStorageAdapter.getPreferences();
    const playbackSpeed = preferences.audio_speed || 1.0;

    // Check if recorded audio file exists and play
    if (entry && entry.filePath) {
      try {
        const audio = new Audio(entry.filePath);
        audio.playbackRate = playbackSpeed;
        this.currentAudio = audio;

        audio.onplay = () => this.notify(true);
        audio.onended = () => {
          this.currentAudio = null;
          this.notify(false);
        };
        audio.onerror = async () => {
          // File missing or failed -> try tts-get Edge Function, then fallback to Web Speech API
          const handled = await this.playFromEdgeTts(textToSpeak, playbackSpeed);
          if (!handled) {
            this.playSpeechSynthesis(textToSpeak, playbackSpeed);
          }
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          return true;
        }
      } catch {
        const handled = await this.playFromEdgeTts(textToSpeak, playbackSpeed);
        if (!handled) {
          return this.playSpeechSynthesis(textToSpeak, playbackSpeed);
        }
        return true;
      }
    }

    const handled = await this.playFromEdgeTts(textToSpeak, playbackSpeed);
    if (!handled) {
      return this.playSpeechSynthesis(textToSpeak, playbackSpeed);
    }
    return true;
  }

  private async playFromEdgeTts(text: string, rate: number): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const { data, error } = await supabase.functions.invoke('tts-get', {
        body: { text, voice: 'meera', pace: rate },
      });
      if (error || !data || data.fallback) return false;

      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audio.playbackRate = rate;
        this.currentAudio = audio;
        audio.onplay = () => this.notify(true);
        audio.onended = () => {
          this.currentAudio = null;
          this.notify(false);
        };
        await audio.play();
        return true;
      }

      if (data.audioBase64) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
        audio.playbackRate = rate;
        this.currentAudio = audio;
        audio.onplay = () => this.notify(true);
        audio.onended = () => {
          this.currentAudio = null;
          this.notify(false);
        };
        await audio.play();
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }


  private playSpeechSynthesis(text: string, rate: number): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not available in this environment');
      return false;
    }

    try {
      this.isFallbackActive = true;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ta-IN';
      utterance.rate = rate;

      // Try finding a Tamil voice
      const voices = window.speechSynthesis.getVoices();
      const tamilVoice = voices.find(v => v.lang.includes('ta') || v.lang.includes('ta-IN'));
      if (tamilVoice) {
        utterance.voice = tamilVoice;
      }

      utterance.onstart = () => this.notify(true);
      utterance.onend = () => {
        this.notify(false);
      };
      utterance.onerror = () => {
        this.notify(false);
      };

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn('Speech synthesis playback error', e);
      this.notify(false);
      return false;
    }
  }

  isFallbackMode(): boolean {
    return this.isFallbackActive;
  }
}

export const audioService = new AudioService();
