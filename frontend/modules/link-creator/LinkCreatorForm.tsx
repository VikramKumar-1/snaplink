"use client";

import React from "react";
import { CornerDownLeft } from "lucide-react";
import { useLinkCreator } from "./useLinkCreator";
import { UrlInputField } from "./parts/UrlInputField";
import { CustomAliasField } from "./parts/CustomAliasField";
import { SocialPreviewOptions } from "./parts/SocialPreviewOptions";
import { CtaOverlayOptions } from "./parts/CtaOverlayOptions";
import { CreatedResultCard } from "./parts/CreatedResultCard";
import { AdvancedRoutingOptions } from "./parts/AdvancedRoutingOptions";
import { SmartRoutingRulesBuilder } from "./parts/SmartRoutingRulesBuilder";
import { UtmCampaignBuilder } from "./parts/UtmCampaignBuilder";

export const LinkCreatorForm: React.FC = () => {
  const {
    url, setUrl, customSlug, setCustomSlug,
    selectedDomain, setSelectedDomain, availableDomains,
    showAdvanced, setShowAdvanced,
    customTitle, setCustomTitle,
    customDescription, setCustomDescription,
    showCta, setShowCta,
    cta, setCta,
    showRouting, setShowRouting,
    routing, setRouting,
    showSmartRules, setShowSmartRules,
    smartRules, setSmartRules,
    showUtm, setShowUtm,
    utm, setUtm,
    retargeting, setRetargeting,
    badge, loading, error, createdResult, handleSubmit,
  } = useLinkCreator();

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="card-genz p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-4">
          <UrlInputField url={url} setUrl={setUrl} badge={badge} />
          <CustomAliasField
            customSlug={customSlug}
            setCustomSlug={setCustomSlug}
            availableDomains={availableDomains}
            selectedDomain={selectedDomain}
            onSelectDomain={setSelectedDomain}
          />
          <SocialPreviewOptions
            showAdvanced={showAdvanced} setShowAdvanced={setShowAdvanced}
            customTitle={customTitle} setCustomTitle={setCustomTitle}
            customDescription={customDescription} setCustomDescription={setCustomDescription}
          />
          <CtaOverlayOptions
            showCta={showCta} setShowCta={setShowCta}
            cta={cta} setCta={setCta}
          />
          <AdvancedRoutingOptions
            showRouting={showRouting} setShowRouting={setShowRouting}
            routing={routing} setRouting={setRouting}
          />
          <SmartRoutingRulesBuilder
            showRules={showSmartRules}
            setShowRules={setShowSmartRules}
            rules={smartRules}
            setRules={setSmartRules}
          />
          <UtmCampaignBuilder
            showUtm={showUtm} setShowUtm={setShowUtm}
            utm={utm} setUtm={setUtm}
            retargeting={retargeting} setRetargeting={setRetargeting}
            destinationUrl={url}
          />

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/15 text-red-400 text-[13px]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 btn-gradient text-[14px] flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </div>
            ) : (
              <>
                Create Smart Deep Link
                <div className="bg-white/15 p-1 rounded-md">
                  <CornerDownLeft className="h-3 w-3" />
                </div>
              </>
            )}
          </button>
        </form>

        {createdResult && <CreatedResultCard result={createdResult} />}
      </div>
    </div>
  );
};
