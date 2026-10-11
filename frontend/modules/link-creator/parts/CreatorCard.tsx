"use client";

import React, { memo } from "react";
import { CreatorTabs } from "./CreatorTabs";
import { CreatorForm } from "./CreatorForm";
import { CreatedResultCard } from "./CreatedResultCard";
import { useLinkCreator } from "../useLinkCreator";
import { QrCodeGeneratorForm } from "./QrCodeGeneratorForm";

interface CreatorCardProps {
  activeTab: "link" | "qr" | "cta";
  onTabChange: (tab: "link" | "qr" | "cta") => void;
  creator: ReturnType<typeof useLinkCreator>;
}

export const CreatorCard: React.FC<CreatorCardProps> = memo(
  ({ activeTab, onTabChange, creator }) => (
    <div id="creator-card" className="w-full bento-card-light overflow-hidden transform-gpu">
      <CreatorTabs activeTab={activeTab} onTabChange={onTabChange} />
      <div className="p-3.5 sm:p-5 bg-white">
        {activeTab === "qr" ? (
          <QrCodeGeneratorForm />
        ) : (
          <>
            <CreatorForm
              url={creator.url}
              setUrl={creator.setUrl}
              customSlug={creator.customSlug}
              setCustomSlug={creator.setCustomSlug}
              showAdvanced={creator.showAdvanced}
              setShowAdvanced={creator.setShowAdvanced}
              customTitle={creator.customTitle}
              setCustomTitle={creator.setCustomTitle}
              customDescription={creator.customDescription}
              setCustomDescription={creator.setCustomDescription}
              showCta={creator.showCta}
              setShowCta={creator.setShowCta}
              cta={creator.cta}
              setCta={creator.setCta}
              showSmartRules={creator.showSmartRules}
              setShowSmartRules={creator.setShowSmartRules}
              smartRules={creator.smartRules}
              setSmartRules={creator.setSmartRules}
              badge={creator.badge}
              loading={creator.loading}
              error={creator.error}
              onSubmit={creator.handleSubmit}
              isCtaMode={activeTab === "cta"}
            />
            {creator.createdResult && <CreatedResultCard result={creator.createdResult} />}
          </>
        )}
        <div className="mt-2.5 pt-2 border-t border-[#f0eee6] text-center text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider">
          Official Android &amp; Apple Intent Protocols &middot; Zero Interstitial Ads
        </div>
      </div>
    </div>
  )
);

CreatorCard.displayName = "CreatorCard";
