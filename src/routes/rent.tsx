import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  Search,
  Key,
  User,
  Car,
  Plane,
  Building,
  Clock,
  ChevronRight,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VEHICLES, HERO_IMAGES, formatGHS } from "@/data/mock-data";

export const Route = createFileRoute("/rent")({ component: RentPage });

function RentPage() {
  const rentals = VEHICLES.slice(0, 6);
  return (
    <SiteLayout transparentNav>
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
        <img
          src={HERO_IMAGES[1]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative container-x h-full flex flex-col justify-end pb-24">
          <div className="overline tracking-[0.3em] text-primary">Drive on Demand</div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-9xl tracking-wider mt-4 leading-[0.85] text-white">
            RIDE IN
            <br />
            STYLE.
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-white/70 max-w-xl font-body">
            Premium rentals for every occasion. Experience Ghana from the finest seats.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <button className="h-14 px-8 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm inline-flex items-center gap-3">
              <Key className="w-4 h-4" /> Browse Rentals
            </button>
            <button className="h-14 px-8 border border-white/20 hover:border-white text-white font-mono uppercase tracking-widest text-sm inline-flex items-center gap-3 transition-colors">
              <User className="w-4 h-4" /> Request Chauffeur
            </button>
          </div>
        </div>
      </section>

      {/* Booking bar (sticky) */}
      <div className="sticky top-16 z-40 bg-surface hairline-b shadow-2xl">
        <div className="container-x py-4 sm:py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-3 sm:gap-4">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select className="w-full h-12 pl-12 pr-4 bg-card border border-border focus:border-primary outline-none text-sm appearance-none font-mono uppercase tracking-wider">
              <option>Pickup Location ▼</option>
              <option>Accra (Kotoka Int. Airport)</option>
              <option>East Legon, Accra</option>
              <option>Kumasi Central</option>
              <option>Takoradi</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input
              type="text"
              placeholder="Pickup Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              className="w-full h-12 pl-12 pr-4 bg-card border border-border focus:border-primary outline-none text-sm font-mono uppercase tracking-wider"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input
              type="text"
              placeholder="Return Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              className="w-full h-12 pl-12 pr-4 bg-card border border-border focus:border-primary outline-none text-sm font-mono uppercase tracking-wider"
            />
          </div>
          <button className="h-12 px-6 sm:px-8 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2 transition-all">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container-x">
          <div className="overline mb-8 sm:mb-12">Service Categories</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { label: "Daily Rentals", icon: Car },
              { label: "Wedding Cars", icon: Key },
              { label: "Airport Pickups", icon: Plane },
              { label: "Chauffeur", icon: User },
              { label: "Monthly", icon: Clock },
              { label: "Corporate", icon: Building },
            ].map((cat) => (
              <button
                key={cat.label}
                className="group p-4 sm:p-6 md:p-8 bg-card border border-border hover:border-primary transition-all duration-300 flex flex-col items-center text-center"
              >
                <cat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-display text-[10px] sm:text-xs md:text-sm tracking-[0.15em] uppercase">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Listings */}
      <section className="pb-20 sm:pb-24 container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="overline text-primary">Available Now</div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wider mt-2">PREMIUM FLEET</h2>
          </div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Showing {rentals.length} results
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {rentals.map((v) => (
            <Link
              key={v.id}
              to="/rent/$slug"
              params={{ slug: v.slug }}
              className="group block bg-card border border-border hover-lift overflow-hidden"
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-surface">
                <img
                  src={v.image}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-white border border-white/10">
                    Verified
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl tracking-wider group-hover:text-primary transition-colors">
                  {v.title.toUpperCase()}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                  <MapPin className="w-3 h-3 text-primary" /> {v.location}
                </div>

                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="overline text-[9px] text-muted-foreground">Rate</div>
                    <div className="font-display text-3xl text-primary">
                      {formatGHS(Math.floor(v.price / 1200))}{" "}
                      <span className="text-xs text-muted-foreground font-mono tracking-normal">
                        / DAY
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-tighter">
                      Monthly: {formatGHS(Math.floor(v.price / 60))}
                    </div>
                    <div className="mt-2 inline-flex items-center text-[10px] font-mono uppercase tracking-widest text-primary group-hover:gap-2 transition-all">
                      Book <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <button className="h-12 sm:h-14 px-8 sm:px-10 border border-border hover:border-primary text-foreground font-mono uppercase tracking-widest text-sm transition-all group">
            Load More{" "}
            <ChevronRight className="inline-block w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </SiteLayout>
  );
}
