export type Currency = "GBP" | "USD" | "EUR";
export type PartnerCategory = "charter" | "marina" | "provisioning" | "transfers";
export type PartnerTier = "free" | "featured" | "premium";

export const partnerPricing: Record<
  PartnerCategory,
  Record<"featured" | "premium", Record<Currency, string>>
> = {
  charter: {
    featured: { GBP: "From £49/mo", USD: "From $69/mo", EUR: "From €59/mo" },
    premium: { GBP: "From £149/mo", USD: "From $199/mo", EUR: "From €179/mo" },
  },
  marina: {
    featured: { GBP: "From £49/mo", USD: "From $69/mo", EUR: "From €59/mo" },
    premium: { GBP: "From £149/mo", USD: "From $199/mo", EUR: "From €179/mo" },
  },
  provisioning: {
    featured: { GBP: "From £19/mo", USD: "From $29/mo", EUR: "From €25/mo" },
    premium: { GBP: "From £49/mo", USD: "From $69/mo", EUR: "From €59/mo" },
  },
  transfers: {
    featured: { GBP: "From £29/mo", USD: "From $39/mo", EUR: "From €35/mo" },
    premium: { GBP: "From £79/mo", USD: "From $109/mo", EUR: "From €95/mo" },
  },
};

export const hubPricing: Record<PartnerCategory, string> = {
  charter: "From £49/mo",
  marina: "From £49/mo",
  provisioning: "From £19/mo",
  transfers: "From £29/mo",
};
