import Link from "next/link";
import { GraduationCap } from "lucide-react";

interface SailingSchoolBlockProps {
  destinationName: string;
  destinationSlug: string;
}

export function SailingSchoolBlock({
  destinationName,
  destinationSlug,
}: SailingSchoolBlockProps) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-6">
      <h3 className="font-display text-lg font-bold text-navy-900 mb-3 flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-sky-400" />
        Learn to Sail
      </h3>
      <p className="text-sm text-navy-500 mb-4">
        RYA, ASA, or IYT courses in {destinationName}? Get your school listed
        here.
      </p>
      <Link
        href={`/partner/school?destination=${destinationSlug}`}
        className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors"
      >
        List your school — $200/mo &rarr;
      </Link>
    </div>
  );
}
