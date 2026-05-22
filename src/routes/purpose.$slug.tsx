import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  TrendingUp,
  Info,
  Fuel,
  ShieldCheck,
  Gauge,
  Wrench,
  ChevronRight,
  Calculator,
  Check,
  Award,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES, PURPOSES, HERO_IMAGES, formatGHS, PURPOSE_CONTENT } from "@/data/mock-data";

export const Route = createFileRoute("/purpose/$slug")({ component: PurposePage });

function PurposePage() {
  const { slug } = Route.useParams();
  const purpose = PURPOSES.find((p) => p.slug === slug) ?? PURPOSES[0];
  const purposeData = PURPOSE_CONTENT[slug as keyof typeof PURPOSE_CONTENT];
  const cars = VEHICLES.slice(0, 6);

  // Calculator state (Uber/Bolt)
  const [hours, setHours] = useState(10);
  const [daysPerWeek, setDays] = useState(6);
  const [fuelPrice, setFuelPrice] = useState(14.5);

  const stats = useMemo(() => {
    const earningsPerHour = 38; // Average in Accra
    const kmPerHour = 20;
    const kmPerLitre = 14; // Average for small engine car (Vitz, etc)
    const grossWeekly = hours * daysPerWeek * earningsPerHour;
    const fuelLiters = (hours * daysPerWeek * kmPerHour) / kmPerLitre;
    const fuelCost = fuelLiters * fuelPrice;
    const commission = grossWeekly * 0.2; // Uber/Bolt 20%
    const maintenance = 150; // Weekly avg
    const netWeekly = grossWeekly - fuelCost - commission - maintenance;

    return { grossWeekly, fuelCost, commission, maintenance, netWeekly };
  }, [hours, daysPerWeek, fuelPrice]);

  return (
    <SiteLayout transparentNav>
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <img
          src={purposeData?.heroImage || purpose.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative container-x h-full flex flex-col justify-center">
          <div className="overline tracking-[0.3em] text-primary mb-4 uppercase">
            Purpose-Driven Curation
          </div>
          <h1 className="font-display text-7xl md:text-[10rem] tracking-wider leading-[0.8] text-white uppercase">
            {purpose.tag}
          </h1>
          <p className="mt-8 text-xl text-white/70 max-w-xl font-body leading-relaxed">
            {purposeData?.subtitle || purpose.title}. We've crunched the numbers on fuel, parts, and
            durability so you don't have to.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#picks"
              className="h-14 px-8 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm inline-flex items-center"
            >
              View Top Picks
            </a>
            {slug === "uber-bolt" && (
              <a
                href="#calculator"
                className="h-14 px-8 border border-white/20 hover:border-white text-white font-mono uppercase tracking-widest text-sm inline-flex items-center transition-colors"
              >
                Profitability Tool
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Best-fit cars - Rankings */}
      <section id="picks" className="container-x py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="overline text-primary">The Shortlist</div>
            <h2 className="font-display text-5xl tracking-wider mt-2 uppercase">
              BEST FOR {purpose.tag}
            </h2>
          </div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {purposeData?.rankings?.length || cars.length} vehicles matching criteria
          </div>
        </div>

        {purposeData?.rankings ? (
          <div className="space-y-6">
            {purposeData.rankings.map((ranking) => (
              <div
                key={ranking.rank}
                className="bg-card border border-border overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 p-8 items-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary">
                    <span className="font-display text-3xl text-primary">#{ranking.rank}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl tracking-wider uppercase mb-2">
                      {ranking.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                      {"why" in ranking ? ranking.why : ranking.verdict}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest">
                      {"priceRange" in ranking && (
                        <span className="text-muted-foreground">Price: {ranking.priceRange}</span>
                      )}
                      {"fuelEconomy" in ranking && (
                        <span className="text-primary">{ranking.fuelEconomy}</span>
                      )}
                      {"fuelHighway" in ranking && (
                        <span className="text-primary">{ranking.fuelHighway}</span>
                      )}
                      {"weeklyEst" in ranking && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-success">Weekly: {ranking.weeklyEst}</span>
                        </>
                      )}
                      {"monthlyNet" in ranking && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-success">Monthly: {ranking.monthlyNet}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col gap-2">
                    {"spareParts" in ranking && (
                      <div className="text-center">
                        <div className="overline text-[8px] text-muted-foreground mb-1">PARTS</div>
                        <div className="font-display text-lg text-primary">
                          {"★".repeat(ranking.spareParts)}
                          {"☆".repeat(5 - ranking.spareParts)}
                        </div>
                      </div>
                    )}
                    {"offRoadRating" in ranking && (
                      <div className="text-center">
                        <div className="overline text-[8px] text-muted-foreground mb-1">
                          OFF-ROAD
                        </div>
                        <div className="font-display text-lg text-primary">
                          {"★".repeat(ranking.offRoadRating)}
                          {"☆".repeat(5 - ranking.offRoadRating)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((v) => (
              <div key={v.id} className="group bg-card border border-border overflow-hidden">
                <VehicleCard v={v} />
                <div className="px-8 pb-8 grid grid-cols-3 gap-4 border-t border-border pt-6 bg-surface/30">
                  {[
                    { label: "Fuel", value: "18 KM/L", icon: Fuel },
                    { label: "Weekly", value: "GHS 1,800", icon: TrendingUp },
                    { label: "Parts", value: "9/10", icon: Wrench },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="overline text-[8px] text-muted-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="font-display text-lg text-primary tracking-wider">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Calculator - Only for Uber/Bolt */}
      {slug === "uber-bolt" && (
        <section
          id="calculator"
          className="bg-surface hairline-t hairline-b py-24 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="container-x relative z-10 grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="overline inline-flex items-center gap-2 text-primary mb-4">
                <Calculator className="w-4 h-4" /> PERFORMANCE AUDIT
              </div>
              <h2 className="font-display text-6xl tracking-wider uppercase mb-6">DO THE MATH</h2>
              <p className="text-lg text-muted-foreground mb-12 font-body leading-relaxed">
                Don't guess your earnings. Our algorithm accounts for Accra's traffic patterns,
                platform commissions, and maintenance schedules to show your real take-home pay.
              </p>

              <div className="space-y-10">
                <Slider
                  label="Hours per day"
                  value={hours}
                  min={4}
                  max={16}
                  onChange={setHours}
                  suffix="h"
                />
                <Slider
                  label="Days per week"
                  value={daysPerWeek}
                  min={1}
                  max={7}
                  onChange={setDays}
                  suffix="d"
                />
                <Slider
                  label="Fuel price (GHS/L)"
                  value={fuelPrice}
                  min={10}
                  max={20}
                  step={0.1}
                  onChange={setFuelPrice}
                />
              </div>
            </div>

            <div className="bg-card border border-border p-10 md:p-16 shadow-2xl relative">
              <div className="overline text-[10px] text-muted-foreground mb-4">
                Estimated Net Weekly Profit
              </div>
              <div className="font-display text-7xl md:text-8xl text-primary tracking-tight mb-8">
                {formatGHS(Math.max(0, Math.round(stats.netWeekly)))}
              </div>

              <div className="space-y-4 pt-8 border-t border-border">
                <Row
                  label="Gross Weekly Earnings"
                  value={formatGHS(Math.round(stats.grossWeekly))}
                />
                <Row
                  label="Fuel Consumption (Est.)"
                  value={`- ${formatGHS(Math.round(stats.fuelCost))}`}
                />
                <Row
                  label="Platform Commission (20%)"
                  value={`- ${formatGHS(Math.round(stats.commission))}`}
                />
                <Row label="Maintenance Reserve" value={`- ${formatGHS(stats.maintenance)}`} />
              </div>

              <div className="mt-10 p-6 bg-primary/5 border border-primary/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="overline text-white text-[10px]">Projected Annual Net</span>
                  <span className="font-display text-3xl text-white">
                    {formatGHS(Math.round(stats.netWeekly * 52))}
                  </span>
                </div>
                <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest leading-relaxed">
                  Calculated based on Accra metropolitan data. Individual results may vary by driver
                  rating and shift times.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DURABILITY NOTES */}
      <section className="py-24 bg-background">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <div className="overline text-primary mb-8 text-center">Ghana-Specific Insights</div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-card border border-border p-10">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display text-2xl tracking-wider uppercase mb-4">
                  SUSPENSION LONGEVITY
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  Vehicles on this list have been selected for their high ground clearance and
                  resilient suspension bushings — critical for navigating unpaved secondary roads
                  and seasonal flooding.
                </p>
              </div>
              <div className="bg-card border border-border p-10">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-display text-2xl tracking-wider uppercase mb-4">
                  PARTS AVAILABILITY
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  We only recommend cars where genuine and high-quality aftermarket parts are
                  available in Abossey Okai or through certified regional dealers with{" "}
                  <span className="text-white">24h turnaround</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-surface hairline-t">
        <div className="container-x text-center">
          <h2 className="font-display text-5xl md:text-7xl tracking-wider uppercase mb-8">
            READY TO START EARNING?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/buy"
              className="h-14 px-10 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm inline-flex items-center shadow-[0_0_30px_rgba(232,93,4,0.2)]"
            >
              Browse Inventory
            </Link>
            <Link
              to="/account"
              className="h-14 px-10 border border-border hover:border-primary text-white font-mono uppercase tracking-widest text-sm inline-flex items-center transition-all"
            >
              Financing Options
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  suffix = "",
  step = 1,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  suffix?: string;
  step?: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="overline text-[10px] text-muted-foreground tracking-widest uppercase">
          {label}
        </div>
        <div className="font-display text-2xl text-white tracking-wider">
          {value}
          {suffix}
        </div>
      </div>
      <div className="relative h-6 flex items-center group">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={(e) => onChange(+e.target.value)}
          className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-primary"
        />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-sm text-white">{value}</span>
    </div>
  );
}
