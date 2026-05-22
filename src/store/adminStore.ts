import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminStats {
  totalListings: number;
  activeRentals: number;
  totalRevenue: number;
  pendingOrders: number;
  activeAuctions: number;
}

interface AdminActivity {
  id: string;
  time: string;
  action: string;
  details: string;
  status: "success" | "warning" | "error";
}

interface AdminState {
  stats: AdminStats;
  activities: AdminActivity[];
  maintenanceMode: boolean;

  updateStats: (stats: Partial<AdminStats>) => void;
  addActivity: (activity: Omit<AdminActivity, "id">) => void;
  toggleMaintenanceMode: () => void;
  clearActivities: () => void;
}

const DEFAULT_STATS: AdminStats = {
  totalListings: 2840,
  activeRentals: 186,
  totalRevenue: 1245000,
  pendingOrders: 23,
  activeAuctions: 12,
};

const DEFAULT_ACTIVITIES: AdminActivity[] = [
  { id: "a1", time: "2m", action: "New listing", details: "Toyota Vitz 2018", status: "success" },
  { id: "a2", time: "8m", action: "Bid placed", details: "G63 AMG - GHS 1.85M", status: "success" },
  {
    id: "a3",
    time: "14m",
    action: "Rental booked",
    details: "Lexus RX - 3 days",
    status: "success",
  },
  { id: "a4", time: "32m", action: "User registered", details: "Kojo Mensah", status: "success" },
  { id: "a5", time: "1h", action: "Listing sold", details: "BMW M340i - Accra", status: "success" },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      stats: DEFAULT_STATS,
      activities: DEFAULT_ACTIVITIES,
      maintenanceMode: false,

      updateStats: (newStats) => {
        set((state) => ({
          stats: { ...state.stats, ...newStats },
        }));
      },

      addActivity: (activity) => {
        set((state) => ({
          activities: [
            {
              ...activity,
              id: `act-${Date.now()}-${Math.random()}`,
            },
            ...state.activities.slice(0, 19), // Keep last 20 activities
          ],
        }));
      },

      toggleMaintenanceMode: () => {
        set((state) => ({ maintenanceMode: !state.maintenanceMode }));
      },

      clearActivities: () => {
        set({ activities: [] });
      },
    }),
    {
      name: "saints-admin-storage",
    },
  ),
);
