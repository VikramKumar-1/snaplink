"use client";

import React, { memo } from "react";
import { Check, X, AlertCircle } from "lucide-react";
import { ComparisonRow } from "./comparisonData";

interface ComparisonMobileCardProps {
  row: ComparisonRow;
  index: number;
}

export const ComparisonMobileCard: React.FC<ComparisonMobileCardProps> = memo(({ row, index }) => {
  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-[#e7e5dc] shadow-xs transform-gpu">
      {/* Feature Title with index */}
      <div className="flex items-center justify-between mb-2.5">
        <h4 className="text-[13px] font-bold text-[#121316] tracking-tight">
          {row.feature}
        </h4>
        <span className="text-[10px] font-mono font-semibold text-zinc-400">
          0{index + 1}
        </span>
      </div>

      {/* SnapLink Winner Highlight Card */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#2c35af]/[0.08] border border-[#2c35af]/25 mb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#2c35af]" />
          <span className="text-[11px] font-mono font-bold text-[#2c35af] uppercase tracking-wide">
            SnapLink
          </span>
        </div>
        {row.ours.type === "badge" ? (
          <span className="pill-lime text-black text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {row.ours.text}
          </span>
        ) : (
          <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#121316]">
            <div className="h-4 w-4 rounded-full bg-[#ccff00] text-black flex items-center justify-center shrink-0">
              <Check className="h-2.5 w-2.5 stroke-[3.5]" />
            </div>
            <span>{row.ours.text}</span>
          </div>
        )}
      </div>

      {/* Competitors side by side (Bitly & OpeninApp) */}
      <div className="grid grid-cols-2 gap-2">
        {/* Bitly */}
        <div className="p-2.5 rounded-xl bg-[#f8f7f2] border border-[#e7e5dc]/80 flex flex-col justify-between min-h-[54px]">
          <span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
            Bitly
          </span>
          <div className="flex items-start gap-1.5 mt-1">
            {row.bitly.type === "danger" && (
              <div className="h-3.5 w-3.5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                <X className="h-2.5 w-2.5 stroke-[3]" />
              </div>
            )}
            {row.bitly.type === "warning" && (
              <div className="h-3.5 w-3.5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="h-2.5 w-2.5 stroke-[2.5]" />
              </div>
            )}
            <span className="text-[11px] font-medium text-zinc-600 leading-snug">
              {row.bitly.text}
            </span>
          </div>
        </div>

        {/* OpeninApp */}
        <div className="p-2.5 rounded-xl bg-[#f8f7f2] border border-[#e7e5dc]/80 flex flex-col justify-between min-h-[54px]">
          <span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
            OpeninApp
          </span>
          <div className="flex items-start gap-1.5 mt-1">
            {row.openinapp.type === "danger" && (
              <div className="h-3.5 w-3.5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                <X className="h-2.5 w-2.5 stroke-[3]" />
              </div>
            )}
            {row.openinapp.type === "warning" && (
              <div className="h-3.5 w-3.5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="h-2.5 w-2.5 stroke-[2.5]" />
              </div>
            )}
            {row.openinapp.type === "success" && (
              <div className="h-3.5 w-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </div>
            )}
            <span className="text-[11px] font-medium text-zinc-600 leading-snug">
              {row.openinapp.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

ComparisonMobileCard.displayName = "ComparisonMobileCard";
