"use client";

import React, { memo } from "react";
import { Check, X, AlertCircle } from "lucide-react";

interface StatusCellProps {
  type: "success" | "danger" | "warning" | "badge";
  text: string;
  mobileText?: string;
  isWinner?: boolean;
}

export const StatusCell: React.FC<StatusCellProps> = memo(({ type, text, mobileText, isWinner }) => {
  const label = mobileText || text;

  if (type === "success") {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-0.5 sm:gap-2">
        <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[#ccff00] text-black flex items-center justify-center shrink-0 shadow-xs">
          <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[3.5]" />
        </div>
        <span className="text-[10px] sm:text-[13px] font-extrabold leading-tight text-center sm:text-left text-zinc-900">
          <span className="hidden sm:inline">{text}</span>
          <span className="sm:hidden inline">{label}</span>
        </span>
      </div>
    );
  }
  if (type === "danger") {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-0.5 sm:gap-2">
        <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
          <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[3]" />
        </div>
        <span className="text-[10px] sm:text-[13px] font-medium text-zinc-500 leading-tight text-center sm:text-left">
          <span className="hidden sm:inline">{text}</span>
          <span className="sm:hidden inline">{label}</span>
        </span>
      </div>
    );
  }
  if (type === "warning") {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-0.5 sm:gap-2">
        <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <AlertCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.5]" />
        </div>
        <span className="text-[10px] sm:text-[13px] font-medium text-zinc-600 leading-tight text-center sm:text-left">
          <span className="hidden sm:inline">{text}</span>
          <span className="sm:hidden inline">{label}</span>
        </span>
      </div>
    );
  }
  return (
    <div className="inline-flex items-center justify-center gap-1 sm:gap-1.5 pill-lime px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-black shadow-xs">
      <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-black shrink-0" />
      <span className="hidden sm:inline">{text}</span>
      <span className="sm:hidden inline">{label}</span>
    </div>
  );
});
StatusCell.displayName = "StatusCell";
