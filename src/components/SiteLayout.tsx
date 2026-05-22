import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children, transparentNav = false }: { children: React.ReactNode; transparentNav?: boolean }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar transparentOverHero={transparentNav} />
      <main className={transparentNav ? "" : "pt-16"}>{children}</main>
      <Footer />
    </div>
  );
}
