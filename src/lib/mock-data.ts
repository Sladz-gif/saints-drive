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
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  transmission: "Automatic" | "Manual";
  drive: "FWD" | "RWD" | "AWD" | "4WD";
  body: "Sedan" | "SUV" | "Coupe" | "Pickup" | "Hatchback" | "Van";
  condition: "Brand New" | "Foreign Used" | "Ghana Used";
  image: string;
  featured?: boolean;
  listedDays?: number;
};

export type Auction = {
  id: string;
  slug: string;
  title: string;
  image: string;
  currentBid: number;
  bidCount: number;
  endsAt: number; // ms timestamp
  status: "upcoming" | "live" | "ending" | "ended";
  reserve?: number;
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
};

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

export const HERO_IMAGES = [hero1, hero2, hero3];

const img = (i: number) => HERO_IMAGES[i % HERO_IMAGES.length];

export const VEHICLES: Vehicle[] = [
  { id: "v1", slug: "bmw-7-series-2022-accra", title: "BMW 7 Series 740Li", brand: "BMW", model: "7 Series", year: 2022, price: 685000, location: "Accra, East Legon", km: 24500, fuel: "Petrol", transmission: "Automatic", drive: "RWD", body: "Sedan", condition: "Foreign Used", image: img(0), featured: true, listedDays: 3 },
  { id: "v2", slug: "rolls-royce-cullinan-2023", title: "Rolls-Royce Cullinan", brand: "Rolls-Royce", model: "Cullinan", year: 2023, price: 2150000, location: "Accra, Cantonments", km: 8200, fuel: "Petrol", transmission: "Automatic", drive: "AWD", body: "SUV", condition: "Foreign Used", image: img(1), featured: true, listedDays: 1 },
  { id: "v3", slug: "ford-mustang-gt-2021", title: "Ford Mustang GT 5.0", brand: "Ford", model: "Mustang", year: 2021, price: 425000, location: "Kumasi", km: 18900, fuel: "Petrol", transmission: "Manual", drive: "RWD", body: "Coupe", condition: "Foreign Used", image: img(2), featured: true, listedDays: 6 },
  { id: "v4", slug: "toyota-land-cruiser-300", title: "Toyota Land Cruiser 300", brand: "Toyota", model: "Land Cruiser", year: 2023, price: 1450000, location: "Tema", km: 12300, fuel: "Diesel", transmission: "Automatic", drive: "4WD", body: "SUV", condition: "Brand New", image: img(1), listedDays: 9 },
  { id: "v5", slug: "mercedes-benz-s500-2022", title: "Mercedes-Benz S500", brand: "Mercedes-Benz", model: "S-Class", year: 2022, price: 925000, location: "Accra, Airport Hills", km: 19500, fuel: "Petrol", transmission: "Automatic", drive: "RWD", body: "Sedan", condition: "Foreign Used", image: img(0), listedDays: 2 },
  { id: "v6", slug: "lexus-rx-450h-2023", title: "Lexus RX 450h Hybrid", brand: "Lexus", model: "RX", year: 2023, price: 715000, location: "Accra, Spintex", km: 9800, fuel: "Hybrid", transmission: "Automatic", drive: "AWD", body: "SUV", condition: "Brand New", image: img(2), listedDays: 4 },
  { id: "v7", slug: "honda-civic-2020", title: "Honda Civic 1.5T", brand: "Honda", model: "Civic", year: 2020, price: 215000, location: "Takoradi", km: 42100, fuel: "Petrol", transmission: "Automatic", drive: "FWD", body: "Sedan", condition: "Ghana Used", image: img(0), listedDays: 12 },
  { id: "v8", slug: "ford-ranger-raptor-2022", title: "Ford Ranger Raptor", brand: "Ford", model: "Ranger", year: 2022, price: 545000, location: "Accra, Madina", km: 21000, fuel: "Diesel", transmission: "Automatic", drive: "4WD", body: "Pickup", condition: "Foreign Used", image: img(1), listedDays: 7 },
  { id: "v9", slug: "toyota-vitz-2018", title: "Toyota Vitz", brand: "Toyota", model: "Vitz", year: 2018, price: 78000, location: "Kasoa", km: 88200, fuel: "Petrol", transmission: "Automatic", drive: "FWD", body: "Hatchback", condition: "Ghana Used", image: img(2), listedDays: 18 },
];

export const FEATURED_VEHICLES = VEHICLES.filter((v) => v.featured);

export const BRANDS = [
  "BMW", "Mercedes-Benz", "Toyota", "Lexus", "Honda", "Ford",
  "Rolls-Royce", "Porsche", "Audi", "Nissan", "Hyundai", "Kia",
  "Land Rover", "Jeep", "Volkswagen", "Mazda",
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
  { id: "a1", slug: "porsche-911-turbo-s", title: "Porsche 911 Turbo S — 2020", image: img(2), currentBid: 1250000, bidCount: 47, endsAt: now + 1000 * 60 * 60 * 3, status: "live", reserve: 1500000 },
  { id: "a2", slug: "mercedes-g63-amg", title: "Mercedes G63 AMG — 2021", image: img(1), currentBid: 1850000, bidCount: 82, endsAt: now + 1000 * 60 * 23, status: "ending", reserve: 2000000 },
  { id: "a3", slug: "bmw-m4-competition", title: "BMW M4 Competition — 2022", image: img(0), currentBid: 720000, bidCount: 31, endsAt: now + 1000 * 60 * 60 * 18, status: "live" },
  { id: "a4", slug: "audi-rs7-sportback", title: "Audi RS7 Sportback — 2021", image: img(2), currentBid: 0, bidCount: 0, endsAt: now + 1000 * 60 * 60 * 48, status: "upcoming" },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: "b1", slug: "best-cars-for-uber-in-ghana-2025", title: "The 7 Best Cars for Uber in Ghana (2025)", excerpt: "We crunched the numbers on fuel, parts, and weekly earnings. Here's what actually pays.", category: "Buyer Guides", author: "Kwesi Mensah", date: "May 18, 2026", readTime: "8 min", image: img(0) },
  { id: "b2", slug: "the-2jz-story", title: "The 2JZ Story — Why Toyota's Engine Refuses To Die", excerpt: "From Supra to street legend. A look at the inline-six that built a culture.", category: "History", author: "Ama Owusu", date: "May 12, 2026", readTime: "12 min", image: img(2) },
  { id: "b3", slug: "buying-foreign-used-checklist", title: "Buying a Foreign Used Car — The Ghana Checklist", excerpt: "20 things to inspect before you wire a single cedi.", category: "Buyer Guides", author: "Kojo Asare", date: "May 6, 2026", readTime: "6 min", image: img(1) },
];

export const ENGINES = [
  { name: "2JZ-GTE", stockHp: "320 HP", tunedHp: "1500+ HP", born: 1991, cars: "Toyota Supra MK4, Aristo, Soarer", tagline: "The bulletproof straight-six." },
  { name: "RB26DETT", stockHp: "276 HP", tunedHp: "1000+ HP", born: 1989, cars: "Nissan Skyline GT-R R32/R33/R34", tagline: "The Godzilla powerplant." },
  { name: "LS V8", stockHp: "345-755 HP", tunedHp: "2000+ HP", born: 1997, cars: "Corvette, Camaro, plus every swap on YouTube", tagline: "The everyman's miracle." },
  { name: "B58", stockHp: "382 HP", tunedHp: "800+ HP", born: 2015, cars: "BMW M340i, M240i, Toyota Supra MK5", tagline: "Munich's new legend." },
];

export const formatGHS = (n: number) =>
  new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", maximumFractionDigits: 0 }).format(n);
