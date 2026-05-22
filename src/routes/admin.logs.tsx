import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  Filter,
  X,
  Download,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreVertical,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

const LOG_ENTRIES = [
  {
    id: "l1",
    action: "User Login",
    user: "kofi.mensah@email.com",
    ip: "197.24.56.12",
    status: "Success",
    timestamp: "2025-01-15 14:32:15",
  },
  {
    id: "l2",
    action: "Vehicle Created",
    user: "admin@saintsgarage.gh",
    ip: "197.24.56.10",
    status: "Success",
    timestamp: "2025-01-15 14:28:42",
  },
  {
    id: "l3",
    action: "Failed Login Attempt",
    user: "unknown",
    ip: "41.215.78.23",
    status: "Failed",
    timestamp: "2025-01-15 14:25:18",
  },
  {
    id: "l4",
    action: "Dealer Approved",
    user: "admin@saintsgarage.gh",
    ip: "197.24.56.10",
    status: "Success",
    timestamp: "2025-01-15 14:15:33",
  },
  {
    id: "l5",
    action: "Settings Updated",
    user: "admin@saintsgarage.gh",
    ip: "197.24.56.10",
    status: "Success",
    timestamp: "2025-01-15 14:10:07",
  },
  {
    id: "l6",
    action: "Auction Started",
    user: "system",
    ip: "127.0.0.1",
    status: "Success",
    timestamp: "2025-01-15 14:00:00",
  },
  {
    id: "l7",
    action: "Payment Received",
    user: "system",
    ip: "127.0.0.1",
    status: "Success",
    timestamp: "2025-01-15 13:58:45",
  },
  {
    id: "l8",
    action: "User Registration",
    user: "ama.ofori@email.com",
    ip: "102.45.67.89",
    status: "Success",
    timestamp: "2025-01-15 13:45:22",
  },
];

export const Route = createFileRoute("/admin/logs")({ component: AdminLogs });

function AdminLogs() {
  const getStatusBadge = (status: string) => {
    const styles: Record<
      string,
      {
        bg: string;
        text: string;
        border: string;
        icon: React.ComponentType<{ className?: string }>;
      }
    > = {
      Success: {
        bg: "bg-success/10",
        text: "text-success",
        border: "border-success/20",
        icon: CheckCircle,
      },
      Failed: {
        bg: "bg-destructive/10",
        text: "text-destructive",
        border: "border-destructive/20",
        icon: AlertTriangle,
      },
      Warning: {
        bg: "bg-info/10",
        text: "text-info",
        border: "border-info/20",
        icon: AlertTriangle,
      },
    };
    const s = styles[status] || styles.Success;
    return (
      <span
        className={`px-2 py-0.5 ${s.bg} ${s.text} ${s.border} text-[10px] font-mono uppercase tracking-wider border flex items-center gap-1`}
      >
        <s.icon className="w-3 h-3" /> {status}
      </span>
    );
  };

  return (
    <AdminLayout title="Activity Logs">
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">ACTIVITY LOGS</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export Logs
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Logs", value: "24,582", icon: FileText, color: "text-white" },
            { label: "Today", value: "1,245", icon: Clock, color: "text-primary" },
            { label: "Success", value: "23,456", icon: CheckCircle, color: "text-success" },
            { label: "Failed", value: "1,126", icon: Shield, color: "text-destructive" },
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
              placeholder="Search logs..."
              className="h-9 w-64 pl-10 pr-3 bg-admin-bg border border-admin-border text-sm"
            />
          </div>
          <select className="h-9 px-3 bg-admin-bg border border-admin-border text-sm">
            <option>Action: All</option>
            <option>User Login</option>
            <option>Vehicle Created</option>
            <option>Settings Updated</option>
          </select>
          <select className="h-9 px-3 bg-admin-bg border border-admin-border text-sm">
            <option>Status: All</option>
            <option>Success</option>
            <option>Failed</option>
            <option>Warning</option>
          </select>
          <select className="h-9 px-3 bg-admin-bg border border-admin-border text-sm">
            <option>Date Range: All Time</option>
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
          <button className="h-9 px-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" /> Apply
          </button>
          <button className="h-9 px-3 text-muted-foreground hover:text-foreground text-xs flex items-center gap-2">
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        </div>

        {/* Logs Table */}
        <div className="bg-admin-surface border border-admin-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-b border-admin-border">
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">IP Address</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {LOG_ENTRIES.map((log) => (
                <tr key={log.id} className="border-b border-admin-border/60 hover:bg-admin-bg/60">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {log.timestamp}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-display tracking-wide">{log.action}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{log.user}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{log.ip}</td>
                  <td className="px-4 py-3">{getStatusBadge(log.status)}</td>
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

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground font-mono">
            Showing 1-8 of 24,582 entries
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 border border-admin-border text-xs font-mono">
              Previous
            </button>
            <button className="h-8 w-8 bg-primary text-primary-foreground text-xs font-mono">
              1
            </button>
            <button className="h-8 w-8 border border-admin-border text-xs font-mono">2</button>
            <button className="h-8 w-8 border border-admin-border text-xs font-mono">3</button>
            <span className="text-muted-foreground">...</span>
            <button className="h-8 w-8 border border-admin-border text-xs font-mono">3073</button>
            <button className="h-8 px-3 border border-admin-border text-xs font-mono">Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
