import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Megaphone,
  Building2,
  Image as ImageIcon,
  MapPin,
  Plus,
  TrendingUp,
  Eye,
  DollarSign,
  Clock,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { formatGHS } from "@/data/mock-data";

export const Route = createFileRoute("/admin/ads")({ component: AdminAds });

function AdminAds() {
  return (
    <AdminLayout title="Ads Manager">
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">ADS MANAGER</div>
          <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" /> New Campaign
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Campaigns", value: "12", icon: Megaphone, color: "text-white" },
            { label: "Total Impressions", value: "2.4M", icon: Eye, color: "text-info" },
            {
              label: "Revenue (Mo.)",
              value: formatGHS(48200),
              icon: DollarSign,
              color: "text-success",
            },
            { label: "Avg. CTR", value: "2.8%", icon: TrendingUp, color: "text-primary" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-admin-surface border border-admin-border p-5 relative overflow-hidden group"
            >
              <s.icon className="absolute top-0 right-0 p-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="relative z-10">
                <div className="overline text-[10px] opacity-50">{s.label}</div>
                <div className={`font-display text-3xl mt-1 ${s.color}`}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/companies"
            className="bg-admin-surface border border-admin-border p-6 hover:border-primary transition-colors group"
          >
            <Building2 className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
            <div className="font-display text-lg tracking-wider">COMPANIES</div>
            <div className="text-xs text-muted-foreground mt-1">Manage advertisers</div>
          </Link>
          <Link
            to="/admin/banners"
            className="bg-admin-surface border border-admin-border p-6 hover:border-primary transition-colors group"
          >
            <ImageIcon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
            <div className="font-display text-lg tracking-wider">BANNERS</div>
            <div className="text-xs text-muted-foreground mt-1">Create banner ads</div>
          </Link>
          <Link
            to="/admin/placements"
            className="bg-admin-surface border border-admin-border p-6 hover:border-primary transition-colors group"
          >
            <MapPin className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
            <div className="font-display text-lg tracking-wider">PLACEMENTS</div>
            <div className="text-xs text-muted-foreground mt-1">Ad placement zones</div>
          </Link>
          <div className="bg-admin-surface border border-admin-border p-6">
            <Clock className="w-8 h-8 text-muted-foreground mb-3" />
            <div className="font-display text-lg tracking-wider">REPORTS</div>
            <div className="text-xs text-muted-foreground mt-1">Performance analytics</div>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-admin-surface border border-admin-border">
          <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
            <div className="font-display tracking-wider text-base">ACTIVE CAMPAIGNS</div>
            <button className="text-xs font-mono uppercase tracking-wider text-primary">
              View All
            </button>
          </div>
          <div className="p-5 space-y-4">
            {[
              {
                name: "Premium Motors - Featured",
                company: "Premium Motors GH",
                impressions: "842K",
                clicks: "24K",
                ctr: "2.85%",
                status: "Active",
              },
              {
                name: "Drive360 Homepage Takeover",
                company: "Drive360",
                impressions: "1.2M",
                clicks: "38K",
                ctr: "3.17%",
                status: "Active",
              },
              {
                name: "Luxury Cars Sidebar",
                company: "Luxury Cars Ghana",
                impressions: "456K",
                clicks: "11K",
                ctr: "2.41%",
                status: "Active",
              },
            ].map((campaign, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-admin-bg border border-admin-border"
              >
                <div className="flex-1">
                  <div className="font-display tracking-wide">{campaign.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{campaign.company}</div>
                </div>
                <div className="flex items-center gap-8 text-sm">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground font-mono">IMPRESSIONS</div>
                    <div className="font-mono">{campaign.impressions}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground font-mono">CLICKS</div>
                    <div className="font-mono">{campaign.clicks}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground font-mono">CTR</div>
                    <div className="font-mono text-primary">{campaign.ctr}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] border border-success/20 font-mono uppercase tracking-wider">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
