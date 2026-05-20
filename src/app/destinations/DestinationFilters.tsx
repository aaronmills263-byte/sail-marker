"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

const regionOptions = [
  { value: "", label: "All Regions" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "caribbean", label: "Caribbean" },
  { value: "indian_ocean", label: "Indian Ocean" },
  { value: "asia_pacific", label: "Asia Pacific" },
  { value: "atlantic_north_europe", label: "Atlantic & Northern Europe" },
  { value: "americas", label: "Americas" },
];

const seasonOptions = [
  { value: "", label: "Any Season" },
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "autumn", label: "Autumn" },
  { value: "winter", label: "Winter" },
];

const budgetOptions = [
  { value: "", label: "Any Budget" },
  { value: "budget", label: "Budget-Friendly" },
  { value: "mid_range", label: "Mid-Range" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Ultra-Premium" },
];

export function DestinationFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const qs = params.toString();
    router.push(qs ? `/destinations?${qs}` : "/destinations");
  }

  const selectClass =
    "text-sm border border-navy-200 rounded-lg px-3 py-2 text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300";

  return (
    <section className="border-b border-navy-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-navy-400" />
          <select
            value={searchParams.get("region") || ""}
            onChange={(e) => handleChange("region", e.target.value)}
            className={selectClass}
          >
            {regionOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            value={searchParams.get("season") || ""}
            onChange={(e) => handleChange("season", e.target.value)}
            className={selectClass}
          >
            {seasonOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            value={searchParams.get("budget") || ""}
            onChange={(e) => handleChange("budget", e.target.value)}
            className={selectClass}
          >
            {budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
