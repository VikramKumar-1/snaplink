"use client";

import React from "react";
import { Zap, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

/** Stage 03: Direct 0s Native App Open Bypass */
export const LaunchStage: React.FC = () => (
  <div className="rounded-2xl bg-white/90 border border-purple-200/80 p-3 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_4px_14px_-2px_rgba(147,51,234,0.06)]">
    <div className="flex items-center justify-between bg-[#f8f5fc] border border-purple-100 rounded-xl px-2.5 py-1.5 mb-2 text-[11px]">
      <span className="text-zinc-400 line-through text-[10px]">Browser Login</span>
      <ArrowRight className="h-3 w-3 text-purple-400" />
      <span className="font-bold text-[#121316] flex items-center gap-1">
        <Zap className="h-3 w-3 fill-amber-400 text-amber-500" /> Native App
      </span>
    </div>
    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium pt-1 border-t border-purple-50">
      <span className="flex items-center gap-1 text-purple-800 font-semibold">
        <ShieldCheck className="h-3 w-3 stroke-[2.5]" /> Zero Login Prompts
      </span>
      <span className="text-purple-700 font-bold font-mono">0.0s</span>
    </div>
  </div>
);

/** Stage 04: Conversion Retention Surge Dashboard */
export const ConvertStage: React.FC = () => (
  <div className="rounded-2xl bg-white/90 border border-emerald-200/80 p-3 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_4px_14px_-2px_rgba(16,185,129,0.06)]">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-baseline gap-1.5">
        <span className="text-[20px] font-extrabold text-[#121316] tracking-tight leading-none">
          +340%
        </span>
        <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-md">
          Surge
        </span>
      </div>
      <span className="text-[10.5px] font-bold text-zinc-700 flex items-center gap-1">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 1-Click Pay
      </span>
    </div>
    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium pt-1 border-t border-emerald-50">
      <span className="text-zinc-600 font-medium">Logged-In Cart Active</span>
      <span className="text-emerald-700 font-bold font-mono">Retained</span>
    </div>
  </div>
);
