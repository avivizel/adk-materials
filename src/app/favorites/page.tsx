"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { EmptyState } from "@/components/EmptyState";
import { getServices } from "@/lib/data";
import { getFavorites, toggleFavorite } from "@/lib/favorites";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const allServices = useMemo(() => getServices(), []);

  useEffect(() => {
    setFavoriteIds(getFavorites());
  }, []);

  const favorites = allServices.filter((s) => favoriteIds.includes(s.id));

  const handleToggle = (id: string) => {
    const next = toggleFavorite(id);
    setFavoriteIds(next);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">המענים ששמרתי</h1>
      <p className="text-sm text-[var(--color-muted)] mb-6">
        {favorites.length} מענים שמורים
      </p>

      {favorites.length === 0 ? (
        <EmptyState
          title="עדיין לא שמרת מענים"
          description="לחץ על כפתור השמירה בכרטיס מענה כדי לשמור אותו כאן."
        >
          <Link
            href="/search"
            className="tap-target rounded-xl bg-[var(--color-primary)] text-white px-6 py-2.5 text-sm font-medium"
          >
            חפש מענים
          </Link>
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isFavorite={true}
              onToggleFavorite={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
