import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { authenticateRequest } from '../_shared/auth.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { user, adminClient } = await authenticateRequest(req);
    const body = await req.json().catch(() => ({}));
    const profileId = body.profileId;

    // 1. Delete storage files in private recordings bucket
    const { data: fileList } = await adminClient.storage
      .from('recordings')
      .list(user.id);

    if (fileList && fileList.length > 0) {
      const pathsToDelete = fileList.map((f: any) => `${user.id}/${f.name}`);
      await adminClient.storage.from('recordings').remove(pathsToDelete);
    }

    // 2. Cascade delete database records
    if (profileId) {
      // Delete specific child profile owned by this user
      await adminClient
        .from('profiles')
        .delete()
        .eq('id', profileId)
        .or(`user_id.eq.${user.id},parent_user_id.eq.${user.id}`);
    } else {
      // Delete all profiles owned by this user
      await adminClient
        .from('profiles')
        .delete()
        .or(`user_id.eq.${user.id},parent_user_id.eq.${user.id}`);

      // Delete GoTrue Auth User
      await adminClient.auth.admin.deleteUser(user.id);
    }

    // 3. Log audit event (anonymized)
    await adminClient.from('audit_log').insert({
      actor_id: user.id,
      action: 'account_deletion',
      target_type: 'user',
      target_id: user.id,
      details: { timestamp: new Date().toISOString() },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your account and all associated learner data have been permanently deleted.',
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
