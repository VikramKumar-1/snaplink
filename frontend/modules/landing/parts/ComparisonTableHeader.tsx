"use client";

import React, { memo } from "react";

export const ComparisonTableHeader: React.FC = memo(() => {
  return (
    <thead>
      <tr className="border-b border-[#e7e5dc] bg-[#faf9f5]/80">
        <th className="py-4 px-6 text-zinc-900 font-bold uppercase text-xs font-mono">
          Key Features
        </th>
        <th className="py-4 px-6 text-zinc-500 font-semibold text-xs font-mono">
          Generic Bitly
        </th>
        <th className="py-4 px-6 text-zinc-500 font-semibold text-xs font-mono">
          OpeninApp
        </th>
        <th className="py-4 px-6 text-[#2c35af] font-bold text-xs font-mono bg-[#2c35af]/10 border-x border-[#2c35af]/20">
          ⚡ SmartDeepLink
        </th>
      </tr>
    </thead>
  );
});

ComparisonTableHeader.displayName = "ComparisonTableHeader";
