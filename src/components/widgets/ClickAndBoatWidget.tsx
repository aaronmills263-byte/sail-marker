"use client";

import { ExternalLink } from "lucide-react";

interface Props {
  destinationSlug?: string;
  className?: string;
}

export function ClickAndBoatWidget({ destinationSlug, className = "" }: Props) {
  const href = "#"; // Placeholder until Awin approval

  return (
    <div className={`rounded-xl border border-navy-100 bg-white p-5 ${className}`}>
      <h3 className="font-display text-lg font-bold text-navy-900 mb-2">
        Charter a yacht
      </h3>
      <p className="text-sm text-navy-600 mb-4">
        Browse bareboat and skippered charters via Click&Boat.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
      >
        Search charters
        <ExternalLink className="w-4 h-4" />
      </a>
      <p className="text-[10px] text-navy-400 mt-3">
        Affiliate link. We may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
