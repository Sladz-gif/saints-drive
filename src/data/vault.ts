export interface VaultSection {
  id: string;
  title: string;
  content: string;
  subsections?: VaultSubsection[];
}

export interface VaultSubsection {
  id: string;
  title: string;
  content: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  image?: string;
  imageCaption?: string;
}

export const vaultData: VaultSection[] = [
  {
    id: "executive-summary",
    title: "Executive Summary",
    content:
      "The global automotive landscape encompasses thousands of manufacturers (major, niche, defunct, and startups) and models across numerous segments. This report surveys worldwide brands and models; founding histories; iconic cars (sports, luxury, unique) and their cultural impact; vehicle specifications (ICE, hybrid, BEV, fuel cell, autonomous details); a timeline of key innovations; market segments, sales figures and competitors; regulatory/safety/emissions milestones; influential designers, engineers, and motorsport achievements; the current electric-vehicle (EV) ecosystem (manufacturers, battery tech, charging standards, range/cost data); and classic-car preservation and values. Major manufacturer groups (e.g. Toyota, VW, Stellantis, GM) own many marques. The automotive vault is organized into the above categories, with comparative tables and charts.",
  },
  {
    id: "global-brands",
    title: "Global Car Brands and Major Models",
    content:
      "Worldwide car brands (active and defunct) number in the thousands. Major global brands include Toyota (founded 1935), Volkswagen (1937), Ford (1903), GM (1908), Honda (1948), BMW (1916), Mercedes-Benz (1926), and numerous Chinese (e.g. BYD, Geely, SAIC), Indian (Tata, Mahindra), Korean (Hyundai-Kia), and emerging EV startups (Tesla 2003; Rivian 2009; Lucid 2007; NIO 2014; XPeng 2014). Defunct or legacy marques (e.g. Saturn, Oldsmobile, Saab, Plymouth, Studebaker) are also numerous.",
    subsections: [
      {
        id: "brand-table",
        title: "Notable Brands and Models",
        content: "A selection of notable brands and models spanning segments:",
        table: {
          headers: ["Brand (Country)", "Notable Models", "Segment / Type"],
          rows: [
            [
              "Toyota (Japan)",
              "Corolla (best-seller), Camry, Prius (hybrid pioneer), RAV4 (SUV), Hilux (truck)",
              "Economy/compact sedan, hybrid, SUV, truck",
            ],
            [
              "Volkswagen (Germany)",
              "Golf (compact), Passat (midsize), Beetle (historic), ID.4/ID.3 (EV), Touareg (SUV)",
              "Compact sedan, EV, SUV",
            ],
            [
              "Ford (USA)",
              "Model T (historic), F-150 (truck), Mustang (sport coupe), Explorer (SUV)",
              "Mass-market, pickup, muscle, SUV",
            ],
            [
              "GM (USA)",
              "Chevrolet Silverado (truck), Corvette (sports), Camaro (muscle), Bolt EV",
              "Truck, sports, muscle, EV",
            ],
            ["Honda (Japan)", "Civic, Accord, CR-V (SUV)", "Compact, midsize sedan, SUV"],
            [
              "Mercedes-Benz (Germany)",
              "S-Class, C-Class, G-Class (SUV), AMG variants",
              "Luxury sedan, SUV, high-performance",
            ],
            ["BMW (Germany)", "3 Series, 5 Series, X5 (SUV), iX/i4 (EV)", "Luxury sedan, SUV, EV"],
            [
              "Hyundai-Kia (Korea)",
              "Elantra, Sonata (sedans), Tucson, Sorento (SUVs), Ioniq 5/6 (EVs)",
              "Various",
            ],
            ["Tesla (USA, EV)", "Model S/3/X/Y, Cybertruck", "Premium EV sedan/SUV, EV pickup"],
            ["BYD (China, EV)", "Han, Atto 3, Tang, Dolphin (EVs)", "Mass-market EV sedans/SUVs"],
            ["Rivian (USA, EV trucks)", "R1T (truck), R1S (SUV)", "EV pickup, EV SUV"],
            ["Lucid (USA, EV)", "Air (luxury sedan)", "Luxury EV sedan"],
            ["Ferrari (Italy)", "488, F8, SF90 Stradale, LaFerrari", "Exotic sports cars"],
            ["Porsche (Germany)", "911, Cayenne (SUV), Taycan (EV)", "Sports car, SUV, EV"],
            [
              "Chevrolet (USA)",
              "Corvette, Camaro, Silverado, Malibu",
              "Muscle, sports, truck, sedan",
            ],
            [
              "Fiat-Chrysler-Stellantis (Global)",
              "500 (city car), Jeep Wrangler (SUV), Ram 1500 (truck), Dodge Charger (muscle)",
              "Varied",
            ],
            [
              "Renault-Nissan-Mitsubishi (Alliance)",
              "Renault Clio (compact), Nissan Leaf (EV), Mitsubishi Outlander",
              "Compact, EV, SUV",
            ],
          ],
        },
      },
      {
        id: "corporate-groups",
        title: "Major Corporate Groups",
        content:
          "Major manufacturer groups own many marques. Toyota Motor Corp encompasses sub-brands Lexus (luxury, 1989–present) and performance division GR. Nissan includes Infiniti (luxury) and forms an alliance with Renault/Mitsubishi. Global sales leaders fluctuate but historically include models like Toyota Corolla (world's best-selling model) and Ford F-Series. In 2026 (YTD Feb), Toyota Group led with ~13.4% share, VW Group ~10%, Hyundai–Kia ~8.9%.",
      },
    ],
  },
  {
    id: "brand-origins",
    title: "Brand Origins and Histories",
    content:
      "The automotive industry has rich origin stories spanning over a century of innovation.",
    subsections: [
      {
        id: "benz-daimler",
        title: "Benz & Daimler (Germany, 1880s)",
        content:
          "Karl Benz built the Patent-Motorwagen in 1885–86, considered the first practical automobile. Gottlieb Daimler and Wilhelm Maybach concurrently developed early petrol engines. These innovations led to Benz & Cie (later Mercedes-Benz) and Daimler Motoren Gesellschaft.",
      },
      {
        id: "ford",
        title: "Ford (USA, 1903)",
        content:
          "Henry Ford founded Ford Motor Company in 1903. His Model T (introduced 1908) revolutionized auto ownership by mass production. Ford's moving assembly line (1913) slashed production time, cutting the Model T's price from $825 (1909) to $260 by 1925, democratizing car ownership.",
      },
      {
        id: "toyota",
        title: "Toyota (Japan, 1937)",
        content:
          "Kiichiro Toyoda founded Toyota Motor Corp in 1937 as a spinoff of his father's loom company. Toyota's early models (AA sedan 1936) led to postwar growth. By the 1960s, Toyota had surged amid Japan's booming economy – notably launching the Corolla (1966), the world's all-time bestselling model. Toyota pioneered hybrids with the Prius (1997) and became the world's largest automaker (~10 million units/year).",
      },
      {
        id: "volkswagen",
        title: "Volkswagen (Germany, 1937)",
        content:
          "Originally established under the Nazi regime to build the 'people's car' (KdF-Wagen), Volkswagen launched the Beetle (Type 1) as an affordable mass car. Postwar, Volkswagen's global expansion made the Beetle an icon (over 21 million built). Today VW Group includes Audi, Porsche, and others, with diverse models from superminis to luxury sedans.",
      },
      {
        id: "other-origins",
        title: "Other Notable Origins",
        content:
          "BMW (1916 as Rapp Motorenwerke, auto division 1928), Mercedes-Benz (1926 merger of Benz & Daimler), General Motors (1908, William Durant; now Chevrolet, Buick, Cadillac, etc.), Renault (1899), Fiat (1899), Jaguar (1922 as Swallow; car company 1935), and countless others each have rich origin stories. Many startups and niche marques emerged through the 20th century (e.g. Lotus, TVR, Datsun/Nissan, Korean marques Hyundai/Kia), and in the 21st century electric-vehicle startups rose (Tesla 2003, BYD early 2000s, NIO 2014, etc.).",
      },
    ],
  },
  {
    id: "iconic-cars",
    title: "Iconic and Unique Cars (Cultural Impact)",
    content:
      "The car world has produced many legendary models that transcend transportation to become cultural icons.",
    subsections: [
      {
        id: "sports-luxury",
        title: "Sports/Luxury Icons",
        content:
          "Ferrari 250 GTO (1962, rare racing GT; multiple examples auctioned for ~$38–52 million), Lamborghini Miura (1966, first mid-engine supercar), Porsche 911 (1964–present, enduring sports coupe), Jaguar E-Type (1961, 'the most beautiful car' – Enzo Ferrari), Mercedes 300SL Gullwing (1954, famed for gullwing doors), Ford Mustang (1964, musketeer of U.S. muscle), Chevy Corvette (1953–present), etc.",
      },
      {
        id: "mass-market",
        title: "Mass-market Legends",
        content:
          "Ford Model T (1908, made cars affordable), VW Beetle (1938, iconic for its shape and ubiquity), Honda Civic (1972, one of the top-selling compacts globally), and Volkswagen Golf (1974, enduring hatchback best-seller).",
      },
      {
        id: "quirky-unique",
        title: "Quirky/Unique",
        content:
          "BMW Isetta ('bubble car' microcar, 1955), Reliant Robin (three-wheeler, UK comic infamy), Amphicar (1960s road/boat hybrid), Peel P50 (1962, Guinness-record smallest production car), Cadillac Eldorado (1959-1960, flamboyant fins), as well as commercial flops like the Pontiac Aztek or Edsel which became cultural touchpoints for market failure.",
      },
      {
        id: "pop-culture",
        title: "Concept & Pop Icons",
        content:
          "DeLorean DMC-12 (1981, for Back to the Future), Pontiac Trans Am (1970s, Smokey and the Bandit), and vehicles from movies/TV like the James Bond Aston Martin DB5, Knight Rider's Pontiac Firebird, etc., cementing cars in pop culture.",
      },
    ],
  },
  {
    id: "technical-specs",
    title: "Technical Specifications and Powertrains",
    content:
      "Cars are built on diverse architectures: front-, mid- or rear-engine; rear- or all-wheel drive; body-on-frame (trucks) or unibody (most cars). Key technical attributes vary by segment.",
    subsections: [
      {
        id: "engines",
        title: "Engines",
        content:
          "Early cars used primitive single-cylinder engines (e.g. Benz's 954 cc engine at ~0.5 kW). Modern ICE vehicles use multi-cylinder engines (inline-3 to V12) with displacements from ~1.0 L to 8.0 L or more. Turbocharging and direct fuel injection have become commonplace. Diesel engines (Rudolf Diesel, patented 1893) power many trucks and cars; modern turbo-diesels are common in Europe (e.g. Mercedes 300 d). Hybrid powertrains combine ICE with electric motors (e.g. Toyota Prius's 1.8 L Atkinson-cycle engine plus NiMH battery from 1997). Fuel-cell cars (e.g. Toyota Mirai, Hyundai Nexo) use hydrogen-to-electric power. Transmissions range from manual (up to 6–7 speeds) to automatic (8+ speeds, CVT, or dual-clutch) or none (single-speed in EVs).",
      },
      {
        id: "ev-powertrains",
        title: "Electric Powertrains",
        content:
          "BEVs use lithium-ion battery packs powering electric motors. Examples of current technologies: Tesla's vehicles have used various chemistries (NCA, NMC, LFP); BYD's Blade battery is a secure LFP design. Motor controllers and regenerative braking are standard. Platforms are often 'skateboard' chassis, integrating battery underfloor for rigidity. Charging capabilities vary: e.g. up to 800 V systems (Porsche Taycan/Hyundai Ioniq 5) allow very high DC charging rates (200+kW), while standard systems are 400 V (~150 kW).",
      },
      {
        id: "ev-comparison",
        title: "EV Range Comparison",
        content: "Approximate driving range and battery size for representative 2024–2025 BEVs:",
        table: {
          headers: [
            "Model (Year)",
            "Body Style",
            "Approx. EPA Range (mi)",
            "Battery Capacity (kWh)",
          ],
          rows: [
            ["Lucid Air Long Range (2025)", "Luxury Sedan", "400–500+", "~112–118"],
            ["Chevy Silverado EV RST (2025)", "Full-size Pickup", "~460", "~200+"],
            ["Tesla Model S Long Range (2025)", "Luxury Sedan", "410–430", "~100"],
            ["Rivian R1S (2023)", "3-row SUV", "410", "140"],
            ["Tesla Model 3 Long Range (2025)", "Sedan", "390–405", "80–82"],
            ["Hyundai Ioniq 6 Long Range (2025)", "Sedan", "340+", "77.4"],
            ["Tesla Model Y Long Range (2024)", "Compact SUV", "320–340", "75"],
            ["Chevy Equinox EV (2025)", "Compact SUV", "319", "85"],
          ],
        },
      },
    ],
  },
  {
    id: "innovation-timeline",
    title: "Timeline of Major Automotive Innovations",
    content:
      "Automotive technology has evolved dramatically. Key milestones include steam and electric prototypes in the 1800s, the first petrol car (Benz, 1886), mass production (Ford's assembly line, 1913), safety and comfort features (seat belts, airbags), emissions controls (catalytic converters in the 1970s), fuel efficiency (turbo and hybrid powertrains), and the 21st-century shift to electrification and autonomy.",
    subsections: [
      {
        id: "key-events",
        title: "Key Innovation Milestones",
        content:
          "1886: Benz Motorwagen (first auto) | 1908: Ford Model T / assembly line | 1936: Diesel engine (Mercedes) | 1959: Volvo 3-pt seatbelt (Bohlin) | 1975: Catalytic converter (USA mandate) | 1997: Toyota Prius (mass-market hybrid) | 1996-2003: GM EV1 (first modern BEV) | 2008: Tesla Roadster (production EV) | 2014: Toyota Mirai (fuel-cell car) | 2015: Level-2 Autopilot (Tesla) | 2018: Autonomous car license (Waymo) | 2035: EU zero-emission car mandate",
      },
      {
        id: "other-highlights",
        title: "Other Timeline Highlights",
        content:
          "The invention of rack-and-pinion steering (circa 1910s), disc brakes (1950s: Jaguar C-Type racing car), anti-lock brakes (early 1970s), airbags (first in 1970s, widespread by 1990s), Electronic Stability Control (1995+, mandated in many regions), GPS navigation (1990s), connectivity/infotainment, and gradual deployment of Level 3+ autonomous driving (2020s). Emission-control laws (catalytic converters from mid-1970s, Euro 1–6 standards) and safety regulations (crash tests, crashworthiness standards) have driven continuous tech changes.",
      },
    ],
  },
  {
    id: "market-segments",
    title: "Market Segments, Sales, and Competitors",
    content:
      "The automotive market is divided into segments: economy/minicars, subcompact/compact, midsize, premium/luxury, SUVs/CUVs, trucks/vans, sports/exotics, etc. Global new-car sales fluctuate around 80–90 million/year. Key markets: China (~30M/year), Europe (~15M), USA (~14M).",
    subsections: [
      {
        id: "sales-leaders",
        title: "Sales Leaders and Competitors",
        content:
          "In 2026 (YTD Feb), Toyota Group led with ~13.4% share, VW Group ~10%, Hyundai–Kia ~8.9%. Notable competitors include Ford vs GM in the U.S.; Toyota vs Honda in Asia; VW vs Stellantis in Europe; Tesla vs Chinese EV makers (BYD, SAIC) globally. By segment, Toyota's Corolla is often best-selling compact (Toyota sold >300 million Corollas since 1966). The Ford F-Series is perennially America's top pickup (over 40 million made). Luxury premiums compete (e.g. BMW 3-Series vs Mercedes C-Class). SUVs are now the dominant segment globally, eclipsing sedans.",
      },
      {
        id: "sales-strategies",
        title: "Sales Channels and Strategies",
        content:
          "Sales channels and strategies (e.g. financing, leasing) also shape markets. For example, Toyota's multi-brand strategy (Toyota/Daihatsu/Lexus) lets it target economy to luxury buyers, while alliances (e.g. Renault–Nissan–Mitsubishi) pool R&D and platforms. Upcoming competitors include tech firms (Apple Car rumors) and startups (Fisker, Faraday Future), though none yet as impactful as the market incumbents.",
      },
    ],
  },
  {
    id: "regulations",
    title: "Regulations, Safety, and Emissions",
    content:
      "Regulation has steadily tightened. Early safety measures (1930s: safety glass, seat belts) culminated in mandatory belts (USA 1968 federal law, EU later), airbags (became common in 1990s), and electronic systems (ABS, ESC mandated in many countries by 2010s).",
    subsections: [
      {
        id: "safety",
        title: "Safety Milestones",
        content:
          "Volvo introduced the modern three-point seatbelt in 1959 and generously made the patent free for all, improving global safety. Crash testing protocols (e.g. NCAP in Europe/USA) have incentivized safer designs. Additional milestones: child safety seats laws, side-impact protection, pedestrian safety features (e.g. pop-up hoods), and emissions-in-use checks (e.g. EU Real Driving Emissions tests).",
      },
      {
        id: "emissions",
        title: "Emissions Regulations",
        content:
          "In the US, the 1970 Clean Air Act mandated catalytic converters from 1975 onward. In Europe, the 'Euro' standards (Euro 1 in 1992 to Euro 6/6d today) progressively cut NOx/PM emissions from petrol and diesel cars. The latest Euro 6d (2020 update) uses on-road PEMS testing, and Euro 7 proposals (pending) aim to tighten limits further. Meanwhile, CO₂ emissions are regulated: the EU has set strict fleet-average CO₂ targets, culminating in a 2035 mandate that all new cars/vans sold be zero-emission. China and other markets are also pushing EV adoption through quotas or incentives. Fuel efficiency (mpg, liter/100 km) and greenhouse-gas rules have driven engine downsizing and hybridization.",
      },
    ],
  },
  {
    id: "designers-engineers",
    title: "Notable Designers, Engineers, and Motorsport Achievements",
    content:
      "Automotive design and engineering has iconic figures whose innovations shaped the industry.",
    subsections: [
      {
        id: "pioneers",
        title: "Pioneers",
        content:
          "Karl Benz (first car), Rudolf Diesel, Henry Ford (mass production techniques), Ferdinand Porsche (VW Beetle, later Porsche cars), Soichiro Honda, Enzo Ferrari, Ferruccio Lamborghini (Italian sports cars), Walter Chrysler, Kiichiro Toyoda, etc.",
      },
      {
        id: "designers",
        title: "Designers",
        content:
          "Battista 'Pinin' Farina (Pininfarina coachwork), Giorgetto Giugiaro (Italdesign; many 1960s–70s supercar and mass-market designs), Marcello Gandini (Lamborghini Miura, Countach), Ian Callum (Jaguar/Land Rover), etc. Their styling shaped automotive aesthetics.",
      },
      {
        id: "engineers",
        title: "Engineers",
        content:
          "Harry Ricardo (combustion engines), Charles Kettering (electric starter, 1912), Ignaz Schwinn (modern bicycle-based motorcycles), and modern innovators (Nikola Tesla's induction motor – namesake of EV company – although not directly automotive).",
      },
      {
        id: "motorsport",
        title: "Motorsport Achievements",
        content:
          "In motorsport (which drives technology and brand image), achievements are benchmarks: Ferrari leads F1 history, Porsche dominates Le Mans (19 wins), Audi introduced turbo-diesel LMP1s (R10 TDI won Le Mans 2006), Toyota, BMW, Nissan also won endurance titles. NASCAR and IndyCar define American racing (e.g. Ford and Chevy V8s). Rally legends (Subaru Impreza, Mitsubishi Lancer, Ford Focus) achieved championships in the '90s–2000s. Special models often commemorate racing: Ford GT40, Dodge Viper, etc. Motorsport success and engine championships (e.g. Red Bull and Mercedes in F1) raise brand profiles. Notably, Audi's R10 TDI became 'the first diesel-powered car to win the 24 Hours of Le Mans' in 2006, showcasing diesel efficiency. Engineers like Gordon Murray (designer of McLaren F1, 707 hp road car) and Burt Rutan (designer of the first private manned spacecraft/Virgin Galactic) have spurred innovation.",
      },
    ],
  },
  {
    id: "ev-landscape",
    title: "Electric Vehicle Landscape (2026)",
    content:
      "EVs are now a distinct market force. Over 17 million EVs were sold worldwide in 2024 (over 25% annual growth), roughly 20% of new car sales. China is the largest EV market (~11M units in 2024, ~2/3 of global EV sales); Europe and the US follow.",
    subsections: [
      {
        id: "ev-manufacturers",
        title: "Major EV Manufacturers",
        content:
          "Major EV manufacturers include Tesla, BYD, Volkswagen Group (with ID, Audi e-tron, Porsche Taycan), GM (Chevy Bolt, upcoming Ultium trucks), Hyundai/Kia (IONIQ, E-GMP platform), Stellantis (various EVs across brands), and new Chinese entrants (NIO, XPeng, Li Auto). Many legacy automakers have pledged major EV investments (e.g. VW's 'Roadmap E', GM's EV programs, Ford's $30B+ EV plan).",
      },
      {
        id: "battery-tech",
        title: "Battery Technology",
        content:
          "Lithium-ion remains dominant. Variants include nickel-rich cathodes (NCA, NMC) for energy density, and LFP (LiFePO₄) for cost/safety. China has aggressively adopted LFP for cheaper mass-market EVs, and Tesla's expansion of LFP is noted in the US context. Solid-state batteries are in development but not yet commercial. Major cell producers are CATL, LG Chem, Panasonic, SKI, Samsung SDI, etc. Battery capacity is rising (100 kWh+ in top-range models), enabling 300–400+ mi ranges.",
      },
      {
        id: "charging-standards",
        title: "Charging Standards",
        content:
          "AC charging: North America uses SAE J1772 (single/three-phase AC) while Europe uses Type 2 (Mennekes) for AC. DC fast-charging: Europe and USA primarily use CCS Combo (CCS2); Japan long used CHAdeMO. Tesla's North American Charging Standard (NACS) has become dominant in the US: Tesla's Supercharger network is the largest DC network, and other networks (EVgo, ChargePoint) are converting to NACS plugs. Europe, however, legally mandates CCS2 for public fast-charging. China uses its own GB/T standard (now switching to the CCS2 for some foreign EVs). Power levels reach 250 kW–350 kW at stations like Electrify America or Ionity; Tesla's Superchargers deliver up to ~250 kW (V3). Typical added range per 10 min charge is ~100 km for modern systems.",
      },
      {
        id: "range-cost",
        title: "Range and Cost",
        content:
          "EV ranges have rapidly increased. Mid-range EVs (prices $35–55k) now often achieve 250–320 miles, while higher-end ($55k+) frequently exceed 300 miles. For example, the Tesla Model 3 Long Range (80–82 kWh) achieves ~390–405 mi. Battery costs are falling (below $100/kWh for some OEMs) but remain a major factor; smaller EVs (<$35k) often have shorter range (~200–270 mi). Total cost of ownership (including fuel savings and incentives) is becoming comparable to ICE vehicles in some markets.",
      },
      {
        id: "charging-network",
        title: "Charging Network",
        content:
          "As of 2025, there are an estimated 2 million public chargers globally (including home EVSE not counted). IEA projects >10 million charging points needed by 2030 for widespread EV adoption. Wireless charging and V2G (vehicle-to-grid) are emerging experiments but not yet mainstream.",
      },
    ],
  },
  {
    id: "preservation",
    title: "Preservation, Collectors, and Restoration",
    content:
      "Classic and vintage cars form a vibrant collector subculture. Organizations like the Classic Car Club of America and events (e.g. Pebble Beach Concours, Goodwood Revival) celebrate automotive heritage.",
    subsections: [
      {
        id: "collector-market",
        title: "Collector Market",
        content:
          "The Historic Automobile Group International (HAGI) tracks collector car values via indices: their HAGI Top Index covers the overall market, and marque-specific indices (e.g. HAGI Porsche Index, HAGI Ferrari Index) measure segments. Auction records underscore high values: e.g. a 1955 Mercedes‑Benz 300 SLR 'Uhlenhaut' coupe sold in May 2022 for €135 million, the most for any car. Several Ferrari 250 GTOs have sold between ~$38–52M. These record prices far exceed original new prices, making certain classics alternative investments. Even restored everyday classics (vintage Mustangs, VW Beetles, etc.) command strong prices (though <$100k generally), and parts/restoration services are a robust industry.",
      },
      {
        id: "museums-clubs",
        title: "Museums and Car Clubs",
        content:
          "Museums (e.g. Petersen, Cité de l'Automobile, Henry Ford Museum) preserve exemplars. Car clubs facilitate parts exchanges and expertise-sharing for restorers. The collector market also sees booms/busts tied to economic cycles and tastes. Recent trends include younger collectors entering (often via vintage racing series), and digitization (blockchain authentication of history). Nonetheless, scarcity, provenance, and historical significance remain prime value drivers.",
      },
    ],
  },
  {
    id: "references",
    title: "References and Data Sources",
    content:
      "This vault draws on industry and historical sources: automotive industry associations (ACEA, IEA), manufacturers' reports, and reputable publications. Key citations include IEA's Global EV Outlook 2025, ACEA factsheets on emissions, Wikipedia (brand lists, inventor biographies, auction records), and industry news (Focus2Move sales data). Data gaps (e.g. up-to-the-minute sales figures by model) are noted where applicable. This overview aims to be comprehensive; nevertheless, the automotive field is vast, and readers are encouraged to consult the cited sources for deeper details.",
  },
];
