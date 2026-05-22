import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award,
  Info,
  History,
  Wrench,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Filter,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES, HERO_IMAGES, BRAND_HISTORY } from "@/data/mock-data";

export const Route = createFileRoute("/brands/$brand")({ component: BrandPage });

function BrandPage() {
  const { brand } = Route.useParams();
  const [tab, setTab] = useState("All");

  const brandKey = brand.toLowerCase();
  const brandHistory = BRAND_HISTORY[brandKey as keyof typeof BRAND_HISTORY];
  const brandName =
    brandHistory?.name || brand.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  const allCars = VEHICLES.filter((v) => v.brand.toLowerCase().includes(brand.toLowerCase()));
  const cars = allCars.length > 0 ? allCars : VEHICLES.slice(0, 6);
  const filtered = tab === "All" ? cars : cars.filter((c) => c.body === tab);

  return (
    <SiteLayout transparentNav>
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <img
          src={brandHistory?.heroImage || HERO_IMAGES[0]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative container-x h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 overline text-primary mb-4 tracking-[0.3em]">
            <Award className="w-4 h-4" /> LEGENDARY LINEAGE
          </div>
          <h1 className="font-display text-8xl md:text-[12rem] tracking-wider leading-[0.8] text-white uppercase">
            {brandName}
          </h1>
          <p className="mt-8 text-xl text-white/70 max-w-xl font-body leading-relaxed">
            {brandHistory?.bio ||
              `Engineering that refuses to settle. Explore the finest ${brandName} inventory in Ghana.`}
          </p>
          {brandHistory?.tagline && (
            <div className="mt-4 text-sm text-primary font-mono uppercase tracking-widest">
              "{brandHistory.tagline}"
            </div>
          )}
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#inventory"
              className="h-14 px-8 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm inline-flex items-center"
            >
              Browse Inventory
            </a>
            <a
              href="#heritage"
              className="h-14 px-8 border border-white/20 hover:border-white text-white font-mono uppercase tracking-widest text-sm inline-flex items-center transition-colors"
            >
              History & Heritage
            </a>
          </div>
        </div>
      </section>

      {/* TABS / FILTER */}
      <div id="inventory" className="bg-surface hairline-b sticky top-16 z-40 shadow-xl">
        <div className="container-x flex items-center justify-between">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {["All", "Sedan", "SUV", "Coupe", "Convertible"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 sm:px-8 h-16 font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap border-b-2 transition-all ${
                  tab === t
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="hidden md:inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filter & Sort
          </button>
        </div>
      </div>

      <section className="py-16 sm:py-24 container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="overline text-primary">{brandName} Collection</div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wider mt-2 uppercase">
              AVAILABLE MODELS
            </h2>
          </div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Showing {filtered.length} vehicles
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((v) => (
            <VehicleCard key={v.id} v={v} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center bg-card border border-border">
            <h3 className="font-display text-3xl tracking-wider uppercase">NO MODELS FOUND</h3>
            <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-widest">
              Try a different category or view all {brandName} inventory.
            </p>
            <button
              onClick={() => setTab("All")}
              className="mt-8 text-primary font-mono text-xs uppercase tracking-widest hover:underline"
            >
              View All Models
            </button>
          </div>
        )}
      </section>

      {/* HERITAGE */}
      <section
        id="heritage"
        className="bg-card border-y border-border py-16 sm:py-20 md:py-24 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[50%] h-full opacity-10 pointer-events-none grayscale hidden sm:block">
          <img
            src={brandHistory?.heroImage || HERO_IMAGES[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-card via-card to-transparent" />

        <div className="container-x relative z-10">
          <div className="max-w-2xl">
            <div className="overline text-primary mb-4 flex items-center gap-2">
              <History className="w-4 h-4" /> THE BLOODLINE
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider uppercase mb-6 sm:mb-8">
              {brandHistory?.founded?.split(",")[0] || "A CENTURY"}
              <br />
              OF EXCELLENCE
            </h2>
            <div className="space-y-8 sm:space-y-12">
              {brandHistory?.timeline.map((h, i) => (
                <div key={i} className="flex gap-4 sm:gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="font-display text-2xl sm:text-3xl md:text-4xl text-primary tracking-wider">
                      {h.year}
                    </div>
                    <div className="flex-1 w-px bg-border my-3 sm:my-4 group-last:hidden" />
                  </div>
                  <div className="pb-6 sm:pb-8">
                    <h4 className="font-display text-lg sm:text-xl md:text-2xl tracking-wider uppercase mb-2">
                      {h.event.split(".")[0]}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed font-body">
                      {h.event}
                    </p>
                  </div>
                </div>
              )) ||
                [
                  {
                    year: "1916",
                    title: "The Foundation",
                    desc: "Started as an aircraft engine manufacturer.",
                  },
                  {
                    year: "1972",
                    title: "Performance Reborn",
                    desc: "The birth of the performance division.",
                  },
                  {
                    year: "2024",
                    title: "The Digital Era",
                    desc: "Leading the charge into sustainable performance.",
                  },
                ].map((h, i) => (
                  <div key={i} className="flex gap-4 sm:gap-8 group">
                    <div className="flex flex-col items-center">
                      <div className="font-display text-2xl sm:text-3xl md:text-4xl text-primary tracking-wider">
                        {h.year}
                      </div>
                      <div className="flex-1 w-px bg-border my-3 sm:my-4 group-last:hidden" />
                    </div>
                    <div className="pb-6 sm:pb-8">
                      <h4 className="font-display text-lg sm:text-xl md:text-2xl tracking-wider uppercase mb-2">
                        {h.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed font-body">
                        {h.desc}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* GHANA INSIGHTS */}
      <section className="py-16 sm:py-20 md:py-24 bg-background">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
            <div>
              <div className="overline text-primary mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" /> REGIONAL DATA
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider uppercase mb-6 sm:mb-8">
                MAINTENANCE
                <br />& OWNERSHIP
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 font-body leading-relaxed">
                Owning a {brandName} in Ghana requires specialized care. We've compiled the latest
                data from our certified service partners to help you plan your ownership.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {brandHistory?.maintenance
                  ? [
                      {
                        icon: Wrench,
                        label: "Parts Availability",
                        value: `${"★".repeat(brandHistory.maintenance.spareParts)}${"☆".repeat(5 - brandHistory.maintenance.spareParts)}`,
                        sub: brandHistory.maintenance.localMechanics?.split("—")[0] || "Available",
                      },
                      {
                        icon: TrendingUp,
                        label: "Monthly Maintenance",
                        value: brandHistory.maintenance.monthlyMaint,
                        sub: "Estimated",
                      },
                      {
                        icon: ShieldCheck,
                        label: "Fuel Type",
                        value: brandHistory.maintenance.fuelType,
                        sub: "Required",
                      },
                      {
                        icon: Info,
                        label: "Common Issues",
                        value: brandHistory.maintenance.commonIssues?.split(",")[0] || "Few",
                        sub: "Known issues",
                      },
                    ]
                  : [
                      {
                        icon: Wrench,
                        label: "Parts Availability",
                        value: "HIGH",
                        sub: "Accra & Kumasi Hubs",
                      },
                      {
                        icon: TrendingUp,
                        label: "Resale Value",
                        value: "82%",
                        sub: "After 3 years",
                      },
                      {
                        icon: ShieldCheck,
                        label: "Service Grade",
                        value: "A+",
                        sub: "Certified mechanics",
                      },
                      {
                        icon: Info,
                        label: "Fuel Quality",
                        value: "95 RON",
                        sub: "Minimum recommended",
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="p-4 sm:p-6 bg-card border border-border group hover:border-primary/30 transition-all"
                      >
                        <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-3 sm:mb-4" />
                        <div className="overline text-[9px] sm:text-[10px] text-muted-foreground mb-1">
                          {stat.label}
                        </div>
                        <div className="font-display text-2xl sm:text-3xl tracking-wider">{stat.value}</div>
                        <div className="mt-2 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60">
                          {stat.sub}
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            <div className="bg-surface border border-border p-6 sm:p-8 md:p-10 relative">
              <div className="font-display text-xl sm:text-2xl tracking-wider uppercase mb-6 sm:mb-8">
                OWNERSHIP INSIGHTS
              </div>
              <div className="space-y-4 sm:space-y-6">
                {(brandHistory?.maintenance
                  ? [
                      {
                        task: "Monthly Maintenance",
                        price: brandHistory.maintenance.monthlyMaint,
                        interval: "Estimated",
                      },
                      {
                        task: "Parts Rating",
                        price: `${"★".repeat(brandHistory.maintenance.spareParts)}${"☆".repeat(5 - brandHistory.maintenance.spareParts)}`,
                        interval: "Availability",
                      },
                      {
                        task: "Fuel Requirement",
                        price: brandHistory.maintenance.fuelType,
                        interval: "Recommended",
                      },
                      {
                        task: "Local Mechanics",
                        price: "Available",
                        interval:
                          brandHistory.maintenance.localMechanics?.split("—")[1]?.trim() ||
                          "Nationwide",
                      },
                    ]
                  : [
                      { task: "Minor Service", price: "GHS 1,400", interval: "10,000 KM" },
                      { task: "Major Service", price: "GHS 3,800", interval: "30,000 KM" },
                      { task: "Brake Pad Replacement", price: "GHS 2,200", interval: "As needed" },
                      { task: "Full Diagnostics", price: "GHS 450", interval: "On demand" },
                    ]
                ).map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-end border-b border-border/40 pb-3 sm:pb-4"
                  >
                    <div>
                      <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white">
                        {item.task}
                      </div>
                      <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5 sm:mt-1">
                        {item.interval}
                      </div>
                    </div>
                    <div className="font-display text-xl sm:text-2xl text-primary">{item.price}</div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-4 bg-primary/5 border border-primary/20 flex gap-4">
                <Info className="w-5 h-5 text-primary shrink-0" />
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest leading-relaxed">
                  {brandHistory?.maintenance?.verdict ||
                    "Prices are estimates based on Saints Certified service partners in Greater Accra."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-24 bg-surface hairline-t">
        <div className="container-x text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-wider uppercase mb-6 sm:mb-8">
            START YOUR {brandName.toUpperCase()} JOURNEY
          </h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/buy"
              className="h-12 sm:h-14 px-6 sm:px-10 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm inline-flex items-center shadow-[0_0_30px_rgba(232,93,4,0.2)]"
            >
              View All Inventory
            </Link>
            <Link
              to="/sell"
              className="h-12 sm:h-14 px-6 sm:px-10 border border-border hover:border-primary text-white font-mono uppercase tracking-widest text-sm inline-flex items-center transition-all"
            >
              Sell Your {brandName}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
