import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Gavel, Calendar, Car, Bell, Settings } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES } from "@/lib/mock-data";

export const Route = createFileRoute("/account")({ component: AccountPage });

const TABS = [
  { id: "saved", label: "Saved", Icon: Heart },
  { id: "bids", label: "Bids", Icon: Gavel },
  { id: "reservations", label: "Reservations", Icon: Calendar },
  { id: "rentals", label: "Rentals", Icon: Car },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "settings", label: "Settings", Icon: Settings },
];

function AccountPage() {
  const [tab, setTab] = useState("saved");
  return (
    <SiteLayout>
      <div className="container-x py-12">
        <div className="overline">My Account</div>
        <h1 className="font-display text-5xl tracking-wider mt-2">DASHBOARD</h1>

        <div className="mt-8 grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="space-y-1">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 px-3 h-11 text-sm transition-colors ${tab === t.id ? "bg-card text-primary border-l-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}>
                <t.Icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </aside>
          <div>
            {tab === "saved" && (
              <div className="grid md:grid-cols-2 gap-6">
                {VEHICLES.slice(0, 4).map((v) => <VehicleCard key={v.id} v={v} />)}
              </div>
            )}
            {tab === "bids" && <EmptyState label="No active bids" />}
            {tab === "reservations" && <EmptyState label="No reservations yet" />}
            {tab === "rentals" && <EmptyState label="No rentals yet" />}
            {tab === "notifications" && <EmptyState label="You're all caught up" />}
            {tab === "settings" && (
              <div className="bg-card border border-border p-8 space-y-6 max-w-xl">
                <div><div className="overline mb-2">Name</div><input className="w-full h-11 px-3 bg-background border border-border" defaultValue="Kojo Mensah" /></div>
                <div><div className="overline mb-2">Email</div><input className="w-full h-11 px-3 bg-background border border-border" defaultValue="kojo@saintsgarage.gh" /></div>
                <button className="h-11 px-6 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs">Save Changes</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function EmptyState({ label }: { label: string }) {
  return <div className="bg-card border border-border p-16 text-center text-muted-foreground">{label}</div>;
}
