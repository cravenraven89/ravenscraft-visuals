// Real admin authentication via Supabase Auth (email + password).
// The admin account is created once in the Supabase dashboard
// (Authentication > Users > Add user) — see LAUNCH_GUIDE.md for details.

import { getSupabase, type Session } from "./supabase";

export async function signIn(email: string, password: string): Promise<Session> {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  if (!data.session) throw new Error("Login failed. Please try again.");
  return data.session;
}

export async function signOut(): Promise<void> {
  const supabase = getSupabase();
  await supabase.auth.signOut();
}

export async function getSession(): Promise<Session | null> {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}

export function onAuthChange(callback: (session: Session | null) => void): () => void {
  const supabase = getSupabase();
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}
