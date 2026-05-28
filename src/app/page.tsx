import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Compass, BookOpen, Ship, GraduationCap, ShoppingBag } from "lucide-react";

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
        <section className="relative h-[50vh] sm:h-[60vh] bg-navy-700 overflow-hidden">
          <Image
            src="/images/homepage-hero.jpg"
            alt="Sailboat Vents du Sud at golden hour, Le Grau-du-Roi, France"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Charter destinations, mapped.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
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

          {/* Photo credit */}
          <p className="absolute bottom-4 right-4 text-xs text-white/50 italic">
            Le Grau-du-Roi, France · Photo: Christian Ferrer / CC BY 4.0
          </p>
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

        {/* Partner with us */}
        <section className="bg-white border-y border-navy-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 text-center mb-4">
              Partner with Sail Marker
            </h2>
            <p className="text-navy-600 text-center max-w-xl mx-auto mb-12">
              Reach sailors actively planning their next charter. Three ways to get started.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-navy-100 bg-white p-6 hover:shadow-md hover:border-sky-300 transition-all">
                <Ship className="w-7 h-7 text-sky-400 mb-3" />
                <h3 className="font-display text-lg font-bold text-navy-900 mb-1">
                  For Charter Companies
                </h3>
                <p className="text-2xl font-bold text-navy-900 mb-2">$500/mo</p>
                <p className="text-sm text-navy-500 leading-relaxed mb-4">
                  Featured placement on destination pages. Fleet showcase. Editorial integration.
                </p>
                <Link
                  href="/partner/charter"
                  className="text-sm font-semibold text-sky-600 hover:text-sky-700"
                >
                  Learn more &rarr;
                </Link>
              </div>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 hover:shadow-md hover:border-sky-300 transition-all">
                <GraduationCap className="w-7 h-7 text-sky-400 mb-3" />
                <h3 className="font-display text-lg font-bold text-navy-900 mb-1">
                  For Sailing Schools
                </h3>
                <p className="text-2xl font-bold text-navy-900 mb-2">$200/mo</p>
                <p className="text-sm text-navy-500 leading-relaxed mb-4">
                  Sidebar placement on destination pages. Reach students before they charter.
                </p>
                <Link
                  href="/partner/school"
                  className="text-sm font-semibold text-sky-600 hover:text-sky-700"
                >
                  Learn more &rarr;
                </Link>
              </div>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 hover:shadow-md hover:border-sky-300 transition-all">
                <ShoppingBag className="w-7 h-7 text-sky-400 mb-3" />
                <h3 className="font-display text-lg font-bold text-navy-900 mb-1">
                  For Marinas &amp; Services
                </h3>
                <p className="text-2xl font-bold text-navy-900 mb-2">From $100/mo</p>
                <p className="text-sm text-navy-500 leading-relaxed mb-4">
                  Marinas, provisioning, transfers, crew agencies, chandleries — listed per destination.
                </p>
                <Link
                  href="/partner"
                  className="text-sm font-semibold text-sky-600 hover:text-sky-700"
                >
                  View all tiers &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sailing guides */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
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
        </section>
      </main>
      <Footer />
    </>
  );
}
