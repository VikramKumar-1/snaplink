"use client";

import React from "react";
import { ChevronDown, ChevronUp, ImageIcon } from "lucide-react";

interface Props {
  showAdvanced: boolean;
  setShowAdvanced: (v: boolean) => void;
  customTitle: string;
  setCustomTitle: (v: string) => void;
  customDescription: string;
  setCustomDescription: (v: string) => void;
}

export const SocialPreviewOptions: React.FC<Props> = ({
  showAdvanced,
  setShowAdvanced,
  customTitle,
  setCustomTitle,
  customDescription,
  setCustomDescription,
}) => {
  return (
    <div className="pt-1">
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-[13px] font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-2 transition cursor-pointer"
      >
        <ImageIcon className="h-4 w-4 text-blue-600" />
        Customize WhatsApp / Twitter Preview
        {showAdvanced ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>

      {showAdvanced && (
        <div className="mt-3 p-4 rounded-2xl glass-clay-subcard space-y-3 bg-white/90">
          <div>
            <label className="text-[12px] font-bold text-slate-700 block mb-1.5">
              Custom Title (WhatsApp Preview)
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="e.g., 🔥 60% OFF - Sony Wireless Earbuds"
              className="w-full px-3.5 py-2.5 text-[16px] sm:text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none rounded-xl border border-[#d6d3c7] bg-[#faf9f5] focus:border-[#2c35af] focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold text-slate-700 block mb-1.5">
              Custom Description
            </label>
            <input
              type="text"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder="e.g., Limited time deal for followers. Tap to buy."
              className="w-full px-3.5 py-2.5 text-[16px] sm:text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none rounded-xl border border-[#d6d3c7] bg-[#faf9f5] focus:border-[#2c35af] focus:bg-white transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  );
};
