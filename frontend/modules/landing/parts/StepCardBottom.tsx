"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";

interface BottomProps {
  num?: string;
  isLast: boolean;
}

export const StepCardBottom: React.FC<BottomProps> = ({ isLast }) => (
  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
    <div className="flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      <span className="text-[10.5px] font-mono font-semibold text-zinc-400">INSTANT</span>
    </div>
    {!isLast ? (
      <div className="h-6 w-6 rounded-full bg-black/[0.04] group-hover:bg-[#2c35af] group-hover:text-white flex items-center justify-center text-zinc-400 transition-all duration-200 group-hover:scale-110">
        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    ) : (
      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
        <Check className="h-3.5 w-3.5 stroke-[2.5]" /> READY
      </span>
    )}
  </div>
);
