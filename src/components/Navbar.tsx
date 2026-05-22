import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Search, Heart, User, ChevronDown, Circle } from "lucide-react";
import { AuthModal } from "./AuthModal";

const NAV = [
  { label: "Buy", to: "/buy" },
  { label: "Rent", to: "/rent" },
  { label: "Auctions", to: "/auctions" },
  { label: "Fleet", to: "/fleet" },
  { label: "Blog", to: "/blog" },
];

const MEGA = {
  DISCOVER: [
    { label: "Cars by Purpose", to: "/purpose/uber-bolt" },
    { label: "History Vault", to: "/history" },
    { label: "Legendary Engines", to: "/history" },
  ],
  TOOLS: [
    { label: "Profit Calculator", to: "/purpose/uber-bolt" },
    { label: "Compare Cars", to: "/buy" },
    { label: "Fleet Manager", to: "/fleet" },
  ],
  PLAY: [
    { label: "Guess the Car", to: "/games/guess-the-car" },
    { label: "Engine Sound Challenge", to: "/games/engine-sound" },
  ],
} as const;

export function Navbar({ transparentOverHero = false }: { transparentOverHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [pathname]);

  const solid = scrolled || !transparentOverHero;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid ? "bg-surface/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-16">
          <Link to="/" className="font-display text-2xl tracking-wider text-foreground">
            SAINTS GARAGE
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                activeProps={{ className: "px-3 py-2 text-sm font-medium text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setMegaOpen((v) => !v)}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              Explore <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </nav>

          <div className="flex items-center gap-1">
            <button className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded text-foreground/80 hover:text-foreground hover:bg-card transition-colors" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <button onClick={() => setAuthOpen(true)} className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded text-foreground/80 hover:text-foreground hover:bg-card transition-colors" aria-label="Saved">
              <Heart className="w-4 h-4" />
            </button>
            <Link to="/account" className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded text-foreground/80 hover:text-foreground hover:bg-card transition-colors" aria-label="Account">
              <User className="w-4 h-4" />
            </Link>
            <Link to="/sell" className="hidden md:inline-flex items-center h-9 px-4 bg-primary hover:bg-primary-dim text-primary-foreground text-xs font-mono uppercase tracking-wider transition-colors">
              List Your Car
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden h-10 w-10 inline-flex items-center justify-center text-foreground"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {megaOpen && (
          <div className="hidden lg:block absolute left-0 right-0 top-16 bg-card border-b-2 border-primary animate-fade-in">
            <div className="container-x grid grid-cols-3 gap-12 py-10">
              {(Object.keys(MEGA) as Array<keyof typeof MEGA>).map((cat) => (
                <div key={cat}>
                  <div className="overline mb-4">{cat}</div>
                  <div className="space-y-2.5">
                    {MEGA[cat].map((item) => (
                      <Link key={item.to} to={item.to} className="block text-base text-foreground/85 hover:text-primary transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background animate-fade-in lg:hidden">
          <div className="flex items-center justify-between h-16 container-x">
            <Link to="/" className="font-display text-2xl tracking-wider">SAINTS GARAGE</Link>
            <button onClick={() => setMobileOpen(false)} className="h-10 w-10 inline-flex items-center justify-center" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="container-x mt-10 space-y-1">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="block py-4 font-display text-4xl tracking-wider hairline-b">
                {item.label}
              </Link>
            ))}
            <Link to="/history" className="block py-4 font-display text-4xl tracking-wider hairline-b">History</Link>
            <Link to="/games" className="block py-4 font-display text-4xl tracking-wider hairline-b">Games</Link>
            <Link to="/account" className="block py-4 font-display text-4xl tracking-wider hairline-b">Account</Link>
            <Link to="/sell" className="mt-8 inline-flex items-center justify-center h-12 px-6 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm w-full">
              List Your Car
            </Link>
          </div>
        </div>
      )}

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}

export function LivePill() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-destructive/10 text-destructive text-[10px] font-mono uppercase tracking-widest">
      <Circle className="w-1.5 h-1.5 fill-current animate-pulse-dot" /> Live
    </span>
  );
}
