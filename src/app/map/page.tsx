"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { List } from "lucide-react";
import dynamic from "next/dynamic";
import { FilterDrawer } from "@/components/FilterDrawer";
import { getServices } from "@/lib/data";
import { applyFilters } from "@/lib/filters";
import { DEFAULT_FILTERS, type FilterState } from "@/types/addiction";

const MapView = dynamic(() => import("@/components/MapView").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100dvh-12rem)] flex items-center justify-center bg-slate-100 rounded-xl">
      טוען מפה...
    </div>
  ),
});

export default function MapPage() {
  const allServices = useMemo(() => getServices(), []);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const services = useMemo(
    () => applyFilters(allServices, filters),
    [allServices, filters]
  );

  const mappableServices = services.filter((s) => s.latitude && s.longitude);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">מפת מענים</h1>
        <div className="flex gap-2">
          <FilterDrawer
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />
          <Link
            href="/search"
            className="tap-target flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
          >
            <List className="h-4 w-4" />
            רשימה
          </Link>
        </div>
      </div>

      <p className="text-sm text-[var(--color-muted)] mb-4">
        {mappableServices.length} מענים על המפה
      </p>

      <MapView services={mappableServices} />
    </div>
  );
}
