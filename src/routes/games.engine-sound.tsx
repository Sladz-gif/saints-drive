import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/games/engine-sound")({ component: EngineSoundGame });

function EngineSoundGame() {
  const [score] = useState(0);
  const options = ["Toyota 2JZ-GTE", "Nissan RB26DETT", "GM LS V8", "BMW S58"];
  return (
    <SiteLayout>
      <div className="container-x py-10">
        <div className="overline">Engine Sound Challenge</div>
        <h1 className="font-display text-4xl tracking-wider mt-2">NAME THAT ENGINE</h1>

        <div className="mt-10 bg-card border border-border p-10 flex flex-col items-center">
          <button className="h-24 w-24 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center hover:bg-primary-dim transition-colors">
            <Play className="w-10 h-10 ml-1" />
          </button>
          <div className="mt-8 w-full max-w-2xl">
            <div className="flex items-center gap-2 text-primary mb-2"><Volume2 className="w-4 h-4" /> <span className="overline">Waveform</span></div>
            <div className="h-20 flex items-center gap-0.5 overflow-hidden">
              {Array.from({ length: 80 }).map((_, i) => (
                <div key={i} className="flex-1 bg-primary/60" style={{ height: `${Math.abs(Math.sin(i * 0.4)) * 80 + 10}%` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((o) => (
            <button key={o} className="h-14 px-5 text-left font-display text-xl tracking-wider border border-border hover:border-primary transition-colors">{o}</button>
          ))}
        </div>
        <div className="mt-6 text-sm text-muted-foreground">Score: <span className="font-mono text-foreground">{score}</span></div>
      </div>
    </SiteLayout>
  );
}
