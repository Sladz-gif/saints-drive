import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Car,
  Calendar,
  Gavel,
  FileText,
  Tag,
  Target,
  BookOpen,
  Gamepad2,
  ShoppingCart,
  DollarSign,
  Truck,
  Users,
  Store,
  Megaphone,
  Image as ImageIcon,
  MapPin,
  Home,
  Mail,
  Bell,
  BarChart3,
  Settings,
  UserCog,
  ScrollText,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const GROUPS = [
  {
    label: "Overview",
    items: [{ to: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/vehicles", label: "Vehicles", Icon: Car },
      { to: "/admin/rentals", label: "Rentals", Icon: Calendar },
      { to: "/admin/auctions", label: "Auctions", Icon: Gavel },
      { to: "/admin/blog", label: "Blog", Icon: FileText },
      { to: "/admin/brands", label: "Brands", Icon: Tag },
      { to: "/admin/purpose", label: "Purpose Pages", Icon: Target },
      { to: "/admin/history", label: "History Vault", Icon: BookOpen },
      { to: "/admin/games", label: "Games", Icon: Gamepad2 },
    ],
  },
  {
    label: "Commerce",
    items: [
      { to: "/admin/orders", label: "Orders", Icon: ShoppingCart },
      { to: "/admin/revenue", label: "Revenue", Icon: DollarSign },
      { to: "/admin/fleet", label: "Fleet", Icon: Truck },
    ],
  },
  { label: "Users", items: [{ to: "/admin/users", label: "Users", Icon: Users }] },
  {
    label: "Advertising",
    items: [
      { to: "/admin/ads", label: "Ads Manager", Icon: Megaphone },
      { to: "/admin/banners", label: "Banners", Icon: ImageIcon },
      { to: "/admin/companies", label: "Companies", Icon: Store },
      { to: "/admin/placements", label: "Placements", Icon: MapPin },
    ],
  },
  {
    label: "Platform",
    items: [
      { to: "/admin/homepage", label: "Homepage", Icon: Home },
      { to: "/admin/newsletter", label: "Newsletter", Icon: Mail },
      { to: "/admin/notifications", label: "Notifications", Icon: Bell },
      { to: "/admin/analytics", label: "Analytics", Icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/admin/settings", label: "Settings", Icon: Settings },
      { to: "/admin/admin-users", label: "Admin Users", Icon: UserCog },
      { to: "/admin/logs", label: "Activity Logs", Icon: ScrollText },
    ],
  },
];

export function AdminLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div
      className="min-h-screen flex bg-admin-bg text-foreground"
      style={{ fontFamily: "'Barlow Condensed', 'DM Sans', sans-serif" }}
    >
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-16" : "w-60"} shrink-0 bg-admin-surface border-r border-admin-border flex flex-col transition-all duration-200`}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-admin-border">
          {!collapsed && (
            <Link to="/admin" className="font-display text-lg tracking-wider">
              SAINTS · ADMIN
            </Link>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="h-7 w-7 inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {GROUPS.map((g) => (
            <div key={g.label} className="mb-4">
              {!collapsed && (
                <div className="px-4 mb-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {g.label}
                </div>
              )}
              {g.items.map((it) => {
                const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
                return (
                  <Link
                    key={it.to}
                    to={it.to}
                    className={`flex items-center gap-3 px-4 h-9 text-sm transition-colors ${active ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-foreground/75 hover:text-foreground hover:bg-admin-bg"}`}
                  >
                    <it.Icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span className="truncate">{it.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 border-b border-admin-border bg-admin-surface flex items-center justify-between px-6">
          <h1 className="font-display text-xl tracking-wider">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search... ⌘K"
                className="h-9 w-64 pl-10 pr-3 bg-admin-bg border border-admin-border text-sm"
              />
            </div>
            <button className="h-9 w-9 inline-flex items-center justify-center hover:bg-admin-bg border border-admin-border">
              <Bell className="w-4 h-4" />
            </button>
            <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center text-xs font-mono">
              SA
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto bg-admin-bg">{children}</main>
      </div>
    </div>
  );
}

export function AdminPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <AdminLayout title={title}>
      <div className="bg-admin-surface border border-admin-border p-12">
        <div className="overline">{title}</div>
        <h2 className="font-display text-4xl tracking-wider mt-2">{title.toUpperCase()}</h2>
        <p className="text-muted-foreground mt-3 max-w-xl">{description}</p>
        <div className="mt-6 flex gap-3">
          <button className="h-10 px-5 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs">
            + New
          </button>
          <button className="h-10 px-5 border border-admin-border font-mono uppercase tracking-wider text-xs">
            Export
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export function AdminTable({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div
      className="bg-admin-surface border border-admin-border"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
        <div
          className="font-display tracking-wider text-base"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {title}
        </div>
        <button className="text-xs font-mono uppercase tracking-wider text-primary">+ New</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-b border-admin-border">
            <th className="px-5 py-3 w-8">
              <input type="checkbox" className="accent-primary" />
            </th>
            {columns.map((c) => (
              <th key={c} className="px-5 py-3">
                {c}
              </th>
            ))}
            <th className="px-5 py-3 w-12"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-admin-border/60 hover:bg-admin-bg/60">
              <td className="px-5 py-3">
                <input type="checkbox" className="accent-primary" />
              </td>
              {r.map((cell, j) => (
                <td key={j} className="px-5 py-3">
                  {cell}
                </td>
              ))}
              <td className="px-5 py-3 text-right text-muted-foreground cursor-pointer">⋮</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminLayoutRoute() {
  // Used when route uses Outlet (not needed since each admin route renders AdminLayout)
  return <Outlet />;
}
