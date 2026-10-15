import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

export function getAdminClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  return createClient(supabaseUrl, serviceRoleKey);
}

export function getUserClient(authHeader: string | null) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
  return createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader || '' } },
  });
}

export async function authenticateRequest(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: { user }, error } = await userClient.auth.getUser();
  if (error || !user) {
    throw new Error('Invalid or expired authentication token');
  }

  return { user, userClient, adminClient: getAdminClient() };
}

export async function requireAdmin(req: Request) {
  const { user, userClient, adminClient } = await authenticateRequest(req);
  const { data: roles, error } = await adminClient
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin');

  if (error || !roles || roles.length === 0) {
    throw new Error('Forbidden: Administrator privilege required');
  }

  return { user, userClient, adminClient };
}
