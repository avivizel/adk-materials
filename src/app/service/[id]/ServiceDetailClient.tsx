"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Share2, CheckCircle } from "lucide-react";
import { ServiceBadge } from "@/components/ServiceBadge";
import { AddictionChip } from "@/components/AddictionChip";
import { ServiceChip } from "@/components/ServiceChip";
import { ContactActions, SourcePanel } from "@/components/ContactActions";
import { DataWarning } from "@/components/DataWarning";
import {
  formatDate,
  getOperatorLabel,
  getPrimaryPhone,
  isDataStale,
  shareService,
} from "@/lib/formatting";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import type { AddictionService } from "@/types/addiction";

export default function ServiceDetailClient({
  service,
}: {
  service: AddictionService;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    setIsFavorite(getFavorites().includes(service.id));
  }, [service.id]);

  const phone = getPrimaryPhone(service);
  const stale = isDataStale(service.verifiedAt);

  const handleShare = async () => {
    const url = window.location.href;
    const ok = await shareService(service, url);
    if (ok) setShareMessage("הקישור הועתק!");
    setTimeout(() => setShareMessage(""), 2000);
  };

  const handleFavorite = () => {
    toggleFavorite(service.id);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <nav aria-label="ניווט פירורי לחם" className="mb-4">
        <Link href="/search" className="text-sm text-[var(--color-primary)] hover:underline">
          ← חזרה לחיפוש
        </Link>
      </nav>

      <header className="mb-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h1 className="text-2xl font-bold leading-tight">{service.name}</h1>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={handleFavorite}
              className="tap-target p-2 rounded-lg border border-[var(--color-border)] hover:bg-slate-50 text-sm"
              aria-pressed={isFavorite}
            >
              {isFavorite ? "★ שמור" : "☆ שמור"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="tap-target p-2 rounded-lg border border-[var(--color-border)] hover:bg-slate-50"
              aria-label="שתף"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        {shareMessage && <p className="text-sm text-green-600 mb-2">{shareMessage}</p>}
        <ServiceBadge type={service.institutionType} />
        {service.operatorName && (
          <p className="text-sm text-[var(--color-muted)] mt-2">
            מפעיל: {service.operatorName} ({getOperatorLabel(service.operatorType)})
          </p>
        )}
      </header>

      {!phone && (
        <div className="mb-4">
          <DataWarning message="לא נמצא מספר טלפון מאומת" />
        </div>
      )}

      <div className="flex items-center gap-2 mb-6 text-sm">
        {stale ? (
          <DataWarning message="מומלץ לוודא טלפונית לפני פנייה" />
        ) : (
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-4 w-4" aria-hidden="true" />
            <span>מקור רשמי זמין</span>
          </div>
        )}
      </div>

      <section className="mb-6" aria-labelledby="addictions-heading">
        <h2 id="addictions-heading" className="text-lg font-semibold mb-3">
          במה מטפלים כאן?
        </h2>
        <div className="flex flex-wrap gap-2">
          {service.addictions.map((a) => (
            <AddictionChip key={a} type={a} />
          ))}
        </div>
      </section>

      <section className="mb-6" aria-labelledby="services-heading">
        <h2 id="services-heading" className="text-lg font-semibold mb-3">
          איזה סוג טיפול ניתן?
        </h2>
        <div className="flex flex-wrap gap-2">
          {service.services.map((s) => (
            <ServiceChip key={s} type={s} />
          ))}
        </div>
      </section>

      {service.population && service.population.length > 0 && (
        <section className="mb-6" aria-labelledby="population-heading">
          <h2 id="population-heading" className="text-lg font-semibold mb-3">
            למי השירות מתאים?
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {service.population.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-6 rounded-xl border border-[var(--color-border)] bg-white p-4" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-lg font-semibold mb-4">
          איך פונים?
        </h2>
        <ContactActions service={service} />
      </section>

      <section className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4" aria-labelledby="supervision-heading">
        <h2 id="supervision-heading" className="text-lg font-semibold mb-2">
          מעמד ופיקוח
        </h2>
        <p className="text-sm leading-relaxed">{service.supervisionText}</p>
      </section>

      <section className="mb-6" aria-labelledby="source-detail-heading">
        <h2 id="source-detail-heading" className="text-lg font-semibold mb-2">
          מקור המידע
        </h2>
        <SourcePanel service={service} />
        <p className="text-sm text-[var(--color-muted)] mt-3">
          נבדק לאחרונה: {formatDate(service.verifiedAt)}
        </p>
      </section>

      {service.notes && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">הערות</h2>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">{service.notes}</p>
        </section>
      )}

      <p className="text-sm text-[var(--color-muted)] border-t border-[var(--color-border)] pt-4">
        עלות: יש לברר מול המסגרת
      </p>
    </div>
  );
}
