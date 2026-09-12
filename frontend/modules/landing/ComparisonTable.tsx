"use client";

import React, { memo } from "react";
import { COMPARISON_ROWS } from "./parts/comparisonData";
import { ComparisonTableHeader } from "./parts/ComparisonTableHeader";
import { ComparisonTableRow } from "./parts/ComparisonTableRow";

export const ComparisonTable: React.FC = memo(() => {
  return (
    <section className="w-full max-w-6xl mx-auto px-2 sm:px-4 transform-gpu">
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="text-[clamp(12px,3.7vw,20px)] sm:text-[26px] md:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto whitespace-nowrap">
          How SnapLink Beats <span className="text-[#2c35af]">Bitly & OpeninApp</span>
        </h2>
      </div>

      <div className="w-full rounded-[20px] sm:rounded-[28px] clay-card-glass p-0.5 overflow-hidden">
        <table className="w-full table-fixed text-left border-collapse">
          <colgroup>
            <col className="w-[33%] sm:w-[31%]" />
            <col className="w-[20%] sm:w-[23%]" />
            <col className="w-[22%] sm:w-[23%]" />
            <col className="w-[25%] sm:w-[23%]" />
          </colgroup>
          <ComparisonTableHeader />
          <tbody>
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
