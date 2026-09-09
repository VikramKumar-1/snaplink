"use client";

import React, { useState } from "react";
import { ExternalLink, X, ArrowUpRight, Megaphone } from "lucide-react";

export interface CtaOverlayData {
  enabled: boolean;
  headline: string;
  buttonText: string;
  buttonUrl: string;
  theme?: "blue" | "dark" | "emerald" | "amber";
  badgeText?: string;
}

interface Props {
  cta: CtaOverlayData;
}

const THEME_STYLES = {
  blue: {
    wrapper: "bg-gradient-to-r from-[#2c35af] to-[#1e2580] border-[#4853db]/40 text-white shadow-indigo-950/40",
    badge: "bg-white/20 text-[#ccff00] border-white/20",
    button: "bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-black/20",
    iconColor: "text-[#ccff00]",
  },
  dark: {
    wrapper: "bg-gradient-to-r from-zinc-900 to-zinc-950 border-zinc-700/60 text-white shadow-black/50",
    badge: "bg-zinc-800 text-zinc-300 border-zinc-700",
    button: "bg-white hover:bg-zinc-100 text-black shadow-black/20",
    iconColor: "text-zinc-300",
  },
  emerald: {
    wrapper: "bg-gradient-to-r from-emerald-800 to-emerald-950 border-emerald-500/40 text-white shadow-emerald-950/40",
    badge: "bg-emerald-900/80 text-emerald-300 border-emerald-600/40",
    button: "bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold",
    iconColor: "text-emerald-300",
  },
  amber: {
    wrapper: "bg-gradient-to-r from-amber-700 to-amber-950 border-amber-500/40 text-white shadow-amber-950/40",
    badge: "bg-amber-900/80 text-amber-300 border-amber-600/40",
    button: "bg-amber-300 hover:bg-amber-200 text-amber-950 font-bold",
    iconColor: "text-amber-300",
  },
};

export const CtaFloatingBanner: React.FC<Props> = ({ cta }) => {
  const [dismissed, setDismissed] = useState(false);

  if (!cta?.enabled || dismissed || !cta.headline) {
    return null;
  }

  const themeKey = cta.theme || "blue";
  const styles = THEME_STYLES[themeKey] || THEME_STYLES.blue;

  return (
    <aside
      aria-label="Creator Call to Action"
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl border backdrop-blur-md shadow-2xl transition-all duration-300 animate-slide-up ${styles.wrapper}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-white/10">
            <Megaphone className={`h-3.5 w-3.5 ${styles.iconColor}`} />
          </div>
          <span className={`text-[10.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles.badge}`}>
            {cta.badgeText || "Special Pick"}
          </span>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-white/60 hover:text-white p-1 rounded-lg transition hover:bg-white/10"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="text-[13.5px] font-bold leading-snug mb-3.5 text-white/95 line-clamp-2">
        {cta.headline}
      </p>

      {cta.buttonUrl && (
        <a
          href={cta.buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-[13px] flex items-center justify-center gap-1.5 transition active:scale-[0.98] shadow-md ${styles.button}`}
        >
          <span>{cta.buttonText || "Check It Out"}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
    </aside>
  );
};
