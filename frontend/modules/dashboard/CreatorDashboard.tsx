"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Link2,
  Copy,
  Check,
  QrCode,
  BarChart3,
  ExternalLink,
  Edit3,
  Trash2,
  Search,
  Plus,
  Zap,
  TrendingUp,
  Smartphone,
  ShieldCheck,
  X,
  CornerDownLeft,
  Filter,
  RefreshCw,
} from "lucide-react";
import {
  YoutubeLogo,
  InstagramLogo,
  AmazonLogo,
  MyntraLogo,
  TelegramLogo,
  SpotifyLogo,
  WhatsAppLogo,
} from "@/frontend/shared/icons/PlatformIcons";
import { useLinkStore } from "@/frontend/shared/store/useLinkStore";
import { getBaseUrl } from "@/frontend/shared/lib/utils";
import { QRCodeModal } from "@/frontend/modules/qr-code/QRCodeModal";
import { AnalyticsModal } from "@/frontend/modules/analytics/AnalyticsModal";

interface LinkItem {
  _id?: string;
  shortCode: string;
  originalUrl: string;
  platform: string;
  title?: string;
  customTitle?: string;
  customDescription?: string;
  clicks: number;
  createdAt: string;
}

export const CreatorDashboard: React.FC = () => {
  const { openQrModal, openAnalyticsModal } = useLinkStore();

  const [links, setLinks] = useState<LinkItem[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  // Inline Creator State
  const [showCreator, setShowCreator] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Edit Modal State (Dynamic Destination URL)
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Fetch Links and Stats
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [linksRes, statsRes] = await Promise.all([
        fetch("/api/links"),
        fetch("/api/dashboard/stats"),
      ]);

      if (linksRes.ok) {
        const linksData = await linksRes.json();
        setLinks(linksData.links || []);
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats || null);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCopy = (shortCode: string) => {
    navigator.clipboard.writeText(`${getBaseUrl()}/${shortCode}`);
    setCopiedCode(shortCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    if (!newUrl.trim()) {
      setCreateError("Please paste a destination URL.");
      return;
    }

    setCreateLoading(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalUrl: newUrl.trim(),
          customSlug: newSlug.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create link.");

      setNewUrl("");
      setNewSlug("");
      setShowCreator(false);
      fetchData();
    } catch (err: any) {
      setCreateError(err.message || "Failed to create link.");
    } finally {
      setCreateLoading(false);
    }
  };

  const openEditModal = (link: LinkItem) => {
    setEditingLink(link);
    setEditUrl(link.originalUrl);
    setEditTitle(link.title || "");
    setEditError(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink) return;
    setEditError(null);
    setEditLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shortCode: editingLink.shortCode,
          originalUrl: editUrl.trim(),
          title: editTitle.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update destination.");

      setEditingLink(null);
      fetchData();
    } catch (err: any) {
      setEditError(err.message || "Failed to update link.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (shortCode: string) => {
    if (!confirm(`Are you sure you want to delete /${shortCode}? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/links?code=${shortCode}`, { method: "DELETE" });
      if (res.ok) {
        setLinks((prev) => prev.filter((l) => l.shortCode !== shortCode));
        fetchData();
      }
    } catch (err) {
      console.error("Delete link error:", err);
    }
  };

  // Filtered Links
  const filteredLinks = useMemo(() => {
    return links.filter((l) => {
      const matchesSearch =
        l.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.title && l.title.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPlatform =
        selectedPlatform === "all" || l.platform.toLowerCase() === selectedPlatform.toLowerCase();

      return matchesSearch && matchesPlatform;
    });
  }, [links, searchQuery, selectedPlatform]);

  const getPlatformIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case "youtube":
        return <YoutubeLogo className="h-5 w-5 text-[#cc0000]" />;
      case "instagram":
        return <InstagramLogo className="h-5 w-5 text-[#c13584]" />;
      case "amazon":
        return <AmazonLogo className="h-5 w-5 text-[#121316]" />;
      case "myntra":
        return <MyntraLogo className="h-5 w-5 text-[#ff3f6c]" />;
      case "telegram":
        return <TelegramLogo className="h-5 w-5 text-[#229ed9]" />;
      case "spotify":
        return <SpotifyLogo className="h-5 w-5 text-[#1db954]" />;
      case "whatsapp":
        return <WhatsAppLogo className="h-5 w-5 text-[#25d366]" />;
      default:
        return <Link2 className="h-5 w-5 text-[#2c35af]" />;
    }
  };

  // KPI Calculations
  const totalClicks = stats?.totalClicks ?? links.reduce((acc, l) => acc + (l.clicks || 0), 0);
  const totalLinks = stats?.totalLinks ?? links.length;
  const topPlatformName = useMemo(() => {
    if (!stats?.platformStats) return "YouTube";
    const entries = Object.entries(stats.platformStats) as [string, number][];
    if (entries.length === 0) return "YouTube";
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0].toUpperCase();
  }, [stats]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* 1. TOP HEADER & ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="text-[#2c35af] text-[20px] font-black leading-none animate-spin-slow">✱</span>
            <span className="text-[11.5px] font-mono font-black uppercase tracking-widest text-[#2c35af]">
              Creator Control Center
            </span>
          </div>
          <h1 className="text-[28px] sm:text-[38px] font-black tracking-tight text-[#121316] uppercase leading-tight">
            Links Performance & Dynamic Hub
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="p-3 rounded-2xl bg-white border border-[#e7e5dc] hover:border-[#2c35af] text-zinc-700 hover:text-black transition cursor-pointer shadow-xs disabled:opacity-50"
            title="Refresh statistics"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-[#2c35af]" : ""}`} />
          </button>

          <button
            onClick={() => setShowCreator(!showCreator)}
            className="pill-lime px-5 py-3 text-[13px] font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            <span>{showCreator ? "Close Form" : "Create New Link"}</span>
          </button>
        </div>
      </div>

      {/* 2. TOP BENTO KPI METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Card 1: Total Clicks */}
        <div className="p-6 rounded-[28px] bento-card-light flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 mb-3">
            <span className="text-[12px] font-black uppercase tracking-wider">Total Clicks</span>
            <div className="p-2 rounded-xl bg-[#f5f4ef] border border-[#e7e5dc]">
              <TrendingUp className="h-4 w-4 text-[#2c35af]" />
            </div>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#121316] tracking-tight font-mono">
              {totalClicks.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-emerald-700 mt-1">
              <span className="h-2 w-2 rounded-full bg-[#ccff00] ring-2 ring-[#ccff00]/40" />
              <span>Real-time intent routing</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Links */}
        <div className="p-6 rounded-[28px] bento-card-light flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 mb-3">
            <span className="text-[12px] font-black uppercase tracking-wider">Active Links</span>
            <div className="p-2 rounded-xl bg-[#f5f4ef] border border-[#e7e5dc]">
              <Link2 className="h-4 w-4 text-[#2c35af]" />
            </div>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#121316] tracking-tight font-mono">
              {totalLinks}
            </div>
            <div className="text-[11.5px] font-bold text-zinc-500 mt-1">
              Zero interstitial ad latency
            </div>
          </div>
        </div>

        {/* Card 3: Top Converting Platform */}
        <div className="p-6 rounded-[28px] bento-card-light flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 mb-3">
            <span className="text-[12px] font-black uppercase tracking-wider">Top Channel</span>
            <div className="p-2 rounded-xl bg-[#f5f4ef] border border-[#e7e5dc]">
              <Smartphone className="h-4 w-4 text-[#2c35af]" />
            </div>
          </div>
          <div>
            <div className="text-[28px] font-black text-[#121316] tracking-tight truncate uppercase">
              {topPlatformName}
            </div>
            <div className="text-[11.5px] font-bold text-zinc-500 mt-1">
              Highest bio conversion
            </div>
          </div>
        </div>

        {/* Card 4: Retention & Bounce Prevented */}
        <div className="p-6 rounded-[28px] bento-card-light flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 mb-3">
            <span className="text-[12px] font-black uppercase tracking-wider">Conversion Boost</span>
            <div className="p-2 rounded-xl bg-[#f5f4ef] border border-[#e7e5dc]">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="text-[34px] font-black text-[#2c35af] tracking-tight font-mono">
              5.4x
            </div>
            <div className="text-[11.5px] font-bold text-zinc-500 mt-1">
              Average engagement lift
            </div>
          </div>
        </div>
      </div>

      {/* 3. COLLAPSIBLE QUICK INLINE LINK CREATOR */}
      {showCreator && (
        <div className="mb-8 p-6 sm:p-7 rounded-[28px] bento-card-light border-2 border-[#2c35af] bg-white animate-fade-in shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-black text-[#121316] uppercase tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#2c35af]" />
              Quick Shorten & Deep Link
            </h3>
            <button
              onClick={() => setShowCreator(false)}
              className="text-zinc-400 hover:text-black transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Paste YouTube, Instagram, Amazon, Myntra or Spotify URL..."
                  className="w-full bento-input px-4 py-3 text-[14px] text-[#121316] placeholder-zinc-400 focus:outline-none"
                  required
                />
              </div>
              <div className="sm:col-span-4">
                <div className="flex items-center bento-input px-3.5 py-3">
                  <span className="text-[12px] text-[#2c35af] font-mono font-bold pr-1 select-none">
                    smartlink.to/
                  </span>
                  <input
                    type="text"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                    placeholder="custom-slug"
                    className="w-full bg-transparent text-[13.5px] text-[#121316] placeholder-zinc-400 focus:outline-none font-mono font-medium"
                  />
                </div>
              </div>
            </div>

            {createError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold">
                {createError}
              </div>
            )}

            <button
              type="submit"
              disabled={createLoading}
              className="py-3 px-6 btn-bento-primary text-[14px] flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer shadow-sm disabled:opacity-50"
            >
              {createLoading ? (
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
      )}

      {/* 4. SEARCH & PLATFORM FILTERS */}
      <div className="p-4 sm:p-5 rounded-[24px] bento-card-light mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2.5 bento-input px-3.5 py-2.5 flex-1 max-w-md">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search links by slug or destination URL..."
            className="w-full bg-transparent text-[13.5px] text-[#121316] placeholder-zinc-400 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-zinc-400 hover:text-black">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11.5px] font-black uppercase text-zinc-500 mr-1 hidden sm:inline flex items-center gap-1">
            <Filter className="h-3 w-3" /> Filter:
          </span>
          {["all", "youtube", "instagram", "amazon", "myntra", "telegram", "spotify"].map((plat) => {
            const isActive = selectedPlatform === plat;
            return (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-3 py-1.5 rounded-xl text-[11.5px] font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#121316] text-white shadow-xs"
                    : "bg-[#f5f4ef] text-zinc-600 hover:text-black border border-[#e7e5dc]"
                }`}
              >
                {plat === "all" ? "All Platforms" : plat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. LINK MANAGEMENT LIST / TABLE */}
      {loading ? (
        <div className="p-12 text-center text-zinc-400 font-mono text-[13px] bento-card-light">
          Loading your creator links...
        </div>
      ) : filteredLinks.length === 0 ? (
        <div className="p-12 text-center bento-card-light">
          <div className="h-12 w-12 rounded-2xl bg-[#f5f4ef] border border-[#e7e5dc] flex items-center justify-center mx-auto mb-3 text-zinc-400">
            <Link2 className="h-6 w-6" />
          </div>
          <h3 className="text-[16px] font-black text-[#121316] uppercase tracking-tight">
            No Links Found
          </h3>
          <p className="text-[13px] text-zinc-500 mt-1 max-w-sm mx-auto">
            {searchQuery || selectedPlatform !== "all"
              ? "No links matched your search filters. Try clearing your search query."
              : "You haven't created any links yet. Click '+ Create New Link' above to get started."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLinks.map((link) => {
            const isCopied = copiedCode === link.shortCode;

            return (
              <div
                key={link.shortCode}
                className="p-5 rounded-[24px] bento-card-light transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-[#2c35af]"
              >
                {/* Left: Platform Icon & Link Details */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="p-3 rounded-2xl bg-white border border-[#e7e5dc] shadow-2xs shrink-0 mt-0.5">
                    {getPlatformIcon(link.platform)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                      <a
                        href={`/${link.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[16px] font-black text-[#121316] font-mono tracking-tight hover:text-[#2c35af] transition flex items-center gap-1.5"
                      >
                        <span>/{link.shortCode}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                      </a>

                      <span className="text-[10px] font-black uppercase text-zinc-700 bg-[#f5f4ef] border border-[#e7e5dc] rounded-md px-2 py-0.5">
                        {link.platform} Intent
                      </span>

                      <div className="flex items-center gap-1.5 text-[12px] font-mono font-bold text-zinc-700 ml-auto md:ml-0 bg-[#ccff00]/25 px-2.5 py-0.5 rounded-full border border-[#ccff00]">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00]" />
                        <span>{link.clicks || 0} Clicks</span>
                      </div>
                    </div>

                    {/* Original Destination URL (Editable) */}
                    <div className="flex items-center gap-2 text-[13px] text-zinc-500 truncate">
                      <span className="font-bold text-zinc-700 shrink-0">Target:</span>
                      <span className="truncate font-mono text-[12.5px]">{link.originalUrl}</span>
                    </div>

                    {link.title && (
                      <div className="text-[12px] font-bold text-zinc-700 mt-1 truncate">
                        {link.title}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Quick Action Controls */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#f0eee6] w-full md:w-auto justify-end">
                  {/* 1. Copy Link */}
                  <button
                    onClick={() => handleCopy(link.shortCode)}
                    className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-black transition active:scale-95 cursor-pointer shadow-2xs"
                    title="Copy Short Link"
                  >
                    {isCopied ? <Check className="h-4 w-4 text-emerald-600 stroke-[3]" /> : <Copy className="h-4 w-4" />}
                  </button>

                  {/* 2. Edit Target (Dynamic Link) */}
                  <button
                    onClick={() => openEditModal(link)}
                    className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-[#2c35af] transition active:scale-95 cursor-pointer shadow-2xs flex items-center gap-1.5"
                    title="Edit Destination URL (Dynamic Link)"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span className="text-[11.5px] font-bold hidden sm:inline">Edit Target</span>
                  </button>

                  {/* 3. QR Studio */}
                  <button
                    onClick={() => openQrModal(link as any)}
                    className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-black transition active:scale-95 cursor-pointer shadow-2xs"
                    title="Download 1200px QR Code"
                  >
                    <QrCode className="h-4 w-4 text-[#2c35af]" />
                  </button>

                  {/* 4. In-Depth Analytics */}
                  <button
                    onClick={() => openAnalyticsModal(link.shortCode)}
                    className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-black transition active:scale-95 cursor-pointer shadow-2xs"
                    title="View Device & Referrer Analytics"
                  >
                    <BarChart3 className="h-4 w-4 text-zinc-600" />
                  </button>

                  {/* 5. Delete Link */}
                  <button
                    onClick={() => handleDelete(link.shortCode)}
                    className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-red-50 hover:border-red-300 text-zinc-400 hover:text-red-600 transition active:scale-95 cursor-pointer shadow-2xs"
                    title="Delete Link"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. EDIT DESTINATION MODAL (DYNAMIC LINKS ENGINE) */}
      {editingLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-[28px] p-6 sm:p-8 relative bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#2c35af] text-white">
                  <Edit3 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-[17px] font-black text-[#121316] tracking-tight uppercase">
                    Edit Dynamic Destination
                  </h3>
                  <p className="text-[12px] text-zinc-500 font-mono">
                    /{editingLink.shortCode}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingLink(null)}
                className="text-zinc-400 hover:text-black transition cursor-pointer p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 mb-5 text-[12px] text-amber-900 font-medium leading-relaxed">
              💡 <strong>Instant Update:</strong> Your bio link (<code className="font-mono font-bold">smartlink.to/{editingLink.shortCode}</code>) stays the same. Followers will now immediately be redirected to this new destination!
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="text-[12px] font-black text-[#121316] uppercase tracking-wider mb-2 block">
                  New Destination URL
                </label>
                <input
                  type="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
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
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="e.g. Latest Vlog or Amazon Summer Sale"
                  className="w-full bento-input px-3.5 py-3 text-[13.5px] text-[#121316] focus:outline-none"
                />
              </div>

              {editError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold">
                  {editError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingLink(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#e7e5dc] text-[13px] font-bold text-zinc-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="px-6 py-2.5 rounded-xl btn-bento-primary text-[13px] font-black uppercase tracking-wider cursor-pointer shadow-md disabled:opacity-50"
                >
                  {editLoading ? "Updating Target..." : "Save New Destination"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <QRCodeModal />
      <AnalyticsModal />
    </div>
  );
};
