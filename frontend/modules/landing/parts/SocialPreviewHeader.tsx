"use client";

import React from "react";
import { WhatsAppLogo, TelegramLogo } from "@/frontend/shared/icons/PlatformIcons";

export type SocialPlatform = "whatsapp" | "telegram" | "x";

interface HeaderProps {
  activeTab: SocialPlatform;
  onSelectTab: (tab: SocialPlatform) => void;
}

export const SocialPreviewHeader: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => (
  <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
    <h2 className="text-[24px] sm:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto mb-3.5">
      Rich WhatsApp & <span className="text-[#2c35af]">Social Previews</span>
    </h2>

    <div className="inline-flex p-1 rounded-2xl bg-white/80 backdrop-blur-md border border-black/[0.08] shadow-xs gap-1">
      <button
        onClick={() => onSelectTab("whatsapp")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          activeTab === "whatsapp" ? "bg-[#25D366] text-white shadow-xs" : "text-zinc-600 hover:text-black"
        }`}
      >
        <WhatsAppLogo className="h-3.5 w-3.5" /> <span>WhatsApp</span>
      </button>

      <button
        onClick={() => onSelectTab("telegram")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          activeTab === "telegram" ? "bg-[#229ED9] text-white shadow-xs" : "text-zinc-600 hover:text-black"
        }`}
      >
        <TelegramLogo className="h-3.5 w-3.5" /> <span>Telegram</span>
      </button>

      <button
        onClick={() => onSelectTab("x")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          activeTab === "x" ? "bg-[#121316] text-white shadow-xs" : "text-zinc-600 hover:text-black"
        }`}
      >
        <span className="font-mono text-xs font-black">𝕏</span> <span>Twitter / X</span>
      </button>
    </div>
  </div>
);
