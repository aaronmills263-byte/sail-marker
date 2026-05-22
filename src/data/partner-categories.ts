import type { PartnerCategory } from "./partner-pricing";

export interface CategoryConfig {
  slug: PartnerCategory;
  name: string;
  icon: string; // Lucide icon name — resolved in component
  enquiryType: string;
  hubDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  valueProp: string;
  freeTier: {
    name: string;
    description: string;
    features: string[];
    cta: string;
  };
  featuredTier: {
    name: string;
    description: string;
    features: string[];
    cta: string;
  };
  premiumTier: {
    name: string;
    description: string;
    features: string[];
    cta: string;
  };
  whyList: { title: string; description: string }[];
}

export const categoryConfigs: Record<PartnerCategory, CategoryConfig> = {
  charter: {
    slug: "charter",
    name: "Charter Companies",
    icon: "Ship",
    enquiryType: "charter_partner",
    hubDescription: "Reach sailors planning their next bareboat, skippered, or flotilla charter.",
    heroTitle: "Charter Partners",
    heroSubtitle: "Be visible to high-intent charter customers researching their destination.",
    valueProp: "Reach sailors planning their next charter. Three partnership tiers for charter companies and flotilla operators.",
    freeTier: {
      name: "Free Listing",
      description: "Basic directory presence for charter companies.",
      features: [
        "Company name and description",
        "Link to your website",
        "Listed on destination pages",
        "Logo displayed",
      ],
      cta: "Get Listed",
    },
    featuredTier: {
      name: "Featured Partner",
      description: "Enhanced visibility across Sail Marker.",
      features: [
        "Everything in Free Listing",
        "Priority placement on destination pages",
        "Featured in regional guides",
        "Fleet showcase with photos",
        "Direct booking link",
        "Monthly analytics report",
      ],
      cta: "Become a Featured Partner",
    },
    premiumTier: {
      name: "Premium Partner",
      description: "Maximum exposure and editorial integration.",
      features: [
        "Everything in Featured Partner",
        "Top placement across all pages",
        "Dedicated company profile page",
        "Featured in editorial guides",
        "Social media promotion",
        "Custom landing page",
        "Dedicated account manager",
      ],
      cta: "Contact for Premium",
    },
    whyList: [
      {
        title: "High-intent audience",
        description: "Sail Marker visitors are actively researching charter destinations — they're ready to book.",
      },
      {
        title: "Destination-specific placement",
        description: "Your fleet appears on the exact destination pages your customers are browsing.",
      },
      {
        title: "Editorial integration",
        description: "Premium partners are mentioned in our cruising guides and itinerary articles.",
      },
    ],
  },
  marina: {
    slug: "marina",
    name: "Marinas",
    icon: "Anchor",
    enquiryType: "marina_listing",
    hubDescription: "List your marina alongside the world's most-chartered cruising grounds.",
    heroTitle: "List Your Marina",
    heroSubtitle: "List your marina alongside the world's most-chartered cruising grounds.",
    valueProp: "Join Sail Marker's directory and reach sailors planning their next charter.",
    freeTier: {
      name: "Free Listing",
      description: "Basic marina directory presence.",
      features: [
        "Marina name and location",
        "Basic facility information",
        "Link to your website",
        "Listed on destination pages",
      ],
      cta: "Get Listed",
    },
    featuredTier: {
      name: "Featured Marina",
      description: "Enhanced visibility with photo gallery.",
      features: [
        "Everything in Free Listing",
        "Photo gallery (up to 10 images)",
        "Full facility profile",
        "Contact details displayed",
        "Priority placement on destination pages",
        "Monthly analytics report",
      ],
      cta: "Become a Featured Marina",
    },
    premiumTier: {
      name: "Premium Marina",
      description: "Maximum exposure across Sail Marker.",
      features: [
        "Everything in Featured Marina",
        "Top placement across all pages",
        "Dedicated marina profile page",
        "Featured in editorial guides",
        "Social media promotion",
        "Dedicated account manager",
      ],
      cta: "Contact for Premium",
    },
    whyList: [
      {
        title: "Reach charter customers",
        description: "Sailors planning charters are looking for marinas near their destination — be visible when it matters.",
      },
      {
        title: "Showcase your facilities",
        description: "Display berths, services, fuel, provisions, and everything that makes your marina stand out.",
      },
      {
        title: "Destination-level visibility",
        description: "Your marina appears on the destination pages sailors browse before booking their charter.",
      },
    ],
  },
  provisioning: {
    slug: "provisioning",
    name: "Provisioning",
    icon: "ShoppingBag",
    enquiryType: "provisioning_partner",
    hubDescription: "Connect with sailors at every stop — groceries, welcome packs, and yacht agents.",
    heroTitle: "List Your Business",
    heroSubtitle: "Connect with sailors at every stop. Groceries, welcome packs, alcohol delivery, fresh fish, yacht agents — list your provisioning service.",
    valueProp: "Hand your customers over to trusted local suppliers at every marina stop.",
    freeTier: {
      name: "Free Listing",
      description: "Basic presence in the provisioning directory.",
      features: [
        "Business name and description",
        "Services offered",
        "Link to your website",
        "Listed on relevant destination pages",
      ],
      cta: "Get Listed",
    },
    featuredTier: {
      name: "Featured Supplier",
      description: "Enhanced visibility at your marina.",
      features: [
        "Everything in Free Listing",
        "Photo gallery",
        "Contact form on listing",
        "Marina-specific placement",
        "Priority in search results",
        "Monthly analytics report",
      ],
      cta: "Become a Featured Supplier",
    },
    premiumTier: {
      name: "Premium Supplier",
      description: "Maximum exposure across destinations.",
      features: [
        "Everything in Featured Supplier",
        "Top placement at your marina",
        "Featured in editorial guides",
        "Social media promotion",
        "Dedicated business profile page",
        "Dedicated account manager",
      ],
      cta: "Contact for Premium",
    },
    whyList: [
      {
        title: "Marina-specific discovery",
        description: "Charter customers see your business when browsing the exact marina or destination you serve.",
      },
      {
        title: "Broad category coverage",
        description: "Whether you offer groceries, welcome packs, alcohol delivery, or yacht agency services — there's a place for you.",
      },
      {
        title: "Trusted recommendation",
        description: "Sail Marker endorses listed suppliers editorially, giving you credibility with charter customers.",
      },
    ],
  },
  transfers: {
    slug: "transfers",
    name: "Transfers",
    icon: "Car",
    enquiryType: "transfer_partner",
    hubDescription: "The first and last mile of every charter — airport transfers and water taxis.",
    heroTitle: "Transfer Partners",
    heroSubtitle: "The first and last mile of every charter — be the trusted operator for your marina.",
    valueProp: "Be discoverable to every charter customer planning a trip to your area.",
    freeTier: {
      name: "Free Listing",
      description: "Basic presence in the transfer directory.",
      features: [
        "Business name and description",
        "Route coverage",
        "Link to your website",
        "Listed on relevant destination pages",
      ],
      cta: "Get Listed",
    },
    featuredTier: {
      name: "Featured Operator",
      description: "Enhanced visibility on route-specific pages.",
      features: [
        "Everything in Free Listing",
        "Fleet detail and photos",
        "Booking contact displayed",
        "Marina-specific visibility",
        "Priority placement",
        "Monthly analytics report",
      ],
      cta: "Become a Featured Operator",
    },
    premiumTier: {
      name: "Premium Operator",
      description: "Maximum exposure across destinations.",
      features: [
        "Everything in Featured Operator",
        "Top placement across all pages",
        "Featured in editorial guides",
        "Social media promotion",
        "Dedicated business profile page",
        "Dedicated account manager",
      ],
      cta: "Contact for Premium",
    },
    whyList: [
      {
        title: "Capture the first mile",
        description: "Charter customers search for airport-to-marina transfers — be the operator they find.",
      },
      {
        title: "Route-specific placement",
        description: "Your service appears on destination pages where customers need transfers most.",
      },
      {
        title: "Trusted by charter companies",
        description: "Charter operators recommend Sail Marker to their customers for pre-trip logistics.",
      },
    ],
  },
};
