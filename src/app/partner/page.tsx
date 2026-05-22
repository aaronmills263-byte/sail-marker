import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Anchor, Ship, ShoppingBag, Car } from "lucide-react";
import { hubPricing, type PartnerCategory } from "@/data/partner-pricing";
import { categoryConfigs } from "@/data/partner-categories";

export const metadata: Metadata = {
  title: "Partner with Sail Marker",
  description:
    "The marketplace for charter-adjacent businesses. List your charter company, marina, provisioning service, or transfer operation with Sail Marker.",
  alternates: { canonical: "https://www.sailmarker.com/partner" },
};

const iconMap = {
  Anchor,
  Ship,
  ShoppingBag,
  Car,
} as const;

const categories: PartnerCategory[] = ["charter", "marina", "provisioning", "transfers"];

export default function PartnerHubPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Partner with Sail Marker
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl mx-auto leading-relaxed">
              The marketplace for charter-adjacent businesses. Reach sailors actively planning their next trip.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const config = categoryConfigs[cat];
              const Icon = iconMap[config.icon as keyof typeof iconMap];
              return (
                <Link
                  key={cat}
                  href={`/partner/${cat}/`}
                  className="group block bg-white rounded-2xl border border-navy-100 p-8 hover:border-navy-300 hover:shadow-md transition-all"
                >
                  <Icon className="w-8 h-8 text-sky-400 mb-4" />
                  <h2 className="font-display text-xl font-bold text-navy-900 mb-1 group-hover:text-navy-700">
                    {config.name}
                  </h2>
                  <p className="text-sm text-navy-500 mb-4 leading-relaxed">
                    {config.hubDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-navy-700">
                      {hubPricing[cat]}
                    </span>
                    <span className="text-sm font-medium text-sky-600 group-hover:text-sky-700">
                      Learn more &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-white border-t border-navy-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              Not sure where to start?
            </h2>
            <p className="text-navy-600 mb-6 leading-relaxed">
              Get in touch and we&apos;ll help you find the right partnership for your business.
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
