"use client";

import React, { useState } from "react";
import { Edit3, X } from "lucide-react";
import { DashboardLinkItem } from "./LinkRowItem";
import { EditRoutingSection } from "./EditRoutingSection";
import { EditSmartRulesSection } from "./EditSmartRulesSection";
import { EditCtaSection } from "./EditCtaSection";
import { EditUtmSection } from "./EditUtmSection";
import { SmartRuleItem } from "@/frontend/modules/link-creator/parts/SmartRoutingRulesBuilder";

interface EditLinkModalProps {
  link: DashboardLinkItem;
  onClose: () => void;
  onSaved: () => void;
}

export const EditLinkModal: React.FC<EditLinkModalProps> = ({
  link,
  onClose,
  onSaved,
}) => {
  const [url, setUrl] = useState(link.originalUrl);
  const [title, setTitle] = useState(link.title || "");

  // CTA State
  const [ctaEnabled, setCtaEnabled] = useState(Boolean(link.ctaOverlay?.enabled));
  const [ctaHeadline, setCtaHeadline] = useState(link.ctaOverlay?.headline || "");
  const [ctaButtonText, setCtaButtonText] = useState(link.ctaOverlay?.buttonText || "Claim Deal");
  const [ctaButtonUrl, setCtaButtonUrl] = useState(link.ctaOverlay?.buttonUrl || "");
  const [ctaTheme, setCtaTheme] = useState<"blue" | "dark" | "emerald" | "amber">(link.ctaOverlay?.theme || "blue");
  const [ctaBadge, setCtaBadge] = useState(link.ctaOverlay?.badgeText || "Featured");

  // Routing State
  const [expiresAt, setExpiresAt] = useState(
    link.routing?.expiresAt ? new Date(link.routing.expiresAt).toISOString().slice(0, 16) : ""
  );
  const [maxClicks, setMaxClicks] = useState(link.routing?.maxClicks ? String(link.routing.maxClicks) : "");
  const [fallbackUrl, setFallbackUrl] = useState(link.routing?.expiredFallbackUrl || "");
  const [passwordProtected, setPasswordProtected] = useState(Boolean(link.routing?.passwordProtected));
  const [newPassword, setNewPassword] = useState("");

  // Smart Targeting & UTM State
  const [smartRules, setSmartRules] = useState<SmartRuleItem[]>(link.smartRules || []);
  const [source, setSource] = useState(link.utm?.source || "");
  const [medium, setMedium] = useState(link.utm?.medium || "");
  const [campaign, setCampaign] = useState(link.utm?.campaign || "");
  const [affiliateTag, setAffiliateTag] = useState(link.retargeting?.affiliateTag || "");
  const [metaPixelId, setMetaPixelId] = useState(link.retargeting?.metaPixelId || "");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState(link.retargeting?.googleAnalyticsId || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shortCode: link.shortCode,
          originalUrl: url.trim(),
          title: title.trim(),
          smartRules: smartRules.length > 0 ? smartRules : [],
          ctaOverlay: {
            enabled: ctaEnabled,
            headline: ctaHeadline.trim(),
            buttonText: ctaButtonText.trim() || "Learn More",
            buttonUrl: ctaButtonUrl.trim(),
            theme: ctaTheme,
            badgeText: ctaBadge.trim() || "Featured",
          },
          routing: {
            expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
            maxClicks: maxClicks.trim() ? Number(maxClicks) : null,
            expiredFallbackUrl: fallbackUrl.trim(),
            passwordProtected,
            ...(newPassword.trim() ? { password: newPassword.trim() } : {}),
          },
          utm: {
            source: source.trim(),
            medium: medium.trim(),
            campaign: campaign.trim(),
          },
          retargeting: {
            affiliateTag: affiliateTag.trim(),
            metaPixelId: metaPixelId.trim(),
            googleAnalyticsId: googleAnalyticsId.trim(),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update link.");

      onSaved();
    } catch (err: any) {
      setError(err.message || "Failed to update link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[28px] p-6 sm:p-8 relative bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#2c35af] text-white">
              <Edit3 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-[17px] font-black text-[#121316] tracking-tight uppercase">
                Edit Dynamic Link Rules
              </h3>
              <p className="text-[12px] text-zinc-500 font-mono">
                /{link.shortCode}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-black transition cursor-pointer p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[12px] font-black text-[#121316] uppercase tracking-wider mb-2 block">
              Destination URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              required
              className="w-full bento-input px-3.5 py-3 text-[13.5px] text-[#121316] font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[12px] font-black text-[#121316] uppercase tracking-wider mb-2 block">
              Link Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Latest Vlog or Exclusive Drop"
              className="w-full bento-input px-3.5 py-3 text-[13.5px] text-[#121316] focus:outline-none"
            />
          </div>

          {/* Sub-sections */}
          <EditRoutingSection
            expiresAt={expiresAt}
            setExpiresAt={setExpiresAt}
            maxClicks={maxClicks}
            setMaxClicks={setMaxClicks}
            fallbackUrl={fallbackUrl}
            setFallbackUrl={setFallbackUrl}
            passwordProtected={passwordProtected}
            setPasswordProtected={setPasswordProtected}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            isOriginallyProtected={link.routing?.passwordProtected}
          />

          <EditSmartRulesSection rules={smartRules} setRules={setSmartRules} />

          <EditUtmSection
            source={source}
            setSource={setSource}
            medium={medium}
            setMedium={setMedium}
            campaign={campaign}
            setCampaign={setCampaign}
            affiliateTag={affiliateTag}
            setAffiliateTag={setAffiliateTag}
            metaPixelId={metaPixelId}
            setMetaPixelId={setMetaPixelId}
            googleAnalyticsId={googleAnalyticsId}
            setGoogleAnalyticsId={setGoogleAnalyticsId}
          />

          <EditCtaSection
            ctaEnabled={ctaEnabled}
            setCtaEnabled={setCtaEnabled}
            ctaHeadline={ctaHeadline}
            setCtaHeadline={setCtaHeadline}
            ctaButtonText={ctaButtonText}
            setCtaButtonText={setCtaButtonText}
            ctaButtonUrl={ctaButtonUrl}
            setCtaButtonUrl={setCtaButtonUrl}
            ctaTheme={ctaTheme}
            setCtaTheme={setCtaTheme}
            ctaBadge={ctaBadge}
            setCtaBadge={setCtaBadge}
          />

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#e7e5dc] text-[13px] font-bold text-zinc-600 hover:text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl btn-bento-primary text-[13px] font-black uppercase tracking-wider cursor-pointer shadow-md disabled:opacity-50"
            >
              {loading ? "Saving Rules..." : "Save Link Rules"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
