import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Ship,
  GraduationCap,
  BadgeDollarSign,
  Anchor,
  ShoppingBag,
  Globe,
  Check,
} from "lucide-react";
import { PartnerSubmissionForm } from "@/components/PartnerSubmissionForm";
import { categoryConfigs, partnerCategories } from "@/data/partner-categories";
import type { PartnerCategory } from "@/data/partner-pricing";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship,
  GraduationCap,
  BadgeDollarSign,
  Anchor,
  ShoppingBag,
  Globe,
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return partnerCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!partnerCategories.includes(category as PartnerCategory)) {
    return { title: "Not Found" };
  }
  const config = categoryConfigs[category as PartnerCategory];
  return {
    title: `${config.name} — Partner with Sail Marker`,
    description: config.description.slice(0, 160),
    alternates: { canonical: `https://www.sailmarker.com/partner/${category}` },
  };
}

export default async function PartnerCategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!partnerCategories.includes(category as PartnerCategory)) {
    notFound();
  }

  const cat = category as PartnerCategory;
  const config = categoryConfigs[cat];
  const Icon = iconMap[config.icon];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-navy-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            {Icon && <Icon className="w-10 h-10 text-sky-300 mx-auto mb-4" />}
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {config.name}
            </h1>
            <p className="mt-2 text-2xl font-bold text-sky-300">
              {config.price}
            </p>
            <p className="mt-4 text-lg text-sky-300/80 max-w-2xl mx-auto leading-relaxed">
              {config.tagline}
            </p>
          </div>
        </section>

        {/* Details */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
                What&apos;s included
              </h2>
              <ul className="space-y-3">
                {config.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <span className="text-navy-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
                About this partnership
              </h2>
              <p className="text-navy-600 leading-relaxed mb-6">
                {config.description}
              </p>
              <h3 className="font-display text-lg font-bold text-navy-900 mb-2">
                Ideal for
              </h3>
              <p className="text-sm text-navy-500 leading-relaxed">
                {config.idealFor}
              </p>
            </div>
          </div>
        </section>

        {/* Enquiry form */}
        <section
          id="enquiry-form"
          className="bg-white border-t border-navy-100"
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <PartnerSubmissionForm category={cat} />
          </div>
        </section>

        {/* Back to hub */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Link
            href="/partner/"
            className="text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors"
          >
            &larr; All partnership types
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
