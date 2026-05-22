import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Download,
  Search,
  Filter,
  X,
  MoreVertical,
  Eye,
  Edit,
  Archive,
  Trash2,
  Send,
  Users,
  TrendingUp,
  MailOpen,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

const CAMPAIGNS = [
  {
    id: "c1",
    name: "January 2025 Newsletter",
    subject: "New Year, New Cars - Special Offers Inside",
    sent: "Jan 10, 2025",
    opens: 4567,
    clicks: 892,
    status: "Sent",
  },
  {
    id: "c2",
    name: "December Holiday Special",
    subject: "Holiday Deals on Luxury Vehicles",
    sent: "Dec 20, 2024",
    opens: 6234,
    clicks: 1245,
    status: "Sent",
  },
  {
    id: "c3",
    name: "Auction Preview",
    subject: "Upcoming Auctions You Don't Want to Miss",
    sent: "Dec 15, 2024",
    opens: 3890,
    clicks: 567,
    status: "Sent",
  },
  {
    id: "c4",
    name: "New Features Announcement",
    subject: "Introducing Our New Rental Platform",
    sent: "Dec 1, 2024",
    opens: 5123,
    clicks: 934,
    status: "Sent",
  },
  {
    id: "c5",
    name: "February Preview",
    subject: "What's Coming in February",
    sent: null,
    opens: 0,
    clicks: 0,
    status: "Draft",
  },
];

export const Route = createFileRoute("/admin/newsletter")({ component: AdminNewsletter });

function AdminNewsletter() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCampaigns = CAMPAIGNS.filter((c) => {
    if (statusFilter !== "All" && c.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredCampaigns.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredCampaigns.map((c) => c.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; border: string }> = {
      Sent: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
      Draft: { bg: "bg-muted/10", text: "text-muted-foreground", border: "border-muted/20" },
      Scheduled: { bg: "bg-info/10", text: "text-info", border: "border-info/20" },
    };
    const s = styles[status] || styles.Draft;
    return (
      <span
        className={`px-2 py-0.5 ${s.bg} ${s.text} ${s.border} text-[10px] font-mono uppercase tracking-wider border`}
      >
        {status}
      </span>
    );
  };

  return (
    <AdminLayout title="Newsletter">
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">NEWSLETTER</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Create Campaign
            </button>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Subscribers", value: "12,456", icon: Users, color: "text-white" },
            { label: "Total Campaigns", value: "48", icon: MailOpen, color: "text-primary" },
            { label: "Avg. Open Rate", value: "42.3%", icon: TrendingUp, color: "text-success" },
            { label: "Avg. Click Rate", value: "8.7%", icon: Send, color: "text-info" },
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

        {/* Filter Bar */}
        <div className="bg-admin-surface border border-admin-border p-3 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search campaigns..."
              className="h-9 w-64 pl-10 pr-3 bg-admin-bg border border-admin-border text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 bg-admin-bg border border-admin-border text-sm"
          >
            <option>Status: All</option>
            <option>Sent</option>
            <option>Draft</option>
            <option>Scheduled</option>
          </select>
          <button className="h-9 px-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" /> Apply
          </button>
          <button
            onClick={() => setStatusFilter("All")}
            className="h-9 px-3 text-muted-foreground hover:text-foreground text-xs flex items-center gap-2"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        </div>

        {/* Bulk Actions Bar */}
        {selectedIds.size > 0 && (
          <div className="bg-primary/10 border border-primary/20 p-3 flex items-center gap-4">
            <span className="text-sm font-mono">{selectedIds.size} selected</span>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Send className="w-3 h-3" /> Send
              </button>
              <button className="h-8 px-3 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Archive className="w-3 h-3" /> Archive
              </button>
              <button className="h-8 px-3 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-admin-surface border border-admin-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-b border-admin-border">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.size === filteredCampaigns.length && filteredCampaigns.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="accent-primary"
                  />
                </th>
                <th className="px-4 py-3">Campaign Name</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Sent Date</th>
                <th className="px-4 py-3">Opens</th>
                <th className="px-4 py-3">Clicks</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((c) => (
                <tr key={c.id} className="border-b border-admin-border/60 hover:bg-admin-bg/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-display tracking-wide">{c.name}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs truncate">
                    {c.subject}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{c.sent || "-"}</td>
                  <td className="px-4 py-3 font-mono">{c.opens.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono">{c.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3">{getStatusBadge(c.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
