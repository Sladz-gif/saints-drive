import { createFileRoute } from "@tanstack/react-router";
import {
  Home,
  Save,
  Eye,
  Plus,
  Trash2,
  LayoutGrid,
  Image as ImageIcon,
  Type,
  Link as LinkIcon,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/admin/homepage")({ component: AdminHomepage });

function AdminHomepage() {
  return (
    <AdminLayout title="Homepage Editor">
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">HOMEPAGE EDITOR</div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-admin-surface border border-admin-border">
          <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
            <div className="font-display tracking-wider text-base">HERO SECTION</div>
            <button className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Collapse
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="overline text-[10px] opacity-50 block mb-2">HEADLINE</label>
                <input
                  defaultValue="DRIVE EXCELLENCE."
                  className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm"
                />
              </div>
              <div>
                <label className="overline text-[10px] opacity-50 block mb-2">SUBHEADLINE</label>
                <input
                  defaultValue="Buy. Rent. Auction. Explore — all in one place."
                  className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm"
                />
              </div>
            </div>
            <div>
              <label className="overline text-[10px] opacity-50 block mb-2">HERO VIDEO URL</label>
              <input
                defaultValue="https://cdn.pixabay.com/video/2023/10/22/186082-877287756_large.mp4"
                className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm font-mono"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="overline text-[10px] opacity-50 block mb-2">CTA 1 TEXT</label>
                <input
                  defaultValue="Buy Cars"
                  className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm"
                />
              </div>
              <div>
                <label className="overline text-[10px] opacity-50 block mb-2">CTA 1 LINK</label>
                <input
                  defaultValue="/buy"
                  className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm font-mono"
                />
              </div>
              <div>
                <label className="overline text-[10px] opacity-50 block mb-2">CTA 1 STYLE</label>
                <select className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm">
                  <option>Primary</option>
                  <option>Secondary</option>
                  <option>Ghost</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Vehicles */}
        <div className="bg-admin-surface border border-admin-border">
          <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
            <div className="font-display tracking-wider text-base">FEATURED VEHICLES</div>
            <button className="text-xs font-mono uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Plus className="w-3 h-3" /> Add Vehicle
            </button>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-admin-bg border border-admin-border p-3 relative group">
                  <button className="absolute top-2 right-2 h-6 w-6 bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <div className="aspect-video bg-admin-surface mb-2 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <input
                    defaultValue="Featured Vehicle {i}"
                    className="w-full h-8 px-2 bg-admin-bg border border-admin-border text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-admin-surface border border-admin-border">
          <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
            <div className="font-display tracking-wider text-base">STATS BAR</div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Active Listings", value: "2,840" },
                { label: "Happy Customers", value: "12,000+" },
                { label: "Cities Covered", value: "8" },
                { label: "Years Experience", value: "15+" },
              ].map((stat, i) => (
                <div key={i} className="bg-admin-bg border border-admin-border p-3">
                  <label className="overline text-[10px] opacity-50 block mb-2">LABEL</label>
                  <input
                    defaultValue={stat.label}
                    className="w-full h-8 px-2 bg-admin-surface border border-admin-border text-xs mb-2"
                  />
                  <label className="overline text-[10px] opacity-50 block mb-2">VALUE</label>
                  <input
                    defaultValue={stat.value}
                    className="w-full h-8 px-2 bg-admin-surface border border-admin-border text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Carousel */}
        <div className="bg-admin-surface border border-admin-border">
          <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
            <div className="font-display tracking-wider text-base">BRAND CAROUSEL</div>
            <button className="text-xs font-mono uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Plus className="w-3 h-3" /> Add Brand
            </button>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-3">
              {[
                "BMW",
                "Mercedes-Benz",
                "Toyota",
                "Lexus",
                "Honda",
                "Audi",
                "Porsche",
                "Land Rover",
              ].map((brand, i) => (
                <div
                  key={i}
                  className="bg-admin-bg border border-admin-border px-4 py-2 flex items-center gap-2 group"
                >
                  <span className="text-sm">{brand}</span>
                  <button className="h-5 w-5 text-destructive opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-admin-surface border border-admin-border">
          <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
            <div className="font-display tracking-wider text-base">QUICK LINKS</div>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: "Sell Your Car", link: "/sell" },
              { label: "Rent a Car", link: "/rent" },
              { label: "Live Auctions", link: "/auctions" },
              { label: "Fleet Management", link: "/fleet" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  defaultValue={item.label}
                  className="flex-1 h-9 px-3 bg-admin-bg border border-admin-border text-sm"
                />
                <LinkIcon className="w-4 h-4 text-muted-foreground" />
                <input
                  defaultValue={item.link}
                  className="w-48 h-9 px-3 bg-admin-bg border border-admin-border text-sm font-mono"
                />
                <button className="h-9 w-9 text-destructive hover:bg-destructive/10 flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button className="h-9 px-4 border border-dashed border-admin-border text-muted-foreground text-xs font-mono uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-3 h-3" /> Add Link
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
