import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Download,
  Search,
  Filter,
  X,
  MoreVertical,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  ShoppingCart,
  Calendar,
  DollarSign,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { formatGHS } from "@/data/mock-data";

const ORDERS = [
  {
    id: "o1",
    type: "Sale",
    item: "2022 Mercedes-Benz E-Class",
    buyer: "Kojo Mensah",
    amount: 185000,
    status: "Completed",
    date: "Jan 15, 2025",
    payment: "Paystack",
  },
  {
    id: "o2",
    type: "Rental",
    item: "2021 Lexus RX 350",
    buyer: "Ama Ofori",
    amount: 3200,
    status: "Active",
    date: "Jan 14, 2025",
    payment: "MTN MoMo",
  },
  {
    id: "o3",
    type: "Auction",
    item: "2020 Porsche 911 Carrera",
    buyer: "Nana Kwesi",
    amount: 425000,
    status: "Completed",
    date: "Jan 13, 2025",
    payment: "Paystack",
  },
  {
    id: "o4",
    type: "Sale",
    item: "2023 Toyota Camry",
    buyer: "Emmanuel Addo",
    amount: 95000,
    status: "Pending",
    date: "Jan 12, 2025",
    payment: "Flutterwave",
  },
  {
    id: "o5",
    type: "Rental",
    item: "2022 BMW 5 Series",
    buyer: "Kofi Mensah",
    amount: 4200,
    status: "Cancelled",
    date: "Jan 11, 2025",
    payment: "Vodafone Cash",
  },
];

export const Route = createFileRoute("/admin/orders")({ component: AdminOrders });

function AdminOrders() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = ORDERS.filter((o) => {
    if (typeFilter !== "All" && o.type !== typeFilter) return false;
    if (statusFilter !== "All" && o.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredOrders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredOrders.map((o) => o.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; border: string }> = {
      Completed: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
      Active: { bg: "bg-info/10", text: "text-info", border: "border-info/20" },
      Pending: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/20" },
      Cancelled: {
        bg: "bg-destructive/10",
        text: "text-destructive",
        border: "border-destructive/20",
      },
    };
    const s = styles[status] || styles.Pending;
    return (
      <span
        className={`px-2 py-0.5 ${s.bg} ${s.text} ${s.border} text-[10px] font-mono uppercase tracking-wider border`}
      >
        {status}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, { bg: string; text: string; border: string }> = {
      Sale: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
      Rental: { bg: "bg-info/10", text: "text-info", border: "border-info/20" },
      Auction: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
    };
    const s = styles[type] || styles.Sale;
    return (
      <span
        className={`px-2 py-0.5 ${s.bg} ${s.text} ${s.border} text-[10px] font-mono uppercase tracking-wider border`}
      >
        {type}
      </span>
    );
  };

  return (
    <AdminLayout title="Orders">
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">ORDERS & BOOKINGS</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              Manual Order
            </button>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: "2,847", icon: ShoppingCart, color: "text-white" },
            { label: "Active Rentals", value: "186", icon: Calendar, color: "text-info" },
            {
              label: "Revenue (Mo.)",
              value: formatGHS(842000),
              icon: DollarSign,
              color: "text-success",
            },
            { label: "Pending", value: "42", icon: Archive, color: "text-yellow-500" },
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

        {/* Status Tabs */}
        <div className="flex items-center gap-1">
          {["All", "Sale", "Rental", "Auction"].map((tab) => (
            <button
              key={tab}
              onClick={() => setTypeFilter(tab === "All" ? "All" : tab)}
              className={`h-9 px-4 font-mono uppercase tracking-wider text-xs border transition-colors ${
                typeFilter === tab
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-admin-surface border-admin-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-admin-surface border border-admin-border p-3 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search orders..."
              className="h-9 w-64 pl-10 pr-3 bg-admin-bg border border-admin-border text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 bg-admin-bg border border-admin-border text-sm"
          >
            <option>Status: All</option>
            <option>Completed</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
          <button className="h-9 px-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" /> Apply
          </button>
          <button
            onClick={() => {
              setTypeFilter("All");
              setStatusFilter("All");
            }}
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
              <button className="h-8 px-3 bg-success text-success-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3" /> Mark Complete
              </button>
              <button className="h-8 px-3 bg-destructive text-destructive-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <XCircle className="w-3 h-3" /> Cancel
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
                      selectedIds.size === filteredOrders.length && filteredOrders.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="accent-primary"
                  />
                </th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Buyer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id} className="border-b border-admin-border/60 hover:bg-admin-bg/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(o.id)}
                      onChange={() => toggleSelect(o.id)}
                      className="accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">#{o.id}</td>
                  <td className="px-4 py-3">{getTypeBadge(o.type)}</td>
                  <td className="px-4 py-3">
                    <div className="font-display tracking-wide">{o.item}</div>
                  </td>
                  <td className="px-4 py-3">{o.buyer}</td>
                  <td className="px-4 py-3 font-mono text-primary">{formatGHS(o.amount)}</td>
                  <td className="px-4 py-3 font-mono text-xs">{o.payment}</td>
                  <td className="px-4 py-3">{getStatusBadge(o.status)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{o.date}</td>
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
