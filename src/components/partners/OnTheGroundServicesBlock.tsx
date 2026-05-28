import Link from "next/link";
import { ShoppingBag } from "lucide-react";

interface OnTheGroundServicesBlockProps {
  destinationName: string;
  destinationSlug: string;
}

export function OnTheGroundServicesBlock({
  destinationName,
  destinationSlug,
}: OnTheGroundServicesBlockProps) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-8">
      <h2 className="font-display text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-sky-400" />
        On the Ground
      </h2>
      <p className="text-sm text-navy-600 mb-4">
        Provisioning, airport transfers, crew agencies, and chandleries serving{" "}
        {destinationName}.
      </p>
      <div className="rounded-xl border border-dashed border-navy-200 bg-navy-50/50 p-5 text-center">
        <p className="text-sm text-navy-700 font-medium mb-2">
          Provide services in {destinationName}?
        </p>
        <p className="text-xs text-navy-500 mb-3">
          Provisioning, transfers, crew hire, equipment — from $100/month.
        </p>
        <Link
          href={`/partner/services?destination=${destinationSlug}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
        >
          List Your Service
        </Link>
      </div>
    </div>
  );
}
