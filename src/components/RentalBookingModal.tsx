import { X, Calendar, Clock, User, CreditCard, Check, Info } from "lucide-react";
import { useState } from "react";

export function RentalBookingModal({
  onClose,
  vehicleTitle,
  dailyRate,
  weeklyRate,
  monthlyRate,
}: {
  onClose: () => void;
  vehicleTitle: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [driverOption, setDriverOption] = useState<"self" | "chauffeur">("self");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile" | "cash">("card");

  const calculateDuration = () => {
    if (!startDate || !endDate) return { days: 0, weeks: 0, months: 0 };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    return { days, weeks, months };
  };

  const calculateTotal = () => {
    const { days, weeks, months } = calculateDuration();
    if (months >= 1) {
      const remainingDays = days - months * 30;
      return months * monthlyRate + remainingDays * dailyRate;
    }
    if (weeks >= 1) {
      const remainingDays = days - weeks * 7;
      return weeks * weeklyRate + remainingDays * dailyRate;
    }
    return days * dailyRate;
  };

  const driverFee = driverOption === "chauffeur" ? 500 * calculateDuration().days : 0;
  const total = calculateTotal() + driverFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fade-in p-4">
        <div className="relative w-full max-w-md bg-card border border-border p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <div className="overline text-success mb-2">Booking Confirmed</div>
          <h3 className="font-display text-3xl tracking-wider mb-4">RESERVED</h3>
          <p className="text-muted-foreground text-sm">
            Your rental has been booked. We'll contact you to confirm pickup details.
          </p>
        </div>
      </div>
    );
  }

  const { days, weeks, months } = calculateDuration();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fade-in p-4">
      <div className="relative w-full max-w-md bg-card border border-border p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="overline text-primary">Book This Rental</div>
        <h3 className="mt-2 font-display text-3xl tracking-wider">{vehicleTitle}</h3>

        <div className="mt-6 p-4 bg-surface border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Daily Rate</span>
            <span className="font-mono text-sm">GHS {dailyRate.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Weekly Rate</span>
            <span className="font-mono text-sm">GHS {weeklyRate.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Monthly Rate</span>
            <span className="font-mono text-sm">GHS {monthlyRate.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="overline text-[10px] text-muted-foreground mb-2 block">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-4 bg-surface border border-border focus:border-primary outline-none font-mono text-sm"
                />
              </div>
            </div>
            <div>
              <label className="overline text-[10px] text-muted-foreground mb-2 block">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-4 bg-surface border border-border focus:border-primary outline-none font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {days > 0 && (
            <div className="p-3 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 text-xs text-primary mb-2">
                <Clock className="w-3 h-3" />
                <span className="font-medium">
                  Duration: {days} day{days !== 1 ? "s" : ""}
                </span>
              </div>
              {weeks >= 1 && (
                <div className="text-xs text-muted-foreground">
                  {weeks} week{weeks !== 1 ? "s" : ""} rate applied
                </div>
              )}
              {months >= 1 && (
                <div className="text-xs text-muted-foreground">
                  {months} month{months !== 1 ? "s" : ""} rate applied
                </div>
              )}
            </div>
          )}

          <div>
            <label className="overline text-[10px] text-muted-foreground mb-2 block">
              Driver Option
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDriverOption("self")}
                className={`h-12 border-2 font-mono text-xs uppercase tracking-widest transition-all ${
                  driverOption === "self"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-foreground"
                }`}
              >
                Self-Drive
              </button>
              <button
                type="button"
                onClick={() => setDriverOption("chauffeur")}
                className={`h-12 border-2 font-mono text-xs uppercase tracking-widest transition-all ${
                  driverOption === "chauffeur"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-foreground"
                }`}
              >
                + Chauffeur
              </button>
            </div>
            {driverOption === "chauffeur" && (
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Info className="w-3 h-3" />
                <span>Chauffeur fee: GHS 500/day</span>
              </div>
            )}
          </div>

          <div>
            <label className="overline text-[10px] text-muted-foreground mb-2 block">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
                className="w-full h-12 pl-10 pr-4 bg-surface border border-border focus:border-primary outline-none font-mono text-sm"
              />
            </div>
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
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`h-10 border font-mono text-[10px] uppercase tracking-widest transition-all ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-foreground"
                }`}
              >
                Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("mobile")}
                className={`h-10 border font-mono text-[10px] uppercase tracking-widest transition-all ${
                  paymentMethod === "mobile"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-foreground"
                }`}
              >
                Mobile
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`h-10 border font-mono text-[10px] uppercase tracking-widest transition-all ${
                  paymentMethod === "cash"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-foreground"
                }`}
              >
                Cash
              </button>
            </div>
          </div>

          {days > 0 && (
            <div className="p-4 bg-surface border border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Rental ({days} day{days !== 1 ? "s" : ""})
                </span>
                <span className="font-mono">GHS {calculateTotal().toLocaleString()}</span>
              </div>
              {driverFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Chauffeur Fee</span>
                  <span className="font-mono">GHS {driverFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-medium pt-2 border-t border-border">
                <span>Total</span>
                <span className="font-mono text-primary">GHS {total.toLocaleString()}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!days}
            className="w-full h-14 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm transition-all hover:bg-primary-dim mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="w-4 h-4" />
            Pay GHS {total.toLocaleString()}
          </button>
        </form>
      </div>
    </div>
  );
}
