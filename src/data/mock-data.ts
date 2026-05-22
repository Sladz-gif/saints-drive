// Mock data for Saints Garage. Real DB to come.

export type Vehicle = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number; // GHS
  location: string;
  km: number;
  engine: string;
  horsepower: number;
  torque: number;
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  transmission: string;
  drive: "FWD" | "RWD" | "AWD" | "4WD";
  body: "Sedan" | "SUV" | "Coupe" | "Pickup" | "Hatchback" | "Van";
  condition: "Brand New" | "Foreign Used" | "Ghana Used";
  image: string;
  featured?: boolean;
  listedDays?: number;
  features?: string[];
  color?: string;
  seats?: number;
  importSource?: string;
  roadworthy?: string;
  fuelEconomy?: string;
  topSpeed?: string;
  acceleration?: string;
};

export type Auction = {
  id: string;
  slug: string;
  title: string;
  image: string;
  startBid: number;
  currentBid: number;
  bidCount: number;
  endsAt: number; // ms timestamp
  status: "upcoming" | "live" | "ending" | "ended";
  reserve?: number;
  conditionGrade?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags?: string[];
};

// Image URLs from Unsplash (CC0 - no attribution required)
export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80",
  "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1920&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80",
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80",
];

const img = (i: number) => HERO_IMAGES[i % HERO_IMAGES.length];

