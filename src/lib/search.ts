import Fuse from "fuse.js";
import type { AddictionService } from "@/types/addiction";
import {
  ADDICTION_LABELS,
  SERVICE_LABELS,
  REGION_LABELS,
  OPERATOR_TYPE_LABELS,
} from "@/types/addiction";

function normalizeHebrew(text: string): string {
  return text
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/['"״׳]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function buildSearchableText(service: AddictionService): string {
  const parts = [
    service.name,
    service.city,
    REGION_LABELS[service.region],
    service.operatorName ?? "",
    OPERATOR_TYPE_LABELS[service.operatorType],
    service.notes ?? "",
    service.address ?? "",
    ...(service.phone ?? []),
    ...(service.population ?? []),
    ...service.addictions.map((a) => ADDICTION_LABELS[a]),
    ...service.services.map((s) => SERVICE_LABELS[s]),
  ];
  return normalizeHebrew(parts.join(" "));
}

let fuseInstance: Fuse<AddictionService> | null = null;
let searchableMap: Map<string, string> | null = null;

function getFuse(services: AddictionService[]): Fuse<AddictionService> {
  if (!fuseInstance) {
    searchableMap = new Map();
    const enriched = services.map((s) => {
      searchableMap!.set(s.id, buildSearchableText(s));
      return s;
    });
    fuseInstance = new Fuse(enriched, {
      keys: [
        { name: "name", weight: 3 },
        { name: "city", weight: 2 },
        { name: "operatorName", weight: 1.5 },
        { name: "notes", weight: 1 },
        { name: "address", weight: 1 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

export function searchServices(
  services: AddictionService[],
  query: string
): AddictionService[] {
  const trimmed = query.trim();
  if (!trimmed) return services;

  const normalized = normalizeHebrew(trimmed);

  const exactNameMatches = services.filter((s) =>
    normalizeHebrew(s.name).includes(normalized)
  );

  const fuse = getFuse(services);
  const fuseResults = fuse.search(trimmed).map((r) => r.item);

  const addictionMatches = services.filter((s) =>
    s.addictions.some((a) => normalizeHebrew(ADDICTION_LABELS[a]).includes(normalized))
  );

  const cityMatches = services.filter((s) =>
    normalizeHebrew(s.city).includes(normalized)
  );

  const seen = new Set<string>();
  const results: AddictionService[] = [];

  for (const s of [...exactNameMatches, ...cityMatches, ...addictionMatches, ...fuseResults]) {
    if (!seen.has(s.id)) {
      seen.add(s.id);
      results.push(s);
    }
  }

  return results;
}

export function resetSearchIndex(): void {
  fuseInstance = null;
  searchableMap = null;
}
