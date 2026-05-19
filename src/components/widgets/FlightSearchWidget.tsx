"use client";

import { useState, useRef, useEffect } from "react";
import { Plane, ExternalLink } from "lucide-react";
import { searchAirports, findAirportByCode, type Airport } from "@/lib/airports";

interface FlightSearchWidgetProps {
  destination: string;
  date?: string;
}

function parseDestination(dest: string): { city: string; iata?: string } {
  const match = dest.match(/^(.+?)\s*\(([A-Z]{3})\)$/);
  if (match) return { city: match[1].trim(), iata: match[2] };
  return { city: dest };
}

function formatAirport(a: Airport): string {
  return `${a.code} — ${a.name}, ${a.country}`;
}

function AirportInput({
  label,
  placeholder,
  value,
  code,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  code: string;
  onChange: (display: string, code: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Airport[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external value changes (e.g. initial pre-fill)
  useEffect(() => {
    setQuery(value);
  }, [value]);

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
    onChange(q, "");
    const matches = searchAirports(q);
    setResults(matches);
    setOpen(matches.length > 0);
    setActiveIndex(-1);
  }

  function selectAirport(a: Airport) {
    const display = formatAirport(a);
    setQuery(display);
    onChange(display, a.code);
    setOpen(false);
    setActiveIndex(-1);
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
      <label className="block text-sm font-medium text-navy-700 mb-1">
        {label}
      </label>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => handleInput(e.target.value)}
        onFocus={() => {
          if (results.length > 0) setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full px-3 py-2.5 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-navy-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {results.map((a, idx) => (
            <li key={a.code}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectAirport(a)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  idx === activeIndex
                    ? "bg-sky-50 text-navy-900"
                    : "text-navy-700 hover:bg-navy-50"
                }`}
              >
                <span className="font-semibold text-navy-900">{a.code}</span>
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

export function FlightSearchWidget({
  destination,
  date,
}: FlightSearchWidgetProps) {
  const { city, iata } = parseDestination(destination);

  // Pre-fill destination with airport lookup
  const destAirport = iata ? findAirportByCode(iata) : undefined;
  const destDisplay = destAirport ? formatAirport(destAirport) : city;
  const destCode = iata || "";

  const [originDisplay, setOriginDisplay] = useState("");
  const [originCode, setOriginCode] = useState("");
  const [destDisplayState, setDestDisplayState] = useState(destDisplay);
  const [destCodeState, setDestCodeState] = useState(destCode);
  const [travelDate, setTravelDate] = useState(date || "");
  const [passengers, setPassengers] = useState("1");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const origin = originCode ? originCode.toLowerCase() : "anywhere";
    const dest = destCodeState ? destCodeState.toLowerCase() : "anywhere";
    const dateParam = travelDate ? travelDate.replace(/-/g, "").slice(2) : "";

    const url = `https://www.skyscanner.com/transport/flights/${origin}/${dest}/${dateParam}/?adults=${passengers}`;

    fetch("/api/affiliate-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partner: "Skyscanner",
        click_url: url,
      }),
    }).catch(() => {});

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-navy-900 mb-1 flex items-center gap-2">
        <Plane className="w-4 h-4 text-ochre-400" />
        Flights to {city}
        {iata && (
          <span className="text-xs font-normal text-navy-400">({iata})</span>
        )}
      </h3>
      <p className="text-xs text-navy-400 mb-3">
        Compare flight prices from multiple airlines.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <AirportInput
            label="From"
            placeholder="Flying from..."
            value={originDisplay}
            code={originCode}
            onChange={(display, code) => {
              setOriginDisplay(display);
              setOriginCode(code);
            }}
          />
          <AirportInput
            label="To"
            placeholder="Flying to..."
            value={destDisplayState}
            code={destCodeState}
            onChange={(display, code) => {
              setDestDisplayState(display);
              setDestCodeState(code);
            }}
          />
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Passengers
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "passenger" : "passengers"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-navy-900 text-white text-sm font-medium hover:bg-navy-800 transition-colors"
        >
          Search flights
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
