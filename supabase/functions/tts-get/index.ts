import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { authenticateRequest } from '../_shared/auth.ts';
import { callSarvamTts } from '../_shared/sarvam.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { user, adminClient } = await authenticateRequest(req);
    const { text, voice = 'meera', pace = 0.85 } = await req.json();

    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'text is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const normalizedText = text.normalize('NFC').trim();

    if (normalizedText.length > 250) {
      return new Response(JSON.stringify({ error: 'Text exceeds maximum on-demand limit of 250 characters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check feature flag
    const { data: flag } = await adminClient
      .from('feature_flags')
      .select('is_enabled')
      .eq('flag_key', 'sarvam_tts_enabled')
      .single();

    if (flag && !flag.is_enabled) {
      return new Response(
        JSON.stringify({
          fallback: true,
          code: 'TTS_FEATURE_DISABLED',
          message: 'Cloud TTS disabled. Use device speech synthesis.',
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Hash text + voice + pace
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(`${normalizedText}_${voice}_${pace}`));
    const sha256 = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // Check if cached in audio_assets
    const { data: existing } = await adminClient
      .from('audio_assets')
      .select('*')
      .eq('sha256', sha256)
      .eq('status', 'approved')
      .maybeSingle();

    if (existing) {
      const { data: publicUrlData } = adminClient.storage
        .from('audio')
        .getPublicUrl(existing.storage_path);

      return new Response(
        JSON.stringify({
          cached: true,
          audioUrl: publicUrlData.publicUrl,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Dynamic synthesis
    const ttsResult = await callSarvamTts({ text: normalizedText, speaker: voice, pace }, adminClient);

    if (!ttsResult || !ttsResult.audioBase64) {
      // Circuit breaker: Fallback gracefully to Web Speech
      return new Response(
        JSON.stringify({
          fallback: true,
          code: 'AI_TIMEOUT',
          message: 'Tamil helper is busy. Try again.',
          message_ta: 'தமிழ் உதவியாளர் பிஸியாக உள்ளார்.',
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        cached: false,
        audioBase64: ttsResult.audioBase64,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
