"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Link2, Plus, RefreshCw, User, Globe, Code2, Building2 } from "lucide-react";
import { useLinkStore } from "@/frontend/shared/store/useLinkStore";
import { getBaseUrl } from "@/frontend/shared/lib/utils";
import { QRCodeModal } from "@/frontend/modules/qr-code/QRCodeModal";
import { AnalyticsModal } from "@/frontend/modules/analytics/AnalyticsModal";
import { BioPageEditor } from "./parts/BioPageEditor";
import { DashboardKpis } from "./parts/DashboardKpis";
import { InlineLinkCreator } from "./parts/InlineLinkCreator";
import { DashboardFilterBar } from "./parts/DashboardFilterBar";
import { LinkRowItem, DashboardLinkItem } from "./parts/LinkRowItem";
import { EditLinkModal } from "./parts/EditLinkModal";
import { DashboardTabBar, DashboardTab } from "./parts/DashboardTabBar";
import { DomainManagementStudio } from "@/frontend/modules/domains/DomainManagementStudio";
import { DeveloperStudio } from "@/frontend/modules/developers/DeveloperStudio";
import { WorkspaceStudio } from "@/frontend/modules/workspaces/WorkspaceStudio";
import { PwaInstallBanner } from "@/frontend/shared/components/PwaInstallBanner";

