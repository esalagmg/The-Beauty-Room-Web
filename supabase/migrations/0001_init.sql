-- ============================================================================
-- The Beauty Room by Nilu — Phase 1 schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query → Run).
-- Multi-branch ready: every operational table carries branch_id.
-- ============================================================================

create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "btree_gist";  -- double-booking exclusion constraint

-- ── Enums ───────────────────────────────────────────────────────────────────
do $$ begin
  create type division as enum ('salon', 'clinic');
exception when duplicate_object then null; end $$;

do $$ begin
  create type booking_status as enum (
    'requested', 'confirmed', 'reschedule_proposed', 'customer_requested_change',
    'completed', 'cancelled', 'declined', 'no_show', 'expired'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type booking_channel as enum ('website', 'whatsapp', 'phone', 'walk_in', 'admin');
exception when duplicate_object then null; end $$;

-- ── updated_at helper ───────────────────────────────────────────────────────
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

-- ── Branches ────────────────────────────────────────────────────────────────
create table if not exists branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  address text,
  timezone text not null default 'Asia/Colombo',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── Categories ──────────────────────────────────────────────────────────────
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid references branches(id) on delete cascade,
  division division not null,
  slug text not null,
  name text not null,
  tagline text,
  description text,
  image text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (branch_id, slug)
);

-- ── Treatments ──────────────────────────────────────────────────────────────
create table if not exists treatments (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid references branches(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  division division not null,
  slug text not null,
  name text not null,
  short_description text,
  description text,
  duration_minutes int not null default 60,
  buffer_before int not null default 0,
  buffer_after int not null default 0,
  price_amount numeric(10,2),
  price_label text,                       -- e.g. "from LKR 5,500"
  discounted_amount numeric(10,2),
  promo_starts_at timestamptz,
  promo_ends_at timestamptz,
  is_featured boolean not null default false,
  image text,
  display_order int not null default 0,
  is_active boolean not null default true,
  online_booking_enabled boolean not null default true,
  requires_consultation boolean not null default false,
  min_lead_minutes int not null default 120,
  max_advance_days int not null default 60,
  color_tag text,
  loyalty_points int not null default 0,
  cost_price numeric(10,2),
  prep_instructions text,
  aftercare text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (branch_id, slug)
);

-- ── Staff ───────────────────────────────────────────────────────────────────
create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid references branches(id) on delete cascade,
  name text not null,
  role text,
  bio text,
  experience_label text,
  image text,
  instagram text,
  specialties text[] not null default '{}',
  online_booking_enabled boolean not null default true,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- which staff can perform which treatment (M:N)
create table if not exists treatment_specialists (
  treatment_id uuid references treatments(id) on delete cascade,
  staff_id uuid references staff(id) on delete cascade,
  primary key (treatment_id, staff_id)
);

-- ── Customers ───────────────────────────────────────────────────────────────
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid references branches(id) on delete set null,
  full_name text not null,
  phone text,
  whatsapp text,
  email text,
  notes text,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Bookings ────────────────────────────────────────────────────────────────
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid references branches(id) on delete set null,
  customer_id uuid references customers(id) on delete set null,
  treatment_id uuid references treatments(id) on delete set null,
  staff_id uuid references staff(id) on delete set null,
  division division not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status booking_status not null default 'requested',
  channel booking_channel not null default 'website',
  price_label text,            -- snapshot at booking time
  price_amount numeric(10,2),  -- snapshot at booking time
  customer_notes text,
  internal_notes text,
  reference text unique default ('TBR-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Hard guarantee: no overlapping ACTIVE bookings for the same staff member.
alter table bookings drop constraint if exists bookings_no_overlap;
alter table bookings add constraint bookings_no_overlap
  exclude using gist (
    staff_id with =,
    tstzrange(starts_at, ends_at) with &&
  ) where (staff_id is not null
           and status in ('requested', 'confirmed', 'reschedule_proposed'));

-- Audit trail of every status change.
create table if not exists booking_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  from_status booking_status,
  to_status booking_status not null,
  actor text,                  -- 'customer' | 'owner' | 'system'
  message text,
  created_at timestamptz not null default now()
);

-- Secure, single-use links for customer confirm / reschedule / cancel.
create table if not exists booking_tokens (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  token text unique not null,
  purpose text not null default 'confirm',
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

-- ── Reviews (editable in admin; supplements Google) ─────────────────────────
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid references branches(id) on delete cascade,
  name text not null,
  rating int not null check (rating between 1 and 5),
  text text not null,
  review_date text,
  photo_url text,
  google_verified boolean not null default false,
  source text not null default 'google',
  is_published boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── Editable site settings (contact, hours, Google config, etc.) ────────────
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ── Indexes ─────────────────────────────────────────────────────────────────
create index if not exists idx_treatments_category on treatments(category_id);
create index if not exists idx_treatments_division on treatments(branch_id, division, display_order);
create index if not exists idx_categories_division on categories(branch_id, division, display_order);
create index if not exists idx_bookings_starts on bookings(branch_id, starts_at);
create index if not exists idx_bookings_status on bookings(status);
create index if not exists idx_bookings_staff_time on bookings(staff_id, starts_at);

-- ── updated_at triggers ─────────────────────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array['categories','treatments','staff','bookings'] loop
    execute format('drop trigger if exists trg_%s_updated on %I', t, t);
    execute format('create trigger trg_%s_updated before update on %I
                    for each row execute function set_updated_at()', t, t);
  end loop;
end $$;

-- ============================================================================
-- Row-Level Security
--   • anon (public): read the active catalog only.
--   • authenticated (the owner login): full access to everything.
--   • all public booking writes go through the server using the service role,
--     which bypasses RLS — so customers never touch booking tables directly.
-- ============================================================================
alter table branches             enable row level security;
alter table categories           enable row level security;
alter table treatments           enable row level security;
alter table staff                enable row level security;
alter table treatment_specialists enable row level security;
alter table customers            enable row level security;
alter table bookings             enable row level security;
alter table booking_events       enable row level security;
alter table booking_tokens       enable row level security;
alter table reviews              enable row level security;
alter table site_settings        enable row level security;

-- Public catalog: read active rows
create policy "public read branches"   on branches   for select using (is_active);
create policy "public read categories" on categories for select using (is_active);
create policy "public read treatments" on treatments for select using (is_active);
create policy "public read staff"      on staff      for select using (is_active);
create policy "public read t_special"  on treatment_specialists for select using (true);
create policy "public read reviews"    on reviews    for select using (is_published);
create policy "public read settings"   on site_settings for select using (true);

-- Owner (any authenticated user): full access
do $$
declare t text;
begin
  foreach t in array array['branches','categories','treatments','staff',
                            'treatment_specialists','customers','bookings',
                            'booking_events','booking_tokens','reviews','site_settings'] loop
    execute format('create policy "admin all %1$s" on %1$I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- ── Default branch ──────────────────────────────────────────────────────────
insert into branches (name, slug, address, timezone)
values ('The Beauty Room by Nilu', 'ratnapura', 'Ratnapura, Sri Lanka', 'Asia/Colombo')
on conflict (slug) do nothing;
