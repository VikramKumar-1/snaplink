"use client";

import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { TRIPLE_ITEMS } from "./parts/marqueeData";

export const ServiceMarquee: React.FC = memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div 
      className="w-full overflow-hidden py-3.5 sm:py-4 my-2 sm:my-4 relative select-none rounded-none sm:rounded-2xl bg-[#2c35af] shadow-md sm:shadow-lg shadow-indigo-950/20 border-y sm:border border-indigo-400/25 transform-gpu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Desktop gradients (hidden on mobile so text is fully visible edge-to-edge) */}
      <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#2c35af] to-transparent z-10 pointer-events-none" />
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#2c35af] to-transparent z-10 pointer-events-none" />

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
            <span className="text-[#ccff00]/40 text-xs ml-4 select-none">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

ServiceMarquee.displayName = "ServiceMarquee";
