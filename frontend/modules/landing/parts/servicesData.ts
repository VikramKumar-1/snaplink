import React from "react";
import {
  IntentVectorIcon,
  AnalyticsVectorIcon,
  QrVectorIcon,
} from "./FeatureVectorIcons";
import {
  AffiliateVectorIcon,
  BioVectorIcon,
  GlobalVectorIcon,
} from "./FeatureVectorIconsMore";

export interface ServiceItem {
  vector: React.FC;
  badge: string;
  title: string;
  desc: string;
  highlight: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    vector: IntentVectorIcon,
    badge: "Zero Logins",
    title: "Instant App Launch",
    desc: "Bypasses in-app browser walls and opens the official app directly.",
    highlight: "Up to 5.4x higher conversions",
  },
  {
    vector: AnalyticsVectorIcon,
    badge: "Real-Time",
    title: "Live Click & Country Analytics",
    desc: "Track exactly where your visitors come from, their devices, and hourly clicks.",
    highlight: "Clean reports & instant export",
  },
  {
    vector: QrVectorIcon,
    badge: "Vector Quality",
    title: "Custom QR Code Studio",
    desc: "Generate crisp QR codes with your custom brand logo for packaging and posters.",
    highlight: "Free high-res download",
  },
  {
    vector: AffiliateVectorIcon,
    badge: "Earnings Safe",
    title: "Affiliate Commission Protection",
    desc: "Automatically attaches your Amazon affiliate tag so you never lose commissions.",
    highlight: "100% affiliate attribution",
  },
  {
    vector: BioVectorIcon,
    badge: "Creator Pages",
    title: "All-in-One Link in Bio",
    desc: "Showcase your top recommendations, social links, and products on one sleek page.",
    highlight: "Modern Linktree alternative",
  },
  {
    vector: GlobalVectorIcon,
    badge: "Smart Routing",
    title: "Smart Device & Country Routing",
    desc: "Automatically sends iOS users to App Store and Android users to Google Play.",
    highlight: "Targeted app store redirects",
  },
];
