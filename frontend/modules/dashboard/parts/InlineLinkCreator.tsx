"use client";

import React, { useState } from "react";
import { Zap, X, CornerDownLeft } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

interface InlineLinkCreatorProps {
  onCreated: () => void;
  onClose: () => void;
}

export const InlineLinkCreator: React.FC<InlineLinkCreatorProps> = ({
  onCreated,
  onClose,
}) => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!url.trim()) {
      setError("Please paste a destination URL.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalUrl: url.trim(),
          customSlug: slug.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create link.");

      setUrl("");
      setSlug("");
      onCreated();
    } catch (err: any) {
      setError(err.message || "Failed to create link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 p-6 sm:p-7 rounded-[28px] bento-card-light border-2 border-[#2c35af] bg-white animate-fade-in shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-black text-[#121316] uppercase tracking-wider flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#2c35af]" />
          Quick Shorten & Deep Link
        </h3>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-black transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube, Instagram, Amazon, Myntra or Spotify URL..."
              className="w-full bento-input px-4 py-3 text-[14px] text-[#121316] placeholder-zinc-400 focus:outline-none"
              required
            />
          </div>
          <div className="sm:col-span-4">
            <div className="flex items-center bento-input px-3.5 py-3">
              <span className="text-[12px] text-[#2c35af] font-mono font-bold pr-1 select-none">
                {BRAND_CONFIG.shortDomain}/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                placeholder="custom-slug"
                className="w-full bg-transparent text-[13.5px] text-[#121316] placeholder-zinc-400 focus:outline-none font-mono font-medium"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="py-3 px-6 btn-bento-primary text-[14px] flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <span>Generating Intent Link...</span>
          ) : (
            <>
              <span>Create Smart Deep Link</span>
              <CornerDownLeft className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
