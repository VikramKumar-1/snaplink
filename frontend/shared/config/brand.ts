/**
 * Centralized Brand Configuration
 * -------------------------------------------------------------
 * Change the website name, domain, or tagline here in ONE place.
 * Entire application updates automatically if you re-brand later.
 * -------------------------------------------------------------
 */
export const BRAND_CONFIG = {
  name: "SnapLink",
  domain: "snaplink.to",
  shortDomain: "snaplink.to",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://snaplink.to",
  tagline: "The Open Deep Link Infrastructure",
  protocolName: "SnapLink Open Protocol",
  richCardTitle: "SnapLink Rich Card",
  heroBadge: "Native App Intent Engine",
} as const;
