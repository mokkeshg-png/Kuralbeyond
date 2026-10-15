import { AUDIO_MANIFEST, AudioEntry } from '../data/audioManifest';
import { LocalStorageAdapter } from './storageAdapter';
import { sarvamVoiceService } from './sarvamVoiceService';

export interface PlaybackState {
  isPlaying: boolean;
  isLoading: boolean;
  isFallback: boolean;
  isSarvamAi: boolean;
  currentAudioId: string | null;
  speed: number;
  error?: string | null;
}

export type PlaybackListener = (state: PlaybackState) => void;

export class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  private listeners: Set<PlaybackListener> = new Set();
  private isLoadingActive = false;
  private currentId: string | null = null;
  private lastError: string | null = null;

  subscribe(listener: PlaybackListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(isPlaying: boolean) {
    const preferences = LocalStorageAdapter.getPreferences();
    const state: PlaybackState = {
      isPlaying,
      isLoading: this.isLoadingActive,
      isFallback: false,
      isSarvamAi: true,
      currentAudioId: this.currentId,
      speed: preferences.audio_speed || 1.0,
      error: this.lastError,
    };
    this.listeners.forEach(l => l(state));
  }

  stop(): void {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // ignore pause errors
      }
      this.currentAudio = null;
    }
    this.isLoadingActive = false;
    this.notify(false);
  }

  /**
   * Plays Tamil audio using Sarvam AI Bulbul v3 TTS.
   * If fallbackText is provided (e.g. text displayed on a vocabulary card or question),
   * it takes precedence to ensure the exact Tamil word or phrase shown is spoken.
   */
  async play(audioId: string, fallbackText?: string): Promise<boolean> {
    // Prevent duplicate spam requests for the same audio while already generating
    if (this.isLoadingActive && this.currentId === audioId) {
      return false;
    }

    this.stop();
    this.currentId = audioId;
    this.lastError = null;
    this.isLoadingActive = true;
    this.notify(false); // Notify listeners of loading state

    const entry: AudioEntry | undefined = AUDIO_MANIFEST[audioId];
    // Exact Tamil text to speak: fallbackText takes precedence if provided
    const textToSpeak = (fallbackText && fallbackText.trim().length > 0)
      ? fallbackText.trim()
      : (entry ? entry.tamilText : audioId);

    const preferences = LocalStorageAdapter.getPreferences();
    const playbackSpeed = preferences.audio_speed || 1.0;

    try {
      // Call Sarvam AI Bulbul v3 TTS via centralized voice service (with backend and client caching)
      const base64Audio = await sarvamVoiceService.generateTTS(textToSpeak, playbackSpeed);

      this.isLoadingActive = false;

      const dataUrl = base64Audio.startsWith('data:')
        ? base64Audio
        : `data:audio/wav;base64,${base64Audio}`;

      const audio = new Audio(dataUrl);
      audio.playbackRate = playbackSpeed;
      this.currentAudio = audio;

      audio.onplay = () => this.notify(true);
      audio.onended = () => {
        this.currentAudio = null;
        this.notify(false);
      };
      audio.onerror = () => {
        this.currentAudio = null;
        this.lastError = 'Browser audio playback failure';
        this.notify(false);
      };

      await audio.play();
      return true;
    } catch (err: any) {
      this.isLoadingActive = false;
      this.currentAudio = null;
      const errorMsg = err?.message || 'Sarvam AI Voice unavailable. Please check that the backend server is running.';
      this.lastError = errorMsg;
      console.error('Sarvam AI Voice Error:', errorMsg);
      this.notify(false);
      return false;
    }
  }

  isFallbackMode(): boolean {
    return false;
  }

  getLastError(): string | null {
    return this.lastError;
  }
}

export const audioService = new AudioService();
