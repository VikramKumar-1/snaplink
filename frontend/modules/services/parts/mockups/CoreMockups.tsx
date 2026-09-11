"use client";

import React from "react";
import { QrCode, CheckCircle2, Download } from "lucide-react";

interface MockupProps {
  name: string;
  accentColor: string;
}

export const QrCodeMockup: React.FC<MockupProps> = () => {
  return (
    <div className="rounded-2xl bg-white border border-[#e7e5dc] p-5 text-center shadow-lg">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-3 pb-2 border-b border-zinc-100">
        <span className="font-bold text-[#121316]">Vector QR Studio</span>
        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
          Level H (30% Damage Safe)
        </span>
      </div>

      <div className="h-32 w-32 mx-auto rounded-2xl bg-[#f8f7f4] border border-[#e7e5dc] flex items-center justify-center p-3 mb-3 shadow-inner relative">
        <QrCode className="h-24 w-24 text-[#121316]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-lg bg-[#2c35af] text-white text-[10px] font-black flex items-center justify-center shadow-md">
            SL
          </div>
        </div>
      </div>

      {/* Color Swatches */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-[10.5px] font-bold text-zinc-500">Brand Color:</span>
        <span className="h-4 w-4 rounded-full bg-[#2c35af] ring-2 ring-offset-1 ring-[#2c35af]" />
        <span className="h-4 w-4 rounded-full bg-emerald-600" />
        <span className="h-4 w-4 rounded-full bg-zinc-950" />
        <span className="h-4 w-4 rounded-full bg-rose-600" />
      </div>

      {/* Download Action Pills */}
      <div className="flex items-center justify-center gap-2">
        <span className="px-3 py-1.5 rounded-lg bg-[#f5f4ef] border border-[#e7e5dc] text-[10.5px] font-bold text-zinc-700 flex items-center gap-1">
          <Download className="h-3 w-3" />
          <span>1200px PNG</span>
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-[#121316] text-white text-[10.5px] font-bold flex items-center gap-1">
          <Download className="h-3 w-3" />
          <span>Vector SVG</span>
        </span>
      </div>
    </div>
  );
};

export const BioCardMockup: React.FC<MockupProps> = () => {
  return (
    <div className="max-w-xs mx-auto rounded-3xl bg-zinc-950 border border-zinc-800 p-5 text-center text-white shadow-xl">
      <div className="w-8 h-1.5 bg-zinc-800 rounded-full mx-auto mb-3" />
      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-[#ccff00] mx-auto mb-2 flex items-center justify-center text-black font-black text-lg shadow-md">
        SL
      </div>
      <div className="font-bold text-[14px] flex items-center justify-center gap-1">
        <span>@creator_official</span>
        <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 fill-blue-400" />
      </div>
      <div className="text-[11px] text-zinc-400 mb-4">Official Content & Store Hub &bull; 140k fans</div>

      <div className="space-y-2 text-left">
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-[11.5px] font-bold hover:border-[#ccff00] transition">
          <span>🔥 Latest YouTube Video</span>
          <span className="text-[9.5px] text-zinc-400 font-mono">4.2k clicks</span>
        </div>
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-[11.5px] font-bold hover:border-[#ccff00] transition">
          <span>🛍️ 20% Off Merch Store</span>
          <span className="text-[9.5px] text-zinc-400 font-mono">2.1k clicks</span>
        </div>
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-[11.5px] font-bold hover:border-[#ccff00] transition">
          <span>💬 Join VIP Community</span>
          <span className="text-[9.5px] text-zinc-400 font-mono">980 clicks</span>
        </div>
      </div>
    </div>
  );
};

export const AnalyticsChartMockup: React.FC<MockupProps> = () => {
  return (
    <div className="rounded-2xl bg-white border border-[#e7e5dc] p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-black uppercase text-zinc-600">Live Click Tracker</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          +142% vs Last Week
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center mb-3">
        <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc]">
          <div className="text-[16px] font-black text-[#121316]">28,490</div>
          <div className="text-[9.5px] text-zinc-500 font-bold uppercase">Total Clicks</div>
        </div>
        <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc]">
          <div className="text-[16px] font-black text-[#2c35af]">89.4%</div>
          <div className="text-[9.5px] text-zinc-500 font-bold uppercase">Mobile App</div>
        </div>
        <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc]">
          <div className="text-[16px] font-black text-emerald-600">3.4x</div>
          <div className="text-[9.5px] text-zinc-500 font-bold uppercase">Sales CTR</div>
        </div>
      </div>

      {/* Country Distribution */}
      <div className="space-y-1.5 text-[11px] font-mono mb-2">
        <div className="flex justify-between text-zinc-600">
          <span>🇮🇳 India (Top Traffic)</span>
          <span className="font-bold text-zinc-900">48%</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span>🇺🇸 United States</span>
          <span className="font-bold text-zinc-900">32%</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span>🇬🇧 United Kingdom</span>
          <span className="font-bold text-zinc-900">14%</span>
        </div>
      </div>

      <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden flex">
        <div className="bg-[#2c35af] h-full" style={{ width: "58%" }} title="iOS: 58%" />
        <div className="bg-emerald-500 h-full" style={{ width: "32%" }} title="Android: 32%" />
        <div className="bg-zinc-400 h-full" style={{ width: "10%" }} title="Desktop: 10%" />
      </div>
    </div>
  );
};

export const SmartRoutingMockup: React.FC<MockupProps> = () => {
  return (
    <div className="rounded-2xl bg-[#faf9f5] border border-[#e7e5dc] p-4 font-mono text-[11px] shadow-lg">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Dynamic Router</span>
        <span className="text-[9.5px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
          Evaluated in 0.8ms
        </span>
      </div>

      <div className="space-y-2">
        <div className="p-2.5 rounded-xl bg-white border border-[#e7e5dc] flex items-center justify-between">
          <span className="text-zinc-600 flex items-center gap-1.5">
            <span>🍎</span>
            <span>IF Device == iOS</span>
          </span>
          <span className="font-bold text-[#2c35af]">Apple App Store</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white border border-[#e7e5dc] flex items-center justify-between">
          <span className="text-zinc-600 flex items-center gap-1.5">
            <span>🤖</span>
            <span>IF Device == Android</span>
          </span>
          <span className="font-bold text-emerald-600">Google Play Store</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white border border-[#e7e5dc] flex items-center justify-between">
          <span className="text-zinc-600 flex items-center gap-1.5">
            <span>🇮🇳</span>
            <span>IF Country == India</span>
          </span>
          <span className="font-bold text-amber-600">Amazon.in (Local INR)</span>
        </div>
      </div>
    </div>
  );
};
