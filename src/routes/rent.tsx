import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VEHICLES, HERO_IMAGES, formatGHS } from "@/lib/mock-data";

export const Route = createFileRoute("/rent")({ component: RentPage });

function RentPage() {
  const rentals = VEHICLES.slice(0, 6);
  return (
    <SiteLayout transparentNav>
      <section className="relative h-[60vh] min-h-[460px] overflow-hidden">
        <img src={HERO_IMAGES[1]} alt="" className="absolute inset-0 w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container-x h-full flex flex-col justify-end pb-16">
          <div className="overline">Rentals</div>
          <h1 className="font-display text-6xl md:text-8xl tracking-wider mt-2">DRIVE NOW</h1>
        </div>
      </section>

      {/* Booking bar */}
      <div className="sticky top-16 z-40 bg-surface hairline-b">
        <div className="container-x py-4 grid md:grid-cols-[1fr_1fr_1fr_auto] gap-3">
          <InputField icon={MapPin} placeholder="Pickup location" />
          <InputField icon={Calendar} placeholder="Pickup date" />
          <InputField icon={Calendar} placeholder="Return date" />
          <button className="h-11 px-6 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-wider text-sm inline-flex items-center gap-2"><Search className="w-4 h-4" /> Search</button>
        </div>
      </div>

      {/* Categories */}
      <section className="section container-x">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {["All", "Luxury", "SUV", "Sedan", "Pickup"].map((c, i) => (
            <button key={c} className={`h-11 border ${i === 0 ? "bg-primary border-primary text-primary-foreground" : "border-border hover:border-foreground"} font-mono uppercase tracking-wider text-xs`}>{c}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map((v) => (
            <Link key={v.id} to="/rent/$slug" params={{ slug: v.slug }} className="block bg-card border border-border hover-lift">
              <div className="aspect-[16/10] overflow-hidden"><img src={v.image} alt={v.title} className="w-full h-full object-cover" /></div>
              <div className="p-5">
                <h3 className="font-display text-xl tracking-wide">{v.title}</h3>
                <div className="mt-1 text-xs text-muted-foreground">{v.location}</div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="overline">Per day</div>
                    <div className="font-display text-2xl text-primary">{formatGHS(Math.floor(v.price / 1200))}</div>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">/ {formatGHS(Math.floor(v.price / 60))} mo</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function InputField({ icon: Icon, placeholder }: { icon: any; placeholder: string }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input placeholder={placeholder} className="w-full h-11 pl-10 pr-3 bg-card border border-border focus:border-primary outline-none text-sm" />
    </div>
  );
}
