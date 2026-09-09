"use client";

import React from "react";
import { TrendingUp, Link2, Smartphone, ShieldCheck } from "lucide-react";

interface DashboardKpisProps {
  totalClicks: number;
  totalLinks: number;
  topPlatformName: string;
}

export const DashboardKpis: React.FC<DashboardKpisProps> = ({
  totalClicks,
  totalLinks,
  topPlatformName,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {/* Card 1: Total Clicks */}
      <div className="p-6 rounded-[28px] bento-card-light flex flex-col justify-between">
        <div className="flex items-center justify-between text-zinc-500 mb-3">
          <span className="text-[12px] font-black uppercase tracking-wider">Total Clicks</span>
          <div className="p-2 rounded-xl bg-[#f5f4ef] border border-[#e7e5dc]">
            <TrendingUp className="h-4 w-4 text-[#2c35af]" />
          </div>
        </div>
        <div>
          <div className="text-[34px] font-black text-[#121316] tracking-tight font-mono">
            {totalClicks.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-emerald-700 mt-1">
            <span className="h-2 w-2 rounded-full bg-[#ccff00] ring-2 ring-[#ccff00]/40" />
            <span>Real-time intent routing</span>
          </div>
        </div>
      </div>

      {/* Card 2: Active Links */}
      <div className="p-6 rounded-[28px] bento-card-light flex flex-col justify-between">
        <div className="flex items-center justify-between text-zinc-500 mb-3">
          <span className="text-[12px] font-black uppercase tracking-wider">Active Links</span>
          <div className="p-2 rounded-xl bg-[#f5f4ef] border border-[#e7e5dc]">
            <Link2 className="h-4 w-4 text-[#2c35af]" />
          </div>
        </div>
        <div>
          <div className="text-[34px] font-black text-[#121316] tracking-tight font-mono">
            {totalLinks}
          </div>
          <div className="text-[11.5px] font-bold text-zinc-500 mt-1">
            Zero interstitial ad latency
          </div>
        </div>
      </div>

      {/* Card 3: Top Channel */}
      <div className="p-6 rounded-[28px] bento-card-light flex flex-col justify-between">
        <div className="flex items-center justify-between text-zinc-500 mb-3">
          <span className="text-[12px] font-black uppercase tracking-wider">Top Channel</span>
          <div className="p-2 rounded-xl bg-[#f5f4ef] border border-[#e7e5dc]">
            <Smartphone className="h-4 w-4 text-[#2c35af]" />
          </div>
        </div>
        <div>
          <div className="text-[28px] font-black text-[#121316] tracking-tight truncate uppercase">
            {topPlatformName}
          </div>
          <div className="text-[11.5px] font-bold text-zinc-500 mt-1">
            Highest bio conversion
          </div>
        </div>
      </div>

      {/* Card 4: Retention Boost */}
      <div className="p-6 rounded-[28px] bento-card-light flex flex-col justify-between">
        <div className="flex items-center justify-between text-zinc-500 mb-3">
          <span className="text-[12px] font-black uppercase tracking-wider">Conversion Boost</span>
          <div className="p-2 rounded-xl bg-[#f5f4ef] border border-[#e7e5dc]">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
        </div>
        <div>
          <div className="text-[34px] font-black text-[#2c35af] tracking-tight font-mono">
            5.4x
          </div>
          <div className="text-[11.5px] font-bold text-zinc-500 mt-1">
            Average engagement lift
          </div>
        </div>
      </div>
    </div>
  );
};
