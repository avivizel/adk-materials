import { cn } from "@/lib/utils";
import { getInstitutionTypeBadgeClass, getInstitutionTypeLabel } from "@/lib/formatting";
import type { AddictionService } from "@/types/addiction";

interface ServiceBadgeProps {
  type: AddictionService["institutionType"];
  className?: string;
}

export function ServiceBadge({ type, className }: ServiceBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        getInstitutionTypeBadgeClass(type),
        className
      )}
    >
      {getInstitutionTypeLabel(type)}
    </span>
  );
}
