"use client";

import React, { memo } from "react";
import { COMPARISON_ROWS } from "./parts/comparisonData";
import { ComparisonTableHeader } from "./parts/ComparisonTableHeader";
import { ComparisonTableRow } from "./parts/ComparisonTableRow";

export const ComparisonTable: React.FC = memo(() => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 transform-gpu">
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="text-[24px] sm:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto">
          How SnapLink Beats <span className="text-[#2c35af]">Bitly & OpeninApp</span>
        </h2>
        <div className="sm:hidden text-center text-[10.5px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-2">
          ← Swipe horizontally to compare →
        </div>
      </div>

      <div className="overflow-x-auto rounded-[24px] sm:rounded-[28px] clay-card-glass p-0.5">
        <table className="w-full min-w-[560px] text-left border-collapse text-xs sm:text-sm">
          <ComparisonTableHeader />
          <tbody className="divide-y divide-[#f0eee6] text-xs sm:text-sm">
            {COMPARISON_ROWS.map((row, idx) => (
              <ComparisonTableRow key={idx} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
});

ComparisonTable.displayName = "ComparisonTable";
