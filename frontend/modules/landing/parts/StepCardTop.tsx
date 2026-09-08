"use client";

import React, { memo } from "react";
import { LucideIcon } from "lucide-react";

interface TopProps {
  Icon: LucideIcon;
  num: string;
  title: string;
  subtitle: string;
  accentColor: string;
}

export const StepCardTop: React.FC<TopProps> = memo(({
  Icon,
  num,
  title,
  subtitle,
  accentColor,
}) => (
  <div className="mb-4">
    <div className="flex items-center gap-3 mb-3.5">
      <div className="h-11 w-11 rounded-2xl bg-white/95 border border-white/90 flex items-center justify-center p-2.5 shadow-[0_8px_18px_-4px_rgba(44,53,175,0.08),inset_0_2px_1.5px_0_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.03)] group-hover:scale-105 transition-transform">
        <Icon className={`h-5 w-5 ${accentColor} stroke-[2.2]`} />
      </div>
      <span className="font-mono text-[13px] font-black text-[#2c35af] tracking-wider">
        STEP {num}
      </span>
    </div>
    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#121316] tracking-tight group-hover:text-[#2c35af] transition-colors mb-1.5">
      {title}
    </h3>
    <p className="text-[12.5px] text-zinc-600 font-medium leading-relaxed">
      {subtitle}
    </p>
  </div>
));

StepCardTop.displayName = "StepCardTop";
