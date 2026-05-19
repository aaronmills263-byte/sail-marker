import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { TravelSection } from "./TravelSection";
import { RecommendationCard } from "./RecommendationCard";
import { TransportCard } from "./TransportCard";
import { BudgetTable } from "./BudgetTable";
import { LocalPhrases } from "./LocalPhrases";
import { CalloutBox } from "./CalloutBox";
import { QuickFacts } from "./QuickFacts";
import { FlightSearchWidget } from "@/components/widgets/FlightSearchWidget";
import { AccommodationWidget } from "@/components/widgets/AccommodationWidget";

interface TravelGuideRendererProps {
  sections: Record<string, unknown>;
  destinationSlug: string;
  destinationName: string;
}

function MarkdownBlock({ content }: { content: string }) {
  return (
    <div className="prose prose-navy max-w-none prose-headings:font-display prose-headings:text-navy-900 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-navy-700 prose-p:leading-relaxed prose-li:text-navy-700 prose-strong:text-navy-900 prose-a:text-navy-700 prose-a:underline hover:prose-a:text-navy-900 prose-blockquote:border-l-4 prose-blockquote:border-ochre-400 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:text-navy-600 prose-blockquote:pl-4">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith("/")) {
              return (
                <Link href={href} className="text-navy-700 underline hover:text-navy-900">
                  {children}
                </Link>
              );
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function TravelGuideRenderer({
  sections,
  destinationSlug,
  destinationName,
}: TravelGuideRendererProps) {
  const s = sections as Record<string, unknown>;

  const transportCards = (s.transport_options as Array<{
    mode: string;
    title: string;
    time: string;
    cost: string;
    best_for: string;
  }>) || [];

  const neighbourhoods = (s.neighbourhoods as Array<{
    name: string;
    vibe: string;
    price_tier: string;
    distance_to_venue: string;
    description: string;
  }>) || [];

  const restaurants = (s.restaurants as Array<{
    name: string;
    type: string;
    neighbourhood: string;
    price_tier: string;
    signature_dish: string;
    description: string;
  }>) || [];

  const localPhrases = (s.local_phrases as Array<{
    english: string;
    local: string;
    pronunciation: string;
  }>) || [];

  const budget = s.budget as {
    currency: string;
    budget: { hotel: string; food: string; transport: string; drinks: string; total: string };
    comfortable: { hotel: string; food: string; transport: string; drinks: string; total: string };
    premium: { hotel: string; food: string; transport: string; drinks: string; total: string };
  } | null;

  const callouts = (s.callouts as Array<{
    variant: "tip" | "warning" | "insider";
    title: string;
    body: string;
    section: string;
  }>) || [];

  const quickFacts = (s.quick_facts as Array<{ label: string; value: string }>) || [];

  const getCallout = (section: string) =>
    callouts.find((c) => c.section === section);

  return (
    <>
      {quickFacts.length > 0 && (
        <div className="lg:hidden mb-8">
          <QuickFacts facts={quickFacts} />
        </div>
      )}

      {/* Getting There */}
      {s.getting_there && (
        <TravelSection id="getting-there" title="Getting there">
          <MarkdownBlock content={s.getting_there as string} />
          {transportCards.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {transportCards.map((tc) => (
                <TransportCard
                  key={tc.title}
                  mode={tc.mode}
                  title={tc.title}
                  time={tc.time}
                  cost={tc.cost}
                  bestFor={tc.best_for}
                />
              ))}
            </div>
          )}
          {getCallout("getting_there") && (
            <div className="mt-6">
              <CalloutBox
                variant={getCallout("getting_there")!.variant}
                title={getCallout("getting_there")!.title}
              >
                {getCallout("getting_there")!.body}
              </CalloutBox>
            </div>
          )}
          <div className="mt-8">
            <FlightSearchWidget destination={destinationName} />
          </div>
        </TravelSection>
      )}

      {/* Getting Around */}
      {s.getting_around && (
        <TravelSection id="getting-around" title="Getting around">
          <MarkdownBlock content={s.getting_around as string} />
          {getCallout("getting_around") && (
            <div className="mt-6">
              <CalloutBox
                variant={getCallout("getting_around")!.variant}
                title={getCallout("getting_around")!.title}
              >
                {getCallout("getting_around")!.body}
              </CalloutBox>
            </div>
          )}
        </TravelSection>
      )}

      {/* Where to Stay */}
      {s.where_to_stay && (
        <TravelSection id="where-to-stay" title="Where to stay">
          <MarkdownBlock content={s.where_to_stay as string} />
          {neighbourhoods.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {neighbourhoods.map((n) => (
                <RecommendationCard
                  key={n.name}
                  title={n.name}
                  category="Neighbourhood"
                  description={n.description}
                  pills={[n.price_tier, n.distance_to_venue, n.vibe].filter(Boolean)}
                />
              ))}
            </div>
          )}
          <div className="mt-8">
            <AccommodationWidget city={destinationName} country="" />
          </div>
        </TravelSection>
      )}

      {/* Where to Eat */}
      {s.where_to_eat && (
        <TravelSection id="where-to-eat" title="Where to eat">
          <MarkdownBlock content={s.where_to_eat as string} />
          {restaurants.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {restaurants.map((r) => (
                <RecommendationCard
                  key={r.name}
                  title={r.name}
                  category={r.type}
                  description={`${r.description}${r.signature_dish ? ` Known for: ${r.signature_dish}.` : ""}`}
                  pills={[r.price_tier, r.neighbourhood].filter(Boolean)}
                />
              ))}
            </div>
          )}
          {getCallout("where_to_eat") && (
            <div className="mt-6">
              <CalloutBox
                variant={getCallout("where_to_eat")!.variant}
                title={getCallout("where_to_eat")!.title}
              >
                {getCallout("where_to_eat")!.body}
              </CalloutBox>
            </div>
          )}
        </TravelSection>
      )}

      {/* Provisioning */}
      {s.provisioning && (
        <TravelSection id="provisioning" title="Provisioning">
          <MarkdownBlock content={s.provisioning as string} />
        </TravelSection>
      )}

      {/* Sailing Conditions */}
      {s.sailing_conditions && (
        <TravelSection id="sailing-conditions" title="Sailing conditions">
          <MarkdownBlock content={s.sailing_conditions as string} />
        </TravelSection>
      )}

      {/* Beyond the Boat */}
      {s.beyond_the_boat && (
        <TravelSection id="beyond-the-boat" title="Beyond the boat">
          <MarkdownBlock content={s.beyond_the_boat as string} />
        </TravelSection>
      )}

      {/* Local Language */}
      {localPhrases.length > 0 && s.local_language && (
        <TravelSection id="local-language" title="Local language">
          <MarkdownBlock content={s.local_language as string} />
          <div className="mt-6">
            <LocalPhrases
              language={(s.language_name as string) || "Local"}
              phrases={localPhrases}
            />
          </div>
        </TravelSection>
      )}

      {/* Budget Guide */}
      {budget && (
        <TravelSection id="budget-guide" title="Budget guide">
          {typeof s.budget_intro === "string" && <MarkdownBlock content={s.budget_intro} />}
          <div className="mt-6">
            <BudgetTable
              currency={budget.currency}
              budget={budget.budget}
              comfortable={budget.comfortable}
              premium={budget.premium}
            />
          </div>
        </TravelSection>
      )}
    </>
  );
}
