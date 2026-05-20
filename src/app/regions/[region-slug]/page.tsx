import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { MapPin } from "lucide-react";
import type { CharterDestination } from "@/types";

export const revalidate = 3600;

const priceTierLabels: Record<string, string> = {
  budget: "Budget-Friendly",
  mid_range: "Mid-Range",
  premium: "Premium",
  luxury: "Ultra-Premium",
};

// URL slug → DB region value
const slugToRegion: Record<string, string> = {
  mediterranean: "mediterranean",
  caribbean: "caribbean",
  "indian-ocean": "indian_ocean",
  "asia-pacific": "asia_pacific",
  "atlantic-north-europe": "atlantic_north_europe",
  americas: "americas",
};

const regionLabels: Record<string, string> = {
  mediterranean: "Mediterranean",
  caribbean: "Caribbean",
  indian_ocean: "Indian Ocean",
  asia_pacific: "Asia Pacific",
  atlantic_north_europe: "Atlantic & Northern Europe",
  americas: "Americas",
};

const regionMap: Record<string, { name: string; description: string; highlights: string[] }> = {
  mediterranean: {
    name: "Mediterranean",
    description: "The cradle of charter sailing — from the Greek islands and Croatian coast to the Turkish Riviera, the Amalfi Coast, and the Balearics. Warm winds, ancient harbours, and cuisine worth sailing for.",
    highlights: ["Greece & the Aegean", "Croatia & Dalmatia", "Turkey", "Italy", "France & Corsica", "Spain & Balearics"],
  },
  caribbean: {
    name: "Caribbean",
    description: "Trade-wind sailing through turquoise waters. The BVI, Grenadines, Antigua, and the Bahamas offer some of the world's most accessible and spectacular cruising grounds.",
    highlights: ["British Virgin Islands", "Grenadines", "Antigua & Barbuda", "Bahamas", "USVI", "Martinique & Guadeloupe"],
  },
  "indian-ocean": {
    name: "Indian Ocean",
    description: "Exotic anchorages and pristine reefs — from the granite islands of the Seychelles to the atolls of the Maldives and the coast of Madagascar.",
    highlights: ["Seychelles", "Maldives", "Madagascar", "Mauritius", "Réunion", "Comoros"],
  },
  "asia-pacific": {
    name: "Asia Pacific",
    description: "From Thailand's limestone karsts to the volcanic islands of Indonesia and the remote anchorages of Fiji — chartering at the edge of the world.",
    highlights: ["Thailand", "Indonesia", "Fiji", "New Zealand", "Tonga", "Myanmar"],
  },
  "atlantic-north-europe": {
    name: "Atlantic & Northern Europe",
    description: "Bracing winds and dramatic coastlines. The Canary Islands, Azores, and the fjords of Scandinavia offer charter sailing for those who value solitude and wild beauty.",
    highlights: ["Canary Islands", "Azores", "Norway & Fjords", "Scotland", "Sweden", "Iceland"],
  },
  americas: {
    name: "Americas",
    description: "From the Pacific Northwest's emerald waterways to Patagonian channels, New England harbours, and the Belize barrier reef — the Americas offer extraordinary diversity.",
    highlights: ["Pacific Northwest", "Patagonia", "Maine & New England", "Belize", "Sea of Cortez", "Chesapeake Bay"],
  },
};

interface PageProps {
  params: Promise<{ "region-slug": string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "region-slug": slug } = await params;
  const region = regionMap[slug];

  if (!region) {
    return { title: "Region Not Found" };
  }

  return {
    title: `${region.name} Charter Destinations`,
    description: region.description.slice(0, 160),
    alternates: { canonical: `https://www.sailmarker.com/regions/${slug}` },
  };
}

export default async function RegionPage({ params }: PageProps) {
  const { "region-slug": slug } = await params;
  const region = regionMap[slug];

  if (!region) {
    notFound();
  }

  const dbRegion = slugToRegion[slug] || slug;
  const { data: destinations } = await supabase
    .from("charter_destinations")
    .select("*")
    .eq("status", "live")
    .eq("region", dbRegion)
    .order("name");

  const regionDestinations = (destinations as CharterDestination[]) || [];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <nav className="flex items-center gap-1.5 text-sm text-sky-300/70 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-white">{region.name}</span>
            </nav>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {region.name}
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl leading-relaxed">
              {region.description}
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">
            Cruising areas in {region.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {region.highlights.map((area) => (
              <div
                key={area}
                className="flex items-center gap-3 rounded-xl border border-navy-100 bg-white p-5 hover:shadow-sm transition-shadow"
              >
                <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <span className="text-navy-700 font-medium">{area}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Destinations grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">
            Charter destinations
            {regionDestinations.length > 0 && (
              <span className="ml-2 text-base font-normal text-navy-400">
                ({regionDestinations.length})
              </span>
            )}
          </h2>
          {regionDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionDestinations.map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group rounded-2xl border border-navy-100 bg-white overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[16/10] bg-navy-100">
                    {d.hero_image_url ? (
                      <Image
                        src={d.hero_image_url}
                        alt={d.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="w-10 h-10 text-navy-300" />
                      </div>
                    )}
                    {d.price_tier && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-navy-700 rounded-full">
                        {priceTierLabels[d.price_tier] || d.price_tier}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-navy-900 group-hover:text-sky-600 transition-colors">
                      {d.name}
                    </h3>
                    <p className="mt-1 text-sm text-navy-500 flex items-center gap-1.5">
                      {d.flag_emoji && <span>{d.flag_emoji}</span>}
                      {d.country}
                    </p>
                    {d.description && (
                      <p className="mt-2 text-sm text-navy-600 line-clamp-2">
                        {d.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-navy-400 text-center py-8">
              No live destinations in this region yet.
            </p>
          )}
        </section>

        {/* Other regions */}
        <section className="bg-white border-t border-navy-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">
              Explore other regions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {Object.entries(regionMap)
                .filter(([key]) => key !== slug)
                .map(([key, r]) => (
                  <Link
                    key={key}
                    href={`/regions/${key}`}
                    className="rounded-xl border border-navy-100 bg-white px-4 py-3 text-center text-sm font-medium text-navy-700 hover:shadow-sm hover:border-sky-300 transition-all"
                  >
                    {r.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
