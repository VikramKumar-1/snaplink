"use client";

import React, { useEffect } from "react";

interface RetargetingPixelBridgeProps {
  metaPixelId?: string;
  googleAnalyticsId?: string;
}

export const RetargetingPixelBridge: React.FC<RetargetingPixelBridgeProps> = ({
  metaPixelId,
  googleAnalyticsId,
}) => {
  useEffect(() => {
    // 1. Meta (Facebook) Pixel Injection
    if (metaPixelId && metaPixelId.trim() !== "") {
      const cleanPixelId = metaPixelId.trim();
      if (!(window as any).fbq) {
        const n: any = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        (window as any)._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        const t = document.createElement("script");
        t.async = true;
        t.src = "https://connect.facebook.net/en_US/fbevents.js";
        const s = document.getElementsByTagName("script")[0];
        s?.parentNode?.insertBefore(t, s);
        (window as any).fbq = n;
      }
      try {
        (window as any).fbq("init", cleanPixelId);
        (window as any).fbq("track", "PageView");
      } catch (err) {
        console.warn("Meta Pixel init error:", err);
      }
    }

    // 2. Google Analytics (GA4 / GTM) Injection
    if (googleAnalyticsId && googleAnalyticsId.trim() !== "") {
      const cleanGaId = googleAnalyticsId.trim();
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${cleanGaId}`;
      document.head.appendChild(gaScript);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", cleanGaId);
    }
  }, [metaPixelId, googleAnalyticsId]);

  return null;
};
