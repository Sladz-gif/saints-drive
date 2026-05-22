import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES, PURPOSES, HERO_IMAGES, formatGHS } from "@/lib/mock-data";

export const Route = createFileRoute("/purpose/$slug")({ component: PurposePage });

function PurposePage() {
  const { slug } = Route.useParams();
  const purpose = PURPOSES.find((p) => p.slug === slug) ?? PURPOSES[0];
  const cars = VEHICLES.slice(0, 6);

  // Calculator state (Uber/Bolt)
  const [hours, setHours] = useState(10);
  const [daysPerWeek, setDays] = useState(6);
  const [fuelPrice, setFuelPrice] = useState(14);
  const earningsPerHour = 35;
  const kmPerHour = 22;
  const kmPerLitre = 13;
  const grossWeekly = hours * daysPerWeek * earningsPerHour;
  const fuelCost = ((hours * daysPerWeek * kmPerHour) / kmPerLitre) * fuelPrice;
  const netWeekly = grossWeekly - fuelCost - 250; // commission/maintenance estimate

  return (
    <SiteLayout transparentNav>
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={purpose.image} alt="" className="absolute inset-0 w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative container-x h-full flex flex-col justify-end pb-16">
          <div className="overline">Cars by Purpose · {purpose.title}</div>
          <h1 className="font-display text-6xl md:text-8xl tracking-wider mt-2">{purpose.tag.toUpperCase()}</h1>
        </div>
      </section>

      {/* Best-fit cars */}
      <section className="container-x py-16">
        <div className="overline">Top Picks</div>
        <h2 className="font-display text-4xl tracking-wider mt-2">BUILT FOR THIS JOB</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((v) => (
            <div key={v.id} className="bg-card border border-border">
              <VehicleCard v={v} />
              <div className="px-5 pb-5 grid grid-cols-3 gap-3 text-xs">
                {[["Fuel", "13 km/l"], ["Weekly Est.", "GHS 2,100"], ["Parts", "9/10"]].map(([k, v2]) => (
                  <div key={k}>
                    <div className="overline">{k}</div>
                    <div className="font-mono text-foreground mt-1">{v2}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-surface hairline-t py-20">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="overline inline-flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5" /> Profitability Calculator</div>
            <h2 className="font-display text-5xl tracking-wider mt-2">DO THE MATH</h2>
            <p className="text-muted-foreground mt-4">Plug your real numbers in. We'll show what you actually keep.</p>

            <div className="mt-8 space-y-6">
              <Slider label="Hours per day" value={hours} min={4} max={16} onChange={setHours} suffix="h" />
              <Slider label="Days per week" value={daysPerWeek} min={1} max={7} onChange={setDays} suffix="d" />
              <Slider label="Fuel price (GHS / litre)" value={fuelPrice} min={10} max={20} step={0.5} onChange={setFuelPrice} />
            </div>
          </div>

          <div className="bg-card border border-border p-8">
            <div className="overline">Estimated Net Weekly Profit</div>
            <div className="font-display text-6xl md:text-7xl text-primary mt-3">{formatGHS(Math.max(0, Math.round(netWeekly)))}</div>
            <div className="mt-6 space-y-2 text-sm">
              <Row label="Gross income" value={formatGHS(Math.round(grossWeekly))} />
              <Row label="Fuel" value={`- ${formatGHS(Math.round(fuelCost))}`} />
              <Row label="Maintenance / commission" value={`- ${formatGHS(250)}`} />
            </div>
            <div className="mt-6 pt-6 hairline-t text-sm flex justify-between">
              <span className="text-muted-foreground">Annualized</span>
              <span className="font-mono text-foreground">{formatGHS(Math.round(netWeekly * 52))}</span>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Slider({ label, value, min, max, onChange, suffix = "", step = 1 }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void; suffix?: string; step?: number }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="overline">{label}</div>
        <div className="font-mono text-foreground">{value}{suffix}</div>
      </div>
      <input type="range" min={min} max={max} value={value} step={step} onChange={(e) => onChange(+e.target.value)} className="w-full accent-primary" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="font-mono">{value}</span></div>;
}
