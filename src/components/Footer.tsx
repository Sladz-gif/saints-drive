import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] hairline-t mt-24">
      <div className="container-x py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-display text-2xl tracking-wider">SAINTS GARAGE</Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Ghana's premium automotive platform. Buy, rent, bid, and discover.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 inline-flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Marketplace" links={[["Buy","/buy"],["Rent","/rent"],["Auctions","/auctions"],["List Your Car","/sell"],["Fleet","/fleet"]]} />
        <FooterCol title="Discover" links={[["Brands","/brands/bmw"],["Cars by Purpose","/purpose/uber-bolt"],["History Vault","/history"],["Games","/games"],["Blog","/blog"]]} />
        <FooterCol title="Support" links={[["Help Center","#"],["Contact","#"],["Terms","#"],["Privacy","#"],["Admin","/admin"]]} />
      </div>
      <div className="hairline-t">
        <div className="container-x py-6 flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>© 2026 SAINTS GARAGE</span>
          <span>ACCRA · GHANA</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="overline mb-4">{title}</div>
      <ul className="space-y-2.5">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-foreground/80 hover:text-primary transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
