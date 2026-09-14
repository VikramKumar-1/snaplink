"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { useLinkStore } from "@/frontend/shared/store/useLinkStore";
import { getBaseUrl } from "@/frontend/shared/lib/utils";
import { RecentLinksHeader } from "./parts/RecentLinksHeader";
import { RecentLinkItem } from "./parts/RecentLinkItem";

export const RecentLinks: React.FC = memo(() => {
  const recentLinks = useLinkStore((s) => s.recentLinks);
  const setRecentLinks = useLinkStore((s) => s.setRecentLinks);
  const openQrModal = useLinkStore((s) => s.openQrModal);
  const openAnalyticsModal = useLinkStore((s) => s.openAnalyticsModal);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("recent_smart_links");
      if (stored) setRecentLinks(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to load stored links", e);
    }
  }, [setRecentLinks]);

  const copyLink = useCallback((shortCode: string) => {
    navigator.clipboard.writeText(`${getBaseUrl()}/${shortCode}`);
    setCopiedCode(shortCode);
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  if (recentLinks.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto my-4 transform-gpu">
      <RecentLinksHeader count={recentLinks.length} />
      <div className="space-y-2.5">
        {recentLinks.slice(0, 3).map((link) => (
          <RecentLinkItem
            key={link.shortCode}
            link={link}
            isCopied={copiedCode === link.shortCode}
            onCopy={copyLink}
            onOpenQr={openQrModal}
            onOpenAnalytics={openAnalyticsModal}
          />
        ))}
      </div>
      
      {recentLinks.length > 3 && (
        <div className="mt-4 text-center">
          <a href="/dashboard" className="text-[12px] font-bold text-zinc-500 hover:text-[#2c35af] transition-colors underline decoration-zinc-300 underline-offset-4">
            View all {recentLinks.length} links in Dashboard →
          </a>
        </div>
      )}
    </div>
  );
});

RecentLinks.displayName = "RecentLinks";
