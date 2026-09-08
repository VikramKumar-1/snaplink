"use client";

import React, { memo } from "react";
import { Smartphone, ArrowRight, CheckCircle2 } from "lucide-react";

/** Stage 03: Direct Enterprise Mobile App Handoff */
export const LaunchStage: React.FC = memo(() => (
  <div className="rounded-2xl bg-[#faf9f5]/80 border border-[#e7e5dc]/80 p-2.5 shadow-inner">
    <div className="flex items-center justify-between bg-white border border-[#e7e5dc] rounded-xl px-3 py-2 text-[12px] shadow-2xs">
      <span className="text-zinc-400 line-through text-[11px] font-medium">In-App Browser</span>
      <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
      <span className="font-bold text-[#121316] flex items-center gap-1.5">
        <Smartphone className="h-3.5 w-3.5 text-[#2c35af]" /> Native App
      </span>
    </div>
  </div>
));
LaunchStage.displayName = "LaunchStage";

/** Stage 04: Conversion Impact Dashboard */
export const ConvertStage: React.FC = memo(() => (
  <div className="rounded-2xl bg-[#faf9f5]/80 border border-[#e7e5dc]/80 p-2.5 shadow-inner">
    <div className="flex items-center justify-between bg-white border border-[#e7e5dc] rounded-xl px-3 py-2 shadow-2xs">
      <span className="text-[18px] font-extrabold text-[#121316] tracking-tight leading-none font-mono">
        +340%
      </span>
      <span className="text-[11.5px] font-bold text-emerald-800 flex items-center gap-1.5">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 1-Click Checkout
      </span>
    </div>
  </div>
));
ConvertStage.displayName = "ConvertStage";
