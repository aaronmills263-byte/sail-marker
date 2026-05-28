import Link from "next/link";
import { Globe } from "lucide-react";

interface RegionSponsorBannerProps {
  regionName: string;
  regionSlug: string;
}

export function RegionSponsorBanner({
  regionName,
  regionSlug,
}: RegionSponsorBannerProps) {
  return (
    <div className="bg-navy-50 border-b border-navy-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-sky-400 flex-shrink-0" />
            <p className="text-sm text-navy-600">
              <span className="font-semibold text-navy-700">
                Sponsor the {regionName} hub
              </span>{" "}
              — your brand across every destination page in this region, from
              $1,500/mo.
            </p>
          </div>
          <Link
            href={`/partner/sponsor?region=${regionSlug}`}
            className="flex-shrink-0 px-4 py-2 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
