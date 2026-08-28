import Link from "next/link";
import {
  Pill,
  Wine,
  Dices,
  Heart,
  Monitor,
  Syringe,
  Brain,
  Grid3X3,
  MapPin,
  Search,
} from "lucide-react";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { getServices } from "@/lib/data";
import type { AddictionType } from "@/types/addiction";

const categories: { type: AddictionType | "all"; label: string; icon: React.ElementType }[] = [
  { type: "drugs", label: "סמים", icon: Pill },
  { type: "alcohol", label: "אלכוהול", icon: Wine },
  { type: "gambling", label: "הימורים", icon: Dices },
  { type: "sex_porn", label: "מין ופורנוגרפיה", icon: Heart },
  { type: "screens_social_gaming", label: "מסכים וגיימינג", icon: Monitor },
  { type: "opioids", label: "תרופות ואופיואידים", icon: Syringe },
  { type: "dual_diagnosis", label: "תחלואה כפולה", icon: Brain },
  { type: "all", label: "כל סוגי ההתמכרות", icon: Grid3X3 },
];

export default function HomePage() {
  const serviceCount = getServices().length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Desktop top nav */}
      <header className="hidden md:flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">מענה</h1>
        <nav aria-label="ניווט עליון" className="flex gap-6 text-sm">
          <Link href="/search" className="hover:text-[var(--color-primary)]">חיפוש</Link>
          <Link href="/map" className="hover:text-[var(--color-primary)]">מפה</Link>
          <Link href="/favorites" className="hover:text-[var(--color-primary)]">שמורים</Link>
          <Link href="/about" className="hover:text-[var(--color-primary)]">מידע</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center mb-10">
        <p className="text-sm text-[var(--color-muted)] mb-2">מענה — טיפול בהתמכרויות בישראל</p>
        <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-3">
          למצוא טיפול בהתמכרות — בצורה פשוטה וברורה
        </h2>
        <p className="text-[var(--color-muted)] max-w-xl mx-auto mb-6 text-base md:text-lg">
          חיפוש בשירותים ציבוריים ובמסגרות פרטיות מפוקחות בישראל לפי סוג התמכרות, אזור וסוג טיפול.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/search"
            className="tap-target inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            מצא מענה
          </Link>
          <Link
            href="/search?region=center"
            className="tap-target inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-8 py-3.5 text-base font-medium hover:bg-slate-50 transition-colors"
          >
            <MapPin className="h-5 w-5" aria-hidden="true" />
            חיפוש לפי אזור
          </Link>
        </div>
        <p className="mt-4 text-xs text-[var(--color-muted)]">
          {serviceCount} מענים במאגר
        </p>
      </section>

      {/* Categories */}
      <section aria-labelledby="categories-heading" className="mb-10">
        <h2 id="categories-heading" className="text-lg font-semibold mb-4">
          מה סוג העזרה שאתה מחפש?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.type}
              href={
                cat.type === "all"
                  ? "/search"
                  : `/search?addiction=${cat.type}`
              }
              className="tap-target flex flex-col items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-center"
            >
              <cat.icon className="h-7 w-7 text-[var(--color-primary)]" aria-hidden="true" />
              <span className="text-sm font-medium leading-snug">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Emergency */}
      <EmergencyBanner />
    </div>
  );
}
