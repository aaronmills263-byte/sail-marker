import Link from "next/link";


const footerLinks = {
  discover: [
    { href: "/destinations", label: "All Destinations" },
    { href: "/regions/mediterranean", label: "Mediterranean" },
    { href: "/regions/caribbean", label: "Caribbean" },
    { href: "/regions/indian-ocean", label: "Indian Ocean" },
    { href: "/guides", label: "Sailing Guides" },
  ],
  plan: [
    { href: "/plan", label: "Charter Planner" },
    { href: "/guides", label: "Itinerary Guides" },
  ],
  partnerships: [
    { href: "/list-your-marina", label: "List Your Marina" },
    { href: "/charter-partners", label: "Charter Partners" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/responsible-sailing", label: "Responsible Sailing" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-display text-lg font-semibold tracking-wide text-white" style={{ fontVariant: "small-caps" }}>
                Sail Marker
              </span>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed">
              Charter destinations &middot; cruising grounds &middot; mapped
            </p>
            <p className="text-navy-400 text-xs mt-4">
              Part of the{" "}
              <Link
                href="/marker-group"
                className="text-navy-300 hover:text-white underline"
              >
                Marker Group
              </Link>
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold mb-4 text-navy-200">
              Discover
            </h3>
            <ul className="space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold mb-4 text-navy-200">
              Plan
            </h3>
            <ul className="space-y-2">
              {footerLinks.plan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold mb-4 text-navy-200">
              Partnerships
            </h3>
            <ul className="space-y-2">
              {footerLinks.partnerships.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold mb-4 text-navy-200">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-12 pt-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-navy-500">
              &copy; {new Date().getFullYear()} Sail Marker. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://mountainmarker.com"
                target="_blank"
                className="text-xs text-navy-500 hover:text-navy-300"
              >
                Mountain Marker
              </a>
              <a
                href="https://thelinksmarker.com"
                target="_blank"
                className="text-xs text-navy-500 hover:text-navy-300"
              >
                Links Marker
              </a>
              <a
                href="https://www.thematchmarker.com"
                target="_blank"
                className="text-xs text-navy-500 hover:text-navy-300"
              >
                Match Marker
              </a>
              <Link
                href="/marker-group"
                className="text-xs text-navy-500 hover:text-navy-300"
              >
                Marker Group
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
