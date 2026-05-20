"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, ChevronDown, Anchor, Ship, Compass, Mail } from "lucide-react";

const navLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/guides", label: "Guides" },
  { href: "/plan", label: "Plan a Charter" },
];

const moreLinks = [
  { href: "/about", label: "About" },
  { href: "/responsible-sailing", label: "Responsible Sailing" },
  { href: "/contact", label: "Contact" },
];

const partnerLinks = [
  { href: "/list-your-marina", label: "List Your Marina", desc: "Marinas & charter bases", icon: Anchor },
  { href: "/charter-partners", label: "Charter Partners", desc: "Charter companies & flotilla operators", icon: Ship },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [mobilePartnerOpen, setMobilePartnerOpen] = useState(false);
  const partnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (partnerRef.current && !partnerRef.current.contains(e.target as Node)) {
        setPartnerOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPartnerOpen(false);
    }
    if (partnerOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [partnerOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/branding/logo-primary.svg"
              alt="Sail Marker"
              width={600}
              height={200}
              className="h-10 w-[120px] md:h-14 md:w-[168px] flex-shrink-0"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-auto mr-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy-700 hover:text-navy-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 text-sm font-medium text-navy-700 hover:text-navy-900 transition-colors"
              >
                More
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {moreOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMoreOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-navy-100 py-2 z-20">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 hover:text-navy-900"
                        onClick={() => setMoreOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button className="text-navy-600 hover:text-navy-900">
              <Search className="w-5 h-5" />
            </button>
          </nav>

          <div className="hidden md:block relative" ref={partnerRef}>
            <button
              onClick={() => setPartnerOpen(!partnerOpen)}
              onMouseEnter={() => setPartnerOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
            >
              Partner with us
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${partnerOpen ? "rotate-180" : ""}`} />
            </button>
            {partnerOpen && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-navy-100 py-2 z-50"
                onMouseLeave={() => setPartnerOpen(false)}
              >
                {partnerLinks.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-navy-50 transition-colors"
                    onClick={() => setPartnerOpen(false)}
                  >
                    <link.icon className="w-5 h-5 text-navy-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{link.label}</p>
                      <p className="text-xs text-navy-500">{link.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            className="md:hidden text-navy-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-navy-100">
            {[...navLinks, ...moreLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-navy-700 hover:text-navy-900 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 border-t border-navy-100 pt-4">
              <button
                onClick={() => setMobilePartnerOpen(!mobilePartnerOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-navy-700 text-white font-medium rounded-lg"
              >
                Partner with us
                <ChevronDown className={`w-4 h-4 transition-transform ${mobilePartnerOpen ? "rotate-180" : ""}`} />
              </button>
              {mobilePartnerOpen && (
                <div className="mt-2 bg-navy-50 rounded-lg divide-y divide-navy-100">
                  {partnerLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="flex items-start gap-3 px-4 py-3"
                      onClick={() => { setMobileOpen(false); setMobilePartnerOpen(false); }}
                    >
                      <link.icon className="w-5 h-5 text-navy-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{link.label}</p>
                        <p className="text-xs text-navy-500">{link.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
