"use client";

import React from "react";
import { Globe, Lock } from "lucide-react";

interface MockupProps {
  name: string;
  accentColor: string;
}

export const DomainCnameMockup: React.FC<MockupProps> = () => {
  return (
    <div className="rounded-2xl bg-white border border-[#e7e5dc] p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-[#2c35af]" />
          <span className="font-bold text-[13px] text-[#121316]">links.yourbrand.com</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
          SSL Active
        </span>
      </div>
      <div className="space-y-2 text-[11px] font-mono">
        <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] flex items-center justify-between">
          <span className="text-zinc-500">DNS Record Type</span>
          <span className="font-bold text-[#121316]">CNAME</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] flex items-center justify-between">
          <span className="text-zinc-500">Target Server</span>
          <span className="font-bold text-[#2c35af]">cname.snaplink.to</span>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between text-emerald-800 font-bold">
          <span>Verification Status</span>
          <span>Propagated (Verified ✓)</span>
        </div>
      </div>
    </div>
  );
};

export const SecurityLockMockup: React.FC<MockupProps> = () => {
  return (
    <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 text-center text-white shadow-xl">
      <div className="h-11 w-11 rounded-2xl bg-red-500/20 border border-red-500/40 mx-auto mb-2.5 flex items-center justify-center text-red-400">
        <Lock className="h-5 w-5" />
      </div>
      <div className="text-[13px] font-black uppercase tracking-tight">Protected VIP Gate</div>
      <div className="text-[10.5px] text-zinc-400 mt-1 mb-3">Enter 4-digit PIN to unlock content</div>
      <div className="flex justify-center gap-2 my-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-9 w-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-lg font-bold text-[#ccff00]"
          >
            &bull;
          </div>
        ))}
      </div>
      <div className="text-[10px] text-zinc-500 font-mono mt-2">
        Bcrypt Salted &middot; Auto-expires after 50 clicks
      </div>
    </div>
  );
};

export const CtaBannerMockup: React.FC<MockupProps> = () => {
  return (
    <div className="rounded-2xl bg-white border border-[#e7e5dc] p-4 shadow-lg overflow-hidden">
      {/* Simulated Destination Article */}
      <div className="rounded-xl bg-[#f5f4ef] border border-[#e7e5dc] p-3 text-[11px] text-zinc-400 mb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="h-2 w-2 rounded-full bg-zinc-300" />
          <div className="h-2 w-2 rounded-full bg-zinc-300" />
          <div className="h-2 w-2 rounded-full bg-zinc-300" />
          <span className="text-[9.5px] font-mono text-zinc-400 ml-2">techcrunch.com/market-news</span>
        </div>
        <div className="h-3 w-3/4 bg-zinc-200 rounded mb-1.5" />
        <div className="h-3 w-1/2 bg-zinc-200 rounded" />
      </div>

      {/* Floating CTA Overlay */}
      <div className="p-3 rounded-xl bg-[#121316] text-white flex items-center justify-between gap-2 shadow-md">
        <div>
          <div className="text-[11.5px] font-bold text-[#ccff00]">20% Off Launch Deal</div>
          <div className="text-[9.5px] text-zinc-300">Join our VIP creator club today</div>
        </div>
        <span className="px-2.5 py-1 rounded-lg bg-white text-black text-[10px] font-extrabold shrink-0">
          Claim Deal ↗
        </span>
      </div>
    </div>
  );
};

export const UtmPixelMockup: React.FC<MockupProps> = () => {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 text-white font-mono text-[11px] shadow-xl">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-zinc-400 text-[10.5px]">
        <span className="text-[#ccff00] font-bold">Auto-Injected UTM Engine</span>
        <span>GA4 & Meta Ready</span>
      </div>
      <div className="space-y-1.5">
        <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex justify-between">
          <span className="text-zinc-500">utm_source</span>
          <span className="text-emerald-400 font-bold">instagram</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex justify-between">
          <span className="text-zinc-500">utm_medium</span>
          <span className="text-sky-400 font-bold">bio_link</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex justify-between">
          <span className="text-zinc-500">Meta Pixel Event</span>
          <span className="text-indigo-400 font-bold">PageView (Fired ✓)</span>
        </div>
      </div>
    </div>
  );
};

export const ApiCodeMockup: React.FC<MockupProps> = () => {
  return (
    <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 text-white font-mono text-[11px] shadow-xl">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-zinc-400 text-[10px]">
        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          POST /api/links
        </span>
        <span className="text-zinc-400">201 Created &bull; 8ms</span>
      </div>
      <pre className="text-[10.5px] text-zinc-300 leading-relaxed overflow-x-auto">
{`Authorization: Bearer sk_live_...
{
  "url": "https://youtu.be/xyz",
  "smartRouting": true,
  "customDomain": "links.mybrand.com"
}`}
      </pre>
    </div>
  );
};
