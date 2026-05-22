import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VEHICLES, formatGHS } from "@/lib/mock-data";

export const Route = createFileRoute("/rent/$slug")({
  component: RentDetail,
  loader: ({ params }) => {
    const v = VEHICLES.find((x) => x.slug === params.slug);
    if (!v) throw notFound();
    return v;
  },
  notFoundComponent: () => (<SiteLayout><div className="container-x py-32 text-center"><h1 className="font-display text-5xl">RENTAL NOT FOUND</h1><Link to="/rent" className="text-primary mt-4 inline-block">← Browse rentals</Link></div></SiteLayout>),
});

function RentDetail() {
  const v = Route.useLoaderData();
  const [days, setDays] = useState(3);
  const [withDriver, setWithDriver] = useState(false);
  const dailyRate = Math.floor(v.price / 1200);
  const driverFee = withDriver ? 150 : 0;
  const total = dailyRate * days + driverFee * days;

  return (
    <SiteLayout>
      <div className="container-x py-8">
        <Link to="/rent" className="text-xs text-muted-foreground font-mono hover:text-primary">← BACK TO RENTALS</Link>
      </div>
      <div className="container-x grid lg:grid-cols-[1fr_400px] gap-10">
        <div>
          <div className="aspect-[16/10] bg-card overflow-hidden"><img src={v.image} alt={v.title} className="w-full h-full object-cover" /></div>
          <div className="mt-6">
            <div className="overline">Rental</div>
            <h1 className="font-display text-5xl tracking-wider mt-2">{v.title}</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl">Premium rental ready for pickup. Includes basic insurance, 200 km/day, and roadside assistance.</p>
          </div>
        </div>

        <aside className="bg-card border border-border p-6 self-start lg:sticky lg:top-24">
          <div className="overline">Daily Rate</div>
          <div className="font-display text-4xl text-primary mt-1">{formatGHS(dailyRate)}</div>

          <div className="mt-6 space-y-3">
            <Field label="Pickup Date" icon={Calendar} />
            <Field label="Return Date" icon={Calendar} />
            <div>
              <div className="overline mb-2">Duration</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setDays(Math.max(1, days - 1))} className="h-10 w-10 border border-border">−</button>
                <input value={days} onChange={(e) => setDays(Math.max(1, +e.target.value || 1))} className="flex-1 h-10 text-center bg-background border border-border font-mono" />
                <button onClick={() => setDays(days + 1)} className="h-10 w-10 border border-border">+</button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={withDriver} onChange={(e) => setWithDriver(e.target.checked)} className="accent-primary" />
              Add professional driver (+{formatGHS(150)}/day)
            </label>
          </div>

          <div className="mt-6 pt-6 hairline-t space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-mono">{formatGHS(dailyRate * days)}</span></div>
            {withDriver && <div className="flex justify-between"><span className="text-muted-foreground">Driver</span><span className="font-mono">{formatGHS(driverFee * days)}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Deposit (refundable)</span><span className="font-mono">{formatGHS(1000)}</span></div>
            <div className="flex justify-between pt-3 hairline-t mt-3 text-base"><span>Total</span><span className="font-display text-2xl text-primary">{formatGHS(total)}</span></div>
          </div>
          <button className="mt-6 w-full h-12 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-wider text-sm">Reserve Now</button>
          <div className="mt-4 text-xs text-muted-foreground inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-success" /> Free cancellation up to 24h before pickup</div>
        </aside>
      </div>
    </SiteLayout>
  );
}

function Field({ label, icon: Icon }: { label: string; icon: any }) {
  return (
    <div>
      <div className="overline mb-2">{label}</div>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input className="w-full h-10 pl-10 pr-3 bg-background border border-border text-sm" />
      </div>
    </div>
  );
}
