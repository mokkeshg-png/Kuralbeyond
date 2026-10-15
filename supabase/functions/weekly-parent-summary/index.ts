import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { authenticateRequest } from '../_shared/auth.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { user, adminClient } = await authenticateRequest(req);
    const url = new URL(req.url);
    const childProfileId = url.searchParams.get('childProfileId');

    if (!childProfileId) {
      return new Response(JSON.stringify({ error: 'childProfileId query parameter is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Call stored procedure
    const { data: summary, error } = await adminClient
      .rpc('get_parent_summary', { p_child_profile_id: childProfileId });

    if (error) throw error;

    return new Response(
      JSON.stringify({
        success: true,
        report_period: 'past_7_days',
        generated_at: new Date().toISOString(),
        summary,
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
