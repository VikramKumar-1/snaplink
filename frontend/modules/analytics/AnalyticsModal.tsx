"use client";

import React, { useEffect, useState } from "react";
import { useLinkStore } from "@/frontend/shared/store/useLinkStore";
import {
  X,
  Globe,
  BarChart3,
  RefreshCw,
  Activity,
  Download,
  Smartphone,
  Share2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

export const AnalyticsModal: React.FC = () => {
  const { activeAnalyticsCode, closeAnalyticsModal } = useLinkStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchStats = async () => {
    if (!activeAnalyticsCode) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?code=${activeAnalyticsCode}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCsv = async () => {
    if (!activeAnalyticsCode) return;
    setExporting(true);
    try {
      const response = await fetch(`/api/analytics/export?code=${activeAnalyticsCode}`);
      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${BRAND_CONFIG.name.toLowerCase()}-${activeAnalyticsCode}-analytics.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert("Failed to export analytics CSV.");
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    if (activeAnalyticsCode) {
      fetchStats();
    }
  }, [activeAnalyticsCode]);

  if (!activeAnalyticsCode) return null;

  const total = data?.totalClicks || 0;
  const android = data?.deviceBreakdown?.android || 0;
  const ios = data?.deviceBreakdown?.ios || 0;
  const desktop = (data?.deviceBreakdown?.windows || 0) + (data?.deviceBreakdown?.mac || 0) + (data?.deviceBreakdown?.linux || 0);

  const androidPct = total > 0 ? Math.round((android / total) * 100) : 0;
  const iosPct = total > 0 ? Math.round((ios / total) * 100) : 0;
  const desktopPct = total > 0 ? Math.round((desktop / total) * 100) : 0;

  const referrers = Object.entries(data?.referrerBreakdown || {}).sort(
    (a: any, b: any) => b[1] - a[1]
  );

  const countries = data?.countryBreakdown || [];
  const timeline = data?.hourlyTimeline || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[28px] p-6 relative bg-white border border-[#e7e5dc] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={closeAnalyticsModal}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition p-1 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-xl bg-[#2c35af] flex items-center justify-center text-white">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-[#121316] tracking-tight">
              Attribution & Traffic Intelligence
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono">
              /{activeAnalyticsCode} &middot; Sub-millisecond $facet Aggregation
            </p>
          </div>
          <div className="ml-auto mr-8 flex items-center gap-2">
            <button
              onClick={fetchStats}
              disabled={loading}
              className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition cursor-pointer"
              title="Refresh Stats"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleExportCsv}
              disabled={exporting}
              className="px-3 py-1.5 rounded-lg bg-[#ccff00] hover:bg-[#b8e600] text-black text-[11.5px] font-black uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="Export Report for Sponsors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{exporting ? "..." : "Export CSV"}</span>
            </button>
          </div>
        </div>

        {loading && !data ? (
          <div className="py-20 text-center text-zinc-500 text-[13px] font-mono animate-pulse">
            Computing aggregation metrics...
          </div>
        ) : data ? (
          <div className="space-y-5 mt-5">
            {/* KPI Metric Banner */}
            <div className="p-4 rounded-2xl bg-[#f8f7f4] border border-[#e7e5dc] flex items-center justify-between">
              <div>
                <div className="text-[11px] font-black uppercase text-zinc-500 tracking-wider">
                  Total Native App Launches
                </div>
                <div className="text-[36px] font-black text-[#121316] font-mono leading-tight">
                  {total.toLocaleString()}
                </div>
              </div>
              <div className="pill-lime px-3 py-1 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-[#2c35af]" />
                <span>Live Feed</span>
              </div>
            </div>

            {/* Device Distribution Progress */}
            <div className="p-4 rounded-2xl bg-white border border-[#e7e5dc]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase text-zinc-500 tracking-wider flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Platform OS Distribution</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-zinc-600">
                  Android {androidPct}% &middot; iOS {iosPct}% &middot; PC {desktopPct}%
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-zinc-100 flex overflow-hidden p-0.5 border border-zinc-200">
                <div
                  style={{ width: `${androidPct}%` }}
                  className="bg-[#2c35af] rounded-l-full transition-all duration-500"
                  title={`Android: ${androidPct}%`}
                />
                <div
                  style={{ width: `${iosPct}%` }}
                  className="bg-[#ccff00] transition-all duration-500"
                  title={`iOS: ${iosPct}%`}
                />
                <div
                  style={{ width: `${desktopPct}%` }}
                  className="bg-zinc-400 rounded-r-full transition-all duration-500"
                  title={`Desktop: ${desktopPct}%`}
                />
              </div>
            </div>

            {/* Traffic Sources & Geographic Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Traffic Sources */}
              <div className="p-4 rounded-2xl bg-white border border-[#e7e5dc]">
                <div className="text-[11px] font-black uppercase text-zinc-500 tracking-wider mb-3 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Referral Attribution</span>
                </div>
                {referrers.length === 0 ? (
                  <div className="text-[12px] text-zinc-400 py-3">No referral data logged yet</div>
                ) : (
                  <div className="space-y-2">
                    {referrers.map(([source, count]: any) => {
                      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                      return (
                        <div key={source} className="flex items-center justify-between text-[12.5px]">
                          <span className="font-bold capitalize text-zinc-800">{source}</span>
                          <span className="font-mono text-zinc-500 font-semibold">
                            {count} ({pct}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Geographic Breakdown */}
              <div className="p-4 rounded-2xl bg-white border border-[#e7e5dc]">
                <div className="text-[11px] font-black uppercase text-zinc-500 tracking-wider mb-3 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Top Geographic Markets</span>
                </div>
                {countries.length === 0 ? (
                  <div className="text-[12px] text-zinc-400 py-3">No geographic data logged yet</div>
                ) : (
                  <div className="space-y-2">
                    {countries.slice(0, 5).map((c: any) => (
                      <div key={c.country} className="space-y-1">
                        <div className="flex items-center justify-between text-[12px]">
                          <span className="font-bold text-zinc-800">
                            {c.country === "IN" ? "🇮🇳 India" : c.country === "US" ? "🇺🇸 United States" : c.country}
                          </span>
                          <span className="font-mono text-zinc-500 font-semibold">
                            {c.count} ({c.percentage}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2c35af] rounded-full"
                            style={{ width: `${c.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 24-Hour Velocity Timeline */}
            {timeline.length > 0 && (
              <div className="p-4 rounded-2xl bg-white border border-[#e7e5dc]">
                <div className="text-[11px] font-black uppercase text-zinc-500 tracking-wider mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>24-Hour Traffic Velocity</span>
                </div>
                <div className="flex items-end gap-1.5 h-16 pt-2">
                  {timeline.map((t: any, idx: number) => {
                    const max = Math.max(...timeline.map((item: any) => item.count), 1);
                    const heightPct = Math.round((t.count / max) * 100);
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center gap-1 group relative cursor-pointer"
                      >
                        <div
                          style={{ height: `${Math.max(heightPct, 8)}%` }}
                          className="w-full bg-[#2c35af] group-hover:bg-[#ccff00] rounded-sm transition-all"
                        />
                        <span className="text-[8.5px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 absolute -top-5 bg-black text-white px-1 rounded z-10">
                          {t.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
