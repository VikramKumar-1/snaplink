"use client";

import React, { memo } from "react";

interface FooterProps {
  bottomStat: string;
}

/** Minimalist Conversion Stat without bottom arrow */
export const PlatformCardFooter: React.FC<FooterProps> = memo(({ bottomStat }) => (
  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_#10b981]" />
      </span>
      <span className="text-[12px] font-bold text-[#121316]">
        {bottomStat}
      </span>
    </div>
  </div>
));

PlatformCardFooter.displayName = "PlatformCardFooter";