export const VEHICLES: Vehicle[] = [
  {
    id: "v1",
    slug: "2022-bmw-530i-m-sport",
    title: "2022 BMW 530i M Sport",
    brand: "BMW",
    model: "5 Series",
    year: 2022,
    price: 195000,
    location: "East Legon, Accra",
    km: 41200,
    engine: "2.0L TwinPower Turbo Inline-4",
    horsepower: 252,
    torque: 350,
    fuel: "Petrol",
    transmission: "8-Speed Steptronic Automatic",
    drive: "RWD",
    body: "Sedan",
    condition: "Foreign Used",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    featured: true,
    listedDays: 3,
    color: "Alpine White",
    seats: 5,
    importSource: "Japan",
    roadworthy: "Valid",
    fuelEconomy: "6.5L / 100km",
    topSpeed: "250 km/h",
    acceleration: "6.1 seconds",
    features: [
      "Panoramic Sunroof",
      "Leather Seats",
      "Apple CarPlay",
      "Android Auto",
      "Reverse Camera",
      "Parking Sensors",
      "Navigation",
      "Ambient Lighting",
      "Keyless Entry",
      "Push Start",
      "Heated Seats",
    ],
  },
  {
    id: "v2",
    slug: "2019-mercedes-benz-e300-amg-line",
    title: "2019 Mercedes-Benz E300 AMG Line",
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2019,
    price: 220000,
    location: "Cantonments, Accra",
    km: 62400,
    engine: "2.0L Turbocharged Inline-4",
    horsepower: 241,
    torque: 370,
    fuel: "Petrol",
    transmission: "9G-Tronic Automatic",
    drive: "RWD",
    body: "Sedan",
    condition: "Foreign Used",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    featured: false,
    listedDays: 7,
    color: "Obsidian Black Metallic",
    seats: 5,
    importSource: "Germany",
    roadworthy: "Valid",
    fuelEconomy: "7.1L / 100km",
    topSpeed: "240 km/h",
    acceleration: "6.6 seconds",
    features: [
      "Panoramic Sunroof",
      "Burmester Sound",
      "Leather Seats",
      "Apple CarPlay",
      "360-Degree Camera",
      "Parking Sensors",
      "Navigation",
      "Ambient Lighting",
      "Keyless Entry",
      "Heated & Ventilated Seats",
    ],
  },
  {
    id: "v3",
    slug: "2020-lexus-rx-350-f-sport",
    title: "2020 Lexus RX 350 F-Sport",
    brand: "Lexus",
    model: "RX",
    year: 2020,
    price: 245000,
    location: "Airport Residential, Accra",
    km: 38900,
    engine: "3.5L V6",
    horsepower: 295,
    torque: 359,
    fuel: "Petrol",
    transmission: "8-Speed Automatic",
    drive: "AWD",
    body: "SUV",
    condition: "Foreign Used",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    featured: false,
    listedDays: 5,
    color: "Obsidian Black",
    seats: 5,
    importSource: "Japan",
    roadworthy: "Valid",
    fuelEconomy: "9.8L / 100km",
    topSpeed: "200 km/h",
    acceleration: "7.7 seconds",
    features: [
      "Mark Levinson Audio",
      "Sunroof",
      "Leather Seats",
      "Apple CarPlay",
      "360 Camera",
      "Heads-Up Display",
      "Parking Sensors",
      "Navigation",
      "Blind Spot Monitor",
      "Keyless Entry",
    ],
  },
  {
    id: "v4",
    slug: "2017-toyota-land-cruiser-v8-200-series",
    title: "2017 Toyota Land Cruiser V8 200 Series",
    brand: "Toyota",
    model: "Land Cruiser",
    year: 2017,
    price: 310000,
    location: "Tema, Greater Accra",
    km: 88200,
    engine: "4.5L Twin-Turbo Diesel V8",
    horsepower: 261,
    torque: 650,
    fuel: "Diesel",
    transmission: "6-Speed Automatic",
    drive: "4WD",
    body: "SUV",
    condition: "Foreign Used",
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80",
    featured: false,
    listedDays: 12,
    color: "Pearl White",
    seats: 8,
    importSource: "Japan",
    roadworthy: "Valid",
    fuelEconomy: "13.2L / 100km",
    topSpeed: "210 km/h",
    acceleration: "7.5 seconds",
    features: [
      "Sunroof",
      "Leather Seats",
      "Multi-Terrain Monitor",
      "Crawl Control",
      "Reverse Camera",
      "Parking Sensors",
      "Navigation",
      "Heated Seats",
      "DVD",
    ],
  },
  {
    id: "v5",
    slug: "2021-porsche-cayenne-s",
    title: "2021 Porsche Cayenne S",
    brand: "Porsche",
    model: "Cayenne",
    year: 2021,
    price: 480000,
    location: "Cantonments, Accra",
    km: 22100,
    engine: "2.9L Twin-Turbo V6",
    horsepower: 434,
    torque: 550,
    fuel: "Petrol",
    transmission: "8-Speed Tiptronic S",
    drive: "AWD",
    body: "SUV",
    condition: "Foreign Used",
    image: "https://images.unsplash.com/photo-1627454822893-73f47e0d1b5f?w=800&q=80",
    featured: true,
    listedDays: 2,
    color: "Rhodium Silver Metallic",
    seats: 5,
    importSource: "Germany",
    roadworthy: "Valid",
    fuelEconomy: "10.6L / 100km",
    topSpeed: "264 km/h",
    acceleration: "5.1 seconds",
    features: [
      "Sport Chrono Package",
      "Bose Surround Sound",
      "Air Suspension",
      "Panoramic Sunroof",
      "14-Way Power Seats",
      "Heated/Ventilated Seats",
      "Apple CarPlay",
      "Night Vision Assist",
      "360 Camera",
    ],
  },
  {
    id: "v6",
    slug: "2018-toyota-camry-se-2-5l",
    title: "2018 Toyota Camry SE 2.5L",
    brand: "Toyota",
    model: "Camry",
    year: 2018,
    price: 82000,
    location: "Spintex Road, Accra",
    km: 71300,
    engine: "2.5L DOHC 4-Cylinder",
    horsepower: 203,
    torque: 245,
    fuel: "Petrol",
    transmission: "8-Speed Automatic",
    drive: "FWD",
    body: "Sedan",
    condition: "Foreign Used",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
    featured: false,
    listedDays: 15,
    color: "Midnight Black Metallic",
    seats: 5,
    importSource: "USA",
    roadworthy: "Valid",
    fuelEconomy: "8.4L / 100km",
    features: [
      "Reverse Camera",
      "Apple CarPlay",
      "Android Auto",
      "Parking Sensors",
      "Leather Seats",
      "Keyless Entry",
      "Push Start",
      "Dual-Zone AC",
    ],
  },
  {
    id: "v7",
    slug: "2020-range-rover-sport-hse-dynamic",
    title: "2020 Range Rover Sport HSE Dynamic",
    brand: "Land Rover",
    model: "Range Rover Sport",
    year: 2020,
    price: 390000,
    location: "East Legon, Accra",
    km: 44800,
    engine: "3.0L Supercharged V6",
    horsepower: 355,
    torque: 461,
    fuel: "Petrol",
    transmission: "8-Speed Automatic",
    drive: "AWD",
    body: "SUV",
    condition: "Foreign Used",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    featured: true,
    listedDays: 4,
    color: "Santorini Black Premium Metallic",
    seats: 7,
    importSource: "UK",
    roadworthy: "Valid",
    fuelEconomy: "11.5L / 100km",
    topSpeed: "225 km/h",
    acceleration: "5.7 seconds",
    features: [
      "Meridian Sound System",
      "Panoramic Sunroof",
      "Activity Key",
      "Wade Sensing",
      "Terrain Response 2",
      "Apple CarPlay",
      "Heated/Cooled Front Seats",
      "Head-Up Display",
      "360 Camera",
    ],
  },
  {
    id: "v8",
    slug: "2015-toyota-vitz-1-0l-f-grade",
    title: "2015 Toyota Vitz 1.0L F Grade",
    brand: "Toyota",
    model: "Vitz",
    year: 2015,
    price: 28500,
    location: "Madina, Accra",
    km: 62000,
    engine: "1.0L 3-Cylinder",
    horsepower: 69,
    torque: 93,
    fuel: "Petrol",
    transmission: "CVT Automatic",
    drive: "FWD",
    body: "Hatchback",
    condition: "Foreign Used",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
    featured: false,
    listedDays: 22,
    color: "Pearl White",
    seats: 5,
    importSource: "Japan",
    roadworthy: "Valid",
    fuelEconomy: "4.2L / 100km (approx 23 km/L)",
    features: ["Reverse Camera", "Bluetooth Audio", "Fabric Seats", "A/C"],
  },
  {
    id: "v9",
    slug: "2019-ford-ranger-wildtrak-3-2l",
    title: "2019 Ford Ranger Wildtrak 3.2L",
    brand: "Ford",
    model: "Ranger",
    year: 2019,
    price: 145000,
    location: "Kumasi, Ashanti Region",
    km: 58400,
    engine: "3.2L 5-Cylinder Turbo Diesel",
    horsepower: 197,
    torque: 470,
    fuel: "Diesel",
    transmission: "6-Speed Automatic",
    drive: "4WD",
    body: "Pickup",
    condition: "Foreign Used",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    featured: false,
    listedDays: 9,
    color: "Saber Orange Metallic",
    seats: 5,
    importSource: "UK",
    roadworthy: "Valid",
    fuelEconomy: "10.5L / 100km",
    features: [
      "Bi-Xenon Headlights",
      '18" Alloys',
      "Sync 3 Infotainment",
      "Reverse Camera",
      "Terrain Management",
      "Roll Bar",
      "Side Steps",
    ],
  },
  {
    id: "v10",
    slug: "2022-hyundai-tucson-1-6t-elite",
    title: "2022 Hyundai Tucson 1.6T Elite",
    brand: "Hyundai",
    model: "Tucson",
    year: 2022,
    price: 118000,
    location: "East Legon, Accra",
    km: 24300,
    engine: "1.6L Turbocharged 4-Cylinder",
    horsepower: 178,
    torque: 265,
    fuel: "Petrol",
    transmission: "7-Speed DCT Automatic",
    drive: "AWD",
    body: "SUV",
    condition: "Foreign Used",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
    featured: false,
    listedDays: 6,
    color: "Phantom Black Pearl",
    seats: 5,
    importSource: "South Korea",
    roadworthy: "Valid",
    fuelEconomy: "8.1L / 100km",
    features: [
      "SmartSense Safety Suite",
      "Wireless CarPlay",
      "Bose Sound",
      "Panoramic Sunroof",
      "Heated Steering Wheel",
      "Rear View Camera",
    ],
  },
];

