import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Flame, History, ChevronRight, Gauge, Zap, Calendar, Star, Car } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ENGINES, HERO_IMAGES, EVOLUTION_TIMELINES } from "@/data/mock-data";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  return (
    <SiteLayout transparentNav>
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <img
          src={HERO_IMAGES[2]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative container-x h-full flex flex-col justify-center">
          <div className="overline tracking-[0.3em] text-primary">Automotive History Vault</div>
          <h1 className="font-display text-7xl md:text-[12rem] tracking-wider mt-4 leading-[0.85] text-white">
            THE
            <br />
            VAULT
          </h1>
          <p className="mt-8 text-xl text-white/70 max-w-xl font-body leading-relaxed">
            A digital museum for the machines that changed the world. Trace the bloodlines of
            performance and explore the engineering marvels that built automotive culture.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#engines"
              className="h-14 px-8 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm inline-flex items-center"
            >
              Explore Engines
            </a>
            <a
              href="#timelines"
              className="h-14 px-8 border border-white/20 hover:border-white text-white font-mono uppercase tracking-widest text-sm transition-colors"
            >
              Vehicle Timelines
            </a>
          </div>
        </div>
      </section>

      {/* Brand History Grid */}
      <section className="py-24 bg-background">
        <div className="container-x">
          <div className="overline mb-4">The Lineage</div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider mb-12">
            LEGENDARY BRANDS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                brand: "BMW",
                era: "1916—Present",
                tagline: "The Ultimate Driving Machine",
                image: HERO_IMAGES[0],
              },
              {
                brand: "Porsche",
                era: "1948—Present",
                tagline: "There Is No Substitute",
                image: HERO_IMAGES[2],
              },
              {
                brand: "Mercedes",
                era: "1926—Present",
                tagline: "The Best or Nothing",
                image: HERO_IMAGES[1],
              },
            ].map((b) => (
              <Link
                key={b.brand}
                to="/brands/$brand"
                params={{ brand: b.brand.toLowerCase() }}
                className="group relative aspect-[4/5] overflow-hidden bg-card border border-border"
              >
                <img
                  src={b.image}
                  alt=""
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-2">
                    {b.era}
                  </div>
                  <h3 className="font-display text-4xl tracking-wider text-white mb-2">
                    {b.brand.toUpperCase()}
                  </h3>
                  <p className="text-sm text-white/60 italic group-hover:text-white transition-colors">
                    "{b.tagline}"
                  </p>
                  <div className="mt-6 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="engines" className="py-24 bg-surface hairline-t hairline-b">
        <div className="container-x">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 overline text-primary mb-3">
                <Flame className="w-4 h-4" /> Powerplant Archive
              </div>
              <h2 className="font-display text-5xl md:text-7xl tracking-wider">
                LEGENDARY ENGINES
              </h2>
            </div>
            <div className="hidden md:block">
              <Link
                to="/games/engine-sound"
                className="h-12 px-6 border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono uppercase tracking-widest text-xs inline-flex items-center transition-all"
              >
                Sound Challenge <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ENGINES.map((e) => (
              <div
                key={e.name}
                className="group bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 relative"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={e.image}
                    alt={e.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute top-4 right-4 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <Award className="w-48 h-48" />
                  </div>
                </div>

                <div className="p-10 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/20">
                      EST. {e.born}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>

                  <h3 className="font-display text-4xl md:text-5xl tracking-wider text-white mb-2">
                    {e.name}
                  </h3>
                  <p className="text-primary font-mono text-sm italic tracking-wide mb-6">
                    "{e.tagline}"
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-mono uppercase tracking-widest">
                        Displacement
                      </span>
                      <span className="text-white font-mono">{e.displacement}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-mono uppercase tracking-widest">
                        Configuration
                      </span>
                      <span className="text-white font-mono text-right text-xs">
                        {e.configuration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-mono uppercase tracking-widest">
                        Stock Power
                      </span>
                      <span className="text-white font-mono">{e.stockPower}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-mono uppercase tracking-widest">
                        Tuned Ceiling
                      </span>
                      <span className="text-primary font-mono">{e.tunedCeiling}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-mono uppercase tracking-widest">
                        Redline
                      </span>
                      <span className="text-white font-mono">{e.redline}</span>
                    </div>
                  </div>

                  <div className="mb-8 p-4 bg-surface border border-border">
                    <div className="flex items-center gap-2 overline text-[10px] text-muted-foreground mb-2">
                      <Car className="w-3 h-3" /> Featured In
                    </div>
                    <div className="font-mono text-xs text-white/80 leading-relaxed uppercase">
                      {e.featuredIn}
                    </div>
                  </div>

                  <button className="h-12 w-full bg-surface border border-border hover:border-primary hover:text-primary font-mono uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
                    Read Full Story <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Evolution Timelines */}
      <section id="timelines" className="py-24 bg-surface hairline-t hairline-b">
        <div className="container-x">
          <div className="flex items-center gap-2 overline text-primary mb-4">
            <Car className="w-4 h-4" /> Evolution Archives
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider mb-12">
            VEHICLE TIMELINES
          </h2>

          <div className="space-y-16">
            {Object.entries(EVOLUTION_TIMELINES).map(([key, timeline]) => (
              <div key={key} className="bg-card border border-border overflow-hidden">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={timeline.heroImage}
                    alt={timeline.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="font-display text-4xl md:text-5xl tracking-wider text-white mb-2">
                      {timeline.title}
                    </h3>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="space-y-8">
                    {timeline.generations.map((gen, i) => (
                      <div key={i} className="flex gap-6 group">
                        <div className="flex flex-col items-center">
                          <div className="font-display text-3xl text-primary tracking-wider">
                            {gen.year}
                          </div>
                          <div className="flex-1 w-px bg-border my-4 group-last:hidden" />
                        </div>
                        <div className="flex-1 pb-8">
                          <h4 className="font-display text-2xl tracking-wider uppercase mb-2">
                            {gen.name}
                          </h4>
                          {gen.engine && (
                            <div className="text-sm text-primary font-mono uppercase tracking-widest mb-3">
                              {gen.engine}
                            </div>
                          )}
                          <p className="text-muted-foreground text-sm leading-relaxed font-body">
                            {gen.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Progress / Gamification */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container-x">
          <div className="max-w-4xl mx-auto bg-card border border-border p-12 md:p-20 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8 border border-primary/20">
                <History className="w-10 h-10 text-primary" />
              </div>
              <div className="overline tracking-[0.3em] mb-4">Vault Access</div>
              <h2 className="font-display text-5xl md:text-7xl tracking-wider mb-6">
                UNSEAL THE ARCHIVE
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12 font-body leading-relaxed">
                Create an account to track your progress through the Vault. Earn collectible badges
                as you discover rare engines, brand milestones, and era-defining machines.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
                {[
                  { icon: Award, label: "Historian" },
                  { icon: Star, label: "Engine Guru" },
                  { icon: History, label: "Era Master" },
                  { icon: Award, label: "Purist" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-help group"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-primary group-hover:border-solid transition-all">
                      <badge.icon className="w-8 h-8" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="h-14 px-10 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(232,93,4,0.2)] hover:shadow-[0_0_50px_rgba(232,93,4,0.4)] transition-all">
                  Create Free Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
