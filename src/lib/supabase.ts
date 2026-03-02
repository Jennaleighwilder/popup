import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (typeof window !== "undefined" && browserClient) {
    return browserClient;
  }

  // Implicit flow: no code_verifier needed - works when PKCE fails on mobile
  // (in-app browsers, Gmail WebView, etc. often lose PKCE storage across redirects)
  browserClient = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      flowType: "implicit",
      detectSessionInUrl: true,
      persistSession: true,
    },
  });
  return browserClient;
}

export function getServiceRoleClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
