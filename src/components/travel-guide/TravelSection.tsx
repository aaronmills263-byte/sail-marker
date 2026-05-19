import {
  Plane,
  Train,
  Bed,
  Utensils,
  Anchor,
  Landmark,
  Languages,
  DollarSign,
  Wind,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

const sectionIcons: Record<string, LucideIcon> = {
  "getting-there": Plane,
  "getting-around": Train,
  "where-to-stay": Bed,
  "where-to-eat": Utensils,
  "provisioning": ShoppingBag,
  "sailing-conditions": Wind,
  "beyond-the-boat": Landmark,
  "local-language": Languages,
  "budget-guide": DollarSign,
  "marinas": Anchor,
};

interface TravelSectionProps {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

export function TravelSection({ id, title, intro, children }: TravelSectionProps) {
  const Icon = sectionIcons[id];

  return (
    <section id={id} className="py-12 md:py-16 scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ochre-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-ochre-500" />
          </div>
        )}
        <h2 className="font-display text-2xl font-bold text-navy-900">{title}</h2>
      </div>
      {intro && (
        <p className="text-navy-600 leading-relaxed mb-6">{intro}</p>
      )}
      <div className="space-y-6">{children}</div>
    </section>
  );
}
