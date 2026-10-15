import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getAdminClient } from '../_shared/auth.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const adminClient = getAdminClient();
    const nowIso = new Date().toISOString();

    // 1. Fetch expired recordings
    const { data: expiredList, error: fetchErr } = await adminClient
      .from('speaking_recordings')
      .select('id, storage_path')
      .lte('expires_at', nowIso)
      .limit(100);

    if (fetchErr) throw fetchErr;

    let purgedCount = 0;

    if (expiredList && expiredList.length > 0) {
      const pathsToDelete = expiredList.map((r: any) => r.storage_path);
      const idsToDelete = expiredList.map((r: any) => r.id);

      // 2. Remove files from storage
      const { error: storageErr } = await adminClient.storage
        .from('recordings')
        .remove(pathsToDelete);

      if (storageErr) {
        console.warn('[Cleanup Storage Warning]', storageErr);
      }

      // 3. Remove database rows
      const { error: dbErr } = await adminClient
        .from('speaking_recordings')
        .delete()
        .in('id', idsToDelete);

      if (dbErr) throw dbErr;
      purgedCount = idsToDelete.length;
    }

    return new Response(
      JSON.stringify({
        success: true,
        purgedCount,
        timestamp: nowIso,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
