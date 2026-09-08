"use client";

import React, { useState, useCallback } from "react";
import { SocialPreviewHeader, SocialPlatform } from "./parts/SocialPreviewHeader";
import { SocialRawCard } from "./parts/SocialRawCard";
import { SocialRichCard } from "./parts/SocialRichCard";

export const SocialPreviewDemo: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<SocialPlatform>("whatsapp");
  const handleSelectTab = useCallback((tab: SocialPlatform) => setActiveTab(tab), []);

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <SocialPreviewHeader activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* 📱 Mobile: Horizontal Snap Carousel | 🖥️ Desktop: 2-Column Grid */}
      <div className="flex md:grid overflow-x-auto md:overflow-visible scrollbar-none snap-x snap-mandatory md:snap-none gap-4 md:gap-8 pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-2">
        <SocialRawCard platform={activeTab} />
        <SocialRichCard platform={activeTab} />
      </div>
      <div className="md:hidden text-center text-[10.5px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-2">
        ← Swipe to compare Raw vs Rich Card →
      </div>
    </section>
  );
});

SocialPreviewDemo.displayName = "SocialPreviewDemo";
