import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Gavel } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Countdown } from "@/components/Countdown";
import { LivePill } from "@/components/Navbar";
import { AUCTIONS, formatGHS } from "@/lib/mock-data";

export const Route = createFileRoute("/auctions")({ component: AuctionsPage });

const TABS = ["All", "Live Now", "Ending Soon", "Upcoming", "Ended"] as const;

function AuctionsPage() {
  const [tab, setTab] = useState<typeof TABS[number]>("All");

  const filtered = AUCTIONS.filter((a) => {
    if (tab === "All") return true;
    if (tab === "Live Now") return a.status === "live";
    if (tab === "Ending Soon") return a.status === "ending";
    if (tab === "Upcoming") return a.status === "upcoming";
    return a.status === "ended";
  });

  return (
    <SiteLayout>
      <div className="bg-surface hairline-b">
        <div className="container-x py-16">
          <div className="overline inline-flex items-center gap-2"><Gavel className="w-3.5 h-3.5" /> Auction House</div>
          <h1 className="font-display text-6xl md:text-7xl tracking-wider mt-2">LIVE AUCTIONS</h1>
          <p className="text-muted-foreground mt-3">Bid in real-time. Win the unwinnable.</p>
        </div>
      </div>

      <div className="container-x py-10">
        <div className="flex gap-1 border-b border-border overflow-x-auto">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 h-11 font-mono text-xs uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t === "Live Now" && <span className="inline-block w-2 h-2 rounded-full bg-destructive mr-2 align-middle animate-pulse-dot" />}
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <Link key={a.id} to="/auctions/$slug" params={{ slug: a.slug }} className="block bg-card border border-border hover-lift">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                {(a.status === "live" || a.status === "ending") && <div className="absolute top-3 left-3"><LivePill /></div>}
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl tracking-wide">{a.title}</h3>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="overline">Current Bid</div>
                    <div className="font-display text-2xl text-primary">{a.currentBid > 0 ? formatGHS(a.currentBid) : "—"}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">{a.bidCount} bids</div>
                  </div>
                  <div className="text-right">
                    <div className="overline">{a.status === "upcoming" ? "Starts In" : "Ends In"}</div>
                    <Countdown endsAt={a.endsAt} compact />
                  </div>
                </div>
                <button className="mt-5 w-full h-10 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-wider text-xs">Place Bid</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
