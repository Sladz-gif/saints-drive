import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Fuel, Gauge, Settings2 } from "lucide-react";
import type { Vehicle } from "@/lib/mock-data";
import { formatGHS } from "@/lib/mock-data";

export function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <Link to="/cars/$slug" params={{ slug: v.slug }} className="group block bg-card border border-border hover-lift hover:border-foreground/30">
      <div className="relative aspect-[16/10] overflow-hidden bg-background">
        <img src={v.image} alt={v.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 h-9 w-9 inline-flex items-center justify-center bg-black/60 backdrop-blur-sm text-foreground hover:text-primary transition-colors" aria-label="Save">
          <Heart className="w-4 h-4" />
        </button>
        {v.condition === "Brand New" && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-[10px] font-mono uppercase tracking-widest">New</span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl tracking-wide truncate">{v.title}</h3>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3" /> {v.location}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-display text-xl text-primary">{formatGHS(v.price)}</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{v.year}</div>
          </div>
        </div>
        <div className="mt-4 pt-4 hairline-t flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Gauge className="w-3.5 h-3.5" /> {v.km.toLocaleString()} km</span>
          <span className="inline-flex items-center gap-1"><Fuel className="w-3.5 h-3.5" /> {v.fuel}</span>
          <span className="inline-flex items-center gap-1"><Settings2 className="w-3.5 h-3.5" /> {v.transmission}</span>
        </div>
      </div>
    </Link>
  );
}
