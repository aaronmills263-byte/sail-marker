interface RecommendationCardProps {
  title: string;
  category: string;
  description: string;
  pills?: string[];
  href?: string;
}

export function RecommendationCard({
  title,
  category,
  description,
  pills,
  href,
}: RecommendationCardProps) {
  const content = (
    <div className="bg-white rounded-xl border border-navy-100 p-5 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-ochre-50 text-ochre-600">
          {category}
        </span>
      </div>
      <h3 className="font-body text-lg font-semibold text-navy-800 mb-1">{title}</h3>
      <p className="text-sm text-navy-600 leading-relaxed mb-3 flex-1">{description}</p>
      {pills && pills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {pills.map((pill) => (
            <span
              key={pill}
              className="text-[10px] bg-navy-50 text-navy-600 px-2 py-0.5 rounded-full"
            >
              {pill}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}
