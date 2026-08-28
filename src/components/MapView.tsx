"use client";

import { useEffect, useRef, useState } from "react";
import type { AddictionService } from "@/types/addiction";
import { getInstitutionTypeLabel } from "@/lib/formatting";
import { ContactActions } from "./ContactActions";

interface MapViewProps {
  services: AddictionService[];
  onServiceClick?: (service: AddictionService) => void;
  userLat?: number;
  userLng?: number;
}

export function MapView({ services, onServiceClick, userLat, userLng }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const [selected, setSelected] = useState<AddictionService | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    async function initMap() {
      const L = (await import("leaflet")).default;

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [31.5, 34.85],
        zoom: 8,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const publicIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background:#2563eb;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)" aria-label="ציבורי">צ</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const supervisedIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background:#16a34a;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)" aria-label="מפוקח">מ</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      services.forEach((service) => {
        if (!service.latitude || !service.longitude) return;
        const icon = service.institutionType === "public" ? publicIcon : supervisedIcon;
        const marker = L.marker([service.latitude, service.longitude], { icon }).addTo(map);
        marker.bindPopup(`<strong>${service.name}</strong><br/>${getInstitutionTypeLabel(service.institutionType)}`);
        marker.on("click", () => {
          setSelected(service);
          onServiceClick?.(service);
        });
      });

      if (userLat && userLng) {
        L.circleMarker([userLat, userLng], {
          radius: 8,
          color: "#dc2626",
          fillColor: "#dc2626",
          fillOpacity: 0.8,
        }).addTo(map).bindPopup("המיקום שלך");
      }

      mapInstanceRef.current = map;
      setLoaded(true);
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [services, userLat, userLng, onServiceClick]);

  return (
    <div className="relative w-full h-[calc(100dvh-12rem)] md:h-[600px] rounded-xl overflow-hidden border border-[var(--color-border)]">
      <div ref={mapRef} className="w-full h-full" role="application" aria-label="מפת שירותים" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <p className="text-[var(--color-muted)]">טוען מפה...</p>
        </div>
      )}

      <div className="absolute top-3 left-3 bg-white rounded-lg shadow px-3 py-2 text-xs space-y-1 z-[1000]">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">צ</span>
          <span>ציבורי</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center">מ</span>
          <span>פרטי / מלכ״ר מפוקח</span>
        </div>
      </div>

      {selected && (
        <div className="absolute bottom-3 inset-x-3 bg-white rounded-xl shadow-lg p-4 z-[1000] max-w-md mx-auto">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm">{selected.name}</h3>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-[var(--color-muted)] text-sm"
              aria-label="סגור"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-[var(--color-muted)] mb-3">
            {selected.city} · {getInstitutionTypeLabel(selected.institutionType)}
          </p>
          <ContactActions service={selected} variant="compact" />
        </div>
      )}
    </div>
  );
}
