import { CORE_SERVICES } from "./data/coreServices";
import { ADVANCED_SERVICES } from "./data/advancedServices";
import { ServiceDetail, ServiceFaq } from "./types";

export type { ServiceDetail, ServiceFaq };

export const ALL_SERVICES: ServiceDetail[] = [
  ...CORE_SERVICES,
  ...ADVANCED_SERVICES,
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return ALL_SERVICES.find((s) => s.slug === slug);
}
