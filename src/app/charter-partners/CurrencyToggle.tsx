"use client";

import { useSearchParams, useRouter } from "next/navigation";

const currencies = ["GBP", "USD", "EUR"] as const;

export function CurrencyToggle() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = (searchParams.get("currency") as (typeof currencies)[number]) || "GBP";

  function setCurrency(c: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("currency", c);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-sm font-medium text-navy-600">Currency:</span>
      <div className="inline-flex rounded-full border border-navy-200 overflow-hidden">
        {currencies.map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors ${
              active === c
                ? "bg-navy-700 text-white"
                : "bg-white text-navy-700 hover:bg-navy-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
