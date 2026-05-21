import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { Clock } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sailing Guides",
  description:
    "In-depth editorial guides for charter sailing — weather windows, provisioning, itinerary planning, and local knowledge from the Sail Marker editorial team.",
  alternates: { canonical: "https://www.sailmarker.com/guides" },
};

interface Guide {
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  hero_image_url: string | null;
  read_time_minutes: number | null;
}

const categoryOrder = [
  "decision-guides",
  "practical-guides",
  "seasonal-guides",
  "technical-guides",
];

const categoryLabels: Record<string, string> = {
  "decision-guides": "Decision Guides",
  "practical-guides": "Practical Guides",
  "seasonal-guides": "Seasonal Guides",
  "technical-guides": "Technical Guides",
};

const categoryDescriptions: Record<string, string> = {
  "decision-guides": "High-intent guides for choosing your charter destination, region, and boat type.",
  "practical-guides": "Everything you need to know before you step aboard — costs, certifications, insurance, and preparation.",
  "seasonal-guides": "When to sail where, which routes to take, and why the shoulder months deserve your attention.",
  "technical-guides": "Wind patterns, passage planning, and the meteorology that shapes charter sailing.",
};

export default async function GuidesPage() {
  const { data: guides } = await supabase
    .from("editorial_guides")
    .select("slug, title, subtitle, category, hero_image_url, read_time_minutes")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  const grouped = categoryOrder.reduce<Record<string, Guide[]>>((acc, cat) => {
    acc[cat] = (guides || []).filter((g) => g.category === cat);
    return acc;
  }, {});

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

        {/* Guide sections by category */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {categoryOrder.map((cat) => {
            const catGuides = grouped[cat];
            if (!catGuides || catGuides.length === 0) return null;
            return (
              <section key={cat} className="mb-16 last:mb-0">
                <div className="mb-8">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
                    {categoryLabels[cat]}
                  </h2>
                  <p className="mt-2 text-navy-500 text-sm max-w-xl">
                    {categoryDescriptions[cat]}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="group bg-white rounded-xl overflow-hidden border border-navy-100 hover:border-navy-200 hover:shadow-md transition-all"
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-navy-100">
                        {guide.hero_image_url ? (
                          <img
                            src={guide.hero_image_url}
                            alt={guide.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-navy-300 text-sm">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-navy-400">
                            {categoryLabels[guide.category]?.replace(/s$/, "") || guide.category}
                          </span>
                          {guide.read_time_minutes && (
                            <span className="flex items-center gap-1 text-[10px] text-navy-400">
                              <Clock className="w-2.5 h-2.5" />
                              {guide.read_time_minutes} min
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-base font-bold text-navy-900 leading-snug group-hover:text-navy-700 transition-colors">
                          {guide.title}
                        </h3>
                        {guide.subtitle && (
                          <p className="mt-2 text-sm text-navy-500 leading-relaxed line-clamp-2">
                            {guide.subtitle}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
