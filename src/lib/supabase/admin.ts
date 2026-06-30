import "server-only";

import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseUrl } from "./config";

/**
 * Service-role Supabase client — BYPASSES Row-Level Security.
 *
 * Server-only. Use exclusively in trusted server code (server actions, route
 * handlers, cron) for privileged operations like writing bookings or sending
 * notifications. Never import this into a Client Component.
 */
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!isSupabaseConfigured || !serviceKey) return null;

  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
