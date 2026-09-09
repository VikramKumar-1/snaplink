"use client";

import React from "react";
import { Megaphone } from "lucide-react";

interface EditCtaSectionProps {
  ctaEnabled: boolean;
  setCtaEnabled: (val: boolean) => void;
  ctaHeadline: string;
  setCtaHeadline: (val: string) => void;
  ctaButtonText: string;
  setCtaButtonText: (val: string) => void;
  ctaButtonUrl: string;
  setCtaButtonUrl: (val: string) => void;
  ctaTheme: "blue" | "dark" | "emerald" | "amber";
  setCtaTheme: (val: "blue" | "dark" | "emerald" | "amber") => void;
  ctaBadge: string;
  setCtaBadge: (val: string) => void;
}

export const EditCtaSection: React.FC<EditCtaSectionProps> = ({
  ctaEnabled,
  setCtaEnabled,
  ctaHeadline,
  setCtaHeadline,
  ctaButtonText,
  setCtaButtonText,
  ctaButtonUrl,
  setCtaButtonUrl,
  ctaTheme,
  setCtaTheme,
  ctaBadge,
  setCtaBadge,
}) => {
  return (
    <div className="pt-3 border-t border-zinc-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-[#2c35af]" />
          <span className="text-[12px] font-black text-[#121316] uppercase tracking-wider">
            CTA Overlay Banner
          </span>
        </div>
        <input
          type="checkbox"
          checked={ctaEnabled}
          onChange={(e) => setCtaEnabled(e.target.checked)}
          className="h-4 w-4 accent-[#2c35af]"
        />
      </div>

      {ctaEnabled && (
        <div className="space-y-3 p-3.5 rounded-2xl bg-[#faf9f5] border border-[#e7e5dc]">
          <div>
            <label className="text-[11px] font-bold text-zinc-700 block mb-1">
              Headline
            </label>
            <input
              type="text"
              value={ctaHeadline}
              onChange={(e) => setCtaHeadline(e.target.value)}
              placeholder="e.g. Save 20% with code SNAP20"
              className="w-full bento-input px-2.5 py-1.5 text-[12.5px] bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={ctaButtonText}
              onChange={(e) => setCtaButtonText(e.target.value)}
              placeholder="Button Text"
              className="w-full bento-input px-2.5 py-1.5 text-[12px] bg-white"
            />
            <input
              type="text"
              value={ctaBadge}
              onChange={(e) => setCtaBadge(e.target.value)}
              placeholder="Badge Text"
              className="w-full bento-input px-2.5 py-1.5 text-[12px] bg-white"
            />
          </div>
          <input
            type="url"
            value={ctaButtonUrl}
            onChange={(e) => setCtaButtonUrl(e.target.value)}
            placeholder="Button Link URL (https://...)"
            className="w-full bento-input px-2.5 py-1.5 text-[12px] bg-white font-mono"
          />
        </div>
      )}
    </div>
  );
};
