import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Ship,
  GraduationCap,
  BadgeDollarSign,
  Anchor,
  ShoppingBag,
  Globe,
  ArrowRight,
} from "lucide-react";
import { categoryConfigs, partnerCategories } from "@/data/partner-categories";
import type { PartnerCategory } from "@/data/partner-pricing";

export const metadata: Metadata = {
  title: "Partner with Sail Marker",
  description:
    "Six partnership tiers for charter companies, sailing schools, yacht brokers, marinas, provisioning services, and regional sponsors. Reach sailors planning their next trip.",
  alternates: { canonical: "https://www.sailmarker.com/partner" },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship,
  GraduationCap,
  BadgeDollarSign,
  Anchor,
  ShoppingBag,
  Globe,
};

export default function PartnerHubPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Partner with Sail Marker
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl mx-auto leading-relaxed">
              Reach sailors actively planning their next charter. Six
              partnership tiers — from destination-level services to
              region-wide sponsorship.
            </p>
          </div>
        </section>

        {/* Tiers grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerCategories.map((cat: PartnerCategory) => {
              const config = categoryConfigs[cat];
              const Icon = iconMap[config.icon];
              const isHighlight = cat === "charter";
              return (
                <div
                  key={cat}
                  className={`relative rounded-2xl p-8 transition-all ${
                    isHighlight
                      ? "bg-navy-700 text-white ring-2 ring-sky-300 shadow-lg"
                      : "bg-white text-navy-900 border border-navy-100 hover:border-navy-300 hover:shadow-md"
                  }`}
                >
                  {isHighlight && (
                    <span className="absolute top-4 right-4 text-[10px] font-semibold tracking-wider uppercase bg-sky-300 text-navy-900 px-2.5 py-1 rounded-full">
                      Highest ROI
                    </span>
                  )}
                  {Icon && (
                    <Icon
                      className={`w-8 h-8 mb-4 ${isHighlight ? "text-sky-300" : "text-sky-400"}`}
                    />
                  )}
                  <h2 className="font-display text-xl font-bold mb-1">
                    {config.name}
                  </h2>
                  <p
                    className={`text-2xl font-bold mb-3 ${
                      isHighlight ? "text-sky-300" : "text-navy-900"
                    }`}
                  >
                    {config.price}
                  </p>
                  <p
                    className={`text-sm mb-6 leading-relaxed ${
                      isHighlight ? "text-navy-200" : "text-navy-500"
                    }`}
                  >
                    {config.tagline}
                  </p>
                  <p
                    className={`text-xs mb-6 ${
                      isHighlight ? "text-navy-300" : "text-navy-400"
                    }`}
                  >
                    {config.idealFor}
                  </p>
                  <Link
                    href={`/partner/${cat}`}
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                      isHighlight
                        ? "text-sky-300 hover:text-white"
                        : "text-sky-600 hover:text-sky-700"
                    }`}
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white border-t border-navy-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              Not sure which tier is right?
            </h2>
            <p className="text-navy-600 mb-6 leading-relaxed">
              Get in touch and we&apos;ll help you find the right partnership
              for your business.
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
