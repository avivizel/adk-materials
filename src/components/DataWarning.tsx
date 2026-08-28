import { AlertTriangle } from "lucide-react";

interface DataWarningProps {
  message?: string;
}

export function DataWarning({
  message = "מומלץ לוודא טלפונית לפני פנייה",
}: DataWarningProps) {
  return (
    <div
      role="status"
      className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
    >
      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