export const CreatorDashboard: React.FC = () => {
  const { openQrModal, openAnalyticsModal } = useLinkStore();

  const [dashboardTab, setDashboardTab] = useState<DashboardTab>("links");
  const [links, setLinks] = useState<DashboardLinkItem[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const [showCreator, setShowCreator] = useState(false);
  const [editingLink, setEditingLink] = useState<DashboardLinkItem | null>(null);

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

  const handleCopy = (shortCode: string, customDomain?: string) => {
    const fullUrl = customDomain ? `https://${customDomain}/${shortCode}` : `${getBaseUrl()}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedCode(shortCode);
    setTimeout(() => setCopiedCode(null), 2000);
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

  const totalClicks = stats?.totalClicks ?? links.reduce((acc, l) => acc + (l.clicks || 0), 0);
  const totalLinks = stats?.totalLinks ?? links.length;
  const topPlatformName = useMemo(() => {
    if (!stats?.platformStats) return "YouTube";
    const entries = Object.entries(stats.platformStats) as [string, number][];
    if (entries.length === 0) return "YouTube";
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0].toUpperCase();
  }, [stats]);

  // Dynamic Header Config
  const TAB_CONFIG = {
    links: { title: "Links Performance Hub", subtitle: "Creator Studio", icon: "✱" },
    bio: { title: "Bio Page Studio", subtitle: "Creator Studio", icon: "👤" },
    domains: { title: "Custom Domains", subtitle: "Enterprise & Brands", icon: "🌐" },
    developers: { title: "API & Webhooks", subtitle: "Developer Platform", icon: "💻" },
    team: { title: "Team Management", subtitle: "Workspace Settings", icon: "👥" },
  };

  const currentConfig = TAB_CONFIG[dashboardTab as keyof typeof TAB_CONFIG];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:py-12 flex flex-col md:flex-row gap-8 lg:gap-12">
      {/* LEFT SIDEBAR (Desktop) */}
      <aside className="w-full md:w-64 shrink-0 space-y-8">
        {/* Creator Tools Section */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-2">
            Creator Studio
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => setDashboardTab("links")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all ${
                dashboardTab === "links"
                  ? "bg-[#121316] text-white shadow-md"
                  : "text-zinc-600 hover:bg-[#f5f4ef] hover:text-black border border-transparent hover:border-[#e7e5dc]"
              }`}
            >
              <Link2 className="h-4 w-4" />
              <span>Links Hub</span>
            </button>
            <button
              onClick={() => setDashboardTab("bio")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all ${
                dashboardTab === "bio"
                  ? "bg-[#121316] text-white shadow-md"
                  : "text-zinc-600 hover:bg-[#f5f4ef] hover:text-black border border-transparent hover:border-[#e7e5dc]"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Bio Studio</span>
            </button>
          </div>
        </div>

        {/* Enterprise & Workspace Section */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-2">
            Organization
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => setDashboardTab("domains")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all ${
                dashboardTab === "domains"
                  ? "bg-[#121316] text-white shadow-md"
                  : "text-zinc-600 hover:bg-[#f5f4ef] hover:text-black border border-transparent hover:border-[#e7e5dc]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4" />
                <span>Custom Domains</span>
              </div>
            </button>
            <button
              onClick={() => setDashboardTab("team")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all ${
                dashboardTab === "team"
                  ? "bg-[#121316] text-white shadow-md"
                  : "text-zinc-600 hover:bg-[#f5f4ef] hover:text-black border border-transparent hover:border-[#e7e5dc]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4" />
                <span>Team & Access</span>
              </div>
            </button>
          </div>
        </div>

        {/* Developers Section */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-2">
            Developers
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => setDashboardTab("developers")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all ${
                dashboardTab === "developers"
                  ? "bg-[#121316] text-white shadow-md"
                  : "text-zinc-600 hover:bg-[#f5f4ef] hover:text-black border border-transparent hover:border-[#e7e5dc]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Code2 className="h-4 w-4" />
                <span>API & Webhooks</span>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <div className="flex-1 min-w-0">
        {/* Dynamic Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className="text-[#2c35af] text-[18px] font-black leading-none">
                {currentConfig.icon}
              </span>
              <span className="text-[11.5px] font-mono font-black uppercase tracking-widest text-[#2c35af]">
                {currentConfig.subtitle}
              </span>
            </div>
            <h1 className="text-[28px] sm:text-[38px] font-black tracking-tight text-[#121316] uppercase leading-tight">
              {currentConfig.title}
            </h1>
          </div>

          {dashboardTab === "links" && (
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
          )}
        </div>

        <PwaInstallBanner />

        {/* Tab Content Rendering */}
        {dashboardTab === "team" ? (
          <WorkspaceStudio />
        ) : dashboardTab === "developers" ? (
          <DeveloperStudio />
        ) : dashboardTab === "domains" ? (
          <DomainManagementStudio />
        ) : dashboardTab === "bio" ? (
          <BioPageEditor />
        ) : (
          <>
            <DashboardKpis
              totalClicks={totalClicks}
              totalLinks={totalLinks}
              topPlatformName={topPlatformName}
            />

            {showCreator && (
              <InlineLinkCreator
                onCreated={() => {
                  setShowCreator(false);
                  fetchData();
                }}
                onClose={() => setShowCreator(false)}
              />
            )}

            <DashboardFilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
            />

            {loading ? (
              <div className="p-12 text-center text-zinc-400 font-mono text-[13px] bento-card-light">
                Loading your creator links...
              </div>
            ) : filteredLinks.length === 0 ? (
              <div className="p-12 text-center bento-card-light">
                <div className="h-12 w-12 rounded-2xl bg-[#f5f4ef] border border-[#e7e5dc] flex items-center justify-center mx-auto mb-3 text-zinc-400">
                  <Link2 className="h-6 w-6" />
                </div>
                <h3 className="text-[16px] font-black text-[#121316] uppercase tracking-tight">No Links Found</h3>
                <p className="text-[13px] text-zinc-500 mt-1 max-w-sm mx-auto">
                  {searchQuery || selectedPlatform !== "all"
                    ? "No links matched your search filters. Try clearing your search query."
                    : "You haven't created any links yet. Click '+ Create New Link' above to get started."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLinks.map((link) => (
                  <LinkRowItem
                    key={link.shortCode}
                    link={link}
                    isCopied={copiedCode === link.shortCode}
                    onCopy={handleCopy}
                    onEdit={(l) => setEditingLink(l)}
                    onQr={(l) => openQrModal(l as any)}
                    onAnalytics={(code) => openAnalyticsModal(code)}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {editingLink && (
          <EditLinkModal
            link={editingLink}
            onClose={() => setEditingLink(null)}
            onSaved={() => {
              setEditingLink(null);
              fetchData();
            }}
          />
        )}

        <QRCodeModal />
        <AnalyticsModal />
      </div>
    </div>
  );
};
