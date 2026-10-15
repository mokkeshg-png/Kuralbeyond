import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { authenticateRequest } from '../_shared/auth.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { user, adminClient } = await authenticateRequest(req);
    const url = new URL(req.url);
    const targetProfileId = url.searchParams.get('profileId');

    // Get profiles owned by user
    let profileQuery = adminClient
      .from('profiles')
      .select('*')
      .or(`user_id.eq.${user.id},parent_user_id.eq.${user.id}`);

    if (targetProfileId) {
      profileQuery = profileQuery.eq('id', targetProfileId);
    }

    const { data: profiles, error: profileErr } = await profileQuery;
    if (profileErr || !profiles || profiles.length === 0) {
      return new Response(JSON.stringify({ error: 'No profiles found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const profileIds = profiles.map((p: any) => p.id);

    // Fetch all related entities in parallel
    const [
      { data: preferences },
      { data: progress },
      { data: attempts },
      { data: mastery },
      { data: revision },
      { data: achievements },
      { data: activity },
      { data: xp },
      { data: missions },
    ] = await Promise.all([
      adminClient.from('user_preferences').select('*').in('profile_id', profileIds),
      adminClient.from('lesson_progress').select('*').in('profile_id', profileIds),
      adminClient.from('quiz_attempts').select('*').in('profile_id', profileIds),
      adminClient.from('learner_skill_mastery').select('*').in('profile_id', profileIds),
      adminClient.from('revision_queue').select('*').in('profile_id', profileIds),
      adminClient.from('user_achievements').select('*').in('profile_id', profileIds),
      adminClient.from('daily_learning_activity').select('*').in('profile_id', profileIds),
      adminClient.from('xp_ledger').select('*').in('profile_id', profileIds),
      adminClient.from('mission_progress').select('*').in('profile_id', profileIds),
    ]);

    const exportData = {
      exported_at: new Date().toISOString(),
      platform: 'Kuralbeyond (குறள்பியாண்ட்)',
      user_id: user.id,
      email: user.email,
      profiles: profiles.map((p: any) => ({
        ...p,
        preferences: (preferences || []).filter((pr: any) => pr.profile_id === p.id),
        lesson_progress: (progress || []).filter((pr: any) => pr.profile_id === p.id),
        quiz_attempts: (attempts || []).filter((qa: any) => qa.profile_id === p.id),
        skill_mastery: (mastery || []).filter((m: any) => m.profile_id === p.id),
        revision_queue: (revision || []).filter((r: any) => r.profile_id === p.id),
        achievements: (achievements || []).filter((a: any) => a.profile_id === p.id),
        daily_activity: (activity || []).filter((d: any) => d.profile_id === p.id),
        xp_ledger: (xp || []).filter((x: any) => x.profile_id === p.id),
        mission_progress: (missions || []).filter((mp: any) => mp.profile_id === p.id),
      })),
    };

    return new Response(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="kuralbeyond_user_data.json"',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
