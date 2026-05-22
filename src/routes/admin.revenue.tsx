import { createFileRoute } from "@tanstack/react-router";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  Calendar,
  Filter,
  MoreVertical,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { formatGHS } from "@/data/mock-data";

export const Route = createFileRoute("/admin/revenue")({ component: AdminRevenue });

function AdminRevenue() {
  return (
    <AdminLayout title="Revenue & Payments">
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="font-display text-2xl tracking-wider">REVENUE & PAYMENTS</div>
          <div className="flex items-center gap-2">
            <select className="h-9 px-3 bg-admin-surface border border-admin-border text-sm font-mono">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last Quarter</option>
              <option>This Year</option>
            </select>
            <button className="h-9 px-4 border border-admin-border font-mono uppercase tracking-wider text-xs flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Revenue",
              value: formatGHS(482500),
              change: "+15.2%",
              icon: DollarSign,
              color: "text-white",
            },
            {
              label: "Sales Revenue",
              value: formatGHS(324800),
              change: "+12.8%",
              icon: TrendingUp,
              color: "text-success",
            },
            {
              label: "Rental Revenue",
              value: formatGHS(124200),
              change: "+18.5%",
              icon: CreditCard,
              color: "text-primary",
            },
            {
              label: "Auction Revenue",
              value: formatGHS(33500),
              change: "+8.3%",
              icon: Calendar,
              color: "text-info",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-admin-surface border border-admin-border p-5 relative overflow-hidden group"
            >
              <s.icon className="absolute top-0 right-0 p-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="relative z-10">
                <div className="overline text-[10px] opacity-50">{s.label}</div>
                <div className={`font-display text-3xl mt-1 ${s.color}`}>{s.value}</div>
                <div
                  className={`text-xs font-mono mt-2 ${s.change.startsWith("+") ? "text-success" : "text-destructive"}`}
                >
                  {s.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-admin-surface border border-admin-border">
            <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
              <div className="font-display tracking-wider text-base">REVENUE BREAKDOWN</div>
              <button className="text-xs font-mono uppercase tracking-wider text-primary">
                View Details
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                {
                  source: "Vehicle Sales",
                  value: formatGHS(324800),
                  percentage: 67,
                  color: "bg-primary",
                },
                {
                  source: "Car Rentals",
                  value: formatGHS(124200),
                  percentage: 26,
                  color: "bg-success",
                },
                {
                  source: "Auction Fees",
                  value: formatGHS(33500),
                  percentage: 7,
                  color: "bg-info",
                },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-display tracking-wide">{item.source}</span>
                    <span className="font-mono">
                      {item.value} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-admin-bg rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-admin-surface border border-admin-border">
            <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
              <div className="font-display tracking-wider text-base">PAYMENT METHODS</div>
              <button className="text-xs font-mono uppercase tracking-wider text-primary">
                View Details
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                {
                  method: "Mobile Money (MTN)",
                  value: formatGHS(193000),
                  percentage: 40,
                  color: "bg-primary",
                },
                {
                  method: "Mobile Money (Vodafone)",
                  value: formatGHS(96250),
                  percentage: 20,
                  color: "bg-success",
                },
                {
                  method: "Bank Transfer",
                  value: formatGHS(144375),
                  percentage: 30,
                  color: "bg-info",
                },
                {
                  method: "Card Payments",
                  value: formatGHS(48875),
                  percentage: 10,
                  color: "text-muted-foreground",
                },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-display tracking-wide">{item.method}</span>
                    <span className="font-mono">
                      {item.value} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-admin-bg rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-admin-surface border border-admin-border">
          <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
            <div className="font-display tracking-wider text-base">RECENT TRANSACTIONS</div>
            <button className="text-xs font-mono uppercase tracking-wider text-primary">
              View All
            </button>
          </div>
          <div className="p-5 space-y-3">
            {[
              {
                id: "TXN-001",
                type: "Sale",
                amount: formatGHS(85000),
                customer: "Kofi Mensah",
                status: "Completed",
                date: "Jan 15, 2025",
              },
              {
                id: "TXN-002",
                type: "Rental",
                amount: formatGHS(2400),
                customer: "Ama Ofori",
                status: "Completed",
                date: "Jan 15, 2025",
              },
              {
                id: "TXN-003",
                type: "Auction",
                amount: formatGHS(12500),
                customer: "Nana Kwesi",
                status: "Pending",
                date: "Jan 14, 2025",
              },
              {
                id: "TXN-004",
                type: "Sale",
                amount: formatGHS(62000),
                customer: "Emmanuel Addo",
                status: "Completed",
                date: "Jan 14, 2025",
              },
              {
                id: "TXN-005",
                type: "Rental",
                amount: formatGHS(1800),
                customer: "Grace Boateng",
                status: "Failed",
                date: "Jan 13, 2025",
              },
            ].map((txn, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-admin-bg border border-admin-border"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded bg-admin-surface border border-admin-border flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-display tracking-wide">{txn.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {txn.type} • {txn.customer}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-mono">{txn.amount}</div>
                    <div className="text-xs text-muted-foreground">{txn.date}</div>
                  </div>
                  {txn.status === "Completed" ? (
                    <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] border border-success/20 font-mono uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Completed
                    </span>
                  ) : txn.status === "Pending" ? (
                    <span className="px-2 py-0.5 bg-info/10 text-info text-[10px] border border-info/20 font-mono uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Pending
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-[10px] border border-destructive/20 font-mono uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Failed
                    </span>
                  )}
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="bg-admin-surface border border-admin-border">
          <div className="px-5 h-12 flex items-center justify-between border-b border-admin-border">
            <div className="font-display tracking-wider text-base">PENDING PAYOUTS</div>
            <button className="text-xs font-mono uppercase tracking-wider text-primary">
              Process All
            </button>
          </div>
          <div className="p-5 space-y-3">
            {[
              {
                source: "Vehicle Sales",
                amount: formatGHS(12450),
                type: "Sales Revenue",
                due: "Jan 20, 2025",
              },
              {
                source: "Rental Fleet",
                amount: formatGHS(8200),
                type: "Rental Revenue",
                due: "Jan 19, 2025",
              },
              {
                source: "Auction Fees",
                amount: formatGHS(15600),
                type: "Commission",
                due: "Jan 18, 2025",
              },
            ].map((payout, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-admin-bg border border-admin-border"
              >
                <div>
                  <div className="font-display tracking-wide">{payout.source}</div>
                  <div className="text-xs text-muted-foreground">
                    {payout.type} • Due: {payout.due}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-mono">{payout.amount}</div>
                  <button className="h-8 px-3 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs">
                    Process
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
