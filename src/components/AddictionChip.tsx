import { getAddictionLabel } from "@/lib/formatting";
import type { AddictionType } from "@/types/addiction";
import { cn } from "@/lib/utils";

interface AddictionChipProps {
  type: AddictionType;
  className?: string;
}

export function AddictionChip({ type, className }: AddictionChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700",
        className
      )}
    >
      {getAddictionLabel(type)}
    </span>
  );
}
