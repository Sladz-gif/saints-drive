import { X, CreditCard, ShieldCheck, Clock, Check } from "lucide-react";
import { useState } from "react";

export function ReserveModal({
  onClose,
  vehicleTitle,
  price,
}: {
  onClose: () => void;
  vehicleTitle: string;
  price: number;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<"deposit" | "full">("deposit");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const depositAmount = Math.round(price * 0.1);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fade-in p-4">
        <div className="relative w-full max-w-md bg-card border border-border p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <div className="overline text-success mb-2">Reservation Confirmed</div>
          <h3 className="font-display text-3xl tracking-wider mb-4">VEHICLE RESERVED</h3>
          <p className="text-muted-foreground text-sm">
            Our team will contact you within 2 hours to complete the payment process.
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
        <div className="overline text-primary">Reserve This Vehicle</div>
        <h3 className="mt-2 font-display text-3xl tracking-wider">{vehicleTitle}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Secure this vehicle with a reservation deposit.
        </p>

        <div className="mt-6 p-4 bg-surface border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Vehicle Price</span>
            <span className="font-mono text-sm">GHS {price.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Reservation Deposit (10%)</span>
            <span className="font-mono text-sm text-primary">
              GHS {depositAmount.toLocaleString()}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="overline text-[10px] text-muted-foreground mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your full name"
              className="w-full h-12 px-4 bg-surface border border-border focus:border-primary outline-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="overline text-[10px] text-muted-foreground mb-2 block">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+233 XX XXX XXXX"
              className="w-full h-12 px-4 bg-surface border border-border focus:border-primary outline-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="overline text-[10px] text-muted-foreground mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full h-12 px-4 bg-surface border border-border focus:border-primary outline-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="overline text-[10px] text-muted-foreground mb-2 block">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod("deposit")}
                className={`h-12 border-2 font-mono text-xs uppercase tracking-widest transition-all ${
                  method === "deposit"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-foreground"
                }`}
              >
                Deposit (10%)
              </button>
              <button
                type="button"
                onClick={() => setMethod("full")}
                className={`h-12 border-2 font-mono text-xs uppercase tracking-widest transition-all ${
                  method === "full"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-foreground"
                }`}
              >
                Full Payment
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm transition-all hover:bg-primary-dim mt-6 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Pay GHS {(method === "deposit" ? depositAmount : price).toLocaleString()}
          </button>
        </form>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-3 h-3 text-primary" />
            <span>Secure payment processing</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3 text-primary" />
            <span>Reservation valid for 48 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}
