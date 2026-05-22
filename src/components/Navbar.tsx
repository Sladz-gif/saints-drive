import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  X,
  Search,
  Heart,
  User,
  ChevronDown,
  Circle,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
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
    { label: "Brand Showcase", to: "/brands/bmw" },
    { label: "Automotive Knowledge Vault", to: "/vault" },
    { label: "Legendary Engines", to: "/vault" },
  ],
  TOOLS: [
    { label: "Fuel Cost Calculator", to: "/purpose/uber-bolt" },
    { label: "Compare Vehicles", to: "/buy" },
    { label: "Profitability Estimator", to: "/purpose/uber-bolt" },
    { label: "Fleet Management", to: "/fleet" },
  ],
  PLAY: [
    { label: "Guess the Car Game", to: "/games/guess-the-car" },
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

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

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
            <Link
              to="/blog"
              className="hidden lg:inline-flex px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <button
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded text-foreground/80 hover:text-foreground hover:bg-card transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAuthOpen(true)}
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded text-foreground/80 hover:text-foreground hover:bg-card transition-colors relative"
              aria-label="Saved"
            >
              <Heart className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <Link
              to="/account"
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded text-foreground/80 hover:text-foreground hover:bg-card transition-colors"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
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
          <div className="hidden lg:block absolute left-0 right-0 top-16 bg-card border-b-2 border-primary animate-fade-in overflow-x-hidden">
            <div className="container-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
              {(Object.keys(MEGA) as Array<keyof typeof MEGA>).map((cat) => (
                <div key={cat} className="min-w-0">
                  <div className="overline mb-4">{cat}</div>
                  <div className="space-y-2.5">
                    {MEGA[cat].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block text-base text-foreground/85 hover:text-primary transition-colors truncate"
                      >
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
        <div className="fixed inset-0 z-[60] bg-background animate-fade-in lg:hidden flex flex-col">
          <div className="flex items-center justify-between h-16 container-x">
            <Link to="/" className="font-display text-2xl tracking-wider">
              SAINTS GARAGE
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="h-10 w-10 inline-flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 container-x mt-10 space-y-1 overflow-y-auto">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block py-4 font-display text-5xl tracking-wider hairline-b active:text-primary transition-colors"
                activeProps={{
                  className:
                    "block py-4 font-display text-5xl tracking-wider hairline-b text-primary",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/history"
              className="block py-4 font-display text-5xl tracking-wider hairline-b"
            >
              History
            </Link>
            <Link
              to="/games"
              className="block py-4 font-display text-5xl tracking-wider hairline-b"
            >
              Games
            </Link>
            <Link
              to="/account"
              className="block py-4 font-display text-5xl tracking-wider hairline-b"
            >
              Account
            </Link>
          </div>
          <div className="p-10 border-t border-border flex items-center justify-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
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
