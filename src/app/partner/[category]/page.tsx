import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Anchor, Ship, ShoppingBag, Car, Check, Star, Crown, CheckCircle } from "lucide-react";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { PartnerSubmissionForm } from "@/components/PartnerSubmissionForm";
import { partnerPricing, type Currency, type PartnerCategory } from "@/data/partner-pricing";
import { categoryConfigs } from "@/data/partner-categories";

const iconMap = { Anchor, Ship, ShoppingBag, Car } as const;

const validCategories: PartnerCategory[] = ["charter", "marina", "provisioning", "transfers"];

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ currency?: string }>;
}

export async function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!validCategories.includes(category as PartnerCategory)) {
    return { title: "Not Found" };
  }
  const config = categoryConfigs[category as PartnerCategory];
  return {
    title: config.heroTitle,
    description: config.heroSubtitle,
    alternates: { canonical: `https://www.sailmarker.com/partner/${category}` },
  };
}

export default async function PartnerCategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  if (!validCategories.includes(category as PartnerCategory)) {
    notFound();
  }

  const cat = category as PartnerCategory;
  const config = categoryConfigs[cat];
  const pricing = partnerPricing[cat];
  const sp = await searchParams;
  const currency: Currency =
    sp.currency === "USD" || sp.currency === "EUR" ? sp.currency : "GBP";

  const Icon = iconMap[config.icon as keyof typeof iconMap];

  const tiers = [
    {
      ...config.freeTier,
      icon: Ship,
      price: "Free" as const,
      accent: false,
      highlight: false,
    },
    {
      ...config.featuredTier,
      icon: Star,
      price: pricing.featured,
      accent: true,
      highlight: true,
    },
    {
      ...config.premiumTier,
      icon: Crown,
      price: pricing.premium,
      accent: false,
      highlight: false,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <Icon className="w-10 h-10 text-sky-300 mx-auto mb-4" />
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {config.heroTitle}
            </h1>
            <p className="mt-4 text-lg text-sky-300 max-w-2xl mx-auto leading-relaxed">
              {config.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Pricing tiers */}
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

                <tier.icon
                  className={`w-8 h-8 mb-4 ${tier.highlight ? "text-sky-300" : "text-navy-400"}`}
                />
                <h3 className="font-display text-xl font-bold mb-1">{tier.name}</h3>
                <p
                  className={`text-2xl font-bold mb-3 ${
                    tier.highlight ? "text-sky-300" : "text-navy-900"
                  }`}
                >
                  {typeof tier.price === "string" ? tier.price : tier.price[currency]}
                </p>
                <p
                  className={`text-sm mb-6 ${
                    tier.highlight ? "text-navy-200" : "text-navy-500"
                  }`}
                >
                  {tier.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          tier.highlight ? "text-sky-300" : "text-sky-400"
                        }`}
                      />
                      <span className={tier.highlight ? "text-navy-100" : "text-navy-600"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#enquiry-form"
                  className={`block w-full text-center px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                    tier.highlight
                      ? "bg-white text-navy-700 hover:bg-sail-200"
                      : "bg-navy-700 text-white hover:bg-navy-800"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Why list with Sail Marker */}
        <section className="bg-white border-t border-navy-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-8 text-center">
              Why list with Sail Marker
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {config.whyList.map((item) => (
                <div key={item.title}>
                  <CheckCircle className="w-6 h-6 text-sky-400 mb-3" />
                  <h3 className="font-display text-lg font-bold text-navy-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submission form */}
        <section id="enquiry-form" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PartnerSubmissionForm category={cat} />
        </section>

        {/* Back to hub */}
        <section className="bg-white border-t border-navy-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <Link
              href="/partner/"
              className="text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors"
            >
              &larr; All partnership categories
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
