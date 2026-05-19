-- The Match Marker Database Schema
-- Supabase PostgreSQL
-- Sports events & venue discovery platform

-- ============================================================
-- VENUES (stadiums, arenas, circuits, courts)
-- ============================================================
CREATE TABLE venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  description TEXT,
  short_description TEXT,

  -- Location
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  nearest_airport TEXT,
  nearest_station TEXT,

  -- Venue details
  capacity INTEGER,
  year_built INTEGER,
  sport_types TEXT[] DEFAULT '{}',
  surface_type TEXT,
  architect TEXT,

  -- Ratings (0-10)
  overall_rating DECIMAL(3,1) DEFAULT 0,
  atmosphere_score DECIMAL(3,1) DEFAULT 0,
  accessibility_score DECIMAL(3,1) DEFAULT 0,
  facilities_score DECIMAL(3,1) DEFAULT 0,
  value_score DECIMAL(3,1) DEFAULT 0,

  -- Facilities
  has_roof BOOLEAN DEFAULT false,
  has_parking BOOLEAN DEFAULT false,
  has_public_transport BOOLEAN DEFAULT true,
  has_food_drink BOOLEAN DEFAULT true,
  has_vip_hospitality BOOLEAN DEFAULT false,
  has_museum_tour BOOLEAN DEFAULT false,
  has_accessible_seating BOOLEAN DEFAULT true,
  has_family_area BOOLEAN DEFAULT false,

  -- Media
  hero_image_url TEXT,
  gallery_images TEXT[],
  seating_map_url TEXT,
  webcam_url TEXT,

  -- External
  website_url TEXT,
  booking_url TEXT,

  -- Listing
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'premium', 'featured')),
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'approved', 'live', 'rejected', 'cancelled', 'payment_failed'
  )),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_venues_country ON venues(country);
CREATE INDEX idx_venues_sport ON venues USING GIN(sport_types);
CREATE INDEX idx_venues_rating ON venues(overall_rating DESC);
CREATE INDEX idx_venues_status ON venues(status);
CREATE INDEX idx_venues_slug ON venues(slug);

-- ============================================================
-- EVENTS (matches, games, races, tournaments)
-- ============================================================
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sport TEXT NOT NULL CHECK (sport IN (
    'football', 'american-football', 'rugby', 'f1',
    'basketball', 'baseball', 'tennis', 'golf',
    'cricket', 'mma', 'hockey', 'olympics'
  )),
  league TEXT,
  home_team TEXT,
  away_team TEXT,

  -- Venue
  venue_id UUID REFERENCES venues(id),
  venue_name TEXT NOT NULL,
  venue_slug TEXT,
  city TEXT NOT NULL,
  country TEXT NOT NULL,

  -- Timing
  event_date DATE NOT NULL,
  event_time TIME,

  -- Tickets
  ticket_url TEXT,
  ticket_price_from INTEGER,
  currency TEXT DEFAULT 'USD',

  -- Ticket listings: JSONB array of per-provider pricing & availability
  -- Each entry: { provider, price_from, price_avg, availability (1-10), url, last_checked }
  ticket_listings JSONB DEFAULT '[]'::jsonb,

  -- Info
  broadcast_info TEXT,
  hero_image_url TEXT,
  is_featured BOOLEAN DEFAULT false,

  -- Status
  status TEXT DEFAULT 'upcoming' CHECK (status IN (
    'upcoming', 'live', 'completed', 'cancelled'
  )),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_sport ON events(sport);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_venue ON events(venue_id);

-- ============================================================
-- TRIPS
-- ============================================================
CREATE TABLE trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  events UUID[] DEFAULT '{}',
  notes TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_trips_slug ON trips(slug);

-- ============================================================
-- BLOG POSTS
-- ============================================================
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image_url TEXT,
  author TEXT DEFAULT 'The Match Marker',
  published_at TIMESTAMPTZ,
  tags TEXT[],
  read_time_minutes INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC);

-- ============================================================
-- EMAIL SUBSCRIBERS
-- ============================================================
CREATE TABLE email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

-- ============================================================
-- AFFILIATE CLICKS
-- ============================================================
CREATE TABLE affiliate_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner TEXT NOT NULL,
  event_id UUID REFERENCES events(id),
  venue_id UUID REFERENCES venues(id),
  click_url TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LISTING ENQUIRIES
-- ============================================================
CREATE TABLE listing_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website_url TEXT,
  selected_tier TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SPORT SPONSORS
-- ============================================================
CREATE TABLE sport_sponsors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sport TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('sport', 'global')),
  company_name TEXT NOT NULL,
  logo_url TEXT,
  link_url TEXT NOT NULL,
  tagline TEXT,
  banner_image_url TEXT,
  background_color TEXT DEFAULT '#0f1b3d',
  text_color TEXT DEFAULT '#ffffff',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  monthly_rate INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sport_sponsors_sport ON sport_sponsors(sport);
CREATE INDEX idx_sport_sponsors_active ON sport_sponsors(is_active, start_date, end_date);

-- ============================================================
-- SPONSOR ENQUIRIES
-- ============================================================
CREATE TABLE sponsor_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website_url TEXT,
  selected_tier TEXT,
  preferred_sport TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE sport_sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read live venues"
  ON venues FOR SELECT USING (status = 'live');

CREATE POLICY "Public can read upcoming events"
  ON events FOR SELECT USING (status IN ('upcoming', 'live'));

CREATE POLICY "Public can read trips"
  ON trips FOR SELECT USING (true);

CREATE POLICY "Public can insert trips"
  ON trips FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT USING (is_published = true);

CREATE POLICY "Public can subscribe"
  ON email_subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can submit enquiries"
  ON listing_enquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can read active sponsors"
  ON sport_sponsors FOR SELECT USING (is_active = true AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE);

CREATE POLICY "Public can submit sponsor enquiries"
  ON sponsor_enquiries FOR INSERT WITH CHECK (true);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER venues_updated_at
  BEFORE UPDATE ON venues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER sport_sponsors_updated_at
  BEFORE UPDATE ON sport_sponsors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
