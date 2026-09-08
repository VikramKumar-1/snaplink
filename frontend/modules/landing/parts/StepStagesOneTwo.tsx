"use client";

import React, { memo } from "react";
import { Link2 } from "lucide-react";
import { AppleBrandIcon, AndroidBrandIcon } from "@/frontend/shared/icons/PlatformIcons";

/** Stage 01: Frosted Glass & Claymorphic Input Container */
export const PasteStage: React.FC = memo(() => (
  <div className="rounded-2xl bg-[#faf9f5]/80 border border-[#e7e5dc]/80 p-2.5 shadow-inner">
    <div className="flex items-center justify-between bg-white border border-[#e7e5dc] rounded-xl px-3 py-2 shadow-2xs">
      <div className="flex items-center gap-2 truncate">
        <Link2 className="h-4 w-4 text-[#2c35af] shrink-0" />
        <span className="text-[12px] font-mono text-zinc-700 font-semibold truncate">
          amazon.in/dp/B09V...
        </span>
      </div>
      <span className="text-[10.5px] font-bold bg-[#2c35af] text-white px-2.5 py-1 rounded-lg shrink-0">
        Paste
      </span>
    </div>
  </div>
));
PasteStage.displayName = "PasteStage";

/** Stage 02: Enterprise OS Gateway Matrix */
export const DetectStage: React.FC = memo(() => (
  <div className="rounded-2xl bg-[#faf9f5]/80 border border-[#e7e5dc]/80 p-2.5 shadow-inner">
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center justify-center gap-2 py-2 px-2.5 rounded-xl bg-white border border-[#e7e5dc] text-[11.5px] font-bold text-zinc-800 shadow-2xs">
        <AppleBrandIcon className="h-4 w-4 text-zinc-900" /> <span>iOS Intent</span>
      </div>
      <div className="flex items-center justify-center gap-2 py-2 px-2.5 rounded-xl bg-white border border-[#e7e5dc] text-[11.5px] font-bold text-zinc-800 shadow-2xs">
        <AndroidBrandIcon className="h-4 w-4 text-[#059669]" /> <span>Android</span>
      </div>
    </div>
  </div>
));
DetectStage.displayName = "DetectStage";
