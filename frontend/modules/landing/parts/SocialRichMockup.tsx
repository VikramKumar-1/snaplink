"use client";

import React, { memo } from "react";
import { SocialPlatform } from "./SocialPreviewHeader";
import { AmazonLogo } from "@/frontend/shared/icons/PlatformIcons";

export const SocialRichMockup: React.FC<{ platform: SocialPlatform }> = memo(({ platform }) => {
  if (platform === "x") {
    return (
      <div className="bg-[#000000] p-3.5 rounded-2xl border border-white/10 mb-4 text-white text-xs">
        <div className="flex items-center gap-1.5 mb-1.5 font-bold">
          <span>@CreatorDeals</span>
          <span className="h-3 w-3 rounded-full bg-sky-500 text-white flex items-center justify-center text-[8px]">✓</span>
          <span className="text-zinc-500 font-normal">&middot; 2m</span>
        </div>
        <p className="text-[11.5px] text-zinc-200 mb-2">Huge drop! Sony Earbuds are 60% OFF 🔥 Tap below to open in Amazon:</p>
        <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
          <div className="relative h-28">
            <img src="/sony-deal.jpg" alt="Sony Earbuds" className="w-full h-full object-cover" />
            <span className="absolute top-2 left-2 bg-red-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded">60% OFF</span>
          </div>
          <div className="p-2 text-[10.5px] font-bold text-zinc-100 truncate">
            <span className="text-zinc-400 font-mono text-[9px] block font-normal">smartlink.to</span>
            Sony Wireless Noise-Cancelling Earbuds
          </div>
        </div>
      </div>
    );
  }

  const isTg = platform === "telegram";
  return (
    <div className={`p-3.5 rounded-2xl border border-white/10 mb-4 ${isTg ? "bg-[#0e1621]" : "bg-[#0c1317]"}`}>
      <div className={`p-3 rounded-xl border space-y-2 max-w-sm text-white shadow-lg ${isTg ? "bg-[#182533] border-[#229ED9]/30" : "bg-[#005c4b] border-emerald-400/20"}`}>
        <div className="relative h-28 rounded-lg overflow-hidden border border-white/15">
          <img src="/sony-deal.jpg" alt="Sony Earbuds" className="w-full h-full object-cover" />
          <span className="absolute top-2 left-2 bg-red-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded">🔥 60% OFF</span>
          <span className="absolute bottom-2 right-2 bg-black/80 text-[#ccff00] text-[8.5px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1"><AmazonLogo className="h-2.5 w-2.5" /> Amazon App</span>
        </div>
        <div className="font-bold text-[11.5px] leading-tight">🔥 60% OFF - Sony Wireless Earbuds</div>
        <div className="text-[9.5px] text-zinc-300 font-mono pt-1 border-t border-white/10 flex justify-between">
          <span>smartlink.to/sony-deal</span>
          <span className={isTg ? "text-sky-300" : "text-[#53bdeb] font-bold"}>{isTg ? "11:42 • 👁 4.8K" : "11:42 AM ✓✓"}</span>
        </div>
      </div>
    </div>
  );
});
SocialRichMockup.displayName = "SocialRichMockup";
