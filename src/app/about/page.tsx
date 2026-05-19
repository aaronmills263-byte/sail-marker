import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Compass, BookOpen, Anchor, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Sail Marker",
  description:
    "Sail Marker is a curated charter sailing discovery platform — part of the Marker Group. Editorial-first coverage of the world's finest cruising grounds.",
  alternates: { canonical: "https://www.sailmarker.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              About Sail Marker
            </h1>
            <p className="mt-4 text-lg text-sky-300 leading-relaxed">
              Charter destinations, mapped. The world&apos;s finest cruising grounds, curated for sailors who value the journey.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="space-y-6 text-navy-600 leading-relaxed">
            <p className="text-lg">
              Sail Marker exists because there wasn&apos;t a single place to discover the world&apos;s charter sailing destinations — properly curated, properly described, with the editorial depth they deserve.
            </p>
            <p>
              We cover cruising grounds across six regions: the Mediterranean, Caribbean, Indian Ocean, Asia Pacific, Atlantic &amp; Northern Europe, and the Americas. Each destination is treated with substantial original writing — not thin SEO content, but genuine editorial that helps sailors plan with confidence.
            </p>
            <p>
              Our guides cover everything from weather windows and anchorage recommendations to provisioning advice and marina facilities. We write with the depth of a travel magazine and the precision of a pilot book.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-sail-100 border-y border-sail-300">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-8">
              Editorial philosophy
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Compass,
                  title: "Curated, not exhaustive",
                  desc: "We cover the destinations worth chartering for — not every marina on earth. Quality over quantity, always.",
                },
                {
                  icon: BookOpen,
                  title: "Editorial first",
                  desc: "Substantial original writing on each destination. Real insight, real detail, written by people who sail.",
                },
                {
                  icon: Anchor,
                  title: "Designed for sailors",
                  desc: "Built for people planning a charter — from first-timers to experienced skippers looking for their next cruising ground.",
                },
                {
                  icon: Globe,
                  title: "Responsible sailing",
                  desc: "We believe in protecting the waters and coastlines that make charter sailing extraordinary.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-navy-100 p-6">
                  <div className="w-10 h-10 rounded-lg bg-navy-700 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-navy-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marker Group connection */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
            Part of the Marker Group
          </h2>
          <p className="text-navy-600 leading-relaxed mb-6">
            Sail Marker is part of the{" "}
            <Link
              href="/marker-group"
              className="text-navy-900 underline hover:text-sky-500 transition-colors"
            >
              Marker Group
            </Link>
            {" "}— a family of curated travel discovery brands including Mountain Marker (ski resorts), Links Marker (golf courses), Match Marker (sports events), and Reef Marker (diving destinations). Each built for enthusiasts who travel for their passions.
          </p>
          <p className="text-navy-600 leading-relaxed">
            The Marker family shares a design system, an editorial philosophy, and a commitment to quality content over quantity. Every property is built on the same foundations: original research, factual content, and a deliberate choice not to cover everything — only what&apos;s worth travelling for.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-navy-700">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-4">
              Get in touch
            </h2>
            <p className="text-sky-300 mb-6 leading-relaxed">
              For partnerships, press enquiries, or just to say hello — we&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-navy-700 font-medium rounded-lg hover:bg-sail-200 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
