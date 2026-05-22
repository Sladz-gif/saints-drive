import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  Wrench,
  TrendingUp,
  ShieldAlert,
  ChevronRight,
  Filter,
  Search,
  MoreHorizontal,
  Download,
  LayoutDashboard,
  Map,
  Settings,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { HERO_IMAGES, formatGHS } from "@/data/mock-data";

export const Route = createFileRoute("/fleet")({ component: FleetPage });

function FleetPage() {
  return (
    <SiteLayout transparentNav>
      <section className="relative h-[60vh] min-h-[460px] overflow-hidden">
        <img
          src={HERO_IMAGES[1]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative container-x h-full flex flex-col justify-end pb-24">
          <div className="overline tracking-[0.3em] text-primary mb-4">Enterprise Solutions</div>
          <h1 className="font-display text-7xl md:text-9xl tracking-wider leading-[0.85] text-white uppercase">
            FLEET
            <br />
            CONTROL.
          </h1>
          <p className="mt-8 text-xl text-white/70 max-w-xl font-body">
            Scale your operations with Ghana's most advanced fleet management suite.
          </p>
          <div className="mt-10 flex gap-4">
            <button className="h-14 px-8 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm inline-flex items-center gap-3">
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* DASHBOARD NAV */}
      <div className="bg-surface hairline-b sticky top-16 z-40">
        <div className="container-x flex gap-8">
          {[
            { label: "Overview", icon: LayoutDashboard, active: true },
            { label: "Vehicles", icon: Truck },
            { label: "Tracking", icon: Map },
            { label: "Service", icon: Wrench },
            { label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.label}
              className={`h-16 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest border-b-2 transition-all ${item.active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-white"}`}
            >
              <item.icon className="w-3.5 h-3.5" /> {item.label}
            </button>
          ))}
        </div>
      </div>

      <section className="container-x py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="overline text-primary">Command Center</div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wider mt-2 uppercase">FLEET SUMMARY</h2>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button className="h-10 px-4 border border-border bg-card hover:border-primary text-[10px] font-mono uppercase tracking-widest transition-all inline-flex items-center gap-2">
              <Download className="w-3 h-3" /> Export Report
            </button>
            <button className="h-10 px-4 sm:px-6 bg-white text-black hover:bg-primary hover:text-white text-[10px] font-mono uppercase tracking-widest transition-all">
              + New Vehicle
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              Icon: Truck,
              label: "Total Fleet",
              value: "24",
              sub: "18 Active / 6 Idle",
              color: "text-white",
            },
            {
              Icon: Wrench,
              label: "Maintenance",
              value: "03",
              sub: "Scheduled this week",
              color: "text-primary",
            },
            {
              Icon: TrendingUp,
              label: "Monthly Rev.",
              value: formatGHS(82400),
              sub: "+12% vs last month",
              color: "text-success",
            },
            {
              Icon: ShieldAlert,
              label: "Compliance",
              value: "01",
              sub: "Insurance expiring",
              color: "text-destructive",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border p-4 sm:p-6 md:p-8 relative overflow-hidden group hover:border-primary/30 transition-all"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <s.Icon className="w-12 h-12 sm:w-16 sm:h-16" />
              </div>
              <div className="relative z-10">
                <div className="overline text-[9px] sm:text-[10px] text-muted-foreground mb-3 sm:mb-4">{s.label}</div>
                <div className={`font-display text-3xl sm:text-4xl md:text-5xl tracking-wider ${s.color}`}>{s.value}</div>
                <div className="mt-3 sm:mt-4 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                  {s.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* VEHICLE TABLE */}
          <div className="lg:col-span-2 bg-card border border-border">
            <div className="px-4 sm:px-6 lg:px-8 h-14 sm:h-16 hairline-b flex items-center justify-between">
              <div className="font-display text-base sm:text-lg lg:text-xl tracking-wider uppercase">Active Vehicles</div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    placeholder="Search fleet..."
                    className="h-9 pl-9 pr-4 bg-surface border border-border text-[10px] font-mono outline-none focus:border-primary w-36 sm:w-48"
                  />
                </div>
                <button className="h-8 sm:h-9 w-8 sm:w-9 flex items-center justify-center border border-border hover:border-primary">
                  <Filter className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="text-left text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground hairline-b bg-surface/50">
                    <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">Vehicle / Driver</th>
                    <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">Status</th>
                    <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">Utilization</th>
                    <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">Revenue</th>
                    <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {[
                    {
                      car: "2023 BMW 7 SERIES",
                      driver: "Kojo A.",
                      status: "Active",
                      util: "92%",
                      rev: 14200,
                    },
                    {
                      car: "2022 TOYOTA HILUX",
                      driver: "Yaw M.",
                      status: "Maintenance",
                      util: "14%",
                      rev: 2800,
                    },
                    {
                      car: "2024 MERCEDES S500",
                      driver: "Ama O.",
                      status: "Active",
                      util: "88%",
                      rev: 12100,
                    },
                    {
                      car: "2021 FORD RANGER",
                      driver: "James K.",
                      status: "Idle",
                      util: "0%",
                      rev: 0,
                    },
                    {
                      car: "2023 HYUNDAI SONATA",
                      driver: "Nana B.",
                      status: "Active",
                      util: "96%",
                      rev: 8400,
                    },
                  ].map((r, i) => (
                    <tr key={i} className="group hover:bg-surface/50 transition-colors">
                      <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
                        <div className="font-display text-sm sm:text-base tracking-wider uppercase">
                          {r.car}
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5 sm:mt-1">
                          {r.driver}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
                        <span
                          className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] font-mono uppercase tracking-widest ${
                            r.status === "Active"
                              ? "bg-success/10 text-success border border-success/20"
                              : r.status === "Idle"
                                ? "bg-muted/10 text-muted-foreground border border-muted/20"
                                : "bg-primary/10 text-primary border border-primary/20"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="flex-1 h-1 bg-surface rounded-full overflow-hidden min-w-[40px] sm:min-w-[60px]">
                            <div className="h-full bg-primary" style={{ width: r.util }} />
                          </div>
                          <span className="font-mono text-[10px] sm:text-xs">{r.util}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-5 font-display text-base sm:text-lg tracking-wider">
                        {r.rev > 0 ? formatGHS(r.rev) : "—"}
                      </td>
                      <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-5 text-right">
                        <button className="text-muted-foreground hover:text-white transition-colors">
                          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 hairline-t text-center">
              <button className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
                View All Vehicles
              </button>
            </div>
          </div>

          {/* SIDEBAR ANALYTICS */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-card border border-border p-4 sm:p-6 lg:p-8">
              <h3 className="font-display text-base sm:text-lg lg:text-xl tracking-wider uppercase mb-4 sm:mb-6">REVENUE TREND</h3>
              <div className="h-32 sm:h-40 flex items-end gap-1 sm:gap-2 mb-4 sm:mb-6">
                {[40, 60, 45, 90, 65, 80, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/20 hover:bg-primary transition-colors cursor-help group relative rounded-sm"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] sm:text-[9px] font-mono py-0.5 sm:py-1 px-1.5 sm:px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {h}k
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-mono text-[8px] sm:text-[9px] text-muted-foreground uppercase tracking-widest">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            <div className="bg-card border border-border p-4 sm:p-6 lg:p-8">
              <h3 className="font-display text-base sm:text-lg lg:text-xl tracking-wider uppercase mb-4 sm:mb-6">SYSTEM ALERTS</h3>
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    type: "Critical",
                    msg: "Insurance Expiring: GW-420-23",
                    time: "2h ago",
                    color: "text-destructive",
                  },
                  {
                    type: "Service",
                    msg: "Oil Change Due: BMW 7 Series",
                    time: "5h ago",
                    color: "text-primary",
                  },
                  {
                    type: "Payment",
                    msg: "Payout processed: GHS 12,400",
                    time: "1d ago",
                    color: "text-success",
                  },
                ].map((a, i) => (
                  <div key={i} className="flex gap-3 sm:gap-4">
                    <div className={`w-1 shrink-0 ${a.color.replace("text-", "bg-")}`} />
                    <div>
                      <div className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest ${a.color}`}>
                        {a.type}
                      </div>
                      <div className="text-[11px] sm:text-xs text-foreground mt-0.5 sm:mt-1 font-body">{a.msg}</div>
                      <div className="text-[8px] sm:text-[9px] text-muted-foreground font-mono mt-0.5 sm:mt-1">
                        {a.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full h-9 sm:h-10 mt-6 sm:mt-8 border border-border hover:border-primary text-[9px] sm:text-[10px] font-mono uppercase tracking-widest transition-all">
                Clear All
              </button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
