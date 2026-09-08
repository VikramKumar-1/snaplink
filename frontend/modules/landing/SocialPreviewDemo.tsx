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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <SocialRawCard platform={activeTab} />
        <SocialRichCard platform={activeTab} />
      </div>
    </section>
  );
});

SocialPreviewDemo.displayName = "SocialPreviewDemo";
