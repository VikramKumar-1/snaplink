"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { SocialPlatform } from "./SocialPreviewHeader";
import { SocialRawMockup } from "./SocialRawMockup";

export const SocialRawCard: React.FC<{ platform: SocialPlatform }> = React.memo(({ platform }) => (
  <div className="p-4 sm:p-6 md:p-7 rounded-[22px] sm:rounded-[28px] bg-white/75 backdrop-blur-xl border border-rose-200/80 shadow-[inset_0_2px_2px_rgba(255,255,255,0.95),0_12px_28px_-8px_rgba(244,63,94,0.06)] flex flex-col justify-between group transform-gpu">
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4" /> Standard Raw Link
        </span>
        <span className="text-[10px] font-mono text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold">
          LOW CTR
        </span>
      </div>

      <SocialRawMockup platform={platform} />

      <div className="space-y-1.5 text-[12px] text-zinc-600 font-medium mb-3">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] shrink-0 font-bold">✕</span>
          <span>Followers hesitate to tap unknown raw shortlinks</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] shrink-0 font-bold">✕</span>
          <span>Zero product photos, discount badges, or context</span>
        </div>
      </div>
    </div>

    <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-[11.5px] font-bold text-rose-700">
      <span>Average Click-Through: ~4%</span>
      <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md">LOW ENGAGEMENT</span>
    </div>
  </div>
));

SocialRawCard.displayName = "SocialRawCard";
