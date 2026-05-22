"use client";

import { Plane, Shield, Car, ShoppingBag, ExternalLink } from "lucide-react";

interface PlanThisTripProps {
  nearestAirport: string;
  nearestAirportCode: string;
  destinationSlug: string;
  destinationName: string;
  primaryMarina?: string;
}

function trackClick(partner: string, destinationSlug: string) {
  fetch("/api/affiliate-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      partner,
      destination_slug: destinationSlug,
    }),
  }).catch(() => {});
}

export function PlanThisTrip({
  nearestAirport,
  nearestAirportCode,
  destinationSlug,
  destinationName,
  primaryMarina,
}: PlanThisTripProps) {
  const expediaFlightUrl = nearestAirportCode
    ? `https://www.tkqlhce.com/click-10581071-10378845?url=https%3A%2F%2Fwww.expedia.com%2FFlights-search%2F%3Fleg1%3Dfrom%3Aanywhere%2Cto%3A${encodeURIComponent(nearestAirportCode)}%2Cdeparture%3Aanytime`
    : `https://www.tkqlhce.com/click-10581071-10378845?url=https%3A%2F%2Fwww.expedia.com%2FFlights`;

  const worldNomadsUrl =
    "https://www.anrdoezrs.net/click-10581071-15736546?url=https%3A%2F%2Fwww.worldnomads.com%2Ftravel-insurance";

  const marinaLabel = primaryMarina || destinationName;

  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-8">
      <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">
        Plan this trip
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Flights - affiliate */}
        <div className="rounded-lg border border-navy-100 bg-white p-6">
          <h3 className="font-display text-lg font-bold text-navy-700 mb-1 flex items-center gap-2">
            <Plane className="w-5 h-5 text-navy-400" />
            Compare flights{nearestAirport ? ` to ${nearestAirport}` : ""}
          </h3>
          <p className="text-sm text-navy-500 mb-4">
            {nearestAirportCode
              ? `We've found flights to ${nearestAirportCode} via Expedia.`
              : "Search flights to your charter destination via Expedia."}
          </p>
          <a
            href={expediaFlightUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("Expedia Flights", destinationSlug)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
          >
            Search flights
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Insurance - affiliate */}
        <div className="rounded-lg border border-navy-100 bg-white p-6">
          <h3 className="font-display text-lg font-bold text-navy-700 mb-1 flex items-center gap-2">
            <Shield className="w-5 h-5 text-navy-400" />
            Charter insurance
          </h3>
          <p className="text-sm text-navy-500 mb-4">
            Cover for medical, gear, and trip cancellation — chartered yachts not included, see policy detail.
          </p>
          <a
            href={worldNomadsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("World Nomads", destinationSlug)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
          >
            Get a quote
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <p className="text-[10px] text-navy-400 mt-3 leading-relaxed">
            Sail Marker is not authorised by the FCA. World Nomads insurance is provided by World Nomads Group, which is authorised and regulated by the Financial Conduct Authority in jurisdictions where it operates.
          </p>
        </div>

        {/* Transfers - partnership marketplace (empty state) */}
        <div className="rounded-lg border border-navy-200 bg-sail-50 p-6">
          <h3 className="font-display text-lg font-bold text-navy-700 mb-1 flex items-center gap-2">
            <Car className="w-5 h-5 text-navy-400" />
            Transfers{nearestAirport ? ` to ${nearestAirport}` : ""}
          </h3>
          <p className="text-sm text-navy-500 mb-4">
            Are you a transfer operator{nearestAirport ? ` at ${nearestAirport}` : ""}? List your business with Sail Marker — be discoverable to every charter customer planning a trip here.
          </p>
          <a
            href="/partner/transfers/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
          >
            Partner with us
          </a>
        </div>

        {/* Provisioning - partnership marketplace (empty state) */}
        <div className="rounded-lg border border-navy-200 bg-sail-50 p-6">
          <h3 className="font-display text-lg font-bold text-navy-700 mb-1 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-navy-400" />
            Provisioning at {marinaLabel}
          </h3>
          <p className="text-sm text-navy-500 mb-4">
            Local supplier? Welcome packs, fresh provisions, alcohol delivery — be the trusted name at {marinaLabel}.
          </p>
          <a
            href="/partner/provisioning/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
          >
            Become a partner
          </a>
        </div>
      </div>
    </div>
  );
}
