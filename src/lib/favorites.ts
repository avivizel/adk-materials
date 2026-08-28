const FAVORITES_KEY = "maane-favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string): string[] {
  const current = getFavorites();
  const next = current.includes(id)
    ? current.filter((f) => f !== id)
    : [...current, id];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}

export function addFavorite(id: string): string[] {
  const current = getFavorites();
  if (!current.includes(id)) {
    const next = [...current, id];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    return next;
  }
  return current;
}

export function removeFavorite(id: string): string[] {
  const next = getFavorites().filter((f) => f !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}
