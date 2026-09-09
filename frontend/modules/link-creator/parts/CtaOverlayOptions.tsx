"use client";

import React from "react";
import { ChevronDown, ChevronUp, Megaphone, Check } from "lucide-react";

export interface CtaState {
  enabled: boolean;
  headline: string;
  buttonText: string;
  buttonUrl: string;
  theme: "blue" | "dark" | "emerald" | "amber";
  badgeText: string;
}

interface Props {
  showCta: boolean;
  setShowCta: (v: boolean) => void;
  cta: CtaState;
  setCta: React.Dispatch<React.SetStateAction<CtaState>>;
}

const THEME_OPTIONS = [
  { id: "blue", label: "Royal Blue", bg: "bg-[#2c35af]" },
  { id: "dark", label: "Pitch Dark", bg: "bg-zinc-900" },
  { id: "emerald", label: "Emerald", bg: "bg-emerald-700" },
  { id: "amber", label: "Warm Gold", bg: "bg-amber-600" },
] as const;

export const CtaOverlayOptions: React.FC<Props> = ({
  showCta,
  setShowCta,
  cta,
  setCta,
}) => {
  return (
    <div className="pt-1">
      <button
        type="button"
        onClick={() => setShowCta(!showCta)}
        className="text-[13px] font-semibold text-slate-600 hover:text-[#2c35af] flex items-center gap-2 transition cursor-pointer"
      >
        <Megaphone className="h-4 w-4 text-[#2c35af]" />
        Attach CTA Overlay (Floating Action Banner)
        {cta.enabled && (
          <span className="text-[10px] font-mono font-bold bg-[#ccff00] text-black px-2 py-0.5 rounded-full uppercase">
            Active
          </span>
        )}
        {showCta ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>

      {showCta && (
        <div className="mt-3 p-4 rounded-2xl glass-clay-subcard space-y-3.5 bg-white/90 border border-[#e7e5dc]">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
            <div>
              <span className="text-[12.5px] font-bold text-slate-800 block">Enable CTA Banner</span>
              <span className="text-[11px] text-zinc-500">Displays a floating callout when visitors tap your link</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={cta.enabled}
                onChange={(e) => setCta((prev) => ({ ...prev, enabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2c35af]"></div>
            </label>
          </div>

          <div>
            <label className="text-[12px] font-bold text-slate-700 block mb-1">
              CTA Headline / Message
            </label>
            <input
              type="text"
              value={cta.headline}
              onChange={(e) => setCta((prev) => ({ ...prev, headline: e.target.value }))}
              placeholder="e.g., Get 20% off my presets with code SNAP20"
              maxLength={120}
              className="w-full px-3.5 py-2.5 text-[16px] sm:text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none rounded-xl border border-[#d6d3c7] bg-[#faf9f5] focus:border-[#2c35af] focus:bg-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] font-bold text-slate-700 block mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={cta.buttonText}
                onChange={(e) => setCta((prev) => ({ ...prev, buttonText: e.target.value }))}
                placeholder="e.g., Claim Deal"
                maxLength={35}
                className="w-full px-3.5 py-2.5 text-[16px] sm:text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none rounded-xl border border-[#d6d3c7] bg-[#faf9f5] focus:border-[#2c35af] focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="text-[12px] font-bold text-slate-700 block mb-1">
                Badge Label
              </label>
              <input
                type="text"
                value={cta.badgeText}
                onChange={(e) => setCta((prev) => ({ ...prev, badgeText: e.target.value }))}
                placeholder="e.g., Special Pick"
                maxLength={25}
                className="w-full px-3.5 py-2.5 text-[16px] sm:text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none rounded-xl border border-[#d6d3c7] bg-[#faf9f5] focus:border-[#2c35af] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-bold text-slate-700 block mb-1">
              Button Action URL
            </label>
            <input
              type="url"
              value={cta.buttonUrl}
              onChange={(e) => setCta((prev) => ({ ...prev, buttonUrl: e.target.value }))}
              placeholder="https://instagram.com/yourhandle or coupon link"
              className="w-full px-3.5 py-2.5 text-[16px] sm:text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none rounded-xl border border-[#d6d3c7] bg-[#faf9f5] focus:border-[#2c35af] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="text-[12px] font-bold text-slate-700 block mb-1.5">
              Banner Theme
            </label>
            <div className="flex items-center gap-2">
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCta((prev) => ({ ...prev, theme: t.id }))}
                  className={`px-3 py-1.5 rounded-xl text-[11.5px] font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                    cta.theme === t.id
                      ? "border-[#2c35af] bg-indigo-50 text-[#2c35af] ring-2 ring-[#2c35af]/20"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${t.bg}`} />
                  {t.label}
                  {cta.theme === t.id && <Check className="h-3 w-3 ml-0.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
