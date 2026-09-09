"use client";

import React from "react";
import Link from "next/link";
import { Clock, AlertTriangle, ArrowRight, ShieldAlert } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

interface LinkExpiredCardProps {
  title?: string;
  reason?: "click_limit" | "date_expired" | string;
}

export const LinkExpiredCard: React.FC<LinkExpiredCardProps> = ({
  title = "Smart Link",
  reason = "date_expired",
}) => {
  const isClickLimit = reason === "click_limit";

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-[28px] bento-card-light bg-white border border-[#e7e5dc] shadow-2xl animate-fade-in text-center">
      {/* Icon Badge */}
      <div className="h-16 w-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5 text-amber-700 shadow-xs">
        {isClickLimit ? (
          <ShieldAlert className="h-8 w-8 stroke-[2.5]" />
        ) : (
          <Clock className="h-8 w-8 stroke-[2.5]" />
        )}
      </div>

      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-black uppercase tracking-wider mb-2">
        <span className="h-2 w-2 rounded-full bg-amber-500" />
        <span>{isClickLimit ? "Click Quota Reached" : "Campaign Expired"}</span>
      </div>

      <h2 className="text-[20px] sm:text-[22px] font-black text-[#121316] tracking-tight uppercase leading-snug">
        {title}
      </h2>

      <p className="text-[13px] text-zinc-500 mt-2 mb-6 font-medium leading-relaxed">
        {isClickLimit
          ? "This exclusive drop or offer has reached its maximum visitor limit set by the creator."
          : "This time-limited campaign or smart link has expired and is no longer accepting new clicks."}
      </p>

      <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#e7e5dc] mb-6 text-[12px] text-zinc-600 font-medium">
        💡 Check the creator&apos;s latest social posts or bio page for updated links and ongoing offers.
      </div>

      <Link
        href="/"
        className="w-full py-3.5 btn-bento-primary text-[13.5px] font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md inline-block"
      >
        <span>Explore {BRAND_CONFIG.name}</span>
        <ArrowRight className="h-4 w-4 stroke-[3]" />
      </Link>

      <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-[11px] font-bold text-zinc-400 font-mono">
        <span>Powered by {BRAND_CONFIG.name} Intent Engine</span>
      </div>
    </div>
  );
};
