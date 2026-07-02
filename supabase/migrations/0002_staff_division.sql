-- ============================================================================
-- 0002 — Staff division scope + Dr Nilmini Jayaweera (clinic).
-- Run this in the Supabase SQL Editor AFTER 0001_init.sql and seed.sql.
-- Safe to re-run (idempotent).
-- ============================================================================

-- Which division(s) a staff member works in: 'salon' | 'clinic' | 'both'.
alter table staff
  add column if not exists division_scope text not null default 'both';

do $$ begin
  alter table staff
    add constraint staff_division_scope_chk
    check (division_scope in ('salon', 'clinic', 'both'));
exception when duplicate_object then null; end $$;

do $$
declare b uuid;
begin
  select id into b from branches where slug = 'ratnapura';

  -- The founder works across both divisions.
  update staff set division_scope = 'both' where branch_id = b and name = 'Nilu';

  -- Add Dr Nilmini (clinic) once.
  insert into staff (
    branch_id, name, role, bio, experience_label, image,
    specialties, division_scope, online_booking_enabled, display_order, is_active
  )
  select
    b,
    'Dr Nilmini Jayaweera',
    'Clinical Cosmetologist · Medical Aesthetician',
    'A qualified medical doctor and clinical cosmetologist, Dr Nilmini leads the clinic''s advanced skin and aesthetic treatments. She pairs genuine medical precision with a gentle, consultation-first approach so every treatment is safe, considered and tailored to your skin.',
    'MBBS (Colombo)',
    '/images/brand/dr-nilmini.jpeg',
    array['Clinical Cosmetology','Medical Aesthetics','Skin Diagnostics','Advanced Treatments'],
    'clinic',
    true,
    2,
    true
  where not exists (
    select 1 from staff where branch_id = b and name = 'Dr Nilmini Jayaweera'
  );

  -- Let Dr Nilmini perform every clinic treatment (used when a guest picks
  -- "any specialist"; direct selection works regardless of this mapping).
  insert into treatment_specialists (treatment_id, staff_id)
  select t.id, s.id
  from treatments t
  join staff s on s.branch_id = b and s.name = 'Dr Nilmini Jayaweera'
  where t.branch_id = b and t.division = 'clinic'
  on conflict do nothing;
end $$;
