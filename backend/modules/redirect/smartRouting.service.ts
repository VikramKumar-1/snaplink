import { ILink, ISmartRule } from "@/backend/modules/links/link.model";

export interface SmartRoutingContext {
  country?: string;
  device?: string;
  language?: string;
}

export interface SmartRoutingResult {
  destinationUrl: string;
  matchedRule?: ISmartRule;
  isRouted: boolean;
}

/**
 * Resolves the destination URL based on priority:
 * 1. Geo (Country)
 * 2. Device (OS / Form factor)
 * 3. Browser Language
 * 4. Fallback to default originalUrl
 */
export function resolveSmartDestination(
  link: ILink | any,
  context: SmartRoutingContext
): SmartRoutingResult {
  const rules: ISmartRule[] = link.smartRules || [];

  if (rules.length === 0) {
    return { destinationUrl: link.originalUrl, isRouted: false };
  }

  // 1. Geo (Country) Rule Check
  if (context.country) {
    const countryUpper = context.country.toUpperCase();
    const geoRule = rules.find(
      (r) => r.type === "geo" && r.condition.toUpperCase() === countryUpper
    );
    if (geoRule && geoRule.destinationUrl) {
      return { destinationUrl: geoRule.destinationUrl, matchedRule: geoRule, isRouted: true };
    }
  }

  // 2. Device Rule Check (ios, android, windows, mac, linux)
  if (context.device) {
    const deviceLower = context.device.toLowerCase();
    const deviceRule = rules.find(
      (r) => r.type === "device" && r.condition.toLowerCase() === deviceLower
    );
    if (deviceRule && deviceRule.destinationUrl) {
      return { destinationUrl: deviceRule.destinationUrl, matchedRule: deviceRule, isRouted: true };
    }
  }

  // 3. Language Rule Check (en, hi, es, fr, de, etc.)
  if (context.language) {
    const langLower = context.language.toLowerCase();
    const langRule = rules.find(
      (r) => r.type === "language" && langLower.startsWith(r.condition.toLowerCase())
    );
    if (langRule && langRule.destinationUrl) {
      return { destinationUrl: langRule.destinationUrl, matchedRule: langRule, isRouted: true };
    }
  }

  return { destinationUrl: link.originalUrl, isRouted: false };
}
