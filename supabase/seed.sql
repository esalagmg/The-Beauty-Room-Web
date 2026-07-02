-- ============================================================================
-- Seed the catalog from the launch content. Run AFTER 0001_init.sql.
-- Safe to re-run: uses (branch_id, slug) upserts.
-- After seeding, the database is the source of truth — edit via the admin panel.
-- ============================================================================
do $$
declare b uuid;
begin
  select id into b from branches where slug = 'ratnapura';

  -- ── Categories ────────────────────────────────────────────────────────────
  insert into categories (branch_id, division, slug, name, tagline, description, image, display_order) values
    (b,'salon','hair','Hair Atelier','Cut · Colour · Care','Precision cutting, dimensional colour and restorative rituals, engineered around the movement and architecture of your hair.','/images/brand/salon-hair-sleek.jpeg',1),
    (b,'salon','bridal','Bridal & Couture','For the moments that matter','Editorial bridal artistry: makeup, hair, draping and styling composed for a single, unforgettable day.','/images/brand/bridal-arch.jpeg',2),
    (b,'salon','makeup','Makeup Studio','Skin-first artistry','Luminous, photograph-ready makeup built on a foundation of skin prep and timeless technique.','/images/brand/bridal-roses-closeup.jpeg',3),
    (b,'clinic','skin','Skin Studio','Science-led facials','Result-driven facials that pair clinical actives with deeply restorative ritual, for visibly luminous skin.','/images/brand/clinic-facial.jpeg',4),
    (b,'clinic','advanced','Advanced Aesthetics','Clinical, considered, refined','Advanced, evidence-based treatments delivered with medical precision and an unwavering focus on natural results.','/images/brand/clinic-procedure.jpeg',5),
    (b,'clinic','body','Body & Wellness','Restore · Sculpt · Glow','Holistic body therapies and contouring rituals to leave you renewed from head to toe.','/images/brand/bridal-forest.jpeg',6)
  on conflict (branch_id, slug) do update set
    name=excluded.name, tagline=excluded.tagline, description=excluded.description,
    image=excluded.image, display_order=excluded.display_order;

  -- ── Treatments ────────────────────────────────────────────────────────────
  insert into treatments (branch_id, category_id, division, slug, name, short_description, duration_minutes, price_label, price_amount, is_featured, display_order, color_tag) values
    (b,(select id from categories where branch_id=b and slug='hair'),'salon','signature-cut','Signature Cut & Finish','A bespoke consultation, precision cut and luxe blow-dry finish.',75,'from LKR 5,500',5500,true,1,'#B08A5B'),
    (b,(select id from categories where branch_id=b and slug='hair'),'salon','dimensional-colour','Dimensional Colour','Hand-painted balayage and gloss for lived-in, luminous depth.',180,'from LKR 14,500',14500,false,2,'#B08A5B'),
    (b,(select id from categories where branch_id=b and slug='hair'),'salon','keratin','Keratin Smoothing Ritual','Frizz-free, glass-like shine that lasts for months.',150,'from LKR 18,000',18000,false,3,'#B08A5B'),
    (b,(select id from categories where branch_id=b and slug='hair'),'salon','scalp-ritual','Scalp & Strand Therapy','A restorative bond-building and scalp treatment.',60,'from LKR 6,500',6500,false,4,'#B08A5B'),
    (b,(select id from categories where branch_id=b and slug='bridal'),'salon','bridal-signature','Signature Bridal Look','Full bridal makeup, hairstyling and saree draping with trial.',480,'from LKR 65,000',65000,true,1,'#C9A574'),
    (b,(select id from categories where branch_id=b and slug='bridal'),'salon','bridal-trial','Bridal Trial Session','A complete preview look to perfect every detail before the day.',120,'from LKR 12,000',12000,false,2,'#C9A574'),
    (b,(select id from categories where branch_id=b and slug='bridal'),'salon','occasion-glam','Occasion Glam','Soft-glam makeup and styling for engagements and galas.',90,'from LKR 9,500',9500,false,3,'#C9A574'),
    (b,(select id from categories where branch_id=b and slug='makeup'),'salon','soft-glam','Soft Glam','Effortless, radiant makeup for day or evening.',60,'from LKR 6,500',6500,false,1,'#C9A574'),
    (b,(select id from categories where branch_id=b and slug='makeup'),'salon','editorial-makeup','Editorial / Photoshoot','High-definition artistry tailored for camera and lighting.',90,'from LKR 11,000',11000,false,2,'#C9A574'),
    (b,(select id from categories where branch_id=b and slug='makeup'),'salon','lash-brow','Lash & Brow Design','Lash lift, tint and precision brow shaping.',45,'from LKR 4,500',4500,false,3,'#C9A574'),
    (b,(select id from categories where branch_id=b and slug='skin'),'clinic','hydrafacial','HydraGlow Facial','Deep cleanse, exfoliation, extraction and hydration in one ritual.',60,'from LKR 12,000',12000,true,1,'#9DA0A2'),
    (b,(select id from categories where branch_id=b and slug='skin'),'clinic','signature-facial','Signature Bespoke Facial','A fully customised facial designed around your skin diagnostic.',75,'from LKR 9,500',9500,false,2,'#9DA0A2'),
    (b,(select id from categories where branch_id=b and slug='skin'),'clinic','chemical-peel','Resurfacing Peel','Medical-grade peel to refine tone, texture and clarity.',45,'from LKR 11,000',11000,false,3,'#9DA0A2'),
    (b,(select id from categories where branch_id=b and slug='advanced'),'clinic','microneedling','Collagen Microneedling','Stimulates renewal to smooth texture, scars and fine lines.',75,'from LKR 16,000',16000,true,1,'#9DA0A2'),
    (b,(select id from categories where branch_id=b and slug='advanced'),'clinic','laser-rejuvenation','Laser Rejuvenation','Targets pigmentation and tone for a clear, even complexion.',60,'from LKR 18,000',18000,false,2,'#9DA0A2'),
    (b,(select id from categories where branch_id=b and slug='advanced'),'clinic','anti-aging','Age-Defy Protocol','A multi-step lifting and firming programme.',90,'from LKR 22,000',22000,false,3,'#9DA0A2'),
    (b,(select id from categories where branch_id=b and slug='body'),'clinic','body-contour','Body Contour Therapy','Non-invasive sculpting and lymphatic massage.',90,'from LKR 15,000',15000,false,1,'#9DA0A2'),
    (b,(select id from categories where branch_id=b and slug='body'),'clinic','glow-wrap','Radiance Body Wrap','Detoxifying, hydrating wrap for luminous skin.',60,'from LKR 10,000',10000,false,2,'#9DA0A2')
  on conflict (branch_id, slug) do update set
    name=excluded.name, short_description=excluded.short_description,
    duration_minutes=excluded.duration_minutes, price_label=excluded.price_label,
    price_amount=excluded.price_amount, is_featured=excluded.is_featured,
    display_order=excluded.display_order, category_id=excluded.category_id;

  -- ── Staff (the founder; add team members later in the admin panel) ────────
  insert into staff (branch_id, name, role, bio, experience_label, image, instagram, specialties, display_order)
  values (b,'Nilu','Founder & Lead Artist',
    'The founding eye and the hands behind The Beauty Room. Nilu blends couture hair and bridal artistry with clinical skin science, personally leading every signature look and treatment protocol.',
    '28+ years','/images/brand/founder-nilu.jpeg','@thebeautyroombynilu',
    array['Bridal Direction','Couture Hair','Aesthetic Treatments','Skin Diagnostics'],1)
  on conflict do nothing;

  -- Nilu can perform every treatment
  insert into treatment_specialists (treatment_id, staff_id)
  select t.id, s.id from treatments t cross join staff s
  where t.branch_id=b and s.branch_id=b and s.name='Nilu'
  on conflict do nothing;

  -- ── A couple of editable site settings (for the future Settings module) ───
  insert into site_settings (key, value) values
    ('contact', '{"phone":"077 585 4977","whatsapp":"077 585 4977","email":"hello@thebeautyroombynilu.lk"}'::jsonb),
    ('google',  '{"rating":5,"reviewCount":0,"profileUrl":"https://share.google/yfXnFbWWrEifO1PjM"}'::jsonb)
  on conflict (key) do nothing;
end $$;
