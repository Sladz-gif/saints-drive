import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Vehicle } from "@/data/mock-data";
import { VEHICLES } from "@/data/mock-data";

interface VehicleState {
  vehicles: Vehicle[];
  savedVehicleIds: Set<string>;
  searchQuery: string;
  filters: {
    brand?: string;
    body?: string;
    fuel?: string;
    priceRange?: [number, number];
    location?: string;
  };

  setVehicles: (vehicles: Vehicle[]) => void;
  toggleSaved: (vehicleId: string) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<VehicleState["filters"]>) => void;
  clearFilters: () => void;
  getFilteredVehicles: () => Vehicle[];
}

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set, get) => ({
      vehicles: VEHICLES,
      savedVehicleIds: new Set(),
      searchQuery: "",
      filters: {},

      setVehicles: (vehicles) => set({ vehicles }),

      toggleSaved: (vehicleId) => {
        set((state) => {
          const newSaved = new Set(state.savedVehicleIds);
          if (newSaved.has(vehicleId)) {
            newSaved.delete(vehicleId);
          } else {
            newSaved.add(vehicleId);
          }
          return { savedVehicleIds: newSaved };
        });
      },

      setSearchQuery: (query) => set({ searchQuery: query }),

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      clearFilters: () => set({ filters: {}, searchQuery: "" }),

      getFilteredVehicles: () => {
        const state = get();
        let filtered = [...state.vehicles];

        // Apply search query
        if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase();
          filtered = filtered.filter(
            (v) =>
              v.title.toLowerCase().includes(query) ||
              v.brand.toLowerCase().includes(query) ||
              v.model.toLowerCase().includes(query) ||
              v.location.toLowerCase().includes(query),
          );
        }

        // Apply filters
        if (state.filters.brand) {
          filtered = filtered.filter((v) => v.brand === state.filters.brand);
        }
        if (state.filters.body) {
          filtered = filtered.filter((v) => v.body === state.filters.body);
        }
        if (state.filters.fuel) {
          filtered = filtered.filter((v) => v.fuel === state.filters.fuel);
        }
        if (state.filters.priceRange) {
          filtered = filtered.filter(
            (v) =>
              v.price >= state.filters.priceRange![0] && v.price <= state.filters.priceRange![1],
          );
        }
        if (state.filters.location) {
          filtered = filtered.filter((v) =>
            v.location.toLowerCase().includes(state.filters.location!.toLowerCase()),
          );
        }

        return filtered;
      },
    }),
    {
      name: "saints-vehicle-storage",
      partialize: (state) => ({
        savedVehicleIds: Array.from(state.savedVehicleIds),
        searchQuery: state.searchQuery,
        filters: state.filters,
      }),
    },
  ),
);
