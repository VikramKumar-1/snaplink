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
      <div className="p-4 rounded-2xl glass-clay-subcard space-y-3.5 bg-white/90 border border-[#e7e5dc]">
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCta((prev) => ({ ...prev, theme: t.id }))}
                  className={`w-full px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-xl text-[11px] sm:text-[11.5px] font-bold flex items-center justify-center gap-1.5 border transition cursor-pointer ${
                    cta.theme === t.id
                      ? "border-[#2c35af] bg-indigo-50 text-[#2c35af] ring-2 ring-[#2c35af]/20"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${t.bg} shrink-0`} />
                  <span className="truncate">{t.label}</span>
                  {cta.theme === t.id && <Check className="h-3 w-3 ml-0.5 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
          {/* LIVE PREVIEW PANE */}
          <div className="mt-4 pt-4 border-t border-zinc-200">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3 flex items-center gap-1.5">
              Live Preview <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </label>
            
            <div className="relative w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-4 sm:p-5 overflow-hidden">
              {/* Fake Background UI */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-zinc-900 to-zinc-900"></div>
              </div>
              
              <div className="text-center opacity-40 blur-[1px] select-none pointer-events-none">
                <div className="mx-auto mb-3 h-10 w-10 rounded-xl bg-indigo-500/30"></div>
                <div className="h-3 w-3/4 mx-auto bg-zinc-700 rounded-full mb-2"></div>
                <div className="h-2 w-1/2 mx-auto bg-zinc-700 rounded-full mb-6"></div>
                <div className="h-8 w-full bg-zinc-800 rounded-lg"></div>
              </div>

              {/* The CTA Overlay Preview */}
              <div className="relative mt-4">
                {(() => {
                  const themeKey = cta.theme || "blue";
                  const THEME_STYLES = {
                    blue: { wrapper: "bg-gradient-to-r from-[#2c35af] to-[#1e2580] border-[#4853db]/40 text-white", badge: "bg-white/20 text-[#ccff00] border-white/20", button: "bg-[#ccff00] text-black", iconColor: "text-[#ccff00]" },
                    dark: { wrapper: "bg-gradient-to-r from-zinc-900 to-zinc-950 border-zinc-700/60 text-white", badge: "bg-zinc-800 text-zinc-300 border-zinc-700", button: "bg-white text-black", iconColor: "text-zinc-300" },
                    emerald: { wrapper: "bg-gradient-to-r from-emerald-800 to-emerald-950 border-emerald-500/40 text-white", badge: "bg-emerald-900/80 text-emerald-300 border-emerald-600/40", button: "bg-emerald-400 text-emerald-950", iconColor: "text-emerald-300" },
                    amber: { wrapper: "bg-gradient-to-r from-amber-700 to-amber-950 border-amber-500/40 text-white", badge: "bg-amber-900/80 text-amber-300 border-amber-600/40", button: "bg-amber-300 text-amber-950", iconColor: "text-amber-300" },
                  };
                  const styles = THEME_STYLES[themeKey];
                  
                  return (
                    <div className={`w-full p-3.5 rounded-2xl border shadow-xl ${styles.wrapper}`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-md bg-white/10">
                            <Megaphone className={`h-3 w-3 ${styles.iconColor}`} />
                          </div>
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles.badge}`}>
                            {cta.badgeText || "Featured"}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-[12.5px] font-bold leading-snug mb-3 text-white/95 line-clamp-2">
                        {cta.headline || "Your headline will appear here like this."}
                      </p>
                      
                      <div className={`w-full py-2 px-4 rounded-xl font-bold text-[12px] flex items-center justify-center gap-1.5 ${styles.button}`}>
                        <span>{cta.buttonText || "Claim Deal"}</span>
                        <ChevronUp className="h-3.5 w-3.5 rotate-45" />
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
