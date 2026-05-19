export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export const airports: Airport[] = [
  // USA
  { code: "ATL", name: "Hartsfield-Jackson Atlanta", city: "Atlanta", country: "USA" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "USA" },
  { code: "ORD", name: "O'Hare International", city: "Chicago", country: "USA" },
  { code: "DFW", name: "Dallas/Fort Worth International", city: "Dallas", country: "USA" },
  { code: "DEN", name: "Denver International", city: "Denver", country: "USA" },
  { code: "JFK", name: "John F. Kennedy International", city: "New York", country: "USA" },
  { code: "EWR", name: "Newark Liberty International", city: "Newark", country: "USA" },
  { code: "LGA", name: "LaGuardia", city: "New York", country: "USA" },
  { code: "SFO", name: "San Francisco International", city: "San Francisco", country: "USA" },
  { code: "SEA", name: "Seattle-Tacoma International", city: "Seattle", country: "USA" },
  { code: "MIA", name: "Miami International", city: "Miami", country: "USA" },
  { code: "MCO", name: "Orlando International", city: "Orlando", country: "USA" },
  { code: "BOS", name: "Boston Logan International", city: "Boston", country: "USA" },
  { code: "IAH", name: "George Bush Intercontinental", city: "Houston", country: "USA" },
  { code: "LAS", name: "Harry Reid International", city: "Las Vegas", country: "USA" },
  { code: "PHX", name: "Phoenix Sky Harbor International", city: "Phoenix", country: "USA" },
  { code: "MSP", name: "Minneapolis-St Paul International", city: "Minneapolis", country: "USA" },
  { code: "DTW", name: "Detroit Metropolitan", city: "Detroit", country: "USA" },
  { code: "CLT", name: "Charlotte Douglas International", city: "Charlotte", country: "USA" },
  { code: "AUS", name: "Austin-Bergstrom International", city: "Austin", country: "USA" },
  { code: "MCI", name: "Kansas City International", city: "Kansas City", country: "USA" },
  { code: "PHL", name: "Philadelphia International", city: "Philadelphia", country: "USA" },
  { code: "DCA", name: "Ronald Reagan Washington National", city: "Washington D.C.", country: "USA" },
  { code: "IAD", name: "Washington Dulles International", city: "Washington D.C.", country: "USA" },
  { code: "BWI", name: "Baltimore/Washington International", city: "Baltimore", country: "USA" },
  { code: "TPA", name: "Tampa International", city: "Tampa", country: "USA" },
  { code: "SAN", name: "San Diego International", city: "San Diego", country: "USA" },
  { code: "STL", name: "St. Louis Lambert International", city: "St. Louis", country: "USA" },
  { code: "IND", name: "Indianapolis International", city: "Indianapolis", country: "USA" },
  { code: "CLE", name: "Cleveland Hopkins International", city: "Cleveland", country: "USA" },
  { code: "PIT", name: "Pittsburgh International", city: "Pittsburgh", country: "USA" },
  { code: "BNA", name: "Nashville International", city: "Nashville", country: "USA" },
  { code: "RDU", name: "Raleigh-Durham International", city: "Raleigh", country: "USA" },
  { code: "MKE", name: "Milwaukee Mitchell International", city: "Milwaukee", country: "USA" },
  { code: "CMH", name: "John Glenn Columbus International", city: "Columbus", country: "USA" },
  { code: "CVG", name: "Cincinnati/Northern Kentucky International", city: "Cincinnati", country: "USA" },
  { code: "JAX", name: "Jacksonville International", city: "Jacksonville", country: "USA" },
  { code: "OAK", name: "Oakland International", city: "Oakland", country: "USA" },
  { code: "SJC", name: "San Jose International", city: "San Jose", country: "USA" },
  { code: "PDX", name: "Portland International", city: "Portland", country: "USA" },
  { code: "HNL", name: "Daniel K. Inouye International", city: "Honolulu", country: "USA" },
  { code: "ANC", name: "Ted Stevens Anchorage International", city: "Anchorage", country: "USA" },
  { code: "BUF", name: "Buffalo Niagara International", city: "Buffalo", country: "USA" },
  { code: "SLC", name: "Salt Lake City International", city: "Salt Lake City", country: "USA" },
  { code: "FLL", name: "Fort Lauderdale-Hollywood International", city: "Fort Lauderdale", country: "USA" },
  { code: "MDW", name: "Chicago Midway International", city: "Chicago", country: "USA" },
  { code: "HOU", name: "William P. Hobby", city: "Houston", country: "USA" },
  { code: "DAL", name: "Dallas Love Field", city: "Dallas", country: "USA" },
  { code: "RSW", name: "Southwest Florida International", city: "Fort Myers", country: "USA" },
  { code: "SAT", name: "San Antonio International", city: "San Antonio", country: "USA" },

  // UK
  { code: "LHR", name: "London Heathrow", city: "London", country: "UK" },
  { code: "LGW", name: "London Gatwick", city: "London", country: "UK" },
  { code: "STN", name: "London Stansted", city: "London", country: "UK" },
  { code: "LTN", name: "London Luton", city: "London", country: "UK" },
  { code: "MAN", name: "Manchester", city: "Manchester", country: "UK" },
  { code: "EDI", name: "Edinburgh", city: "Edinburgh", country: "UK" },
  { code: "BHX", name: "Birmingham", city: "Birmingham", country: "UK" },
  { code: "BRS", name: "Bristol", city: "Bristol", country: "UK" },
  { code: "GLA", name: "Glasgow", city: "Glasgow", country: "UK" },
  { code: "LPL", name: "Liverpool John Lennon", city: "Liverpool", country: "UK" },
  { code: "NCL", name: "Newcastle", city: "Newcastle", country: "UK" },
  { code: "BFS", name: "Belfast International", city: "Belfast", country: "UK" },
  { code: "EMA", name: "East Midlands", city: "Nottingham", country: "UK" },
  { code: "LBA", name: "Leeds Bradford", city: "Leeds", country: "UK" },
  { code: "ABZ", name: "Aberdeen", city: "Aberdeen", country: "UK" },
  { code: "CWL", name: "Cardiff", city: "Cardiff", country: "UK" },

  // France
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "ORY", name: "Paris Orly", city: "Paris", country: "France" },
  { code: "NCE", name: "Nice Côte d'Azur", city: "Nice", country: "France" },
  { code: "LYS", name: "Lyon-Saint Exupéry", city: "Lyon", country: "France" },
  { code: "MRS", name: "Marseille Provence", city: "Marseille", country: "France" },
  { code: "TLS", name: "Toulouse-Blagnac", city: "Toulouse", country: "France" },
  { code: "BOD", name: "Bordeaux-Mérignac", city: "Bordeaux", country: "France" },

  // Spain
  { code: "MAD", name: "Adolfo Suárez Madrid-Barajas", city: "Madrid", country: "Spain" },
  { code: "BCN", name: "Barcelona-El Prat", city: "Barcelona", country: "Spain" },
  { code: "PMI", name: "Palma de Mallorca", city: "Palma", country: "Spain" },
  { code: "AGP", name: "Málaga-Costa del Sol", city: "Málaga", country: "Spain" },
  { code: "ALC", name: "Alicante-Elche", city: "Alicante", country: "Spain" },
  { code: "VLC", name: "Valencia", city: "Valencia", country: "Spain" },
  { code: "SVQ", name: "Seville", city: "Seville", country: "Spain" },

  // Italy
  { code: "FCO", name: "Leonardo da Vinci-Fiumicino", city: "Rome", country: "Italy" },
  { code: "MXP", name: "Milan Malpensa", city: "Milan", country: "Italy" },
  { code: "LIN", name: "Milan Linate", city: "Milan", country: "Italy" },
  { code: "VCE", name: "Venice Marco Polo", city: "Venice", country: "Italy" },
  { code: "NAP", name: "Naples International", city: "Naples", country: "Italy" },
  { code: "BGY", name: "Milan Bergamo", city: "Bergamo", country: "Italy" },
  { code: "BLQ", name: "Bologna Guglielmo Marconi", city: "Bologna", country: "Italy" },

  // Germany
  { code: "FRA", name: "Frankfurt am Main", city: "Frankfurt", country: "Germany" },
  { code: "MUC", name: "Munich", city: "Munich", country: "Germany" },
  { code: "BER", name: "Berlin Brandenburg", city: "Berlin", country: "Germany" },
  { code: "DUS", name: "Düsseldorf", city: "Düsseldorf", country: "Germany" },
  { code: "HAM", name: "Hamburg", city: "Hamburg", country: "Germany" },
  { code: "STR", name: "Stuttgart", city: "Stuttgart", country: "Germany" },
  { code: "CGN", name: "Cologne Bonn", city: "Cologne", country: "Germany" },

  // Netherlands
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "EIN", name: "Eindhoven", city: "Eindhoven", country: "Netherlands" },

  // Belgium
  { code: "BRU", name: "Brussels", city: "Brussels", country: "Belgium" },
  { code: "CRL", name: "Brussels South Charleroi", city: "Charleroi", country: "Belgium" },

  // Switzerland
  { code: "ZRH", name: "Zurich", city: "Zurich", country: "Switzerland" },
  { code: "GVA", name: "Geneva", city: "Geneva", country: "Switzerland" },
  { code: "BSL", name: "Basel-Mulhouse-Freiburg", city: "Basel", country: "Switzerland" },

  // Austria
  { code: "VIE", name: "Vienna International", city: "Vienna", country: "Austria" },

  // Scandinavia
  { code: "CPH", name: "Copenhagen", city: "Copenhagen", country: "Denmark" },
  { code: "OSL", name: "Oslo Gardermoen", city: "Oslo", country: "Norway" },
  { code: "ARN", name: "Stockholm Arlanda", city: "Stockholm", country: "Sweden" },
  { code: "GOT", name: "Gothenburg Landvetter", city: "Gothenburg", country: "Sweden" },
  { code: "HEL", name: "Helsinki-Vantaa", city: "Helsinki", country: "Finland" },

  // Ireland
  { code: "DUB", name: "Dublin", city: "Dublin", country: "Ireland" },
  { code: "SNN", name: "Shannon", city: "Shannon", country: "Ireland" },
  { code: "ORK", name: "Cork", city: "Cork", country: "Ireland" },

  // Portugal
  { code: "LIS", name: "Lisbon Humberto Delgado", city: "Lisbon", country: "Portugal" },
  { code: "OPO", name: "Porto Francisco Sá Carneiro", city: "Porto", country: "Portugal" },
  { code: "FAO", name: "Faro", city: "Faro", country: "Portugal" },

  // Greece
  { code: "ATH", name: "Athens Eleftherios Venizelos", city: "Athens", country: "Greece" },
  { code: "SKG", name: "Thessaloniki Macedonia", city: "Thessaloniki", country: "Greece" },

  // Turkey
  { code: "IST", name: "Istanbul", city: "Istanbul", country: "Turkey" },
  { code: "SAW", name: "Istanbul Sabiha Gökçen", city: "Istanbul", country: "Turkey" },
  { code: "AYT", name: "Antalya", city: "Antalya", country: "Turkey" },

  // Eastern Europe
  { code: "WAW", name: "Warsaw Chopin", city: "Warsaw", country: "Poland" },
  { code: "KRK", name: "Kraków John Paul II", city: "Kraków", country: "Poland" },
  { code: "PRG", name: "Václav Havel Prague", city: "Prague", country: "Czech Republic" },
  { code: "BUD", name: "Budapest Ferenc Liszt", city: "Budapest", country: "Hungary" },
  { code: "OTP", name: "Henri Coandă Bucharest", city: "Bucharest", country: "Romania" },

  // Japan
  { code: "NRT", name: "Narita International", city: "Tokyo", country: "Japan" },
  { code: "HND", name: "Tokyo Haneda", city: "Tokyo", country: "Japan" },
  { code: "KIX", name: "Kansai International", city: "Osaka", country: "Japan" },
  { code: "ITM", name: "Osaka Itami", city: "Osaka", country: "Japan" },

  // China
  { code: "PEK", name: "Beijing Capital", city: "Beijing", country: "China" },
  { code: "PKX", name: "Beijing Daxing", city: "Beijing", country: "China" },
  { code: "PVG", name: "Shanghai Pudong", city: "Shanghai", country: "China" },
  { code: "SHA", name: "Shanghai Hongqiao", city: "Shanghai", country: "China" },
  { code: "CAN", name: "Guangzhou Baiyun", city: "Guangzhou", country: "China" },
  { code: "SZX", name: "Shenzhen Bao'an", city: "Shenzhen", country: "China" },

  // Hong Kong & Macau
  { code: "HKG", name: "Hong Kong International", city: "Hong Kong", country: "Hong Kong" },

  // South Korea
  { code: "ICN", name: "Incheon International", city: "Seoul", country: "South Korea" },
  { code: "GMP", name: "Gimpo International", city: "Seoul", country: "South Korea" },

  // Southeast Asia
  { code: "SIN", name: "Singapore Changi", city: "Singapore", country: "Singapore" },
  { code: "BKK", name: "Suvarnabhumi", city: "Bangkok", country: "Thailand" },
  { code: "DMK", name: "Don Mueang", city: "Bangkok", country: "Thailand" },
  { code: "KUL", name: "Kuala Lumpur International", city: "Kuala Lumpur", country: "Malaysia" },
  { code: "CGK", name: "Soekarno-Hatta International", city: "Jakarta", country: "Indonesia" },
  { code: "DPS", name: "Ngurah Rai International", city: "Bali", country: "Indonesia" },
  { code: "MNL", name: "Ninoy Aquino International", city: "Manila", country: "Philippines" },
  { code: "SGN", name: "Tan Son Nhat International", city: "Ho Chi Minh City", country: "Vietnam" },
  { code: "HAN", name: "Noi Bai International", city: "Hanoi", country: "Vietnam" },

  // India
  { code: "DEL", name: "Indira Gandhi International", city: "New Delhi", country: "India" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International", city: "Mumbai", country: "India" },
  { code: "BLR", name: "Kempegowda International", city: "Bangalore", country: "India" },
  { code: "MAA", name: "Chennai International", city: "Chennai", country: "India" },
  { code: "CCU", name: "Netaji Subhas Chandra Bose International", city: "Kolkata", country: "India" },
  { code: "HYD", name: "Rajiv Gandhi International", city: "Hyderabad", country: "India" },

  // Middle East
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "UAE" },
  { code: "AUH", name: "Abu Dhabi International", city: "Abu Dhabi", country: "UAE" },
  { code: "DOH", name: "Hamad International", city: "Doha", country: "Qatar" },
  { code: "RUH", name: "King Khalid International", city: "Riyadh", country: "Saudi Arabia" },
  { code: "JED", name: "King Abdulaziz International", city: "Jeddah", country: "Saudi Arabia" },
  { code: "BAH", name: "Bahrain International", city: "Manama", country: "Bahrain" },
  { code: "MCT", name: "Muscat International", city: "Muscat", country: "Oman" },
  { code: "AMM", name: "Queen Alia International", city: "Amman", country: "Jordan" },
  { code: "TLV", name: "Ben Gurion", city: "Tel Aviv", country: "Israel" },

  // Australia
  { code: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", country: "Australia" },
  { code: "MEL", name: "Melbourne Tullamarine", city: "Melbourne", country: "Australia" },
  { code: "BNE", name: "Brisbane", city: "Brisbane", country: "Australia" },
  { code: "PER", name: "Perth", city: "Perth", country: "Australia" },
  { code: "ADL", name: "Adelaide", city: "Adelaide", country: "Australia" },
  { code: "CBR", name: "Canberra", city: "Canberra", country: "Australia" },
  { code: "OOL", name: "Gold Coast", city: "Gold Coast", country: "Australia" },

  // New Zealand
  { code: "AKL", name: "Auckland", city: "Auckland", country: "New Zealand" },
  { code: "CHC", name: "Christchurch International", city: "Christchurch", country: "New Zealand" },
  { code: "WLG", name: "Wellington", city: "Wellington", country: "New Zealand" },
  { code: "ZQN", name: "Queenstown", city: "Queenstown", country: "New Zealand" },

  // Africa
  { code: "JNB", name: "O.R. Tambo International", city: "Johannesburg", country: "South Africa" },
  { code: "CPT", name: "Cape Town International", city: "Cape Town", country: "South Africa" },
  { code: "DUR", name: "King Shaka International", city: "Durban", country: "South Africa" },
  { code: "CAI", name: "Cairo International", city: "Cairo", country: "Egypt" },
  { code: "CMN", name: "Mohammed V International", city: "Casablanca", country: "Morocco" },
  { code: "NBO", name: "Jomo Kenyatta International", city: "Nairobi", country: "Kenya" },
  { code: "LOS", name: "Murtala Muhammed International", city: "Lagos", country: "Nigeria" },
  { code: "ADD", name: "Bole International", city: "Addis Ababa", country: "Ethiopia" },

  // Canada
  { code: "YYZ", name: "Toronto Pearson International", city: "Toronto", country: "Canada" },
  { code: "YVR", name: "Vancouver International", city: "Vancouver", country: "Canada" },
  { code: "YUL", name: "Montréal-Trudeau International", city: "Montreal", country: "Canada" },
  { code: "YYC", name: "Calgary International", city: "Calgary", country: "Canada" },
  { code: "YEG", name: "Edmonton International", city: "Edmonton", country: "Canada" },
  { code: "YOW", name: "Ottawa Macdonald-Cartier International", city: "Ottawa", country: "Canada" },
  { code: "YHZ", name: "Halifax Stanfield International", city: "Halifax", country: "Canada" },
  { code: "YWG", name: "Winnipeg James Armstrong Richardson International", city: "Winnipeg", country: "Canada" },

  // Mexico & Central America
  { code: "MEX", name: "Mexico City International", city: "Mexico City", country: "Mexico" },
  { code: "CUN", name: "Cancún International", city: "Cancún", country: "Mexico" },
  { code: "GDL", name: "Guadalajara International", city: "Guadalajara", country: "Mexico" },
  { code: "SJO", name: "Juan Santamaría International", city: "San José", country: "Costa Rica" },
  { code: "PTY", name: "Tocumen International", city: "Panama City", country: "Panama" },

  // South America
  { code: "GRU", name: "São Paulo-Guarulhos International", city: "São Paulo", country: "Brazil" },
  { code: "GIG", name: "Rio de Janeiro-Galeão International", city: "Rio de Janeiro", country: "Brazil" },
  { code: "EZE", name: "Ministro Pistarini International", city: "Buenos Aires", country: "Argentina" },
  { code: "BOG", name: "El Dorado International", city: "Bogotá", country: "Colombia" },
  { code: "SCL", name: "Arturo Merino Benítez International", city: "Santiago", country: "Chile" },
  { code: "LIM", name: "Jorge Chávez International", city: "Lima", country: "Peru" },
  { code: "UIO", name: "Mariscal Sucre International", city: "Quito", country: "Ecuador" },
  { code: "MVD", name: "Carrasco International", city: "Montevideo", country: "Uruguay" },

  // Caribbean
  { code: "MBJ", name: "Sangster International", city: "Montego Bay", country: "Jamaica" },
  { code: "NAS", name: "Lynden Pindling International", city: "Nassau", country: "Bahamas" },
  { code: "POS", name: "Piarco International", city: "Port of Spain", country: "Trinidad and Tobago" },
  { code: "BGI", name: "Grantley Adams International", city: "Bridgetown", country: "Barbados" },
  { code: "SJU", name: "Luis Muñoz Marín International", city: "San Juan", country: "Puerto Rico" },
];

export function searchAirports(query: string, limit = 8): Airport[] {
  if (!query || query.length < 1) return [];
  const q = query.toLowerCase();
  return airports
    .filter(
      (a) =>
        a.code.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q)
    )
    .slice(0, limit);
}

export function findAirportByCode(code: string): Airport | undefined {
  return airports.find((a) => a.code.toUpperCase() === code.toUpperCase());
}
