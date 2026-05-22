// /src/data/ads.ts
// Saints Garage — Mock Ad Data
// All images from Unsplash (CC0 — no attribution required)
// Drop this file into /src/data/ and import where needed

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type AdPlacement =
  | "homepage_hero" // below hero section — 1920×400
  | "homepage_mid" // homepage mid-page — 970×250
  | "vehicle_detail_sidebar" // vehicle detail right sidebar — 300×600
  | "vehicle_detail_below_gallery" // below gallery on detail page — 728×90
  | "rental_top" // top of rental listing page — 728×90
  | "auction_top" // top of auctions page — 728×90
  | "blog_top" // top of blog listing page — 728×90
  | "blog_sidebar" // blog right sidebar — 300×250
  | "blog_in_article" // inside blog post after paragraph 3 — 728×90
  | "purpose_page_top" // top of any Cars by Purpose page — 728×90
  | "checkout_above_form" // above reservation/booking form — 728×90
  | "search_results_top" // top of search results — 728×90
  | "history_sidebar"; // Automotive History Vault sidebar — 300×250

export type AdStatus = "active" | "paused" | "scheduled" | "expired";

export type PricingModel = "CPM" | "CPC" | "flat_rate";

export interface AdCompany {
  id: string;
  name: string;
  industry: string;
  logo: string; // Unsplash URL — monochrome/logo-style image
  website: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}

export interface AdBanner {
  id: string;
  companyId: string;
  campaignName: string;
  // CREATIVE
  imageUrl: string; // Unsplash URL
  altText: string;
  headline: string; // large text on banner (if text overlay used)
  subline: string; // smaller supporting copy
  ctaText: string; // button label e.g. "Get a Quote"
  // DESTINATION
  destinationUrl: string; // real or dummy URL
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  openInNewTab: boolean;
  // PLACEMENT
  placements: AdPlacement[];
  size: string; // e.g. "728×90"
  // SCHEDULE
  startDate: string; // ISO date
  endDate: string; // ISO date
  // PERFORMANCE (mock numbers)
  impressions: number;
  clicks: number;
  ctr: number; // percentage e.g. 2.1
  // BILLING
  pricingModel: PricingModel;
  rateGHS: number;
  paymentStatus: "paid" | "pending" | "overdue";
  invoiceRef: string;
  // STATUS
  status: AdStatus;
}

// ─────────────────────────────────────────────────────────────────────────────
// AD COMPANIES
// ─────────────────────────────────────────────────────────────────────────────

