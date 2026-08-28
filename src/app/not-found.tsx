import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold mb-2">הדף לא נמצא</h1>
      <p className="text-[var(--color-muted)] mb-6">המענה שחיפשת לא קיים במאגר.</p>
      <Link
        href="/search"
        className="tap-target inline-flex rounded-xl bg-[var(--color-primary)] text-white px-6 py-3 font-medium"
      >
        חזרה לחיפוש
      </Link>
    </div>
  );
}
