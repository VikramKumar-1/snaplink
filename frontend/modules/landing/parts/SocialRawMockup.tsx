"use client";

import React from "react";
import { SocialPlatform } from "./SocialPreviewHeader";

export const SocialRawMockup: React.FC<{ platform: SocialPlatform }> = ({ platform }) => {
  if (platform === "x") {
    return (
      <div className="bg-[#000000] p-3.5 rounded-2xl border border-white/10 mb-4 text-white text-xs">
        <div className="flex items-center gap-1.5 mb-1.5 text-zinc-400">
          <span className="font-bold text-white">@RawPoster</span>
          <span>&middot; 2m</span>
        </div>
        <div className="text-sky-400 font-mono text-[11px] mb-2 truncate">https://bit.ly/3x89aQz...</div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2 text-center text-[10px] text-zinc-500">
          [Card Unavailable] Blank thumbnail
        </div>
        <div className="text-[10px] text-zinc-500 mt-2 font-mono">1 Repost &bull; 0 Likes</div>
      </div>
    );
  }

  const isTg = platform === "telegram";
  return (
    <div className={`p-3.5 rounded-2xl border border-white/10 mb-4 ${isTg ? "bg-[#0e1621]" : "bg-[#0c1317]"}`}>
      <div className={`p-3 rounded-xl border border-white/5 space-y-1.5 max-w-sm ${isTg ? "bg-[#212d3b]" : "bg-[#202c33]"}`}>
        <div className="text-sky-400 text-[11.5px] font-mono truncate">https://bit.ly/3x89aQz-product...</div>
        <div className="h-20 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center text-zinc-400 text-[10.5px] p-2 text-center">
          <span className="font-semibold text-zinc-400">[No Custom Thumbnail]</span>
          <span className="text-[9.5px] text-zinc-500">Generic site metadata or blank gray box</span>
        </div>
        <div className="text-[10px] text-zinc-500 flex justify-between font-mono">
          <span>Bitly URL Shortener</span>
          <span>{isTg ? "11:41 • 👁 890" : "11:41 AM ✓"}</span>
        </div>
      </div>
    </div>
  );
};
