import { Lightbulb, AlertTriangle, Star, type LucideIcon } from "lucide-react";

const variants: Record<string, { Icon: LucideIcon; bg: string; border: string; iconColor: string }> = {
  tip: { Icon: Lightbulb, bg: "bg-ochre-50", border: "border-ochre-200", iconColor: "text-ochre-500" },
  warning: { Icon: AlertTriangle, bg: "bg-amber-50", border: "border-amber-200", iconColor: "text-amber-600" },
  insider: { Icon: Star, bg: "bg-blue-50", border: "border-blue-200", iconColor: "text-blue-600" },
};

interface CalloutBoxProps {
  variant: "tip" | "warning" | "insider";
  title: string;
  children: React.ReactNode;
}

export function CalloutBox({ variant, title, children }: CalloutBoxProps) {
  const { Icon, bg, border, iconColor } = variants[variant];

  return (
    <div className={`${bg} border ${border} rounded-xl p-5 flex gap-4`}>
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <div>
        <h4 className="font-body font-semibold text-navy-900 text-sm mb-1">{title}</h4>
        <div className="text-sm text-navy-700 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
