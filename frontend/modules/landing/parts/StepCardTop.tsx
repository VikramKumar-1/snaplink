"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface TopProps {
  Icon: LucideIcon;
  num: string;
  badge: string;
  badgeBg: string;
  title: string;
  subtitle: string;
}

export const StepCardTop: React.FC<TopProps> = ({
  Icon,
  num,
  badge,
  badgeBg,
  title,
  subtitle,
}) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div className="h-11 w-11 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center p-2.5 shadow-[inset_0_2px_3px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04),0_6px_14px_-2px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform">
          <Icon className="h-5 w-5 text-[#121316] stroke-[2.2]" />
        </div>
        <span className="font-mono text-[13.5px] font-bold text-[#121316] tracking-wider">
          STEP {num}
        </span>
      </div>
      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-2xs ${badgeBg}`}>
        {badge}
      </span>
    </div>
    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#121316] tracking-tight group-hover:text-[#2c35af] transition-colors mb-1.5">
      {title}
    </h3>
    <p className="text-[12.5px] text-zinc-600 font-medium leading-relaxed">
      {subtitle}
    </p>
  </div>
);
