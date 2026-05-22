import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] hairline-t mt-24 overflow-x-hidden">
      <div className="container-x py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        <div className="col-span-1 sm:col-span-2 md:col-span-1 min-w-0">
          <Link to="/" className="font-display text-2xl tracking-wider">
            SAINTS GARAGE
          </Link>
          <div className="overline mt-2 text-primary/80">Ghana's Premium Automotive Platform</div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            A premium automotive marketplace for the modern enthusiast. Buy, rent, and bid with
            confidence on Ghana's most exclusive vehicle platform.
          </p>
        </div>
        <FooterCol
          title="Marketplace"
          links={[
            ["Buy a Car", "/buy"],
            ["Rent a Car", "/rent"],
            ["Live Auctions", "/auctions"],
            ["Fleet Management", "/fleet"],
          ]}
        />
        <FooterCol
          title="Discover"
          links={[
            ["Cars by Purpose", "/purpose/uber-bolt"],
            ["Brand Showcase", "/brands/bmw"],
            ["Automotive History Vault", "/history"],
            ["Blog & Guides", "/blog"],
            ["Legendary Engines", "/history"],
          ]}
        />
        <FooterCol
          title="Support"
          links={[
            ["About Us", "#"],
            ["Advertise with Us", "#"],
            ["Contact", "#"],
            ["Privacy Policy", "#"],
            ["Terms of Use", "#"],
          ]}
        />
      </div>
      <div className="hairline-t">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono text-center sm:text-left">
          <span>© 2026 SAINTS GARAGE. ALL RIGHTS RESERVED.</span>
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
            <Link
              to={to}
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
