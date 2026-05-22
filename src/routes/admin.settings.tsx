import { createFileRoute } from "@tanstack/react-router";
import { Save, Shield, Bell, Palette, Globe, CreditCard, Users, Database } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

function AdminSettings() {
  return (
    <AdminLayout title="Settings">
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">SETTINGS</div>
          <button className="h-9 px-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>

        {/* Settings Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-2">
            {[
              { icon: Globe, label: "General", active: true },
              { icon: Users, label: "User Management", active: false },
              { icon: Shield, label: "Security", active: false },
              { icon: Bell, label: "Notifications", active: false },
              { icon: Palette, label: "Appearance", active: false },
              { icon: CreditCard, label: "Payment Settings", active: false },
              { icon: Database, label: "System", active: false },
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full h-10 px-4 flex items-center gap-3 text-sm font-mono uppercase tracking-wider ${item.active ? "bg-primary text-primary-foreground" : "bg-admin-surface border border-admin-border text-muted-foreground hover:text-foreground"}`}
              >
                <item.icon className="w-4 h-4" /> {item.label}
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            <div className="bg-admin-surface border border-admin-border">
              <div className="px-5 h-12 flex items-center border-b border-admin-border">
                <div className="font-display tracking-wider text-base">GENERAL SETTINGS</div>
              </div>
              <div className="p-5 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="overline text-[10px] opacity-50 block mb-2">SITE NAME</label>
                    <input
                      defaultValue="Saints Garage"
                      className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="overline text-[10px] opacity-50 block mb-2">SITE URL</label>
                    <input
                      defaultValue="https://saintsgarage.gh"
                      className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="overline text-[10px] opacity-50 block mb-2">
                    SITE DESCRIPTION
                  </label>
                  <textarea
                    defaultValue="Ghana's premier automotive marketplace for buying, renting, and auctioning vehicles."
                    className="w-full h-24 px-3 py-2 bg-admin-bg border border-admin-border text-sm resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="overline text-[10px] opacity-50 block mb-2">
                      CONTACT EMAIL
                    </label>
                    <input
                      defaultValue="info@saintsgarage.gh"
                      className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="overline text-[10px] opacity-50 block mb-2">
                      CONTACT PHONE
                    </label>
                    <input
                      defaultValue="+233 20 123 4567"
                      className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="overline text-[10px] opacity-50 block mb-2">TIMEZONE</label>
                  <select className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm">
                    <option>Africa/Accra (GMT+0)</option>
                    <option>Africa/Lagos (GMT+1)</option>
                    <option>UTC (GMT+0)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-admin-surface border border-admin-border">
              <div className="px-5 h-12 flex items-center border-b border-admin-border">
                <div className="font-display tracking-wider text-base">SOCIAL MEDIA</div>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { label: "Facebook", placeholder: "https://facebook.com/saintsgarage" },
                  { label: "Twitter/X", placeholder: "https://twitter.com/saintsgarage" },
                  { label: "Instagram", placeholder: "https://instagram.com/saintsgarage" },
                  { label: "LinkedIn", placeholder: "https://linkedin.com/company/saintsgarage" },
                ].map((item, i) => (
                  <div key={i}>
                    <label className="overline text-[10px] opacity-50 block mb-2">
                      {item.label}
                    </label>
                    <input
                      placeholder={item.placeholder}
                      className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-admin-surface border border-admin-border">
              <div className="px-5 h-12 flex items-center border-b border-admin-border">
                <div className="font-display tracking-wider text-base">SEO SETTINGS</div>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="overline text-[10px] opacity-50 block mb-2">META TITLE</label>
                  <input
                    defaultValue="Saints Garage - Buy, Rent & Auction Cars in Ghana"
                    className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm"
                  />
                </div>
                <div>
                  <label className="overline text-[10px] opacity-50 block mb-2">
                    META DESCRIPTION
                  </label>
                  <textarea
                    defaultValue="Discover Ghana's best selection of vehicles. Buy, rent, or bid on cars from Ghana's premier automotive platform."
                    className="w-full h-24 px-3 py-2 bg-admin-bg border border-admin-border text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="overline text-[10px] opacity-50 block mb-2">KEYWORDS</label>
                  <input
                    defaultValue="cars ghana, buy cars, rent cars, car auction, vehicle marketplace"
                    className="w-full h-10 px-3 bg-admin-bg border border-admin-border text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Maintenance Mode */}
            <div className="bg-admin-surface border border-admin-border">
              <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
                <div className="font-display tracking-wider text-base">MAINTENANCE MODE</div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                  <span className="text-sm font-mono uppercase tracking-wider">Enable</span>
                </label>
              </div>
              <div className="p-5">
                <label className="overline text-[10px] opacity-50 block mb-2">
                  MAINTENANCE MESSAGE
                </label>
                <textarea
                  defaultValue="We're currently performing scheduled maintenance. Please check back soon."
                  className="w-full h-24 px-3 py-2 bg-admin-bg border border-admin-border text-sm resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
