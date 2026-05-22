import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Gavel, Clock, ChevronRight, TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Countdown } from "@/components/Countdown";
import { LivePill } from "@/components/Navbar";
import { AUCTIONS, formatGHS, HERO_IMAGES } from "@/data/mock-data";

export const Route = createFileRoute("/auctions")({ component: AuctionsPage });

const TABS = ["All", "Live Now", "Ending Soon", "Upcoming", "Ended"] as const;

function AuctionsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const filtered = AUCTIONS.filter((a) => {
    if (tab === "All") return true;
    if (tab === "Live Now") return a.status === "live";
    if (tab === "Ending Soon") return a.status === "ending";
    if (tab === "Upcoming") return a.status === "upcoming";
    return a.status === "ended";
  });

  return (
    <SiteLayout transparentNav>
      <section className="relative h-[60vh] min-h-[460px] overflow-hidden">
        <img
          src={HERO_IMAGES[2]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative container-x h-full flex flex-col justify-end pb-24">
          <div className="flex items-center gap-3 mb-4">
            <LivePill />
            <span className="overline text-white/60 tracking-[0.2em]">Real-Time Bidding</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-9xl tracking-wider leading-[0.85] text-white">
            LIVE
            <br />
            AUCTIONS.
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-white/70 max-w-xl font-body">
            Bid on Ghana's most exclusive inventory. Transparent, verified, and high-stakes.
          </p>
        </div>
      </section>

      <div className="bg-surface hairline-b sticky top-16 z-40 shadow-xl">
        <div className="container-x flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 sm:px-6 md:px-8 h-16 font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap border-b-2 transition-all ${
                tab === t
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              {t === "Live Now" && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-destructive mr-2 sm:mr-3 align-middle animate-pulse-dot" />
              )}
              {t}
            </button>
          ))}
        </div>
      </div>

      <section className="py-20 container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="overline text-primary">The Bidding Floor</div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wider mt-2">{tab.toUpperCase()}</h2>
          </div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {filtered.length} active auctions
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((a) => (
            <Link
              key={a.id}
              to="/auctions/$slug"
              params={{ slug: a.slug }}
              className="group block bg-card border border-border hover-lift overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {(a.status === "live" || a.status === "ending") && <LivePill />}
                  {a.status === "upcoming" && (
                    <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30">
                      Upcoming
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/80">
                      <Clock className="w-3 h-3 text-primary" />
                      {a.status === "upcoming" ? "Starts In" : "Ends In"}
                    </div>
                    <Countdown endsAt={a.endsAt} compact />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl tracking-wider group-hover:text-primary transition-colors uppercase">
                  {a.title}
                </h3>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="overline text-[9px] text-muted-foreground">Current Bid</div>
                    <div className="font-display text-3xl text-primary">
                      {a.currentBid > 0 ? formatGHS(a.currentBid) : "OPENING"}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="overline text-[9px] text-muted-foreground">Activity</div>
                    <div className="font-mono text-sm text-foreground flex items-center justify-end gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-success" /> {a.bidCount} BIDS
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full h-12 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-widest text-xs inline-flex items-center justify-center gap-2 transition-all">
                  <Gavel className="w-4 h-4" /> Place Bid
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center bg-card border border-border">
            <div className="h-16 w-16 rounded-full bg-surface inline-flex items-center justify-center mb-6">
              <Gavel className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-3xl tracking-wider">NO AUCTIONS FOUND</h3>
            <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-widest">
              Try changing your filter or check back later.
            </p>
            <button
              onClick={() => setTab("All")}
              className="mt-8 text-primary font-mono text-xs uppercase tracking-widest hover:underline"
            >
              View All Auctions
            </button>
          </div>
        )}
      </section>

      {/* Auction Rules */}
      <section className="bg-surface py-16 sm:py-24 hairline-t">
        <div className="container-x grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
          <div>
            <div className="overline text-primary mb-4">House Rules</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wider">HOW IT WORKS</h2>
            <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
              {[
                {
                  title: "Verified Listings",
                  desc: "Every vehicle on auction has passed a 150-point physical inspection.",
                },
                {
                  title: "Instant Reservation",
                  desc: "Winners must pay a commitment fee within 2 hours of auction close.",
                },
                {
                  title: "Proxy Bidding",
                  desc: "Set your max bid and let our system bid for you in minimum increments.",
                },
              ].map((rule, i) => (
                <div key={i} className="flex gap-4 sm:gap-6">
                  <div className="font-display text-2xl sm:text-3xl text-primary/40 shrink-0">0{i + 1}</div>
                  <div>
                    <h4 className="font-display text-lg sm:text-xl tracking-wider uppercase mb-1">
                      {rule.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="font-display text-2xl sm:text-3xl tracking-wider mb-4 sm:mb-6">NEXT BIG EVENT</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-end border-b border-border pb-3 sm:pb-4">
                <div>
                  <div className="overline text-[9px] sm:text-[10px] text-muted-foreground">
                    Friday Night Special
                  </div>
                  <div className="font-display text-xl sm:text-2xl mt-1">SUPERCAR SHOWDOWN</div>
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-primary">MAY 29, 2026</div>
              </div>
              <div className="pt-3 sm:pt-4">
                <button className="w-full h-11 sm:h-12 bg-white text-black font-mono uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all">
                  Get Notified
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
