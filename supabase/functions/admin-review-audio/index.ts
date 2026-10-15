import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { requireAdmin } from '../_shared/auth.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { user, adminClient } = await requireAdmin(req);
    const { assetId, action, reviewNotes } = await req.json();

    if (!assetId || !['approved', 'rejected'].includes(action)) {
      return new Response(JSON.stringify({ error: 'assetId and action ("approved" | "rejected") required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: asset, error: fetchErr } = await adminClient
      .from('audio_assets')
      .select('*')
      .eq('id', assetId)
      .single();

    if (fetchErr || !asset) {
      return new Response(JSON.stringify({ error: 'Audio asset not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'approved') {
      // 1. Download file from audio-staging
      const { data: fileData, error: downloadErr } = await adminClient.storage
        .from('audio-staging')
        .download(asset.storage_path);

      if (downloadErr || !fileData) {
        throw new Error(`Failed to read staged audio file: ${downloadErr?.message}`);
      }

      const publicPath = `lessons/${asset.item_type}/${asset.sha256}.mp3`;

      // 2. Upload file to public-read audio bucket
      const { error: uploadErr } = await adminClient.storage
        .from('audio')
        .upload(publicPath, fileData, { contentType: 'audio/mpeg', upsert: true });

      if (uploadErr) {
        throw new Error(`Failed to copy to public CDN bucket: ${uploadErr.message}`);
      }

      // 3. Update database asset status
      const { data: updated, error: updateErr } = await adminClient
        .from('audio_assets')
        .update({
          status: 'approved',
          storage_path: publicPath,
          reviewer_id: user.id,
          reviewed_at: new Date().toISOString(),
          review_notes: reviewNotes || 'Verified authentic Tamil pronunciation by reviewer',
          updated_at: new Date().toISOString(),
        })
        .eq('id', assetId)
        .select()
        .single();

      if (updateErr) throw updateErr;

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Audio approved and published to public CDN',
          asset: updated,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // Rejected
      const { data: updated, error: updateErr } = await adminClient
        .from('audio_assets')
        .update({
          status: 'rejected',
          reviewer_id: user.id,
          reviewed_at: new Date().toISOString(),
          review_notes: reviewNotes || 'Rejected by reviewer for pronunciation correction',
          updated_at: new Date().toISOString(),
        })
        .eq('id', assetId)
        .select()
        .single();

      if (updateErr) throw updateErr;

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Audio rejected',
          asset: updated,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
