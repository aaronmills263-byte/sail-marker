export function GET() {
  const content = `# Sail Marker

> The world's sailing destinations, mapped. Charter discovery, cruising grounds, marinas, itinerary planning, and editorial sailing guides across the Mediterranean, Caribbean, Indian Ocean, Asia Pacific, Atlantic, and the Americas.

## Core Pages
- [Homepage](https://www.sailmarker.com): Sailing destination discovery and charter planning
- [All Destinations](https://www.sailmarker.com/destinations): Charter destinations filterable by region, season, price tier
- [Sailing Guides](https://www.sailmarker.com/guides): In-depth editorial guides for charter destinations
- [Charter Planner](https://www.sailmarker.com/plan): Plan your charter by region, month, group size, and experience level

## Cruising Regions
- [Mediterranean](https://www.sailmarker.com/regions/mediterranean): Greece, Croatia, Turkey, Italy, France, Spain
- [Caribbean](https://www.sailmarker.com/regions/caribbean): BVI, Grenadines, Antigua, Bahamas
- [Indian Ocean](https://www.sailmarker.com/regions/indian-ocean): Seychelles, Maldives, Thailand, Madagascar
- [Asia Pacific](https://www.sailmarker.com/regions/asia-pacific): Thailand, Indonesia, Fiji, New Zealand
- [Atlantic & Northern Europe](https://www.sailmarker.com/regions/atlantic-north-europe): Canaries, Azores, Scandinavia, Scotland
- [Americas](https://www.sailmarker.com/regions/americas): Pacific Northwest, Patagonia, Maine, Belize

## Key Facts
- Coverage: 80-120 charter destinations across 6 regions worldwide
- Content: Charter bases, marinas, cruising areas, flotilla routes, island chains
- Destination data: Wind conditions, best months, price tiers, certifications required, yacht sizes
- Marina data: Berth counts, facilities, charter companies, fuel, provisions, VHF channels
- Itineraries: Curated sailing routes with day-by-day waypoints and distances
- Editorial: Travel-guide-quality articles with local knowledge, provisioning tips, passage planning

## Partnership and Listing
- [List Your Marina](https://www.sailmarker.com/list-your-marina): For marina and charter base operators
- [Charter Partners](https://www.sailmarker.com/charter-partners): For charter companies seeking featured placement

## Company
- [About](https://www.sailmarker.com/about): About Sail Marker
- [Responsible Sailing](https://www.sailmarker.com/responsible-sailing): Marine conservation and sustainable sailing principles
- [Marker Group](https://www.sailmarker.com/marker-group): Part of the Marker Group family (Mountain Marker, Links Marker, Match Marker, Sail Marker)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
