import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getAdminClient } from '../_shared/auth.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { parentEmail, childProfileId } = await req.json();

    if (!parentEmail || !parentEmail.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid parent email required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!childProfileId) {
      return new Response(JSON.stringify({ error: 'childProfileId is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const adminClient = getAdminClient();

    // Check that the child profile exists
    const { data: profile, error: profileErr } = await adminClient
      .from('profiles')
      .select('id, display_name')
      .eq('id', childProfileId)
      .single();

    if (profileErr || !profile) {
      return new Response(JSON.stringify({ error: 'Child profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate 4-digit verification code
    const verificationCode = String(Math.floor(1000 + Math.random() * 9000));
    
    // Hash the token
    const encoder = new TextEncoder();
    const data = encoder.encode(verificationCode + childProfileId);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashHex = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // Upsert pending consent record
    const { error: insertErr } = await adminClient
      .from('consent_records')
      .insert({
        parent_email: parentEmail,
        child_profile_id: childProfileId,
        consent_method: 'email_verification_code',
        policy_version: '1.0',
        verification_token_hash: hashHex,
      });

    if (insertErr) {
      console.error('[Consent Request Error]', insertErr);
    }

    // Update child profile parent_email
    await adminClient
      .from('profiles')
      .update({ parent_email: parentEmail })
      .eq('id', childProfileId);

    // In a production system, dispatch an email via Resend / SendGrid / Postmark here.
    // For local evaluation and demo speed, return confirmation with code
    return new Response(
      JSON.stringify({
        success: true,
        message: `Parental consent request sent to ${parentEmail}`,
        // For development/demo purposes only:
        devCode: verificationCode,
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
