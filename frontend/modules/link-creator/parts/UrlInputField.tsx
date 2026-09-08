"use client";

import React, { useState } from "react";
import { Link2, Clipboard, Check } from "lucide-react";

interface Props {
  url: string;
  setUrl: (v: string) => void;
  badge: string | null;
}

export const UrlInputField: React.FC<Props> = ({ url, setUrl, badge }) => {
  const [pasted, setPasted] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setPasted(true);
        setTimeout(() => setPasted(false), 1500);
      }
    } catch {}
  };

  const getBadgeStyle = () => {
    if (!badge) return "text-slate-500 border-slate-200";
    if (badge.includes("YouTube")) return "text-red-700 bg-red-50 border-red-200";
    if (badge.includes("Instagram")) return "text-pink-700 bg-pink-50 border-pink-200";
    if (badge.includes("Telegram")) return "text-sky-700 bg-sky-50 border-sky-200";
    if (badge.includes("Amazon")) return "text-amber-800 bg-amber-50 border-amber-200";
    if (badge.includes("Myntra")) return "text-[#ff3f6c] bg-pink-50 border-pink-200";
    if (badge.includes("Flipkart")) return "text-blue-700 bg-blue-50 border-blue-200";
    if (badge.includes("Spotify")) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    return "text-blue-700 bg-blue-50 border-blue-200";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[12.5px] font-bold text-slate-700 uppercase tracking-wider">
          Destination URL <span className="text-blue-600">*</span>
        </label>
        {badge && (
          <div className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getBadgeStyle()}`}>
            ● {badge}
          </div>
        )}
      </div>

      <div className="relative flex items-center clay-input-inset group">
        <Link2 className="absolute left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste destination link (Amazon, YouTube, etc.)..."
          className="w-full pl-9 sm:pl-10 pr-20 sm:pr-24 py-3.5 bg-transparent text-[13px] sm:text-[13.5px] text-slate-900 placeholder-slate-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={handlePaste}
          className="absolute right-1.5 sm:right-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-[11px] sm:text-[11.5px] font-bold flex items-center gap-1.5 transition shadow-xs active:scale-95 cursor-pointer"
        >
          {pasted ? (
            <><Check className="h-3.5 w-3.5 text-emerald-600" />Pasted</>
          ) : (
            <><Clipboard className="h-3.5 w-3.5 text-slate-500" />Paste</>
          )}
        </button>
      </div>
    </div>
  );
};
