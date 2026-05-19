"use client";

import { useState } from "react";
import { Hotel, ExternalLink } from "lucide-react";

interface AccommodationWidgetProps {
  city: string;
  country: string;
  checkin?: string;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function AccommodationWidget({
  city,
  country,
  checkin,
}: AccommodationWidgetProps) {
  const [destination, setDestination] = useState(`${city}, ${country}`);
  const [checkinDate, setCheckinDate] = useState(checkin || "");
  const [checkoutDate, setCheckoutDate] = useState(
    checkin ? addDays(checkin, 1) : ""
  );
  const [guests, setGuests] = useState("2");

  function trackAndOpen(partner: string, url: string) {
    fetch("/api/affiliate-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partner, click_url: url }),
    }).catch(() => {});

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleExpedia(e: React.FormEvent) {
    e.preventDefault();
    const url = `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(
      destination
    )}&startDate=${checkinDate}&endDate=${checkoutDate}&rooms=1&adults=${guests}`;
    trackAndOpen("Expedia", url);
  }

  function handleVrbo() {
    const url = `https://www.vrbo.com/search?adults=${guests}&destination=${encodeURIComponent(
      destination
    )}&startDate=${checkinDate}&endDate=${checkoutDate}`;
    trackAndOpen("Vrbo", url);
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-navy-900 mb-1 flex items-center gap-2">
        <Hotel className="w-4 h-4 text-ochre-400" />
        Stay in {city}
      </h3>
      <p className="text-xs text-navy-400 mb-3">
        Hotels and apartments near your charter base.
      </p>

      <form onSubmit={handleExpedia} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="City or area..."
              className="w-full px-3 py-2.5 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Check-in
            </label>
            <input
              type="date"
              value={checkinDate}
              onChange={(e) => {
                setCheckinDate(e.target.value);
                if (e.target.value && (!checkoutDate || checkoutDate <= e.target.value)) {
                  setCheckoutDate(addDays(e.target.value, 1));
                }
              }}
              className="w-full px-3 py-2.5 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Check-out
            </label>
            <input
              type="date"
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-navy-900 text-white text-sm font-medium hover:bg-navy-800 transition-colors"
          >
            Search Expedia
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleVrbo}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-navy-200 text-navy-700 text-sm font-medium hover:bg-navy-50 transition-colors"
          >
            Search Vrbo
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
