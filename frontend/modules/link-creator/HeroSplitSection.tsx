"use client";

import React, { useState, useCallback, memo } from "react";
import { useLinkCreator } from "./useLinkCreator";
import { HeroCopy } from "./parts/HeroCopy";
import { CreatorCard } from "./parts/CreatorCard";
import { useLinkStore } from "@/frontend/shared/store/useLinkStore";

export const HeroSplitSection: React.FC = memo(() => {
  const [activeTab, setActiveTab] = useState<"link" | "qr" | "bulk">("link");
  const openQrModal = useLinkStore((s) => s.openQrModal);
  const creator = useLinkCreator();

  const handleQrTabChange = useCallback(
    (tab: "link" | "qr" | "bulk") => {
      setActiveTab(tab);
      if (tab === "qr" && creator.createdResult) {
        openQrModal(creator.createdResult as any);
      }
    },
    [creator.createdResult, openQrModal]
  );

  return (
    <div id="hero" className="w-full max-w-6xl mx-auto pt-6 sm:pt-12 pb-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <HeroCopy />
        <div className="lg:col-span-7">
          <CreatorCard
            activeTab={activeTab}
            onTabChange={handleQrTabChange}
            creator={creator}
          />
        </div>
      </div>
    </div>
  );
});

HeroSplitSection.displayName = "HeroSplitSection";
