import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Compass, Anchor, Map, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Sail Marker — Charter Destinations, Mapped",
  description:
    "Discover the world's finest sailing destinations. Charter yachts, explore cruising grounds, plan itineraries across the Mediterranean, Caribbean, and beyond.",
  alternates: { canonical: "https://www.sailmarker.com" },
};

const regions = [
  { slug: "mediterranean", label: "Mediterranean", description: "Greece, Croatia, Turkey, Italy, France, Spain" },
  { slug: "caribbean", label: "Caribbean", description: "BVI, Grenadines, Antigua, Bahamas" },
  { slug: "indian-ocean", label: "Indian Ocean", description: "Seychelles, Maldives, Thailand, Madagascar" },
  { slug: "asia-pacific", label: "Asia Pacific", description: "Thailand, Indonesia, Fiji, New Zealand" },
  { slug: "atlantic-north-europe", label: "Atlantic & Northern Europe", description: "Canaries, Azores, Scandinavia, Scotland" },
  { slug: "americas", label: "Americas", description: "Pacific Northwest, Patagonia, Maine, Belize" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sail Marker",
  url: "https://www.sailmarker.com",
  description: "Discover the world's finest sailing destinations and charter grounds.",
  publisher: {
    "@type": "Organization",
    name: "Sail Marker",
    url: "https://www.sailmarker.com",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero */}
        <section className="relative bg-navy-700 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Charter destinations, mapped.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-sky-300 max-w-2xl mx-auto leading-relaxed">
              The world&apos;s finest cruising grounds, marinas, and itineraries — curated for sailors who value the journey.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-navy-700 font-semibold rounded-lg hover:bg-sail-200 transition-colors"
              >
                <Compass className="w-5 h-5" />
                Explore Destinations
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Read Guides
              </Link>
            </div>
          </div>
        </section>

        {/* Regions grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 text-center mb-4">
            Cruising regions
          </h2>
          <p className="text-navy-600 text-center max-w-xl mx-auto mb-12">
            From the Aegean to the Grenadines — the world&apos;s charter grounds, organised by region.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <Link
                key={region.slug}
                href={`/regions/${region.slug}`}
                className="group rounded-2xl border border-navy-100 bg-white p-6 hover:shadow-md hover:border-sky-300 transition-all"
              >
                <h3 className="font-display text-xl font-bold text-navy-900 group-hover:text-navy-700 mb-2">
                  {region.label}
                </h3>
                <p className="text-sm text-navy-500 leading-relaxed">
                  {region.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured guides placeholder */}
        <section className="bg-white border-y border-navy-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Sailing guides
            </h2>
            <p className="text-navy-600 max-w-xl mx-auto mb-8">
              In-depth editorial guides for every charter destination — written with the depth of a travel magazine, the precision of a pilot book.
            </p>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-700 text-white font-medium rounded-lg hover:bg-navy-800 transition-colors"
            >
              Browse all guides
            </Link>
          </div>
        </section>

        {/* Listing CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
            List your marina or charter base
          </h2>
          <p className="text-navy-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Reach sailors planning their next charter. Free listing for all marinas — premium placement available for charter companies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/list-your-marina"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-700 text-white font-medium rounded-lg hover:bg-navy-800 transition-colors"
            >
              <Anchor className="w-5 h-5" />
              List Your Marina
            </Link>
            <Link
              href="/charter-partners"
              className="inline-flex items-center gap-2 px-6 py-3 border border-navy-200 text-navy-700 font-medium rounded-lg hover:bg-navy-50 transition-colors"
            >
              Charter Partners
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
