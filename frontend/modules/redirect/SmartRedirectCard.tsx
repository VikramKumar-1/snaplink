"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { ArrowRight, Globe, Download, RefreshCw } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";
import { CtaFloatingBanner } from "./parts/CtaFloatingBanner";

interface Props {
  link: any;
  deepLinkInfo: {
    platform: string;
    appName: string;
    deepLinkAndroid?: string;
    deepLinkIos?: string;
    fallbackUrl: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    androidPackage?: string;
  };
  device: string;
  inAppBrowser: boolean;
}

export const SmartRedirectCard: React.FC<Props> = ({
  link,
  deepLinkInfo,
  device,
  inAppBrowser,
}) => {
  const [countdown, setCountdown] = useState<number>(4);
  const [appOpened, setAppOpened] = useState<boolean>(false);
  const [showFallbackOptions, setShowFallbackOptions] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const targetAppUrl =
    device === "android"
      ? deepLinkInfo.deepLinkAndroid || link.originalUrl
      : device === "ios"
      ? deepLinkInfo.deepLinkIos || link.originalUrl
      : link.originalUrl;

  const appName = deepLinkInfo.appName || link.platform || "App";

  const storeUrl =
    device === "android"
      ? deepLinkInfo.playStoreUrl
      : device === "ios"
      ? deepLinkInfo.appStoreUrl
      : deepLinkInfo.playStoreUrl || deepLinkInfo.appStoreUrl;

  const storeName = device === "ios" ? "App Store" : "Google Play";

  const cancelTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const triggerOpen = useCallback(() => {
    try {
      window.location.href = targetAppUrl;
    } catch {
      window.location.replace(targetAppUrl);
    }
  }, [targetAppUrl]);

  useEffect(() => {
    // 1. Initial attempt to launch native app
    const initialLaunchTimeout = setTimeout(() => {
      triggerOpen();
    }, 100);

    // 2. Lifecycle listeners: If the app opens, browser goes to background
    const handleAppLaunched = () => {
      setAppOpened(true);
      cancelTimer();
    };

    window.addEventListener("pagehide", handleAppLaunched);
    window.addEventListener("blur", handleAppLaunched);
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleAppLaunched();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 3. Graceful countdown: Gives the OS plenty of time (4s) to launch app
    // If still on page after 2.5s, reveal fallback options (app not installed)
    const fallbackRevealTimeout = setTimeout(() => {
      setShowFallbackOptions(true);
    }, 2500);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          cancelTimer();
          // Gentle auto-fallback to web version if user took no action
          window.location.href = link.originalUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(initialLaunchTimeout);
      clearTimeout(fallbackRevealTimeout);
      cancelTimer();
      window.removeEventListener("pagehide", handleAppLaunched);
      window.removeEventListener("blur", handleAppLaunched);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [triggerOpen, cancelTimer, link.originalUrl]);

  return (
    <>
      <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-zinc-800/80 p-6 shadow-2xl text-center relative overflow-hidden animate-fade-in">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Platform Status Header */}
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <span className="h-3 w-3 rounded-full bg-[#ccff00] animate-ping" />
        </div>

        <h1 className="text-xl font-extrabold text-white mb-1 tracking-tight">
          Opening {appName}
        </h1>

        <p className="text-xs text-zinc-400 mb-5 flex items-center justify-center gap-1.5 font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
          Direct Native Intent &middot; Safe Redirect
        </p>

        {/* Countdown & Status Banner */}
        <div className="mb-5 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/60">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-medium">
            <span>{appOpened ? "App Launched" : "Launching..."}</span>
            <span className="text-zinc-200 font-mono text-[11px]">
              Web in <span className="text-white font-bold">{countdown}s</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-[#ccff00] transition-all duration-1000 ease-linear"
              style={{ width: `${((4 - countdown) / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Primary Action: Launch in App */}
        <button
          onClick={() => {
            cancelTimer();
            triggerOpen();
          }}
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition active:scale-[0.98]"
        >
          <span>Open in {appName}</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* Fallback & Not Installed Actions */}
        <div className={`mt-3 space-y-2 transition-opacity duration-500 ${showFallbackOptions ? "opacity-100 ring-1 ring-zinc-800/80 p-2 rounded-2xl bg-zinc-950/40" : "opacity-90"}`}>
          {/* Continue in Browser Button */}
          <a
            href={link.originalUrl}
            onClick={cancelTimer}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-xs flex items-center justify-center gap-2 border border-zinc-700/60 transition active:scale-[0.98]"
          >
            <Globe className="h-3.5 w-3.5 text-zinc-400" />
            <span>Continue in Web Browser</span>
          </a>

          {/* Download App from Store Button (if available) */}
          {storeUrl && (
            <a
              href={storeUrl}
              onClick={cancelTimer}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-800/50 text-zinc-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 border border-zinc-800/80 transition"
            >
              <Download className="h-3.5 w-3.5 text-[#ccff00]" />
              <span>Get {appName} on {storeName}</span>
            </a>
          )}
        </div>

        {/* In-App Browser Helper Tip */}
        {inAppBrowser && (
          <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
            Tip: Tap <strong className="text-zinc-400">⋮</strong> or <strong className="text-zinc-400">⋯</strong> at top-right and choose <span className="text-zinc-300 font-medium">"Open in Chrome / Safari"</span> for 1-tap app launch.
          </p>
        )}

        {/* Brand Footer */}
        <div className="mt-5 pt-3.5 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
          <button
            onClick={() => {
              cancelTimer();
              triggerOpen();
            }}
            className="hover:text-zinc-300 transition flex items-center gap-1 font-medium"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Retry</span>
          </button>
          <a
            href="/"
            className="hover:text-indigo-400 transition flex items-center gap-1 font-medium"
          >
            Powered by <span className="font-bold text-zinc-300">{BRAND_CONFIG.name}</span>
          </a>
        </div>
      </div>

      {link.ctaOverlay?.enabled && <CtaFloatingBanner cta={link.ctaOverlay} />}
    </>
  );
};
