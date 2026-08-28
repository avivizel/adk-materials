import { describe, it, expect, beforeEach, vi } from "vitest";
import { getFavorites, toggleFavorite, addFavorite, removeFavorite } from "@/lib/favorites";

const storage: Record<string, string> = {};

beforeEach(() => {
  Object.keys(storage).forEach((k) => delete storage[k]);
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => storage[key] ?? null,
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
  });
});

describe("favorites", () => {
  it("starts empty", () => {
    expect(getFavorites()).toEqual([]);
  });

  it("adds a favorite", () => {
    addFavorite("test-id");
    expect(getFavorites()).toContain("test-id");
  });

  it("toggles a favorite", () => {
    toggleFavorite("test-id");
    expect(getFavorites()).toContain("test-id");
    toggleFavorite("test-id");
    expect(getFavorites()).not.toContain("test-id");
  });

  it("removes a favorite", () => {
    addFavorite("test-id");
    removeFavorite("test-id");
    expect(getFavorites()).not.toContain("test-id");
  });

  it("persists across calls", () => {
    addFavorite("a");
    addFavorite("b");
    expect(getFavorites()).toEqual(["a", "b"]);
  });
});
