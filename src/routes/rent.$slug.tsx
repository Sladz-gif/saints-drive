import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  ShieldCheck,
  MapPin,
  Gauge,
  Fuel,
  Settings2,
  Cog,
  Check,
  Lock,
  ChevronLeft,
  User,
  X,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { RENTALS, VEHICLES, formatGHS } from "@/data/mock-data";

export const Route = createFileRoute("/rent/$slug")({
  component: RentDetail,
  loader: ({ params }) => {
    const r = RENTALS.find((x) => x.id === params.slug);
    if (!r) throw notFound();
    return r;
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-5xl tracking-wider uppercase">RENTAL NOT FOUND</h1>
        <Link
          to="/rent"
          className="text-primary mt-6 inline-block font-mono uppercase tracking-widest text-xs"
        >
          ← Browse rentals
        </Link>
      </div>
    </SiteLayout>
  ),
});

function RentDetail() {
  const r = Route.useLoaderData();
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [active, setActive] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "momo" | null>(null);
  const gallery = [r.image, r.image, r.image, r.image, r.image];
  const related = VEHICLES.slice(0, 3);
  const features = [
    "Leather Seats",
    "Sunroof",
    "360° Camera",
    "Apple CarPlay",
    "Heated Seats",
    "Adaptive Cruise",
    "Lane Assist",
    "Wireless Charging",
  ];

  // Calculate duration
  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(r.minDays || 1, diffDays);
  };

  const days = calculateDays();
  const driverFee = withDriver && r.driverDailyRate ? r.driverDailyRate : 0;
  const deposit = r.deposit;

  // Calculate total based on duration
  let baseTotal = 0;
  if (days >= 7 && r.weeklyRate) {
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    baseTotal = weeks * r.weeklyRate + remainingDays * r.dailyRate;
  } else if (days >= 30 && r.monthlyRate) {
    baseTotal = r.monthlyRate;
  } else {
    baseTotal = r.dailyRate * days;
  }

  const driverTotal = driverFee * days;
  const total = baseTotal + driverTotal + deposit;

  return (
    <SiteLayout>
      <div className="container-x py-8">
        <Link
          to="/rent"
          className="text-xs text-muted-foreground font-mono hover:text-primary inline-flex items-center gap-2"
        >
          <ChevronLeft className="w-3 h-3" /> BACK TO RENTALS
        </Link>
      </div>

      <div className="container-x grid lg:grid-cols-[65fr_35fr] gap-4 mb-10">
        <div className="aspect-[16/10] bg-card overflow-hidden border border-border">
          <img src={gallery[active]} alt={r.vehicle} className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {gallery.slice(0, 4).map((g, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-[4/3] overflow-hidden bg-card border-2 transition-all ${active === i ? "border-primary" : "border-border hover:border-primary/50"}`}
            >
              <img src={g} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="container-x grid lg:grid-cols-[1fr_400px] gap-12">
        {/* MAIN */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="overline text-primary">{r.category}</div>
              <h1 className="font-display text-5xl md:text-6xl tracking-wider mt-2">
                {r.vehicle.toUpperCase()}
              </h1>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest font-mono">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-primary" /> {r.locations.join(", ")}
                </span>
                <span>•</span>
                <span>Available Today</span>
              </div>
            </div>
          </div>

          {/* Rate Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border p-6 hover:border-primary/50 transition-colors">
              <div className="overline text-[10px] text-muted-foreground mb-2">Daily</div>
              <div className="font-display text-3xl text-primary">{formatGHS(r.dailyRate)}</div>
              <div className="text-xs text-muted-foreground mt-1">per day</div>
            </div>
            {r.weeklyRate && (
              <div className="bg-card border border-border p-6 hover:border-primary/50 transition-colors">
                <div className="overline text-[10px] text-muted-foreground mb-2">Weekly</div>
                <div className="font-display text-3xl text-primary">{formatGHS(r.weeklyRate)}</div>
                <div className="text-xs text-muted-foreground mt-1">per week</div>
              </div>
            )}
            {r.monthlyRate && (
              <div className="bg-card border border-border p-6 hover:border-primary/50 transition-colors">
                <div className="overline text-[10px] text-muted-foreground mb-2">Monthly</div>
                <div className="font-display text-3xl text-primary">{formatGHS(r.monthlyRate)}</div>
                <div className="text-xs text-muted-foreground mt-1">per month</div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-12">
            <h2 className="overline mb-6">Standard Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
              {features.map((f) => (
                <div key={f} className="inline-flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" />{" "}
                  <span className="text-foreground/80">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="mt-12 p-8 bg-surface border border-border">
            <div className="flex items-center gap-3 overline mb-4">
              <ShieldCheck className="w-4 h-4 text-success" /> Quality Assurance
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-xs uppercase tracking-widest font-mono">
              {[
                ["Maintenance", "Perfect"],
                ["Insurance", "Gold Coverage"],
                ["Cleaning", "Professional"],
                ["Fuel Level", "Full to Full"],
              ].map(([k, v2]) => (
                <div
                  key={k}
                  className="flex justify-between border-b border-border/40 pb-2 mr-4 last:border-0 last:pb-0"
                >
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-foreground">{v2}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOOKING SIDEBAR */}
        <aside className="lg:sticky lg:top-24 self-start space-y-6">
          <div className="bg-card border border-border p-8 shadow-2xl">
            <div className="overline mb-2">Starting From</div>
            <div className="font-display text-5xl text-primary">{formatGHS(r.dailyRate)}</div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mt-1">
              per day
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <div className="overline mb-2">Pickup Date</div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full h-12 pl-12 pr-4 bg-background border border-border focus:border-primary outline-none text-sm font-mono uppercase tracking-wider transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="overline mb-2">Return Date</div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split("T")[0]}
                    className="w-full h-12 pl-12 pr-4 bg-background border border-border focus:border-primary outline-none text-sm font-mono uppercase tracking-wider transition-colors"
                  />
                </div>
              </div>

              {days > 0 && (
                <div className="p-4 bg-surface border border-border">
                  <div className="flex justify-between items-center">
                    <div className="overline">Duration</div>
                    <div className="font-mono text-sm text-primary">{days} DAYS</div>
                  </div>
                </div>
              )}

              {r.driverAvailable && (
                <label className="flex items-center gap-3 p-4 bg-surface border border-border cursor-pointer group hover:border-primary/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={withDriver}
                    onChange={(e) => setWithDriver(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                      <User className="w-3 h-3" /> Add Driver
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      +{formatGHS(r.driverDailyRate)} / day
                    </div>
                  </div>
                </label>
              )}
            </div>

            {days > 0 && (
              <>
                <div className="mt-8 pt-8 border-t border-border space-y-3 text-xs font-mono uppercase tracking-widest">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base ({days} days)</span>
                    <span>{formatGHS(baseTotal)}</span>
                  </div>
                  {withDriver && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Driver Fee</span>
                      <span>{formatGHS(driverTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Refundable Deposit</span>
                    <span>{formatGHS(deposit)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-border mt-4 text-lg font-display tracking-wider text-white">
                    <span>Total Due</span>
                    <span className="text-3xl text-primary">{formatGHS(total)}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="overline text-[10px] text-muted-foreground mb-2">
                    Payment Method
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPaymentMethod("paystack")}
                      className={`h-10 border text-[10px] font-mono uppercase tracking-widest transition-all ${paymentMethod === "paystack" ? "border-primary bg-primary/10" : "border-border hover:border-primary"}`}
                    >
                      Paystack
                    </button>
                    <button
                      onClick={() => setPaymentMethod("momo")}
                      className={`h-10 border text-[10px] font-mono uppercase tracking-widest transition-all ${paymentMethod === "momo" ? "border-primary bg-primary/10" : "border-border hover:border-primary"}`}
                    >
                      Mobile Money
                    </button>
                  </div>
                </div>

                <button
                  disabled={!paymentMethod || !pickupDate || !returnDate}
                  className={`mt-8 w-full h-14 font-mono uppercase tracking-widest text-sm inline-flex items-center justify-center gap-3 transition-all ${!paymentMethod || !pickupDate || !returnDate ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary hover:bg-[#F06020] text-primary-foreground hover:scale-[1.01]"}`}
                >
                  <Lock className="w-4 h-4" /> Confirm Booking
                </button>
              </>
            )}

            <p className="mt-4 text-[10px] text-muted-foreground text-center font-mono uppercase tracking-widest">
              Price includes all taxes & fees
            </p>
          </div>

          <div className="p-6 bg-surface border border-border flex items-center gap-4">
            <ShieldCheck className="w-6 h-6 text-success shrink-0" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground leading-relaxed">
              <span className="text-white">Free cancellation</span> up to 24h before pickup. Full
              refund guaranteed.
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      <div className="container-x mt-24 pb-24">
        <div className="overline mb-6">More for You</div>
        <h2 className="font-display text-4xl tracking-wider mb-8 uppercase">YOU MIGHT ALSO LIKE</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {related.map((r) => (
            <VehicleCard key={r.id} v={r} />
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
