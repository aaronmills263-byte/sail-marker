import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Compass, Anchor } from "lucide-react";

export const metadata: Metadata = {
  title: "Plan a Charter",
  description:
    "Plan your sailing charter — choose your region, season, group size, and experience level. Discover the perfect cruising ground.",
  alternates: { canonical: "https://www.sailmarker.com/plan" },
};

const regions = [
  { value: "", label: "Select a region..." },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "caribbean", label: "Caribbean" },
  { value: "indian-ocean", label: "Indian Ocean" },
  { value: "asia-pacific", label: "Asia Pacific" },
  { value: "atlantic-north-europe", label: "Atlantic & Northern Europe" },
  { value: "americas", label: "Americas" },
];

const months = [
  "Any Month", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const groupSizes = [
  { value: "", label: "Group size..." },
  { value: "2", label: "2 (couple)" },
  { value: "4", label: "3–4 (small group)" },
  { value: "6", label: "5–6 (one yacht)" },
  { value: "8", label: "7–8 (large yacht)" },
  { value: "10+", label: "10+ (flotilla / multi-boat)" },
];

const experienceLevels = [
  { value: "", label: "Experience level..." },
  { value: "beginner", label: "Beginner — first charter" },
  { value: "intermediate", label: "Intermediate — a few charters" },
  { value: "experienced", label: "Experienced — confident skipper" },
  { value: "professional", label: "Professional — RYA Yachtmaster or equivalent" },
];

export default function PlanPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <Compass className="w-10 h-10 text-sky-300 mx-auto mb-4" />
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Where would you like to sail?
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl mx-auto leading-relaxed">
              Tell us what you&apos;re looking for and we&apos;ll match you with the right cruising ground.
            </p>
          </div>
        </section>

        {/* Planner form */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl border border-navy-100 p-8 sm:p-10 shadow-sm">
            <div className="space-y-6">
              {/* Region */}
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Region
                </label>
                <select className="w-full border border-navy-200 rounded-lg px-4 py-3 text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300">
                  {regions.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Month */}
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  When do you want to sail?
                </label>
                <select className="w-full border border-navy-200 rounded-lg px-4 py-3 text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300">
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Group size */}
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Group size
                </label>
                <select className="w-full border border-navy-200 rounded-lg px-4 py-3 text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300">
                  {groupSizes.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>

              {/* Experience level */}
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Sailing experience
                </label>
                <select className="w-full border border-navy-200 rounded-lg px-4 py-3 text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300">
                  {experienceLevels.map((e) => (
                    <option key={e.value} value={e.value}>{e.label}</option>
                  ))}
                </select>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link
                  href="/destinations"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-navy-700 text-white font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                >
                  <Anchor className="w-5 h-5" />
                  Explore Destinations
                </Link>
                <p className="text-xs text-navy-400 text-center mt-3">
                  Personalised destination matching is coming soon. For now, explore our curated destinations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
