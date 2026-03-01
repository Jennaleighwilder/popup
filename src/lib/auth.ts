import { createClient } from "./supabase";

export async function signUp(email: string, password: string) {
  const supabase = createClient();
  if (!supabase) {
    return { error: { message: "Supabase not configured" } };
  }
  return supabase.auth.signUp({ email, password });
}

export async function signIn(email: string, password: string) {
  const supabase = createClient();
  if (!supabase) {
    return { error: { message: "Supabase not configured" } };
  }
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signInWithGoogle() {
  const supabase = createClient();
  if (!supabase) {
    return { error: { message: "Supabase not configured" } };
  }
  // Use current origin so we always redirect back to Popup (not Launchpad)
  const origin = typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL;
  const redirectTo = origin ? `${origin}/auth/callback` : undefined;
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
}

export async function signOut() {
  const supabase = createClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  const supabase = createClient();
  if (!supabase) return { data: { session: null }, error: null };
  return supabase.auth.getSession();
}

export async function getUser() {
  const supabase = createClient();
  if (!supabase) return { data: { user: null }, error: null };
  return supabase.auth.getUser();
}
