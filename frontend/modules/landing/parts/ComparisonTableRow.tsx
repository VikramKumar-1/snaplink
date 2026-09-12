"use client";

import React, { memo } from "react";
import { StatusCell } from "./StatusCell";
import { ComparisonRow } from "./comparisonData";

interface ComparisonTableRowProps {
  row: ComparisonRow;
}

export const ComparisonTableRow: React.FC<ComparisonTableRowProps> = memo(({ row }) => {
  return (
    <tr className="sm:hover:bg-[#faf9f5]/70 transition-colors border-b border-[#f0eee6] last:border-b-0">
      <td className="py-2.5 sm:py-4 px-2 sm:px-6 text-black font-bold text-[10.5px] sm:text-[13.5px] leading-tight">
        <span className="hidden sm:inline">{row.feature}</span>
        <span className="sm:hidden inline">{row.mobileFeature || row.feature}</span>
      </td>
      <td className="py-2 sm:py-4 px-0.5 sm:px-4 text-center">
        <StatusCell type={row.bitly.type} text={row.bitly.text} mobileText={row.bitly.mobileText} />
      </td>
      <td className="py-2 sm:py-4 px-0.5 sm:px-4 text-center">
        <StatusCell type={row.openinapp.type} text={row.openinapp.text} mobileText={row.openinapp.mobileText} />
      </td>
      <td className="py-2 sm:py-4 px-0.5 sm:px-6 text-center bg-[#2c35af]/[0.04] border-x border-[#2c35af]/20">
        <StatusCell type={row.ours.type} text={row.ours.text} mobileText={row.ours.mobileText} isWinner />
      </td>
    </tr>
  );
});

ComparisonTableRow.displayName = "ComparisonTableRow";
