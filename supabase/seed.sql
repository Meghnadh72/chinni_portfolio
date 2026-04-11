-- Seed data for Chinni Photography Portfolio
-- Matches demo-data.ts content

-- Site Settings
INSERT INTO cp_site_settings (id, site_name, tagline, hero_heading, hero_description, hero_image, contact_email, contact_phone, address, instagram_url, facebook_url, youtube_url, whatsapp_url)
VALUES (
  'main',
  'Chinni Photography',
  'Crafting unforgettable stories, one frame at a time',
  'Chinni Photography',
  'Capturing moments that last forever',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop',
  'hello@chinniphotography.com',
  '+1 (555) 123-4567',
  '123 Creative Studio Lane, New York, NY 10001',
  'https://instagram.com',
  'https://facebook.com',
  'https://youtube.com',
  'https://wa.me/15551234567'
) ON CONFLICT (id) DO NOTHING;

-- Photographer
INSERT INTO cp_photographer (id, name, short_bio, full_bio, philosophy, portrait, achievements)
VALUES (
  'main',
  'Chinni',
  'With over a decade behind the lens, I capture the raw emotions and fleeting moments that make life extraordinary. Every frame is a story waiting to be told.',
  E'Photography found me at a time when I was searching for a way to freeze the beauty I saw in everyday moments. What started as a passion quickly became my life''s work — over 10 years of capturing weddings, portraits, events, and the quiet poetry of landscapes.\n\nI believe the best photographs are felt, not just seen. My approach blends documentary authenticity with artistic vision, creating images that transport you back to the exact emotion of that moment.\n\nWhen I''m not behind the camera, you''ll find me exploring new cities, experimenting with film photography, or mentoring aspiring photographers.',
  'Light is my paint, the world is my canvas, and every moment is a masterpiece waiting to be revealed.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
  '[{"title": "500+", "description": "Weddings Captured"}, {"title": "Featured", "description": "Vogue & Harper''s Bazaar"}, {"title": "Award", "description": "International Photography Awards 2024"}, {"title": "10+", "description": "Years of Experience"}]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Categories
INSERT INTO cp_categories (id, title, slug, description, order_rank) VALUES
  (gen_random_uuid()::text, 'Wedding', 'wedding', 'Timeless wedding stories', 1),
  (gen_random_uuid()::text, 'Portrait', 'portrait', 'Authentic portraits', 2),
  (gen_random_uuid()::text, 'Events', 'events', 'Corporate & social events', 3),
  (gen_random_uuid()::text, 'Landscape', 'landscape', 'Nature & cityscapes', 4),
  (gen_random_uuid()::text, 'Fashion', 'fashion', 'Editorial & fashion', 5)
ON CONFLICT (slug) DO NOTHING;

-- Projects
INSERT INTO cp_projects (id, title, slug, category, cover_image, gallery, description, client, date, featured, tags) VALUES
  (gen_random_uuid()::text, 'A Love Story in Tuscany', 'love-story-tuscany', 'wedding',
   'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop',
   '{}', 'An intimate destination wedding set against the rolling hills of Tuscany.',
   'Sarah & James', '2024-09-15', true, ARRAY['destination', 'outdoor', 'intimate']),

  (gen_random_uuid()::text, 'Urban Elegance', 'urban-elegance', 'portrait',
   'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop',
   '{}', 'A portrait series exploring confidence and beauty in the city.',
   'Maria K.', '2024-08-20', true, ARRAY['city', 'editorial', 'natural-light']),

  (gen_random_uuid()::text, 'Midnight Gala', 'midnight-gala', 'events',
   'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
   '{}', 'A glamorous charity gala with 500 guests under the stars.',
   'The Metropolitan Foundation', '2024-07-10', true, ARRAY['corporate', 'gala', 'nighttime']),

  (gen_random_uuid()::text, 'Golden Hour Dreams', 'golden-hour-dreams', 'landscape',
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
   '{}', 'Chasing the perfect light across mountain peaks and valleys.',
   NULL, '2024-06-05', true, ARRAY['mountains', 'golden-hour', 'nature']),

  (gen_random_uuid()::text, 'Vogue Editorial', 'vogue-editorial', 'fashion',
   'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
   '{}', 'A high-fashion editorial shoot for Vogue''s spring collection.',
   'Vogue Magazine', '2024-05-15', true, ARRAY['editorial', 'high-fashion', 'studio']),

  (gen_random_uuid()::text, 'Eternal Vows', 'eternal-vows', 'wedding',
   'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1000&fit=crop',
   '{}', 'A breathtaking beach wedding ceremony at sunset.',
   'Emily & David', '2024-04-22', true, ARRAY['beach', 'sunset', 'romantic']),

  (gen_random_uuid()::text, 'The Quiet Moments', 'quiet-moments', 'portrait',
   'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop',
   '{}', 'Intimate portraits captured in natural environments.',
   'Various', '2024-03-18', false, ARRAY['natural', 'intimate', 'lifestyle']),

  (gen_random_uuid()::text, 'Tech Summit 2024', 'tech-summit-2024', 'events',
   'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
   '{}', 'Annual technology conference with keynote speakers and exhibitions.',
   'TechCorp', '2024-02-28', false, ARRAY['conference', 'corporate', 'tech']),

  (gen_random_uuid()::text, 'Nordic Wilderness', 'nordic-wilderness', 'landscape',
   'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=1000&fit=crop',
   '{}', 'Northern lights and frozen landscapes of Scandinavia.',
   NULL, '2024-01-15', false, ARRAY['aurora', 'winter', 'scandinavia'])
ON CONFLICT (slug) DO NOTHING;

-- Services
INSERT INTO cp_services (id, title, slug, short_description, cover_image, price_range, features, icon, order_rank) VALUES
  (gen_random_uuid()::text, 'Wedding Photography', 'wedding-photography',
   'Your love story, beautifully told through timeless photographs.',
   'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
   'Starting from $3,000',
   ARRAY['Full-day coverage (up to 12 hours)', 'Second photographer included', '500+ edited high-resolution images', 'Online gallery with download access', 'Engagement session included', 'Custom wedding album design'],
   'Heart', 1),

  (gen_random_uuid()::text, 'Portrait Sessions', 'portrait-sessions',
   'Authentic portraits that capture your true essence and personality.',
   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
   'Starting from $500',
   ARRAY['1-2 hour session', 'Indoor or outdoor location', '50+ edited images', 'Professional retouching', 'Print-ready files', 'Outfit change included'],
   'User', 2),

  (gen_random_uuid()::text, 'Event Coverage', 'event-coverage',
   'Professional documentation of your most important occasions.',
   'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
   'Starting from $1,500',
   ARRAY['Flexible hourly coverage', 'Quick turnaround (48-72 hours)', 'High-resolution images', 'Social media ready formats', 'Event highlight reel', 'Corporate branding options'],
   'Calendar', 3)
ON CONFLICT (slug) DO NOTHING;

-- Testimonials
INSERT INTO cp_testimonials (id, client_name, client_role, quote, rating, featured) VALUES
  (gen_random_uuid()::text, 'Sarah Johnson', 'Bride',
   'Chinni captured every magical moment of our wedding day. The photos are so beautiful they make me cry every time I look at them. Truly an artist!', 5, true),

  (gen_random_uuid()::text, 'Michael Chen', 'Event Director',
   'We''ve worked with many photographers, but Chinni''s ability to capture the energy and emotion of our events is unmatched. A true professional.', 5, true),

  (gen_random_uuid()::text, 'Amara Okafor', 'Model & Actress',
   'Every portrait session feels effortless. Chinni has an incredible eye for light and knows exactly how to bring out the best in everyone.', 5, true),

  (gen_random_uuid()::text, 'David & Emily Park', 'Couple',
   'From our engagement shoot to the wedding day, Chinni was there for every step. The photos tell our love story perfectly.', 5, true),

  (gen_random_uuid()::text, 'Lisa Rodriguez', 'Creative Director, Vogue',
   'Chinni''s editorial work is stunning. Every image has a cinematic quality that elevates any publication. Absolutely world-class.', 5, true)
ON CONFLICT DO NOTHING;

-- Events
INSERT INTO cp_events (id, title, event_type, date, end_date, location, description, registration_url) VALUES
  (gen_random_uuid()::text, 'Photography Masterclass: Light & Shadow', 'Workshop',
   '2025-06-15', '2025-06-15', 'Creative Studio, New York',
   'An intensive one-day workshop exploring the art of natural light photography. Learn advanced techniques for creating dramatic, mood-driven images.',
   '#'),

  (gen_random_uuid()::text, 'Faces of the City — Exhibition', 'Exhibition',
   '2025-07-20', '2025-08-10', 'Gallery Moderne, Chelsea, NYC',
   'A solo exhibition featuring 40 large-format portrait prints from the ''Faces of the City'' series. Opening night with wine reception.',
   '#'),

  (gen_random_uuid()::text, 'Sunset Portrait Mini Sessions', 'Shoot',
   '2025-08-05', '2025-08-05', 'Central Park, New York',
   'Limited 20-minute golden hour portrait sessions in Central Park. Perfect for couples, families, or individual portraits.',
   '#')
ON CONFLICT DO NOTHING;
