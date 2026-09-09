"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Save } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";
import { BioPhonePreview } from "./BioPhonePreview";
import { BioProfileForm } from "./BioProfileForm";
import { BioSocialEditor, SocialLink } from "./BioSocialEditor";
import { BioLinksEditor, CustomBioLinkItem } from "./BioLinksEditor";

export const BioPageEditor: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Bio state
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bioText, setBioText] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [theme, setTheme] = useState<"royal_blue" | "glass_dark" | "clay_light" | "emerald" | "sunset">("royal_blue");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [customLinks, setCustomLinks] = useState<CustomBioLinkItem[]>([]);

  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bio");
      if (res.ok) {
        const data = await res.json();
        if (data.bioPage) {
          const b = data.bioPage;
          setUsername(b.username || "");
          setDisplayName(b.displayName || "");
          setBioText(b.bio || "");
          setAvatarUrl(b.avatarUrl || "");
          setTheme(b.theme || "royal_blue");
          setSocialLinks(b.socialLinks || []);
          setCustomLinks(b.customLinks || []);
        }
      }
    } catch (err: any) {
      console.error("Failed to load bio:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim().toLowerCase(),
          displayName: displayName.trim(),
          bio: bioText.trim(),
          avatarUrl: avatarUrl.trim(),
          theme,
          socialLinks: socialLinks.filter((s) => s.url.trim() !== ""),
          customLinks: customLinks.filter((l) => l.title.trim() !== "" && l.url.trim() !== ""),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save bio page.");

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save bio page.");
    } finally {
      setSaving(false);
    }
  };

  const addCustomLink = () => {
    setCustomLinks((prev) => [
      ...prev,
      { id: "link_" + Date.now(), title: "", url: "", isHighlighted: false },
    ]);
  };

  const removeCustomLink = (id: string) => {
    setCustomLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const addSocialLink = (platform: string) => {
    if (socialLinks.some((s) => s.platform === platform)) return;
    setSocialLinks((prev) => [...prev, { platform, url: "" }]);
  };

  const removeSocialLink = (platform: string) => {
    setSocialLinks((prev) => prev.filter((s) => s.platform !== platform));
  };

  const handleCopyLink = () => {
    if (!username) return;
    const url = `${window.location.origin}/@${username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-400 font-mono text-[13px] bento-card-light">
        Loading your Bio Studio...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Editor Form */}
      <div className="lg:col-span-7 space-y-6">
        <form onSubmit={handleSave} className="space-y-5">
          {/* Header Action Bar */}
          <div className="p-5 rounded-[24px] bento-card-light flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-[18px] font-black text-[#121316] uppercase tracking-tight">
                Profile & Bio Settings
              </h2>
              <p className="text-[12px] text-zinc-500 font-mono">
                {username ? `${BRAND_CONFIG.shortDomain}/@${username}` : "Claim your personal handle"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {username && (
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#e7e5dc] hover:border-[#2c35af] text-zinc-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied!" : "Copy URL"}</span>
                </button>
              )}

              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl btn-bento-primary text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? "Saving..." : "Save Bio"}</span>
              </button>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-bold flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              <span>Your Link-in-Bio page has been saved successfully!</span>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold">
              {error}
            </div>
          )}

          <BioProfileForm
            username={username}
            setUsername={setUsername}
            displayName={displayName}
            setDisplayName={setDisplayName}
            avatarUrl={avatarUrl}
            setAvatarUrl={setAvatarUrl}
            bioText={bioText}
            setBioText={setBioText}
            theme={theme}
            setTheme={setTheme}
          />

          <BioSocialEditor
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
            addSocialLink={addSocialLink}
            removeSocialLink={removeSocialLink}
          />

          <BioLinksEditor
            customLinks={customLinks}
            setCustomLinks={setCustomLinks}
            addCustomLink={addCustomLink}
            removeCustomLink={removeCustomLink}
          />
        </form>
      </div>

      {/* RIGHT: Live Smartphone Mockup Preview */}
      <BioPhonePreview
        username={username}
        displayName={displayName}
        bioText={bioText}
        avatarUrl={avatarUrl}
        customLinks={customLinks}
      />
    </div>
  );
};
