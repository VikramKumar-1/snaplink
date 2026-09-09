"use client";

import { useState, useEffect } from "react";
import { useLinkStore } from "@/frontend/shared/store/useLinkStore";
import { CreatedLinkResult } from "./types";
import { SmartRuleItem } from "./parts/SmartRoutingRulesBuilder";

export function useLinkCreator() {
  const { addLink } = useLinkStore();

  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [availableDomains, setAvailableDomains] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [showCta, setShowCta] = useState(false);
  const [cta, setCta] = useState({
    enabled: false,
    headline: "",
    buttonText: "Claim Deal",
    buttonUrl: "",
    theme: "blue" as "blue" | "dark" | "emerald" | "amber",
    badgeText: "Featured",
  });
  const [showRouting, setShowRouting] = useState(false);
  const [routing, setRouting] = useState({
    expiresAt: "",
    maxClicks: "",
    expiredFallbackUrl: "",
    passwordProtected: false,
    password: "",
  });
  const [showUtm, setShowUtm] = useState(false);
  const [utm, setUtm] = useState({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  });
  const [retargeting, setRetargeting] = useState({
    affiliateTag: "",
    metaPixelId: "",
    googleAnalyticsId: "",
  });
  const [showSmartRules, setShowSmartRules] = useState(false);
  const [smartRules, setSmartRules] = useState<SmartRuleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdResult, setCreatedResult] = useState<CreatedLinkResult | null>(null);

  useEffect(() => {
    fetch("/api/domains")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.domains && Array.isArray(data.domains)) {
          const active = data.domains
            .filter((d: any) => d.status === "active")
            .map((d: any) => d.domain);
          setAvailableDomains(active);
        }
      })
      .catch(() => {});
  }, []);

  const getBadge = () => {
    const l = url.toLowerCase();
    if (l.includes("youtube") || l.includes("youtu.be")) return "YouTube App";
    if (l.includes("instagram")) return "Instagram App";
    if (l.includes("t.me") || l.includes("telegram")) return "Telegram App";
    if (l.includes("amazon") || l.includes("amzn.to")) return "Amazon Shopping";
    if (l.includes("flipkart") || l.includes("fkrt.it")) return "Flipkart Shopping";
    if (l.includes("myntra")) return "Myntra Fashion";
    if (l.includes("spotify")) return "Spotify Music";
    if (l.includes("myshopify.com") || l.includes("shopify")) return "Shopify D2C";
    if (l.includes("wa.me") || l.includes("whatsapp")) return "WhatsApp Direct";
    if (url.length > 5) return "Direct Browser";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreatedResult(null);

    if (!url) {
      setError("Please paste a destination URL.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalUrl: url,
          customSlug: customSlug.trim() || undefined,
          customDomain: selectedDomain.trim() || undefined,
          smartRules: smartRules.length > 0 ? smartRules : undefined,
          customTitle: customTitle.trim() || undefined,
          customDescription: customDescription.trim() || undefined,
          ctaOverlay: cta.enabled
            ? {
                enabled: true,
                headline: cta.headline.trim(),
                buttonText: cta.buttonText.trim() || "Learn More",
                buttonUrl: cta.buttonUrl.trim() || undefined,
                theme: cta.theme,
                badgeText: cta.badgeText.trim() || "Featured",
              }
            : undefined,
          routing: {
            expiresAt: routing.expiresAt.trim() || undefined,
            maxClicks: routing.maxClicks.trim() ? Number(routing.maxClicks) : undefined,
            expiredFallbackUrl: routing.expiredFallbackUrl.trim() || undefined,
            passwordProtected: routing.passwordProtected,
            password: routing.passwordProtected ? routing.password.trim() : undefined,
          },
          utm: (utm.source || utm.medium || utm.campaign) ? {
            source: utm.source.trim() || undefined,
            medium: utm.medium.trim() || undefined,
            campaign: utm.campaign.trim() || undefined,
            term: utm.term.trim() || undefined,
            content: utm.content.trim() || undefined,
          } : undefined,
          retargeting: (retargeting.affiliateTag || retargeting.metaPixelId || retargeting.googleAnalyticsId) ? {
            affiliateTag: retargeting.affiliateTag.trim() || undefined,
            metaPixelId: retargeting.metaPixelId.trim() || undefined,
            googleAnalyticsId: retargeting.googleAnalyticsId.trim() || undefined,
          } : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create link.");

      setCreatedResult(data.link);
      addLink({
        shortCode: data.link.shortCode,
        originalUrl: data.link.originalUrl,
        platform: data.link.platform,
        title: data.link.title,
        clicks: data.link.clicks || 0,
        createdAt: new Date().toISOString(),
      });

      setUrl("");
      setCustomSlug("");
      setCustomTitle("");
      setCustomDescription("");
      setShowAdvanced(false);
      setShowCta(false);
      setCta({
        enabled: false,
        headline: "",
        buttonText: "Claim Deal",
        buttonUrl: "",
        theme: "blue",
        badgeText: "Featured",
      });
      setShowRouting(false);
      setRouting({
        expiresAt: "",
        maxClicks: "",
        expiredFallbackUrl: "",
        passwordProtected: false,
        password: "",
      });
      setShowUtm(false);
      setUtm({
        source: "",
        medium: "",
        campaign: "",
        term: "",
        content: "",
      });
      setRetargeting({
        affiliateTag: "",
        metaPixelId: "",
        googleAnalyticsId: "",
      });
      setShowSmartRules(false);
      setSmartRules([]);
      setSelectedDomain("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    url,
    setUrl,
    customSlug,
    setCustomSlug,
    selectedDomain,
    setSelectedDomain,
    availableDomains,
    showAdvanced,
    setShowAdvanced,
    customTitle,
    setCustomTitle,
    customDescription,
    setCustomDescription,
    showCta,
    setShowCta,
    cta,
    setCta,
    showRouting,
    setShowRouting,
    routing,
    setRouting,
    showSmartRules,
    setShowSmartRules,
    smartRules,
    setSmartRules,
    showUtm,
    setShowUtm,
    utm,
    setUtm,
    retargeting,
    setRetargeting,
    badge: getBadge(),
    loading,
    error,
    createdResult,
    handleSubmit,
  };
}
