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
  LayoutGrid,
  FileText,
  TrendingUp,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

const PURPOSE_PAGES = [
  {
    id: "p1",
    name: "Family Cars",
    slug: "family-cars",
    description: "Vehicles perfect for family use",
    vehicles: 245,
    status: "Active",
    featured: true,
  },
  {
    id: "p2",
    name: "Luxury Vehicles",
    slug: "luxury-vehicles",
    description: "High-end premium automobiles",
    vehicles: 186,
    status: "Active",
    featured: true,
  },
  {
    id: "p3",
    name: "SUVs & Crossovers",
    slug: "suvs-crossovers",
    description: "Sport utility vehicles",
    vehicles: 312,
    status: "Active",
    featured: true,
  },
  {
    id: "p4",
    name: "Electric Vehicles",
    slug: "electric-vehicles",
    description: "EV and hybrid options",
    vehicles: 48,
    status: "Active",
    featured: false,
  },
  {
    id: "p5",
    name: "Commercial Fleet",
    slug: "commercial-fleet",
    description: "Business and fleet vehicles",
    vehicles: 156,
    status: "Active",
    featured: false,
  },
  {
    id: "p6",
    name: "Sports Cars",
    slug: "sports-cars",
    description: "Performance vehicles",
    vehicles: 89,
    status: "Active",
    featured: true,
  },
];

export const Route = createFileRoute("/admin/purpose-pages")({ component: AdminPurposePages });

function AdminPurposePages() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPages = PURPOSE_PAGES.filter((p) => {
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredPages.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredPages.map((p) => p.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; border: string }> = {
      Active: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
      Inactive: { bg: "bg-muted/10", text: "text-muted-foreground", border: "border-muted/20" },
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
    <AdminLayout title="Purpose Pages">
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">PURPOSE PAGES</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Add Page
            </button>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Pages", value: "12", icon: LayoutGrid, color: "text-white" },
            { label: "Featured", value: "6", icon: TrendingUp, color: "text-primary" },
            { label: "Total Vehicles", value: "1,840", icon: FileText, color: "text-success" },
            { label: "Active", value: "12", icon: Eye, color: "text-info" },
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
              placeholder="Search pages..."
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
        </div>

        {/* Bulk Actions Bar */}
        {selectedIds.size > 0 && (
          <div className="bg-primary/10 border border-primary/20 p-3 flex items-center gap-4">
            <span className="text-sm font-mono">{selectedIds.size} selected</span>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" /> Feature
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
                    checked={selectedIds.size === filteredPages.length && filteredPages.length > 0}
                    onChange={toggleSelectAll}
                    className="accent-primary"
                  />
                </th>
                <th className="px-4 py-3">Page Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Vehicles</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((p) => (
                <tr key={p.id} className="border-b border-admin-border/60 hover:bg-admin-bg/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-display tracking-wide">{p.name}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">/{p.slug}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs truncate">
                    {p.description}
                  </td>
                  <td className="px-4 py-3 font-mono">{p.vehicles}</td>
                  <td className="px-4 py-3">{getStatusBadge(p.status)}</td>
                  <td className="px-4 py-3">
                    {p.featured ? (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] border border-primary/20 font-mono uppercase tracking-wider">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-muted/10 text-muted-foreground text-[10px] border border-muted/20 font-mono uppercase tracking-wider">
                        No
                      </span>
                    )}
                  </td>
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
