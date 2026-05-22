import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart,
  Gavel,
  Calendar,
  Car,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Clock,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES, formatGHS } from "@/data/mock-data";

export const Route = createFileRoute("/account")({ component: AccountPage });

const TABS = [
  { id: "overview", label: "Overview", Icon: User },
  { id: "saved", label: "Saved Vehicles", Icon: Heart },
  { id: "bids", label: "Active Bids", Icon: Gavel },
  { id: "reservations", label: "Reservations", Icon: Calendar },
  { id: "rentals", label: "Rental History", Icon: Car },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "settings", label: "Settings", Icon: Settings },
];

function AccountPage() {
  const [tab, setTab] = useState("overview");

  return (
    <SiteLayout>
      <div className="container-x py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="overline text-primary mb-2">My Account</div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider uppercase">DASHBOARD</h1>
          </div>
          <button className="h-12 px-6 border border-border hover:border-destructive hover:text-destructive text-[10px] font-mono uppercase tracking-widest transition-all inline-flex items-center gap-3">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* SIDEBAR */}
          <aside className="space-y-1 lg:block hidden">
            <div className="p-4 sm:p-6 bg-surface border border-border mb-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="font-display text-base sm:text-lg tracking-wider">KOJO MENSAH</div>
                  <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                    Premium Member
                  </div>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full flex items-center justify-between px-4 h-14 text-[10px] font-mono uppercase tracking-[0.2em] transition-all border-l-2 ${
                    tab === t.id
                      ? "bg-card text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <t.Icon className="w-4 h-4" /> {t.label}
                  </div>
                  {t.id === "notifications" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="animate-fade-in">
            <button className="lg:hidden mb-6 w-full h-12 bg-card border border-border text-sm font-mono uppercase tracking-widest flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" /> Change Tab
            </button>
            {tab === "overview" && (
              <div className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { label: "Total Bids", value: "08", icon: Gavel },
                    { label: "Saved Cars", value: "12", icon: Heart },
                    { label: "Active Rentals", value: "01", icon: Car },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-card border border-border p-4 sm:p-6 md:p-8">
                      <stat.icon className="w-4 h-4 text-primary mb-3 sm:mb-4" />
                      <div className="overline text-[9px] sm:text-[10px] text-muted-foreground">{stat.label}</div>
                      <div className="font-display text-2xl sm:text-3xl md:text-4xl tracking-wider mt-1">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-card border border-border">
                  <div className="px-4 sm:px-6 lg:px-8 h-14 sm:h-16 hairline-b flex items-center justify-between">
                    <div className="font-display text-base sm:text-lg lg:text-xl tracking-wider uppercase">
                      Recent Activity
                    </div>
                  </div>
                  <div className="divide-y divide-border/40">
                    {[
                      {
                        type: "Bid Placed",
                        item: "2023 BMW M4 COMPETITION",
                        status: "Outbid",
                        time: "2h ago",
                        color: "text-destructive",
                      },
                      {
                        type: "Reservation",
                        item: "2024 Mercedes S580 Rental",
                        status: "Confirmed",
                        time: "1d ago",
                        color: "text-success",
                      },
                      {
                        type: "Save",
                        item: "2022 Porsche 911 GT3",
                        status: "In Stock",
                        time: "3d ago",
                        color: "text-primary",
                      },
                    ].map((activity, i) => (
                      <div
                        key={i}
                        className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 hover:bg-surface/50 transition-colors"
                      >
                        <div>
                          <div className="font-display text-sm sm:text-base tracking-wider uppercase">
                            {activity.item}
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 mt-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                            <span>{activity.type}</span>
                            <span>•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                        <div
                          className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest ${activity.color}`}
                        >
                          {activity.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "saved" && (
              <div className="grid md:grid-cols-2 gap-8">
                {VEHICLES.slice(0, 4).map((v) => (
                  <VehicleCard key={v.id} v={v} />
                ))}
              </div>
            )}

            {tab === "bids" && (
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    car: "2023 BMW M4 COMPETITION",
                    myBid: 850000,
                    highest: 855000,
                    ends: "2h 45m",
                    status: "Outbid",
                  },
                  {
                    car: "2021 LAND ROVER DEFENDER",
                    myBid: 920000,
                    highest: 920000,
                    ends: "14h 20m",
                    status: "Winning",
                  },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="bg-card border border-border p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 md:gap-8"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="h-16 w-24 sm:h-20 sm:w-32 bg-surface border border-border overflow-hidden shrink-0">
                        <img
                          src={VEHICLES[i].image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-display text-lg sm:text-xl md:text-2xl tracking-wider uppercase">
                          {b.car}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 mt-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">
                          <span>Ends: {b.ends}</span>
                          <span
                            className={b.status === "Winning" ? "text-success" : "text-destructive"}
                          >
                            {b.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 md:gap-12">
                      <div className="text-right">
                        <div className="overline text-[9px] text-muted-foreground">Your Bid</div>
                        <div className="font-display text-xl sm:text-2xl tracking-wider">
                          {formatGHS(b.myBid)}
                        </div>
                      </div>
                      <Link
                        to="/auctions"
                        className="h-11 sm:h-12 px-4 sm:px-6 bg-white text-black hover:bg-primary hover:text-white text-[10px] font-mono uppercase tracking-widest transition-all inline-flex items-center gap-2 shrink-0"
                      >
                        View Auction <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "rentals" && (
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    car: "2024 MERCEDES S580",
                    dates: "MAY 20 - MAY 25",
                    status: "Active",
                    price: 3200,
                  },
                  {
                    car: "2023 TOYOTA LAND CRUISER",
                    dates: "APR 12 - APR 15",
                    status: "Completed",
                    price: 4500,
                  },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="bg-card border border-border p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="h-16 w-24 sm:h-20 sm:w-32 bg-surface border border-border overflow-hidden shrink-0">
                        <img
                          src={VEHICLES[i + 2].image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-display text-lg sm:text-xl md:text-2xl tracking-wider uppercase">
                          {r.car}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 mt-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" /> {r.dates}
                          </span>
                          <span
                            className={
                              r.status === "Active" ? "text-success" : "text-muted-foreground"
                            }
                          >
                            {r.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="overline text-[9px] text-muted-foreground">Total Paid</div>
                      <div className="font-display text-xl sm:text-2xl tracking-wider">
                        {formatGHS(r.price)}
                      </div>
                      <button className="mt-2 text-[9px] font-mono uppercase tracking-widest text-primary hover:underline">
                        Download Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(tab === "reservations" || tab === "notifications") && (
              <div className="py-32 text-center bg-card border border-border">
                <div className="h-16 w-16 rounded-full bg-surface inline-flex items-center justify-center mb-6">
                  {tab === "notifications" ? (
                    <Bell className="w-8 h-8 text-muted-foreground" />
                  ) : (
                    <Calendar className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-display text-3xl tracking-wider uppercase">
                  NO {tab.toUpperCase()}
                </h3>
                <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-widest">
                  Everything is up to date.
                </p>
              </div>
            )}

            {tab === "settings" && (
              <div className="max-w-2xl space-y-8">
                <div className="bg-card border border-border p-6 sm:p-10">
                  <h3 className="font-display text-xl sm:text-2xl tracking-wider uppercase mb-6 sm:mb-8">
                    PROFILE INFORMATION
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField label="Full Name" value="Kojo Mensah" />
                    <InputField label="Email Address" value="kojo@saintsgarage.gh" />
                    <InputField label="Phone Number" value="+233 24 555 0123" />
                    <InputField label="Location" value="East Legon, Accra" />
                  </div>
                  <button className="mt-10 h-14 px-10 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-xs transition-all">
                    Save Changes
                  </button>
                </div>

                <div className="bg-card border border-border p-6 sm:p-10">
                  <h3 className="font-display text-xl sm:text-2xl tracking-wider uppercase mb-6 sm:mb-8">SECURITY</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-surface border border-border">
                      <div className="flex items-center gap-4">
                        <ShieldCheck className="w-5 h-5 text-success" />
                        <div>
                          <div className="text-xs font-mono uppercase tracking-widest">
                            Two-Factor Authentication
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-1">
                            Protect your account with an extra layer of security.
                          </div>
                        </div>
                      </div>
                      <button className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline">
                        Enable
                      </button>
                    </div>
                    <button className="h-12 px-6 border border-border hover:border-primary text-[10px] font-mono uppercase tracking-widest transition-all">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function InputField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="overline text-[9px] text-muted-foreground mb-2">{label}</div>
      <input
        defaultValue={value}
        className="w-full h-12 px-4 bg-surface border border-border focus:border-primary outline-none font-mono text-sm"
      />
    </div>
  );
}
