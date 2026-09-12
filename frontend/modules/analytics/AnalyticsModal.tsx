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
import { AnalyticsCharts } from "../dashboard/AnalyticsCharts";

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

            {/* Recharts Analytics UI */}
            <AnalyticsCharts analytics={data} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
