interface QuickFactsProps {
  facts: { label: string; value: string }[];
}

export function QuickFacts({ facts }: QuickFactsProps) {
  return (
    <div className="bg-navy-900 rounded-xl p-6 text-white">
      <h3 className="font-display font-semibold text-lg mb-4">Quick facts</h3>
      <dl className="space-y-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-navy-400 text-xs uppercase tracking-wide">{fact.label}</dt>
            <dd className="text-white font-medium text-sm mt-0.5">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
