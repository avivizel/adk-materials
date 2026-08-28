import { describe, it, expect, beforeEach } from "vitest";
import { applyFilters, sortServices, clearOneFilter, countActiveFilters } from "@/lib/filters";
import { searchServices, resetSearchIndex } from "@/lib/search";
import { DEFAULT_FILTERS } from "@/types/addiction";
import { getServices } from "@/lib/data";

const services = getServices();

describe("filters", () => {
  it("filters by addiction type", () => {
    const result = applyFilters(services, {
      ...DEFAULT_FILTERS,
      addictions: ["gambling"],
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((s) => {
      expect(s.addictions).toContain("gambling");
    });
  });

  it("filters by region", () => {
    const result = applyFilters(services, {
      ...DEFAULT_FILTERS,
      region: "north",
    });
    result.forEach((s) => {
      expect(s.region === "north" || s.region === "national").toBe(true);
    });
  });

  it("filters public only", () => {
    const result = applyFilters(services, {
      ...DEFAULT_FILTERS,
      publicOnly: true,
    });
    result.forEach((s) => {
      expect(s.institutionType).toBe("public");
    });
  });

  it("excludes supervised when includeSupervised is false", () => {
    const result = applyFilters(services, {
      ...DEFAULT_FILTERS,
      includeSupervised: false,
    });
    result.forEach((s) => {
      expect(s.institutionType).toBe("public");
    });
  });

  it("sorts by name", () => {
    const sorted = sortServices(services, "name");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name, "he")).toBeLessThanOrEqual(0);
    }
  });

  it("sorts public first", () => {
    const sorted = sortServices(services, "public_first");
    const firstPrivate = sorted.findIndex(
      (s) => s.institutionType !== "public"
    );
    const lastPublic = sorted.length - 1 - [...sorted].reverse().findIndex(
      (s) => s.institutionType === "public"
    );
    if (firstPrivate > 0 && lastPublic >= 0) {
      expect(lastPublic).toBeLessThan(firstPrivate);
    }
  });

  it("counts active filters", () => {
    expect(countActiveFilters(DEFAULT_FILTERS)).toBe(0);
    expect(
      countActiveFilters({ ...DEFAULT_FILTERS, addictions: ["gambling"], region: "center" })
    ).toBe(2);
  });

  it("clears one filter at a time", () => {
    const filters = { ...DEFAULT_FILTERS, addictions: ["gambling", "alcohol"], region: "center" };
    const cleared = clearOneFilter(filters);
    expect(cleared.addictions.length).toBeLessThan(filters.addictions.length);
  });
});

describe("search", () => {
  beforeEach(() => {
    resetSearchIndex();
  });

  it("returns all services for empty query", () => {
    expect(searchServices(services, "").length).toBe(services.length);
  });

  it("finds gambling services", () => {
    const result = searchServices(services, "הימורים");
    expect(result.length).toBeGreaterThan(0);
    result.forEach((s) => {
      expect(s.addictions).toContain("gambling");
    });
  });

  it("finds services in Haifa", () => {
    const result = searchServices(services, "חיפה");
    expect(result.length).toBeGreaterThan(0);
    result.forEach((s) => {
      const inHaifa =
        s.city.includes("חיפה") ||
        s.name.includes("חיפה") ||
        s.region === "north";
      expect(inHaifa).toBe(true);
    });
  });

  it("finds sex addiction services", () => {
    const result = searchServices(services, "מין");
    const hasSexPorn = result.some((s) => s.addictions.includes("sex_porn"));
    expect(hasSexPorn).toBe(true);
  });
});

describe("public/private distinction", () => {
  it("has both public and supervised services", () => {
    const publicServices = services.filter((s) => s.institutionType === "public");
    const supervised = services.filter(
      (s) => s.institutionType === "supervised_nonprofit" || s.institutionType === "supervised_private"
    );
    expect(publicServices.length).toBeGreaterThan(0);
    expect(supervised.length).toBeGreaterThan(0);
  });

  it("all services have supervision text", () => {
    services.forEach((s) => {
      expect(s.supervisionText.length).toBeGreaterThan(0);
    });
  });
});

describe("data validation", () => {
  it("all services have required fields", () => {
    services.forEach((s) => {
      expect(s.id).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.institutionType).toBeTruthy();
      expect(s.region).toBeTruthy();
      expect(s.city).toBeTruthy();
      expect(s.addictions.length).toBeGreaterThan(0);
      expect(s.services.length).toBeGreaterThan(0);
      expect(s.supervisionText).toBeTruthy();
      expect(s.officialSources.length).toBeGreaterThan(0);
      expect(s.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
