"use client";

import React, { memo } from "react";
import { QrCode, Link2 } from "lucide-react";

interface CreatorTabsProps {
  activeTab: "link" | "qr";
  onTabChange: (tab: "link" | "qr") => void;
}

export const CreatorTabs: React.FC<CreatorTabsProps> = memo(({ activeTab, onTabChange }) => (
  <div className="grid grid-cols-2 border-b border-[#e7e5dc] bg-[#faf9f5]/75 backdrop-blur-md">
    <button
      type="button"
      onClick={() => onTabChange("link")}
      className={`py-3.5 px-4 text-[13.5px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
        activeTab === "link"
          ? "bg-white text-[#2c35af] border-b-2 border-[#2c35af]"
          : "text-zinc-500 hover:text-black"
      }`}
    >
      <Link2 className="h-4 w-4 text-[#2c35af]" />
      <span>Shorten Link</span>
    </button>

    <button
      type="button"
      onClick={() => onTabChange("qr")}
      className={`py-3.5 px-4 text-[13.5px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
        activeTab === "qr"
          ? "bg-white text-[#2c35af] border-b-2 border-[#2c35af]"
          : "text-zinc-500 hover:text-black"
      }`}
    >
      <QrCode className="h-4 w-4 text-zinc-400" />
      <span>Dynamic QR</span>
    </button>
  </div>
));

CreatorTabs.displayName = "CreatorTabs";
