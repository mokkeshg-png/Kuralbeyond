export interface SarvamChatMessage {
  role: 'user' | 'assistant';
  content: string;
  transcript?: string;
  audio?: string;
}

export interface SarvamVoiceResponse {
  transcript: string;
  reply: string;
  audio?: string | null;
  success: boolean;
  error?: string;
}

class SarvamVoiceService {
  private currentAudioElement: HTMLAudioElement | null = null;

  async checkHealth(): Promise<{ isOnline: boolean; details?: any }> {
    try {
      const response = await fetch('/api/sarvam/health');
      if (!response.ok) {
        return { isOnline: false };
      }
      const data = await response.json();
      return { isOnline: data.status === 'ok', details: data };
    } catch {
      return { isOnline: false };
    }
  }

  async sendVoice(
    audioBlob: Blob,
    history?: SarvamChatMessage[]
  ): Promise<SarvamVoiceResponse> {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');

      if (history && history.length > 0) {
        const simpleHistory = history.map(h => ({
          role: h.role,
          content: h.content,
        }));
        formData.append('history', JSON.stringify(simpleHistory));
      }

      const response = await fetch('/api/sarvam/voice', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errMessage = 'Voice processing failed';
        try {
          const errData = await response.json();
          errMessage = errData.detail || errMessage;
        } catch {
          // ignore
        }
        return {
          transcript: '',
          reply: `மன்னிக்கவும், பிழை ஏற்பட்டது (${errMessage}). மீண்டும் முயற்சிக்கவும்.`,
          success: false,
          error: errMessage,
        };
      }

      const data: SarvamVoiceResponse = await response.json();
      return data;
    } catch (err: any) {
      return {
        transcript: '',
        reply: 'சேவையகத்தை இணைப்பதில் சிக்கல் ஏற்பட்டது. தயவுசெய்து backend சர்வர் இயங்குகிறதா என பார்க்கவும். (Could not connect to Sarvam AI backend server. Please verify backend is running on port 8000).',
        success: false,
        error: err.message || 'Network error',
      };
    }
  }

  async sendText(
    message: string,
    history?: SarvamChatMessage[]
  ): Promise<SarvamVoiceResponse> {
    try {
      const simpleHistory = (history || []).map(h => ({
        role: h.role,
        content: h.content,
      }));

      const response = await fetch('/api/sarvam/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: simpleHistory,
        }),
      });

      if (!response.ok) {
        let errMessage = 'Chat request failed';
        try {
          const errData = await response.json();
          errMessage = errData.detail || errMessage;
        } catch {
          // ignore
        }
        return {
          transcript: message,
          reply: `மன்னிக்கவும், பிழை ஏற்பட்டது (${errMessage}). மீண்டும் முயற்சிக்கவும்.`,
          success: false,
          error: errMessage,
        };
      }

      const data: SarvamVoiceResponse = await response.json();
      return data;
    } catch (err: any) {
      return {
        transcript: message,
        reply: 'சேவையகத்தை இணைப்பதில் சிக்கல் ஏற்பட்டது. தயவுசெய்து backend இயங்குகிறதா என பார்க்கவும். (Could not connect to Sarvam AI backend server).',
        success: false,
        error: err.message || 'Network error',
      };
    }
  }

  playAudio(base64Audio: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stopAudio();
      try {
        // Detect format or use standard audio/wav or audio/mp3 data URL
        const dataUrl = base64Audio.startsWith('data:')
          ? base64Audio
          : `data:audio/wav;base64,${base64Audio}`;

        const audio = new Audio(dataUrl);
        this.currentAudioElement = audio;

        audio.onended = () => {
          this.currentAudioElement = null;
          resolve();
        };

        audio.onerror = (e) => {
          this.currentAudioElement = null;
          reject(e);
        };

        audio.play().catch(reject);
      } catch (err) {
        reject(err);
      }
    });
  }

  private ttsCache: Map<string, string> = new Map();
  private pendingRequests: Map<string, Promise<string>> = new Map();

  /**
   * Generates Tamil speech for arbitrary text using Sarvam Bulbul v3 via backend proxy.
   * Includes 2-level caching (memory + in-flight deduplication).
   */
  async generateTTS(text: string, pace: number = 1.0, speaker: string = 'kavitha'): Promise<string> {
    const cleanText = text.trim();
    if (!cleanText) {
      throw new Error('Text to speak cannot be empty');
    }

    const cacheKey = `${cleanText}::${pace.toFixed(1)}::${speaker}`;

    // 1. Check in-memory client cache
    if (this.ttsCache.has(cacheKey)) {
      return this.ttsCache.get(cacheKey)!;
    }

    // 2. Check session storage cache
    try {
      const stored = sessionStorage.getItem(`sarvam_tts_${cacheKey}`);
      if (stored) {
        this.ttsCache.set(cacheKey, stored);
        return stored;
      }
    } catch {
      // ignore storage access errors
    }

    // 3. Deduplicate in-flight requests for the same word/phrase
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!;
    }

    const requestPromise = (async () => {
      try {
        const response = await fetch('/api/sarvam/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: cleanText,
            pace,
            speaker,
          }),
        });

        if (!response.ok) {
          let errDetail = 'Failed to generate Sarvam AI voice';
          try {
            const errJson = await response.json();
            errDetail = errJson.detail || errDetail;
          } catch {
            // ignore
          }
          throw new Error(errDetail);
        }

        const data = await response.json();
        if (!data.audio) {
          throw new Error('Sarvam TTS returned empty audio data');
        }

        const base64Audio = data.audio;
        this.ttsCache.set(cacheKey, base64Audio);

        try {
          // Keep sessionStorage items reasonable
          if (cleanText.length < 100) {
            sessionStorage.setItem(`sarvam_tts_${cacheKey}`, base64Audio);
          }
        } catch {
          // ignore quota limits
        }

        return base64Audio;
      } finally {
        this.pendingRequests.delete(cacheKey);
      }
    })();

    this.pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  stopAudio(): void {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
  }
}

export const sarvamVoiceService = new SarvamVoiceService();
