import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Ship, Check, Star, Crown } from "lucide-react";
import { CharterPartnersTiers } from "./CharterPartnersTiers";

export const metadata: Metadata = {
  title: "Charter Partners",
  description:
    "Partner with Sail Marker. Three tiers for charter companies and flotilla operators — from free listings to premium placement.",
  alternates: { canonical: "https://www.sailmarker.com/charter-partners" },
};

export default function CharterPartnersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <Ship className="w-10 h-10 text-sky-300 mx-auto mb-4" />
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Charter Partners
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl mx-auto leading-relaxed">
              Reach sailors planning their next charter. Three partnership tiers for charter companies and flotilla operators.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Suspense fallback={null}>
            <CharterPartnersTiers />
          </Suspense>
        </section>

        {/* CTA */}
        <section className="bg-white border-t border-navy-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              Not sure which tier is right?
            </h2>
            <p className="text-navy-600 mb-6 leading-relaxed">
              Get in touch and we&apos;ll help you find the right partnership level for your charter company.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-700 text-white font-medium rounded-lg hover:bg-navy-800 transition-colors"
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
