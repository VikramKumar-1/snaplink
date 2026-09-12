"use client";

import React, { memo } from "react";
import { ArrowRight, Check } from "lucide-react";

interface BottomProps {
  num?: string;
  isLast: boolean;
}

export const StepCardBottom: React.FC<BottomProps> = memo(({ isLast }) => (
  <div className="pt-3 border-t border-[#f0eee6] flex items-center justify-end">
    {isLast ? (
      <span className="text-emerald-700 font-extrabold flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider">
        <Check className="h-3.5 w-3.5 stroke-[2.5]" /> Direct Handoff
      </span>
    ) : (
      <div className="h-6 w-6 rounded-full bg-[#faf9f5] border border-[#e7e5dc] sm:group-hover:bg-[#2c35af] sm:group-hover:text-white flex items-center justify-center text-zinc-400 transition-all duration-200 sm:group-hover:scale-105">
        <ArrowRight className="h-3 w-3 sm:group-hover:translate-x-0.5 transition-transform" />
      </div>
    )}
  </div>
));

StepCardBottom.displayName = "StepCardBottom";
