import { createFileRoute, Link } from "@tanstack/react-router";
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
  Eye,
  Edit,
  Star,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { VEHICLES, formatGHS } from "@/data/mock-data";

export const Route = createFileRoute("/admin/vehicles")({ component: AdminVehicles });

function AdminVehicles() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");

  const filteredVehicles = VEHICLES.filter((v) => {
    if (statusFilter !== "All" && v.status !== statusFilter) return false;
    if (brandFilter !== "All" && v.brand !== brandFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredVehicles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredVehicles.map((v) => v.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; border: string }> = {
      Active: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
      Pending: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/20" },
      Rejected: {
        bg: "bg-destructive/10",
        text: "text-destructive",
        border: "border-destructive/20",
      },
      Sold: { bg: "bg-muted/10", text: "text-muted-foreground", border: "border-muted/20" },
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
    <AdminLayout title="Vehicles">
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">VEHICLES</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Add New Vehicle
            </button>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-admin-surface border border-admin-border p-3 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search listings..."
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
            <option>Pending Review</option>
            <option>Rejected</option>
            <option>Sold</option>
            <option>Archived</option>
          </select>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="h-9 px-3 bg-admin-bg border border-admin-border text-sm"
          >
            <option>Brand: All</option>
            <option>BMW</option>
            <option>Mercedes-Benz</option>
            <option>Toyota</option>
            <option>Lexus</option>
            <option>Honda</option>
          </select>
          <button className="h-9 px-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" /> Apply
          </button>
          <button
            onClick={() => {
              setStatusFilter("All");
              setBrandFilter("All");
            }}
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
                <CheckCircle className="w-3 h-3" /> Approve
              </button>
              <button className="h-8 px-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Star className="w-3 h-3" /> Feature
              </button>
              <button className="h-8 px-3 bg-destructive text-destructive-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <XCircle className="w-3 h-3" /> Reject
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
                      selectedIds.size === filteredVehicles.length && filteredVehicles.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="accent-primary"
                  />
                </th>
                <th className="px-4 py-3 w-12">Img</th>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Listed</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="border-b border-admin-border/60 hover:bg-admin-bg/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(v.id)}
                      onChange={() => toggleSelect(v.id)}
                      className="accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-12 h-8 bg-admin-bg border border-admin-border overflow-hidden">
                      <img src={v.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    #{v.id.slice(0, 4)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-display tracking-wide">{v.title}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-primary">{formatGHS(v.price)}</td>
                  <td className="px-4 py-3">{v.brand}</td>
                  <td className="px-4 py-3">{getStatusBadge(v.status || "Active")}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">Jan 3</td>
                  <td className="px-4 py-3 font-mono text-xs">{v.views || "842"}</td>
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
