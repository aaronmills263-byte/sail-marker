"use client";

import { Shield, ExternalLink } from "lucide-react";

export function InsuranceWidget() {
  const worldNomadsUrl =
    "https://www.anrdoezrs.net/click-7583155-15736546?url=https%3A%2F%2Fwww.worldnomads.com%2Ftravel-insurance";

  function handleClick() {
    fetch("/api/affiliate-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partner: "World Nomads",
        click_url: worldNomadsUrl,
      }),
    }).catch(() => {});
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-navy-900 mb-1 flex items-center gap-2">
        <Shield className="w-4 h-4 text-ochre-400" />
        Travel insurance
      </h3>
      <p className="text-xs text-navy-400 mb-3">
        Trip cancellation, medical emergencies, lost luggage, and travel delays
        — covered in one policy.
      </p>
      <a
        href={worldNomadsUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-navy-900 text-white text-sm font-medium hover:bg-navy-800 transition-colors"
      >
        Get a quote from World Nomads
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
      <p className="text-[10px] text-navy-400 mt-3 leading-relaxed">
        World Nomads provides travel insurance for travellers. Cover is
        underwritten by certain underwriters at Lloyd&apos;s. World Nomads
        Limited is authorised and regulated by the Financial Conduct Authority.
      </p>
    </div>
  );
}
