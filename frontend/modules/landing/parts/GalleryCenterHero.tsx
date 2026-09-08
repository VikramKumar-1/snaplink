"use client";

import React, { memo } from "react";
import { Smartphone, CheckCircle2 } from "lucide-react";

export const GalleryCenterHero: React.FC = memo(() => (
  <div className="w-[215px] sm:w-60 md:w-72 h-[360px] sm:h-[440px] rounded-[30px] sm:rounded-[36px] bg-[#2c35af] border-2 border-white text-white p-4 sm:p-6 flex flex-col justify-between shadow-[0_20px_45px_-6px_rgba(44,53,175,0.4)] relative shrink-0 z-20 snap-center">
    <div className="relative z-10 flex flex-col items-center">
      <div className="h-4 sm:h-4.5 w-20 sm:w-24 rounded-full bg-black border border-white/20 flex items-center justify-between px-2.5 mb-2 shadow-inner">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] animate-pulse" />
        <div className="flex items-center gap-1"><span className="h-1 w-1 rounded-full bg-white/60" /><span className="h-1 w-1 rounded-full bg-white/60" /></div>
      </div>
      <div className="flex items-center justify-between w-full text-[9.5px] sm:text-[10px] font-mono uppercase tracking-widest text-white/80 font-bold">
        <span>App Intent Router</span><span className="text-[#ccff00] font-black">0s Delay</span>
      </div>
    </div>

    <div className="my-auto space-y-2.5 sm:space-y-3">
      <div className="p-2 sm:p-3 rounded-xl bg-black/25 border border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] font-medium text-white/90">
        <div className="flex items-center gap-1.5 text-rose-300 font-bold truncate">
          <span className="h-3 w-3 rounded-full bg-rose-500/30 flex items-center justify-center text-[8px]">✕</span>
          <span>Webview Trap</span>
        </div>
        <span className="text-rose-300 font-bold text-[9px] font-mono shrink-0">85% Drop</span>
      </div>

      <div className="p-2.5 sm:p-3 rounded-2xl bg-white/15 border border-white/25 space-y-2 shadow-sm">
        <div className="flex items-center justify-between text-[10.5px] sm:text-[12px] font-bold text-white">
          <div className="flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5 text-[#ccff00]" /><span>Opens Official App</span></div>
          <span className="text-[#ccff00] text-[9.5px] font-mono font-bold">Instant</span>
        </div>
        <div className="p-2 rounded-xl bg-white text-[#121316] flex items-center justify-between text-[10px] sm:text-[11px] font-bold shadow-xs">
          <div className="flex items-center gap-1 truncate"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /><span className="truncate">Fans Stay Logged In</span></div>
          <span className="text-[9px] font-mono text-zinc-500 shrink-0">1-Tap</span>
        </div>
      </div>
    </div>

    <div className="pt-2 border-t border-white/20 text-center">
      <div className="text-[12px] sm:text-[15px] font-bold text-white uppercase tracking-tight leading-tight">
        Fans Stay Logged In. <br />
        <span className="text-[#ccff00] font-extrabold">Zero Bounce Rate.</span>
      </div>
    </div>
  </div>
));
GalleryCenterHero.displayName = "GalleryCenterHero";
