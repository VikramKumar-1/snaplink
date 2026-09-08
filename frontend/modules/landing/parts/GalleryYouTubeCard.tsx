"use client";

import React, { memo } from "react";
import { YoutubeLogo } from "@/frontend/shared/icons/PlatformIcons";
import { Play, Bell } from "lucide-react";

export const GalleryYouTubeCard: React.FC = memo(() => (
  <div className="w-[170px] sm:w-40 md:w-48 h-[290px] sm:h-[340px] rounded-2xl bg-white border border-[#e4e2d8] p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_8px_20px_-6px_rgba(0,0,0,0.06)] shrink-0 relative hover:border-red-400 transition-colors snap-center">
    <div className="flex items-center justify-between">
      <YoutubeLogo className="h-8 w-8 shrink-0 drop-shadow-xs" />
      <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-100">
        App
      </span>
    </div>

    <div className="my-auto space-y-2.5">
      <div className="h-24 sm:h-28 rounded-xl bg-zinc-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
        <div className="h-8 w-8 rounded-full bg-[#cc0000] text-white flex items-center justify-center shadow">
          <Play className="h-3.5 w-3.5 fill-white ml-0.5" />
        </div>
        <span className="text-[9.5px] font-mono text-zinc-400 mt-2">4K HDR Stream</span>
      </div>
      <div className="text-[12.5px] sm:text-[13px] font-bold text-[#121316] truncate leading-tight">
        Studio Setup 2026
      </div>
    </div>

    <div className="p-2 rounded-xl bg-[#faf9f5] border border-[#e8e6dd] flex items-center justify-between text-[10.5px] font-bold">
      <div className="flex items-center gap-1.5 text-zinc-800">
        <Bell className="h-3 w-3 text-[#cc0000]" />
        <span>Subscribed</span>
      </div>
      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
        Active
      </span>
    </div>
  </div>
));
GalleryYouTubeCard.displayName = "GalleryYouTubeCard";
