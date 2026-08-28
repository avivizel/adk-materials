import type { Metadata } from "next";
import { getServiceById, getServices } from "@/lib/data";
import ServiceDetailClient from "./ServiceDetailClient";

export function generateStaticParams() {
  return getServices().map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) return { title: "מענה לא נמצא" };
  return {
    title: `${service.name} — ${service.city}`,
    description: `מידע על ${service.name} ב${service.city}. ${service.supervisionText}`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) return null;
  return <ServiceDetailClient service={service} />;
}
