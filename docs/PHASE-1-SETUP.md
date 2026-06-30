# Phase 1 — Bringing the database online

The website works **right now** with built-in data. Follow these steps to switch
on the live database, admin panel, and bookings. ~10 minutes, all free.

## 1. Create a Supabase project
1. Go to **https://supabase.com** → sign in → **New project**.
2. Region: **Southeast Asia (Singapore)** (closest to Sri Lanka).
3. Set a strong database password (save it).
4. When ready, open **Settings → API** and copy:
   - **Project URL**
   - **anon public** key
   - **service_role** key (secret — treat like a password)

## 2. Create the database tables
1. In Supabase, open **SQL Editor → New query**.
2. Paste the contents of [`supabase/migrations/0001_init.sql`](../supabase/migrations/0001_init.sql) → **Run**.
3. New query → paste [`supabase/seed.sql`](../supabase/seed.sql) → **Run**.

Your treatments, categories and staff are now in the database.

## 3. Connect the website
Create a file named **`.env.local`** in the project root (copy `.env.example`) and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=...        # Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=...   # anon public key
SUPABASE_SERVICE_ROLE_KEY=...       # service_role key (secret)
NEXT_PUBLIC_SITE_URL=https://thebeautyroombynilu.lk
```

Restart the dev server (`npm run dev`). The site now reads treatments and prices
from the database. Edit a price in Supabase → it appears on the site.

## 4. Create the owner login (for the admin panel — next build step)
In Supabase: **Authentication → Users → Add user** → enter the owner's email +
a password. That account will sign in at `/admin`.

## 5. Deploy (Cloudflare Pages)
1. **dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git** →
   choose `esalagmg/The-Beauty-Room-Web`.
2. Framework preset: **Next.js**. Build command `npm run build`.
3. Add the same environment variables from step 3 under **Settings → Environment variables**.
4. Deploy. Add your custom domain when ready.

> **Keep-alive:** free Supabase projects pause after ~7 days idle. We'll add a
> weekly cron ping (or upgrade to Pro, $25/mo) once bookings are live.

---

## What's built so far (Phase 1)
- ✅ Database schema + Row-Level Security + **DB-level double-booking guard**
- ✅ One-click seed of the current catalog
- ✅ Data layer (DB when configured, else built-in data — no downtime)
- ✅ **Public site reads live data** — homepage, salon, clinic and booking wizard
  all pull treatments, prices and specialists from the database (2-min ISR;
  edit a price in Supabase → it appears on the site)
- ✅ **Real bookings** — the wizard saves a booking (status `requested`), the
  DB prevents double-bookings, and the owner is alerted by **email + Telegram**
  (set `RESEND_API_KEY`/`OWNER_NOTIFY_EMAIL` and/or `TELEGRAM_*` to enable)
- ✅ **Admin panel** at **`/admin`** — owner login, dashboard, manage
  treatments/prices/categories (no code), and accept/decline/complete bookings
  with one-tap WhatsApp to the customer. Catalog edits revalidate the site.
- ✅ **WhatsApp reschedule flow** — in a booking, **Reschedule** → pick a new
  date/time → **Send confirmation link** opens a pre-filled WhatsApp message with
  a secure link. The customer taps it and **Accepts / Asks for another time /
  Cancels** on a branded page (`/b/<token>`); you’re notified of their choice.

**Phase 1 is complete.** Next phases (when you’re ready): full drag-drop
calendar, staff working-hours/availability, automated reminders, online
deposits, then WhatsApp Business API automation.

### Using the admin panel
1. Create the owner login: Supabase → **Authentication → Users → Add user**
   (email + password). 2. Visit **`/admin`** (or `/admin/login`) and sign in.
3. **Treatments → Add/Edit** to manage the menu and prices; **Bookings** to
   action requests. Changes appear on the public site within ~2 minutes.

### Optional owner alerts
- **Email:** create a free Resend account → set `RESEND_API_KEY` + `OWNER_NOTIFY_EMAIL`.
- **Instant WhatsApp/Telegram ping:** create a Telegram bot via @BotFather →
  set `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`.
Both are optional; bookings still save without them (visible in the admin panel next).
