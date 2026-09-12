"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Globe2, Smartphone, LayoutTemplate } from "lucide-react";

interface AnalyticsChartsProps {
  analytics: {
    totalClicks: number;
    deviceBreakdown: Record<string, number>;
    referrerBreakdown: Record<string, number>;
    browserBreakdown: Record<string, number>;
    countryBreakdown: { country: string; count: number; percentage: number }[];
  };
}

const COLORS = ["#2c35af", "#4ade80", "#f43f5e", "#fbbf24", "#38bdf8", "#c084fc"];

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ analytics }) => {
  // Format Data for Recharts
  const deviceData = [
    { name: "Mobile", value: analytics.deviceBreakdown.mobile || 0 },
    { name: "Desktop", value: analytics.deviceBreakdown.desktop || 0 },
    { name: "Tablet", value: analytics.deviceBreakdown.tablet || 0 },
  ].filter((d) => d.value > 0);

  const referrerData = Object.entries(analytics.referrerBreakdown || {})
    .map(([name, value]) => ({ name: name === "direct" ? "Direct" : name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const browserData = Object.entries(analytics.browserBreakdown || {})
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Custom Tooltips
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-xl">
          <p className="font-bold text-[13px] text-gray-800">{payload[0].name}</p>
          <p className="text-[12px] font-medium text-[#2c35af]">
            Clicks: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Device Breakdown (Donut Chart) */}
      <div className="bg-white border border-[#e7e5dc] rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-blue-50 text-[#2c35af] rounded-lg">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-[15px] font-black text-[#121316]">Devices</h3>
        </div>
        {deviceData.length > 0 ? (
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-sm font-bold text-gray-400">
            No data yet
          </div>
        )}
      </div>

      {/* Referrer Traffic (Bar Chart) */}
      <div className="bg-white border border-[#e7e5dc] rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-[15px] font-black text-[#121316]">Top Sources</h3>
        </div>
        {referrerData.length > 0 ? (
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referrerData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: 700, fill: "#6b7280" }}
                  width={80}
                />
                <Tooltip cursor={{ fill: "#f8f7f4" }} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#4ade80" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-sm font-bold text-gray-400">
            No data yet
          </div>
        )}
      </div>

      {/* Browser Stats (Bar Chart) */}
      <div className="bg-white border border-[#e7e5dc] rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
            <LayoutTemplate className="w-5 h-5" />
          </div>
          <h3 className="text-[15px] font-black text-[#121316]">Browsers</h3>
        </div>
        {browserData.length > 0 ? (
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={browserData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: 700, fill: "#6b7280" }}
                  dy={10}
                />
                <Tooltip cursor={{ fill: "#f8f7f4" }} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-sm font-bold text-gray-400">
            No data yet
          </div>
        )}
      </div>
    </div>
  );
};
