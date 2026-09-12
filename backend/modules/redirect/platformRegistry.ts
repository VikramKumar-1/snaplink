export interface PlatformDefinition {
  id: string;
  name: string;
  domains: string[];
  androidPackage?: string;
  appStoreId?: string;
  iosSchemePrefix?: string;
  customAndroidIntent?: (cleanUrl: string) => string;
  customIosDeepLink?: (cleanUrl: string) => string;
}

export const PLATFORM_REGISTRY: PlatformDefinition[] = [
  // ==========================================
  // 1. VIDEO & SOCIAL
  // ==========================================
  {
    id: "youtube",
    name: "YouTube",
    domains: ["youtube.com", "youtu.be"],
    androidPackage: "com.google.android.youtube",
    appStoreId: "544007664",
    customAndroidIntent: (cleanUrl) => {
      let videoId = "";
      if (cleanUrl.includes("youtu.be/")) {
        videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (cleanUrl.includes("v=")) {
        videoId = cleanUrl.split("v=")[1]?.split("&")[0] || "";
      }
      return videoId
        ? `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`
        : `intent://${cleanUrl.replace(/^https?:\/\//, "")}#Intent;package=com.google.android.youtube;scheme=https;end`;
    },
    customIosDeepLink: (cleanUrl) => {
      let videoId = "";
      if (cleanUrl.includes("youtu.be/")) {
        videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (cleanUrl.includes("v=")) {
        videoId = cleanUrl.split("v=")[1]?.split("&")[0] || "";
      }
      return videoId ? `vnd.youtube://watch?v=${videoId}` : `vnd.youtube://${cleanUrl.replace(/^https?:\/\//, "")}`;
    },
  },
  {
    id: "instagram",
    name: "Instagram",
    domains: ["instagram.com"],
    androidPackage: "com.instagram.android",
    appStoreId: "389801252",
    iosSchemePrefix: "instagram://",
    customIosDeepLink: (cleanUrl) =>
      cleanUrl.replace("https://www.instagram.com/", "instagram://").replace("https://instagram.com/", "instagram://"),
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    domains: ["twitter.com", "x.com", "t.co"],
    androidPackage: "com.twitter.android",
    appStoreId: "333903271",
    iosSchemePrefix: "twitter://",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    domains: ["linkedin.com"],
    androidPackage: "com.linkedin.android",
    appStoreId: "288429040",
    iosSchemePrefix: "linkedin://",
  },
  {
    id: "facebook",
    name: "Facebook",
    domains: ["facebook.com", "fb.me", "fb.watch"],
    androidPackage: "com.facebook.katana",
    appStoreId: "284882215",
    iosSchemePrefix: "fb://",
  },
  {
    id: "reddit",
    name: "Reddit",
    domains: ["reddit.com", "redd.it"],
    androidPackage: "com.reddit.frontpage",
    appStoreId: "1064216828",
    iosSchemePrefix: "reddit://",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    domains: ["snapchat.com"],
    androidPackage: "com.snapchat.android",
    appStoreId: "447188370",
    iosSchemePrefix: "snapchat://",
  },
  {
    id: "discord",
    name: "Discord",
    domains: ["discord.com", "discord.gg"],
    androidPackage: "com.discord",
    appStoreId: "985746746",
    iosSchemePrefix: "discord://",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    domains: ["pinterest.com", "pin.it"],
    androidPackage: "com.pinterest",
    appStoreId: "429047995",
    iosSchemePrefix: "pinterest://",
  },
  {
    id: "threads",
    name: "Threads",
    domains: ["threads.net"],
    androidPackage: "com.instagram.barcelona",
    appStoreId: "6446901476",
    iosSchemePrefix: "barcelona://",
  },
  {
    id: "telegram",
    name: "Telegram",
    domains: ["t.me", "telegram.me"],
    androidPackage: "org.telegram.messenger",
    appStoreId: "686449807",
    customAndroidIntent: (cleanUrl) => {
      const username = cleanUrl.includes("t.me/") ? cleanUrl.split("t.me/")[1]?.split("?")[0]?.split("/")[0] : "";
      return username ? `tg://resolve?domain=${username}` : `intent://${cleanUrl.replace(/^https?:\/\//, "")}#Intent;package=org.telegram.messenger;scheme=https;end`;
    },
    customIosDeepLink: (cleanUrl) => {
      const username = cleanUrl.includes("t.me/") ? cleanUrl.split("t.me/")[1]?.split("?")[0]?.split("/")[0] : "";
      return username ? `tg://resolve?domain=${username}` : cleanUrl;
    },
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    domains: ["wa.me", "api.whatsapp.com"],
    androidPackage: "com.whatsapp",
    appStoreId: "310633997",
    iosSchemePrefix: "whatsapp://",
  },

  // ==========================================
  // 2. SHOPPING & COMMERCE
  // ==========================================
  {
    id: "amazon",
    name: "Amazon",
    domains: ["amazon.in", "amazon.com", "amzn.to"],
    androidPackage: "in.amazon.mShop.android.shopping",
    appStoreId: "297606951",
    customIosDeepLink: (cleanUrl) => `com.amazon.mobile.shopping.web://${cleanUrl.replace(/^https?:\/\//, "")}`,
  },
  {
    id: "flipkart",
    name: "Flipkart",
    domains: ["flipkart.com", "dl.flipkart.com"],
    androidPackage: "com.flipkart.android",
    appStoreId: "742044692",
    iosSchemePrefix: "flipkart://",
  },
  {
    id: "myntra",
    name: "Myntra",
    domains: ["myntra.com"],
    androidPackage: "com.myntra.android",
    appStoreId: "907394059",
    iosSchemePrefix: "myntra://",
  },
  {
    id: "meesho",
    name: "Meesho",
    domains: ["meesho.com"],
    androidPackage: "com.meesho.supply",
    appStoreId: "1457958492",
    iosSchemePrefix: "meesho://",
  },
  {
    id: "ajio",
    name: "Ajio",
    domains: ["ajio.com"],
    androidPackage: "com.ril.ajio",
    appStoreId: "1113425388",
    iosSchemePrefix: "ajio://",
  },
  {
    id: "nykaa",
    name: "Nykaa",
    domains: ["nykaa.com"],
    androidPackage: "com.fsn.nykaa",
    appStoreId: "1670078864",
    iosSchemePrefix: "nykaa://",
  },
  {
    id: "swiggy",
    name: "Swiggy",
    domains: ["swiggy.com"],
    androidPackage: "in.swiggy.android",
    appStoreId: "989506690",
    iosSchemePrefix: "swiggy://",
  },
  {
    id: "zomato",
    name: "Zomato",
    domains: ["zomato.com"],
    androidPackage: "com.application.zomato",
    appStoreId: "434613896",
    iosSchemePrefix: "zomato://",
  },

  // ==========================================
  // 3. MUSIC & STREAMING
  // ==========================================
  {
    id: "spotify",
    name: "Spotify",
    domains: ["spotify.com"],
    androidPackage: "com.spotify.music",
    appStoreId: "324684580",
    customIosDeepLink: (cleanUrl) => cleanUrl.replace("https://open.spotify.com/", "spotify://"),
  },
  {
    id: "applemusic",
    name: "Apple Music",
    domains: ["music.apple.com"],
    androidPackage: "com.apple.android.music",
    appStoreId: "1108187390",
    iosSchemePrefix: "music://",
  },
  {
    id: "jiosaavn",
    name: "JioSaavn",
    domains: ["jiosaavn.com"],
    androidPackage: "com.jio.media.jiobeats",
    appStoreId: "441813332",
    iosSchemePrefix: "jiosaavn://",
  },
  {
    id: "gaana",
    name: "Gaana",
    domains: ["gaana.com"],
    androidPackage: "com.gaana",
    appStoreId: "585270521",
    iosSchemePrefix: "gaana://",
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    domains: ["soundcloud.com"],
    androidPackage: "com.soundcloud.android",
    appStoreId: "336353151",
    iosSchemePrefix: "soundcloud://",
  },

  // ==========================================
  // 4. TECH, DEV & APP STORES
  // ==========================================
  {
    id: "github",
    name: "GitHub",
    domains: ["github.com"],
    androidPackage: "com.github.android",
    appStoreId: "1477376905",
    iosSchemePrefix: "github://",
  },
  {
    id: "playstore",
    name: "Google Play Store",
    domains: ["play.google.com"],
    customAndroidIntent: (cleanUrl) => {
      const pkg = cleanUrl.includes("id=") ? cleanUrl.split("id=")[1]?.split("&")[0] : "";
      return pkg ? `market://details?id=${pkg}` : cleanUrl;
    },
  },
  {
    id: "appstore",
    name: "Apple App Store",
    domains: ["apps.apple.com", "itunes.apple.com"],
    customIosDeepLink: (cleanUrl) => `itms-apps://${cleanUrl.replace(/^https?:\/\//, "")}`,
  },
  {
    id: "medium",
    name: "Medium",
    domains: ["medium.com"],
    androidPackage: "com.medium.reader",
    appStoreId: "828256236",
    iosSchemePrefix: "medium://",
  },
];

export function findPlatformByUrl(url: string): PlatformDefinition | undefined {
  const lowerUrl = url.toLowerCase();
  return PLATFORM_REGISTRY.find((p) => p.domains.some((domain) => lowerUrl.includes(domain)));
}
