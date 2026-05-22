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
  Badge,
  TrendingUp,
  Car,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

const BRANDS = [
  {
    id: "b1",
    name: "Mercedes-Benz",
    country: "Germany",
    logo: "mercedes.png",
    listings: 324,
    status: "Active",
    featured: true,
  },
  {
    id: "b2",
    name: "BMW",
    country: "Germany",
    logo: "bmw.png",
    listings: 286,
    status: "Active",
    featured: true,
  },
  {
    id: "b3",
    name: "Toyota",
    country: "Japan",
    logo: "toyota.png",
    listings: 512,
    status: "Active",
    featured: true,
  },
  {
    id: "b4",
    name: "Lexus",
    country: "Japan",
    logo: "lexus.png",
    listings: 198,
    status: "Active",
    featured: false,
  },
  {
    id: "b5",
    name: "Honda",
    country: "Japan",
    logo: "honda.png",
    listings: 267,
    status: "Active",
    featured: true,
  },
  {
    id: "b6",
    name: "Audi",
    country: "Germany",
    logo: "audi.png",
    listings: 156,
    status: "Active",
    featured: false,
  },
  {
    id: "b7",
    name: "Porsche",
    country: "Germany",
    logo: "porsche.png",
    listings: 89,
    status: "Active",
    featured: true,
  },
  {
    id: "b8",
    name: "Land Rover",
    country: "UK",
    logo: "landrover.png",
    listings: 124,
    status: "Active",
    featured: false,
  },
];

export const Route = createFileRoute("/admin/brands")({ component: AdminBrands });

function AdminBrands() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBrands = BRANDS.filter((b) => {
    if (statusFilter !== "All" && b.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredBrands.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredBrands.map((b) => b.id)));
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
    <AdminLayout title="Brands">
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">BRANDS</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Add Brand
            </button>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Brands", value: "48", icon: Badge, color: "text-white" },
            { label: "Featured", value: "16", icon: TrendingUp, color: "text-primary" },
            { label: "Total Listings", value: "2,840", icon: Car, color: "text-success" },
            { label: "Active", value: "42", icon: Eye, color: "text-info" },
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
              placeholder="Search brands..."
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
                    checked={
                      selectedIds.size === filteredBrands.length && filteredBrands.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="accent-primary"
                  />
                </th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Listings</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((b) => (
                <tr key={b.id} className="border-b border-admin-border/60 hover:bg-admin-bg/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(b.id)}
                      onChange={() => toggleSelect(b.id)}
                      className="accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-admin-bg border border-admin-border flex items-center justify-center text-xs font-mono text-muted-foreground">
                        {b.name.charAt(0)}
                      </div>
                      <span className="font-display tracking-wide">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{b.country}</td>
                  <td className="px-4 py-3 font-mono">{b.listings}</td>
                  <td className="px-4 py-3">{getStatusBadge(b.status)}</td>
                  <td className="px-4 py-3">
                    {b.featured ? (
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
