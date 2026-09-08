"use client";

import React, { memo } from "react";
import { StatusCell } from "./StatusCell";
import { ComparisonRow } from "./comparisonData";

interface ComparisonTableRowProps {
  row: ComparisonRow;
}

export const ComparisonTableRow: React.FC<ComparisonTableRowProps> = memo(({ row }) => {
  return (
    <tr className="hover:bg-[#faf9f5]/70 transition-colors">
      <td className="py-4 px-6 text-black font-bold text-[13.5px]">{row.feature}</td>
      <td className="py-4 px-6">
        <StatusCell type={row.bitly.type} text={row.bitly.text} />
      </td>
      <td className="py-4 px-6">
        <StatusCell type={row.openinapp.type} text={row.openinapp.text} />
      </td>
      <td className="py-4 px-6 bg-[#2c35af]/[0.04] border-x border-[#2c35af]/20">
        <StatusCell type={row.ours.type} text={row.ours.text} />
      </td>
    </tr>
  );
});

ComparisonTableRow.displayName = "ComparisonTableRow";
