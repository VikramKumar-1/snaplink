"use client";

import React, { useState, useCallback, memo } from "react";
import { useLinkCreator } from "./useLinkCreator";
import { HeroCopy } from "./parts/HeroCopy";
import { CreatorCard } from "./parts/CreatorCard";

export const HeroSplitSection: React.FC = memo(() => {
  const [activeTab, setActiveTab] = useState<"link" | "qr" | "cta">("link");
  const creator = useLinkCreator();

  const handleTabChange = useCallback(
    (tab: "link" | "qr" | "cta") => {
      setActiveTab(tab);
    },
    []
  );

  return (
    <div id="hero" className="w-full max-w-6xl mx-auto pt-3 sm:pt-4 pb-2 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <HeroCopy />
        <div className="lg:col-span-7">
          <CreatorCard
            activeTab={activeTab}
            onTabChange={handleTabChange}
            creator={creator}
          />
        </div>
      </div>
    </div>
  );
});

HeroSplitSection.displayName = "HeroSplitSection";
