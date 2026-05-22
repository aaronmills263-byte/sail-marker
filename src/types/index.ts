export interface CharterDestination {
  id: string;
  name: string;
  slug: string;
  country: string;
  country_code: string;
  flag_emoji?: string;
  region: "mediterranean" | "caribbean" | "indian_ocean" | "asia_pacific" | "atlantic_north_europe" | "americas";
  sub_region?: string;
  destination_type?: "charter_base" | "cruising_area" | "flotilla_route" | "island_chain";
  hero_image_url?: string;
  description: string;
  long_description?: string;
  latitude?: number;
  longitude?: number;
  nearest_airport?: string;
  nearest_airport_code?: string;
  airport_distance_km?: number;
  best_months?: string[];
  prevailing_wind?: string;
  wind_difficulty?: "beginner" | "intermediate" | "advanced";
  water_conditions?: string;
  charter_base_count?: number;
  marina_count?: number;
  typical_charter_duration_days?: number;
  price_tier?: "budget" | "mid_range" | "premium" | "luxury";
  weekly_charter_low_eur?: number;
  weekly_charter_high_eur?: number;
  popular_yacht_size?: string;
  has_skipper_required?: boolean;
  certification_required?: string;
  best_for?: string[];
  status: "pending" | "live" | "inactive";
  plan: "free" | "basic" | "premium" | "featured";
  created_at: string;
  updated_at: string;
}

export interface Marina {
  id: string;
  charter_destination_id?: string;
  name: string;
  slug: string;
  description?: string;
  hero_image_url?: string;
  latitude?: number;
  longitude?: number;
  berth_count?: number;
  max_yacht_length_m?: number;
  is_charter_base?: boolean;
  charter_companies?: string[];
  facilities?: string[];
  has_shore_power?: boolean;
  has_fuel?: boolean;
  has_provisions?: boolean;
  daily_berth_low_eur?: number;
  daily_berth_high_eur?: number;
  vhf_channel?: string;
  contact_phone?: string;
  website_url?: string;
  created_at: string;
}

export interface ItineraryRoute {
  id: string;
  charter_destination_id?: string;
  name: string;
  slug: string;
  description?: string;
  duration_days: number;
  total_distance_nm?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  route_data?: Record<string, unknown>;
  hero_image_url?: string;
  created_at: string;
}

export interface EditorialGuide {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  hero_image_url?: string;
  read_time_minutes?: number;
  content_md?: string;
  guide_format: "standard" | "travel_guide" | "itinerary_guide";
  sections?: Record<string, unknown>;
  related_destination_slug?: string;
  related_region?: string;
  is_published: boolean;
  published_at?: string;
  meta_description?: string;
  created_at: string;
}

export interface ListingEnquiry {
  id: string;
  name: string;
  email: string;
  company_name?: string;
  marina_or_charter_company?: string;
  destination?: string;
  enquiry_type?: "marina_listing" | "charter_partner" | "provisioning_partner" | "transfer_partner" | "featured_partner" | "other";
  message?: string;
  status: "new" | "in_progress" | "closed";
  created_at: string;
}
