"use client";

import { useState } from "react";
import { useLinkStore } from "@/frontend/shared/store/useLinkStore";
import { CreatedLinkResult } from "./types";

export function useLinkCreator() {
  const { addLink } = useLinkStore();

  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdResult, setCreatedResult] = useState<CreatedLinkResult | null>(null);

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
          customTitle: customTitle.trim() || undefined,
          customDescription: customDescription.trim() || undefined,
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
    showAdvanced,
    setShowAdvanced,
    customTitle,
    setCustomTitle,
    customDescription,
    setCustomDescription,
    badge: getBadge(),
    loading,
    error,
    createdResult,
    handleSubmit,
  };
}
