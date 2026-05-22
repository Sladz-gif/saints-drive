import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Calendar,
  ShieldCheck,
  MapPin,
  Gauge,
  Fuel,
  Settings2,
  Cog,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Facebook,
  Twitter,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES, formatGHS } from "@/data/mock-data";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
        <Link to="/buy" className="inline-block mt-6 text-primary">
          ← Back to marketplace
        </Link>
      </div>
    </SiteLayout>
  ),
});

function CarDetail() {
  const v = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  // Generate additional gallery images with different crops/effects
  const gallery = [v.image, v.image, v.image, v.image, v.image, v.image];

  const related = VEHICLES.filter((x) => x.id !== v.id).slice(0, 3);
  const features = v.features || [
    "Leather Seats",
    "Sunroof",
    "360° Camera",
    "Apple CarPlay",
    "Heated Seats",
    "Adaptive Cruise",
    "Lane Assist",
    "Wireless Charging",
  ];

  return (
    <SiteLayout>
      <div className="container-x py-8">
        <Link to="/buy" className="text-xs text-muted-foreground font-mono hover:text-primary">
          ← BACK TO RESULTS
        </Link>
      </div>

      <div className="container-x grid lg:grid-cols-[65fr_35fr] gap-4 mb-10">
        <div
          className="aspect-[16/10] bg-card overflow-hidden relative group cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={gallery[active]}
            alt={v.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="text-white font-mono text-xs tracking-widest uppercase">
              Click to expand
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {gallery.slice(0, 4).map((g, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i);
                setLightboxOpen(true);
              }}
              className={`aspect-[4/3] overflow-hidden bg-card border-2 transition-all duration-300 ${active === i ? "border-primary" : "border-transparent hover:border-border"}`}
            >
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
              <div className="overline">
                {v.brand} · {v.year} · {v.condition}
              </div>
              <h1 className="font-display text-5xl md:text-6xl tracking-wider mt-2">{v.title}</h1>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {v.location}
                </span>
                <span>Listed {v.listedDays ?? 1}d ago</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSaved(!saved)}
                className={`h-10 w-10 inline-flex items-center justify-center border transition-all duration-300 ${saved ? "border-primary text-primary" : "border-border hover:border-primary hover:text-primary"}`}
              >
                <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={() => setShareOpen(true)}
                className="h-10 w-10 inline-flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
              </button>
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
              <div
                key={s.label}
                className="bg-card p-5 hover:bg-background transition-colors cursor-default"
              >
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
              Exceptional {v.year} {v.title} in pristine condition. Fully serviced, single owner,
              clean title. Ghana customs cleared. All paperwork ready. Open to inspection by your
              mechanic of choice. Trades considered on premium vehicles.
            </p>
          </div>

          {/* Features */}
          <div className="mt-10">
            <h2 className="overline mb-3">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.map((f) => (
                <div
                  key={f}
                  className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-default"
                >
                  <Check className="w-4 h-4 text-primary shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>

          {/* Condition report */}
          <div className="mt-12">
            <h2 className="overline mb-4 text-primary">Vehicle History</h2>
            <div className="space-y-3">
              {[
                { icon: Check, color: "text-success", text: "No accident history reported" },
                { icon: Check, color: "text-success", text: "No repaint detected" },
                { icon: Check, color: "text-success", text: "Roadworthy certificate valid" },
                { icon: Check, color: "text-success", text: "Imported — Foreign used" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specs Table */}
          <div className="mt-12">
            <h2 className="overline mb-4">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 bg-border border border-border gap-px">
              {[
                ["Year", v.year],
                ["Engine", v.engine || "2.0L TwinPower Turbo"],
                ["Transmission", v.transmission],
                ["Drivetrain", v.drive],
                ["Fuel Type", v.fuel],
                ["Body Style", v.body],
                ["Condition", v.condition],
                ["Horsepower", v.horsepower ? `${v.horsepower} hp` : "252 hp"],
                ["Torque", v.torque ? `${v.torque} Nm` : "350 Nm"],
                ["Top Speed", v.topSpeed || "250 km/h"],
                ["0-100 km/h", v.acceleration || "6.1s"],
                ["Fuel Economy", v.fuelEconomy || "6.5L / 100km"],
                ["Color", v.color || "Alpine White"],
                ["Seats", v.seats ? `${v.seats}` : "5"],
                ["Import Source", v.importSource || "Japan"],
                ["Roadworthy", v.roadworthy || "Valid"],
              ].map(([k, val]) => (
                <div
                  key={k}
                  className="flex justify-between p-4 bg-card text-sm hover:bg-background transition-colors cursor-default"
                >
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-mono">{val}</span>
                </div>
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
              <button className="w-full h-12 bg-primary hover:bg-[#F06020] text-primary-foreground font-mono uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]">
                <Phone className="w-4 h-4" /> Call Us
              </button>
              <a
                href={`https://wa.me/233000000000?text=Hi, I'm interested in the ${v.title} listed on Saints Garage.`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-12 border border-success/40 text-success hover:bg-success/10 font-mono uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button className="w-full h-12 border border-border hover:border-foreground hover:bg-white/5 font-mono uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2 transition-all duration-300">
                <Calendar className="w-4 h-4" /> Book Inspection
              </button>
              <button className="w-full h-12 border border-border hover:border-foreground hover:bg-white/5 font-mono uppercase tracking-wider text-sm transition-all duration-300">
                Reserve This Car
              </button>
            </div>
          </div>
          <div className="bg-card border border-border p-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-success" /> Buyer protection on all Saints
              listings.
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      <div className="container-x mt-20">
        <h2 className="font-display text-3xl tracking-wider mb-6">YOU MIGHT ALSO LIKE</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((r) => (
            <VehicleCard key={r.id} v={r} />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black/95 border-none">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 h-10 w-10 inline-flex items-center justify-center text-white hover:text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setActive((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))}
              className="absolute left-4 z-10 h-12 w-12 inline-flex items-center justify-center text-white hover:text-primary transition-colors bg-black/50 hover:bg-black/70 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <img
              src={gallery[active]}
              alt={v.title}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setActive((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 z-10 h-12 w-12 inline-flex items-center justify-center text-white hover:text-primary transition-colors bg-black/50 hover:bg-black/70 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 w-8 rounded-full transition-all ${active === i ? "bg-primary" : "bg-white/30"}`}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="max-w-md">
          <h3 className="font-display text-2xl tracking-wider mb-4">Share This Vehicle</h3>
          <div className="space-y-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setShareOpen(false);
              }}
              className="w-full h-12 border border-border hover:border-primary font-mono uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Copy className="w-4 h-4" /> Copy Link
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${v.title} - ${window.location.href}`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full h-12 border border-border hover:border-success/40 hover:text-success font-mono uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full h-12 border border-border hover:border-primary font-mono uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Facebook className="w-4 h-4" /> Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${v.title} on Saints Garage`)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full h-12 border border-border hover:border-primary font-mono uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Twitter className="w-4 h-4" /> Twitter
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
