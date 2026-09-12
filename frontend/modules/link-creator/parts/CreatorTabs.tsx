"use client";

import React, { memo } from "react";
import { QrCode, Link2, Megaphone } from "lucide-react";

interface CreatorTabsProps {
  activeTab: "link" | "qr" | "bulk" | "cta";
  onTabChange: (tab: "link" | "qr" | "bulk" | "cta") => void;
}

export const CreatorTabs: React.FC<CreatorTabsProps> = memo(({ activeTab, onTabChange }) => (
  <div className="grid grid-cols-4 border-b border-[#e7e5dc] bg-[#faf9f5]/75 backdrop-blur-md">
    <button
      type="button"
      onClick={() => onTabChange("link")}
      className={`py-2.5 sm:py-3.5 px-1 text-[9.5px] min-[375px]:text-[10px] sm:text-[12.5px] font-black uppercase tracking-tighter sm:tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
        activeTab === "link"
          ? "bg-white text-[#2c35af] border-b-2 border-[#2c35af]"
          : "text-zinc-500 hover:text-black"
      }`}
    >
      <Link2 className="h-4 w-4 sm:h-4 sm:w-4" />
      <span className="hidden sm:inline">Shorten</span>
      <span className="sm:hidden">Link</span>
    </button>

    <button
      type="button"
      onClick={() => onTabChange("cta")}
      className={`py-2.5 sm:py-3.5 px-1 text-[9.5px] min-[375px]:text-[10px] sm:text-[12.5px] font-black uppercase tracking-tighter sm:tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
        activeTab === "cta"
          ? "bg-white text-[#2c35af] border-b-2 border-[#2c35af]"
          : "text-zinc-500 hover:text-black"
      }`}
    >
      <span className="font-bold flex items-center text-emerald-500">
        <Megaphone className="h-4 w-4 sm:h-4 sm:w-4" />
      </span>
      <span>CTA Link</span>
    </button>

    <button
      type="button"
      onClick={() => onTabChange("qr")}
      className={`py-2.5 sm:py-3.5 px-1 text-[9.5px] min-[375px]:text-[10px] sm:text-[12.5px] font-black uppercase tracking-tighter sm:tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
        activeTab === "qr"
          ? "bg-white text-[#2c35af] border-b-2 border-[#2c35af]"
          : "text-zinc-500 hover:text-black"
      }`}
    >
      <QrCode className="h-4 w-4 sm:h-4 sm:w-4" />
      <span>QR Code</span>
    </button>

    <button
      type="button"
      onClick={() => onTabChange("bulk")}
      className={`py-2.5 sm:py-3.5 px-1 text-[9.5px] min-[375px]:text-[10px] sm:text-[12.5px] font-black uppercase tracking-tighter sm:tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
        activeTab === "bulk"
          ? "bg-white text-[#2c35af] border-b-2 border-[#2c35af]"
          : "text-zinc-500 hover:text-black"
      }`}
    >
      <span className="font-bold flex items-center">
        <Link2 className="h-3.5 w-3.5" /><Link2 className="h-3.5 w-3.5 -ml-1.5" />
      </span>
      <span>Bulk</span>
    </button>
  </div>
));

CreatorTabs.displayName = "CreatorTabs";
