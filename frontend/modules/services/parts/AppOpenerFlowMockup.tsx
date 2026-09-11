"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Zap, AlertTriangle } from "lucide-react";

export const AppOpenerFlowMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"flow" | "comparison">("flow");

  return (
    <div className="rounded-3xl bg-white border border-[#e7e5dc] overflow-hidden shadow-xl">
      {/* Top Header Bar */}
      <div className="bg-zinc-950 text-white px-4 py-3 sm:px-5 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
          <span className="text-[11px] font-bold font-mono tracking-wider uppercase text-zinc-300">
            0ms Native Intent Bypass Engine
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 border border-zinc-800 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("flow")}
            className={`px-2.5 py-1 rounded-md transition ${
              activeTab === "flow" ? "bg-[#2c35af] text-white shadow-xs" : "text-zinc-400 hover:text-white"
            }`}
          >
            Step-by-Step Flow
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("comparison")}
            className={`px-2.5 py-1 rounded-md transition ${
              activeTab === "comparison" ? "bg-[#2c35af] text-white shadow-xs" : "text-zinc-400 hover:text-white"
            }`}
          >
            Before vs After
          </button>
        </div>
      </div>

      {activeTab === "flow" ? (
        /* Visual 3-Step Flow Pipeline */
        <div className="p-4 sm:p-6 bg-[#faf9f5]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative">
            {/* Step 1 Card: User Clicks on Social Media */}
            <div className="bg-white rounded-2xl p-4 border border-[#e7e5dc] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-pink-50 border border-pink-200 text-pink-700 text-[10px] font-extrabold uppercase">
                    Step 01
                  </span>
                  <div className="w-6 h-6 relative shrink-0">
                    <Image
                      src="/instagram-logo.webp"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                <h4 className="text-[13px] font-bold text-[#121316] mb-1">
                  User Taps Link in App
                </h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Viewer clicks your link in Instagram bio, story, or WhatsApp chat.
                </p>
              </div>

              <div className="mt-3 p-2 rounded-xl bg-zinc-50 border border-zinc-200 font-mono text-[10px] text-zinc-600 flex items-center gap-1.5">
                <span className="text-[#2c35af] font-bold">snaplink.to/</span>
                <span className="text-zinc-800 font-bold">tech-deal</span>
              </div>
            </div>

            {/* Step 2 Card: SnapLink 0ms Engine */}
            <div className="bg-zinc-950 text-white rounded-2xl p-4 border border-zinc-800 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-[#2c35af] text-[#ccff00] text-[10px] font-extrabold uppercase">
                    Step 02
                  </span>
                  <Zap className="h-5 w-5 text-[#ccff00]" />
                </div>

                <h4 className="text-[13px] font-bold text-white mb-1">
                  0ms Server Handshake
                </h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Bypasses trapped in-app webview using Android Intent & iOS Universal Links.
                </p>
              </div>

              <div className="mt-3 p-2 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-[10px] flex items-center justify-between text-zinc-300">
                <span className="text-emerald-400 font-bold">HTTP 307</span>
                <span className="text-[9.5px] text-[#ccff00]">8ms Latency</span>
              </div>
            </div>

            {/* Step 3 Card: Native App Launches */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-300 shadow-sm flex flex-col justify-between ring-1 ring-emerald-400/20">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                    Step 03
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 relative shrink-0">
                      <Image
                        src="/youtube-logo.webp"
                        alt="YouTube"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                    <div className="w-5 h-5 relative shrink-0">
                      <Image
                        src="/amazon-logo.webp"
                        alt="Amazon"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <h4 className="text-[13px] font-bold text-[#121316] mb-1">
                  Official App Launches
                </h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Opens directly in official app with active login for 1-tap subscribe or buy.
                </p>
              </div>

              <div className="mt-3 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10.5px] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Logged In &bull; 1-Tap Action</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Before vs After Side-by-Side Comparison */
        <div className="p-4 sm:p-6 bg-[#faf9f5]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Standard Shortener (The Problem) */}
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200">
              <div className="flex items-center gap-2 mb-2 text-red-600">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <h4 className="text-[12px] font-black uppercase tracking-wider">
                  Without SnapLink (Standard Link)
                </h4>
              </div>
              <div className="space-y-2 text-[11.5px] text-zinc-700 font-medium">
                <div className="p-2 rounded-lg bg-white border border-red-100 flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Trapped inside slow Instagram / TikTok webview</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-red-100 flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>User is logged out; prompted to re-enter password</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-red-100 flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>85% drop-off rate</strong> without subscribing or buying</span>
                </div>
              </div>
            </div>

            {/* SnapLink App Opener (The Solution) */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-300">
              <div className="flex items-center gap-2 mb-2 text-emerald-700">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <h4 className="text-[12px] font-black uppercase tracking-wider">
                  With SnapLink App Opener
                </h4>
              </div>
              <div className="space-y-2 text-[11.5px] text-zinc-700 font-medium">
                <div className="p-2 rounded-lg bg-white border border-emerald-100 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>0ms server-side bypass directly to native app</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-emerald-100 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>User is already logged in with saved cards & session</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-emerald-100 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>3.4x higher conversion rate</strong> in 1 tap</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
