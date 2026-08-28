import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  title = "לא מצאנו מענה שמתאים לכל המסננים שבחרת",
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <SearchX
        className="h-12 w-12 text-[var(--color-muted)] mb-4"
        aria-hidden="true"
      />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {description && (
        <p className="text-[var(--color-muted)] mb-6 max-w-md">{description}</p>
      )}
      {children && <div className="flex flex-col gap-2 sm:flex-row">{children}</div>}
    </div>
  );
}
