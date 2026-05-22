import { useEffect, useState } from "react";

export function Countdown({ endsAt, compact = false }: { endsAt: number; compact?: boolean }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), compact ? 1000 : 50);
    return () => clearInterval(id);
  }, [compact]);

  const diff = Math.max(0, endsAt - now);
  const hrs = Math.floor(diff / 3600000);
  const min = Math.floor((diff % 3600000) / 60000);
  const sec = Math.floor((diff % 60000) / 1000);
  const ms = Math.floor((diff % 1000) / 10);

  if (compact) {
    return (
      <span className="font-mono text-sm tabular-nums">
        {String(hrs).padStart(2, "0")}:{String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}
      </span>
    );
  }

  const Unit = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="font-mono text-3xl md:text-5xl tabular-nums text-foreground">{value}</span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex items-end gap-4 md:gap-6">
      <Unit value={String(hrs).padStart(2, "0")} label="HRS" />
      <span className="font-display text-3xl md:text-5xl text-border">:</span>
      <Unit value={String(min).padStart(2, "0")} label="MIN" />
      <span className="font-display text-3xl md:text-5xl text-border">:</span>
      <Unit value={String(sec).padStart(2, "0")} label="SEC" />
      <span className="font-display text-3xl md:text-5xl text-border">:</span>
      <Unit value={String(ms).padStart(2, "0")} label="MS" />
    </div>
  );
}
