"use client";

import React, { memo } from "react";
import { TrendingUp } from "lucide-react";
import { SocialPlatform } from "./SocialPreviewHeader";
import { SocialRichMockup } from "./SocialRichMockup";

export const SocialRichCard: React.FC<{ platform: SocialPlatform }> = memo(({ platform }) => (
  <div className="w-[280px] sm:w-[320px] md:w-auto shrink-0 md:shrink snap-center p-4 sm:p-6 md:p-7 rounded-[22px] sm:rounded-[28px] clay-glass-hybrid border-indigo-200/90 shadow-[inset_0_2px_2px_rgba(255,255,255,1),0_18px_40px_-10px_rgba(44,53,175,0.12)] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 transform-gpu">
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2c35af] flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#2c35af]" />
          SnapLink Rich Card
        </span>
        <span className="pill-lime text-[10px] font-mono font-bold uppercase px-3 py-0.5 text-black">
          3X HIGHER CTR
        </span>
      </div>

      <SocialRichMockup platform={platform} />

      <div className="space-y-1.5 text-[12px] text-zinc-700 font-medium mb-3">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
          <span>Auto-generates high-resolution, eye-catching visual card</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
          <span>Builds instant buyer trust before they even click</span>
        </div>
      </div>
    </div>

    <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11.5px] font-bold text-[#121316]">
      <span className="flex items-center gap-1.5 text-emerald-700">
        <TrendingUp className="h-4 w-4" /> Average Click-Through: ~18%
      </span>
      <span className="text-[10px] font-mono font-bold bg-[#ccff00] text-black px-2 py-0.5 rounded-md">
        300% BOOST
      </span>
    </div>
  </div>
));

SocialRichCard.displayName = "SocialRichCard";
