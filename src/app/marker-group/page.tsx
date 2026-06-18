import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "The Marker Group — A family of travel discovery brands",
  description:
    "Mountain Marker, Links Marker, Match Marker, Sail Marker — curated travel discovery brands by the Marker Group. Each focused on one specific way to explore the world.",
  openGraph: {
    title: "The Marker Group — A family of travel discovery brands",
    description:
      "Mountain Marker, Links Marker, Match Marker, Sail Marker — curated travel discovery brands by the Marker Group.",
    url: "https://www.sailmarker.com/marker-group",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://www.sailmarker.com/marker-group",
  },
};

const CURRENT_PROPERTY = "sail-marker";

const properties = [
  {
    id: "mountain-marker",
    name: "Mountain Marker",
    tagline: "The world's ski resorts, mapped.",
    url: "https://mountainmarker.com",
    logo: "/images/branding/marker-group/mountain-marker-icon.png",
    accent: "#2D5F3F",
    status: "live" as const,
  },
  {
    id: "links-marker",
    name: "Links Marker",
    tagline: "The world's golf courses, mapped.",
    url: "https://thelinksmarker.com",
    logo: "/images/branding/marker-group/links-marker-icon.png",
    accent: "#1B5E20",
    status: "live" as const,
  },
  {
    id: "match-marker",
    name: "Match Marker",
    tagline: "The world's sports events and venues, mapped.",
    url: "https://www.thematchmarker.com",
    logo: "/images/branding/marker-group/match-marker-icon.png",
    accent: "#0B1D3A",
    status: "live" as const,
  },
  {
    id: "sail-marker",
    name: "Sail Marker",
    tagline: "The world's sailing destinations, mapped.",
    url: "https://www.sailmarker.com",
    logo: "/images/branding/marker-group/sail-marker-icon.png",
    accent: "#0F3D5C",
    status: "live" as const,
  },
];

const pillars = [
  {
    title: "Curated, not exhaustive",
    description:
      "Each Marker property covers the destinations and venues worth travelling for, not every possibility.",
  },
  {
    title: "Editorial first",
    description:
      "Substantial original writing on each destination, not thin SEO content.",
  },
  {
    title: "Design-led",
    description:
      "A consistent visual language across the family, treating travel discovery as something that deserves care.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Marker Group",
  url: "https://www.sailmarker.com/marker-group",
  description:
    "A family of curated travel discovery brands, each focused on one specific way to explore the world.",
  subOrganization: properties
    .filter((p) => p.status === "live")
    .map((p) => ({
      "@type": "Organization",
      name: p.name,
      url: p.url,
    })),
};

export default function MarkerGroupPage() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero */}
        <section className="relative bg-navy-900 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              The Marker Group
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-navy-200 max-w-2xl mx-auto leading-relaxed">
              A family of travel discovery brands, each obsessed with one way to
              explore the world.
            </p>
            <p className="mt-4 text-sm font-medium tracking-widest uppercase text-sky-300">
              Curated. Considered. Connected.
            </p>
          </div>
        </section>

        {/* Properties grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 text-center mb-12">
            Our brands
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => {
              const isCurrent = property.id === CURRENT_PROPERTY;
              const isComingSoon = property.status === "coming";

              return (
                <div
                  key={property.id}
                  className={`relative rounded-2xl p-6 transition-all ${
                    isCurrent
                      ? "bg-navy-900 text-white ring-2 ring-sky-300 shadow-lg"
                      : isComingSoon
                      ? "bg-sail-100 text-navy-400 border border-sail-300"
                      : "bg-white text-navy-900 border border-navy-100 hover:shadow-md hover:border-navy-200"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute top-4 right-4 text-[10px] font-semibold tracking-wider uppercase bg-sky-300 text-navy-900 px-2.5 py-1 rounded-full">
                      You&apos;re here
                    </span>
                  )}
                  {isComingSoon && property.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-semibold tracking-wider uppercase bg-sail-300 text-navy-600 px-2.5 py-1 rounded-full">
                      {property.badge}
                    </span>
                  )}

                  <div
                    className={`flex items-center justify-center rounded-xl mb-4 ${
                      isCurrent
                        ? "w-16 h-16 bg-white/10 p-2"
                        : "w-14 h-14 sm:w-16 sm:h-16"
                    }`}
                  >
                    <Image
                      src={property.logo}
                      alt={`${property.name} logo`}
                      width={64}
                      height={64}
                      className={`w-full h-full object-contain ${
                        isComingSoon ? "opacity-50" : ""
                      } ${isCurrent ? "brightness-0 invert" : ""}`}
                    />
                  </div>

                  <h3
                    className={`font-display text-xl font-bold mb-2 ${
                      isCurrent
                        ? "text-white"
                        : isComingSoon
                        ? "text-navy-400"
                        : "text-navy-900"
                    }`}
                  >
                    {property.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isCurrent
                        ? "text-navy-200"
                        : isComingSoon
                        ? "text-navy-400"
                        : "text-navy-600"
                    }`}
                  >
                    {property.tagline}
                  </p>

                  {isComingSoon ? (
                    <span className="inline-flex items-center text-sm text-navy-400">
                      Coming soon
                    </span>
                  ) : isCurrent ? (
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-300 hover:text-sky-200 transition-colors"
                    >
                      Home
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={property.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 hover:text-navy-700 transition-colors"
                    >
                      Visit
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Thesis */}
        <section className="bg-white border-y border-navy-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-8">
              Why the Marker Group exists
            </h2>
            <div className="space-y-5 text-navy-700 leading-relaxed">
              <p>
                We started with Mountain Marker because there wasn&apos;t a single
                place to find the world&apos;s best ski resorts — properly curated,
                properly described. Then we built Links Marker for golf, Match
                Marker for sports events, Sail Marker for charter destinations.
                Each one solves the same fundamental problem — discovering and
                planning a specific kind of travel — for a specific kind of
                traveller.
              </p>
              <p>
                The Marker family shares a design system, an editorial philosophy,
                and a commitment to quality content over quantity. Each property is
                built on the same foundations: original research, real photography,
                factual content, and a deliberate choice not to cover everything —
                only the destinations and venues worth travelling for.
              </p>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 text-center mb-12">
            What unites the family
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="text-center">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What's next */}
        <section className="bg-navy-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-6">
              What&apos;s next
            </h2>
            <p className="text-navy-200 leading-relaxed mb-10">
              We&apos;re exploring further verticals across outdoor and travel
              discovery — each focused on one specific way to explore the world.
            </p>
          </div>
        </section>

        {/* Press & partnerships + Founder */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              Press &amp; partnerships
            </h2>
            <p className="text-navy-600 leading-relaxed">
              For partnerships, press, or collaboration enquiries, reach us at{" "}
              <a
                href="mailto:hello@sailmarker.com"
                className="text-navy-900 underline hover:text-sky-500 transition-colors"
              >
                hello@sailmarker.com
              </a>
            </p>
          </div>
          <div className="border-t border-sail-300 pt-10">
            <p className="text-sm text-navy-500 leading-relaxed">
              The Marker Group is built and operated by Aaron Mills, a
              London-based product builder with a focus on travel and discovery.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
