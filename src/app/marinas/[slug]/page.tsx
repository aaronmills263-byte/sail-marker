import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { Anchor, MapPin, Ship, ArrowLeft, Fuel, Waves, Wrench } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: marina } = await supabase
    .from("marinas")
    .select("name, description, location")
    .eq("slug", slug)
    .single();

  if (!marina) {
    return { title: "Marina Not Found" };
  }

  return {
    title: `${marina.name} — Marina & Charter Base`,
    description: marina.description?.slice(0, 160) || `${marina.name} marina — facilities, charter companies, and berthing information.`,
    alternates: { canonical: `https://www.sailmarker.com/marinas/${slug}` },
  };
}

export default async function MarinaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: marina } = await supabase
    .from("marinas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!marina) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <section className="bg-navy-700">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
              <h1 className="font-display text-4xl font-bold text-white tracking-tight">
                Marina Not Found
              </h1>
              <p className="mt-4 text-sky-300">
                This marina may not be listed yet.
              </p>
            </div>
          </section>

          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-12 border-2 border-dashed border-navy-200 rounded-2xl bg-white">
              <Anchor className="w-12 h-12 text-navy-300 mx-auto mb-4" />
              <p className="text-navy-500 text-lg font-medium">
                This marina is not yet in our directory.
              </p>
              <p className="text-navy-400 text-sm mt-2">
                Are you the marina operator?{" "}
                <Link href="/list-your-marina" className="text-navy-700 underline hover:text-sky-500">
                  List your marina
                </Link>{" "}
                with Sail Marker.
              </p>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Browse Destinations
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
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <nav className="flex items-center gap-1.5 text-sm text-sky-300/70 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-white">{marina.name}</span>
            </nav>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {marina.name}
            </h1>
            {marina.location && (
              <p className="mt-3 text-sky-300 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {marina.location}
              </p>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-2xl border border-navy-100 p-8">
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">About</h2>
                <p className="text-navy-600 leading-relaxed">
                  {marina.description}
                </p>
              </div>

              {/* Facilities */}
              <div className="bg-white rounded-2xl border border-navy-100 p-8">
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-sky-400" />
                  Facilities
                </h2>
                {marina.facilities && marina.facilities.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {marina.facilities.map((facility: string) => (
                      <div key={facility} className="flex items-center gap-2 text-sm text-navy-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        {facility}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-navy-400 text-sm">Facility details are being compiled.</p>
                )}
              </div>

              {/* Charter companies */}
              <div className="bg-white rounded-2xl border border-navy-100 p-8">
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Ship className="w-5 h-5 text-sky-400" />
                  Charter Companies
                </h2>
                <p className="text-navy-400 text-sm">Charter companies based at this marina will be listed here.</p>
              </div>

              {/* Map placeholder */}
              <div className="bg-white rounded-2xl border border-navy-100 p-8">
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-400" />
                  Location
                </h2>
                <div className="aspect-video bg-navy-50 rounded-xl border border-navy-100 flex items-center justify-center">
                  <p className="text-navy-400 text-sm">Interactive map coming soon</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white rounded-2xl border border-navy-100 p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-4">
                  Marina Details
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-navy-400 font-medium">Location</dt>
                    <dd className="text-navy-700">{marina.location || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-navy-400 font-medium">Berths</dt>
                    <dd className="text-navy-700">{marina.berths || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-navy-400 font-medium">Max Draft</dt>
                    <dd className="text-navy-700">{marina.max_draft || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-navy-400 font-medium">VHF Channel</dt>
                    <dd className="text-navy-700">{marina.vhf_channel || "—"}</dd>
                  </div>
                </dl>

                {marina.website && (
                  <div className="mt-6 pt-4 border-t border-navy-100">
                    <a
                      href={marina.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
                    >
                      Visit Marina Website
                    </a>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
