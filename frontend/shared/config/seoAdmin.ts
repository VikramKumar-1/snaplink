import { BRAND_CONFIG } from "./brand";

export interface SeoPageConfig {
  route: string;
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  twitterCard: "summary" | "summary_large_image";
  robots: {
    index: boolean;
    follow: boolean;
  };
  h1Heading: string;
  h1Subheading: string;
  sitemapPriority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
}

const baseUrl = BRAND_CONFIG.baseUrl;

export const DEFAULT_PAGE_SEO: Record<string, SeoPageConfig> = {
  "/": {
    route: "/",
    metaTitle: `${BRAND_CONFIG.name} | 1-Click Native App Deep Links & Creator Analytics`,
    metaDescription:
      "Bypass slow in-app webviews on Instagram, TikTok, and YouTube. Launch official apps directly on YouTube, Amazon, Flipkart, and Spotify with real-time analytics.",
    focusKeywords: [
      "deep link generator",
      "free app opener",
      "instagram in-app browser bypass",
      "myntra affiliate deep link",
      "open in youtube app",
      "amazon associate link bypass",
      "branded qr code generator",
    ],
    canonicalUrl: `${baseUrl}/`,
    ogTitle: `${BRAND_CONFIG.name} — 1-Click Native Mobile App Intent Engine`,
    ogDescription:
      "Directly launch official apps from Instagram and TikTok. 300% higher conversions with sub-15ms server redirects.",
    ogImageUrl: `${baseUrl}/og-preview.png`,
    twitterCard: "summary_large_image",
    robots: { index: true, follow: true },
    h1Heading: "Launch Native Apps from Social Bio Links in <15ms",
    h1Subheading:
      "Bypass restrictive webview traps. Open YouTube, Instagram, Amazon, Flipkart, and Spotify directly in their official mobile apps.",
    sitemapPriority: 1.0,
    changeFrequency: "daily",
  },
  "/services": {
    route: "/services",
    metaTitle: `Link Infrastructure & Creator Growth Services Directory | ${BRAND_CONFIG.name}`,
    metaDescription:
      "Explore 10 enterprise link services: 0ms mobile app openers, vector QR studio, link-in-bio maker, real-time analytics, smart routing, and developer APIs.",
    focusKeywords: [
      "link management services",
      "free app opener service",
      "branded vector qr codes",
      "creator link in bio maker",
      "real time url click analytics",
      "smart geo routing links",
      "custom domain link shortener",
    ],
    canonicalUrl: `${baseUrl}/services`,
    ogTitle: `10 Creator & Enterprise Link Tools — ${BRAND_CONFIG.name}`,
    ogDescription: "Discover full-stack link infrastructure built for maximum conversion speed and attribution.",
    ogImageUrl: `${baseUrl}/og-preview.png`,
    twitterCard: "summary_large_image",
    robots: { index: true, follow: true },
    h1Heading: "Services Built for Modern Traffic Growth",
    h1Subheading:
      "From zero-latency app openers to branded vector QR codes and developer APIs. Discover everything SnapLink provides.",
    sitemapPriority: 0.9,
    changeFrequency: "daily",
  },
  "/overview": {
    route: "/overview",
    metaTitle: `Platform Architecture, Features & Services Map | ${BRAND_CONFIG.name}`,
    metaDescription:
      "Complete architectural overview of all 12 modules built into SnapLink: deep link intent engine, QR studio, bio hubs, analytics, smart routing, and RBAC workspaces.",
    focusKeywords: [
      "smart link platform architecture",
      "deep link features overview",
      "openinapp alternative architecture",
      "link shortener enterprise modules",
      "real-time link tracking system",
    ],
    canonicalUrl: `${baseUrl}/overview`,
    ogTitle: `Platform Map & Feature Directory | ${BRAND_CONFIG.name}`,
    ogDescription: "A complete visual overview of all capabilities, dashboards, and developer endpoints.",
    ogImageUrl: `${baseUrl}/og-preview.png`,
    twitterCard: "summary_large_image",
    robots: { index: true, follow: true },
    h1Heading: "Everything Built Inside SnapLink",
    h1Subheading:
      "All core modules, services, and developer endpoints built into your enterprise smart link platform.",
    sitemapPriority: 0.85,
    changeFrequency: "weekly",
  },
};

export function getPageSeo(route: string): SeoPageConfig {
  return (
    DEFAULT_PAGE_SEO[route] || {
      route,
      metaTitle: `${BRAND_CONFIG.name} | The Open Deep Link Infrastructure`,
      metaDescription: BRAND_CONFIG.tagline,
      focusKeywords: ["deep link generator", "smart short link"],
      canonicalUrl: `${baseUrl}${route}`,
      ogTitle: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
      ogDescription: BRAND_CONFIG.tagline,
      ogImageUrl: `${baseUrl}/og-preview.png`,
      twitterCard: "summary_large_image",
      robots: { index: true, follow: true },
      h1Heading: BRAND_CONFIG.name,
      h1Subheading: BRAND_CONFIG.tagline,
      sitemapPriority: 0.7,
      changeFrequency: "weekly",
    }
  );
}
