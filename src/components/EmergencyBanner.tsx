import Link from "next/link";
import { Phone, Shield } from "lucide-react";

export function EmergencyBanner() {
  const emergencyNumbers = [
    { label: "101 מד״א", href: "tel:101", icon: Phone },
    { label: "100 משטרה", href: "tel:100", icon: Shield },
    { label: "118 משרד הרווחה", href: "tel:118", icon: Phone },
    { label: "5400* משרד הבריאות", href: "tel:*5400", icon: Phone },
  ];

  return (
    <section
      aria-label="מצב חירום"
      className="rounded-xl border border-amber-200 bg-amber-50 p-4"
    >
      <h2 className="text-sm font-semibold text-amber-900 mb-3">
        מצב חירום רפואי או סכנה מיידית?
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {emergencyNumbers.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="tap-target flex items-center justify-center gap-2 rounded-lg bg-white border border-amber-200 px-3 py-2.5 text-sm font-medium text-amber-900 hover:bg-amber-100 transition-colors"
            aria-label={`התקשר ל${item.label}`}
          >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs text-amber-800">
        המידע באתר נועד לסייע באיתור שירותים ואינו מחליף אבחון או ייעוץ רפואי.
        במצב חירום או סכנה מיידית יש לפנות לשירותי החירום.
      </p>
    </section>
  );
}
