import {
  YoutubeLogo,
  InstagramLogo,
  AmazonLogo,
  MyntraLogo,
  FlipkartLogo,
  ShopifyLogo,
} from "@/frontend/shared/icons/PlatformIcons";

export interface PlatformItem {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  category: string;
  description: string;
  sourceUrl: string;
  targetApp: string;
  hoverGlow: string;
  accentColor: string;
  bottomStat: string;
}

export const platformList: PlatformItem[] = [
  {
    id: "amazon",
    name: "Amazon",
    icon: AmazonLogo,
    category: "Shopping",
    description: "Opens directly in the Amazon app with 1-click Prime checkout and full affiliate cookies.",
    sourceUrl: "amazon.in/dp/...",
    targetApp: "Amazon App",
    hoverGlow: "hover:shadow-amber-500/20",
    accentColor: "text-amber-600",
    bottomStat: "+340% Checkout Rate",
  },
  {
    id: "flipkart",
    name: "Flipkart",
    icon: FlipkartLogo,
    category: "Marketplace",
    description: "Opens the Flipkart app with saved cards, SuperCoins, and active cart continuity.",
    sourceUrl: "flipkart.com/p/...",
    targetApp: "Flipkart App",
    hoverGlow: "hover:shadow-blue-500/20",
    accentColor: "text-blue-600",
    bottomStat: "94% In-App Retention",
  },
  {
    id: "myntra",
    name: "Myntra",
    icon: MyntraLogo,
    category: "Fashion",
    description: "Direct add-to-bag flow in Myntra with VIP creator discounts and tracked commissions.",
    sourceUrl: "myntra.com/p/...",
    targetApp: "Myntra App",
    hoverGlow: "hover:shadow-pink-500/20",
    accentColor: "text-[#FF3F6C]",
    bottomStat: "3.2x Faster Conversion",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: YoutubeLogo,
    category: "Video & Shorts",
    description: "Plays directly in full HD in the official YouTube app with 1-tap subscribe active.",
    sourceUrl: "youtu.be/clip...",
    targetApp: "YouTube App",
    hoverGlow: "hover:shadow-red-500/20",
    accentColor: "text-red-600",
    bottomStat: "4.8x Subscriptions",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: InstagramLogo,
    category: "Social",
    description: "Opens profiles and reels directly in-app with instant follow, DM, and audio saving.",
    sourceUrl: "instagram.com/reel/...",
    targetApp: "Instagram App",
    hoverGlow: "hover:shadow-purple-500/20",
    accentColor: "text-purple-600",
    bottomStat: "91% Follow-Through",
  },
  {
    id: "shopify",
    name: "Shopify",
    icon: ShopifyLogo,
    category: "D2C Brands",
    description: "Zero-bounce express checkout with pre-filled autofill, Apple Pay, and UPI.",
    sourceUrl: "brand.store/pay...",
    targetApp: "Shop / UPI App",
    hoverGlow: "hover:shadow-emerald-500/20",
    accentColor: "text-emerald-600",
    bottomStat: "78% Less Abandonment",
  },
];
