"use client";

import React, { memo } from "react";
import { QrCode, Link2 } from "lucide-react";

interface CreatorTabsProps {
  activeTab: "link" | "qr" | "bulk";
  onTabChange: (tab: "link" | "qr" | "bulk") => void;
}

export const CreatorTabs: React.FC<CreatorTabsProps> = memo(({ activeTab, onTabChange }) => (
  <div className="grid grid-cols-3 border-b border-[#e7e5dc] bg-[#faf9f5]/75 backdrop-blur-md">
    <button
      type="button"
      onClick={() => onTabChange("link")}
      className={`py-3.5 px-2 text-[12px] sm:text-[13.5px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
        activeTab === "link"
          ? "bg-white text-[#2c35af] border-b-2 border-[#2c35af]"
          : "text-zinc-500 hover:text-black"
      }`}
    >
      <Link2 className="h-4 w-4" />
      <span>Shorten</span>
    </button>

    <button
      type="button"
      onClick={() => onTabChange("qr")}
      className={`py-3.5 px-2 text-[12px] sm:text-[13.5px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
        activeTab === "qr"
          ? "bg-white text-[#2c35af] border-b-2 border-[#2c35af]"
          : "text-zinc-500 hover:text-black"
      }`}
    >
      <QrCode className="h-4 w-4" />
      <span>QR Code</span>
    </button>

    <button
      type="button"
      onClick={() => onTabChange("bulk")}
      className={`py-3.5 px-2 text-[12px] sm:text-[13.5px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
        activeTab === "bulk"
          ? "bg-white text-[#2c35af] border-b-2 border-[#2c35af]"
          : "text-zinc-500 hover:text-black"
      }`}
    >
      <span className="font-bold flex items-center gap-0.5">
        <Link2 className="h-3 w-3" /><Link2 className="h-3 w-3 -ml-1.5" />
      </span>
      <span>Bulk Short</span>
    </button>
  </div>
));

CreatorTabs.displayName = "CreatorTabs";
