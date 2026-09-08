"use client";

import React from "react";
import { ArrowRight, Zap } from "lucide-react";

interface HandoffProps {
  sourceUrl: string;
  targetApp: string;
  accentColor: string;
}

/** Translucent Frosted Glass Direct App Route Visualizer */
export const PlatformHandoffPill: React.FC<HandoffProps> = ({
  sourceUrl,
  targetApp,
  accentColor,
}) => (
  <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white/95 p-3 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_8px_18px_-4px_rgba(0,0,0,0.04)] mb-4">
    <div className="flex items-center justify-between gap-2 text-[11px] font-mono mb-2">
      <span className="text-zinc-500 font-medium truncate min-w-0 flex-1">{sourceUrl}</span>
      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/[0.03] shrink-0">
        <ArrowRight className="h-3 w-3 text-zinc-400" />
      </div>
      <span className={`font-bold truncate min-w-0 flex-1 text-right ${accentColor}`}>
        {targetApp}
      </span>
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-[10px]">
      <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50/90 px-2 py-0.5 rounded-full">
        <Zap className="h-2.5 w-2.5 fill-emerald-600 text-emerald-600" />
        0s Native Launch
      </span>
      <span className="font-mono text-zinc-400">Zero Logins</span>
    </div>
  </div>
);
