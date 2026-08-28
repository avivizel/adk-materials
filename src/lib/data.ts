import rawData from "@/data/addiction-services.json";
import { addictionServicesArraySchema } from "./validation";
import type { AddictionService } from "@/types/addiction";

let cachedServices: AddictionService[] | null = null;

export function getServices(): AddictionService[] {
  if (!cachedServices) {
    const parsed = addictionServicesArraySchema.parse(rawData);
    cachedServices = parsed as AddictionService[];
  }
  return cachedServices;
}

export function getServiceById(id: string): AddictionService | undefined {
  return getServices().find((s) => s.id === id);
}

export function getServiceStats() {
  const services = getServices();
  const publicCount = services.filter((s) => s.institutionType === "public").length;
  const supervisedCount = services.filter(
    (s) => s.institutionType === "supervised_nonprofit" || s.institutionType === "supervised_private"
  ).length;
  const regions = new Set(services.map((s) => s.region));
  return {
    total: services.length,
    public: publicCount,
    supervised: supervisedCount,
    regions: regions.size,
  };
}
