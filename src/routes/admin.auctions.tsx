import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Download,
  Search,
  Filter,
  X,
  MoreVertical,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  Zap,
  Square,
  Pause,
  UserX,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { formatGHS } from "@/data/mock-data";

const AUCTIONS = [
  {
    id: "a1",
    title: "2019 Mercedes-Benz E300",
    startAt: "2025-01-15 14:00",
    endAt: "2025-01-15 18:00",
    reservePrice: 75000,
    currentBid: 78000,
    bids: 24,
    status: "Live",
  },
  {
    id: "a2",
    title: "2022 BMW M4 Competition",
    startAt: "2025-01-16 10:00",
    endAt: "2025-01-16 14:00",
    reservePrice: 280000,
    currentBid: 0,
    bids: 0,
    status: "Upcoming",
  },
  {
    id: "a3",
    title: "2020 Porsche 911 Carrera",
    startAt: "2025-01-14 16:00",
    endAt: "2025-01-14 20:00",
    reservePrice: 350000,
    currentBid: 425000,
    bids: 42,
    status: "Ended",
  },
  {
    id: "a4",
    title: "2021 Lexus LC 500",
    startAt: "2025-01-17 09:00",
    endAt: "2025-01-17 13:00",
    reservePrice: 180000,
    currentBid: 0,
    bids: 0,
    status: "Upcoming",
  },
  {
    id: "a5",
    title: "2018 Range Rover Autobiography",
    startAt: "2025-01-13 15:00",
    endAt: "2025-01-13 19:00",
    reservePrice: 220000,
    currentBid: 195000,
    bids: 18,
    status: "Ended",
  },
];

export const Route = createFileRoute("/admin/auctions")({ component: AdminAuctions });

function AdminAuctions() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAuctions = AUCTIONS.filter((a) => {
    if (statusFilter !== "All" && a.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredAuctions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAuctions.map((a) => a.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; border: string }> = {
      Live: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" },
      Upcoming: { bg: "bg-info/10", text: "text-info", border: "border-info/20" },
      Ended: { bg: "bg-muted/10", text: "text-muted-foreground", border: "border-muted/20" },
      Draft: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/20" },
    };
    const s = styles[status] || styles.Upcoming;
    return (
      <span
        className={`px-2 py-0.5 ${s.bg} ${s.text} ${s.border} text-[10px] font-mono uppercase tracking-wider border flex items-center gap-1.5 w-fit`}
      >
        {status === "Live" && (
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-dot" />
        )}
        {status}
      </span>
    );
  };

  return (
    <AdminLayout title="Auctions">
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">AUCTIONS</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Create Auction
            </button>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Live Now", value: "5", delta: "2 ending soon" },
            { label: "Upcoming", value: "12", delta: "Next: 2h" },
            { label: "Total Bids", value: "1,248", delta: "+84 today" },
            { label: "Auction Revenue", value: formatGHS(842000), delta: "+18%" },
          ].map((s) => (
            <div key={s.label} className="bg-admin-surface border border-admin-border p-5">
              <div className="overline text-[10px] opacity-50">{s.label}</div>
              <div className="font-display text-3xl mt-1">{s.value}</div>
              <div className="text-[10px] font-mono mt-1 text-success">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1">
          {["All", "Upcoming", "Live", "Ended", "Draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`h-9 px-4 font-mono uppercase tracking-wider text-xs border transition-colors ${
                statusFilter === tab
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-admin-surface border-admin-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "Live" && (
                <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-dot mr-2" />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-admin-surface border border-admin-border p-3 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search auctions..."
              className="h-9 w-64 pl-10 pr-3 bg-admin-bg border border-admin-border text-sm"
            />
          </div>
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
              <button className="h-8 px-3 bg-destructive text-destructive-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Zap className="w-3 h-3" /> Start Now
              </button>
              <button className="h-8 px-3 bg-yellow-500 text-yellow-500-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Pause className="w-3 h-3" /> Pause
              </button>
              <button className="h-8 px-3 bg-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Square className="w-3 h-3" /> End Now
              </button>
              <button className="h-8 px-3 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Archive className="w-3 h-3" /> Archive
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
                      selectedIds.size === filteredAuctions.length && filteredAuctions.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="accent-primary"
                  />
                </th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Start Time</th>
                <th className="px-4 py-3">End Time</th>
                <th className="px-4 py-3">Reserve Price</th>
                <th className="px-4 py-3">Current Bid</th>
                <th className="px-4 py-3">Bids</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAuctions.map((a) => (
                <tr key={a.id} className="border-b border-admin-border/60 hover:bg-admin-bg/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(a.id)}
                      onChange={() => toggleSelect(a.id)}
                      className="accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-display tracking-wide">{a.title}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.startAt}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.endAt}</td>
                  <td className="px-4 py-3 font-mono">{formatGHS(a.reservePrice)}</td>
                  <td className="px-4 py-3 font-mono text-primary">
                    {a.currentBid > 0 ? formatGHS(a.currentBid) : "—"}
                  </td>
                  <td className="px-4 py-3 font-mono">{a.bids}</td>
                  <td className="px-4 py-3">{getStatusBadge(a.status)}</td>
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
