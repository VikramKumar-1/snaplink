"use client";

import React, { useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

interface InstantMobileRedirectProps {
  platform: string;
  targetAppUrl: string;
  fallbackUrl: string;
}

export const InstantMobileRedirect: React.FC<InstantMobileRedirectProps> = ({
  platform,
  targetAppUrl,
  fallbackUrl,
}) => {
  useEffect(() => {
    // 1. Immediately launch native app intent
    try {
      window.location.replace(targetAppUrl);
    } catch {
      window.location.href = targetAppUrl;
    }

    // 2. If app opens, window blurs — cancel web fallback
    let fallbackTimer: NodeJS.Timeout | null = setTimeout(() => {
      window.location.replace(fallbackUrl);
    }, 450);

    const clearTimer = () => {
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
    };

    window.addEventListener("pagehide", clearTimer);
    window.addEventListener("blur", clearTimer);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearTimer();
    });

    return () => {
      clearTimer();
      window.removeEventListener("pagehide", clearTimer);
      window.removeEventListener("blur", clearTimer);
    };
  }, [targetAppUrl, fallbackUrl]);

  return (
    <div className="w-full max-w-sm rounded-[28px] bg-zinc-900 border border-zinc-800 p-6 shadow-2xl text-center animate-fade-in relative">
      <meta httpEquiv="refresh" content={`0;url=${targetAppUrl}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                window.location.replace(${JSON.stringify(targetAppUrl)});
              } catch(e) {
                window.location.href = ${JSON.stringify(targetAppUrl)};
              }
            })();
          `,
        }}
      />

      <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-[#2c35af]/20 border border-[#2c35af]/40 flex items-center justify-center">
        <div className="h-5 w-5 border-2 border-[#2c35af] border-t-transparent rounded-full animate-spin" />
      </div>

      <h1 className="text-lg font-black text-white mb-1 tracking-tight capitalize">
        Opening in {platform} App...
      </h1>
      <p className="text-xs text-zinc-400 mb-5">
        Launching official mobile app directly
      </p>

      <a
        href={targetAppUrl}
        className="w-full py-3 px-4 rounded-xl btn-bento-primary text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
      >
        <span>Open App Now</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </a>

      <a
        href={fallbackUrl}
        className="mt-3.5 inline-flex items-center gap-1 text-[11.5px] text-zinc-400 hover:text-white transition"
      >
        <span>Open in web browser instead</span>
        <ExternalLink className="h-3 w-3" />
      </a>

      <div className="mt-5 pt-3 border-t border-zinc-800/80 text-[10px] text-zinc-500 font-mono">
        {BRAND_CONFIG.name} Intent Engine
      </div>
    </div>
  );
};
