import Link from "next/link";

export function Footer() {
  return (
    <footer className="hidden md:block border-t border-[var(--color-border)] bg-white py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-[var(--color-muted)]">
        <p className="mb-2">
          <strong className="text-[var(--color-foreground)]">מענה</strong> — טיפול בהתמכרויות בישראל
        </p>
        <p className="mb-4 max-w-2xl mx-auto">
          המידע באתר נועד לסייע באיתור שירותים ואינו מחליף אבחון או ייעוץ רפואי.
        </p>
        <nav aria-label="ניווט תחתון" className="flex justify-center gap-6">
          <Link href="/about" className="hover:text-[var(--color-primary)]">
            אודות
          </Link>
          <Link href="/search" className="hover:text-[var(--color-primary)]">
            חיפוש
          </Link>
          <Link href="/map" className="hover:text-[var(--color-primary)]">
            מפה
          </Link>
        </nav>
      </div>
    </footer>
  );
}
