import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Ship, Check, Star, Crown } from "lucide-react";
import { CurrencyToggle } from "./CurrencyToggle";

type Currency = "GBP" | "USD" | "EUR";

export const metadata: Metadata = {
  title: "Charter Partners",
  description:
    "Partner with Sail Marker. Three tiers for charter companies and flotilla operators — from free listings to premium placement.",
  alternates: { canonical: "https://www.sailmarker.com/charter-partners" },
};

const tiers = [
  {
    name: "Free Listing",
    icon: Ship,
    price: "Free",
    description: "Basic directory presence for charter companies.",
    features: [
      "Company name and description",
      "Link to your website",
      "Listed on destination pages",
      "Logo displayed",
    ],
    cta: "Get Listed",
    accent: false,
    highlight: false,
  },
  {
    name: "Featured Partner",
    icon: Star,
    price: {
      GBP: "From £99/mo",
      USD: "From $149/mo",
      EUR: "From €119/mo",
    },
    description: "Enhanced visibility across Sail Marker.",
    features: [
      "Everything in Free Listing",
      "Priority placement on destination pages",
      "Featured in regional guides",
      "Fleet showcase with photos",
      "Direct booking link",
      "Monthly analytics report",
    ],
    cta: "Become a Featured Partner",
    accent: true,
    highlight: true,
  },
  {
    name: "Premium Partner",
    icon: Crown,
    price: {
      GBP: "From £299/mo",
      USD: "From $399/mo",
      EUR: "From €349/mo",
    },
    description: "Maximum exposure and editorial integration.",
    features: [
      "Everything in Featured Partner",
      "Top placement across all pages",
      "Dedicated company profile page",
      "Featured in editorial guides",
      "Social media promotion",
      "Custom landing page",
      "Dedicated account manager",
      "Quarterly performance review",
    ],
    cta: "Contact for Premium",
    accent: false,
    highlight: false,
  },
];

export default async function CharterPartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ currency?: string }>;
}) {
  const params = await searchParams;
  const currency: Currency =
    params.currency === "USD" || params.currency === "EUR"
      ? params.currency
      : "GBP";
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
            <CurrencyToggle />
          </Suspense>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 ${
                  tier.highlight
                    ? "bg-navy-700 text-white ring-2 ring-sky-300 shadow-lg relative"
                    : "bg-white text-navy-900 border border-navy-100"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute top-4 right-4 text-[10px] font-semibold tracking-wider uppercase bg-sky-300 text-navy-900 px-2.5 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <tier.icon className={`w-8 h-8 mb-4 ${tier.highlight ? "text-sky-300" : "text-navy-400"}`} />
                <h3 className="font-display text-xl font-bold mb-1">{tier.name}</h3>
                <p className={`text-2xl font-bold mb-3 ${tier.highlight ? "text-sky-300" : "text-navy-900"}`}>
                  {typeof tier.price === "string" ? tier.price : tier.price[currency]}
                </p>
                <p className={`text-sm mb-6 ${tier.highlight ? "text-navy-200" : "text-navy-500"}`}>
                  {tier.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlight ? "text-sky-300" : "text-sky-400"}`} />
                      <span className={tier.highlight ? "text-navy-100" : "text-navy-600"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block w-full text-center px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                    tier.highlight
                      ? "bg-white text-navy-700 hover:bg-sail-200"
                      : "bg-navy-700 text-white hover:bg-navy-800"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
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
