/**
 * Central Supabase configuration + the feature flag the whole app keys off.
 *
 * When `isSupabaseConfigured` is false (no env keys yet), the data layer falls
 * back to the built-in content in `src/constants`, so the public site keeps
 * working exactly as before. Set the keys to "switch on" the database, admin
 * panel, bookings and notifications.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
