import "server-only";

/**
 * Admin allowlist (defense-in-depth).
 *
 * Set `ADMIN_EMAILS` (comma-separated) to restrict who can enter the admin
 * panel, even if Supabase Auth sign-ups are enabled. When it's unset, no
 * allowlist is enforced (any authenticated user is allowed) — so existing
 * setups keep working until you opt in.
 */
export function isAllowedAdmin(email: string | null | undefined): boolean {
  const raw = process.env.ADMIN_EMAILS?.trim();
  if (!raw) return true; // not configured → allowlist disabled
  if (!email) return false;
  const allow = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allow.includes(email.toLowerCase());
}
