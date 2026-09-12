import React from "react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-white">
      <div className="flex flex-col items-center text-center max-w-xs space-y-4 animate-fade-in">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2c35af] to-[#4338ca] flex items-center justify-center shadow-xl shadow-[#2c35af]/30">
            <span className="h-3 w-3 rounded-full bg-[#ccff00] animate-ping" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-bold tracking-tight text-zinc-200">
            {BRAND_CONFIG.name}
          </div>
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
            Connecting...
          </div>
        </div>
      </div>
    </div>
  );
}
