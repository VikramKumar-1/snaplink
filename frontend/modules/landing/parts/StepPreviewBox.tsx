"use client";

import React from "react";
import { Zap, CheckCircle2, Smartphone, ArrowRight } from "lucide-react";

export const PastePreview = () => (
  <div className="rounded-2xl bg-white/90 border border-black/[0.06] p-3.5 shadow-[inset_0_2px_3px_rgba(255,255,255,0.9),0_4px_12px_-4px_rgba(0,0,0,0.06)]">
    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2">
      <span>PASTE YOUR LINK</span>
      <kbd className="text-[#2c35af] bg-[#2c35af]/8 px-1.5 py-0.5 rounded font-bold">⌘V</kbd>
    </div>
    <div className="bg-[#f5f4ef] rounded-xl px-3 py-2.5 border border-[#e7e5dc] font-mono text-[11.5px] text-[#2c35af] truncate">
      <span className="text-zinc-400 mr-1.5">↳</span>amazon.in/dp/B09V3KXJPB?ref=sr
    </div>
  </div>
);

export const DetectPreview = () => (
  <div className="rounded-2xl bg-white/90 border border-black/[0.06] p-3.5 shadow-[inset_0_2px_3px_rgba(255,255,255,0.9),0_4px_12px_-4px_rgba(0,0,0,0.06)]">
    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2">
      <span>ROUTING ENGINE</span>
      <span className="text-emerald-600 font-bold flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
      </span>
    </div>
    <div className="flex items-center gap-2 text-[10.5px] font-mono">
      <span className="px-2 py-1.5 rounded-lg bg-[#2c35af]/8 text-[#2c35af] font-bold border border-[#2c35af]/15">
        <Smartphone className="h-3 w-3 inline mr-1" />iOS
      </span>
      <ArrowRight className="h-3 w-3 text-zinc-300" />
      <span className="px-2 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
        Universal Link
      </span>
    </div>
  </div>
);

export const LaunchPreview = () => (
  <div className="rounded-2xl bg-white/90 border border-black/[0.06] p-3.5 shadow-[inset_0_2px_3px_rgba(255,255,255,0.9),0_4px_12px_-4px_rgba(0,0,0,0.06)]">
    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
      <span className="text-zinc-400 line-through">5s Countdown Ads</span>
      <span className="text-emerald-600 font-bold">BYPASSED</span>
    </div>
    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-center font-bold text-[12px] flex items-center justify-center gap-1.5">
      <Zap className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
      0.0s Native Launch
    </div>
  </div>
);

export const ScalePreview = () => (
  <div className="rounded-2xl bg-white/90 border border-black/[0.06] p-3.5 shadow-[inset_0_2px_3px_rgba(255,255,255,0.9),0_4px_12px_-4px_rgba(0,0,0,0.06)]">
    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
      <span className="text-zinc-400">RETENTION</span>
      <span className="text-[#2c35af] font-bold">+340%</span>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="p-2 rounded-lg bg-[#f5f4ef] border border-[#e7e5dc] text-center">
        <div className="text-[9px] text-zinc-400 font-mono">CLICKS</div>
        <div className="text-[15px] font-bold text-[#121316]">12.4K</div>
      </div>
      <div className="p-2 rounded-lg bg-[#ccff00]/15 border border-[#ccff00]/30 text-center">
        <div className="text-[9px] text-zinc-400 font-mono">CONVERSIONS</div>
        <div className="text-[15px] font-bold text-[#121316]">8.2K</div>
      </div>
    </div>
  </div>
);
