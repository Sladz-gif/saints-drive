import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users,
  UserCheck,
  ShieldAlert,
  Mail,
  Search,
  Filter,
  X,
  MoreVertical,
  Eye,
  Edit,
  Bell,
  KeyRound,
  PauseCircle,
  Ban,
  Trash2,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

const USERS = [
  {
    id: "u1",
    name: "Kojo Mensah",
    email: "kojo@gmail.com",
    phone: "+233 24 123 4567",
    role: "Buyer",
    status: "Active",
    joined: "Jan 1, 2025",
    lastActive: "2h ago",
  },
  {
    id: "u2",
    name: "Ama Ofori",
    email: "ama.o@yahoo.com",
    phone: "+233 27 456 7890",
    role: "Buyer",
    status: "Suspended",
    joined: "Dec 10, 2024",
    lastActive: "5d ago",
  },
  {
    id: "u3",
    name: "Nana Kwesi",
    email: "nana@icloud.com",
    phone: "+233 55 321 0987",
    role: "Buyer",
    status: "Active",
    joined: "Dec 5, 2024",
    lastActive: "30m ago",
  },
];

export const Route = createFileRoute("/admin/users")({ component: AdminUsers });

function AdminUsers() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredUsers = USERS.filter((u) => {
    if (roleFilter !== "All" && u.role !== roleFilter) return false;
    if (statusFilter !== "All" && u.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredUsers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredUsers.map((u) => u.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; border: string }> = {
      Active: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
      Verified: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
      Suspended: {
        bg: "bg-yellow-500/10",
        text: "text-yellow-500",
        border: "border-yellow-500/20",
      },
      Pending: { bg: "bg-info/10", text: "text-info", border: "border-info/20" },
      Banned: {
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
    <AdminLayout title="Users">
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">USERS</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              Invite User
            </button>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: "12,481", icon: Users, color: "text-white" },
            { label: "Active", value: "12,340", icon: UserCheck, color: "text-success" },
            { label: "Suspended", value: "14", icon: ShieldAlert, color: "text-yellow-500" },
            { label: "New This Week", value: "+340", icon: Mail, color: "text-primary" },
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
              placeholder="Search by email or name..."
              className="h-9 w-64 pl-10 pr-3 bg-admin-bg border border-admin-border text-sm"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 px-3 bg-admin-bg border border-admin-border text-sm"
          >
            <option>Role: All</option>
            <option>Buyer</option>
            <option>Seller</option>
            <option>Dealer</option>
            <option>Fleet Owner</option>
            <option>Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 bg-admin-bg border border-admin-border text-sm"
          >
            <option>Status: All</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
            <option>Banned</option>
          </select>
          <button className="h-9 px-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" /> Apply
          </button>
          <button
            onClick={() => {
              setRoleFilter("All");
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
              <button className="h-8 px-3 bg-yellow-500 text-yellow-500-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <PauseCircle className="w-3 h-3" /> Suspend
              </button>
              <button className="h-8 px-3 bg-destructive text-destructive-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Ban className="w-3 h-3" /> Ban
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
                    checked={selectedIds.size === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="accent-primary"
                  />
                </th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Last Active</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b border-admin-border/60 hover:bg-admin-bg/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(u.id)}
                      onChange={() => toggleSelect(u.id)}
                      className="accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-admin-bg border border-admin-border flex items-center justify-center text-xs font-mono text-primary">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-display tracking-wide">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3 font-mono text-xs">{u.phone}</td>
                  <td className="px-4 py-3 font-mono text-xs">{u.role}</td>
                  <td className="px-4 py-3">{getStatusBadge(u.status)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{u.joined}</td>
                  <td className="px-4 py-3 font-mono text-xs">{u.lastActive}</td>
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
