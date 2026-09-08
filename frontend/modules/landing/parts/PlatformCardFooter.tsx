"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  bottomStat: string;
}

/** Minimalist Conversion Stat & Interactive Action Bar */
export const PlatformCardFooter: React.FC<FooterProps> = ({ bottomStat }) => (
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
    <div className="h-7 w-7 rounded-full bg-black/[0.04] group-hover:bg-[#2c35af] group-hover:text-white flex items-center justify-center text-zinc-500 transition-all duration-300 group-hover:scale-110">
      <ArrowUpRight className="h-3.5 w-3.5" />
    </div>
  </div>
);
