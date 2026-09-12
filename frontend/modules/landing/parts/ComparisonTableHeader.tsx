"use client";

import React, { memo } from "react";

export const ComparisonTableHeader: React.FC = memo(() => {
  return (
    <thead>
      <tr className="border-b border-[#e7e5dc] bg-[#faf9f5]/90">
        <th className="py-2.5 sm:py-4 px-2 sm:px-6 text-left text-zinc-900 font-bold uppercase text-[10px] sm:text-xs font-mono">
          <span className="hidden sm:inline">Key Features</span>
          <span className="sm:hidden inline">Features</span>
        </th>
        <th className="py-2.5 sm:py-4 px-1 sm:px-6 text-center text-zinc-500 font-semibold text-[10px] sm:text-xs font-mono">
          Bitly
        </th>
        <th className="py-2.5 sm:py-4 px-1 sm:px-6 text-center text-zinc-500 font-semibold text-[10px] sm:text-xs font-mono">
          OpeninApp
        </th>
        <th className="py-2.5 sm:py-4 px-1 sm:px-6 text-center text-[#2c35af] font-bold text-[10px] sm:text-xs font-mono bg-[#2c35af]/10 border-x border-[#2c35af]/20">
          <span className="inline-flex items-center justify-center gap-1 sm:gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2c35af]" />
            SnapLink
          </span>
        </th>
      </tr>
    </thead>
  );
});

ComparisonTableHeader.displayName = "ComparisonTableHeader";
