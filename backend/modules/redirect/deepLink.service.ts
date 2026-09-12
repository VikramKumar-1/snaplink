import { findPlatformByUrl } from "./platformRegistry";

export interface DeepLinkInfo {
  platform: string;
  appName: string;
  deepLinkAndroid?: string;
  deepLinkIos?: string;
  fallbackUrl: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  androidPackage?: string;
}

export function detectPlatform(url: string): string {
  const platform = findPlatformByUrl(url);
  return platform ? platform.id : "other";
}

export function parseDevice(
  userAgent: string,
  referer: string = "",
  geo: { country?: string; city?: string } = {}
): {
  device: "android" | "ios" | "windows" | "mac" | "linux" | "other";
  os: string;
  browser: string;
  inAppBrowser: boolean;
  referrerSource: "instagram" | "whatsapp" | "facebook" | "twitter" | "telegram" | "youtube" | "linkedin" | "tiktok" | "direct" | "other";
  country: string;
  city: string;
} {
  const ua = userAgent.toLowerCase();
  const ref = referer.toLowerCase();

  // 1. Device & OS Detection
  let device: "android" | "ios" | "windows" | "mac" | "linux" | "other" = "other";
  let os = "Other";

  if (ua.includes("android")) {
    device = "android";
    os = "Android";
  } else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
    device = "ios";
    os = "iOS";
  } else if (ua.includes("windows")) {
    device = "windows";
    os = "Windows";
  } else if (ua.includes("macintosh") || ua.includes("mac os")) {
    device = "mac";
    os = "macOS";
  } else if (ua.includes("linux")) {
    device = "linux";
    os = "Linux";
  }

  // 2. In-App Browser (WebView) Detection
  const inAppBrowser =
    ua.includes("instagram") ||
    ua.includes("fban") ||
    ua.includes("fbav") ||
    ua.includes("fb_iab") ||
    ua.includes("linkedinapp") ||
    ua.includes("twitter") ||
    ua.includes("snapchat") ||
    ua.includes("bytedance") ||
    ua.includes("tiktok");

  // 3. Browser Family Detection
  let browser = "Other";
  if (inAppBrowser) {
    browser = "In-App WebView";
  } else if (ua.includes("edg/")) {
    browser = "Edge";
  } else if (ua.includes("chrome/") || ua.includes("crios/")) {
    browser = "Chrome";
  } else if (ua.includes("safari/") && !ua.includes("chrome/")) {
    browser = "Safari";
  } else if (ua.includes("firefox/") || ua.includes("fxios/")) {
    browser = "Firefox";
  }

  // 4. Referrer Source Attribution
  let referrerSource: "instagram" | "whatsapp" | "facebook" | "twitter" | "telegram" | "youtube" | "linkedin" | "tiktok" | "direct" | "other" = "direct";

  if (ref.includes("instagram.com")) referrerSource = "instagram";
  else if (ref.includes("youtube.com") || ref.includes("youtu.be")) referrerSource = "youtube";
  else if (ref.includes("t.co") || ref.includes("twitter.com") || ref.includes("x.com")) referrerSource = "twitter";
  else if (ref.includes("whatsapp.com") || ref.includes("wa.me")) referrerSource = "whatsapp";
  else if (ref.includes("facebook.com") || ref.includes("fb.com") || ref.includes("l.facebook.com")) referrerSource = "facebook";
  else if (ref.includes("linkedin.com")) referrerSource = "linkedin";
  else if (ref.includes("tiktok.com")) referrerSource = "tiktok";
  else if (ref.includes("telegram.org") || ref.includes("t.me")) referrerSource = "telegram";
  else if (inAppBrowser) {
    if (ua.includes("instagram")) referrerSource = "instagram";
    else if (ua.includes("fban") || ua.includes("fbav") || ua.includes("facebook")) referrerSource = "facebook";
    else if (ua.includes("twitter")) referrerSource = "twitter";
    else if (ua.includes("linkedinapp")) referrerSource = "linkedin";
    else if (ua.includes("tiktok") || ua.includes("bytedance")) referrerSource = "tiktok";
  }

  // 5. Geo Normalization
  const country = (geo.country && geo.country !== "XX" ? geo.country.toUpperCase() : "IN");
  const city = geo.city && geo.city.trim() !== "" ? geo.city.trim() : "Unknown";

  return { device, os, browser, inAppBrowser, referrerSource, country, city };
}

export function generateDeepLink(url: string): DeepLinkInfo {
  const cleanUrl = url.trim();
  const platformDef = findPlatformByUrl(cleanUrl);

  if (!platformDef) {
    return {
      platform: "other",
      appName: "Website",
      fallbackUrl: cleanUrl,
    };
  }

  const stripped = cleanUrl.replace(/^https?:\/\//, "");

  // Build Android Intent with guaranteed S.browser_fallback_url
  let deepLinkAndroid: string | undefined = undefined;
  if (platformDef.customAndroidIntent) {
    deepLinkAndroid = platformDef.customAndroidIntent(cleanUrl);
  } else if (platformDef.androidPackage) {
    deepLinkAndroid = `intent://${stripped}#Intent;package=${platformDef.androidPackage};scheme=https;S.browser_fallback_url=${encodeURIComponent(cleanUrl)};end`;
  }

  // Ensure any custom intent also includes S.browser_fallback_url before ;end
  if (deepLinkAndroid && deepLinkAndroid.includes("#Intent;") && !deepLinkAndroid.includes("S.browser_fallback_url")) {
    deepLinkAndroid = deepLinkAndroid.replace(/;end$/, `;S.browser_fallback_url=${encodeURIComponent(cleanUrl)};end`);
  }

  // Build iOS Deep Link Scheme
  let deepLinkIos: string | undefined = undefined;
  if (platformDef.customIosDeepLink) {
    deepLinkIos = platformDef.customIosDeepLink(cleanUrl);
  } else if (platformDef.iosSchemePrefix) {
    deepLinkIos = `${platformDef.iosSchemePrefix}${stripped}`;
  }

  const playStoreUrl = platformDef.androidPackage
    ? `https://play.google.com/store/apps/details?id=${platformDef.androidPackage}`
    : undefined;

  const appStoreUrl = platformDef.appStoreId
    ? `https://apps.apple.com/app/id${platformDef.appStoreId}`
    : undefined;

  return {
    platform: platformDef.id,
    appName: platformDef.name,
    deepLinkAndroid,
    deepLinkIos,
    fallbackUrl: cleanUrl,
    playStoreUrl,
    appStoreUrl,
    androidPackage: platformDef.androidPackage,
  };
}
