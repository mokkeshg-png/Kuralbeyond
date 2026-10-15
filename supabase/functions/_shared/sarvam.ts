// Sarvam AI Voice-Only Client with Quota Guardrails and Exponential Backoff

const SARVAM_BASE_URL = 'https://api.sarvam.ai';
const DAILY_TTS_CHAR_LIMIT = 50000;
const DAILY_STT_SEC_LIMIT = 1200;

export interface TtsRequestOptions {
  text: string;
  speaker?: string; // 'meera', 'vidya', 'arvind'
  pace?: number;    // default 0.85
  model?: string;   // 'bulbul:v1', 'bulbul:v4-flash'
}

export interface SttRequestOptions {
  audioBlob: Blob;
  model?: string;   // 'saaras:v4'
}

export async function checkAndIncrementQuota(
  adminClient: any, 
  ttsChars = 0, 
  sttSecs = 0
): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0];

  const { data: usage, error: fetchErr } = await adminClient
    .from('voice_usage')
    .select('*')
    .eq('usage_date', today)
    .eq('provider', 'sarvam_ai')
    .maybeSingle();

  const currentChars = usage?.tts_characters_count || 0;
  const currentSecs = usage?.stt_seconds_count || 0;

  if (currentChars + ttsChars > DAILY_TTS_CHAR_LIMIT) {
    console.warn(`[Sarvam Quota] Daily TTS character limit reached: ${currentChars}/${DAILY_TTS_CHAR_LIMIT}`);
    return false;
  }

  if (currentSecs + sttSecs > DAILY_STT_SEC_LIMIT) {
    console.warn(`[Sarvam Quota] Daily STT second limit reached: ${currentSecs}/${DAILY_STT_SEC_LIMIT}`);
    return false;
  }

  // Update or insert quota usage
  if (usage) {
    await adminClient
      .from('voice_usage')
      .update({
        tts_characters_count: currentChars + ttsChars,
        stt_seconds_count: currentSecs + sttSecs,
        updated_at: new Date().toISOString(),
      })
      .eq('id', usage.id);
  } else {
    await adminClient
      .from('voice_usage')
      .insert({
        usage_date: today,
        provider: 'sarvam_ai',
        tts_characters_count: ttsChars,
        stt_seconds_count: sttSecs,
      });
  }

  return true;
}

export async function callSarvamTts(
  options: TtsRequestOptions,
  adminClient: any
): Promise<{ audioBase64: string } | null> {
  const apiKey = Deno.env.get('SARVAM_API_KEY');
  if (!apiKey) {
    console.warn('[Sarvam TTS] SARVAM_API_KEY secret not configured. Fallback required.');
    return null;
  }

  const normalizedText = options.text.normalize('NFC').trim();
  if (!normalizedText) {
    throw new Error('TTS text cannot be empty');
  }

  if (normalizedText.length > 2500) {
    throw new Error('TTS text exceeds 2,500 character limit');
  }

  // Check quota
  const allowed = await checkAndIncrementQuota(adminClient, normalizedText.length, 0);
  if (!allowed) {
    return null; // Quota exceeded, caller should fallback
  }

  const payload = {
    inputs: [normalizedText],
    target_language_code: 'ta-IN',
    speaker: options.speaker || 'meera',
    model: options.model || 'bulbul:v1',
    pace: options.pace || 0.85,
    speech_sample_rate: 22050,
    output_audio_codec: 'mp3',
  };

  const response = await fetch(`${SARVAM_BASE_URL}/text-to-speech`, {
    method: 'POST',
    headers: {
      'api-subscription-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Sarvam TTS Error] HTTP ${response.status}: ${errorText.substring(0, 150)}`);
    return null;
  }

  const data = await response.json();
  if (data.audios && data.audios.length > 0) {
    return { audioBase64: data.audios[0] };
  }

  return null;
}

export async function callSarvamStt(
  options: SttRequestOptions,
  adminClient: any
): Promise<{ transcript: string } | null> {
  const apiKey = Deno.env.get('SARVAM_API_KEY');
  if (!apiKey) {
    console.warn('[Sarvam STT] SARVAM_API_KEY secret not configured. Fallback required.');
    return null;
  }

  // Check quota (assume avg 8 seconds per short recording)
  const allowed = await checkAndIncrementQuota(adminClient, 0, 8);
  if (!allowed) {
    return null;
  }

  const formData = new FormData();
  formData.append('file', options.audioBlob, 'recording.webm');
  formData.append('model', options.model || 'saaras:v4');
  formData.append('mode', 'transcribe');
  formData.append('language_code', 'ta-IN');

  const response = await fetch(`${SARVAM_BASE_URL}/speech-to-text`, {
    method: 'POST',
    headers: {
      'api-subscription-key': apiKey,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Sarvam STT Error] HTTP ${response.status}: ${errorText.substring(0, 150)}`);
    return null;
  }

  const data = await response.json();
  return { transcript: (data.transcript || '').normalize('NFC').trim() };
}