export const FEATURED_VEHICLES = VEHICLES.filter((v) => v.featured);

export const BRANDS = [
  "BMW",
  "Mercedes-Benz",
  "Toyota",
  "Lexus",
  "Honda",
  "Ford",
  "Rolls-Royce",
  "Porsche",
  "Audi",
  "Nissan",
  "Hyundai",
  "Kia",
  "Land Rover",
  "Jeep",
  "Volkswagen",
  "Mazda",
];

export const PURPOSES = [
  { slug: "uber-bolt", title: "Uber / Bolt", tag: "Profit on every trip", image: img(0) },
  { slug: "tough-roads", title: "Tough Roads", tag: "Built for the back roads", image: img(1) },
  { slug: "fuel-saving", title: "Fuel Saving", tag: "Stretch every cedi", image: img(2) },
  { slug: "family", title: "Family", tag: "Safe, spacious, reliable", image: img(0) },
  { slug: "luxury", title: "Luxury", tag: "Arrive with intention", image: img(1) },
  { slug: "logistics", title: "Logistics", tag: "Move goods, move markets", image: img(2) },
];

const now = Date.now();
export const AUCTIONS: Auction[] = [
  {
    id: "a1",
    slug: "2018-honda-cr-v-1-5t-ex-l",
    title: "2018 Honda CR-V 1.5T EX-L",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
    startBid: 55000,
    currentBid: 62000,
    bidCount: 18,
    endsAt: now + 1000 * 60 * 60 * 2 + 1000 * 60 * 14 + 1000 * 33,
    status: "live",
    conditionGrade: "B (minor scratch rear bumper)",
  },
  {
    id: "a2",
    slug: "2019-mercedes-benz-e300-amg-line",
    title: "2019 Mercedes-Benz E300 AMG Line",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    startBid: 130000,
    currentBid: 164000,
    bidCount: 34,
    endsAt: now + 1000 * 60 * 14 + 1000 * 22,
    status: "ending",
    reserve: 185000,
    conditionGrade: "A",
  },
  {
    id: "a3",
    slug: "2016-toyota-alphard-executive-lounge",
    title: "2016 Toyota Alphard Executive Lounge",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    startBid: 100000,
    currentBid: 118500,
    bidCount: 9,
    endsAt: now + 1000 * 60 * 60 * 5 + 1000 * 60 * 40 + 1000 * 7,
    status: "live",
    conditionGrade: "B+",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "best-cars-uber-bolt-ghana-2025",
    title: "5 Best Cars for Uber and Bolt in Ghana (2025 Guide)",
    excerpt: "Not all cars make money on Bolt. We ran the numbers so you don't have to.",
    category: "Buying Guide",
    author: "Saints Garage Editorial",
    date: "January 3, 2025",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
    tags: ["uber", "bolt", "toyota", "honda", "kia", "fuel economy", "ghana"],
    content: `
      <p>The ride-hailing market in Ghana has matured significantly since Uber and Bolt entered the scene. What started as a side hustle for many has become a primary income source for thousands of drivers across Accra, Kumasi, and Takoradi.</p>
      
      <p>But here's the reality: not every car makes money on these platforms. Fuel costs, maintenance, and platform commissions can eat into your earnings faster than you realize. We've analyzed data from over 500 active drivers to bring you the definitive guide to profitable ride-hailing in Ghana.</p>
      
      <h2>The Economics of Ride-Hailing</h2>
      <p>Before we dive into specific vehicles, let's establish the baseline. Our data shows that the average driver in Accra works 10 hours per day, 6 days per week. With current fuel prices averaging GHS 14.5 per liter and platform commissions at 20%, your vehicle choice becomes the single most important factor in your profitability.</p>
      
      <h3>Rank #1: Toyota Vitz (2013–2018)</h3>
      <p>The Toyota Vitz dominates Ghanaian ride-hailing for one reason: it's virtually indestructible and incredibly cheap to run. With fuel economy ranging from 20–23 km/L, you'll spend significantly less at the pump than competitors driving larger vehicles.</p>
      <p>Parts are available at every corner in Abossey Okai, and every mechanic in Ghana knows how to work on it. When something breaks—and it will, given Accra's roads—you're back on the road within 24 hours.</p>
      
      <h3>Rank #2: Kia Picanto (2015–2020)</h3>
      <p>The Picanto offers slightly more modern styling than the Vitz while maintaining excellent fuel economy at 18–21 km/L. Its compact size makes it perfect for navigating tight spaces in busy areas like Osu and Madina.</p>
      <p>While parts are slightly less ubiquitous than Toyota parts, they're still readily available and reasonably priced. The Picanto also holds its value well, making resale easier when you're ready to upgrade.</p>
      
      <h3>Rank #3: Honda Fit / Jazz (2013–2018)</h3>
      <p>The Honda Fit's Magic Seat system is a game-changer for ride-hailing. The versatile interior allows you to handle everything from single passengers to small groups with luggage. Fuel economy at 16–18 km/L is respectable, and Honda's reputation for reliability holds true in Ghana.</p>
      
      <h2>The Bottom Line</h2>
      <p>Choose based on your priorities. If pure profitability is your goal, the Toyota Vitz is unmatched. If you want slightly more modern features and don't mind marginally higher running costs, the Kia Picanto is an excellent choice. For versatility and passenger comfort, the Honda Fit stands out.</p>
    `,
  },
  {
    id: "b2",
    slug: "how-to-detect-bad-transmission-used-car-ghana",
    title: "How to Spot a Bad Transmission Before You Buy",
    excerpt: "That smooth-talking dealer won't tell you. We will.",
    category: "Maintenance",
    author: "Saints Garage Editorial",
    date: "December 28, 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200&q=80",
    tags: ["maintenance", "transmission", "buying tips", "ghana"],
    content: `
      <p>A failing transmission is one of the most expensive repairs you can face as a car owner in Ghana. Rebuilding or replacing a transmission can cost anywhere from GHS 8,000 to GHS 25,000 depending on the vehicle—and that's if you can find the parts.</p>
      
      <p>Dealers know this, and they're experts at masking transmission issues during test drives. Here's how to spot the red flags before you hand over your money.</p>
      
      <h2>The Test Drive Protocol</h2>
      <p>Never accept a test drive that's less than 15 minutes. Transmission issues often don't appear until the transmission is fully warmed up. Insist on driving through varied conditions: highway speeds, stop-and-go traffic, and inclines.</p>
      
      <h3>Listen for These Sounds</h3>
      <p><strong>Whining:</strong> A high-pitched whine that increases with speed often indicates worn bearings in the transmission. This is particularly common in vehicles with high mileage that have been used for commercial purposes.</p>
      <p><strong>Clunking:</strong> A clunk when shifting from park to drive or between gears suggests worn mounts or internal damage. This is especially concerning in automatic transmissions.</p>
      <p><strong>Slipping:</strong> If the engine revs but the car doesn't accelerate proportionally, the transmission is slipping. This is a critical failure that requires immediate attention.</p>
      
      <h2>Check the Fluid</h2>
      <p>Transmission fluid should be bright red or pink and have a slightly sweet smell. If it's dark brown or smells burnt, the transmission has been running hot—likely due to lack of maintenance or underlying issues.</p>
      
      <p>Ask the dealer when the transmission fluid was last changed. If they don't know or claim it's "lifetime fluid," walk away. No fluid lasts forever in Ghana's climate.</p>
      
      <h2>The Ghana-Specific Red Flags</h2>
      <p>Many used cars imported into Ghana have been used as taxis or commercial vehicles abroad. These vehicles often have transmission damage from constant stop-and-go driving and heavy loads.</p>
      <p>Check the odometer against the vehicle's overall condition. A 2018 car with 80,000 km but heavily worn interior and pedal covers likely has much higher mileage—and the transmission has taken a beating.</p>
    `,
  },
  {
    id: "b3",
    slug: "bmw-vs-toyota-ghana-comparison",
    title: "BMW vs Toyota: Which Is Actually Better for Ghana?",
    excerpt: "Toyota wins on reliability. BMW wins on driving joy. Which one fits your life?",
    category: "Comparisons",
    author: "Saints Garage Editorial",
    date: "December 15, 2024",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&q=80",
    tags: ["bmw", "toyota", "comparison", "ghana", "maintenance"],
    content: `
      <p>This is the debate that divides car enthusiasts across Ghana: Toyota or BMW? Toyota owners swear by reliability and low maintenance costs. BMW owners argue that driving enjoyment shouldn't be sacrificed for practicality.</p>
      
      <p>Both have merit, but the right choice depends entirely on your circumstances, budget, and priorities. Let's break down the comparison specifically for the Ghanaian context.</p>
      
      <h2>Reliability: Toyota's Home Court</h2>
      <p>Toyota wins this category hands down, and it's not even close. Toyota vehicles are designed with simplicity and durability in mind. The engines are understressed, the components are overbuilt, and the systems are straightforward.</p>
      
      <p>In Ghana, this translates to several advantages:</p>
      <ul>
        <li>Parts are available everywhere from Abossey Okai to regional capitals</li>
        <li>Every mechanic can work on a Toyota—no specialists needed</li>
        <li>Resale value remains strong due to widespread trust in the brand</li>
        <li>Fuel tolerance is excellent—most models run fine on regular RON 91 fuel</li>
      </ul>
      
      <h2>Driving Dynamics: BMW's Strength</h2>
      <p>Where Toyota prioritizes reliability, BMW prioritizes the driving experience. BMW's are engineered to provide exceptional handling, responsive steering, and engaging power delivery. The famous "Ultimate Driving Machine" tagline isn't just marketing.</p>
      
      <p>For drivers who enjoy the act of driving, a BMW offers an experience that no Toyota can match. The steering is more communicative, the chassis is more composed, and the power delivery is more immediate.</p>
      
      <h2>Maintenance Costs: The Reality Gap</h2>
      <p>This is where the comparison gets interesting for Ghanaian buyers. BMW maintenance costs are significantly higher than Toyota's, but the gap isn't as large as many assume.</p>
      
      <p>BMW parts are more expensive, but they're readily available in Accra through certified dealers and specialist garages. The real issue is complexity—BMW's have more systems that can fail, and when they do, they require specialized knowledge to repair.</p>
      
      <p>For a Toyota, you can visit any mechanic in any town. For a BMW, you're better off sticking to specialists in major cities.</p>
      
      <h2>The Verdict</h2>
      <p>If your priority is minimizing total cost of ownership and maximizing reliability, buy a Toyota. You'll spend less on maintenance, have more repair options, and face fewer unexpected issues.</p>
      
      <p>If driving enjoyment is a priority and you have the budget for higher maintenance costs, a BMW will reward you with an experience that no Toyota can provide. Just budget accordingly and build a relationship with a trusted BMW specialist.</p>
      
      <p>For most Ghanaians, Toyota remains the practical choice. But for those who can afford it and value driving dynamics above all else, BMW offers something special that Toyota simply cannot match.</p>
    `,
  },
];

