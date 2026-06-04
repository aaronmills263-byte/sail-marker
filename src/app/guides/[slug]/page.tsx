import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GuideContentRenderer } from "@/components/guides/GuideContentRenderer";
import { supabase } from "@/lib/supabase";
import { Clock, Calendar, ArrowLeft, BookOpen, MapPin } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: guides } = await supabase
    .from("editorial_guides")
    .select("slug")
    .eq("is_published", true);
  return (guides ?? []).map((g) => ({ slug: g.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, string> = {
  "decision-guides": "Decision Guide",
  "practical-guides": "Practical Guide",
  "seasonal-guides": "Seasonal Guide",
  "technical-guides": "Technical Guide",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: guide } = await supabase
    .from("editorial_guides")
    .select("title, subtitle, meta_description")
    .eq("slug", slug)
    .single();

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  return {
    title: guide.title,
    description: guide.meta_description || guide.subtitle || `Sailing guide: ${guide.title}`,
    alternates: { canonical: `https://www.sailmarker.com/guides/${slug}` },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: guide } = await supabase
    .from("editorial_guides")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!guide) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <section className="bg-navy-700">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
              <h1 className="font-display text-4xl font-bold text-white tracking-tight">
                Guide Not Found
              </h1>
              <p className="mt-4 text-sky-300">
                This guide may have been moved or is still being written.
              </p>
            </div>
          </section>

          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-12 border-2 border-dashed border-navy-200 rounded-2xl bg-white">
              <BookOpen className="w-12 h-12 text-navy-300 mx-auto mb-4" />
              <p className="text-navy-500 text-lg font-medium">
                This guide is not yet available.
              </p>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Guides
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // Fetch related guides in the same category
  const { data: relatedGuides } = await supabase
    .from("editorial_guides")
    .select("slug, title, subtitle, read_time_minutes, hero_image_url")
    .eq("category", guide.category)
    .eq("is_published", true)
    .neq("slug", slug)
    .limit(3);

  // Fetch related destination if set
  let relatedDestination: { slug: string; name: string } | null = null;
  if (guide.related_destination_slug) {
    const { data } = await supabase
      .from("charter_destinations")
      .select("slug, name")
      .eq("slug", guide.related_destination_slug)
      .single();
    relatedDestination = data;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-navy-700 overflow-hidden">
          {guide.hero_image_url && (
            <>
              <img
                src={guide.hero_image_url}
                alt={guide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/40 to-transparent" />
            </>
          )}
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <nav className="flex items-center gap-1.5 text-sm text-sky-300/70 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
              <span>/</span>
              <span className="text-white/80 truncate max-w-[200px] sm:max-w-none">{guide.title}</span>
            </nav>

            {guide.category && (
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-300 bg-white/10 px-3 py-1 rounded-full mb-4">
                {categoryLabels[guide.category] || guide.category}
              </span>
            )}

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-4xl">
              {guide.title}
            </h1>
            {guide.subtitle && (
              <p className="mt-4 text-lg text-white/90 max-w-2xl leading-relaxed">{guide.subtitle}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-sky-300/70 mt-6">
              <span>By the Sail Marker Editorial Team</span>
              {guide.read_time_minutes && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {guide.read_time_minutes} min read
                </span>
              )}
              {guide.published_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(guide.published_at)}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <article>
            {guide.content_md ? (
              <GuideContentRenderer contentMd={guide.content_md} />
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-navy-200 rounded-2xl">
                <p className="text-navy-400">Guide content is being prepared by our editorial team.</p>
              </div>
            )}
          </article>

          {/* Related destination */}
          {relatedDestination && (
            <div className="mt-12 pt-6 border-t border-navy-100">
              <Link
                href={`/destinations/${relatedDestination.slug}`}
                className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-navy-800 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                Explore {relatedDestination.name} as a charter destination
              </Link>
            </div>
          )}

          {/* Footer nav */}
          <div className="mt-10 pt-6 border-t border-navy-100 flex items-center justify-between">
            <div className="text-sm text-navy-500">
              By the Sail Marker Editorial Team
            </div>
            <Link
              href="/guides"
              className="flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All guides
            </Link>
          </div>
        </section>

        {/* More in this category */}
        {relatedGuides && relatedGuides.length > 0 && (
          <section className="bg-navy-50 border-t border-navy-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              <h2 className="font-display text-xl font-bold text-navy-900 mb-6">
                More in {categoryLabels[guide.category] || guide.category}s
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedGuides.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/guides/${related.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {related.hero_image_url && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={related.hero_image_url}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-display text-sm font-bold text-navy-900 leading-snug group-hover:text-navy-700 transition-colors">
                        {related.title}
                      </h3>
                      {related.read_time_minutes && (
                        <p className="mt-2 text-xs text-navy-400">{related.read_time_minutes} min read</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
