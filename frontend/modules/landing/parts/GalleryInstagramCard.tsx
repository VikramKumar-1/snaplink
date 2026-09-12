"use client";

import React, { memo } from "react";
import { InstagramLogo } from "@/frontend/shared/icons/PlatformIcons";
import { Heart } from "lucide-react";

export const GalleryInstagramCard: React.FC = memo(() => (
  <div className="w-[185px] sm:w-40 md:w-44 lg:w-48 xl:w-52 h-[330px] sm:h-[360px] lg:h-[390px] rounded-2xl bg-white border border-[#e4e2d8] p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_10px_24px_-6px_rgba(0,0,0,0.07)] shrink-0 relative sm:hover:border-pink-400 transition-colors snap-center">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <InstagramLogo className="h-8 w-8 shrink-0 rounded-xl shadow-xs" />
        <div>
          <span className="text-[12.5px] sm:text-[13px] font-bold text-[#121316] block leading-tight">
            Instagram
          </span>
          <span className="text-[10px] text-zinc-400 block">@creator</span>
        </div>
      </div>
      <span className="h-2 w-2 rounded-full bg-[#E1306C]" />
    </div>

    <div className="my-auto rounded-xl bg-[#faf9f5] border border-[#e8e6dd] p-3 space-y-2.5">
      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
        <span className="text-[#2c35af] font-bold">Direct Reel</span>
        <span>1080p</span>
      </div>
      <div className="p-3 rounded-lg bg-white border border-[#e4e2d8] flex items-center justify-between text-[11px] font-bold">
        <span className="text-[#121316] truncate">Fall Collection Drop</span>
        <div className="flex items-center gap-1 text-rose-500 shrink-0">
          <Heart className="h-3 w-3 fill-rose-500" />
          <span className="text-[10px]">54k</span>
        </div>
      </div>
    </div>

    <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e8e6dd] text-center text-[10px] font-mono font-bold text-[#121316]">
      instagram://reel
    </div>
  </div>
));
GalleryInstagramCard.displayName = "GalleryInstagramCard";
