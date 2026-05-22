import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Gavel,
  Clock,
  TrendingUp,
  History,
  ShieldCheck,
  ChevronLeft,
  MapPin,
  Gauge,
  Fuel,
  Settings2,
  Cog,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Countdown } from "@/components/Countdown";
import { LivePill } from "@/components/Navbar";
import { AUCTIONS, formatGHS, VEHICLES } from "@/data/mock-data";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const Route = createFileRoute("/auctions/$slug")({
  component: AuctionDetail,
  loader: ({ params }) => {
    const a = AUCTIONS.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return a;
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-5xl tracking-wider uppercase">AUCTION NOT FOUND</h1>
        <Link
          to="/auctions"
          className="text-primary mt-6 inline-block font-mono uppercase tracking-widest text-xs"
        >
          ← Back to floor
        </Link>
      </div>
    </SiteLayout>
  ),
});

function AuctionDetail() {
  const a = Route.useLoaderData();
  const v = VEHICLES.find((x) => x.title === a.title) || VEHICLES[0];
  const [bid, setBid] = useState(a.currentBid + 5000);
  const [active, setActive] = useState(0);
  const [outbidOpen, setOutbidOpen] = useState(false);
  const [bidSuccessOpen, setBidSuccessOpen] = useState(false);
  const [lastBidAmount, setLastBidAmount] = useState(0);
  const [timeExtended, setTimeExtended] = useState(false);
  const gallery = [a.image, a.image, a.image, a.image];

  const minIncrement = 5000;
  const minBid = a.currentBid + minIncrement;

  const [history, setHistory] = useState<
    { name: string; amount: number; t: string; status?: "winning" }[]
  >([
    { name: "Nana K.", amount: a.currentBid, t: "12s ago", status: "winning" },
    { name: "Kojo A.", amount: a.currentBid - 5000, t: "1m ago" },
    { name: "Ama O.", amount: a.currentBid - 10000, t: "3m ago" },
    { name: "James L.", amount: a.currentBid - 15000, t: "5m ago" },
    { name: "Efua S.", amount: a.currentBid - 20000, t: "8m ago" },
    { name: "Kwame M.", amount: a.currentBid - 25000, t: "12m ago" },
    { name: "Akosua P.", amount: a.currentBid - 30000, t: "15m ago" },
    { name: "Yaw B.", amount: a.currentBid - 35000, t: "18m ago" },
  ]);

  const handlePlaceBid = () => {
    if (bid < minBid) return;

    setHistory((h) =>
      [
        { name: "You", amount: bid, t: "just now", status: "winning" },
        ...h.map((prev) => ({ ...prev, status: undefined })),
      ].slice(0, 10),
    );

    setLastBidAmount(bid);
    setBidSuccessOpen(true);
    setBid(bid + minIncrement);
  };

  useEffect(() => {
    const id = setInterval(() => {
      const names = ["Yaw B.", "Efua S.", "Kwame M.", "Akosua P.", "Kofi D.", "Abena F."];
      const randomName = names[Math.floor(Math.random() * names.length)];
      setHistory((h) => {
        const newBid = h[0].amount + minIncrement;
        setLastBidAmount(newBid);
        setOutbidOpen(true);
        setBid(newBid + minIncrement);
        return [
          { name: randomName, amount: newBid, t: "just now", status: "winning" },
          ...h.map((prev) => ({ ...prev, status: undefined })),
        ].slice(0, 10);
      });
    }, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <SiteLayout>
      <div className="container-x py-8">
        <Link
          to="/auctions"
          className="text-xs text-muted-foreground font-mono hover:text-primary inline-flex items-center gap-2"
        >
          <ChevronLeft className="w-3 h-3" /> BACK TO AUCTION FLOOR
        </Link>
      </div>

      <div className="container-x grid lg:grid-cols-[65fr_35fr] gap-4 mb-10">
        <div className="aspect-[16/10] bg-card overflow-hidden border border-border">
          <img src={gallery[active]} alt={a.title} className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {gallery.map((g, i) => (
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

      <div className="container-x grid lg:grid-cols-[1fr_420px] gap-12 pb-24">
        {/* LEFT CONTENT */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <LivePill />
            <span className="overline text-muted-foreground tracking-widest text-[10px]">
              {a.bidCount} BIDS PLACED
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider uppercase leading-tight">
            {a.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary" /> {v.location}
            </span>
            <span>•</span>
            <span>Lot #SG-2026-084</span>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {[
              { Icon: Gauge, label: "Mileage", value: `${v.km.toLocaleString()} km` },
              { Icon: Fuel, label: "Fuel", value: v.fuel },
              { Icon: Settings2, label: "Transmission", value: v.transmission },
              { Icon: Cog, label: "Drive", value: v.drive },
            ].map((s) => (
              <div key={s.label} className="bg-card p-6">
                <s.Icon className="w-4 h-4 text-primary mb-3" />
                <div className="overline text-[10px] text-muted-foreground">{s.label}</div>
                <div className="font-display text-xl tracking-wider mt-1">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="overline mb-6 text-primary">Auction Summary</h2>
            <p className="text-lg text-foreground/80 leading-relaxed font-body">
              This vehicle has been meticulously inspected by our technical team. It features a
              clean title, no reported accidents, and has undergone a full 150-point safety check.
              Documentation is ready for immediate transfer upon successful auction completion.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="overline mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 bg-border border border-border gap-px font-mono text-sm uppercase">
              {[
                ["Engine", "2.0L Turbocharged"],
                ["Power", "252 HP / 350 NM"],
                ["0-100 KM/H", "6.2 Seconds"],
                ["Top Speed", "250 KM/H"],
                ["Weight", "1,540 KG"],
                ["Condition", v.condition],
              ].map(([k, val]) => (
                <div key={k} className="flex justify-between p-4 bg-card">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-white">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 p-8 bg-surface border border-border">
            <div className="flex items-center gap-3 overline mb-4 text-success">
              <ShieldCheck className="w-4 h-4" /> Physical Inspection Report
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
              {[
                "No Engine Leaks",
                "Original Paint",
                "Interior Grade A",
                "Service History Valid",
              ].map((check) => (
                <div key={check} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-success" /> {check}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR - BID PANEL */}
        <aside className="lg:sticky lg:top-24 self-start space-y-6">
          <div className="bg-card border-2 border-primary/20 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div className="overline text-[10px] text-muted-foreground flex items-center gap-2">
                  <Clock className="w-3 h-3 text-primary" /> TIME REMAINING
                </div>
                <LivePill />
              </div>

              <div className="mb-10">
                <Countdown endsAt={a.endsAt} />
              </div>

              <div className="pt-8 border-t border-border">
                <div className="overline text-[10px] text-muted-foreground mb-1">
                  Current Highest Bid
                </div>
                <div className="font-display text-5xl text-primary mb-2">
                  {formatGHS(history[0].amount)}
                </div>
                <div
                  className={`font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 ${a.reserve && history[0].amount >= a.reserve ? "text-success" : "text-warning"}`}
                >
                  {a.reserve && history[0].amount >= a.reserve ? (
                    <>
                      <TrendingUp className="w-3 h-3" /> Reserve Price Met
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3" /> Reserve Not Met
                    </>
                  )}
                </div>
                {a.startBid && (
                  <div className="mt-2 text-[9px] text-muted-foreground font-mono uppercase tracking-widest">
                    Started at {formatGHS(a.startBid)}
                  </div>
                )}
              </div>

              <div className="mt-10 space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">
                    GHS
                  </div>
                  <input
                    type="number"
                    value={bid}
                    step={minIncrement}
                    min={minBid}
                    onChange={(e) => setBid(+e.target.value)}
                    className={`w-full h-14 pl-14 pr-4 bg-background border outline-none font-mono text-xl transition-colors ${bid < minBid ? "border-destructive" : "border-border focus:border-primary"}`}
                  />
                </div>
                <button
                  onClick={handlePlaceBid}
                  disabled={bid < minBid}
                  className={`w-full h-14 font-display text-xl tracking-widest uppercase inline-flex items-center justify-center gap-3 transition-all ${bid < minBid ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary hover:bg-[#F06020] text-primary-foreground hover:scale-[1.01]"}`}
                >
                  <Gavel className="w-5 h-5" /> Place Your Bid
                </button>
                <p className="text-[10px] text-center text-muted-foreground font-mono uppercase tracking-widest">
                  Min increment: {formatGHS(minIncrement)}
                </p>
                {bid < minBid && (
                  <p className="text-[10px] text-center text-destructive font-mono uppercase tracking-widest">
                    Min bid is {formatGHS(minBid)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="overline text-[10px] flex items-center gap-2">
                <History className="w-3.5 h-3.5" /> Live History
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            </div>

            <div className="space-y-4">
              {history.map((h, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-3 border-b border-border/40 last:border-0 animate-fade-in ${h.status === "winning" ? "text-primary" : ""}`}
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-xs uppercase tracking-wider">{h.name}</span>
                    <span className="text-[9px] text-muted-foreground font-mono mt-0.5">{h.t}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg tracking-wider">{formatGHS(h.amount)}</div>
                    {h.status === "winning" && (
                      <div className="text-[9px] font-mono uppercase tracking-widest">Leading</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest leading-relaxed">
              Bidding enters <span className="text-primary">overtime</span> if a bid is placed in
              the final 2 minutes. Timer extends by 5 minutes.
            </p>
          </div>

          {/* Outbid Notification Modal */}
          <Dialog open={outbidOpen} onOpenChange={setOutbidOpen}>
            <DialogContent className="max-w-md">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h3 className="font-display text-2xl tracking-wider mb-2">You've Been Outbid</h3>
                <p className="text-muted-foreground mb-4">
                  Current highest bid is {formatGHS(lastBidAmount)}
                </p>
                <button
                  onClick={() => setOutbidOpen(false)}
                  className="w-full h-12 bg-primary hover:bg-[#F06020] text-primary-foreground font-mono uppercase tracking-wider text-sm transition-all hover:scale-[1.01]"
                >
                  Place New Bid
                </button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Bid Success Modal */}
          <Dialog open={bidSuccessOpen} onOpenChange={setBidSuccessOpen}>
            <DialogContent className="max-w-md">
              <div className="text-center">
                <Check className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="font-display text-2xl tracking-wider mb-2">
                  Bid Placed Successfully
                </h3>
                <p className="text-muted-foreground mb-4">
                  Your bid of {formatGHS(lastBidAmount)} is now the highest bid.
                </p>
                <button
                  onClick={() => setBidSuccessOpen(false)}
                  className="w-full h-12 bg-primary hover:bg-[#F06020] text-primary-foreground font-mono uppercase tracking-wider text-sm transition-all hover:scale-[1.01]"
                >
                  Continue
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </aside>
      </div>
    </SiteLayout>
  );
}
