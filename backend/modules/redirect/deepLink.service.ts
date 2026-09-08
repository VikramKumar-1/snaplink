export interface DeepLinkInfo {
  platform: "youtube" | "instagram" | "telegram" | "amazon" | "spotify" | "whatsapp" | "myntra" | "other";
  deepLinkAndroid?: string;
  deepLinkIos?: string;
  fallbackUrl: string;
}

export function detectPlatform(url: string): DeepLinkInfo["platform"] {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
    return "youtube";
  }
  if (lowerUrl.includes("instagram.com")) {
    return "instagram";
  }
  if (lowerUrl.includes("t.me") || lowerUrl.includes("telegram.me")) {
    return "telegram";
  }
  if (lowerUrl.includes("amazon.in") || lowerUrl.includes("amazon.com") || lowerUrl.includes("amzn.to")) {
    return "amazon";
  }
  if (lowerUrl.includes("myntra.com")) {
    return "myntra";
  }
  if (lowerUrl.includes("spotify.com")) {
    return "spotify";
  }
  if (lowerUrl.includes("wa.me") || lowerUrl.includes("api.whatsapp.com")) {
    return "whatsapp";
  }
  return "other";
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

  // 4. Referrer Source Attribution (HTTP Referer prioritized, UserAgent fallback)
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
    // Fallback: Infer from In-App Webview signature if Referer header was stripped by mobile OS
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
  const platform = detectPlatform(url);
  const cleanUrl = url.trim();

  switch (platform) {
    case "youtube": {
      let videoId = "";
      if (cleanUrl.includes("youtu.be/")) {
        videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (cleanUrl.includes("v=")) {
        videoId = cleanUrl.split("v=")[1]?.split("&")[0] || "";
      }

      if (videoId) {
        return {
          platform: "youtube",
          deepLinkAndroid: `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`,
          deepLinkIos: `vnd.youtube://watch?v=${videoId}`,
          fallbackUrl: cleanUrl,
        };
      }

      const stripped = cleanUrl.replace(/^https?:\/\//, "");
      return {
        platform: "youtube",
        deepLinkAndroid: `intent://${stripped}#Intent;package=com.google.android.youtube;scheme=https;end`,
        deepLinkIos: `vnd.youtube://${stripped}`,
        fallbackUrl: cleanUrl,
      };
    }

    case "instagram": {
      return {
        platform: "instagram",
        deepLinkAndroid: `intent://${cleanUrl.replace(/^https?:\/\//, "")}#Intent;package=com.instagram.android;scheme=https;end`,
        deepLinkIos: cleanUrl.replace("https://www.instagram.com/", "instagram://").replace("https://instagram.com/", "instagram://"),
        fallbackUrl: cleanUrl,
      };
    }

    case "telegram": {
      let username = "";
      if (cleanUrl.includes("t.me/")) {
        username = cleanUrl.split("t.me/")[1]?.split("?")[0]?.split("/")[0] || "";
      }
      return {
        platform: "telegram",
        deepLinkAndroid: username ? `tg://resolve?domain=${username}` : `intent://${cleanUrl.replace(/^https?:\/\//, "")}#Intent;package=org.telegram.messenger;scheme=https;end`,
        deepLinkIos: username ? `tg://resolve?domain=${username}` : cleanUrl,
        fallbackUrl: cleanUrl,
      };
    }

    case "amazon": {
      const stripped = cleanUrl.replace(/^https?:\/\//, "");
      return {
        platform: "amazon",
        deepLinkAndroid: `intent://${stripped}#Intent;package=in.amazon.mShop.android.shopping;scheme=https;end`,
        deepLinkIos: `com.amazon.mobile.shopping.web://${stripped}`,
        fallbackUrl: cleanUrl,
      };
    }

    case "myntra": {
      const stripped = cleanUrl.replace(/^https?:\/\//, "");
      return {
        platform: "myntra",
        deepLinkAndroid: `intent://${stripped}#Intent;package=com.myntra.android;scheme=https;end`,
        deepLinkIos: `myntra://${stripped}`,
        fallbackUrl: cleanUrl,
      };
    }

    case "spotify": {
      return {
        platform: "spotify",
        deepLinkAndroid: `intent://${cleanUrl.replace(/^https?:\/\//, "")}#Intent;package=com.spotify.music;scheme=https;end`,
        deepLinkIos: cleanUrl.replace("https://open.spotify.com/", "spotify://"),
        fallbackUrl: cleanUrl,
      };
    }

    default: {
      return {
        platform: "other",
        fallbackUrl: cleanUrl,
      };
    }
  }
}