export const ENGINES = [
  {
    name: "2JZ-GTE",
    displacement: "3.0L (2,997cc)",
    configuration: "Inline-6, Twin-Turbo, DOHC, 24-valve",
    born: 1991,
    featuredIn: "Toyota Supra A80, Lexus IS300/GS300, Toyota Aristo",
    stockPower: "320 hp / 431 Nm torque",
    tunedCeiling: "1,000 hp+ on stock block with supporting mods",
    redline: "7,000 rpm stock / 8,000 rpm on built engine",
    tagline: "The bulletproof straight-six.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
  },
  {
    name: "RB26DETT",
    displacement: "2.6L (2,568cc)",
    configuration: "Inline-6, Twin-Turbo, DOHC, 24-valve",
    born: 1989,
    featuredIn: "Nissan Skyline GT-R R32, R33, R34",
    stockPower: "276 hp (actual: ~330 hp)",
    tunedCeiling: "800 hp+ on stock block / 1,200 hp+ fully built",
    redline: "8,000 rpm",
    tagline: "The Godzilla powerplant.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
  },
  {
    name: "GM LS V8 (LS3 / LS7)",
    displacement: "6.2L LS3 / 7.0L LS7",
    configuration: "V8, Pushrod OHV, 2-valve per cylinder",
    born: 1997,
    featuredIn: "Chevrolet Corvette, Camaro SS/Z28, GTO",
    stockPower: "LS3: 430 hp / LS7: 505 hp",
    tunedCeiling: "LS3: 700+ hp / LS7: 1,000 hp+ race build",
    redline: "LS3: 6,600 rpm / LS7: 7,100 rpm",
    tagline: "The everyman's miracle.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
  },
  {
    name: "Honda K20 (K20A / K20Z)",
    displacement: "2.0L (1,998cc)",
    configuration: "Inline-4, VTEC, DOHC, 16-valve",
    born: 2001,
    featuredIn:
      "Honda Civic Type R (EP3, FN2), Integra Type R (DC5), Honda Accord Euro R, RSX Type S",
    stockPower: "K20A: 212 hp / K20C1 (FK8): 316 hp (Turbo)",
    tunedCeiling: "K20 NA: 280 hp / K20C turbo: 450+ hp",
    redline: "K20A: 8,400 rpm",
    tagline: "VTEC kicked in, yo.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
  },
];

