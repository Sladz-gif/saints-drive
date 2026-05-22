import Fuse from "fuse.js";
import type { Vehicle } from "@/data/mock-data";

const fuseOptions = {
  keys: [
    { name: "title", weight: 2 },
    { name: "brand", weight: 1.5 },
    { name: "model", weight: 1.5 },
    { name: "location", weight: 1 },
    { name: "body", weight: 0.8 },
    { name: "fuel", weight: 0.5 },
  ],
  threshold: 0.3,
  includeScore: true,
  ignoreLocation: true,
};

let fuseInstance: Fuse<Vehicle> | null = null;

export function initializeSearch(vehicles: Vehicle[]) {
  fuseInstance = new Fuse(vehicles, fuseOptions);
}

export function searchVehicles(query: string, vehicles: Vehicle[]): Vehicle[] {
  if (!query.trim()) {
    return vehicles;
  }

  // Re-initialize if needed
  if (!fuseInstance) {
    initializeSearch(vehicles);
  }

  const results = fuseInstance?.search(query) || [];
  return results.map((result) => result.item);
}

export function searchVehiclesByFilters(
  vehicles: Vehicle[],
  filters: {
    brand?: string;
    body?: string;
    fuel?: string;
    priceRange?: [number, number];
    location?: string;
  },
): Vehicle[] {
  let filtered = [...vehicles];

  if (filters.brand) {
    filtered = filtered.filter((v) => v.brand === filters.brand);
  }

  if (filters.body) {
    filtered = filtered.filter((v) => v.body === filters.body);
  }

  if (filters.fuel) {
    filtered = filtered.filter((v) => v.fuel === filters.fuel);
  }

  if (filters.priceRange) {
    filtered = filtered.filter(
      (v) => v.price >= filters.priceRange![0] && v.price <= filters.priceRange![1],
    );
  }

  if (filters.location) {
    filtered = filtered.filter((v) =>
      v.location.toLowerCase().includes(filters.location!.toLowerCase()),
    );
  }

  return filtered;
}
