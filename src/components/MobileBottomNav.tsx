"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Map, Heart, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "בית", icon: Home },
  { href: "/search", label: "חיפוש", icon: Search },
  { href: "/map", label: "מפה", icon: Map },
  { href: "/favorites", label: "שמורים", icon: Heart },
  { href: "/about", label: "מידע", icon: Info },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="ניווט ראשי"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-[var(--color-border)] bg-white md:hidden"
    >
      <ul className="flex items-stretch justify-around">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "tap-target flex flex-col items-center justify-center gap-0.5 py-2 text-xs transition-colors",
                  isActive
                    ? "text-[var(--color-primary)] font-semibold"
                    : "text-[var(--color-muted)]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
