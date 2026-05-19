import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Compass, MapPin } from "lucide-react";

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

        {/* Destinations grid placeholder */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">
            Charter destinations
          </h2>
          <div className="text-center py-16 border-2 border-dashed border-navy-200 rounded-2xl bg-white">
            <Compass className="w-12 h-12 text-navy-300 mx-auto mb-4" />
            <p className="text-navy-500 text-lg font-medium">
              {region.name} destinations coming soon.
            </p>
            <p className="text-navy-400 text-sm mt-2">
              Individual charter destinations for this region are being curated and will appear here.
            </p>
          </div>
        </section>

        {/* Other regions */}
        <section className="bg-sail-100 border-t border-sail-300">
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
