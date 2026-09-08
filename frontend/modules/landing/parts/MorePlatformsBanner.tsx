"use client";

import React, { memo } from "react";
import { QrCode, BarChart2, ShieldCheck, Layers } from "lucide-react";

const OTHER_APPS = ["Spotify", "Telegram", "WhatsApp", "Ajio", "X (Twitter)", "LinkedIn", "Zomato", "Swiggy"];
const HIGHLIGHT_SERVICES = [
  { icon: QrCode, text: "Free Branded QR Codes" },
  { icon: BarChart2, text: "Live Click & Country Analytics" },
  { icon: ShieldCheck, text: "Affiliate Commission Protection" },
  { icon: Layers, text: "All-in-One Link-in-Bio Pages" },
];

/** Ecosystem Banner: 50+ Apps & All-in-One Platform Services */
export const MorePlatformsBanner: React.FC = memo(() => (
  <div className="mt-8 p-5 sm:p-7 rounded-[28px] clay-glass-hybrid border border-white/90 flex flex-col md:flex-row items-center justify-between gap-6">
    <div className="text-left max-w-xl">
      <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/80 border border-white text-[#2c35af] clay-badge mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2c35af]" />
        <span>Supports 50+ Platforms & Services</span>
      </div>
      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#121316] tracking-tight mb-1">
        Need another app? Any link works instantly.
      </h3>
      <p className="text-[12.5px] text-zinc-500 font-medium leading-relaxed mb-3">
        Shopping, music, social, food delivery, or custom stores — visitors open native apps with zero login prompts.
      </p>
      <div className="flex flex-wrap gap-1.5">
        {OTHER_APPS.map((app) => (
          <span key={app} className="text-[11px] font-medium text-zinc-600 bg-white/70 px-2.5 py-0.5 rounded-full border border-black/[0.05]">
            {app}
          </span>
        ))}
      </div>
    </div>
    <div className="w-full md:w-auto shrink-0 flex flex-col gap-2 p-3.5 rounded-2xl bg-white/60 border border-white/90">
      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-0.5">
        Built-In Creator Tools
      </span>
      {HIGHLIGHT_SERVICES.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-2 text-[12px] font-semibold text-zinc-700">
          <Icon className="h-3.5 w-3.5 text-[#2c35af]" />
          <span>{text}</span>
        </div>
      ))}
    </div>
  </div>
));

MorePlatformsBanner.displayName = "MorePlatformsBanner";
