import Link from "next/link";
import { Ship } from "lucide-react";

interface CharterPartnerSpotlightProps {
  destinationName: string;
  destinationSlug: string;
}

export function CharterPartnerSpotlight({
  destinationName,
  destinationSlug,
}: CharterPartnerSpotlightProps) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-8">
      <h2 className="font-display text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
        <Ship className="w-5 h-5 text-sky-400" />
        Charter Companies
      </h2>
      <div className="rounded-xl border border-dashed border-navy-200 bg-navy-50/50 p-6 text-center">
        <p className="text-navy-700 font-medium mb-2">
          Charter company operating in {destinationName}?
        </p>
        <p className="text-sm text-navy-500 mb-4">
          Reach sailors planning their next charter — featured placement on this
          page from $500/month.
        </p>
        <Link
          href={`/partner/charter?destination=${destinationSlug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
        >
          Become a Charter Partner
        </Link>
      </div>
    </div>
  );
}
