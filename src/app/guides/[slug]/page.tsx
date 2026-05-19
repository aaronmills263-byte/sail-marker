import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { Clock, Calendar, ArrowLeft, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: guide } = await supabase
    .from("editorial_guides")
    .select("title, subtitle, format")
    .eq("slug", slug)
    .single();

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  return {
    title: guide.title,
    description: guide.subtitle || `Sailing guide: ${guide.title}`,
    alternates: { canonical: `https://www.sailmarker.com/guides/${slug}` },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
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
              <span className="text-white">{guide.title}</span>
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {guide.title}
            </h1>
            {guide.subtitle && (
              <p className="mt-4 text-lg text-white/90 max-w-2xl">{guide.subtitle}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-sky-300/70 mt-6">
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
              {guide.author_name && (
                <span>By {guide.author_name}</span>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-navy max-w-none">
            {guide.content_html ? (
              <div dangerouslySetInnerHTML={{ __html: guide.content_html }} />
            ) : guide.content ? (
              <div className="text-navy-600 leading-relaxed whitespace-pre-wrap">{guide.content}</div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-navy-200 rounded-2xl">
                <p className="text-navy-400">Guide content is being prepared by our editorial team.</p>
              </div>
            )}
          </article>

          {/* Tags */}
          {guide.tags && guide.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-navy-100">
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs bg-navy-100 text-navy-600 px-3 py-1.5 rounded-full"
                  >
                    {tag.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div className="mt-10 pt-6 border-t border-navy-100 flex items-center justify-between">
            <div className="text-sm text-navy-500">
              By {guide.author_name || "Sail Marker"} · Sail Marker Editorial
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
      </main>
      <Footer />
    </>
  );
}
