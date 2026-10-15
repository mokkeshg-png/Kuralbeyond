import { AUDIO_MANIFEST, AudioEntry } from '../data/audioManifest';
import { LocalStorageAdapter } from './storageAdapter';

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
        audio.onerror = () => {
          // File missing or failed -> fallback to Web Speech API
          this.playSpeechSynthesis(textToSpeak, playbackSpeed);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          return true;
        }
      } catch {
        // Autoplay blocked or load error -> fallback to Web Speech API
        return this.playSpeechSynthesis(textToSpeak, playbackSpeed);
      }
    }

    return this.playSpeechSynthesis(textToSpeak, playbackSpeed);
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
