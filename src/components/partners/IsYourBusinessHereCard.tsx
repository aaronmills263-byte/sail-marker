import Link from "next/link";

interface IsYourBusinessHereCardProps {
  destinationName: string;
  destinationSlug: string;
}

export function IsYourBusinessHereCard({
  destinationName,
  destinationSlug,
}: IsYourBusinessHereCardProps) {
  return (
    <div className="bg-navy-50 rounded-2xl border border-navy-100 p-6">
      <h3 className="font-display text-lg font-bold text-navy-900 mb-3">
        Run a sailing business in {destinationName}?
      </h3>
      <ul className="space-y-2 text-sm text-navy-600 mb-5">
        <li>
          <strong className="text-navy-700">Charter companies</strong> — featured
          placement from $500/mo
        </li>
        <li>
          <strong className="text-navy-700">Sailing schools</strong> — sidebar
          listing from $200/mo
        </li>
        <li>
          <strong className="text-navy-700">Yacht brokers</strong> — region
          visibility from $300/mo
        </li>
        <li>
          <strong className="text-navy-700">Marinas</strong> — featured listing
          from $150/mo
        </li>
        <li>
          <strong className="text-navy-700">Services</strong> — provisioning,
          transfers, crew from $100/mo
        </li>
      </ul>
      <Link
        href={`/partner?destination=${destinationSlug}`}
        className="block w-full text-center px-4 py-2.5 bg-navy-700 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
      >
        Partner With Us
      </Link>
    </div>
  );
}
