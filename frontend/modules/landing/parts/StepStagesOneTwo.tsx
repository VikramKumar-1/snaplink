"use client";

import React from "react";
import { Check, Link2, Cpu } from "lucide-react";
import { AppleBrandIcon, AndroidBrandIcon } from "@/frontend/shared/icons/PlatformIcons";

/** Stage 01: Interactive Floating Link Input with Quick Brand Pills */
export const PasteStage: React.FC = () => (
  <div className="rounded-2xl bg-white/90 border border-blue-200/80 p-3 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_4px_14px_-2px_rgba(44,53,175,0.06)]">
    <div className="flex items-center justify-between bg-[#f5f7fc] border border-blue-100/90 rounded-xl px-2.5 py-1.5 mb-2">
      <div className="flex items-center gap-1.5 truncate">
        <Link2 className="h-3.5 w-3.5 text-[#121316] shrink-0" />
        <span className="text-[11.5px] font-mono text-zinc-700 font-semibold truncate">
          amazon.in/dp/B09V...
        </span>
      </div>
      <span className="text-[9.5px] font-bold bg-[#121316] text-white px-2 py-0.5 rounded-lg shrink-0">
        Paste
      </span>
    </div>
    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium pt-1 border-t border-blue-50">
      <span className="flex items-center gap-1 text-blue-700 font-semibold">
        <Check className="h-3 w-3 stroke-[2.5]" /> Auto-Detected
      </span>
      <span className="font-mono text-zinc-400 font-semibold">0.01s</span>
    </div>
  </div>
);

/** Stage 02: Dual OS Gateway Matrix with FontAwesome Apple & Android Icons */
export const DetectStage: React.FC = () => (
  <div className="rounded-2xl bg-white/90 border border-amber-200/80 p-3 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_4px_14px_-2px_rgba(217,119,6,0.06)]">
    <div className="grid grid-cols-2 gap-2 mb-2">
      <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-[#fcf8f0] border border-amber-200/80 text-[11px] font-bold text-[#121316]">
        <AppleBrandIcon className="h-3.5 w-3.5 text-[#121316]" /> <span>iOS App</span>
      </div>
      <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-[#fcf8f0] border border-amber-200/80 text-[11px] font-bold text-[#121316]">
        <AndroidBrandIcon className="h-3.5 w-3.5 text-[#121316]" /> <span>Android</span>
      </div>
    </div>
    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium pt-1 border-t border-amber-50">
      <span className="flex items-center gap-1 text-amber-800 font-semibold">
        <Cpu className="h-3 w-3 stroke-[2.5]" /> Deep-Link Compiled
      </span>
      <span className="text-emerald-600 font-bold font-mono">0ms</span>
    </div>
  </div>
);
