import type { FilterState, AddictionService, SortOption } from "@/types/addiction";

export function applyFilters(
  services: AddictionService[],
  filters: FilterState
): AddictionService[] {
  return services.filter((service) => {
    if (filters.publicOnly && service.institutionType !== "public") {
      return false;
    }

    if (!filters.includeSupervised && service.institutionType !== "public") {
      return false;
    }

    if (
      filters.institutionType !== "all" &&
      service.institutionType !== filters.institutionType
    ) {
      return false;
    }

    if (
      filters.operatorType !== "all" &&
      service.operatorType !== filters.operatorType
    ) {
      return false;
    }

    if (filters.region !== "all" && service.region !== filters.region && service.region !== "national") {
      return false;
    }

    if (filters.addictions.length > 0) {
      const hasAddiction = filters.addictions.some((a) =>
        service.addictions.includes(a)
      );
      if (!hasAddiction) return false;
    }

    if (filters.services.length > 0) {
      const hasService = filters.services.some((s) =>
        service.services.includes(s)
      );
      if (!hasService) return false;
    }

    if (filters.population.length > 0) {
      const pops = service.population ?? [];
      const hasPop = filters.population.some((p) => pops.includes(p));
      if (!hasPop) return false;
    }

    return true;
  });
}

export function sortServices(
  services: AddictionService[],
  sort: SortOption,
  userLat?: number,
  userLng?: number
): AddictionService[] {
  const sorted = [...services];

  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "he"));
    case "city":
      return sorted.sort((a, b) => a.city.localeCompare(b.city, "he"));
    case "region":
      return sorted.sort((a, b) => a.region.localeCompare(b.region));
    case "public_first":
      return sorted.sort((a, b) => {
        if (a.institutionType === "public" && b.institutionType !== "public") return -1;
        if (a.institutionType !== "public" && b.institutionType === "public") return 1;
        return a.name.localeCompare(b.name, "he");
      });
    case "distance":
      if (userLat !== undefined && userLng !== undefined) {
        return sorted.sort((a, b) => {
          const distA = getDistance(userLat, userLng, a.latitude, a.longitude);
          const distB = getDistance(userLat, userLng, b.latitude, b.longitude);
          return distA - distB;
        });
      }
      return sorted;
    case "relevance":
    default:
      return sorted;
  }
}

function getDistance(
  lat: number,
  lng: number,
  serviceLat?: number,
  serviceLng?: number
): number {
  if (serviceLat === undefined || serviceLng === undefined) return Infinity;
  const R = 6371;
  const dLat = ((serviceLat - lat) * Math.PI) / 180;
  const dLng = ((serviceLng - lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat * Math.PI) / 180) *
      Math.cos((serviceLat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.institutionType !== "all") count++;
  if (filters.operatorType !== "all") count++;
  if (filters.region !== "all") count++;
  if (filters.addictions.length > 0) count++;
  if (filters.services.length > 0) count++;
  if (filters.population.length > 0) count++;
  if (filters.publicOnly) count++;
  if (!filters.includeSupervised) count++;
  return count;
}

export function clearOneFilter(filters: FilterState): FilterState {
  if (filters.addictions.length > 0) {
    return { ...filters, addictions: filters.addictions.slice(0, -1) };
  }
  if (filters.services.length > 0) {
    return { ...filters, services: filters.services.slice(0, -1) };
  }
  if (filters.population.length > 0) {
    return { ...filters, population: filters.population.slice(0, -1) };
  }
  if (filters.region !== "all") {
    return { ...filters, region: "all" };
  }
  if (filters.institutionType !== "all") {
    return { ...filters, institutionType: "all" };
  }
  if (filters.operatorType !== "all") {
    return { ...filters, operatorType: "all" };
  }
  if (filters.publicOnly) {
    return { ...filters, publicOnly: false };
  }
  if (!filters.includeSupervised) {
    return { ...filters, includeSupervised: true };
  }
  return filters;
}
