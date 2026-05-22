import { X, Gavel, TrendingUp, AlertCircle, Check } from "lucide-react";
import { useState } from "react";

export function AuctionBidModal({
  onClose,
  vehicleTitle,
  currentBid,
  minIncrement,
  onBid,
}: {
  onClose: () => void;
  vehicleTitle: string;
  currentBid: number;
  minIncrement: number;
  onBid: (amount: number) => void;
}) {
  const [bidAmount, setBidAmount] = useState(currentBid + minIncrement);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const minBid = currentBid + minIncrement;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (bidAmount < minBid) {
      setError(`Minimum bid is GHS ${minBid.toLocaleString()}`);
      return;
    }

    if (bidAmount % minIncrement !== 0) {
      setError(`Bids must be in increments of GHS ${minIncrement.toLocaleString()}`);
      return;
    }

    setSubmitted(true);
    onBid(bidAmount);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const quickBids = [
    minBid,
    minBid + minIncrement * 2,
    minBid + minIncrement * 5,
    minBid + minIncrement * 10,
  ];

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fade-in p-4">
        <div className="relative w-full max-w-md bg-card border border-border p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <div className="overline text-success mb-2">Bid Placed</div>
          <h3 className="font-display text-3xl tracking-wider mb-4">BID ACCEPTED</h3>
          <p className="text-muted-foreground text-sm">
            Your bid of GHS {bidAmount.toLocaleString()} has been placed successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fade-in p-4">
      <div className="relative w-full max-w-md bg-card border border-border p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="overline text-primary">Place Your Bid</div>
        <h3 className="mt-2 font-display text-3xl tracking-wider">{vehicleTitle}</h3>

        <div className="mt-6 p-4 bg-surface border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Current Bid</span>
            <span className="font-mono text-sm">GHS {currentBid.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Minimum Increment</span>
            <span className="font-mono text-sm text-primary">
              GHS {minIncrement.toLocaleString()}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="overline text-[10px] text-muted-foreground mb-2 block">
              Your Bid (GHS)
            </label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              min={minBid}
              step={minIncrement}
              required
              className="w-full h-14 px-4 bg-surface border border-border focus:border-primary outline-none font-display text-2xl tracking-wider"
            />
            {error && (
              <div className="mt-2 flex items-center gap-2 text-destructive text-xs">
                <AlertCircle className="w-3 h-3" />
                {error}
              </div>
            )}
          </div>

          <div>
            <label className="overline text-[10px] text-muted-foreground mb-2 block">
              Quick Bids
            </label>
            <div className="grid grid-cols-2 gap-2">
              {quickBids.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setBidAmount(amount)}
                  className={`h-10 border font-mono text-xs uppercase tracking-widest transition-all ${
                    bidAmount === amount
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  GHS {amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm transition-all hover:bg-primary-dim mt-6 flex items-center justify-center gap-2"
          >
            <Gavel className="w-4 h-4" />
            Place Bid
          </button>
        </form>

        <div className="mt-6 p-4 bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <div className="font-medium text-foreground mb-1">Bidding Tips</div>
              <div>• Place your maximum bid early to avoid last-minute competition</div>
              <div>• You'll be notified if you're outbid</div>
              <div>• All bids are binding</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
