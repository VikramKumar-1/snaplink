"use client";

import React, { memo } from "react";
import { TelegramLogo } from "@/frontend/shared/icons/PlatformIcons";

export const GalleryTelegramCard: React.FC = memo(() => (
  <div className="w-[170px] sm:w-36 md:w-40 lg:w-44 xl:w-48 h-[290px] sm:h-[320px] lg:h-[340px] rounded-2xl bg-white border border-[#e4e2d8] p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_8px_20px_-6px_rgba(0,0,0,0.06)] shrink-0 relative sm:hover:border-sky-400 transition-colors snap-center">
    <div className="flex items-center justify-between">
      <div className="h-8 w-8 rounded-xl bg-[#229ed9] text-white flex items-center justify-center shadow-xs shrink-0">
        <TelegramLogo className="h-5 w-5" />
      </div>
      <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-100">
        tg://
      </span>
    </div>

    <div className="my-auto space-y-2">
      <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e8e6dd] space-y-1 text-center">
        <div className="text-[#121316] font-bold text-[12px] truncate">
          Creator Community
        </div>
        <p className="text-[10px] text-zinc-500 font-mono">
          24.5k Members &middot; Online
        </p>
      </div>
    </div>

    <div className="p-2 rounded-xl bg-[#229ed9] text-white text-center font-bold text-[10.5px] uppercase">
      Join Group
    </div>
  </div>
));
GalleryTelegramCard.displayName = "GalleryTelegramCard";
