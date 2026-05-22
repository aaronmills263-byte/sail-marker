import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const REGION_SLUGS = [
  "mediterranean",
  "caribbean",
  "indian-ocean",
  "asia-pacific",
  "atlantic-north-europe",
  "americas",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.sailmarker.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/destinations`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/plan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/partner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/partner/charter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/partner/marina`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/partner/provisioning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/partner/transfers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/responsible-sailing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/marker-group`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const regionPages: MetadataRoute.Sitemap = REGION_SLUGS.map((slug) => ({
    url: `${base}/regions/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic pages from database
  const [{ data: destinations }, { data: guides }, { data: marinas }] = await Promise.all([
    supabase.from("charter_destinations").select("slug").eq("status", "live"),
    supabase.from("editorial_guides").select("slug").eq("is_published", true),
    supabase.from("marinas").select("slug"),
  ]);

  const destinationPages: MetadataRoute.Sitemap = (destinations || []).map((d) => ({
    url: `${base}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = (guides || []).map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const marinaPages: MetadataRoute.Sitemap = (marinas || []).map((m) => ({
    url: `${base}/marinas/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...regionPages,
    ...destinationPages,
    ...guidePages,
    ...marinaPages,
  ];
}
