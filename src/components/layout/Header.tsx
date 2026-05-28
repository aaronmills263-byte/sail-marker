"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";

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

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/branding/logo-primary.png"
              alt="Sail Marker"
              width={910}
              height={274}
              className="h-10 w-[133px] md:h-14 md:w-[186px] flex-shrink-0"
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

          <Link
            href="/partner"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
          >
            Partner With Us
          </Link>

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
              <Link
                href="/partner"
                className="block w-full text-center px-4 py-2.5 bg-navy-700 text-white font-medium rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                Partner With Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
