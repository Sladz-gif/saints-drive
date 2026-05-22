import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { CountUp } from "@/components/CountUp";
import { Countdown } from "@/components/Countdown";
import { LivePill } from "@/components/Navbar";
import { useReveal } from "@/components/useReveal";
import { HERO_IMAGES, FEATURED_VEHICLES, BRANDS, PURPOSES, AUCTIONS, BLOG_POSTS, formatGHS } from "@/lib/mock-data";

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

  const featuredAuction = AUCTIONS.find((a) => a.status === "live" || a.status === "ending") ?? AUCTIONS[0];

  return (
    <SiteLayout transparentNav>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === heroIdx ? "opacity-100" : "opacity-0"}`}
          >
            <img src={src} alt="" className={i === heroIdx ? "w-full h-full object-cover animate-ken-burns" : "w-full h-full object-cover"} />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="relative container-x h-full flex flex-col justify-end pb-24 md:pb-32">
          <div className="overline mb-4 animate-fade-up">Ghana's Premium Auto Platform</div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider leading-[0.95] animate-fade-up">
            DRIVE<br />EXCELLENCE
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up">
            <Link to="/buy" className="inline-flex items-center h-12 px-7 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-wider text-sm transition-colors">
              Buy Cars <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/rent" className="inline-flex items-center h-12 px-7 border border-foreground/40 hover:border-foreground text-foreground font-mono uppercase tracking-wider text-sm transition-colors">
              Rent a Car
            </Link>
            <Link to="/auctions" className="inline-flex items-center h-12 px-5 text-foreground/90 hover:text-foreground font-mono uppercase tracking-wider text-sm gap-2 transition-colors">
              <LivePill /> Live Auctions
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground animate-pulse-dot">
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="hairline-b bg-surface">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { n: 2840, suffix: "+", label: "Vehicles Listed" },
            { n: 156, suffix: "", label: "Verified Dealers" },
            { n: 12400, suffix: "+", label: "Happy Drivers" },
            { n: 98, suffix: "%", label: "Inspection Pass Rate" },
          ].map((s, i) => (
            <div key={i} className="py-10 px-6 text-center">
              <div className="font-display text-4xl md:text-5xl text-primary"><CountUp end={s.n} suffix={s.suffix} /></div>
              <div className="overline mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED VEHICLES */}
      <section className="section container-x">
        <SectionHead overline="The Garage" title="FEATURED VEHICLES" right={<Link to="/buy" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></Link>} />
        <div data-reveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {FEATURED_VEHICLES.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
      </section>

      {/* BRAND CAROUSEL */}
      <section className="hairline-t hairline-b bg-surface py-12 marquee-mask overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="font-display text-2xl md:text-3xl tracking-widest text-muted-foreground hover:text-foreground transition-colors">{b}</span>
          ))}
        </div>
      </section>

      {/* CARS BY PURPOSE */}
      <section className="section container-x">
        <SectionHead overline="Find Your Match" title="CARS BY PURPOSE" />
        <div data-reveal className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {PURPOSES.map((p) => (
            <Link key={p.slug} to="/purpose/$slug" params={{ slug: p.slug }} className="group relative aspect-[4/5] overflow-hidden bg-card hover-lift">
              <img src={p.image} alt="" loading="lazy" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="overline mb-1 text-primary">{p.tag}</div>
                <h3 className="font-display text-2xl md:text-3xl tracking-wider">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AUCTION TEASER */}
      <section className="section bg-surface hairline-t hairline-b">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <div className="flex items-center gap-3 mb-4"><LivePill /><span className="overline">Auction House</span></div>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider leading-[0.95]">BID. WIN.<br />DRIVE HOME.</h2>
            <p className="mt-5 text-muted-foreground max-w-md">Real-time bidding on Ghana's most exclusive vehicles. Transparent, verified, and televised every Friday.</p>
            <div className="mt-8 p-6 bg-background border border-border">
              <div className="overline mb-3">Ends In</div>
              <Countdown endsAt={featuredAuction.endsAt} />
            </div>
          </div>
          <div data-reveal>
            <Link to="/auctions/$slug" params={{ slug: featuredAuction.slug }} className="block group">
              <div className="aspect-[4/3] overflow-hidden bg-background">
                <img src={featuredAuction.image} alt={featuredAuction.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="overline">Featured Auction</div>
                  <h3 className="font-display text-3xl tracking-wider mt-1">{featuredAuction.title}</h3>
                </div>
                <div className="text-right">
                  <div className="overline">Current Bid</div>
                  <div className="font-display text-3xl text-primary">{formatGHS(featuredAuction.currentBid)}</div>
                </div>
              </div>
              <div className="mt-5 inline-flex items-center h-11 px-6 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm">Join Auction <ArrowRight className="w-4 h-4 ml-2" /></div>
            </Link>
          </div>
        </div>
      </section>

      {/* RENTAL HIGHLIGHT */}
      <section className="section container-x">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] overflow-hidden bg-card">
            <img src={HERO_IMAGES[1]} alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div data-reveal>
            <div className="overline mb-4">Drive On Demand</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider leading-[0.95]">RENT FOR<br />ANY OCCASION</h2>
            <p className="mt-5 text-muted-foreground max-w-md">From weekend escapes to wedding fleets. Daily, weekly, monthly — with or without a driver.</p>
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
              {["Weddings", "Business", "Weekend Escape", "Airport Runs"].map((c) => (
                <div key={c} className="border border-border p-4 hover:border-primary transition-colors cursor-pointer">
                  <div className="font-display text-lg tracking-wide">{c}</div>
                </div>
              ))}
            </div>
            <Link to="/rent" className="mt-8 inline-flex items-center h-12 px-7 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm">Browse Rentals <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section container-x">
        <SectionHead overline="The Journal" title="STORIES & GUIDES" right={<Link to="/blog" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">All posts <ArrowRight className="w-3.5 h-3.5" /></Link>} />
        <div data-reveal className="grid md:grid-cols-3 gap-6 mt-10">
          {BLOG_POSTS.map((p) => (
            <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group block bg-card border border-border hover-lift">
              <div className="aspect-[16/10] overflow-hidden bg-background">
                <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-5">
                <div className="overline text-primary mb-2">{p.category}</div>
                <h3 className="font-display text-xl tracking-wide leading-tight">{p.title}</h3>
                <div className="mt-4 text-xs text-muted-foreground font-mono">{p.author} · {p.readTime}</div>
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
            <h2 className="font-display text-5xl md:text-6xl tracking-wider mt-3">NEW DROPS. WEEKLY.</h2>
            <p className="mt-4 text-muted-foreground">Auctions, fresh listings, and rare finds. No spam.</p>
            {subscribed ? (
              <div className="mt-8 inline-flex items-center gap-3 text-success font-mono uppercase tracking-wider">
                <Check className="w-5 h-5" /> You're in.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} className="mt-8 flex max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full h-12 pl-11 pr-4 bg-card border border-border focus:border-primary outline-none text-sm" />
                </div>
                <button type="submit" className="h-12 px-6 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-wider text-sm transition-colors">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHead({ overline, title, right }: { overline: string; title: string; right?: React.ReactNode }) {
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
