-- Sail Marker: Core schema
-- Charter destinations, marinas, itinerary routes, editorial guides, enquiries

CREATE TABLE charter_destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL,
  country_code TEXT NOT NULL,
  flag_emoji TEXT,
  region TEXT NOT NULL CHECK (region IN ('mediterranean', 'caribbean', 'indian_ocean', 'asia_pacific', 'atlantic_north_europe', 'americas')),
  sub_region TEXT,
  destination_type TEXT CHECK (destination_type IN ('charter_base', 'cruising_area', 'flotilla_route', 'island_chain')),
  hero_image_url TEXT,
  description TEXT NOT NULL,
  long_description TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  nearest_airport TEXT,
  nearest_airport_code TEXT,
  airport_distance_km INTEGER,
  best_months TEXT[],
  prevailing_wind TEXT,
  wind_difficulty TEXT CHECK (wind_difficulty IN ('beginner', 'intermediate', 'advanced')),
  water_conditions TEXT,
  charter_base_count INTEGER,
  marina_count INTEGER,
  typical_charter_duration_days INTEGER DEFAULT 7,
  price_tier TEXT CHECK (price_tier IN ('budget', 'mid_range', 'premium', 'luxury')),
  weekly_charter_low_eur INTEGER,
  weekly_charter_high_eur INTEGER,
  popular_yacht_size TEXT,
  has_skipper_required BOOLEAN DEFAULT false,
  certification_required TEXT,
  best_for TEXT[],
  status TEXT DEFAULT 'live' CHECK (status IN ('pending', 'live', 'inactive')),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'premium', 'featured')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE marinas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  charter_destination_id UUID REFERENCES charter_destinations(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  hero_image_url TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  berth_count INTEGER,
  max_yacht_length_m INTEGER,
  is_charter_base BOOLEAN DEFAULT false,
  charter_companies TEXT[],
  facilities TEXT[],
  has_shore_power BOOLEAN DEFAULT false,
  has_fuel BOOLEAN DEFAULT false,
  has_provisions BOOLEAN DEFAULT false,
  daily_berth_low_eur INTEGER,
  daily_berth_high_eur INTEGER,
  vhf_channel TEXT,
  contact_phone TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE itinerary_routes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  charter_destination_id UUID REFERENCES charter_destinations(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  total_distance_nm INTEGER,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  route_data JSONB,
  hero_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE editorial_guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT,
  hero_image_url TEXT,
  read_time_minutes INTEGER,
  content_md TEXT,
  guide_format TEXT DEFAULT 'standard' CHECK (guide_format IN ('standard', 'travel_guide', 'itinerary_guide')),
  sections JSONB DEFAULT '{}'::jsonb,
  related_destination_slug TEXT,
  related_region TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE listing_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  marina_or_charter_company TEXT,
  destination TEXT,
  enquiry_type TEXT CHECK (enquiry_type IN ('marina_listing', 'charter_partner', 'featured_partner', 'other')),
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE affiliate_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner TEXT NOT NULL,
  destination_slug TEXT,
  source_page TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE charter_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE marinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE editorial_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read destinations" ON charter_destinations FOR SELECT USING (status = 'live');
CREATE POLICY "Public read marinas" ON marinas FOR SELECT USING (true);
CREATE POLICY "Public read routes" ON itinerary_routes FOR SELECT USING (true);
CREATE POLICY "Public read guides" ON editorial_guides FOR SELECT USING (is_published = true);
CREATE POLICY "Public insert enquiries" ON listing_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert subscribers" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert clicks" ON affiliate_clicks FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX idx_destinations_region ON charter_destinations(region);
CREATE INDEX idx_destinations_status ON charter_destinations(status);
CREATE INDEX idx_marinas_destination ON marinas(charter_destination_id);
CREATE INDEX idx_guides_published ON editorial_guides(is_published);
