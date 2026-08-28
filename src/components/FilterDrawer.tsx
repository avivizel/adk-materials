"use client";

import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import {
  ADDICTION_LABELS,
  SERVICE_LABELS,
  REGION_LABELS,
  OPERATOR_TYPE_LABELS,
  POPULATION_OPTIONS,
  INSTITUTION_TYPE_LABELS,
  type FilterState,
  type AddictionType,
  type ServiceType,
  type Region,
  type OperatorType,
  type InstitutionType,
} from "@/types/addiction";
import { countActiveFilters } from "@/lib/filters";
import { cn } from "@/lib/utils";

interface FilterDrawerProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

function ChipToggle<T extends string>({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "tap-target rounded-full border px-3 py-1.5 text-sm transition-colors",
        selected
          ? "border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)] font-medium"
          : "border-[var(--color-border)] bg-white text-[var(--color-foreground)] hover:bg-slate-50"
      )}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}

export function FilterDrawer({ filters, onChange, onReset }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const activeCount = countActiveFilters(filters);

  const toggleArray = <T extends string>(
    key: "addictions" | "services" | "population",
    value: T
  ) => {
    const current = filters[key] as T[];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="tap-target flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-50"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        סינון תוצאות
        {activeCount > 0 && (
          <span className="rounded-full bg-[var(--color-primary)] text-white text-xs px-1.5 py-0.5 min-w-[1.25rem]">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center md:justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="סינון תוצאות"
            className="relative w-full max-h-[85dvh] md:max-w-lg md:rounded-2xl bg-white rounded-t-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <h2 className="text-lg font-semibold">סינון תוצאות</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="tap-target p-2 rounded-lg hover:bg-slate-100"
                aria-label="סגור"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <fieldset>
                <legend className="text-sm font-semibold mb-2">סוג מוסד</legend>
                <div className="flex flex-wrap gap-2">
                  <ChipToggle
                    label="הכל"
                    selected={filters.institutionType === "all"}
                    onClick={() => onChange({ ...filters, institutionType: "all" })}
                  />
                  {(Object.entries(INSTITUTION_TYPE_LABELS) as [InstitutionType, string][]).map(
                    ([key, label]) => (
                      <ChipToggle
                        key={key}
                        label={label}
                        selected={filters.institutionType === key}
                        onClick={() => onChange({ ...filters, institutionType: key })}
                      />
                    )
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold mb-2">מי מפעיל את השירות?</legend>
                <div className="flex flex-wrap gap-2">
                  <ChipToggle
                    label="הכל"
                    selected={filters.operatorType === "all"}
                    onClick={() => onChange({ ...filters, operatorType: "all" })}
                  />
                  {(Object.entries(OPERATOR_TYPE_LABELS) as [OperatorType, string][]).map(
                    ([key, label]) => (
                      <ChipToggle
                        key={key}
                        label={label}
                        selected={filters.operatorType === key}
                        onClick={() => onChange({ ...filters, operatorType: key })}
                      />
                    )
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold mb-2">איפה תרצה לקבל טיפול?</legend>
                <div className="flex flex-wrap gap-2">
                  <ChipToggle
                    label="הכל"
                    selected={filters.region === "all"}
                    onClick={() => onChange({ ...filters, region: "all" })}
                  />
                  {(Object.entries(REGION_LABELS) as [Region, string][]).map(([key, label]) => (
                    <ChipToggle
                      key={key}
                      label={label}
                      selected={filters.region === key}
                      onClick={() => onChange({ ...filters, region: key })}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold mb-2">סוג התמכרות</legend>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(ADDICTION_LABELS) as [AddictionType, string][]).map(
                    ([key, label]) => (
                      <ChipToggle
                        key={key}
                        label={label}
                        selected={filters.addictions.includes(key)}
                        onClick={() => toggleArray("addictions", key)}
                      />
                    )
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold mb-2">איזה סוג מענה מתאים לך?</legend>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(SERVICE_LABELS) as [ServiceType, string][]).map(
                    ([key, label]) => (
                      <ChipToggle
                        key={key}
                        label={label}
                        selected={filters.services.includes(key)}
                        onClick={() => toggleArray("services", key)}
                      />
                    )
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold mb-2">אוכלוסיית יעד</legend>
                <div className="flex flex-wrap gap-2">
                  {POPULATION_OPTIONS.map((pop) => (
                    <ChipToggle
                      key={pop}
                      label={pop}
                      selected={filters.population.includes(pop)}
                      onClick={() => toggleArray("population", pop)}
                    />
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="border-t border-[var(--color-border)] p-4 pb-24 md:pb-4 flex gap-2 shrink-0">
              <button
                type="button"
                onClick={onReset}
                className="tap-target flex-1 rounded-xl border border-[var(--color-border)] py-3 text-sm font-medium hover:bg-slate-50"
              >
                נקה הכל
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="tap-target flex-1 rounded-xl bg-[var(--color-primary)] py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                הצג תוצאות
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
