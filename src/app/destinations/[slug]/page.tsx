import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { Anchor, MapPin, Wind, Calendar, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: destination } = await supabase
    .from("charter_destinations")
    .select("name, description, region")
    .eq("slug", slug)
    .single();

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: destination.name,
    description: destination.description?.slice(0, 160) || `Charter sailing in ${destination.name} — cruising guides, marinas, and itineraries.`,
    alternates: { canonical: `https://www.sailmarker.com/destinations/${slug}` },
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: destination } = await supabase
    .from("charter_destinations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!destination) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <section className="bg-navy-700">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Destination
              </h1>
              <p className="mt-4 text-lg text-sky-300">
                This destination is being prepared.
              </p>
            </div>
          </section>

          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-12 border-2 border-dashed border-navy-200 rounded-2xl bg-white">
              <Anchor className="w-12 h-12 text-navy-300 mx-auto mb-4" />
              <p className="text-navy-500 text-lg font-medium">
                Destination content is being curated.
              </p>
              <p className="text-navy-400 text-sm mt-2 max-w-md mx-auto">
                Our editorial team is preparing detailed cruising information, marina listings, and itinerary suggestions for this destination.
              </p>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Destinations
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-navy-700 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <nav className="flex items-center gap-1.5 text-sm text-sky-300/70 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-white">{destination.name}</span>
            </nav>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {destination.name}
            </h1>
            {destination.region && (
              <p className="mt-3 text-sky-300 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {destination.region}
              </p>
            )}
          </div>
        </section>

        {/* Content grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div className="bg-white rounded-2xl border border-navy-100 p-8">
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">Overview</h2>
                <p className="text-navy-600 leading-relaxed">
                  {destination.description || "Detailed description coming soon."}
                </p>
              </div>

              {/* Marinas */}
              <div className="bg-white rounded-2xl border border-navy-100 p-8">
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-sky-400" />
                  Marinas & Charter Bases
                </h2>
                <p className="text-navy-400 text-sm">Marina listings for this destination are being compiled.</p>
              </div>

              {/* Itinerary routes */}
              <div className="bg-white rounded-2xl border border-navy-100 p-8">
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Wind className="w-5 h-5 text-sky-400" />
                  Itinerary Routes
                </h2>
                <p className="text-navy-400 text-sm">Suggested sailing itineraries are being prepared by our editorial team.</p>
              </div>

              {/* Related guides */}
              <div className="bg-white rounded-2xl border border-navy-100 p-8">
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">Related Guides</h2>
                <p className="text-navy-400 text-sm">Editorial guides for this destination will appear here.</p>
              </div>
            </div>

            {/* Sidebar — Quick Facts */}
            <aside className="space-y-6">
              <div className="bg-white rounded-2xl border border-navy-100 p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  Quick Facts
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-navy-400 font-medium">Best Season</dt>
                    <dd className="text-navy-700">{destination.best_season || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-navy-400 font-medium">Wind Conditions</dt>
                    <dd className="text-navy-700">{destination.wind_conditions || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-navy-400 font-medium">Experience Level</dt>
                    <dd className="text-navy-700">{destination.experience_level || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-navy-400 font-medium">Charter Types</dt>
                    <dd className="text-navy-700">{destination.charter_types || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-navy-400 font-medium">Price Range</dt>
                    <dd className="text-navy-700">{destination.price_range || "—"}</dd>
                  </div>
                </dl>

                <div className="mt-6 pt-4 border-t border-navy-100">
                  <Link
                    href="/plan"
                    className="block w-full text-center px-4 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
                  >
                    Plan a Charter Here
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
