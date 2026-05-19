"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
}

export function TravelGuideTOC({ headings }: { headings: TOCItem[] }) {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const navLinks = (
    <nav className="space-y-1">
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          onClick={() => setIsOpen(false)}
          className={`block text-sm py-1 transition-colors ${
            activeId === h.id
              ? "text-ochre-500 font-medium"
              : "text-navy-500 hover:text-navy-700"
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block bg-white rounded-xl border border-navy-100 p-5">
        <h3 className="font-display font-semibold text-navy-900 mb-3 text-sm">
          In this guide
        </h3>
        {navLinks}
      </div>

      {/* Mobile: collapsible */}
      <div className="lg:hidden bg-white rounded-xl border border-navy-100 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-5 py-3 text-sm font-semibold text-navy-900"
        >
          <span>In this guide</span>
          <ChevronDown
            className={`w-4 h-4 text-navy-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && <div className="px-5 pb-4">{navLinks}</div>}
      </div>
    </>
  );
}
