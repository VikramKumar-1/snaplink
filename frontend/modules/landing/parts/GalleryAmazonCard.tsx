"use client";

import React, { memo } from "react";
import { AmazonLogo } from "@/frontend/shared/icons/PlatformIcons";

export const GalleryAmazonCard: React.FC = memo(() => (
  <div className="w-[185px] sm:w-48 md:w-56 h-[330px] sm:h-[390px] rounded-2xl bg-white border border-[#e4e2d8] p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_10px_24px_-6px_rgba(0,0,0,0.07)] shrink-0 relative hover:border-amber-400 transition-colors snap-center">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-white border border-amber-200/90 shadow-xs flex items-center justify-center p-1 shrink-0">
          <AmazonLogo className="h-6 w-6" />
        </div>
        <div>
          <span className="text-[12.5px] sm:text-[13px] font-bold text-[#121316] block leading-tight">
            Amazon
          </span>
          <span className="text-[10px] text-zinc-400 block">1-Click Shop</span>
        </div>
      </div>
      <span className="text-[9px] font-bold uppercase bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-100">
        Prime
      </span>
    </div>

    <div className="my-auto rounded-xl bg-[#faf9f5] border border-[#e8e6dd] p-3 space-y-2.5">
      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
        <span className="text-zinc-700 font-bold">Cookies Saved</span>
        <span className="text-amber-600 font-bold">4.8 ★</span>
      </div>
      <div className="p-2.5 rounded-lg bg-white border border-[#e4e2d8] space-y-1.5">
        <div className="text-[11.5px] font-bold text-[#121316] truncate">Sony Headphones ANC</div>
        <div className="py-1 rounded bg-[#ff9900] text-black text-[9.5px] font-extrabold uppercase text-center">
          1-Click Buy with UPI
        </div>
      </div>
    </div>

    <div className="p-2 rounded-xl bg-[#faf9f5] border border-[#e8e6dd] text-center text-[10px] font-bold text-zinc-700">
      +300% Affiliate Retention
    </div>
  </div>
));
GalleryAmazonCard.displayName = "GalleryAmazonCard";
