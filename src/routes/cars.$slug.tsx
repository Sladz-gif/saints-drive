import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Share2, Phone, MessageCircle, Calendar, ShieldCheck, MapPin, Gauge, Fuel, Settings2, Cog, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES, formatGHS } from "@/lib/mock-data";

export const Route = createFileRoute("/cars/$slug")({
  component: CarDetail,
  loader: ({ params }) => {
    const v = VEHICLES.find((x) => x.slug === params.slug);
    if (!v) throw notFound();
    return v;
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-5xl tracking-wider">VEHICLE NOT FOUND</h1>
        <Link to="/buy" className="inline-block mt-6 text-primary">← Back to marketplace</Link>
      </div>
    </SiteLayout>
  ),
});

function CarDetail() {
  const v = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const gallery = [v.image, v.image, v.image, v.image, v.image];
  const related = VEHICLES.filter((x) => x.id !== v.id).slice(0, 3);
  const features = ["Leather Seats", "Sunroof", "360° Camera", "Apple CarPlay", "Heated Seats", "Adaptive Cruise", "Lane Assist", "Wireless Charging"];

  return (
    <SiteLayout>
      <div className="container-x py-8">
        <Link to="/buy" className="text-xs text-muted-foreground font-mono hover:text-primary">← BACK TO RESULTS</Link>
      </div>

      <div className="container-x grid lg:grid-cols-[65fr_35fr] gap-4 mb-10">
        <div className="aspect-[16/10] bg-card overflow-hidden">
          <img src={gallery[active]} alt={v.title} className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {gallery.slice(0, 4).map((g, i) => (
            <button key={i} onClick={() => setActive(i)} className={`aspect-[4/3] overflow-hidden bg-card border-2 transition-colors ${active === i ? "border-primary" : "border-transparent"}`}>
              <img src={g} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="container-x grid lg:grid-cols-[1fr_380px] gap-10">
        {/* MAIN */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="overline">{v.brand} · {v.year} · {v.condition}</div>
              <h1 className="font-display text-5xl md:text-6xl tracking-wider mt-2">{v.title}</h1>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {v.location}</span>
                <span>Listed {v.listedDays ?? 1}d ago</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 inline-flex items-center justify-center border border-border hover:border-primary hover:text-primary"><Heart className="w-4 h-4" /></button>
              <button className="h-10 w-10 inline-flex items-center justify-center border border-border hover:border-primary hover:text-primary"><Share2 className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Specs strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {[
              { Icon: Gauge, label: "Mileage", value: `${v.km.toLocaleString()} km` },
              { Icon: Fuel, label: "Fuel", value: v.fuel },
              { Icon: Settings2, label: "Transmission", value: v.transmission },
              { Icon: Cog, label: "Drive", value: v.drive },
            ].map((s) => (
              <div key={s.label} className="bg-card p-5">
                <s.Icon className="w-4 h-4 text-primary mb-3" />
                <div className="overline">{s.label}</div>
                <div className="font-display text-xl tracking-wide mt-1">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-10">
            <h2 className="overline mb-3">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              Exceptional {v.year} {v.title} in pristine condition. Fully serviced, single owner, clean title. Ghana customs cleared.
              All paperwork ready. Open to inspection by your mechanic of choice. Trades considered on premium vehicles.
            </p>
          </div>

          {/* Features */}
          <div className="mt-10">
            <h2 className="overline mb-3">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.map((f) => (
                <div key={f} className="inline-flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>

          {/* Condition report */}
          <div className="mt-10 p-6 bg-card border border-border">
            <div className="flex items-center gap-2 overline mb-3"><ShieldCheck className="w-4 h-4 text-success" /> Inspection Report · Passed</div>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              {[["Body","9.2/10"],["Engine","9.5/10"],["Interior","9.0/10"],["Tires","8.5/10"],["Electronics","10/10"],["Service History","Complete"]].map(([k,v2]) => (
                <div key={k} className="flex justify-between border-b border-border pb-1"><span className="text-muted-foreground">{k}</span><span className="font-mono">{v2}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* STICKY SIDEBAR */}
        <aside className="lg:sticky lg:top-24 self-start space-y-4">
          <div className="bg-card border border-border p-6">
            <div className="overline">Listed Price</div>
            <div className="font-display text-4xl text-primary mt-1">{formatGHS(v.price)}</div>
            <div className="mt-5 space-y-3">
              <button className="w-full h-12 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2"><Phone className="w-4 h-4" /> Call Dealer</button>
              <a href={`https://wa.me/233000000000?text=Hi, I'm interested in ${v.title}`} target="_blank" rel="noreferrer" className="w-full h-12 border border-success/40 text-success hover:bg-success/10 font-mono uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
              <button className="w-full h-12 border border-border hover:border-foreground font-mono uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2"><Calendar className="w-4 h-4" /> Book Inspection</button>
              <button className="w-full h-12 border border-border hover:border-foreground font-mono uppercase tracking-wider text-sm">Reserve This Car</button>
            </div>
          </div>
          <div className="bg-card border border-border p-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-success" /> Buyer protection on all Saints listings.</div>
          </div>
        </aside>
      </div>

      {/* Related */}
      <div className="container-x mt-20">
        <h2 className="font-display text-3xl tracking-wider mb-6">YOU MIGHT ALSO LIKE</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((r) => <VehicleCard key={r.id} v={r} />)}
        </div>
      </div>
    </SiteLayout>
  );
}
