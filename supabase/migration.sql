-- Lumi Studios Portfolio — Supabase schema
-- All tables prefixed with cp_ to coexist in shared Supabase project

-- ============================================================
-- cp_site_settings (single row, id = 'main')
-- ============================================================
CREATE TABLE IF NOT EXISTS cp_site_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  site_name TEXT NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  hero_heading TEXT NOT NULL DEFAULT '',
  hero_description TEXT NOT NULL DEFAULT '',
  hero_image TEXT NOT NULL DEFAULT '',
  contact_email TEXT NOT NULL DEFAULT '',
  contact_phone TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  instagram_url TEXT NOT NULL DEFAULT '',
  facebook_url TEXT NOT NULL DEFAULT '',
  youtube_url TEXT NOT NULL DEFAULT '',
  whatsapp_url TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- cp_photographer (single row, id = 'main')
-- ============================================================
CREATE TABLE IF NOT EXISTS cp_photographer (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL DEFAULT '',
  short_bio TEXT NOT NULL DEFAULT '',
  full_bio TEXT NOT NULL DEFAULT '',
  philosophy TEXT NOT NULL DEFAULT '',
  portrait TEXT NOT NULL DEFAULT '',
  achievements JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- cp_categories
-- ============================================================
CREATE TABLE IF NOT EXISTS cp_categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  order_rank INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- cp_projects
-- ============================================================
CREATE TABLE IF NOT EXISTS cp_projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  gallery TEXT[] DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  client TEXT,
  date TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- cp_services
-- ============================================================
CREATE TABLE IF NOT EXISTS cp_services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  price_range TEXT NOT NULL DEFAULT '',
  features TEXT[] DEFAULT '{}',
  icon TEXT NOT NULL DEFAULT '',
  order_rank INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- cp_testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS cp_testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL DEFAULT '',
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  featured BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- cp_events
-- ============================================================
CREATE TABLE IF NOT EXISTS cp_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  event_type TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  end_date TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  registration_url TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Row Level Security — public read, writes via service_role only
-- ============================================================
ALTER TABLE cp_site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_photographer ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON cp_site_settings FOR SELECT USING (true);
CREATE POLICY "Public read" ON cp_photographer FOR SELECT USING (true);
CREATE POLICY "Public read" ON cp_categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON cp_projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON cp_services FOR SELECT USING (true);
CREATE POLICY "Public read" ON cp_testimonials FOR SELECT USING (true);
CREATE POLICY "Public read" ON cp_events FOR SELECT USING (true);
