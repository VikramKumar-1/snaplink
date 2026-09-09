"use client";

import React from "react";
import { Tag, Target, BarChart2 } from "lucide-react";

interface EditUtmSectionProps {
  source: string;
  setSource: (val: string) => void;
  medium: string;
  setMedium: (val: string) => void;
  campaign: string;
  setCampaign: (val: string) => void;
  affiliateTag: string;
  setAffiliateTag: (val: string) => void;
  metaPixelId: string;
  setMetaPixelId: (val: string) => void;
  googleAnalyticsId: string;
  setGoogleAnalyticsId: (val: string) => void;
}

export const EditUtmSection: React.FC<EditUtmSectionProps> = ({
  source,
  setSource,
  medium,
  setMedium,
  campaign,
  setCampaign,
  affiliateTag,
  setAffiliateTag,
  metaPixelId,
  setMetaPixelId,
  googleAnalyticsId,
  setGoogleAnalyticsId,
}) => {
  return (
    <div className="pt-3 border-t border-zinc-200">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="h-4 w-4 text-[#2c35af]" />
        <span className="text-[12px] font-black text-[#121316] uppercase tracking-wider">
          UTM Campaign & Retargeting
        </span>
      </div>

      <div className="space-y-3 p-3.5 rounded-2xl bg-[#faf9f5] border border-[#e7e5dc]">
        {/* UTM Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="text-[11px] font-bold text-zinc-700 block mb-1">
              utm_source
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. instagram"
              className="w-full bento-input px-2.5 py-1.5 text-[12px] bg-white font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-zinc-700 block mb-1">
              utm_medium
            </label>
            <input
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="e.g. social_bio"
              className="w-full bento-input px-2.5 py-1.5 text-[12px] bg-white font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-zinc-700 block mb-1">
              utm_campaign
            </label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="e.g. summer_drop"
              className="w-full bento-input px-2.5 py-1.5 text-[12px] bg-white font-mono"
            />
          </div>
        </div>

        {/* Affiliate Tag */}
        <div className="pt-2 border-t border-zinc-200">
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="h-3.5 w-3.5 text-emerald-600" />
            <label className="text-[11px] font-bold text-zinc-800">
              Affiliate / Associate Tag
            </label>
          </div>
          <input
            type="text"
            value={affiliateTag}
            onChange={(e) => setAffiliateTag(e.target.value)}
            placeholder="e.g. snaplink-21 (Amazon/Flipkart tag)"
            className="w-full bento-input px-2.5 py-1.5 text-[12px] bg-white font-mono"
          />
        </div>

        {/* Retargeting Pixels */}
        <div className="pt-2 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <BarChart2 className="h-3 w-3 text-[#2c35af]" />
              <label className="text-[10.5px] font-bold text-zinc-700">Meta Pixel ID</label>
            </div>
            <input
              type="text"
              value={metaPixelId}
              onChange={(e) => setMetaPixelId(e.target.value)}
              placeholder="e.g. 192837461928"
              className="w-full bento-input px-2.5 py-1.5 text-[12px] bg-white font-mono"
            />
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <BarChart2 className="h-3 w-3 text-[#2c35af]" />
              <label className="text-[10.5px] font-bold text-zinc-700">GA4 / GTM ID</label>
            </div>
            <input
              type="text"
              value={googleAnalyticsId}
              onChange={(e) => setGoogleAnalyticsId(e.target.value)}
              placeholder="e.g. G-XXXXXXXXXX"
              className="w-full bento-input px-2.5 py-1.5 text-[12px] bg-white font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
