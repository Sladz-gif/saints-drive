import { X, Calendar, MapPin, Phone, Mail, Check } from "lucide-react";
import { useState } from "react";

export function InspectionModal({
  onClose,
  vehicleTitle,
}: {
  onClose: () => void;
  vehicleTitle: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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
          <div className="overline text-success mb-2">Request Sent</div>
          <h3 className="font-display text-3xl tracking-wider mb-4">WE'LL CONTACT YOU</h3>
          <p className="text-muted-foreground text-sm">
            Our team will reach out within 24 hours to confirm your inspection appointment.
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
        <div className="overline text-primary">Schedule Inspection</div>
        <h3 className="mt-2 font-display text-3xl tracking-wider">{vehicleTitle}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Book a time to see this vehicle in person at our showroom.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="overline text-[10px] text-muted-foreground mb-2 block">
              Preferred Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full h-12 pl-10 pr-4 bg-surface border border-border focus:border-primary outline-none font-mono text-sm"
              />
            </div>
          </div>

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
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+233 XX XXX XXXX"
                className="w-full h-12 pl-10 pr-4 bg-surface border border-border focus:border-primary outline-none font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="overline text-[10px] text-muted-foreground mb-2 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full h-12 pl-10 pr-4 bg-surface border border-border focus:border-primary outline-none font-mono text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm transition-all hover:bg-primary-dim mt-6"
          >
            Request Inspection
          </button>
        </form>

        <div className="mt-6 p-4 bg-surface border border-border flex items-start gap-3">
          <MapPin className="w-4 h-4 text-primary mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <div className="font-medium text-foreground mb-1">Showroom Location</div>
            <div>East Legon, Accra, Ghana</div>
            <div className="mt-1">Mon-Sat: 9AM - 6PM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
