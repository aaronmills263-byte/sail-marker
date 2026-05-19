import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Sailing Guides",
  description:
    "In-depth editorial guides for charter sailing destinations — weather windows, provisioning, itinerary planning, and local knowledge.",
  alternates: { canonical: "https://www.sailmarker.com/guides" },
};

const categories = [
  "All Guides",
  "Destination Guides",
  "Itinerary Planning",
  "First-Time Charter",
  "Provisioning",
  "Weather & Seasons",
  "Responsible Sailing",
];

export default function GuidesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Sailing Guides
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl mx-auto leading-relaxed">
              Written with the depth of a travel magazine and the precision of a pilot book.
            </p>
          </div>
        </section>

        {/* Category filter */}
        <section className="border-b border-navy-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-navy-400 mr-1" />
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`text-sm px-4 py-1.5 rounded-full transition-colors ${
                    i === 0
                      ? "bg-navy-700 text-white"
                      : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Empty grid placeholder */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center py-16 border-2 border-dashed border-navy-200 rounded-2xl bg-white">
            <BookOpen className="w-12 h-12 text-navy-300 mx-auto mb-4" />
            <p className="text-navy-500 text-lg font-medium">
              Guides coming soon — editorial production in progress.
            </p>
            <p className="text-navy-400 text-sm mt-2">
              In-depth sailing guides across all charter regions are being written and will appear here.
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
