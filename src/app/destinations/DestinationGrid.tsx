"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { CharterDestination } from "@/types";

const regionLabels: Record<string, string> = {
  mediterranean: "Mediterranean",
  caribbean: "Caribbean",
  indian_ocean: "Indian Ocean",
  asia_pacific: "Asia Pacific",
  atlantic_north_europe: "Atlantic & Northern Europe",
  americas: "Americas",
};

const priceTierLabels: Record<string, string> = {
  budget: "Budget-Friendly",
  mid_range: "Mid-Range",
  premium: "Premium",
  luxury: "Ultra-Premium",
};

const seasonMonths: Record<string, string[]> = {
  spring: ["March", "April", "May", "Mar", "Apr", "May"],
  summer: ["June", "July", "August", "Jun", "Jul", "Aug"],
  autumn: ["September", "October", "November", "Sep", "Oct", "Nov"],
  winter: ["December", "January", "February", "Dec", "Jan", "Feb"],
};

export function DestinationGrid({ destinations }: { destinations: CharterDestination[] }) {
  const searchParams = useSearchParams();
  const regionFilter = searchParams.get("region") || "";
  const seasonFilter = searchParams.get("season") || "";
  const budgetFilter = searchParams.get("budget") || "";

  let filtered = destinations;

  if (regionFilter) {
    filtered = filtered.filter((d) => d.region === regionFilter);
  }
  if (budgetFilter) {
    filtered = filtered.filter((d) => d.price_tier === budgetFilter);
  }
  if (seasonFilter && seasonMonths[seasonFilter]) {
    const months = seasonMonths[seasonFilter];
    filtered = filtered.filter((d) =>
      d.best_months?.some((m) => months.includes(m))
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-sm text-navy-400 mb-6">
        {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((d) => (
          <Link
            key={d.slug}
            href={`/destinations/${d.slug}`}
            className="group rounded-2xl border border-navy-100 bg-white overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[16/10] bg-navy-100">
              {d.hero_image_url ? (
                <Image
                  src={d.hero_image_url}
                  alt={d.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-navy-300" />
                </div>
              )}
              {d.price_tier && (
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-navy-700 rounded-full">
                  {priceTierLabels[d.price_tier] || d.price_tier}
                </span>
              )}
            </div>
            <div className="p-5">
              <h2 className="font-display text-lg font-bold text-navy-900 group-hover:text-sky-600 transition-colors">
                {d.name}
              </h2>
              <p className="mt-1 text-sm text-navy-500 flex items-center gap-1.5">
                {d.flag_emoji && <span>{d.flag_emoji}</span>}
                {d.country}
                {d.region && (
                  <>
                    <span className="text-navy-300">&middot;</span>
                    {regionLabels[d.region] || d.region}
                  </>
                )}
              </p>
              {d.description && (
                <p className="mt-2 text-sm text-navy-600 line-clamp-2">
                  {d.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-navy-500 text-lg">
            No destinations match your filters.
          </p>
          <Link
            href="/destinations"
            className="text-sky-600 text-sm mt-2 inline-block hover:underline"
          >
            Clear filters
          </Link>
        </div>
      )}
    </section>
  );
}
