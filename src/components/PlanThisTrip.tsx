"use client";

import { useState, useRef, useEffect } from "react";
import { Plane, Shield, Car, ShoppingBag, ExternalLink } from "lucide-react";
import { searchAirports, findAirportByCode, type Airport } from "@/lib/airports";

interface PlanThisTripProps {
  nearestAirport: string;
  nearestAirportCode: string;
  destinationSlug: string;
  destinationName: string;
  country: string;
  primaryMarina?: string;
}

/* ─── Airport typeahead ─── */

function AirportTypeahead({
  label,
  placeholder,
  value,
  onSelect,
  locked,
}: {
  label: string;
  placeholder: string;
  value: string;
  onSelect: (display: string, code: string) => void;
  locked?: boolean;
}) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Airport[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInput(q: string) {
    setQuery(q);
    onSelect(q, "");
    const matches = searchAirports(q);
    setResults(matches);
    setOpen(matches.length > 0);
    setActiveIndex(-1);
  }

  function selectAirport(a: Airport) {
    const display = `${a.code} — ${a.name}`;
    setQuery(display);
    onSelect(display, a.code);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectAirport(results[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy-600 mb-1">
        {label}
      </label>
      {locked ? (
        <input
          type="text"
          value={query}
          readOnly
          className="w-full px-3 py-2 rounded-lg border border-navy-100 bg-navy-50 text-sm text-navy-600 cursor-not-allowed"
        />
      ) : (
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => { if (results.length > 0) setOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full px-3 py-2 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
        />
      )}
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-navy-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {results.map((a, idx) => (
            <li key={a.code}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectAirport(a)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  idx === activeIndex ? "bg-sky-50 text-navy-900" : "text-navy-700 hover:bg-navy-50"
                }`}
              >
                <span className="font-semibold">{a.code}</span>
                <span className="text-navy-400"> — </span>
                <span>{a.name}</span>
                <span className="text-navy-400">, {a.country}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Main component ─── */

export function PlanThisTrip({
  nearestAirport,
  nearestAirportCode,
  destinationName,
  country,
  primaryMarina,
}: PlanThisTripProps) {
  // Flight form state
  const [fromDisplay, setFromDisplay] = useState("");
  const [fromCode, setFromCode] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightPassengers, setFlightPassengers] = useState("2");
  const [flightError, setFlightError] = useState("");

  // Pre-fill destination airport
  const destAirport = nearestAirportCode ? findAirportByCode(nearestAirportCode) : undefined;
  const toDisplay = destAirport
    ? `${destAirport.code} — ${destAirport.name}`
    : nearestAirport || "";

  // Insurance form state
  const [tripStart, setTripStart] = useState("");
  const [tripEnd, setTripEnd] = useState("");
  const [insuranceTravellers, setInsuranceTravellers] = useState("2");

  const marinaLabel = primaryMarina || destinationName;

  function handleFlightSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!fromCode) {
      setFlightError("Please select a departure airport.");
      return;
    }
    setFlightError("");

    const toIata = nearestAirportCode || "";
    let url = `https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:${fromCode},to:${toIata}`;
    if (departDate) url += `,departure:${departDate}`;
    url += `&leg2=from:${toIata},to:${fromCode}`;
    if (returnDate) url += `,departure:${returnDate}`;
    url += `&passengers=adults:${flightPassengers}&options=cabinclass:economy`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleInsuranceSearch(e: React.FormEvent) {
    e.preventDefault();

    let url = `https://www.worldnomads.com/travel-insurance/get-a-quote?country=${encodeURIComponent(country || destinationName)}`;
    if (tripStart) url += `&departDate=${tripStart}`;
    if (tripEnd) url += `&returnDate=${tripEnd}`;
    url += `&numTravellers=${insuranceTravellers}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300";
  const labelClass =
    "block text-[11px] font-semibold uppercase tracking-wider text-navy-600 mb-1";

  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-8">
      <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">
        Plan this trip
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* ── Flights ── */}
        <div className="rounded-lg border border-navy-100 bg-white p-6">
          <h3 className="font-display text-lg font-bold text-navy-700 mb-1 flex items-center gap-2">
            <Plane className="w-5 h-5 text-navy-400" />
            Flights{nearestAirport ? ` to ${nearestAirport}` : ""}
          </h3>
          <p className="text-sm text-navy-500 mb-4">
            Search flights on Expedia.
          </p>

          <form onSubmit={handleFlightSearch} className="space-y-3">
            <AirportTypeahead
              label="From"
              placeholder="City or airport..."
              value={fromDisplay}
              onSelect={(display, code) => {
                setFromDisplay(display);
                setFromCode(code);
                if (code) setFlightError("");
              }}
            />
            <AirportTypeahead
              label="To"
              placeholder=""
              value={toDisplay}
              onSelect={() => {}}
              locked
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Depart</label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Return</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Passengers</label>
              <select
                value={flightPassengers}
                onChange={(e) => setFlightPassengers(e.target.value)}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "adult" : "adults"}
                  </option>
                ))}
              </select>
            </div>
            {flightError && (
              <p className="text-xs text-red-600">{flightError}</p>
            )}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
            >
              Search flights on Expedia
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* ── Insurance ── */}
        <div className="rounded-lg border border-navy-100 bg-white p-6">
          <h3 className="font-display text-lg font-bold text-navy-700 mb-1 flex items-center gap-2">
            <Shield className="w-5 h-5 text-navy-400" />
            Travel insurance
          </h3>
          <p className="text-sm text-navy-500 mb-4">
            Get a quote from World Nomads.
          </p>

          <form onSubmit={handleInsuranceSearch} className="space-y-3">
            <div>
              <label className={labelClass}>Destination</label>
              <input
                type="text"
                value={country || destinationName}
                readOnly
                className="w-full px-3 py-2 rounded-lg border border-navy-100 bg-navy-50 text-sm text-navy-600 cursor-not-allowed"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Trip start</label>
                <input
                  type="date"
                  value={tripStart}
                  onChange={(e) => setTripStart(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Trip end</label>
                <input
                  type="date"
                  value={tripEnd}
                  onChange={(e) => setTripEnd(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Travellers</label>
              <select
                value={insuranceTravellers}
                onChange={(e) => setInsuranceTravellers(e.target.value)}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "traveller" : "travellers"}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
            >
              Get a quote on World Nomads
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[10px] text-navy-400 mt-3 leading-relaxed">
            Most travel policies exclude crew responsibility and damage to the chartered yacht itself — check the small print.
          </p>
        </div>

        {/* ── Transfers (empty state) ── */}
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

        {/* ── Provisioning (empty state) ── */}
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
