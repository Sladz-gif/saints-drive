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
  FileText,
  Calendar,
  Clock,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

const BLOG_POSTS = [
  {
    id: "b1",
    title: "Top 10 Luxury Cars in Ghana 2025",
    author: "Kofi Mensah",
    category: "Reviews",
    status: "Published",
    date: "Jan 15, 2025",
    views: 1248,
  },
  {
    id: "b2",
    title: "How to Maintain Your Mercedes-Benz",
    author: "Ama Ofori",
    category: "Maintenance",
    status: "Published",
    date: "Jan 12, 2025",
    views: 856,
  },
  {
    id: "b3",
    title: "Electric Vehicles: The Future of Ghana",
    author: "Nana Kwesi",
    category: "Industry",
    status: "Draft",
    date: "Jan 10, 2025",
    views: 0,
  },
  {
    id: "b4",
    title: "Auction Tips for First-Time Buyers",
    author: "Emmanuel Addo",
    category: "Guides",
    status: "Published",
    date: "Jan 8, 2025",
    views: 2341,
  },
  {
    id: "b5",
    title: "Best Family Cars Under GHS 100k",
    author: "Kofi Mensah",
    category: "Reviews",
    status: "Scheduled",
    date: "Jan 20, 2025",
    views: 0,
  },
];

export const Route = createFileRoute("/admin/blog")({ component: AdminBlog });

function AdminBlog() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPosts = BLOG_POSTS.filter((p) => {
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
    if (selectedIds.size === filteredPosts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredPosts.map((p) => p.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; border: string }> = {
      Published: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
      Draft: { bg: "bg-muted/10", text: "text-muted-foreground", border: "border-muted/20" },
      Scheduled: { bg: "bg-info/10", text: "text-info", border: "border-info/20" },
      Archived: {
        bg: "bg-destructive/10",
        text: "text-destructive",
        border: "border-destructive/20",
      },
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
    <AdminLayout title="Blog">
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">BLOG MANAGER</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" /> New Post
            </button>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Posts", value: "156", icon: FileText, color: "text-white" },
            { label: "Published", value: "124", icon: Eye, color: "text-success" },
            { label: "Drafts", value: "18", icon: Clock, color: "text-muted-foreground" },
            { label: "Total Views", value: "48.2K", icon: Calendar, color: "text-primary" },
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
              placeholder="Search posts..."
              className="h-9 w-64 pl-10 pr-3 bg-admin-bg border border-admin-border text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 bg-admin-bg border border-admin-border text-sm"
          >
            <option>Status: All</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Scheduled</option>
            <option>Archived</option>
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
              <button className="h-8 px-3 bg-success text-success-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
                Publish
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
                    checked={selectedIds.size === filteredPosts.length && filteredPosts.length > 0}
                    onChange={toggleSelectAll}
                    className="accent-primary"
                  />
                </th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((p) => (
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
                    <div className="font-display tracking-wide">{p.title}</div>
                  </td>
                  <td className="px-4 py-3">{p.author}</td>
                  <td className="px-4 py-3 font-mono text-xs">{p.category}</td>
                  <td className="px-4 py-3">{getStatusBadge(p.status)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.date}</td>
                  <td className="px-4 py-3 font-mono text-xs">{p.views.toLocaleString()}</td>
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
