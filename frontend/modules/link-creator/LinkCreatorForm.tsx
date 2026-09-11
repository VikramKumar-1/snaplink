"use client";

import React, { useState } from "react";
import { CornerDownLeft, Copy, Check, Link2, ListPlus } from "lucide-react";
import { useLinkCreator } from "./useLinkCreator";
import { useBulkLinkCreator } from "./useBulkLinkCreator";
import { UrlInputField } from "./parts/UrlInputField";
import { CustomAliasField } from "./parts/CustomAliasField";
import { SocialPreviewOptions } from "./parts/SocialPreviewOptions";
import { CtaOverlayOptions } from "./parts/CtaOverlayOptions";
import { CreatedResultCard } from "./parts/CreatedResultCard";
import { AdvancedRoutingOptions } from "./parts/AdvancedRoutingOptions";
import { SmartRoutingRulesBuilder } from "./parts/SmartRoutingRulesBuilder";
import { UtmCampaignBuilder } from "./parts/UtmCampaignBuilder";

export const LinkCreatorForm: React.FC = () => {
  const [mode, setMode] = useState<"single" | "bulk">("single");

  // Single Link state
  const {
    url, setUrl, customSlug, setCustomSlug,
    selectedDomain, setSelectedDomain, availableDomains,
    showAdvanced, setShowAdvanced,
    customTitle, setCustomTitle,
    customDescription, setCustomDescription,
    showCta, setShowCta, cta, setCta,
    showRouting, setShowRouting, routing, setRouting,
    showSmartRules, setShowSmartRules, smartRules, setSmartRules,
    showUtm, setShowUtm, utm, setUtm,
    retargeting, setRetargeting,
    badge, loading: singleLoading, error: singleError, createdResult, handleSubmit,
  } = useLinkCreator();

  // Bulk Link state
  const {
    urlsText, setUrlsText,
    loading: bulkLoading, error: bulkError,
    createdResults, handleSubmitBulk,
  } = useBulkLinkCreator();

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (shortCode: string, idx: number) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortCode}`);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="card-genz p-5 sm:p-7">
        
        {/* Mode Toggle */}
        <div className="flex gap-2 p-1 bg-[#f8f7f4] rounded-2xl border-2 border-[#e7e5dc] mb-6">
          <button
            onClick={() => setMode("single")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-[13px] font-bold rounded-xl transition-all duration-200 ${
              mode === "single"
                ? "bg-white text-[#2c35af] shadow-sm border border-black/5"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Link2 className="w-4 h-4" /> Single Link
          </button>
          <button
            onClick={() => setMode("bulk")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-[13px] font-bold rounded-xl transition-all duration-200 ${
              mode === "bulk"
                ? "bg-white text-[#2c35af] shadow-sm border border-black/5"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <ListPlus className="w-4 h-4" /> Bulk Shorten
          </button>
        </div>

        {mode === "single" ? (
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
            <CtaOverlayOptions showCta={showCta} setShowCta={setShowCta} cta={cta} setCta={setCta} />
            <AdvancedRoutingOptions
              showRouting={showRouting} setShowRouting={setShowRouting}
              routing={routing} setRouting={setRouting}
            />
            <SmartRoutingRulesBuilder
              showRules={showSmartRules} setShowRules={setShowSmartRules}
              rules={smartRules} setRules={setSmartRules}
            />
            <UtmCampaignBuilder
              showUtm={showUtm} setShowUtm={setShowUtm}
              utm={utm} setUtm={setUtm}
              retargeting={retargeting} setRetargeting={setRetargeting}
              destinationUrl={url}
            />

            {singleError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/15 text-red-400 text-[13px] font-bold">
                {singleError}
              </div>
            )}

            <button
              type="submit"
              disabled={singleLoading}
              className="w-full py-3.5 btn-gradient text-[14px] flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer rounded-xl font-bold tracking-wide"
            >
              {singleLoading ? (
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
        ) : (
          <form onSubmit={handleSubmitBulk} className="space-y-4">
            <div>
              <label className="block text-[12px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">
                Paste URLs (One per line)
              </label>
              <textarea
                value={urlsText}
                onChange={(e) => setUrlsText(e.target.value)}
                rows={5}
                placeholder="https://youtube.com/...&#10;https://instagram.com/...&#10;https://amazon.com/..."
                className="w-full bg-[#f8f7f4] border-2 border-[#e7e5dc] rounded-2xl p-4 text-[14px] font-medium text-[#121316] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#2c35af] focus:ring-4 focus:ring-[#2c35af]/10 transition-all duration-300 resize-none"
              />
              <p className="text-[11px] font-bold text-gray-400 mt-2 ml-1">
                Free limit: 5 URLs. Register for up to 20 URLs at once.
              </p>
            </div>

            {bulkError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/15 text-red-400 text-[13px] font-bold">
                {bulkError}
              </div>
            )}

            <button
              type="submit"
              disabled={bulkLoading}
              className="w-full py-3.5 btn-gradient text-[14px] flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer rounded-xl font-bold tracking-wide"
            >
              {bulkLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Shortening Bulk Links...
                </div>
              ) : (
                <>
                  Bulk Shorten Now
                  <div className="bg-white/15 p-1 rounded-md">
                    <CornerDownLeft className="h-3 w-3" />
                  </div>
                </>
              )}
            </button>
          </form>
        )}

        {mode === "single" && createdResult && (
          <div className="mt-6"><CreatedResultCard result={createdResult} /></div>
        )}

        {mode === "bulk" && createdResults && (
          <div className="mt-6 space-y-3">
            <h3 className="text-[13px] font-black uppercase text-gray-500 tracking-wider">
              Successfully Shortened
            </h3>
            {createdResults.map((link, idx) => (
              <div key={idx} className="p-3.5 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-between">
                <div className="truncate pr-4 flex-1">
                  <div className="text-[14px] font-bold text-green-700 truncate">
                    {typeof window !== 'undefined' ? window.location.host : 'snaplink.in'}/{link.shortCode}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                    {link.originalUrl}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(link.shortCode, idx)}
                  className="p-2 hover:bg-green-500/20 rounded-xl transition-colors text-green-700"
                >
                  {copiedIndex === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
