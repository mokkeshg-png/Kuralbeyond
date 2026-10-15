import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { requireAdmin } from '../_shared/auth.ts';
import { callSarvamTts } from '../_shared/sarvam.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { user, adminClient } = await requireAdmin(req);
    const body = await req.json();
    const items = body.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'items array is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results = [];
    let generatedCount = 0;
    let cachedCount = 0;

    for (const item of items) {
      const text = (item.text || '').normalize('NFC').trim();
      const voice = item.voice || 'meera';
      const pace = item.pace || 0.85;

      if (!text) continue;

      // Deterministic SHA-256 hash of text + voice + pace
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(`${text}_${voice}_${pace}`));
      const sha256 = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      // Check if asset already exists in database
      const { data: existing } = await adminClient
        .from('audio_assets')
        .select('*')
        .eq('sha256', sha256)
        .maybeSingle();

      if (existing) {
        cachedCount++;
        results.push({ item_id: item.id, status: existing.status, sha256, cached: true });
        continue;
      }

      // Call Sarvam TTS
      const ttsResult = await callSarvamTts({ text, speaker: voice, pace }, adminClient);

      if (!ttsResult || !ttsResult.audioBase64) {
        results.push({ item_id: item.id, status: 'failed', error: 'TTS synthesis failed' });
        continue;
      }

      // Decode base64 to Uint8Array
      const binaryString = atob(ttsResult.audioBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const storagePath = `staging/${sha256}.mp3`;

      // Upload to private audio-staging bucket
      const { error: uploadErr } = await adminClient.storage
        .from('audio-staging')
        .upload(storagePath, bytes, { contentType: 'audio/mpeg', upsert: true });

      if (uploadErr) {
        console.error('[Storage Upload Error]', uploadErr);
        results.push({ item_id: item.id, status: 'failed', error: uploadErr.message });
        continue;
      }

      // Insert pending_review row in audio_assets
      await adminClient.from('audio_assets').insert({
        item_type: item.itemType || 'word',
        item_id: item.id || sha256,
        tamil_text: text,
        tanglish: item.tanglish || '',
        voice,
        pace,
        sha256,
        storage_path: storagePath,
        status: 'pending_review',
        needs_review: false,
      });

      generatedCount++;
      results.push({ item_id: item.id, status: 'pending_review', sha256, cached: false });
    }

    return new Response(
      JSON.stringify({
        success: true,
        generatedCount,
        cachedCount,
        totalItems: items.length,
        results,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
