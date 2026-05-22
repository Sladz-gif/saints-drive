import { createFileRoute, Link } from "@tanstack/react-router";
import { Gamepad2, Volume2, Trophy } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { HERO_IMAGES } from "@/lib/mock-data";

export const Route = createFileRoute("/games")({ component: GamesPage });

function GamesPage() {
  return (
    <SiteLayout>
      <div className="container-x py-16">
        <div className="overline">The Arcade</div>
        <h1 className="font-display text-6xl md:text-7xl tracking-wider mt-2">PLAY</h1>
      </div>
      <div className="container-x grid md:grid-cols-2 gap-6 pb-20">
        <Link to="/games/guess-the-car" className="group block bg-card border border-border hover-lift">
          <div className="aspect-[16/10] overflow-hidden"><img src={HERO_IMAGES[0]} alt="" className="w-full h-full object-cover" /></div>
          <div className="p-6">
            <Gamepad2 className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-display text-3xl tracking-wider">GUESS THE CAR</h3>
            <p className="text-muted-foreground mt-2">Beat the clock. Spot the silhouette. Top the leaderboard.</p>
          </div>
        </Link>
        <Link to="/games/engine-sound" className="group block bg-card border border-border hover-lift">
          <div className="aspect-[16/10] overflow-hidden"><img src={HERO_IMAGES[2]} alt="" className="w-full h-full object-cover" /></div>
          <div className="p-6">
            <Volume2 className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-display text-3xl tracking-wider">ENGINE SOUND CHALLENGE</h3>
            <p className="text-muted-foreground mt-2">Listen. Identify. Outscore the world.</p>
          </div>
        </Link>
      </div>

      <div className="container-x pb-20">
        <div className="overline inline-flex items-center gap-2"><Trophy className="w-3.5 h-3.5 text-primary" /> Global Leaderboard</div>
        <div className="mt-4 bg-card border border-border">
          {[["1", "Kojo M.", "12,840"], ["2", "Ama O.", "11,210"], ["3", "Nana K.", "10,005"], ["4", "Yaw P.", "8,720"], ["5", "Akua S.", "7,510"]].map(([r, n, s]) => (
            <div key={r} className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0">
              <div className="flex items-center gap-4">
                <span className="font-display text-2xl text-primary w-8">{r}</span>
                <span className="font-medium">{n}</span>
              </div>
              <span className="font-mono">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
