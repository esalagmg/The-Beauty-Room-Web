# Go‑Live Checklist — The Beauty Room by Nilu

Practical settings to lock down before promoting the booking link. Items marked
**(dashboard)** are done in a provider's website, not in code.

## 1. Lock down admin access — CRITICAL
The admin panel lets in **any** authenticated Supabase user. Two layers:

- **(dashboard)** Supabase → **Authentication → Sign In / Providers** → disable
  public **email sign‑ups** (allow only admin‑created users). Create your owner
  account under **Authentication → Users → Add user** (tick *Auto Confirm*).
- **(code, already added)** Set an allowlist so only specific emails can enter,
  even if a signup slips through. In `.env.local` **and** in Vercel:
  ```
  ADMIN_EMAILS=owner@example.com,manager@example.com
  ```
  Leave it unset to keep the old "any authenticated user" behaviour.

## 2. Email deliverability (Resend)
- **(dashboard)** Verify your sending **domain** in Resend, then set:
  ```
  EMAIL_FROM=The Beauty Room <bookings@thebeautyroombynilu.lk>
  ```
  Until a domain is verified, Resend's shared `onboarding@resend.dev` only
  delivers to your own account email — **customers won't get confirmations**.

## 3. Vercel environment variables — must match .env.local
In Vercel → Project → **Settings → Environment Variables**, set for Production:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server‑only; never expose)
- `RESEND_API_KEY`, `OWNER_NOTIFY_EMAIL`, `EMAIL_FROM`
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (optional owner ping)
- `ADMIN_EMAILS` (from step 1)
- **`NEXT_PUBLIC_SITE_URL=https://thebeautyroombynilu.lk`** — if missing, email
  and booking links fall back to `http://localhost:3000`.

## 4. Bot / spam protection
- The contact form now has a **honeypot** (basic). For stronger protection on the
  **booking** flow, wire **Cloudflare Turnstile** (site + secret keys already
  reserved as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`). Ask to
  have this implemented when you have real Cloudflare keys.

## 5. Database backups — CRITICAL for real bookings
- **(dashboard)** Supabase free tier has limited backups. Enable **daily
  backups / PITR** (paid) or schedule a periodic export, so a DB loss doesn't
  wipe bookings and customer records.

## 6. Booking integrity
- Keep **at least one active, bookable specialist** per treatment — the DB
  double‑booking guard only applies when a staff member is assigned.
- Availability now hides booked/past/lead‑time slots automatically.

## 7. Nice‑to‑have
- Add a small privacy note near the booking/contact forms (you store name, phone,
  email). The `marketing_consent` field exists if you want a consent checkbox.
- Consider a lightweight favicon (the emblem PNG is ~3.6 MB at full size).
- Add error monitoring (e.g. Sentry) so failed emails/bookings surface.
