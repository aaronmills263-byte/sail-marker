-- sail_marker_partners table
-- Stores partner listings across all six partnership tiers

CREATE TABLE IF NOT EXISTS sail_marker_partners (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  destination_slug text,
  region_slug     text,
  partner_type    text NOT NULL CHECK (partner_type IN ('charter', 'school', 'broker', 'marina', 'services', 'sponsor')),
  business_name   text NOT NULL,
  logo_url        text,
  link_url        text,
  blurb           text,
  monthly_price_usd integer NOT NULL DEFAULT 0,
  status          text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'cancelled')),
  stripe_subscription_id text,
  created_at      timestamptz DEFAULT now(),
  expires_at      timestamptz
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_partners_destination ON sail_marker_partners (destination_slug, partner_type) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_partners_region ON sail_marker_partners (region_slug, partner_type) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_partners_type ON sail_marker_partners (partner_type) WHERE status = 'active';

-- RLS: anon can read active partners, service_role can write
ALTER TABLE sail_marker_partners ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'sail_marker_partners' AND policyname = 'anon_read_active_partners'
  ) THEN
    CREATE POLICY anon_read_active_partners ON sail_marker_partners
      FOR SELECT TO anon
      USING (status = 'active');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'sail_marker_partners' AND policyname = 'service_role_all_partners'
  ) THEN
    CREATE POLICY service_role_all_partners ON sail_marker_partners
      FOR ALL TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
