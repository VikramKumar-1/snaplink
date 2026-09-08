"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Smartphone, ShieldAlert, TrendingUp, Lock, Unlock, ArrowRight } from "lucide-react";
import { YoutubeLogo } from "@/frontend/shared/icons/PlatformIcons";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

export const ComparisonWidget: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<"after" | "before">("after");
  const handleSetBefore = React.useCallback(() => setActiveTab("before"), []);
  const handleSetAfter = React.useCallback(() => setActiveTab("after"), []);

  return (
    <section id="comparison" className="w-full max-w-6xl mx-auto px-4 py-2">
      {/* Section Header: Crisp, Clean Heading with Brand Color Accent */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-[24px] sm:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto">
          Why 80% of In-App Traffic <span className="text-[#2c35af]">Drops Off</span>
        </h2>
      </div>

      {/* Mobile Toggle Bar */}
      <div className="flex sm:hidden justify-center mb-6">
        <div className="inline-flex p-1 rounded-xl bg-[#e7e5dc] border border-[#d6d3c7]">
          <button
            onClick={handleSetBefore}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition ${
              activeTab === "before"
                ? "bg-[#121316] text-white shadow-xs"
                : "text-zinc-600 hover:text-black"
            }`}
          >
            Without {BRAND_CONFIG.name}
          </button>
          <button
            onClick={handleSetAfter}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition ${
              activeTab === "after"
                ? "pill-lime text-black shadow-xs"
                : "text-zinc-600 hover:text-black"
            }`}
          >
            With {BRAND_CONFIG.name}
          </button>
        </div>
      </div>

      {/* Side by Side Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {/* The Trap (Without SmartLink - Left Card) */}
        <div
          className={`p-4 sm:p-6 md:p-7 rounded-[22px] sm:rounded-[28px] clay-card-glass flex flex-col justify-between ${
            activeTab === "before" ? "block" : "hidden sm:flex"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-xs" />
                <h3 className="text-[13px] font-bold text-rose-700 flex items-center gap-1.5 uppercase tracking-wide">
                  <Lock className="h-3.5 w-3.5" />
                  Instagram In-App Webview Trap
                </h3>
              </div>
              <span className="text-[10.5px] font-mono font-semibold uppercase px-2.5 py-1 rounded-full bg-[#f5f4ef] text-zinc-600 border border-[#e7e5dc] clay-badge">
                Standard Link
              </span>
            </div>

            {/* Graphic Phone Screen Mockup */}
            <div className="rounded-2xl bg-[#14161a] p-3.5 text-white mb-5 border border-zinc-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-zinc-800 text-[10.5px] font-mono text-zinc-400">
                <div className="truncate">instagram.com/webview/wv-9482</div>
                <span className="text-zinc-400 font-medium cursor-pointer">✕ Close</span>
              </div>

              <div className="space-y-2.5">
                <div className="h-24 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col items-center justify-center p-3 text-center">
                  <YoutubeLogo className="h-6 w-6 text-zinc-500 mb-1" />
                  <span className="text-[11.5px] text-zinc-400 font-medium">Google Login Required To Subscribe</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 flex items-center gap-2 text-rose-300 text-[11px] font-normal">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                  <span>User is logged out. Forced password prompt triggers bounce.</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-[12.5px] text-zinc-600 font-medium">
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] shrink-0 font-bold clay-badge">✕</span>
                <span>Followers are logged out (no Google or Amazon cookies)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] shrink-0 font-bold clay-badge">✕</span>
                <span>85% bounce immediately without typing passwords</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#f0eee6] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-rose-700 font-bold text-[12px] uppercase tracking-wide">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Conversion Drop: ~85% Bounce</span>
            </div>
            <span className="text-[10.5px] font-mono font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 clay-badge">
              Low ROI
            </span>
          </div>
        </div>

        {/* The Solution (With SmartLink - Right Card) */}
        <div
          className={`p-4 sm:p-6 md:p-7 rounded-[22px] sm:rounded-[28px] clay-card-blue text-white flex flex-col justify-between relative overflow-hidden ${
            activeTab === "after" ? "block" : "hidden sm:flex"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
                <h3 className="text-[13px] font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
                  <Unlock className="h-3.5 w-3.5 text-[#ccff00]" />
                  Direct App Open
                </h3>
              </div>
              <span className="pill-lime text-[10.5px] font-bold uppercase px-3 py-1 text-black clay-badge">
                Instant
              </span>
            </div>

            {/* Graphic Phone Screen Mockup */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-3.5 text-white mb-5 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10 text-[10.5px] font-mono">
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <Smartphone className="h-3.5 w-3.5 text-[#ccff00]" />
                  Official YouTube App
                </div>
                <span className="text-[#ccff00] font-mono font-bold text-[10.5px]">
                  0s Delay
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="h-24 rounded-xl bg-black/45 border border-white/15 flex flex-col items-center justify-center p-3 text-center relative overflow-hidden shadow-inner">
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[9.5px] text-white font-bold bg-red-600 px-2 py-0.5 rounded-full shadow-xs">
                    <YoutubeLogo className="h-3 w-3" />
                    <span>Official App</span>
                  </div>
                  <span className="text-[13.5px] font-bold text-white tracking-tight">Opens In Official App</span>
                  <span className="text-[10.5px] text-zinc-300 mt-0.5 font-normal">Your followers are already logged in</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white text-[#121316] flex items-center justify-between text-[11.5px] font-semibold shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>1-Tap Subscribe & Like Works Instantly</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Saved
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-[12.5px] text-white/90 font-medium">
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 rounded-full bg-[#ccff00] text-black flex items-center justify-center text-[10px] shrink-0 font-bold clay-badge">✓</span>
                <span>Opens native app directly — zero login walls</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 rounded-full bg-[#ccff00] text-black flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
                <span>Saved Google login, Amazon UPI & Prime intact</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#ccff00] font-bold text-[12px] uppercase tracking-wide">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Result: 3x More Followers & Sales</span>
            </div>
            <span className="text-[10.5px] font-mono font-bold text-black bg-[#ccff00] px-3 py-1 rounded-full clay-badge">
              0% Bounce
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

ComparisonWidget.displayName = "ComparisonWidget";