export const adCompanies: AdCompany[] = [
  {
    id: "co_001",
    name: "TotalEnergies Ghana",
    industry: "Fuel & Energy",
    logo: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=200&q=80",
    website: "https://totalenergies.com.gh",
    contactPerson: "Ama Boateng",
    contactEmail: "ama.boateng@totalenergies.gh",
    contactPhone: "+233 30 221 4400",
  },
  {
    id: "co_002",
    name: "GOIL Company Ghana",
    industry: "Fuel & Energy",
    logo: "https://images.unsplash.com/photo-1611267254323-4db7b39c732c?w=200&q=80",
    website: "https://goil.com.gh",
    contactPerson: "John Atta",
    contactEmail: "john.atta@goil.com.gh",
    contactPhone: "+233 30 277 6600",
  },
  {
    id: "co_003",
    name: "SIC Insurance Ghana",
    industry: "Insurance",
    logo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&q=80",
    website: "https://sic-insurance.com",
    contactPerson: "Kweku Mensah",
    contactEmail: "kweku.mensah@sic-insurance.com",
    contactPhone: "+233 30 266 1991",
  },
  {
    id: "co_004",
    name: "Enterprise Insurance",
    industry: "Insurance",
    logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80",
    website: "https://enterpriseinsurance.com.gh",
    contactPerson: "Abena Frimpong",
    contactEmail: "afrimpong@enterprise-gh.com",
    contactPhone: "+233 30 251 3490",
  },
  {
    id: "co_005",
    name: "Hollard Insurance Ghana",
    industry: "Insurance",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&q=80",
    website: "https://hollard.com.gh",
    contactPerson: "Kofi Asare",
    contactEmail: "k.asare@hollard.com.gh",
    contactPhone: "+233 30 273 8100",
  },
  {
    id: "co_006",
    name: "Castrol Ghana",
    industry: "Lubricants & Engine Oil",
    logo: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&q=80",
    website: "https://castrol.com/ghana",
    contactPerson: "Yaw Darko",
    contactEmail: "y.darko@castrol.gh",
    contactPhone: "+233 24 400 8811",
  },
  {
    id: "co_007",
    name: "Bridgestone Ghana",
    industry: "Tyres",
    logo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&q=80",
    website: "https://bridgestone.com.gh",
    contactPerson: "Efua Mensah",
    contactEmail: "e.mensah@bridgestone.gh",
    contactPhone: "+233 30 244 5500",
  },
  {
    id: "co_008",
    name: "CalBank Ghana",
    industry: "Banking & Auto Finance",
    logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&q=80",
    website: "https://calbank.net",
    contactPerson: "Nana Osei",
    contactEmail: "n.osei@calbank.net",
    contactPhone: "+233 30 221 0100",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AD BANNERS
// All copy is written to feel contextual, premium, and relevant —
// the kind of ad a car buyer actually stops to read.
// ─────────────────────────────────────────────────────────────────────────────

export const adBanners: AdBanner[] = [
  // ── FUEL COMPANIES ─────────────────────────────────────────────────────────

  {
    id: "ad_001",
    companyId: "co_001",
    campaignName: "TotalEnergies Q1 2025 — Homepage",
    imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=80",
    altText: "TotalEnergies fuel stations across Ghana",
    headline: "Your Engine Deserves the Good Stuff.",
    subline: "Premium fuels at 200+ stations across Ghana. Find your nearest TotalEnergies.",
    ctaText: "Find a Station",
    destinationUrl: "https://totalenergies.com.gh/stations",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "q1-2025-brand",
    utmContent: "homepage_hero",
    openInNewTab: true,
    placements: ["homepage_hero"],
    size: "1920×400",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    impressions: 84200,
    clicks: 1820,
    ctr: 2.2,
    pricingModel: "CPM",
    rateGHS: 25,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-001",
    status: "active",
  },

  {
    id: "ad_002",
    companyId: "co_001",
    campaignName: "TotalEnergies — Fuel Saving Page",
    imageUrl: "https://images.unsplash.com/photo-1474978528675-4a50a4508dc7?w=1200&q=80",
    altText: "Save more fuel with TotalEnergies premium grade",
    headline: "Go Further on Every Tank.",
    subline:
      "TotalEnergies EcoPlus fuel is engineered to stretch every litre further. Proven in Ghana.",
    ctaText: "See the Difference",
    destinationUrl: "https://totalenergies.com.gh/ecofuel",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "q1-2025-fuel-saving",
    utmContent: "purpose_page_top",
    openInNewTab: true,
    placements: ["purpose_page_top"],
    size: "728×90",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    impressions: 22400,
    clicks: 580,
    ctr: 2.6,
    pricingModel: "CPM",
    rateGHS: 20,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-002",
    status: "active",
  },

  {
    id: "ad_003",
    companyId: "co_002",
    campaignName: "GOIL — Vehicle Detail Contextual",
    imageUrl: "https://images.unsplash.com/photo-1611267254323-4db7b39c732c?w=600&q=80",
    altText: "GOIL — fuel up at 300+ stations in Ghana",
    headline: "Just Picked Up Your Next Car?",
    subline:
      "GOIL has 300+ stations across Ghana ready to keep it running. First fill on us — show this ad.",
    ctaText: "Find GOIL Near You",
    destinationUrl: "https://goil.com.gh/stations",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "q1-2025-contextual",
    utmContent: "vehicle_detail_sidebar",
    openInNewTab: true,
    placements: ["vehicle_detail_sidebar", "checkout_above_form"],
    size: "300×600",
    startDate: "2025-01-01",
    endDate: "2025-04-30",
    impressions: 38800,
    clicks: 710,
    ctr: 1.8,
    pricingModel: "CPM",
    rateGHS: 22,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-003",
    status: "active",
  },

  // ── INSURANCE COMPANIES ────────────────────────────────────────────────────

  {
    id: "ad_004",
    companyId: "co_003",
    campaignName: "SIC Insurance — Vehicle Detail Sidebar",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    altText: "SIC Insurance — protect your vehicle today",
    headline: "Love This Car? Protect It.",
    subline:
      "Comprehensive cover from GHS 420/month. SIC Insurance — Ghana's most trusted for 60 years.",
    ctaText: "Get a Quote in 2 Min",
    destinationUrl: "https://sic-insurance.com/motor",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "motor-q1-2025",
    utmContent: "vehicle_detail_sidebar",
    openInNewTab: true,
    placements: ["vehicle_detail_sidebar"],
    size: "300×600",
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    impressions: 61400,
    clicks: 1240,
    ctr: 2.0,
    pricingModel: "CPM",
    rateGHS: 22,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-004",
    status: "active",
  },

  {
    id: "ad_005",
    companyId: "co_003",
    campaignName: "SIC Insurance — Checkout Contextual",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    altText: "SIC Insurance motor cover — reserve and insure together",
    headline: "Reserving This Vehicle? Insure It Before You Drive.",
    subline:
      "SIC motor insurance policies start from GHS 420/month. Get covered before keys change hands.",
    ctaText: "Get Insured Now",
    destinationUrl: "https://sic-insurance.com/motor/quote",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "motor-checkout-2025",
    utmContent: "checkout_above_form",
    openInNewTab: true,
    placements: ["checkout_above_form"],
    size: "728×90",
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    impressions: 14800,
    clicks: 540,
    ctr: 3.6,
    pricingModel: "CPC",
    rateGHS: 4,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-005",
    status: "active",
  },

  {
    id: "ad_006",
    companyId: "co_004",
    campaignName: "Enterprise Insurance — Auction Page",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    altText: "Enterprise Insurance — cover your auction win",
    headline: "Won the Bid? Now Protect the Win.",
    subline:
      "Enterprise Insurance has you covered the moment you drive off the lot. Same-day motor policies.",
    ctaText: "Cover My New Car",
    destinationUrl: "https://enterpriseinsurance.com.gh/motor",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "auction-cover-2025",
    utmContent: "auction_top",
    openInNewTab: true,
    placements: ["auction_top"],
    size: "728×90",
    startDate: "2025-01-15",
    endDate: "2025-05-31",
    impressions: 18200,
    clicks: 390,
    ctr: 2.1,
    pricingModel: "CPM",
    rateGHS: 20,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-006",
    status: "active",
  },

  {
    id: "ad_007",
    companyId: "co_005",
    campaignName: "Hollard — Rental Contextual",
    imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&q=80",
    altText: "Hollard Insurance — rental and personal motor cover",
    headline: "Renting Today. Buying Tomorrow. Covered Either Way.",
    subline:
      "Hollard offers motor insurance that moves with your life — rental cover, new car, or fleet.",
    ctaText: "Explore Cover Options",
    destinationUrl: "https://hollard.com.gh/motor",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "rental-cover-q1-2025",
    utmContent: "rental_top",
    openInNewTab: true,
    placements: ["rental_top"],
    size: "728×90",
    startDate: "2025-02-01",
    endDate: "2025-06-30",
    impressions: 11600,
    clicks: 230,
    ctr: 2.0,
    pricingModel: "flat_rate",
    rateGHS: 3200,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-007",
    status: "active",
  },

  // ── LUBRICANTS & ENGINE CARE ────────────────────────────────────────────────

  {
    id: "ad_008",
    companyId: "co_006",
    campaignName: "Castrol — Vehicle Detail Below Gallery",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80",
    altText: "Castrol engine oil — premium protection for every engine",
    headline: "New Car. Fresh Start. Don't Cheap Out on the Oil.",
    subline:
      "Castrol EDGE fully synthetic. Built for turbocharged and high-performance engines. Available nationwide.",
    ctaText: "Find Your Engine Oil",
    destinationUrl: "https://castrol.com/ghana/products",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "castrol-edge-2025",
    utmContent: "vehicle_detail_below_gallery",
    openInNewTab: true,
    placements: ["vehicle_detail_below_gallery"],
    size: "728×90",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    impressions: 44600,
    clicks: 890,
    ctr: 2.0,
    pricingModel: "CPM",
    rateGHS: 18,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-008",
    status: "active",
  },

  {
    id: "ad_009",
    companyId: "co_006",
    campaignName: "Castrol — Blog Maintenance Articles",
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    altText: "Castrol motor oil — engine care guide",
    headline: "Your Engine Is Talking. Learn to Listen.",
    subline:
      "Castrol's free maintenance guides tell you exactly when to change, what to use, and why it matters.",
    ctaText: "Read the Guides",
    destinationUrl: "https://castrol.com/ghana/guides",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "castrol-maintenance-2025",
    utmContent: "blog_sidebar",
    openInNewTab: true,
    placements: ["blog_sidebar", "blog_in_article"],
    size: "300×250",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    impressions: 29400,
    clicks: 520,
    ctr: 1.8,
    pricingModel: "CPM",
    rateGHS: 16,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-009",
    status: "active",
  },

  {
    id: "ad_010",
    companyId: "co_006",
    campaignName: "Castrol — History Vault Contextual",
    imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    altText: "Castrol — powering legendary engines since 1899",
    headline: "Behind Every Legendary Engine, There's Legendary Oil.",
    subline:
      "Castrol has lubricated championship engines for over 125 years — from Le Mans to Accra.",
    ctaText: "The Castrol Story",
    destinationUrl: "https://castrol.com/ghana/heritage",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "castrol-heritage-2025",
    utmContent: "history_sidebar",
    openInNewTab: true,
    placements: ["history_sidebar"],
    size: "300×250",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    impressions: 8400,
    clicks: 190,
    ctr: 2.3,
    pricingModel: "flat_rate",
    rateGHS: 2400,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-010",
    status: "active",
  },

  // ── TYRES ────────────────────────────────────────────────────────────────────

  {
    id: "ad_011",
    companyId: "co_007",
    campaignName: "Bridgestone — Vehicle Detail Sidebar",
    imageUrl: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?w=600&q=80",
    altText: "Bridgestone tyres Ghana — performance and reliability",
    headline: "That Car Deserves Better Than Average Rubber.",
    subline:
      "Bridgestone tyres are engineered for Ghana's roads — the heat, the potholes, the mileage. Don't cut corners.",
    ctaText: "Find Your Tyre Size",
    destinationUrl: "https://bridgestone.com.gh/tyres",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "bridgestone-q1-2025",
    utmContent: "vehicle_detail_sidebar",
    openInNewTab: true,
    placements: ["vehicle_detail_sidebar"],
    size: "300×600",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    impressions: 33200,
    clicks: 610,
    ctr: 1.8,
    pricingModel: "CPM",
    rateGHS: 22,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-011",
    status: "active",
  },

  {
    id: "ad_012",
    companyId: "co_007",
    campaignName: "Bridgestone — Tough Roads Purpose Page",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    altText: "Bridgestone all-terrain tyres for tough Ghana roads",
    headline: "If the Road Is Trying to Win, Your Tyres Are the Answer.",
    subline:
      "Bridgestone Dueler A/T — built for Ghana's toughest terrain without surrendering city comfort.",
    ctaText: "Shop All-Terrain",
    destinationUrl: "https://bridgestone.com.gh/all-terrain",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "bridgestone-offroad-2025",
    utmContent: "purpose_page_top",
    openInNewTab: true,
    placements: ["purpose_page_top"],
    size: "728×90",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    impressions: 9800,
    clicks: 310,
    ctr: 3.2,
    pricingModel: "CPC",
    rateGHS: 3,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-012",
    status: "active",
  },

  // ── BANKING & AUTO FINANCE ────────────────────────────────────────────────

  {
    id: "ad_013",
    companyId: "co_008",
    campaignName: "CalBank — Homepage Mid",
    imageUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1400&q=80",
    altText: "CalBank auto finance — drive your dream car today",
    headline: "See Something You Love? You Don't Have to Wait.",
    subline:
      "CalBank Auto Finance. Flexible repayment from 12 to 60 months. Decisions in 48 hours.",
    ctaText: "Apply for Finance",
    destinationUrl: "https://calbank.net/auto-finance",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "calbank-autofinance-q1-2025",
    utmContent: "homepage_mid",
    openInNewTab: true,
    placements: ["homepage_mid"],
    size: "970×250",
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    impressions: 52400,
    clicks: 1480,
    ctr: 2.8,
    pricingModel: "CPM",
    rateGHS: 24,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-013",
    status: "active",
  },

  {
    id: "ad_014",
    companyId: "co_008",
    campaignName: "CalBank — Vehicle Detail Checkout",
    imageUrl: "https://images.unsplash.com/photo-1468254095679-bbcba94a7066?w=1200&q=80",
    altText: "CalBank auto finance — reserve now, pay over time",
    headline: "GHS 195,000 Feels Different Spread Across 48 Months.",
    subline:
      "CalBank Auto Finance makes it happen. Reserve this car today and let us handle the numbers.",
    ctaText: "See What You Qualify For",
    destinationUrl: "https://calbank.net/auto-finance/apply",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "calbank-checkout-2025",
    utmContent: "checkout_above_form",
    openInNewTab: true,
    placements: ["checkout_above_form", "vehicle_detail_below_gallery"],
    size: "728×90",
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    impressions: 21600,
    clicks: 890,
    ctr: 4.1,
    pricingModel: "CPC",
    rateGHS: 5,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-014",
    status: "active",
  },

  // ── UBER/BOLT PURPOSE PAGE — FUEL CONTEXTUAL ─────────────────────────────

  {
    id: "ad_015",
    companyId: "co_001",
    campaignName: "TotalEnergies — Uber Bolt Page",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
    altText: "TotalEnergies — fuel stations for Bolt and Uber drivers",
    headline: "More Trips. Less Time at the Pump.",
    subline:
      "TotalEnergies Carte Pro — fuel card for Bolt and Uber drivers with discounts at 200+ stations.",
    ctaText: "Get the Driver Fuel Card",
    destinationUrl: "https://totalenergies.com.gh/pro-card",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "driver-fuel-card-2025",
    utmContent: "purpose_page_top",
    openInNewTab: true,
    placements: ["purpose_page_top"],
    size: "728×90",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    impressions: 17800,
    clicks: 620,
    ctr: 3.5,
    pricingModel: "CPC",
    rateGHS: 3,
    paymentStatus: "paid",
    invoiceRef: "INV-2025-015",
    status: "active",
  },

  // ── SEARCH RESULTS ────────────────────────────────────────────────────────

  {
    id: "ad_016",
    companyId: "co_004",
    campaignName: "Enterprise Insurance — Search Results",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    altText: "Enterprise Insurance — insure your next car before you drive",
    headline: "Still Browsing? Smart. Get Insurance Sorted Before You Buy.",
    subline:
      "Enterprise Insurance motor cover. Instant quotes, same-day activation. No paperwork stress.",
    ctaText: "Get an Instant Quote",
    destinationUrl: "https://enterpriseinsurance.com.gh/motor/quote",
    utmSource: "saintsgarage",
    utmMedium: "banner",
    utmCampaign: "enterprise-search-2025",
    utmContent: "search_results_top",
    openInNewTab: true,
    placements: ["search_results_top"],
    size: "728×90",
    startDate: "2025-02-01",
    endDate: "2025-08-31",
    impressions: 31200,
    clicks: 680,
    ctr: 2.2,
    pricingModel: "CPM",
    rateGHS: 18,
    paymentStatus: "pending",
    invoiceRef: "INV-2025-016",
    status: "active",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PLACEMENT CONFIG
// Maps each placement to its display dimensions and max simultaneous ads
// ─────────────────────────────────────────────────────────────────────────────

export const adPlacements: Record<
  AdPlacement,
  {
    label: string;
    size: string;
    maxAds: number;
    page: string;
    position: string;
  }
> = {
  homepage_hero: {
    label: "Homepage Hero Banner",
    size: "1920×400",
    maxAds: 1,
    page: "Homepage",
    position: "Below hero section",
  },
  homepage_mid: {
    label: "Homepage Mid Banner",
    size: "970×250",
    maxAds: 1,
    page: "Homepage",
    position: "Mid-page between sections",
  },
  vehicle_detail_sidebar: {
    label: "Vehicle Detail — Right Sidebar",
    size: "300×600",
    maxAds: 2,
    page: "Vehicle Detail",
    position: "Right sticky sidebar alongside contact block",
  },
  vehicle_detail_below_gallery: {
    label: "Vehicle Detail — Below Gallery",
    size: "728×90",
    maxAds: 1,
    page: "Vehicle Detail",
    position: "Below image gallery, above specs",
  },
  rental_top: {
    label: "Rental Page — Top Banner",
    size: "728×90",
    maxAds: 1,
    page: "Rental Listing",
    position: "Top of page below quick booking bar",
  },
  auction_top: {
    label: "Auctions Page — Top Banner",
    size: "728×90",
    maxAds: 1,
    page: "Live Auctions",
    position: "Top of page below hero",
  },
  blog_top: {
    label: "Blog — Top Banner",
    size: "728×90",
    maxAds: 1,
    page: "Blog Listing",
    position: "Top of blog listing page",
  },
  blog_sidebar: {
    label: "Blog — Right Sidebar",
    size: "300×250",
    maxAds: 3,
    page: "Blog",
    position: "Right column — sticky on scroll",
  },
  blog_in_article: {
    label: "Blog — In-Article",
    size: "728×90",
    maxAds: 1,
    page: "Blog Post",
    position: "Inside article body after paragraph 3",
  },
  purpose_page_top: {
    label: "Cars by Purpose — Top Banner",
    size: "728×90",
    maxAds: 1,
    page: "All Purpose Pages",
    position: "Top of page below hero text",
  },
  checkout_above_form: {
    label: "Checkout / Booking — Above Form",
    size: "728×90",
    maxAds: 1,
    page: "Reservation & Rental Booking",
    position: "Directly above the payment form",
  },
  search_results_top: {
    label: "Search Results — Top Banner",
    size: "728×90",
    maxAds: 1,
    page: "Search Results",
    position: "Top of results grid below filter bar",
  },
  history_sidebar: {
    label: "History Vault — Sidebar",
    size: "300×250",
    maxAds: 2,
    page: "Automotive History Vault",
    position: "Right sidebar on brand history and engine pages",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER — GET ADS FOR A SPECIFIC PLACEMENT
// Use this on any page to pull the right active ads
// ─────────────────────────────────────────────────────────────────────────────

export function getAdsForPlacement(placement: AdPlacement): AdBanner[] {
  const config = adPlacements[placement];
  const active = adBanners.filter(
    (ad) => ad.status === "active" && ad.placements.includes(placement),
  );
  return active.slice(0, config.maxAds);
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER — BUILD FULL TRACKED URL (mirrors admin UTM builder)
// ─────────────────────────────────────────────────────────────────────────────

export function buildTrackedUrl(ad: AdBanner): string {
  const url = new URL(ad.destinationUrl);
  url.searchParams.set("utm_source", ad.utmSource);
  url.searchParams.set("utm_medium", ad.utmMedium);
  url.searchParams.set("utm_campaign", ad.utmCampaign);
  url.searchParams.set("utm_content", ad.utmContent);
  return url.toString();
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK AD ANALYTICS (for admin dashboard)
// ─────────────────────────────────────────────────────────────────────────────

export const adAnalyticsSummary = {
  totalActiveCampaigns: adBanners.filter((a) => a.status === "active").length,
  totalImpressions: adBanners.reduce((sum, a) => sum + a.impressions, 0),
  totalClicks: adBanners.reduce((sum, a) => sum + a.clicks, 0),
  averageCTR: parseFloat(
    (adBanners.reduce((sum, a) => sum + a.ctr, 0) / adBanners.length).toFixed(2),
  ),
  monthlyRevenueGHS:
    adBanners
      .filter((a) => a.pricingModel === "flat_rate" && a.paymentStatus === "paid")
      .reduce((sum, a) => sum + a.rateGHS, 0) +
    Math.round(
      adBanners
        .filter((a) => a.pricingModel === "CPM" && a.paymentStatus === "paid")
        .reduce((sum, a) => sum + (a.impressions / 1000) * a.rateGHS, 0),
    ) +
    adBanners
      .filter((a) => a.pricingModel === "CPC" && a.paymentStatus === "paid")
      .reduce((sum, a) => sum + a.clicks * a.rateGHS, 0),
};
