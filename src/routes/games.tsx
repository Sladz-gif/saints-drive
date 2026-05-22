import { createFileRoute, Link } from "@tanstack/react-router";
import { Gamepad2, Volume2, Trophy, User } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { HERO_IMAGES } from "@/data/mock-data";
import { useGameStore } from "@/store/gameStore";

export const Route = createFileRoute("/games")({ component: GamesPage });

function GamesPage() {
  const { leaderboard } = useGameStore();

  return (
    <SiteLayout>
      <div className="container-x py-12 sm:py-16">
        <div className="overline">The Arcade</div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider mt-2">PLAY</h1>
      </div>
      <div className="container-x grid sm:grid-cols-2 gap-4 sm:gap-6 pb-16 sm:pb-20">
        <Link
          to="/games/guess-the-car"
          className="group block bg-card border border-border hover-lift cursor-pointer"
        >
          <div className="aspect-[16/10] overflow-hidden">
            <img src={HERO_IMAGES[0] || ""} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="p-4 sm:p-6">
            <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-2 sm:mb-3" />
            <h3 className="font-display text-2xl sm:text-3xl tracking-wider">GUESS THE CAR</h3>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Beat the clock. Spot the silhouette. Top the leaderboard.
            </p>
          </div>
        </Link>
        <Link
          to="/games/engine-sound"
          className="group block bg-card border border-border hover-lift cursor-pointer"
        >
          <div className="aspect-[16/10] overflow-hidden">
            <img src={HERO_IMAGES[2] || ""} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="p-4 sm:p-6">
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-2 sm:mb-3" />
            <h3 className="font-display text-2xl sm:text-3xl tracking-wider">ENGINE SOUND CHALLENGE</h3>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">Listen. Identify. Outscore the world.</p>
          </div>
        </Link>
      </div>

      <div className="container-x pb-16 sm:pb-20">
        <div className="overline inline-flex items-center gap-2">
          <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" /> Global Leaderboard
        </div>
        <div className="mt-4 bg-card border border-border">
          {leaderboard.slice(0, 5).map((entry) => (
            <div
              key={entry.userId}
              className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-border last:border-0 hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-display text-xl sm:text-2xl text-primary w-6 sm:w-8">{entry.rank}</span>
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-surface flex items-center justify-center text-xs sm:text-sm font-medium">
                  {entry.avatar}
                </div>
                <span className="font-medium text-sm sm:text-base">{entry.displayName}</span>
              </div>
              <span className="font-mono text-sm sm:text-base">{entry.totalPoints.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
