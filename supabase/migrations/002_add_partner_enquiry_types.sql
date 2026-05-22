-- Add provisioning_partner and transfer_partner to the enquiry_type constraint
-- First drop the existing constraint, then re-add with new values

DO $$
BEGIN
  -- Drop existing constraint if it exists
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'listing_enquiries'::regclass
    AND conname LIKE '%enquiry_type%'
  ) THEN
    EXECUTE (
      SELECT 'ALTER TABLE listing_enquiries DROP CONSTRAINT ' || conname
      FROM pg_constraint
      WHERE conrelid = 'listing_enquiries'::regclass
      AND conname LIKE '%enquiry_type%'
      LIMIT 1
    );
  END IF;
END $$;

ALTER TABLE listing_enquiries ADD CONSTRAINT listing_enquiries_enquiry_type_check
CHECK (enquiry_type IN (
  'marina_listing',
  'charter_partner',
  'provisioning_partner',
  'transfer_partner',
  'featured_partner',
  'other'
));
