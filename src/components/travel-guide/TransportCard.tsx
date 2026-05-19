import { Plane, Train, Bus, Car, Bike, type LucideIcon } from "lucide-react";

const modeIcons: Record<string, LucideIcon> = {
  plane: Plane,
  train: Train,
  bus: Bus,
  car: Car,
  bike: Bike,
};

interface TransportCardProps {
  mode: string;
  title: string;
  time: string;
  cost: string;
  bestFor: string;
}

export function TransportCard({ mode, title, time, cost, bestFor }: TransportCardProps) {
  const Icon = modeIcons[mode] || Train;

  return (
    <div className="bg-white rounded-xl border border-navy-100 p-5 flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center">
        <Icon className="w-5 h-5 text-navy-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-body font-semibold text-navy-900 text-sm">{title}</h4>
        <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-navy-500">
          <span>~{time}</span>
          <span>{cost}</span>
        </div>
        <p className="text-xs text-navy-400 mt-1">Best for: {bestFor}</p>
      </div>
    </div>
  );
}
