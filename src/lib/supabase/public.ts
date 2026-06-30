import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Anonymous read client for PUBLIC catalog data (no auth, no cookies).
 *
 * Cookie-free + standard fetch lets Next cache reads in its data cache, so the
 * catalog pages stay static (ISR). Page-level `revalidate` controls refresh
 * cadence; the admin will additionally revalidate on edit for instant updates.
 * Returns null when not configured.
 */
export function createPublicClient() {
  if (!isSupabaseConfigured) return null;

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
