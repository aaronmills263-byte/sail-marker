import Link from "next/link";
import { Clock, Calendar, ArrowLeft, MapPin, Anchor } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TravelGuideTOC } from "./TravelGuideTOC";

interface TravelGuideLayoutProps {
  guide: {
    slug: string;
    title: string;
    subtitle?: string;
    hero_image_url?: string;
    published_at?: string;
    read_time_minutes?: number;
    author_name?: string;
    related_destination_slug?: string;
    related_region?: string;
    category?: string;
  };
  destinationName?: string;
  regionName?: string;
  headings: { id: string; text: string }[];
  relatedGuides?: { slug: string; title: string; category: string; read_time_minutes: number }[];
  children: React.ReactNode;
  jsonLd?: object;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function TravelGuideLayout({
  guide,
  destinationName,
  regionName,
  headings,
  relatedGuides,
  children,
  jsonLd,
}: TravelGuideLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}

        {/* Hero */}
        <section className="relative h-96 bg-navy-700 text-white">
          {guide.hero_image_url && (
            <>
              <img
                src={guide.hero_image_url}
                alt={guide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />
            </>
          )}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-navy-300 mb-4 flex-wrap">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white">Guides</Link>
              {destinationName && guide.related_destination_slug && (
                <>
                  <span>/</span>
                  <Link href={`/destinations/${guide.related_destination_slug}`} className="hover:text-white">
                    {destinationName}
                  </Link>
                </>
              )}
              <span>/</span>
              <span className="text-white">{guide.title}</span>
            </nav>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
              {guide.title}
            </h1>

            {guide.subtitle && (
              <p className="text-lg text-white/90 mb-4 max-w-2xl">{guide.subtitle}</p>
            )}

            {/* Quick stats bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-navy-200">
              {destinationName && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {destinationName}
                </span>
              )}
              {regionName && (
                <span className="flex items-center gap-1.5">
                  <Anchor className="w-3.5 h-3.5" />
                  {regionName}
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-navy-400 mt-3">
              {guide.read_time_minutes && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {guide.read_time_minutes} min read
                </span>
              )}
              {guide.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Updated {formatDate(guide.published_at)}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Content area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Mobile TOC */}
          <div className="lg:hidden mb-8">
            <TravelGuideTOC headings={headings} />
          </div>

          <div className="grid lg:grid-cols-4 gap-10">
            {/* Main content */}
            <article className="lg:col-span-3">
              {children}

              {/* Author + share */}
              <div className="mt-8 pt-6 border-t border-navy-100 flex items-center justify-between flex-wrap gap-4">
                <div className="text-sm text-navy-500">
                  By {guide.author_name || "Sail Marker"} · Sail Marker Editorial
                </div>
              </div>

              {/* Related guides */}
              {relatedGuides && relatedGuides.length > 0 && (
                <div className="mt-10 pt-8 border-t border-navy-100">
                  <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                    Continue reading
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {relatedGuides.map((rg) => (
                      <Link
                        key={rg.slug}
                        href={`/guides/${rg.slug}`}
                        className="bg-white rounded-xl border border-navy-100 p-5 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-display text-sm font-semibold text-navy-900 mb-1 line-clamp-2">
                          {rg.title}
                        </h3>
                        <p className="text-xs text-navy-500">{rg.read_time_minutes} min read</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-6 lg:sticky lg:top-24 lg:self-start">
              <TravelGuideTOC headings={headings} />

              {guide.related_destination_slug && (
                <div className="bg-navy-700 rounded-xl p-5 text-center">
                  <h3 className="font-display font-semibold text-white mb-2 text-sm">
                    Explore this destination
                  </h3>
                  <Link
                    href={`/destinations/${guide.related_destination_slug}`}
                    className="inline-flex items-center gap-2 bg-sky-300 text-navy-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-sky-200 transition-colors mt-2"
                  >
                    View destination
                  </Link>
                </div>
              )}

              <Link
                href="/guides"
                className="flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All guides
              </Link>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
