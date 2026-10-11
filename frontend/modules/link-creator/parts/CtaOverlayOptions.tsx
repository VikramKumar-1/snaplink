"use client";

import React from "react";
import { ChevronUp, Megaphone, Check } from "lucide-react";

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
  cta,
  setCta,
}) => {
  const [showPreview, setShowPreview] = React.useState(false);

  const themeKey = cta.theme || "blue";
  const THEME_STYLES = {
    blue: {
      wrapper: "bg-gradient-to-r from-[#2c35af] to-[#1e2580] border-[#4853db]/40 text-white",
      badge: "bg-white/20 text-[#ccff00] border-white/20",
      button: "bg-[#ccff00] text-black hover:bg-[#b8e600]",
      iconColor: "text-[#ccff00]",
    },
    dark: {
      wrapper: "bg-gradient-to-r from-zinc-900 to-zinc-950 border-zinc-700/60 text-white",
      badge: "bg-zinc-800 text-zinc-300 border-zinc-700",
      button: "bg-white text-black hover:bg-zinc-100",
      iconColor: "text-zinc-300",
    },
    emerald: {
      wrapper: "bg-gradient-to-r from-emerald-800 to-emerald-950 border-emerald-500/40 text-white",
      badge: "bg-emerald-900/80 text-emerald-300 border-emerald-600/40",
      button: "bg-emerald-400 text-emerald-950 hover:bg-emerald-300",
      iconColor: "text-emerald-300",
    },
    amber: {
      wrapper: "bg-gradient-to-r from-amber-700 to-amber-950 border-amber-500/40 text-white",
      badge: "bg-amber-900/80 text-amber-300 border-amber-600/40",
      button: "bg-amber-300 text-amber-950 hover:bg-amber-200",
      iconColor: "text-amber-300",
    },
  };
  const styles = THEME_STYLES[themeKey] || THEME_STYLES.blue;

  return (
    <div className="pt-0.5">
      <div className="p-2.5 sm:p-3 rounded-xl glass-clay-subcard space-y-2 bg-white/95 border border-[#e7e5dc] shadow-xs">
        {/* Compact Active Header with Preview Toggle */}
        <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100">
          <div className="flex items-center gap-1.5">
            <Megaphone className="h-3.5 w-3.5 text-[#2c35af]" />
            <span className="text-[11px] font-bold text-slate-800 tracking-tight">
              Promotional Banner Overlay
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowPreview((p) => !p)}
              className="text-[10px] font-bold text-[#2c35af] hover:text-black bg-indigo-50 hover:bg-indigo-100/80 px-2 py-0.5 rounded-md border border-indigo-200/60 transition cursor-pointer flex items-center gap-1"
            >
              <span>{showPreview ? "Hide Preview" : "Preview Banner"}</span>
            </button>
            <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
            </span>
          </div>
        </div>

        {/* Headline / Message */}
        <div>
          <label className="text-[10.5px] font-bold text-slate-700 block mb-0.5">
            Headline / Message
          </label>
          <input
            type="text"
            value={cta.headline}
            onChange={(e) => setCta((prev) => ({ ...prev, headline: e.target.value }))}
            placeholder="e.g., Get 20% off with code SNAP20"
            maxLength={120}
            className="w-full px-2.5 py-1.5 text-[12.5px] text-slate-900 placeholder-slate-400 focus:outline-none rounded-lg border border-[#d6d3c7] bg-[#faf9f5] focus:border-[#2c35af] focus:bg-white transition-colors font-medium"
          />
        </div>

        {/* Button Text & Button URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[10.5px] font-bold text-slate-700 block mb-0.5">
              Button Text
            </label>
            <input
              type="text"
              value={cta.buttonText}
              onChange={(e) => setCta((prev) => ({ ...prev, buttonText: e.target.value }))}
              placeholder="e.g., Claim Deal"
              maxLength={35}
              className="w-full px-2.5 py-1.5 text-[12.5px] text-slate-900 placeholder-slate-400 focus:outline-none rounded-lg border border-[#d6d3c7] bg-[#faf9f5] focus:border-[#2c35af] focus:bg-white transition-colors font-medium"
            />
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-slate-700 block mb-0.5">
              Button Action URL
            </label>
            <input
              type="url"
              value={cta.buttonUrl}
              onChange={(e) => setCta((prev) => ({ ...prev, buttonUrl: e.target.value }))}
              placeholder="https://instagram.com/deal"
              className="w-full px-2.5 py-1.5 text-[12.5px] text-slate-900 placeholder-slate-400 focus:outline-none rounded-lg border border-[#d6d3c7] bg-[#faf9f5] focus:border-[#2c35af] focus:bg-white transition-colors font-medium"
            />
          </div>
        </div>

        {/* Badge & Theme Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-end">
          <div>
            <label className="text-[10.5px] font-bold text-slate-700 block mb-0.5">
              Badge Label
            </label>
            <input
              type="text"
              value={cta.badgeText}
              onChange={(e) => setCta((prev) => ({ ...prev, badgeText: e.target.value }))}
              placeholder="e.g., Featured"
              maxLength={25}
              className="w-full px-2.5 py-1.5 text-[12.5px] text-slate-900 placeholder-slate-400 focus:outline-none rounded-lg border border-[#d6d3c7] bg-[#faf9f5] focus:border-[#2c35af] focus:bg-white transition-colors font-medium"
            />
          </div>

          <div>
            <label className="text-[10.5px] font-bold text-slate-700 block mb-0.5">
              Banner Theme
            </label>
            <div className="flex items-center gap-1 h-[32px]">
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCta((prev) => ({ ...prev, theme: t.id }))}
                  className={`flex-1 h-full rounded-lg text-[10.5px] font-bold flex items-center justify-center gap-1 border transition cursor-pointer px-1 ${
                    cta.theme === t.id
                      ? "border-[#2c35af] bg-indigo-50/80 text-[#2c35af] ring-1.5 ring-[#2c35af]/20 shadow-xs"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                  }`}
                  title={t.label}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${t.bg} shrink-0`} />
                  <span className="truncate hidden sm:inline text-[9.5px]">{t.label.split(" ")[0]}</span>
                  {cta.theme === t.id && <Check className="h-2.5 w-2.5 shrink-0 ml-0.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Toggleable Live Banner Preview */}
        {showPreview && (
          <div className="pt-1.5 border-t border-zinc-200/80 animate-fade-in">
            <div className={`w-full p-2 sm:p-2.5 rounded-lg border shadow-xs transition-all ${styles.wrapper}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1">
                  <div className="p-0.5 rounded bg-white/10">
                    <Megaphone className={`h-2.5 w-2.5 ${styles.iconColor}`} />
                  </div>
                  <span className={`text-[8.5px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${styles.badge}`}>
                    {cta.badgeText || "Featured"}
                  </span>
                </div>
                <span className="text-[9px] text-white/50 font-mono">Live preview</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <p className="text-[11.5px] font-bold leading-tight text-white/95 truncate">
                  {cta.headline || "Your headline will appear here..."}
                </p>
                <div className={`py-0.5 px-2 rounded-md font-bold text-[10.5px] flex items-center gap-1 shrink-0 ${styles.button}`}>
                  <span>{cta.buttonText || "Claim Deal"}</span>
                  <ChevronUp className="h-2.5 w-2.5 rotate-45" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
