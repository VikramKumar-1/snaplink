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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
      {/* Card 1: Total Clicks */}
      <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-[28px] bento-card-light flex flex-col justify-between">
        <div className="flex items-center justify-between text-zinc-500 mb-2 sm:mb-3">
          <span className="text-[10.5px] sm:text-[12px] font-black uppercase tracking-wider truncate">Total Clicks</span>
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#f5f4ef] border border-[#e7e5dc] shrink-0">
            <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#2c35af]" />
          </div>
        </div>
        <div>
          <div className="text-[22px] sm:text-[34px] font-black text-[#121316] tracking-tight font-mono leading-none sm:leading-tight">
            {totalClicks.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11.5px] font-bold text-emerald-700 mt-1.5 sm:mt-1 truncate">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#ccff00] ring-1 sm:ring-2 ring-[#ccff00]/40 shrink-0" />
            <span className="truncate">Real-time routing</span>
          </div>
        </div>
      </div>

      {/* Card 2: Active Links */}
      <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-[28px] bento-card-light flex flex-col justify-between">
        <div className="flex items-center justify-between text-zinc-500 mb-2 sm:mb-3">
          <span className="text-[10.5px] sm:text-[12px] font-black uppercase tracking-wider truncate">Active Links</span>
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#f5f4ef] border border-[#e7e5dc] shrink-0">
            <Link2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#2c35af]" />
          </div>
        </div>
        <div>
          <div className="text-[22px] sm:text-[34px] font-black text-[#121316] tracking-tight font-mono leading-none sm:leading-tight">
            {totalLinks}
          </div>
          <div className="text-[10px] sm:text-[11.5px] font-bold text-zinc-500 mt-1.5 sm:mt-1 truncate">
            Zero ad latency
          </div>
        </div>
      </div>

      {/* Card 3: Top Channel */}
      <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-[28px] bento-card-light flex flex-col justify-between">
        <div className="flex items-center justify-between text-zinc-500 mb-2 sm:mb-3">
          <span className="text-[10.5px] sm:text-[12px] font-black uppercase tracking-wider truncate">Top Channel</span>
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#f5f4ef] border border-[#e7e5dc] shrink-0">
            <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#2c35af]" />
          </div>
        </div>
        <div>
          <div className="text-[20px] sm:text-[28px] font-black text-[#121316] tracking-tight truncate uppercase leading-none sm:leading-tight">
            {topPlatformName}
          </div>
          <div className="text-[10px] sm:text-[11.5px] font-bold text-zinc-500 mt-1.5 sm:mt-1 truncate">
            Highest bio CTR
          </div>
        </div>
      </div>

      {/* Card 4: Retention Boost */}
      <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-[28px] bento-card-light flex flex-col justify-between">
        <div className="flex items-center justify-between text-zinc-500 mb-2 sm:mb-3">
          <span className="text-[10.5px] sm:text-[12px] font-black uppercase tracking-wider truncate">Engagement</span>
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#f5f4ef] border border-[#e7e5dc] shrink-0">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
          </div>
        </div>
        <div>
          <div className="text-[22px] sm:text-[34px] font-black text-[#2c35af] tracking-tight font-mono leading-none sm:leading-tight">
            5.4x
          </div>
          <div className="text-[10px] sm:text-[11.5px] font-bold text-zinc-500 mt-1.5 sm:mt-1 truncate">
            Average app lift
          </div>
        </div>
      </div>
    </div>
  );
};
