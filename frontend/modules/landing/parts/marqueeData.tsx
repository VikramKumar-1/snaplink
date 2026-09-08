import React from "react";
import { Zap, Tag, QrCode, BarChart3, Smartphone, ShieldCheck, Check } from "lucide-react";
import { MyntraLogo } from "@/frontend/shared/icons/PlatformIcons";

export const MARQUEE_ITEMS = [
  { icon: <span className="p-0.5 rounded-sm bg-white inline-flex items-center justify-center"><MyntraLogo className="w-3.5 h-3.5" /></span>, label: "Myntra & Ajio App Intent", badge: "0-Sec Launch" },
  { icon: <Tag className="w-4 h-4 text-[#ccff00]" />, label: "Amazon Affiliate Auto-Tagging", badge: "Commission Safe" },
  { icon: <Zap className="w-4 h-4 text-[#ccff00]" />, label: "Instagram & YouTube In-App Bypass", badge: "Direct App" },
  { icon: <QrCode className="w-4 h-4 text-[#ccff00]" />, label: "Branded QR Studio with Logo", badge: "Vector SVG" },
  { icon: <BarChart3 className="w-4 h-4 text-[#ccff00]" />, label: "Real-Time Referrer & Geo Analytics", badge: "Sub-10ms" },
  { icon: <Smartphone className="w-4 h-4 text-[#ccff00]" />, label: "Spotify & Telegram Direct Launch", badge: "Native" },
  { icon: <ShieldCheck className="w-4 h-4 text-[#ccff00]" />, label: "Zero Ads & Zero Data Tracking", badge: "Privacy" },
  { icon: <Check className="w-4 h-4 text-[#ccff00] stroke-[3]" />, label: "100% Free Open Protocol", badge: "No Paywall" },
];

export const TRIPLE_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
