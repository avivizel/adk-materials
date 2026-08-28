"use client";

import { useCallback, useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { FilterDrawer } from "@/components/FilterDrawer";
import { ServiceCard } from "@/components/ServiceCard";
import { EmptyState } from "@/components/EmptyState";
import { getServices } from "@/lib/data";
import { searchServices } from "@/lib/search";
import { applyFilters, sortServices, clearOneFilter } from "@/lib/filters";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { requestGeolocation } from "@/lib/geo";
import {
  DEFAULT_FILTERS,
  type FilterState,
  type SortOption,
  type AddictionType,
  type Region,
} from "@/types/addiction";

function SearchContent() {
  const searchParams = useSearchParams();
  const allServices = useMemo(() => getServices(), []);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userLat, setUserLat] = useState<number | undefined>();
  const [userLng, setUserLng] = useState<number | undefined>();

  useEffect(() => {
    setFavorites(getFavorites());

    const addiction = searchParams.get("addiction") as AddictionType | null;
    const region = searchParams.get("region") as Region | null;
    const q = searchParams.get("q");

    if (addiction || region || q) {
      setFilters((prev) => ({
        ...prev,
        addictions: addiction ? [addiction] : prev.addictions,
        region: region ?? prev.region,
      }));
      if (q) setQuery(q);
    }
  }, [searchParams]);

  const results = useMemo(() => {
    let services = allServices;
    if (query.trim()) {
      services = searchServices(services, query);
    }
    services = applyFilters(services, filters);
    const effectiveSort = query.trim() ? sort : sort === "relevance" ? "name" : sort;
    return sortServices(services, effectiveSort, userLat, userLng);
  }, [allServices, query, filters, sort, userLat, userLng]);

  const handleToggleFavorite = useCallback((id: string) => {
    const next = toggleFavorite(id);
    setFavorites(next);
  }, []);

  const handleGeolocation = async () => {
    try {
      const pos = await requestGeolocation();
      setUserLat(pos.latitude);
      setUserLng(pos.longitude);
      setSort("distance");
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">חיפוש מענים</h1>

      <div className="sticky top-0 z-30 bg-[var(--color-background)] pb-4 space-y-3">
        <SearchBar value={query} onChange={setQuery} autoFocus />
        <div className="flex flex-wrap gap-2 items-center">
          <FilterDrawer
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="tap-target rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm"
            aria-label="מיון תוצאות"
          >
            <option value="relevance">רלוונטיות</option>
            <option value="name">שם</option>
            <option value="city">עיר</option>
            <option value="region">אזור</option>
            <option value="public_first">ציבורי קודם</option>
            <option value="distance">קרוב אליי</option>
          </select>
          <button
            type="button"
            onClick={handleGeolocation}
            className="tap-target rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm hover:bg-slate-50"
          >
            השתמש במיקום שלי
          </button>
        </div>
        <p className="text-sm text-[var(--color-muted)]">
          {results.length} תוצאות
        </p>
      </div>

      {results.length === 0 ? (
        <EmptyState title="לא מצאנו התאמה מלאה">
          <button
            type="button"
            onClick={() => setFilters(clearOneFilter(filters))}
            className="tap-target rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
          >
            נקה מסנן אחד
          </button>
          <button
            type="button"
            onClick={() => setFilters({ ...filters, region: "all" })}
            className="tap-target rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
          >
            הצג את כל המענים באזור
          </button>
          <button
            type="button"
            onClick={() => setFilters({ ...filters, includeSupervised: true, publicOnly: false })}
            className="tap-target rounded-xl bg-[var(--color-primary)] text-white px-4 py-2.5 text-sm font-medium"
          >
            הצג גם מסגרות פרטיות מפוקחות
          </button>
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isFavorite={favorites.includes(service.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">טוען...</div>}>
      <SearchContent />
    </Suspense>
  );
}
