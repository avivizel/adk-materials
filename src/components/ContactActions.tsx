"use client";

import { Phone, Mail, MapPin, Globe, ExternalLink } from "lucide-react";
import {
  getPrimaryPhone,
  getPhoneHref,
  getEmailHref,
  getNavigationHref,
} from "@/lib/formatting";
import type { AddictionService } from "@/types/addiction";

interface ContactActionsProps {
  service: AddictionService;
  variant?: "compact" | "full";
}

export function ContactActions({ service, variant = "full" }: ContactActionsProps) {
  const phone = getPrimaryPhone(service);
  const email = service.email?.[0];
  const navHref = getNavigationHref(service);

  if (variant === "compact") {
    return (
      <div className="flex gap-2">
        {phone && (
          <a
            href={getPhoneHref(phone)}
            className="tap-target flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white"
          >
            <Phone className="h-4 w-4" />
            התקשר
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {phone ? (
        <a
          href={getPhoneHref(phone)}
          className="tap-target flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          התקשר עכשיו
        </a>
      ) : (
        <p className="text-sm text-[var(--color-muted)] text-center py-2">
          לא נמצא מספר טלפון מאומת
        </p>
      )}

      <div className="grid grid-cols-2 gap-2">
        {email && (
          <a
            href={getEmailHref(email)}
            className="tap-target flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm font-medium hover:bg-slate-50"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            שלח אימייל
          </a>
        )}
        {navHref && (
          <a
            href={navHref}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm font-medium hover:bg-slate-50"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            פתח ניווט
          </a>
        )}
        {service.website && (
          <a
            href={service.website}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm font-medium hover:bg-slate-50 col-span-2"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            פתח אתר רשמי
          </a>
        )}
      </div>

      {service.address && (
        <p className="text-sm text-[var(--color-muted)] flex items-start gap-2">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
          {service.address}
        </p>
      )}
    </div>
  );
}

export function SourcePanel({ service }: { service: AddictionService }) {
  return (
    <section aria-labelledby="source-heading" className="space-y-3">
      <h2 id="source-heading" className="text-lg font-semibold">
        מקור ופיקוח
      </h2>
      <p className="text-sm leading-relaxed">{service.supervisionText}</p>
      <div className="space-y-2">
        {service.officialSources.map((source, i) => (
          <a
            key={i}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
          >
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            {source.label}
          </a>
        ))}
      </div>
    </section>
  );
}
