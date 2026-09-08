"use client";

import React, { memo } from "react";
import { Check, X, AlertCircle, Sparkles } from "lucide-react";

interface StatusCellProps {
  type: "success" | "danger" | "warning" | "badge";
  text: string;
}

export const StatusCell: React.FC<StatusCellProps> = memo(({ type, text }) => {
  if (type === "success") {
    return (
      <div className="inline-flex items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-[#ccff00] text-black flex items-center justify-center shrink-0 shadow-xs">
          <Check className="h-3 w-3 stroke-[3.5]" />
        </div>
        <span className="text-zinc-900 font-extrabold">{text}</span>
      </div>
    );
  }
  if (type === "danger") {
    return (
      <div className="inline-flex items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
          <X className="h-3 w-3 stroke-[3]" />
        </div>
        <span className="text-zinc-500 font-medium">{text}</span>
      </div>
    );
  }
  if (type === "warning") {
    return (
      <div className="inline-flex items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <AlertCircle className="h-3 w-3 stroke-[2.5]" />
        </div>
        <span className="text-zinc-600 font-medium">{text}</span>
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 pill-lime px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-black shadow-xs">
      <Sparkles className="h-3.5 w-3.5" />
      <span>{text}</span>
    </div>
  );
});
StatusCell.displayName = "StatusCell";
