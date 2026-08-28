"use client";

import Link from "next/link";
import { Phone, MapPin, Heart, ChevronLeft } from "lucide-react";
import { ServiceBadge } from "./ServiceBadge";
import { AddictionChip } from "./AddictionChip";
import { ServiceChip } from "./ServiceChip";
import { getRegionLabel, getPrimaryPhone, getPhoneHref } from "@/lib/formatting";
import type { AddictionService } from "@/types/addiction";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: AddictionService;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

export function ServiceCard({
  service,
  isFavorite,
  onToggleFavorite,
  className,
}: ServiceCardProps) {
  const phone = getPrimaryPhone(service);
  const maxChips = 4;
  const totalChips = service.addictions.length + service.services.length;
  const addictionDisplay = service.addictions.slice(0, maxChips);
  const remaining = maxChips - addictionDisplay.length;
  const serviceDisplay = remaining > 0 ? service.services.slice(0, remaining) : [];
  const extraCount = totalChips - addictionDisplay.length - serviceDisplay.length;

  return (
    <article
      className={cn(
        "rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base leading-snug">{service.name}</h3>
          <ServiceBadge type={service.institutionType} className="mt-1.5" />
        </div>
        {onToggleFavorite && (
          <button
            type="button"
            onClick={() => onToggleFavorite(service.id)}
            className="tap-target shrink-0 p-2 rounded-lg hover:bg-slate-100"
            aria-label={isFavorite ? "הסר מהשמורים" : "שמור"}
            aria-pressed={isFavorite}
          >
            <Heart
              className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-slate-400")}
            />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 text-sm text-[var(--color-muted)] mb-3">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          {service.city} · {getRegionLabel(service.region)}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {addictionDisplay.map((chip) => (
          <AddictionChip key={`a-${chip}`} type={chip} />
        ))}
        {serviceDisplay.map((chip) => (
          <ServiceChip key={`s-${chip}`} type={chip} />
        ))}
        {extraCount > 0 && (
          <span className="text-xs text-[var(--color-muted)] self-center">
            +{extraCount} נוספים
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {phone ? (
          <a
            href={getPhoneHref(phone)}
            className="tap-target flex-1 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            aria-label={`התקשר ל${service.name}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            התקשר
          </a>
        ) : (
          <span className="flex-1 text-center text-sm text-[var(--color-muted)] py-2.5">
            לא נמצא מספר טלפון מאומת
          </span>
        )}
        <Link
          href={`/service/${service.id}`}
          className="tap-target flex items-center justify-center gap-1 rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          פרטים
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
