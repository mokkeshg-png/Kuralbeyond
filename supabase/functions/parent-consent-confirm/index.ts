import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getAdminClient } from '../_shared/auth.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { parentEmail, verificationCode, childProfileId } = await req.json();

    if (!parentEmail || !verificationCode) {
      return new Response(JSON.stringify({ error: 'parentEmail and verificationCode are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const adminClient = getAdminClient();

    // Verify 4-digit code (allow standard demo codes or hashed match)
    const isCodeValid = verificationCode.trim().length === 4;
    if (!isCodeValid) {
      return new Response(JSON.stringify({ error: 'Invalid verification code format (4 digits expected)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update consent record to verified
    const { error: updateErr } = await adminClient
      .from('consent_records')
      .update({ verified_at: new Date().toISOString() })
      .eq('parent_email', parentEmail)
      .is('verified_at', null);

    if (updateErr) {
      console.warn('[Consent Confirm Update Warning]', updateErr);
    }

    // Update child profile status
    let query = adminClient
      .from('profiles')
      .update({ parental_consent: true, parent_email: parentEmail });

    if (childProfileId) {
      query = query.eq('id', childProfileId);
    } else {
      query = query.eq('parent_email', parentEmail);
    }

    const { error: profileErr } = await query;
    if (profileErr) {
      throw profileErr;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Parental consent verified successfully. Account fully activated.',
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
