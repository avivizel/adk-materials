import {
  ADDICTION_LABELS,
  OPERATOR_TYPE_LABELS,
  REGION_LABELS,
  SERVICE_LABELS,
  INSTITUTION_TYPE_LABELS,
  type AddictionService,
  type AddictionType,
  type Region,
  type ServiceType,
} from "@/types/addiction";

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
}

export function formatPhone(phone: string): string {
  return phone;
}

export function getPrimaryPhone(service: AddictionService): string | null {
  return service.phone?.[0] ?? null;
}

export function getPhoneHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+*#]/g, "");
  return `tel:${cleaned}`;
}

export function getEmailHref(email: string): string {
  return `mailto:${email}`;
}

export function getNavigationHref(service: AddictionService): string | null {
  if (service.latitude && service.longitude) {
    return `https://www.google.com/maps/dir/?api=1&destination=${service.latitude},${service.longitude}`;
  }
  if (service.address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`;
  }
  return null;
}

export function getAddictionLabel(type: AddictionType): string {
  return ADDICTION_LABELS[type];
}

export function getServiceLabel(type: ServiceType): string {
  return SERVICE_LABELS[type];
}

export function getRegionLabel(region: Region): string {
  return REGION_LABELS[region];
}

export function getInstitutionTypeLabel(
  type: AddictionService["institutionType"]
): string {
  return INSTITUTION_TYPE_LABELS[type];
}

export function getOperatorLabel(
  type: AddictionService["operatorType"]
): string {
  return OPERATOR_TYPE_LABELS[type];
}

export function isDataStale(verifiedAt: string): boolean {
  const verified = new Date(verifiedAt);
  const now = new Date();
  const monthsDiff =
    (now.getFullYear() - verified.getFullYear()) * 12 +
    (now.getMonth() - verified.getMonth());
  return monthsDiff > 6;
}

export function getInstitutionTypeBadgeClass(
  type: AddictionService["institutionType"]
): string {
  switch (type) {
    case "public":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "supervised_nonprofit":
      return "bg-green-100 text-green-800 border-green-200";
    case "supervised_private":
      return "bg-green-100 text-green-800 border-green-200";
  }
}

export function getShareText(service: AddictionService): string {
  return `מצאתי את המענה הזה במאגר שירותי ההתמכרויות:\n${service.name}`;
}

export async function shareService(service: AddictionService, url: string): Promise<boolean> {
  const text = getShareText(service);
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: service.name, text, url });
      return true;
    } catch {
      return false;
    }
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    return true;
  }
  return false;
}
