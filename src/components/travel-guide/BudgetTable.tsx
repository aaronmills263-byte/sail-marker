import { Coins, Wallet, Gem } from "lucide-react";

interface BudgetTier {
  hotel: string;
  food: string;
  transport: string;
  drinks: string;
  total: string;
}

interface BudgetTableProps {
  currency: string;
  budget: BudgetTier;
  comfortable: BudgetTier;
  premium: BudgetTier;
}

const tiers = [
  { key: "budget" as const, label: "Budget", Icon: Coins, color: "text-emerald-600 bg-emerald-50" },
  { key: "comfortable" as const, label: "Comfortable", Icon: Wallet, color: "text-blue-600 bg-blue-50" },
  { key: "premium" as const, label: "Premium", Icon: Gem, color: "text-purple-600 bg-purple-50" },
];

const rows = [
  { key: "hotel" as const, label: "Hotel / night" },
  { key: "food" as const, label: "Food / day" },
  { key: "transport" as const, label: "Transport / day" },
  { key: "drinks" as const, label: "Drinks / day" },
  { key: "total" as const, label: "Daily total" },
];

export function BudgetTable({ currency, budget, comfortable, premium }: BudgetTableProps) {
  const data = { budget, comfortable, premium };

  return (
    <div className="bg-white rounded-xl border border-navy-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100">
              <th className="text-left px-5 py-3 text-navy-400 font-medium text-xs uppercase tracking-wide">
                {currency}
              </th>
              {tiers.map((tier) => (
                <th key={tier.key} className="px-5 py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg ${tier.color}`}>
                      <tier.Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-semibold text-navy-900 text-xs">{tier.label}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.key}
                className={`border-b border-navy-50 ${row.key === "total" ? "bg-navy-50/50 font-semibold" : ""}`}
              >
                <td className="px-5 py-2.5 text-navy-700">{row.label}</td>
                {tiers.map((tier) => (
                  <td
                    key={tier.key}
                    className={`px-5 py-2.5 text-center text-navy-900 ${row.key === "total" ? "font-bold" : ""}`}
                  >
                    {data[tier.key][row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
