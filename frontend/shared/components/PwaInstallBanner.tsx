"use client";

import React from "react";
import { Download, X, Smartphone } from "lucide-react";
import { usePwaInstall } from "@/frontend/shared/hooks/usePwaInstall";

export const PwaInstallBanner: React.FC = () => {
  const { isInstallable, promptInstall, dismissPrompt } = usePwaInstall();

  if (!isInstallable) return null;

  return (
    <div className="w-full mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#2c35af]/10 via-[#2c35af]/5 to-transparent border border-[#2c35af]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#2c35af] text-white shadow-sm shrink-0">
          <Smartphone className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-[13.5px] font-bold text-[#121316]">
              Install SnapLink on your Phone
            </h4>
            <span className="px-2 py-0.5 rounded-full bg-[#ccff00] text-black text-[10px] font-bold">
              PWA
            </span>
          </div>
          <p className="text-[12px] text-zinc-500">
            Add to home screen for 1-tap link creation and instant offline access.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button
          type="button"
          onClick={promptInstall}
          className="px-3.5 py-1.5 bg-[#2c35af] text-white text-[12px] font-bold rounded-xl flex items-center gap-1.5 hover:bg-[#232b90] transition cursor-pointer shadow-xs"
        >
          <Download className="h-3.5 w-3.5" />
          Install App
        </button>
        <button
          type="button"
          onClick={dismissPrompt}
          className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg transition cursor-pointer"
          title="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
