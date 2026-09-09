"use client";

import React from "react";
import { Tag, ChevronDown, ChevronUp, BarChart2, Target } from "lucide-react";

export interface UtmState {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

export interface RetargetingState {
  affiliateTag: string;
  metaPixelId: string;
  googleAnalyticsId: string;
}

interface UtmCampaignBuilderProps {
  showUtm: boolean;
  setShowUtm: React.Dispatch<React.SetStateAction<boolean>>;
  utm: UtmState;
  setUtm: React.Dispatch<React.SetStateAction<UtmState>>;
  retargeting: RetargetingState;
  setRetargeting: React.Dispatch<React.SetStateAction<RetargetingState>>;
  destinationUrl: string;
}

export const UtmCampaignBuilder: React.FC<UtmCampaignBuilderProps> = ({
  showUtm,
  setShowUtm,
  utm,
  setUtm,
  retargeting,
  setRetargeting,
  destinationUrl,
}) => {
  const isAmazon = destinationUrl.toLowerCase().includes("amazon.") || destinationUrl.toLowerCase().includes("amzn.");
  const isFlipkart = destinationUrl.toLowerCase().includes("flipkart.") || destinationUrl.toLowerCase().includes("fkrt.");

  const isUtmActive =
    Boolean(utm.source) ||
    Boolean(utm.medium) ||
    Boolean(utm.campaign) ||
    Boolean(retargeting.affiliateTag) ||
    Boolean(retargeting.metaPixelId) ||
    Boolean(retargeting.googleAnalyticsId);

  const applyPreset = (source: string, medium: string, campaign: string) => {
    setUtm((prev) => ({ ...prev, source, medium, campaign }));
  };

  return (
    <div className="border border-[#e7e5dc] rounded-2xl overflow-hidden bg-[#faf9f5]">
      <button
        type="button"
        onClick={() => setShowUtm(!showUtm)}
        className="w-full px-4 py-3 flex items-center justify-between text-left text-zinc-700 hover:text-black transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-[#2c35af]" />
          <span className="text-[13px] font-bold">
            UTM Campaign & Affiliate Tag Injection
          </span>
          {isUtmActive && (
            <span className="h-2 w-2 rounded-full bg-[#2c35af]" title="UTM or tags configured" />
          )}
        </div>
        {showUtm ? (
          <ChevronUp className="h-4 w-4 text-zinc-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        )}
      </button>

      {showUtm && (
        <div className="p-4 pt-1 space-y-4 border-t border-[#e7e5dc] bg-white">
          {/* Quick 1-Tap Presets */}
          <div>
            <span className="text-[11.5px] font-black uppercase text-zinc-500 block mb-2">
              ⚡ 1-Tap Channel Presets
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => applyPreset("instagram", "social_bio", "bio_link")}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#faf9f5] hover:bg-[#e7e5dc] text-zinc-700 border border-[#e7e5dc] cursor-pointer"
              >
                Instagram Bio
              </button>
              <button
                type="button"
                onClick={() => applyPreset("youtube", "video_desc", "vlog_link")}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#faf9f5] hover:bg-[#e7e5dc] text-zinc-700 border border-[#e7e5dc] cursor-pointer"
              >
                YouTube Desc
              </button>
              <button
                type="button"
                onClick={() => applyPreset("whatsapp", "chat_broadcast", "direct_msg")}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#faf9f5] hover:bg-[#e7e5dc] text-zinc-700 border border-[#e7e5dc] cursor-pointer"
              >
                WhatsApp Broadcast
              </button>
              <button
                type="button"
                onClick={() => applyPreset("tiktok", "paid_social", "ad_traffic")}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#faf9f5] hover:bg-[#e7e5dc] text-zinc-700 border border-[#e7e5dc] cursor-pointer"
              >
                TikTok Ad
              </button>
              <button
                type="button"
                onClick={() => applyPreset("newsletter", "email", "weekly_digest")}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#faf9f5] hover:bg-[#e7e5dc] text-zinc-700 border border-[#e7e5dc] cursor-pointer"
              >
                Newsletter
              </button>
            </div>
          </div>

          {/* Visual UTM Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                utm_source
              </label>
              <input
                type="text"
                value={utm.source}
                onChange={(e) => setUtm((prev) => ({ ...prev, source: e.target.value }))}
                placeholder="e.g. instagram"
                className="w-full bento-input px-3 py-2 text-[12.5px] font-mono text-[#121316] bg-[#faf9f5]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                utm_medium
              </label>
              <input
                type="text"
                value={utm.medium}
                onChange={(e) => setUtm((prev) => ({ ...prev, medium: e.target.value }))}
                placeholder="e.g. social_bio"
                className="w-full bento-input px-3 py-2 text-[12.5px] font-mono text-[#121316] bg-[#faf9f5]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                utm_campaign
              </label>
              <input
                type="text"
                value={utm.campaign}
                onChange={(e) => setUtm((prev) => ({ ...prev, campaign: e.target.value }))}
                placeholder="e.g. summer_drop"
                className="w-full bento-input px-3 py-2 text-[12.5px] font-mono text-[#121316] bg-[#faf9f5]"
              />
            </div>
          </div>

          {/* Affiliate Tag Auto-Injection */}
          <div className="pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Target className="h-3.5 w-3.5 text-emerald-600" />
              <label className="text-[12px] font-black text-[#121316] uppercase tracking-wider">
                Affiliate / Associate Tag Auto-Injection
              </label>
            </div>
            <input
              type="text"
              value={retargeting.affiliateTag}
              onChange={(e) => setRetargeting((prev) => ({ ...prev, affiliateTag: e.target.value }))}
              placeholder={isAmazon ? "e.g. yourtag-21 (Amazon Tag)" : isFlipkart ? "e.g. youraffid (Flipkart ID)" : "e.g. your_referral_code"}
              className="w-full bento-input px-3 py-2 text-[12.5px] font-mono text-[#121316] bg-[#faf9f5]"
            />
            <p className="text-[11px] text-zinc-400 mt-1">
              {isAmazon
                ? "💡 Amazon URL detected. Tag will be auto-injected as tag=yourtag-21 on redirect."
                : isFlipkart
                ? "💡 Flipkart URL detected. Tag will be auto-injected as affid=... on redirect."
                : "Automatically injected into destination query without breaking existing parameters."}
            </p>
          </div>

          {/* Retargeting Pixels */}
          <div className="pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart2 className="h-3.5 w-3.5 text-[#2c35af]" />
              <span className="text-[12px] font-black text-[#121316] uppercase tracking-wider">
                Retargeting Pixels (Optional)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                  Meta (Facebook) Pixel ID
                </label>
                <input
                  type="text"
                  value={retargeting.metaPixelId}
                  onChange={(e) => setRetargeting((prev) => ({ ...prev, metaPixelId: e.target.value }))}
                  placeholder="e.g. 182940284729104"
                  className="w-full bento-input px-3 py-2 text-[12px] font-mono text-[#121316] bg-[#faf9f5]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                  Google Analytics / GTM ID
                </label>
                <input
                  type="text"
                  value={retargeting.googleAnalyticsId}
                  onChange={(e) => setRetargeting((prev) => ({ ...prev, googleAnalyticsId: e.target.value }))}
                  placeholder="e.g. G-XXXXXXXXXX"
                  className="w-full bento-input px-3 py-2 text-[12px] font-mono text-[#121316] bg-[#faf9f5]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
