import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const forceMock = import.meta.env.VITE_USE_MOCK_STORAGE === 'true';

/**
 * Returns true when Supabase is properly configured and not overridden by
 * the VITE_USE_MOCK_STORAGE flag.
 *
 * Accepts both legacy JWT anon keys (eyJ...) and the newer publishable-key
 * format (sb_publishable_...) introduced in @supabase/supabase-js v2.x.
 */
export const isSupabaseConfigured = (): boolean => {
  if (forceMock) return false;
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (!supabaseUrl.startsWith('https://')) return false;

  const isJwtKey = supabaseAnonKey.startsWith('eyJ') && supabaseAnonKey.length > 100;
  const isPublishableKey = supabaseAnonKey.startsWith('sb_publishable_') && supabaseAnonKey.length > 20;

  return isJwtKey || isPublishableKey;
};

export const supabase = createClient<Database>(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Log which Supabase project this client is connecting to.
// Visible in DevTools console — never logs the key value.
if (typeof window !== 'undefined') {
  const configuredUrl = supabaseUrl ?? '(not set — check VITE_SUPABASE_URL in .env)';
  const isPlaceholder = !supabaseUrl || supabaseUrl.includes('placeholder');
  console.info(
    `[TamilPalam] Supabase project: ${configuredUrl}`,
    isPlaceholder
      ? '⚠️  USING PLACEHOLDER — real database not connected'
      : isSupabaseConfigured()
      ? '✅ configured'
      : '⚠️  key format invalid',
  );
}

/**
 * Performs a lightweight connectivity check against Supabase.
 * Returns an object describing the outcome — never throws.
 *
 * Usage (e.g. in App.tsx or a dev diagnostics panel):
 *   const result = await checkSupabaseConnection();
 *   console.log(result);
 */
export async function checkSupabaseConnection(): Promise<{
  ok: boolean;
  configured: boolean;
  url: string;
  error?: string;
}> {
  const configured = isSupabaseConfigured();
  const url = supabaseUrl ?? '(not set)';

  if (!configured) {
    return {
      ok: false,
      configured: false,
      url,
      error: forceMock
        ? 'VITE_USE_MOCK_STORAGE=true — Supabase intentionally bypassed.'
        : 'Supabase env vars are missing or invalid. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.',
    };
  }

  try {
    // getSession() is the cheapest auth-layer ping — no RLS, no table read required.
    const { error } = await supabase.auth.getSession();
    if (error) {
      return { ok: false, configured, url, error: error.message };
    }
    return { ok: true, configured, url };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, configured, url, error: msg };
  }
}
