"use client";

import React, { memo } from "react";
import { ArrowRight } from "lucide-react";

export const HeroCopy: React.FC = memo(() => (
  <div className="lg:col-span-5 text-left relative">
    <div className="inline-flex items-center gap-2 mb-3">
      <span className="text-[#2c35af] text-[22px] font-black leading-none animate-spin-slow">✱</span>
      <span className="text-[11.5px] font-mono font-black uppercase tracking-widest text-[#2c35af]">
        Native App Intent Engine
      </span>
    </div>

    <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold tracking-tight text-[#121316] leading-[1.1] uppercase">
      LEVEL UP YOUR LINKS{" "}
      <span className="inline-flex items-center align-middle mx-1 px-3 py-0.5 rounded-full pill-lime text-[15px] sm:text-[18px]">
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
      </span>{" "}
      DIRECT TO APPS
    </h1>

    <p className="mt-4 text-[15px] sm:text-[16px] text-zinc-600 font-medium leading-relaxed">
      Open YouTube, Instagram, Telegram, Amazon & Myntra directly in official mobile apps. Bypass in-app browser password traps with 0-second intent.
    </p>

    <div className="mt-6 space-y-2.5 text-[13px] font-bold text-zinc-700">
      <div className="flex items-center gap-2">
        <span className="h-5 w-5 rounded-full bg-[#ccff00] text-black flex items-center justify-center text-xs font-black shrink-0">✓</span>
        <span>Zero Google & Instagram login wall drop-offs</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-5 w-5 rounded-full bg-[#ccff00] text-black flex items-center justify-center text-xs font-black shrink-0">✓</span>
        <span>100% Free with zero interstitial ads</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-5 w-5 rounded-full bg-[#ccff00] text-black flex items-center justify-center text-xs font-black shrink-0">✓</span>
        <span>Affiliate cookies & 1-Click UPI preserved</span>
      </div>
    </div>
  </div>
));

HeroCopy.displayName = "HeroCopy";
