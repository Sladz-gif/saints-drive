import { createFileRoute } from "@tanstack/react-router";
import { Award, Flame } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ENGINES, HERO_IMAGES } from "@/lib/mock-data";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  return (
    <SiteLayout transparentNav>
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <img src={HERO_IMAGES[2]} alt="" className="absolute inset-0 w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative container-x h-full flex flex-col justify-center">
          <div className="overline">Automotive History</div>
          <h1 className="font-display text-7xl md:text-[12rem] tracking-wider mt-2 leading-[0.9]">THE<br/>VAULT</h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-xl">Where engines become legend. Where bloodlines are traced. Where culture lives.</p>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="flex items-center gap-2 overline mb-3"><Flame className="w-3.5 h-3.5 text-primary" /> Legendary Engines</div>
        <h2 className="font-display text-5xl tracking-wider">THE HALL OF FAME</h2>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {ENGINES.map((e) => (
            <div key={e.name} className="bg-card border border-border p-8 hover-lift">
              <div className="flex items-start justify-between">
                <div>
                  <div className="overline">Born {e.born}</div>
                  <h3 className="font-display text-4xl tracking-wider mt-2">{e.name}</h3>
                  <p className="text-primary mt-2 italic">"{e.tagline}"</p>
                </div>
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div><div className="overline">Stock HP</div><div className="font-display text-2xl mt-1">{e.stockHp}</div></div>
                <div><div className="overline">Tuned HP</div><div className="font-display text-2xl mt-1 text-primary">{e.tunedHp}</div></div>
              </div>
              <div className="mt-6 pt-6 hairline-t text-sm">
                <div className="overline mb-1">Found in</div>
                <div className="text-foreground/85">{e.cars}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface hairline-t py-20">
        <div className="container-x text-center">
          <div className="overline">Unlock the archive</div>
          <h2 className="font-display text-5xl tracking-wider mt-2">START YOUR JOURNEY</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Earn badges as you discover engines, brands, and eras. The deeper you go, the more unlocks.</p>
          <button className="mt-8 h-12 px-8 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm">Create Free Account</button>
        </div>
      </section>
    </SiteLayout>
  );
}
