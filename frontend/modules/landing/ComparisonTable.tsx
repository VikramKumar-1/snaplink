"use client";

import React, { memo } from "react";
import { COMPARISON_ROWS } from "./parts/comparisonData";
import { ComparisonTableHeader } from "./parts/ComparisonTableHeader";
import { ComparisonTableRow } from "./parts/ComparisonTableRow";

export const ComparisonTable: React.FC = memo(() => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 transform-gpu">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-[24px] sm:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto truncate sm:whitespace-nowrap">
          How SmartDeepLink Beats <span className="text-[#2c35af]">Bitly & OpeninApp</span>
        </h2>
      </div>

      <div className="overflow-x-auto rounded-[28px] clay-card-glass overflow-hidden">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
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