export const RENTALS = [
  {
    id: "r1",
    vehicle: "2021 Mercedes-Benz S-Class S500",
    category: "Luxury / Corporate",
    dailyRate: 2200,
    weeklyRate: 13000,
    monthlyRate: 48000,
    deposit: 5000,
    minDays: 1,
    driverAvailable: true,
    driverDailyRate: 400,
    locations: ["Airport", "Accra CBD", "East Legon"],
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
  },
  {
    id: "r2",
    vehicle: "2022 Range Rover Vogue LWB",
    category: "Luxury / Wedding",
    dailyRate: 3500,
    weeklyRate: 20000,
    deposit: 8000,
    minDays: 1,
    driverIncluded: true,
    locations: ["All Accra"],
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
  },
  {
    id: "r3",
    vehicle: "2020 Toyota Camry XSE",
    category: "Airport Pickup / Daily",
    dailyRate: 650,
    weeklyRate: 3800,
    monthlyRate: 13500,
    deposit: 500,
    minDays: 1,
    driverAvailable: true,
    driverDailyRate: 200,
    locations: ["Kotoka International Airport", "Accra CBD"],
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
  },
  {
    id: "r4",
    vehicle: "2019 Toyota Land Cruiser Prado",
    category: "Family / Tough Roads / Monthly",
    dailyRate: 1100,
    monthlyRate: 22000,
    deposit: 2500,
    minDays: 3,
    driverAvailable: true,
    driverDailyRate: 250,
    locations: ["Accra CBD", "Kumasi", "Tamale"],
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80",
  },
];

