import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Compass, SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "All Charter Destinations",
  description:
    "Browse the world's finest charter sailing destinations. Filter by region, season, and budget to find your perfect cruising ground.",
  alternates: { canonical: "https://www.sailmarker.com/destinations" },
};

const regions = [
  "All Regions",
  "Mediterranean",
  "Caribbean",
  "Indian Ocean",
  "Asia Pacific",
  "Atlantic & Northern Europe",
  "Americas",
];

const seasons = ["Any Season", "Spring", "Summer", "Autumn", "Winter"];
const priceTiers = ["Any Budget", "Budget-Friendly", "Mid-Range", "Premium", "Ultra-Premium"];

export default function DestinationsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              All Charter Destinations
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl mx-auto leading-relaxed">
              From the Aegean to the Grenadines — every cruising ground worth chartering, curated and mapped.
            </p>
          </div>
        </section>

        {/* Filter bar */}
        <section className="border-b border-navy-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-navy-400" />
              <select className="text-sm border border-navy-200 rounded-lg px-3 py-2 text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300">
                {regions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              <select className="text-sm border border-navy-200 rounded-lg px-3 py-2 text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300">
                {seasons.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <select className="text-sm border border-navy-200 rounded-lg px-3 py-2 text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300">
                {priceTiers.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Empty grid placeholder */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center py-16 border-2 border-dashed border-navy-200 rounded-2xl bg-white">
            <Compass className="w-12 h-12 text-navy-300 mx-auto mb-4" />
            <p className="text-navy-500 text-lg font-medium">
              Destinations coming soon — content seeding in progress.
            </p>
            <p className="text-navy-400 text-sm mt-2">
              Charter destinations across six regions are being curated and will appear here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
