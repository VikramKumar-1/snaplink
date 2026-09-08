"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Zap, ShoppingBag, Sparkles, Smartphone, 
  ShieldCheck, BarChart3, QrCode, Tag 
} from "lucide-react";
import { MyntraLogo } from "@/frontend/shared/icons/PlatformIcons";

const MARQUEE_ITEMS = [
  { icon: <span className="p-0.5 rounded-sm bg-white inline-flex items-center justify-center"><MyntraLogo className="w-3.5 h-3.5" /></span>, label: "Myntra & Ajio App Intent", badge: "0-Sec Launch" },
  { icon: <Tag className="w-4 h-4 text-[#ccff00]" />, label: "Amazon Affiliate Auto-Tagging", badge: "Commission Safe" },
  { icon: <Zap className="w-4 h-4 text-[#ccff00]" />, label: "Instagram & YouTube In-App Bypass", badge: "Direct App" },
  { icon: <QrCode className="w-4 h-4 text-[#ccff00]" />, label: "Branded QR Studio with Logo", badge: "Vector SVG" },
  { icon: <BarChart3 className="w-4 h-4 text-[#ccff00]" />, label: "Real-Time Referrer & Geo Analytics", badge: "Sub-10ms" },
  { icon: <Smartphone className="w-4 h-4 text-[#ccff00]" />, label: "Spotify & Telegram Direct Launch", badge: "Native" },
  { icon: <ShieldCheck className="w-4 h-4 text-[#ccff00]" />, label: "Zero Ads & Zero Data Tracking", badge: "Privacy" },
  { icon: <Sparkles className="w-4 h-4 text-[#ccff00]" />, label: "100% Free Open Protocol", badge: "No Paywall" },
];

const TRIPLE_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export const ServiceMarquee: React.FC = React.memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div 
      className="w-full overflow-hidden py-3.5 sm:py-4 my-4 relative select-none rounded-2xl bg-[#2c35af] shadow-lg shadow-indigo-950/20 border border-indigo-400/25 transform-gpu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#2c35af] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#2c35af] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-8 sm:gap-10 w-max transform-gpu will-change-transform"
        animate={{ x: isHovered ? undefined : ["0%", "-33.33%"] }}
        transition={{
          ease: "linear",
          duration: 48,
          repeat: Infinity,
        }}
      >
        {TRIPLE_ITEMS.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <span className="text-[14px] sm:text-[14.5px] font-semibold text-[#ccff00] tracking-normal whitespace-nowrap antialiased">
              {item.label}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 hidden sm:inline-block">
              {item.badge}
            </span>
            <span className="text-[#ccff00]/40 text-xs ml-4 select-none">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

ServiceMarquee.displayName = "ServiceMarquee";
