import { createFileRoute } from "@tanstack/react-router";
import { Car, Gavel, Calendar, Users, DollarSign, FileWarning, Bookmark, Eye } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { formatGHS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });

function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { Icon: Car, label: "Active Listings", value: "2,840", delta: "+124 wk" },
          { Icon: Calendar, label: "Active Rentals", value: "186", delta: "+12 wk" },
          { Icon: Gavel, label: "Live Auctions", value: "8", delta: "2 ending soon" },
          { Icon: Users, label: "Total Users", value: "12,481", delta: "+340 wk" },
        ].map((s) => (
          <div key={s.label} className="bg-admin-surface border border-admin-border p-5">
            <s.Icon className="w-5 h-5 text-primary mb-3" />
            <div className="overline">{s.label}</div>
            <div className="font-display text-3xl mt-1">{s.value}</div>
            <div className="text-xs text-success font-mono mt-1">{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {[
          { Icon: DollarSign, label: "Revenue (Mo.)", value: formatGHS(248400) },
          { Icon: FileWarning, label: "Pending Review", value: "23" },
          { Icon: Bookmark, label: "Reservations", value: "47" },
          { Icon: Eye, label: "Ad Impressions", value: "812K" },
        ].map((s) => (
          <div key={s.label} className="bg-admin-surface border border-admin-border p-5">
            <s.Icon className="w-5 h-5 text-muted-foreground mb-3" />
            <div className="overline">{s.label}</div>
            <div className="font-display text-3xl mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2 bg-admin-surface border border-admin-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display tracking-wider">NEW LISTINGS & USERS</div>
            <div className="text-xs font-mono text-muted-foreground">Last 30 days</div>
          </div>
          <div className="h-56 flex items-end gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col gap-0.5">
                <div className="bg-primary" style={{ height: `${30 + Math.abs(Math.sin(i)) * 70}%` }} />
                <div className="bg-foreground/30" style={{ height: `${10 + Math.abs(Math.cos(i)) * 40}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 bg-primary" /> Listings</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 bg-foreground/30" /> Users</span>
          </div>
        </div>

        <div className="bg-admin-surface border border-admin-border p-5">
          <div className="font-display tracking-wider mb-4">REVENUE BY SOURCE</div>
          <div className="relative w-40 h-40 mx-auto rounded-full" style={{ background: "conic-gradient(var(--color-primary) 0 55%, var(--color-success) 55% 78%, var(--color-info) 78% 92%, var(--color-muted) 92% 100%)" }}>
            <div className="absolute inset-6 rounded-full bg-admin-surface" />
          </div>
          <div className="mt-4 space-y-2 text-sm">
            {[["Sales", "55%", "primary"], ["Rentals", "23%", "success"], ["Auctions", "14%", "info"], ["Ads", "8%", "muted-foreground"]].map(([k, v, c]) => (
              <div key={k} className="flex justify-between"><span className={`text-${c}`}>● {k}</span><span className="font-mono">{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <div className="bg-admin-surface border border-admin-border p-5">
          <div className="font-display tracking-wider mb-4">ACTIVITY FEED</div>
          <div className="space-y-3 text-sm">
            {[
              ["2m", "New listing: Toyota Vitz 2018", "Kasoa"],
              ["8m", "Bid placed: G63 AMG", "GHS 1.85M"],
              ["14m", "Rental booked: Lexus RX", "3 days"],
              ["32m", "Dealer verified", "Premium Motors GH"],
              ["1h", "Listing sold: BMW M340i", "Accra"],
            ].map(([t, msg, meta], i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-admin-border/60 last:border-0">
                <span className="font-mono text-xs text-muted-foreground w-10">{t}</span>
                <span className="flex-1">{msg}</span>
                <span className="text-xs text-muted-foreground font-mono">{meta}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-admin-surface border border-admin-border p-5">
          <div className="font-display tracking-wider mb-4">PENDING ACTIONS</div>
          <div className="space-y-2">
            {[["23 listings", "awaiting review"], ["4 dealer applications", "to verify"], ["2 refund requests", "to approve"], ["1 expired ad campaign", "needs renewal"]].map(([k, v], i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-admin-bg border border-admin-border">
                <div><div className="font-medium">{k}</div><div className="text-xs text-muted-foreground">{v}</div></div>
                <button className="text-xs font-mono uppercase tracking-wider text-primary">Review →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
