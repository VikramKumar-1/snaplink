"use client";

import React, { memo } from "react";

export const ComparisonTableHeader: React.FC = memo(() => {
  return (
    <thead>
      <tr className="border-b border-[#e7e5dc] bg-[#faf9f5]/80">
        <th className="py-3 sm:py-4 px-3.5 sm:px-6 text-zinc-900 font-bold uppercase text-[11px] sm:text-xs font-mono">
          Key Features
        </th>
        <th className="py-3 sm:py-4 px-3.5 sm:px-6 text-zinc-500 font-semibold text-[11px] sm:text-xs font-mono">
          Bitly
        </th>
        <th className="py-3 sm:py-4 px-3.5 sm:px-6 text-zinc-500 font-semibold text-[11px] sm:text-xs font-mono">
          OpeninApp
        </th>
        <th className="py-3 sm:py-4 px-3.5 sm:px-6 text-[#2c35af] font-bold text-[11px] sm:text-xs font-mono bg-[#2c35af]/10 border-x border-[#2c35af]/20">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2c35af]" />
            SnapLink
          </span>
        </th>
      </tr>
    </thead>
  );
});

ComparisonTableHeader.displayName = "ComparisonTableHeader";
