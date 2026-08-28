import type { Region } from "@/types/addiction";

export interface GeoPosition {
  latitude: number;
  longitude: number;
}

export function requestGeolocation(): Promise<GeoPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => reject(err),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  });
}

export function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} מ׳`;
  return `${km.toFixed(1)} ק״מ`;
}

export const REGION_CENTERS: Record<Region, GeoPosition> = {
  national: { latitude: 31.5, longitude: 34.85 },
  north: { latitude: 32.8, longitude: 35.0 },
  center: { latitude: 32.07, longitude: 34.78 },
  jerusalem: { latitude: 31.77, longitude: 35.21 },
  south: { latitude: 31.25, longitude: 34.79 },
};
