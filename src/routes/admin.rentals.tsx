import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Download,
  Search,
  Filter,
  X,
  LayoutGrid,
  List,
  MoreVertical,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { formatGHS } from "@/data/mock-data";

const RENTALS = [
  {
    id: "r1",
    title: "2022 Mercedes-Benz E-Class",
    dailyRate: 650,
    weeklyRate: 3800,
    monthlyRate: 14000,
    status: "Active",
    bookings: 12,
    location: "Accra CBD",
  },
  {
    id: "r2",
    title: "2021 Lexus RX 350",
    dailyRate: 550,
    weeklyRate: 3200,
    monthlyRate: 12000,
    status: "Active",
    bookings: 8,
    location: "Airport",
  },
  {
    id: "r3",
    title: "2023 Toyota Camry",
    dailyRate: 350,
    weeklyRate: 2000,
    monthlyRate: 7500,
    status: "Active",
    bookings: 24,
    location: "Tema",
  },
  {
    id: "r4",
    title: "2022 BMW 5 Series",
    dailyRate: 700,
    weeklyRate: 4200,
    monthlyRate: 15000,
    status: "Maintenance",
    bookings: 6,
    location: "East Legon",
  },
  {
    id: "r5",
    title: "2020 Honda CR-V",
    dailyRate: 400,
    weeklyRate: 2400,
    monthlyRate: 9000,
    status: "Active",
    bookings: 15,
    location: "Kumasi",
  },
];

export const Route = createFileRoute("/admin/rentals")({ component: AdminRentals });

function AdminRentals() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRentals = RENTALS.filter((r) => {
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredRentals.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredRentals.map((r) => r.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; border: string }> = {
      Active: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
      Maintenance: {
        bg: "bg-yellow-500/10",
        text: "text-yellow-500",
        border: "border-yellow-500/20",
      },
      Inactive: {
        bg: "bg-destructive/10",
        text: "text-destructive",
        border: "border-destructive/20",
      },
    };
    const s = styles[status] || styles.Active;
    return (
      <span
        className={`px-2 py-0.5 ${s.bg} ${s.text} ${s.border} text-[10px] font-mono uppercase tracking-wider border`}
      >
        {status}
      </span>
    );
  };

  return (
    <AdminLayout title="Rentals">
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">RENTALS</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Add New Rental
            </button>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Fleet", value: "38", delta: "+3" },
            { label: "On Rent", value: "24", delta: "+2" },
            { label: "Monthly Revenue", value: formatGHS(142000), delta: "+12%" },
            { label: "Utilization", value: "63%", delta: "+5%" },
          ].map((s) => (
            <div key={s.label} className="bg-admin-surface border border-admin-border p-5">
              <div className="overline text-[10px] opacity-50">{s.label}</div>
              <div className="font-display text-3xl mt-1">{s.value}</div>
              <div className="text-[10px] font-mono mt-1 text-success">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-admin-surface border border-admin-border p-3 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search rentals..."
              className="h-9 w-64 pl-10 pr-3 bg-admin-bg border border-admin-border text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 bg-admin-bg border border-admin-border text-sm"
          >
            <option>Status: All</option>
            <option>Active</option>
            <option>Maintenance</option>
            <option>Inactive</option>
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
          <div className="flex-1" />
          <div className="flex items-center gap-1">
            <button className="h-9 w-9 inline-flex items-center justify-center bg-primary text-primary-foreground">
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button className="h-9 w-9 inline-flex items-center justify-center hover:bg-admin-bg">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedIds.size > 0 && (
          <div className="bg-primary/10 border border-primary/20 p-3 flex items-center gap-4">
            <span className="text-sm font-mono">{selectedIds.size} selected</span>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 bg-success text-success-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3" /> Activate
              </button>
              <button className="h-8 px-3 bg-yellow-500 text-yellow-500-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                Maintenance
              </button>
              <button className="h-8 px-3 bg-destructive text-destructive-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
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
                      selectedIds.size === filteredRentals.length && filteredRentals.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="accent-primary"
                  />
                </th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Daily Rate</th>
                <th className="px-4 py-3">Weekly Rate</th>
                <th className="px-4 py-3">Monthly Rate</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Bookings</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRentals.map((r) => (
                <tr key={r.id} className="border-b border-admin-border/60 hover:bg-admin-bg/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(r.id)}
                      onChange={() => toggleSelect(r.id)}
                      className="accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-display tracking-wide">{r.title}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-primary">{formatGHS(r.dailyRate)}</td>
                  <td className="px-4 py-3 font-mono">{formatGHS(r.weeklyRate)}</td>
                  <td className="px-4 py-3 font-mono">{formatGHS(r.monthlyRate)}</td>
                  <td className="px-4 py-3">{r.location}</td>
                  <td className="px-4 py-3 font-mono">{r.bookings}</td>
                  <td className="px-4 py-3">{getStatusBadge(r.status)}</td>
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
