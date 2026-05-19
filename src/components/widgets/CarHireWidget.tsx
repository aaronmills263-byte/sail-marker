"use client";

import { useState } from "react";
import { Car, ExternalLink } from "lucide-react";

interface CarHireWidgetProps {
  location: string;
  pickupDate?: string;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function CarHireWidget({ location, pickupDate }: CarHireWidgetProps) {
  const [loc, setLoc] = useState(location);
  const [pickup, setPickup] = useState(pickupDate || "");
  const [dropoff, setDropoff] = useState(
    pickupDate ? addDays(pickupDate, 1) : ""
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const url = `https://www.expedia.com/carsearch?locn=${encodeURIComponent(
      loc
    )}&date1=${pickup}&date2=${dropoff}`;

    fetch("/api/affiliate-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partner: "Expedia", click_url: url }),
    }).catch(() => {});

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-navy-900 mb-1 flex items-center gap-2">
        <Car className="w-4 h-4 text-ochre-400" />
        Car hire in {location}
      </h3>
      <p className="text-xs text-navy-400 mb-3">
        Pick up at the airport or city centre.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Pick-up location
            </label>
            <input
              type="text"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              placeholder="Airport or city..."
              className="w-full px-3 py-2.5 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Pick-up date
            </label>
            <input
              type="date"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                if (e.target.value && (!dropoff || dropoff <= e.target.value)) {
                  setDropoff(addDays(e.target.value, 1));
                }
              }}
              className="w-full px-3 py-2.5 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Drop-off date
            </label>
            <input
              type="date"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-navy-900 text-white text-sm font-medium hover:bg-navy-800 transition-colors"
        >
          Search Expedia
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
