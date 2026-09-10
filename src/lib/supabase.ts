import { createClient } from '@supabase/supabase-js';

/**
 * VERIXA uses only the new Supabase project configured through environment variables.
 * No Supabase project URL or key is hard-coded in the source code.
 */
const runtimeEnv = (import.meta as any).env as Record<string, string | undefined> | undefined;
const serverEnv = (globalThis as any).process?.env as Record<string, string | undefined> | undefined;

const supabaseUrl = runtimeEnv?.VITE_SUPABASE_URL ?? serverEnv?.VITE_SUPABASE_URL;
const supabasePublishableKey =
  runtimeEnv?.VITE_SUPABASE_PUBLISHABLE_KEY ?? serverEnv?.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'VERIXA Supabase configuration is missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.'
  );
}

export { supabaseUrl, supabasePublishableKey };

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