export const PURPOSE_CONTENT = {
  "uber-bolt": {
    title: "PROFIT ON EVERY TRIP",
    subtitle:
      "The most profitable cars for Uber and Bolt in Ghana, ranked by real-world earnings and running costs.",
    heroImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80",
    rankings: [
      {
        rank: 1,
        name: "Toyota Vitz 2013–2018",
        priceRange: "GHS 22,000–32,000",
        fuelEconomy: "20–23 km/L",
        weeklyEst: "GHS 1,200–1,800",
        monthlyNet: "GHS 3,200–4,800",
        spareParts: 5,
        maintenance: "Easy",
        comfortScore: 2,
        why: "Lowest running costs in Ghana. Every mechanic knows it. Parts cost almost nothing. Fuel bill is tiny.",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
      },
      {
        rank: 2,
        name: "Kia Picanto 2015–2020",
        priceRange: "GHS 20,000–30,000",
        fuelEconomy: "18–21 km/L",
        weeklyEst: "GHS 1,100–1,600",
        monthlyNet: "GHS 3,000–4,400",
        spareParts: 4,
        maintenance: "Easy",
        comfortScore: 2,
        why: "Slightly more modern styling than Vitz. Good resale value. Slightly more spacious than it looks.",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
      },
      {
        rank: 3,
        name: "Honda Fit / Jazz 2013–2018",
        priceRange: "GHS 28,000–38,000",
        fuelEconomy: "16–18 km/L",
        weeklyEst: "GHS 1,300–1,900",
        monthlyNet: "GHS 3,500–5,000",
        spareParts: 4,
        maintenance: "Easy",
        comfortScore: 3,
        why: "Magic Seat transforms cargo space. Roomy rear for passengers. Honda reliability.",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
      },
    ],
  },
  "tough-roads": {
    title: "BUILT FOR EVERY TERRAIN",
    subtitle:
      "From Accra's potholes to the North's laterite roads — these are the vehicles that handle Ghana's toughest conditions.",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80",
    rankings: [
      {
        rank: 1,
        name: "Toyota Hilux (2015–2022)",
        groundClearance: "310 mm",
        suspension: "Double-wishbone front / leaf-spring rear",
        offRoadRating: 5,
        engineDurability: 5,
        fuelHighway: "11–13L / 100km (diesel)",
        monthlyMaint: "GHS 200–400",
        verdict: "The definitive Ghanaian workhorse. Not glamorous. Unstoppable.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      },
      {
        rank: 2,
        name: "Toyota Land Cruiser 200 Series (2016–2021)",
        groundClearance: "225 mm",
        suspension: "Kinetic Dynamic Suspension System",
        offRoadRating: 5,
        engineDurability: 5,
        fuel: "13–15L / 100km (diesel V8)",
        monthlyMaint: "GHS 400–700",
        verdict: "The president's choice — for good reason. Conquers any road condition in Ghana.",
        image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80",
      },
    ],
  },
};

export const BRAND_HISTORY = {
  bmw: {
    name: "BMW (Bayerische Motoren Werke)",
    founded: "1916, Munich, Germany",
    tagline: "The Ultimate Driving Machine",
    heroImage: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1920&q=80",
    bio: "BMW began as an aircraft engine manufacturer during World War I before transitioning to motorcycles and eventually automobiles. Today it is one of the world's most respected luxury and performance car brands.",
    timeline: [
      {
        year: 1916,
        event:
          "BMW founded as Bayerische Motoren Werke. Began manufacturing aircraft engines for WWI.",
      },
      {
        year: 1923,
        event: "First BMW motorcycle: R32. Designed by Max Friz, debuted at Paris Motor Show.",
      },
      {
        year: 1929,
        event: "First BMW car: Dixi 3/15. Based on Austin 7 under licence — humble beginnings.",
      },
      {
        year: 1961,
        event: "BMW 1500 saves the company. New 'New Class' 1500 sedan restored BMW's identity.",
      },
      { year: 1972, event: "BMW M GmbH established. Motorsport division created." },
      {
        year: 1978,
        event:
          "BMW M1 supercar launched. First purpose-built BMW supercar. 275 hp from 3.5L inline-6.",
      },
      {
        year: 1986,
        event: "BMW M3 E30 — an icon is born. 4-cylinder 200 hp. Won 1500 racing events.",
      },
      {
        year: 1999,
        event:
          "BMW X5 E53 — luxury SUV revolution. BMW's first SUV, called Sports Activity Vehicle.",
      },
      {
        year: 2019,
        event:
          "BMW M8 Competition. 625 hp. Top speed 305 km/h. The ultimate M car before electrification.",
      },
    ],
    maintenance: {
      spareParts: 3,
      fuelType: "Premium RON 95+",
      monthlyMaint: "GHS 400–900",
      localMechanics: "Available — BMW-specialist garages in East Legon, Accra",
      commonIssues: "Coolant system leaks, VANOS issues (M engines), high-pressure fuel pumps",
      verdict: "Great cars but require commitment to maintenance. Budget ahead.",
    },
  },
  toyota: {
    name: "Toyota Motor Corporation",
    founded: "1937, Aichi Prefecture, Japan",
    tagline: "Let's Go Places",
    heroImage: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=1920&q=80",
    bio: "Toyota is the world's largest automaker by volume and the most trusted brand in Ghana and across Africa. From the indestructible Hilux to the efficient Vitz, Toyota vehicles dominate Ghanaian roads.",
    timeline: [
      {
        year: 1937,
        event: "Toyota Motor Co. founded by Kiichiro Toyoda. First vehicle: Model AA sedan.",
      },
      {
        year: 1955,
        event: "Toyota Crown — first export model. First car designed for international markets.",
      },
      {
        year: 1966,
        event: "Toyota Corolla launched. Would become best-selling car in history (50M+ units).",
      },
      {
        year: 1969,
        event: "Toyota HiLux first generation. The truck synonymous with indestructibility.",
      },
      {
        year: 1984,
        event:
          "Toyota Land Cruiser 70 Series. Legendary off-road capability. Still sold new today.",
      },
      {
        year: 1997,
        event: "Toyota Prius — world's first mass-produced hybrid. Changed the industry forever.",
      },
      {
        year: 2003,
        event: "Toyota Camry 7th generation. Defined executive comfort for middle class globally.",
      },
      {
        year: 2022,
        event:
          "Toyota Land Cruiser 300 Series. Twin-turbo V6 replaces V8. Definitive African expedition vehicle.",
      },
    ],
    maintenance: {
      spareParts: 5,
      fuelType: "Regular RON 91 (most models)",
      monthlyMaint: "GHS 150–350",
      localMechanics: "Everywhere — Toyota parts and mechanics in every district",
      commonIssues: "Very few. Oil leaks on higher-mileage 2JZ. Rust on coastal cars.",
      verdict: "The benchmark for reliability in Ghana. Parts are cheap and everywhere.",
    },
  },
  "mercedes-benz": {
    name: "Mercedes-Benz Group AG",
    founded: "1926, Stuttgart, Germany",
    tagline: "The Best or Nothing",
    heroImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80",
    bio: "Mercedes-Benz invented the automobile. Karl Benz's Patent-Motorwagen of 1886 is the world's first gasoline-powered car. Today, the three-pointed star represents the pinnacle of German engineering luxury.",
    timeline: [
      {
        year: 1886,
        event:
          "Karl Benz's Patent-Motorwagen. World's first gasoline automobile. 3 wheels. 0.75 hp.",
      },
      {
        year: 1901,
        event: "Mercedes 35hp. Created by Wilhelm Maybach. First car called 'Mercedes'.",
      },
      { year: 1926, event: "Daimler-Benz AG merger. Two legends unite. Mercedes-Benz brand born." },
      {
        year: 1954,
        event: "Mercedes-Benz 300SL Gullwing. Direct-injection engine. Gullwing doors. 215 km/h.",
      },
      {
        year: 1963,
        event:
          "Mercedes 600 Grosser. Car of presidents for 20 years. 6.3L V8 hydraulic everything.",
      },
      {
        year: 1979,
        event: "Mercedes S-Class W126. Defined modern luxury sedan. Safety innovations.",
      },
      {
        year: 1993,
        event: "C-Class launched. Entry luxury sedan. Most accessible three-pointed star.",
      },
      {
        year: 2014,
        event: "AMG GT launched. Pure-bred sports car from AMG. 510 hp. 0–100 in 3.8 seconds.",
      },
    ],
    maintenance: {
      spareParts: 2,
      fuelType: "Premium RON 95+ (AMG: RON 98)",
      monthlyMaint: "GHS 500–1,200",
      localMechanics:
        "Specialist garages in Accra. Most general mechanics can handle W203/W204 and W211/W212.",
      commonIssues:
        "Air suspension failures (GL/GLS), electronic gremlins on newer models, expensive coolant repairs",
      verdict: "Prestigious but expensive to maintain. Buy with full service history.",
    },
  },
};

export const EVOLUTION_TIMELINES = {
  "honda-civic": {
    title: "Honda Civic — Evolution Timeline",
    heroImage: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80",
    generations: [
      {
        year: 1972,
        name: "Civic 1st Gen (SB1)",
        engine: "1.2L CVCC inline-4 (50 hp)",
        note: "Arrived during oil crisis. Fuel economy shocked world. First car to meet US emissions without catalytic converter.",
      },
      {
        year: 1979,
        name: "Civic 2nd Gen",
        engine: "1.3L–1.5L",
        note: "Hatchback form solidified. More refined, bigger inside.",
      },
      {
        year: 1984,
        name: "Civic 3rd Gen",
        engine: "1.5L SOHC carbureted",
        note: "CRX sibling launched. Performance variant seeds tuner culture.",
      },
      {
        year: 1988,
        name: "Civic 4th Gen",
        engine: "1.5L–1.6L SOHC/DOHC",
        note: "First Civic with dual-wishbone rear suspension.",
      },
      {
        year: 1992,
        name: "Civic 5th Gen (EG)",
        engine: "1.5L SOHC / 1.6L VTEC (158 hp — B16A)",
        note: "THE JDM classic. EG hatchback is arguably most modified car in history. VTEC sound changes car culture forever.",
      },
      {
        year: 1996,
        name: "Civic 6th Gen (EK)",
        engine: "B16 / B18 options",
        note: "EK9 Type R with B16B engine (185 hp) — legendary. Lightweight. 8,200 rpm redline.",
      },
      {
        year: 2001,
        name: "Civic 7th Gen (EP/EU)",
        engine: "1.7L i-VTEC (115 hp)",
        note: "More practical, less exciting. EP3 Type R (K20A2, 197 hp) saves it.",
      },
      {
        year: 2006,
        name: "Civic 8th Gen (FD/FN)",
        engine: "1.8L i-VTEC / 2.0L Type R",
        note: "Modern design, controversial. FN2 Type R in Europe. FD2 Type R in Japan — K20Z4, 225 hp.",
      },
      {
        year: 2012,
        name: "Civic 9th Gen",
        engine: "1.8L i-VTEC / 2.4L Si",
        note: "Critical reception harsh — felt bland. Honda listened.",
      },
      {
        year: 2016,
        name: "Civic 10th Gen (FC/FK)",
        engine: "1.5L Turbo (174 hp) / 2.0L Type R (316 hp FK8)",
        note: "The return. FK8 Type R: 316 hp, fastest FWD at Nürburgring. Polarizing spoiler.",
      },
      {
        year: 2022,
        name: "Civic 11th Gen (FL)",
        engine: "1.5L Turbo (158 hp) / 2.0L Type R (315 hp FL5)",
        note: "Cleaner, mature styling. FL5 Type R refines FK8 recipe. Still one of world's best FWD cars.",
      },
    ],
  },
  "toyota-supra": {
    title: "Toyota Supra — Evolution Timeline",
    heroImage: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80",
    generations: [
      {
        year: 1978,
        name: "Supra MK1 (A40)",
        basedOn: "Celica platform extended",
        engine: "2.0L–2.6L inline-6",
        note: "Supra nameplate born. Japanese GT car concept established.",
      },
      {
        year: 1981,
        name: "Supra MK2 (A60)",
        engine: "2.0L–2.8L inline-6",
        note: "More powerful, refined. T-bar roof available. Shape defines sports car in Japan.",
      },
      {
        year: 1986,
        name: "Supra MK3 (A70)",
        engine: "3.0L 7M-GTE turbo (230 hp)",
        note: "Turbo arrives. Pop-up headlights. Wider stance. Distinguished as own model.",
      },
      {
        year: 1993,
        name: "Supra MK4 (A80)",
        engine: "2JZ-GE (220 hp) / 2JZ-GTE (320 hp)",
        note: "The legend. 2JZ-GTE became most famous engine in tuning culture. Paul Walker's orange Supra made it iconic.",
        image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      },
      {
        year: 2002,
        name: "Production Ends",
        note: "Toyota kills Supra. Void felt worldwide. Used prices climb immediately.",
      },
      {
        year: 2019,
        name: "Supra MK5 (A90)",
        engine: "BMW B58 3.0L inline-6 (335 hp / 382 hp on GR)",
        note: "Built with BMW Z4 platform. Controversial at launch. Driving dynamics universally praised.",
      },
    ],
  },
};

export const formatGHS = (n: number) =>
  new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(n);
