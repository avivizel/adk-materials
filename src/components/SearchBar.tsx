"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "חפש מוסד, עיר, סוג טיפול או התמכרות",
  className,
  autoFocus,
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted)]"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="tap-target w-full rounded-xl border border-[var(--color-border)] bg-white py-3 pr-10 pl-4 text-base shadow-sm placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-100"
        aria-label="חיפוש שירותים"
      />
    </div>
  );
}
