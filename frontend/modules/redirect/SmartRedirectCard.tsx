"use client";

import React, { useEffect, useState } from "react";
import { Zap, ArrowRight, ShieldCheck } from "lucide-react";

interface Props {
  link: any;
  deepLinkInfo: any;
  device: string;
  inAppBrowser: boolean;
}

export const SmartRedirectCard: React.FC<Props> = ({
  link,
  deepLinkInfo,
  device,
}) => {
  const [countdown, setCountdown] = useState(1);

  const targetAppUrl =
    device === "android"
      ? deepLinkInfo.deepLinkAndroid || link.originalUrl
      : device === "ios"
      ? deepLinkInfo.deepLinkIos || link.originalUrl
      : link.originalUrl;

  const triggerOpen = () => {
    // 1. Immediately launch native app intent
    window.location.href = targetAppUrl;

    // 2. Safe Fallback: if native app does not open within 1.2s, open standard web page
    setTimeout(() => {
      window.location.href = link.originalUrl;
    }, 1200);
  };

  useEffect(() => {
    // INSTANT: Fire the native intent immediately at 0.00s!
    triggerOpen();

    // Fast 1s timer for UI feedback / web fallback
    const timer = setTimeout(() => {
      setCountdown(0);
      window.location.href = link.originalUrl;
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-zinc-800/80 p-6 shadow-2xl text-center relative overflow-hidden animate-fade-in">
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
        <Zap className="h-7 w-7 text-white fill-white animate-bounce" />
      </div>

      <h1 className="text-xl font-extrabold text-white mb-1.5 tracking-tight">
        Launching {link.platform.toUpperCase()} App
      </h1>

      <p className="text-xs text-zinc-400 mb-6 flex items-center justify-center gap-1.5 font-medium">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        Bypassing in-app webview
      </p>

      <div className="mb-6 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/60">
        <div className="text-xs text-zinc-400 mb-2 font-medium">
          Redirecting in <span className="text-white font-bold text-sm">{countdown}s</span>...
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((2 - countdown) / 2) * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={triggerOpen}
        className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition active:scale-[0.98]"
      >
        <span>Open Now</span>
        <ArrowRight className="h-4 w-4" />
      </button>

      <a
        href={link.originalUrl}
        className="block mt-3 text-xs text-zinc-500 hover:text-zinc-400 transition"
      >
        Or open in web browser
      </a>

      <div className="mt-8 pt-4 border-t border-zinc-800/60">
        <a
          href="/"
          className="text-[11px] font-medium text-zinc-400 hover:text-indigo-400 transition flex items-center justify-center gap-1"
        >
          ⚡ Powered by <span className="font-bold text-zinc-300">SmartDeepLink</span>
        </a>
      </div>
    </div>
  );
};
