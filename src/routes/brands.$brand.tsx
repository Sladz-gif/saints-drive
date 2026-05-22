import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES, HERO_IMAGES } from "@/lib/mock-data";

export const Route = createFileRoute("/brands/$brand")({ component: BrandPage });

function BrandPage() {
  const { brand } = Route.useParams();
  const brandName = brand.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  const cars = VEHICLES.filter((v) => v.brand.toLowerCase().includes(brand.toLowerCase())).length > 0
    ? VEHICLES.filter((v) => v.brand.toLowerCase().includes(brand.toLowerCase()))
    : VEHICLES.slice(0, 6);

  return (
    <SiteLayout transparentNav>
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={HERO_IMAGES[0]} alt="" className="absolute inset-0 w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative container-x h-full flex flex-col justify-end pb-16">
          <div className="overline">Brand · Est. 1916</div>
          <h1 className="font-display text-7xl md:text-9xl tracking-wider mt-2">{brandName.toUpperCase()}</h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-xl">Engineering that refuses to settle.</p>
        </div>
      </section>

      <div className="container-x py-12">
        <div className="flex gap-2 overflow-x-auto mb-8">
          {["All", "Sedan", "SUV", "Coupe"].map((t, i) => (
            <button key={t} className={`h-10 px-5 border ${i === 0 ? "bg-primary border-primary text-primary-foreground" : "border-border hover:border-foreground"} font-mono uppercase text-xs tracking-wider`}>{t}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
      </div>

      <section className="bg-surface hairline-t py-20">
        <div className="container-x">
          <div className="overline">Heritage</div>
          <h2 className="font-display text-5xl tracking-wider mt-2">A CENTURY OF MOTION</h2>
          <div className="mt-10 grid md:grid-cols-4 gap-6">
            {[["1916", "Founded"], ["1962", "Neue Klasse"], ["1972", "First M car"], ["2024", "EV era"]].map(([y, e]) => (
              <div key={y} className="border-l-2 border-primary pl-4">
                <div className="font-display text-3xl text-primary">{y}</div>
                <div className="text-sm text-muted-foreground mt-1">{e}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="overline">Ghana Insights</div>
        <h2 className="font-display text-4xl tracking-wider mt-2">MAINTENANCE IN GHANA</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[["Parts Availability", "High — Accra, Kumasi"], ["Service Cost", "GHS 1,200 avg / service"], ["Resale Value", "Strong after 5 years"]].map(([k, v]) => (
            <div key={k} className="p-5 border border-border bg-card">
              <div className="overline">{k}</div>
              <div className="font-display text-xl mt-1">{v}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
