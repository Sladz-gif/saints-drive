import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  DollarSign,
  Calendar,
  Download,
  Filter,
  Clock,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/admin/analytics")({ component: AdminAnalytics });

function AdminAnalytics() {
  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">ANALYTICS</div>
          <div className="flex items-center gap-2">
            <select className="h-9 px-3 bg-admin-surface border border-admin-border text-sm font-mono">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Visits",
              value: "124,582",
              change: "+12.5%",
              icon: Eye,
              color: "text-white",
            },
            {
              label: "Unique Visitors",
              value: "89,234",
              change: "+8.3%",
              icon: Users,
              color: "text-primary",
            },
            {
              label: "Avg. Session",
              value: "4m 32s",
              change: "+5.2%",
              icon: Clock,
              color: "text-success",
            },
            {
              label: "Bounce Rate",
              value: "32.4%",
              change: "-2.1%",
              icon: TrendingUp,
              color: "text-info",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-admin-surface border border-admin-border p-5 relative overflow-hidden group"
            >
              <s.icon className="absolute top-0 right-0 p-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="relative z-10">
                <div className="overline text-[10px] opacity-50">{s.label}</div>
                <div className={`font-display text-3xl mt-1 ${s.color}`}>{s.value}</div>
                <div
                  className={`text-xs font-mono mt-2 ${s.change.startsWith("+") ? "text-success" : "text-destructive"}`}
                >
                  {s.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Traffic Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-admin-surface border border-admin-border">
            <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
              <div className="font-display tracking-wider text-base">TRAFFIC SOURCES</div>
              <button className="text-xs font-mono uppercase tracking-wider text-primary">
                View Details
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { source: "Direct", value: "42,340", percentage: 34, color: "bg-primary" },
                { source: "Google Search", value: "38,560", percentage: 31, color: "bg-success" },
                { source: "Social Media", value: "24,890", percentage: 20, color: "bg-info" },
                {
                  source: "Referral",
                  value: "12,450",
                  percentage: 10,
                  color: "text-muted-foreground",
                },
                { source: "Other", value: "6,342", percentage: 5, color: "text-muted-foreground" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-display tracking-wide">{item.source}</span>
                    <span className="font-mono">
                      {item.value} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-admin-bg rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-admin-surface border border-admin-border">
            <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
              <div className="font-display tracking-wider text-base">TOP PAGES</div>
              <button className="text-xs font-mono uppercase tracking-wider text-primary">
                View All
              </button>
            </div>
            <div className="p-5 space-y-3">
              {[
                { page: "/buy", views: "45,234", bounce: "28%" },
                { page: "/rent", views: "32,890", bounce: "32%" },
                { page: "/auctions", views: "28,456", bounce: "35%" },
                { page: "/family-cars", views: "18,234", bounce: "30%" },
                { page: "/luxury-vehicles", views: "15,678", bounce: "25%" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-admin-bg border border-admin-border"
                >
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">{item.page}</div>
                    <div className="text-sm font-display tracking-wide mt-1">
                      {item.views} views
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground font-mono">Bounce</div>
                    <div className="text-sm font-mono">{item.bounce}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-admin-surface border border-admin-border">
          <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
            <div className="font-display tracking-wider text-base">CONVERSION FUNNEL</div>
            <button className="text-xs font-mono uppercase tracking-wider text-primary">
              View Details
            </button>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {[
                { step: "Homepage Visitors", value: "124,582", conversion: "100%" },
                { step: "Vehicle Page Views", value: "68,234", conversion: "54.8%" },
                { step: "Contact/Inquiry", value: "12,456", conversion: "18.3%" },
                { step: "Test Drive Booking", value: "4,234", conversion: "34.0%" },
                { step: "Purchase/Rental", value: "1,856", conversion: "43.8%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-48 text-sm font-display tracking-wide">{item.step}</div>
                  <div className="flex-1 h-8 bg-admin-bg border border-admin-border relative">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${parseFloat(item.conversion) * 0.8}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-mono">
                      <span>{item.value.toLocaleString()}</span>
                      <span>{item.conversion}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-admin-surface border border-admin-border">
          <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
            <div className="font-display tracking-wider text-base">GEOGRAPHIC DISTRIBUTION</div>
            <button className="text-xs font-mono uppercase tracking-wider text-primary">
              View Map
            </button>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { city: "Accra", percentage: "45%", value: "56,062" },
                { city: "Kumasi", percentage: "22%", value: "27,408" },
                { city: "Tamale", percentage: "12%", value: "14,950" },
                { city: "Takoradi", percentage: "10%", value: "12,458" },
                { city: "Cape Coast", percentage: "6%", value: "7,475" },
                { city: "Ho", percentage: "3%", value: "3,737" },
                { city: "Sunyani", percentage: "2%", value: "2,492" },
                { city: "Other", percentage: "0%", value: "0" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-admin-bg border border-admin-border">
                  <div className="font-display tracking-wide">{item.city}</div>
                  <div className="text-2xl font-display mt-2">{item.percentage}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {item.value} visitors
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
