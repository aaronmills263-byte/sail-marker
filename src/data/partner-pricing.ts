export type Currency = "GBP" | "USD" | "EUR";
export type PartnerCategory = "charter" | "school" | "broker" | "marina" | "services" | "sponsor";

export const partnerPricing: Record<PartnerCategory, { label: string; usd: number; display: string }> = {
  charter: { label: "Charter Partner", usd: 500, display: "$500/mo" },
  school: { label: "Sailing School", usd: 200, display: "$200/mo" },
  broker: { label: "Yacht Broker", usd: 300, display: "$300/mo" },
  marina: { label: "Marina Listing", usd: 150, display: "$150/mo" },
  services: { label: "Provisioning & Services", usd: 100, display: "$100/mo" },
  sponsor: { label: "Regional Sponsorship", usd: 1500, display: "From $1,500/mo" },
};
