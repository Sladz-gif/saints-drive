import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Wrench, TrendingUp, ShieldAlert } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { HERO_IMAGES, formatGHS } from "@/lib/mock-data";

export const Route = createFileRoute("/fleet")({ component: FleetPage });

function FleetPage() {
  return (
    <SiteLayout transparentNav>
      <section className="relative h-[60vh] min-h-[460px] overflow-hidden">
        <img src={HERO_IMAGES[1]} alt="" className="absolute inset-0 w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative container-x h-full flex flex-col justify-end pb-16">
          <div className="overline">Fleet Management</div>
          <h1 className="font-display text-6xl md:text-8xl tracking-wider mt-2">RUN A FLEET<br/>LIKE A PRO</h1>
          <Link to="/fleet" className="mt-8 inline-flex h-12 px-7 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm items-center w-fit">Create Fleet Account</Link>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="overline">Dashboard Preview</div>
        <h2 className="font-display text-4xl tracking-wider mt-2">YOUR COMMAND CENTER</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { Icon: Truck, label: "Active Vehicles", value: "24" },
            { Icon: Wrench, label: "Maintenance Due", value: "3" },
            { Icon: TrendingUp, label: "Revenue (Mo.)", value: formatGHS(82400) },
            { Icon: ShieldAlert, label: "Expired Insurance", value: "1" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border p-5">
              <s.Icon className="w-5 h-5 text-primary mb-3" />
              <div className="overline">{s.label}</div>
              <div className="font-display text-3xl mt-1">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card border border-border">
          <div className="px-5 py-4 hairline-b flex items-center justify-between">
            <div className="font-display text-xl tracking-wider">VEHICLES</div>
            <button className="text-xs font-mono uppercase tracking-wider text-primary hover:text-primary-dim">+ Add Vehicle</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Vehicle</th><th className="px-5 py-3">Driver</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Mileage</th><th></th>
              </tr>
            </thead>
            <tbody>
              {[["BMW 7 Series", "Kojo A.", "Active", "24,500"], ["Toyota Hilux", "Yaw M.", "Maintenance", "88,200"], ["Mercedes S500", "Ama O.", "Active", "12,100"]].map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-5 py-4 font-medium">{r[0]}</td>
                  <td className="px-5 py-4 text-muted-foreground">{r[1]}</td>
                  <td className="px-5 py-4"><span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest ${r[2] === "Active" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>{r[2]}</span></td>
                  <td className="px-5 py-4 font-mono">{r[3]} km</td>
                  <td className="px-5 py-4 text-right text-muted-foreground">···</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SiteLayout>
  );
}
