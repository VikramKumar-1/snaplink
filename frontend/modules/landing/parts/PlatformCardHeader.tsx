"use client";

import React from "react";

interface HeaderProps {
  Icon: React.FC<{ className?: string }>;
  name: string;
  category: string;
  description: string;
}

/** 3D Clay Emblem + Frosted Category Tag + Title + 1-Sentence Benefit */
export const PlatformCardHeader: React.FC<HeaderProps> = ({
  Icon,
  name,
  category,
  description,
}) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-3">
      <div className="h-11 w-11 sm:h-13 sm:w-13 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center p-2 sm:p-2.5 shadow-[inset_0_2.5px_3px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04),0_8px_18px_-3px_rgba(0,0,0,0.08)] md:group-hover:scale-110 md:group-hover:rotate-1 transition-all duration-300">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 shrink-0" />
      </div>
      <span className="text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/70 border border-white/90 text-zinc-600 shadow-2xs clay-badge backdrop-blur-md">
        {category}
      </span>
    </div>

    <h3 className="text-[16px] sm:text-[19px] font-bold text-[#121316] tracking-tight group-hover:text-[#2c35af] transition-colors mb-1">
      {name}
    </h3>
    <p className="text-[11.5px] sm:text-[12.5px] text-zinc-500 font-medium leading-relaxed">
      {description}
    </p>
  </div>
);
