// Supabase client setup.
//
// The Supabase "anon" key is a PUBLIC key by design — it is meant to be shipped
// inside client-side apps like this one. Real security comes from Row Level
// Security (RLS) policies configured in the Supabase dashboard (see the SQL
// script in LAUNCH_GUIDE.md), not from hiding this key.
//
// HOW THIS GETS CONNECTED (see LAUNCH_GUIDE.md for the full easy walkthrough):
// 1) Create a free Supabase project and run the setup SQL script.
// 2) Create your admin user in Supabase Authentication.
// 3) Paste your Project URL + anon key into the Admin > Setup screen to test.
// 4) Send that same URL + key back in chat so it can be built permanently
//    into the live site for every visitor — no credit card required, ever.

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";

// ---- Baked in so every visitor connects to the same live database ----
const DEFAULT_SUPABASE_URL = "https://uvrnqnmgdkfaizoexmqa.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_w6OEI0NbPvqbBq7IJqtkPg_4aJWv_C6";
// ------------------------------------------------------------------------

const LS_URL_KEY = "rv_supabase_url";
const LS_ANON_KEY = "rv_supabase_anon_key";

let client: SupabaseClient | null = null;
let cachedUrl = "";
let cachedKey = "";

function readConfig(): { url: string; key: string } {
  let overrideUrl = "";
  let overrideKey = "";

  try {
    overrideUrl = window.localStorage.getItem(LS_URL_KEY) ?? "";
    overrideKey = window.localStorage.getItem(LS_ANON_KEY) ?? "";
  } catch {
    // Ignore restricted storage — defaults below still work.
  }

  return {
    url: (overrideUrl || DEFAULT_SUPABASE_URL).trim(),
    key: (overrideKey || DEFAULT_SUPABASE_ANON_KEY).trim(),
  };
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = readConfig();
  return Boolean(url && key);
}

export function getSupabaseConfig() {
  return readConfig();
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  try {
    window.localStorage.setItem(LS_URL_KEY, url.trim());
    window.localStorage.setItem(LS_ANON_KEY, anonKey.trim());
  } catch {
    // Ignore restricted storage.
  }
  client = null;
}

export function clearSupabaseConfig() {
  try {
    window.localStorage.removeItem(LS_URL_KEY);
    window.localStorage.removeItem(LS_ANON_KEY);
  } catch {
    // Ignore restricted storage.
  }
  client = null;
}

export function getSupabase(): SupabaseClient {
  const { url, key } = readConfig();
  if (!url || !key) {
    throw new Error("Supabase is not connected yet.");
  }
  if (!client || cachedUrl !== url || cachedKey !== key) {
    client = createClient(url, key);
    cachedUrl = url;
    cachedKey = key;
  }
  return client;
}

// Tests a URL/key pair directly, without saving it or touching the shared
// client above. Used by the Admin > Setup screen's "Test Connection" button
// so mistakes can be caught immediately, before logging in.
export async function testSupabaseConnection(
  url: string,
  anonKey: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const trimmedUrl = url.trim();
  const trimmedKey = anonKey.trim();

  if (!trimmedUrl || !trimmedKey) {
    return { ok: false, message: "Please fill in both the Project URL and the anon public key." };
  }

  if (!/^https:\/\/.+\.supabase\.co\/?$/.test(trimmedUrl)) {
    return {
      ok: false,
      message: 'That doesn\'t look like a Supabase Project URL (should look like "https://xxxx.supabase.co").',
    };
  }

  try {
    const testClient = createClient(trimmedUrl, trimmedKey);
    const { error } = await testClient.from("site_assets").select("id").limit(1);

    if (error) {
      // A permission-style error still confirms we reached a real Supabase
      // project — table-not-found means the setup script hasn't run yet.
      if (/relation .* does not exist/i.test(error.message)) {
        return {
          ok: false,
          message:
            "Connected to Supabase, but the required tables don't exist yet. Please run the setup SQL script first, then try again.",
        };
      }
      return { ok: false, message: `Could not verify the connection: ${error.message}` };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? `Could not reach that project: ${error.message}`
          : "Could not reach that project. Please double-check the URL and key.",
    };
  }
}

export type { Session };
