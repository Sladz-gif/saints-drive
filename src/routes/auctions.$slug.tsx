import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Gavel } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Countdown } from "@/components/Countdown";
import { LivePill } from "@/components/Navbar";
import { AUCTIONS, formatGHS } from "@/lib/mock-data";

export const Route = createFileRoute("/auctions/$slug")({
  component: AuctionDetail,
  loader: ({ params }) => {
    const a = AUCTIONS.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return a;
  },
  notFoundComponent: () => (<SiteLayout><div className="container-x py-32 text-center"><h1 className="font-display text-5xl">AUCTION NOT FOUND</h1></div></SiteLayout>),
});

function AuctionDetail() {
  const a = Route.useLoaderData();
  const [bid, setBid] = useState(a.currentBid + 5000);
  const minNext = a.currentBid + 5000;
  const [history, setHistory] = useState<{ name: string; amount: number; t: string }[]>([
    { name: "Kojo A.", amount: a.currentBid, t: "12s ago" },
    { name: "Ama O.", amount: a.currentBid - 5000, t: "1m ago" },
    { name: "Nana K.", amount: a.currentBid - 10000, t: "3m ago" },
  ]);

  // Simulated realtime updates
  useEffect(() => {
    const id = setInterval(() => {
      setHistory((h) => [{ name: "Live bidder", amount: h[0].amount + Math.floor(Math.random() * 3 + 1) * 5000, t: "just now" }, ...h].slice(0, 8));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <SiteLayout>
      <div className="container-x py-8">
        <Link to="/auctions" className="text-xs text-muted-foreground font-mono hover:text-primary">← BACK TO AUCTIONS</Link>
      </div>
      <div className="container-x grid lg:grid-cols-[1fr_420px] gap-10">
        <div>
          <div className="aspect-[16/10] bg-card overflow-hidden"><img src={a.image} alt={a.title} className="w-full h-full object-cover" /></div>
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-3"><LivePill /><span className="overline">{a.bidCount} bids</span></div>
            <h1 className="font-display text-5xl tracking-wider">{a.title}</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl">Verified, inspected, paperwork ready. Winner reserves within 24 hours of auction close.</p>
          </div>
        </div>

        <aside className="bg-card border border-border p-6 self-start lg:sticky lg:top-24">
          <div className="overline">Time Remaining</div>
          <div className="mt-3"><Countdown endsAt={a.endsAt} /></div>

          <div className="mt-8 pt-6 hairline-t">
            <div className="overline">Current Bid</div>
            <div className="font-display text-4xl text-primary mt-1">{a.currentBid > 0 ? formatGHS(a.currentBid) : "No bids yet"}</div>
            <div className="text-xs text-muted-foreground font-mono mt-1">Min next bid: {formatGHS(minNext)}</div>
          </div>

          <div className="mt-5 flex gap-2">
            <input type="number" value={bid} onChange={(e) => setBid(+e.target.value)} className="flex-1 h-12 px-3 bg-background border border-border font-mono text-lg" />
            <button className="h-12 px-6 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-wider text-sm inline-flex items-center gap-2"><Gavel className="w-4 h-4" /> Bid</button>
          </div>

          <div className="mt-8 pt-6 hairline-t">
            <div className="overline mb-4">Live Bid History</div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0 animate-fade-in">
                  <span className="text-foreground/80">{h.name}</span>
                  <span className="font-mono">{formatGHS(h.amount)}</span>
                  <span className="text-xs text-muted-foreground font-mono">{h.t}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </SiteLayout>
  );
}
