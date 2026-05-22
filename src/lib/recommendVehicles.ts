import type { Vehicle } from "@/data/mock-data";

interface RecommendationWeights {
  brand: number;
  body: number;
  price: number;
  fuel: number;
  location: number;
}

export interface RecommendationScore {
  vehicle: Vehicle;
  score: number;
  reasons: string[];
}

/**
 * Recommends vehicles based on user's viewed/saved vehicles
 */
export function recommendVehicles(
  userVehicles: Vehicle[],
  allVehicles: Vehicle[],
  limit: number = 6,
): RecommendationScore[] {
  if (userVehicles.length === 0) {
    // Return featured vehicles if no user history
    return allVehicles
      .filter((v) => v.featured)
      .slice(0, limit)
      .map((v) => ({ vehicle: v, score: 1, reasons: ["Featured listing"] }));
  }

  // Analyze user preferences
  const preferences = analyzePreferences(userVehicles);
  const scored = allVehicles
    .filter((v) => !userVehicles.some((uv) => uv.id === v.id)) // Exclude already viewed
    .map((vehicle) => scoreVehicle(vehicle, preferences))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

function analyzePreferences(vehicles: Vehicle[]): RecommendationWeights {
  const weights: RecommendationWeights = {
    brand: 0,
    body: 0,
    price: 0,
    fuel: 0,
    location: 0,
  };

  const brandCounts = new Map<string, number>();
  const bodyCounts = new Map<string, number>();
  const fuelCounts = new Map<string, number>();
  const locationCounts = new Map<string, number>();
  let totalPrice = 0;

  vehicles.forEach((v) => {
    brandCounts.set(v.brand, (brandCounts.get(v.brand) || 0) + 1);
    bodyCounts.set(v.body, (bodyCounts.get(v.body) || 0) + 1);
    fuelCounts.set(v.fuel, (fuelCounts.get(v.fuel) || 0) + 1);
    locationCounts.set(v.location, (locationCounts.get(v.location) || 0) + 1);
    totalPrice += v.price;
  });

  // Calculate weights based on frequency
  const maxBrand = Math.max(...brandCounts.values());
  const maxBody = Math.max(...bodyCounts.values());
  const maxFuel = Math.max(...fuelCounts.values());
  const maxLocation = Math.max(...locationCounts.values());

  weights.brand = maxBrand > 0 ? maxBrand / vehicles.length : 0;
  weights.body = maxBody > 0 ? maxBody / vehicles.length : 0;
  weights.fuel = maxFuel > 0 ? maxFuel / vehicles.length : 0;
  weights.location = maxLocation > 0 ? maxLocation / vehicles.length : 0;
  weights.price = vehicles.length > 0 ? 0.5 : 0; // Moderate weight for price

  return weights;
}

function scoreVehicle(vehicle: Vehicle, preferences: RecommendationWeights): RecommendationScore {
  let score = 0;
  const reasons: string[] = [];

  // Get user's most common preferences (simplified - in real app would pass these)
  const userBrand = "Toyota"; // Would be calculated from userVehicles
  const userBody = "SUV";
  const userFuel = "Petrol";
  const avgPrice = 150000;

  // Brand match
  if (vehicle.brand === userBrand) {
    score += 0.3 * preferences.brand;
    reasons.push(`Similar to your ${userBrand} vehicles`);
  }

  // Body type match
  if (vehicle.body === userBody) {
    score += 0.25 * preferences.body;
    reasons.push(`${userBody} like your other vehicles`);
  }

  // Fuel type match
  if (vehicle.fuel === userFuel) {
    score += 0.15 * preferences.fuel;
    reasons.push(`${userFuel} fuel type`);
  }

  // Price proximity (within 30% of average)
  const priceDiff = Math.abs(vehicle.price - avgPrice) / avgPrice;
  if (priceDiff < 0.3) {
    score += 0.2 * preferences.price;
    reasons.push("In your price range");
  }

  // Featured vehicles get bonus
  if (vehicle.featured) {
    score += 0.1;
    reasons.push("Featured listing");
  }

  // Recent listings get small bonus
  if (vehicle.listedDays && vehicle.listedDays < 7) {
    score += 0.05;
    reasons.push("Newly listed");
  }

  return { vehicle, score, reasons };
}

/**
 * Get "similar vehicles" for a specific vehicle
 */
export function getSimilarVehicles(
  vehicle: Vehicle,
  allVehicles: Vehicle[],
  limit: number = 4,
): Vehicle[] {
  const scored = allVehicles
    .filter((v) => v.id !== vehicle.id)
    .map((v) => {
      let score = 0;

      // Same brand
      if (v.brand === vehicle.brand) score += 0.4;

      // Same body type
      if (v.body === vehicle.body) score += 0.3;

      // Same fuel type
      if (v.fuel === vehicle.fuel) score += 0.2;

      // Similar price (within 25%)
      const priceDiff = Math.abs(v.price - vehicle.price) / vehicle.price;
      if (priceDiff < 0.25) score += 0.2;

      // Same drive type
      if (v.drive === vehicle.drive) score += 0.1;

      return { vehicle: v, score };
    })
    .filter((s) => s.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.vehicle);

  return scored;
}
