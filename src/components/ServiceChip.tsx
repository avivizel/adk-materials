import { getServiceLabel } from "@/lib/formatting";
import type { ServiceType } from "@/types/addiction";
import { cn } from "@/lib/utils";

interface ServiceChipProps {
  type: ServiceType;
  className?: string;
}

export function ServiceChip({ type, className }: ServiceChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-700",
        className
      )}
    >
      {getServiceLabel(type)}
    </span>
  );
}
