import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { CountUp } from "@/components/CountUp";
import { Countdown } from "@/components/Countdown";
import { LivePill } from "@/components/Navbar";
import { useReveal } from "@/components/useReveal";
import {
  HERO_IMAGES,
  FEATURED_VEHICLES,
  BRANDS,
  PURPOSES,
  AUCTIONS,
  BLOG_POSTS,
  formatGHS,
} from "@/data/mock-data";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  useReveal();
  const [heroIdx, setHeroIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 7000);
    return () => clearInterval(id);
  }, []);

  const featuredAuction =
    AUCTIONS.find((a) => a.status === "live" || a.status === "ending") ?? AUCTIONS[0];

  return (
    <SiteLayout transparentNav>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <img
          src={HERO_IMAGES[heroIdx]}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover scale-[1.01] transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="relative container-x h-full flex flex-col justify-end pb-20 md:pb-24 lg:pb-32 px-4 md:px-6">
          <div data-reveal="fade-up" className="overline mb-4 text-primary tracking-[0.3em] text-xs sm:text-sm">
            GHANA'S PREMIUM AUTO PLATFORM
          </div>
          <h1
            data-reveal="fade-up"
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-wider leading-[0.9] text-white"
          >
            DRIVE
            <br />
            EXCELLENCE.
          </h1>
          <p
            data-reveal="fade-up"
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/60 max-w-xl font-body"
          >
            Buy. Rent. Auction. Explore — all in one place.
          </p>
          <div data-reveal="fade-up" className="mt-8 sm:mt-10 flex flex-col sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4">
            <Link
              to="/buy"
              className="inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-8 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-widest text-xs sm:text-sm transition-all duration-300 w-full sm:w-auto"
            >
              Buy Cars <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/rent"
              className="inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-8 border border-white/40 hover:border-white text-white font-mono uppercase tracking-widest text-xs sm:text-sm transition-all duration-300 w-full sm:w-auto"
            >
              Rent a Car
            </Link>
            <Link
              to="/auctions"
              className="inline-flex items-center justify-center h-12 sm:h-14 px-4 sm:px-6 text-white hover:text-primary font-mono uppercase tracking-widest text-xs sm:text-sm gap-2 transition-colors group w-full sm:w-auto"
            >
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse-dot" /> Live
              Auctions
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 sm:bottom-10 right-4 sm:right-10 flex flex-col items-center gap-4 text-white/40">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase [writing-mode:vertical-lr]">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="hairline-b bg-surface overflow-x-hidden">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { n: 2840, suffix: "+", label: "Vehicles Listed" },
            { n: 12400, suffix: "+", label: "Happy Drivers" },
            { n: 98, suffix: "%", label: "Inspection Pass Rate" },
            { n: 15, suffix: "+", label: "Years Experience" },
          ].map((s, i) => (
            <div key={i} className="py-8 sm:py-10 px-4 sm:px-6 text-center min-w-0">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl text-primary">
                <CountUp end={s.n} suffix={s.suffix} />
              </div>
              <div className="overline mt-2 text-[10px] sm:text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED VEHICLES */}
      <section className="section container-x">
        <SectionHead
          overline="The Garage"
          title="FEATURED VEHICLES"
          right={
            <Link
              to="/buy"
              className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />
        <div data-reveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {FEATURED_VEHICLES.map((v) => (
            <VehicleCard key={v.id} v={v} />
          ))}
        </div>
      </section>

      {/* BRAND CAROUSEL */}
      <section className="section bg-surface hairline-t hairline-b overflow-hidden">
        <div className="container-x mb-8 sm:mb-10">
          <div className="overline">Explore By Brand</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wider mt-2">
            EVERY LEGEND, ONE PLATFORM
          </h2>
        </div>
        <div className="relative marquee-mask">
          <div
            className="flex gap-3 sm:gap-4 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]"
            style={{ width: "max-content" }}
          >
            {[...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
              <Link
                key={i}
                to="/brands/$brand"
                params={{ brand: b.toLowerCase().replace(" ", "-") }}
                className="inline-flex flex-col items-center justify-center min-w-[160px] sm:min-w-[200px] py-6 sm:py-8 px-6 sm:px-10 bg-card border border-border hover:border-primary group transition-all duration-300"
              >
                <div className="font-display text-xl sm:text-2xl tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors mb-2">
                  {b.toUpperCase()}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground/60 tracking-widest uppercase">
                  Showcase
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CARS BY PURPOSE */}
      <section className="section container-x">
        <SectionHead overline="Find Your Match" title="CARS BY PURPOSE" />
        <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {PURPOSES.map((p) => (
            <Link
              key={p.slug}
              to="/purpose/$slug"
              params={{ slug: p.slug }}
              className="group relative aspect-[4/5] overflow-hidden bg-card hover-lift w-full min-w-0"
            >
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <div className="overline mb-1 text-primary text-[10px] sm:text-xs">{p.tag}</div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AUCTION TEASER */}
      <section className="section bg-surface hairline-t hairline-b overflow-x-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div data-reveal className="min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <LivePill />
              <span className="overline">Auction House</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider leading-[0.95]">
              BID. WIN.
              <br />
              DRIVE HOME.
            </h2>
            <p className="mt-4 sm:mt-5 text-muted-foreground max-w-md text-sm sm:text-base">
              Real-time bidding on Ghana's most exclusive vehicles. Transparent, verified, and
              televised every Friday.
            </p>
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-background border border-border">
              <div className="overline mb-3">Ends In</div>
              <Countdown endsAt={featuredAuction.endsAt} />
            </div>
          </div>
          <div data-reveal className="min-w-0">
            <Link
              to="/auctions/$slug"
              params={{ slug: featuredAuction.slug }}
              className="block group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-background w-full">
                <img
                  src={featuredAuction.image}
                  alt={featuredAuction.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="min-w-0">
                  <div className="overline">Featured Auction</div>
                  <h3 className="font-display text-2xl sm:text-3xl tracking-wider mt-1 truncate">
                    {featuredAuction.title}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="overline">Current Bid</div>
                  <div className="font-display text-2xl sm:text-3xl text-primary">
                    {formatGHS(featuredAuction.currentBid)}
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-5 inline-flex items-center justify-center h-11 px-6 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm w-full sm:w-auto">
                Join Auction <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* RENTAL HIGHLIGHT */}
      <section className="section container-x overflow-x-hidden">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="aspect-[4/3] overflow-hidden bg-card w-full min-w-0 order-2 lg:order-1">
            <img
              src={HERO_IMAGES[1]}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div data-reveal className="min-w-0 order-1 lg:order-2">
            <div className="overline mb-4">Drive On Demand</div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider leading-[0.95]">
              RENT FOR
              <br />
              ANY OCCASION
            </h2>
            <p className="mt-4 sm:mt-5 text-muted-foreground max-w-md text-sm sm:text-base">
              From weekend escapes to wedding fleets. Daily, weekly, monthly — with or without a
              driver.
            </p>
            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 max-w-md">
              {["Weddings", "Business", "Weekend Escape", "Airport Runs"].map((c) => (
                <div
                  key={c}
                  className="border border-border p-3 sm:p-4 hover:border-primary transition-colors cursor-pointer min-w-0"
                >
                  <div className="font-display text-base sm:text-lg tracking-wide truncate">{c}</div>
                </div>
              ))}
            </div>
            <Link
              to="/rent"
              className="mt-6 sm:mt-8 inline-flex items-center justify-center h-12 px-6 sm:px-7 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm w-full sm:w-auto"
            >
              Browse Rentals <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section container-x overflow-x-hidden">
        <SectionHead
          overline="The Journal"
          title="STORIES & GUIDES"
          right={
            <Link
              to="/blog"
              className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
            >
              All posts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />
        <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.id}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group block bg-card border border-border hover-lift w-full min-w-0"
            >
              <div className="aspect-[16/10] overflow-hidden bg-background w-full">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="overline text-primary mb-2 text-[10px] sm:text-xs">{p.category}</div>
                <h3 className="font-display text-lg sm:text-xl tracking-wide leading-tight">{p.title}</h3>
                <div className="mt-4 text-xs text-muted-foreground font-mono">
                  {p.author} · {p.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center">
            <div className="overline">Stay In The Loop</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider mt-3">
              NEW DROPS. WEEKLY.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Auctions, fresh listings, and rare finds. No spam.
            </p>
            {subscribed ? (
              <div className="mt-8 inline-flex items-center gap-3 text-success font-mono uppercase tracking-wider">
                <Check className="w-5 h-5" /> You're in.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
                className="mt-8 flex max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-12 pl-11 pr-4 bg-card border border-border focus:border-primary outline-none text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-6 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-wider text-sm transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHead({
  overline,
  title,
  right,
}: {
  overline: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <div className="overline">{overline}</div>
        <h2 className="font-display text-4xl md:text-6xl tracking-wider mt-2">{title}</h2>
      </div>
      {right}
    </div>
  );
}
