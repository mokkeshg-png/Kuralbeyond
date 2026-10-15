import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { authenticateRequest } from '../_shared/auth.ts';
import { callSarvamStt } from '../_shared/sarvam.ts';
import { computeTamilSimilarity } from '../_shared/tamilSimilarity.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { user, adminClient } = await authenticateRequest(req);

    // 1. Check feature flag (speaking_practice_stt default false)
    const { data: flag } = await adminClient
      .from('feature_flags')
      .select('is_enabled')
      .eq('flag_key', 'speaking_practice_stt')
      .single();

    if (!flag || !flag.is_enabled) {
      return new Response(
        JSON.stringify({
          error: 'Speaking STT feature is currently disabled. Use self-assessment mode.',
          code: 'STT_FLAG_DISABLED',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;
    const targetText = formData.get('targetText') as string | null;
    const profileId = formData.get('profileId') as string | null;
    const lessonId = formData.get('lessonId') as string | null;

    if (!file || !targetText) {
      return new Response(JSON.stringify({ error: 'file and targetText are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Check parental consent if profile is a child account
    if (profileId) {
      const { data: profile } = await adminClient
        .from('profiles')
        .select('is_child, parental_consent')
        .eq('id', profileId)
        .single();

      if (profile && profile.is_child && !profile.parental_consent) {
        return new Response(
          JSON.stringify({
            error: 'Verified parental consent required before recording voice for children under 13.',
            code: 'PARENTAL_CONSENT_REQUIRED',
          }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // 3. Call Sarvam STT (Saaras v4)
    const sttResult = await callSarvamStt({ audioBlob: file }, adminClient);
    const transcript = sttResult?.transcript || '';

    // 4. Tolerant Tamil string comparison (Speech recognition match only)
    const similarityScore = computeTamilSimilarity(transcript, targetText);

    // 5. Store recording in private recordings bucket with 24-hour expiration
    const recordingId = crypto.randomUUID();
    const storagePath = `${user.id}/${recordingId}.webm`;

    const arrayBuffer = await file.arrayBuffer();
    await adminClient.storage
      .from('recordings')
      .upload(storagePath, arrayBuffer, { contentType: 'audio/webm', upsert: true });

    if (profileId) {
      await adminClient.from('speaking_recordings').insert({
        id: recordingId,
        profile_id: profileId,
        lesson_id: lessonId || null,
        storage_path: storagePath,
        target_text: targetText.normalize('NFC'),
        transcription: transcript,
        similarity_score: similarityScore,
        status: 'completed',
        expires_at: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        transcript,
        targetText: targetText.normalize('NFC'),
        similarity_score: similarityScore,
        // PRD Section 27: Explicitly framed as recognition match, NOT pronunciation assessment
        match_type: 'speech_recognition_match',
        disclaimer: 'Tamil child-speech recognition is experimental. Practice is evaluated via self-assessment.',
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
