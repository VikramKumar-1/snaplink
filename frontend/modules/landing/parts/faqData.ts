export interface FaqItemData {
  q: string;
  a: string;
}

export const FAQS_DATA: FaqItemData[] = [
  {
    q: "Is SmartDeepLink really 100% free with no hidden charges?",
    a: "Yes! There are zero subscription fees, no credit card required, and no forced countdown ads like OpeninApp. All core features including custom aliases, WhatsApp previews, dynamic QR codes, and analytics are free.",
  },
  {
    q: "Will Instagram, YouTube, or Google ban or flag my links?",
    a: "Never. SmartDeepLink uses official Android App Intents (intent://) and Apple Universal schemes (vnd.youtube://, instagram://). These are official, documented operating system protocols designed specifically by Google and Apple for opening apps safely.",
  },
  {
    q: "How does this increase my YouTube subscribers and sales?",
    a: "When people tap your link inside Instagram or TikTok, those platforms open it in an isolated in-app browser where users are logged out of Google. To subscribe or buy, they must re-enter their email and password—causing 85% to drop off. SmartDeepLink opens the official installed app where users are already logged in, allowing 1-tap likes, subscriptions, and purchases.",
  },
  {
    q: "What is the 'Custom WhatsApp / Twitter Preview' feature?",
    a: "When you share regular short links on WhatsApp, it shows an ugly generic grey box that often looks like spam. With our Custom Preview feature, you can define your own bold headline, description, and thumbnail. When sent on WhatsApp, it renders as a beautiful, rich card—boosting your click-through rates by up to 300%.",
  },
  {
    q: "What happens if a user doesn't have the mobile app installed?",
    a: "We have built-in safe fallback routing. If the user does not have the native mobile app installed (or is on a laptop/desktop), our engine automatically opens the standard web destination within 1 second. Your audience will never see an error or broken link.",
  },
];
