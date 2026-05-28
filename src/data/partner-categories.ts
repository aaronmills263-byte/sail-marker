import type { PartnerCategory } from "./partner-pricing";

export interface CategoryConfig {
  slug: PartnerCategory;
  name: string;
  icon: string;
  price: string;
  tagline: string;
  description: string;
  includes: string[];
  idealFor: string;
}

export const categoryConfigs: Record<PartnerCategory, CategoryConfig> = {
  charter: {
    slug: "charter",
    name: "Charter Partner",
    icon: "Ship",
    price: "$500/mo",
    tagline: "Featured placement on destination pages",
    description:
      "Priority visibility where it matters most — on the destination pages your customers are actively researching. Includes a dedicated listing in the Charter Partners directory with fleet details, booking link, and editorial integration.",
    includes: [
      "Featured placement on destination pages",
      "Dedicated Charter Partners directory listing",
      "Fleet showcase with photos and booking link",
      "Monthly performance report",
      "Editorial mentions in destination guides",
    ],
    idealFor: "Bareboat, skippered, and crewed charter companies. Flotilla operators. Catamaran and monohull fleets.",
  },
  school: {
    slug: "school",
    name: "Sailing School",
    icon: "GraduationCap",
    price: "$200/mo",
    tagline: "\"Learn to sail\" placement on destination pages",
    description:
      "A dedicated sidebar block on destination pages — \"Learn to sail in {destination}\" — reaching sailors who are planning a trip and may need certification or tuition before they charter.",
    includes: [
      "Sidebar placement on relevant destination pages",
      "School profile with courses and certifications offered",
      "Direct enquiry link",
      "Monthly performance report",
    ],
    idealFor: "RYA, ASA, and IYT training centres. Flotilla sailing schools. Liveaboard courses.",
  },
  broker: {
    slug: "broker",
    name: "Yacht Broker",
    icon: "BadgeDollarSign",
    price: "$300/mo",
    tagline: "Logo placement on region pages + brokerage directory",
    description:
      "Featured logo on region hub pages and a listing in the brokerage directory. Ideal for brokers selling vessels in specific cruising grounds — buyers researching destinations are often considering purchase.",
    includes: [
      "Featured logo on relevant region pages",
      "Brokerage directory listing with company profile",
      "Link to current listings",
      "Monthly performance report",
    ],
    idealFor: "Yacht brokers. Vessel sales. Brokerage houses with Mediterranean, Caribbean, or Asia-Pacific inventory.",
  },
  marina: {
    slug: "marina",
    name: "Marina Listing",
    icon: "Anchor",
    price: "$150/mo",
    tagline: "Featured marina with photos and enquiry form",
    description:
      "A featured marina listing on the destination page with photo gallery, facility details, and a direct booking enquiry form. Visible to every sailor researching that cruising ground.",
    includes: [
      "Featured placement on destination pages",
      "Photo gallery (up to 8 images)",
      "Full facility profile with berth details",
      "Direct booking enquiry form",
      "Monthly performance report",
    ],
    idealFor: "Marinas with transient berthing. Charter bases. Superyacht berths. Boatyards with visitor facilities.",
  },
  services: {
    slug: "services",
    name: "Provisioning & Services",
    icon: "ShoppingBag",
    price: "$100/mo",
    tagline: "Listed in on-the-ground services per destination",
    description:
      "Appear in the \"On the ground\" services block on destination pages — the section sailors check when planning provisioning, transfers, crew hire, and local logistics.",
    includes: [
      "Listed in services block on destination pages",
      "Business profile with service details",
      "Direct contact link",
      "Monthly performance report",
    ],
    idealFor: "Provisioning services. Airport-to-marina transfers. Crew agencies. Chandleries. Yacht equipment retailers.",
  },
  sponsor: {
    slug: "sponsor",
    name: "Charter Network Sponsorship",
    icon: "Globe",
    price: "From $1,500/mo",
    tagline: "Top-of-page placement across an entire region",
    description:
      "Premium brand placement at the top of every page across an entire region — Mediterranean, Caribbean, or Indian Ocean. Your logo and tagline seen by every visitor researching that cruising ground.",
    includes: [
      "Top-of-page banner across all region pages",
      "Logo and tagline on every destination page in the region",
      "Dedicated sponsor profile",
      "Priority editorial integration",
      "Quarterly performance review with account manager",
    ],
    idealFor: "Major charter networks. International sailing schools. Marine insurance. Yacht management companies.",
  },
};

export const partnerCategories: PartnerCategory[] = [
  "charter",
  "school",
  "broker",
  "marina",
  "services",
  "sponsor",
];
