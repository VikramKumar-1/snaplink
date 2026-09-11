"use client";

import React, { useState, useEffect } from "react";
import { Check, Copy, QrCode, BarChart3, ExternalLink, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { useLinkStore } from "@/frontend/shared/store/useLinkStore";
import { useAuth } from "@/frontend/shared/store/useAuth";
import { getBaseUrl } from "@/frontend/shared/lib/utils";
import { CreatedLinkResult } from "../types";

interface Props {
  result: CreatedLinkResult;
}

export const CreatedResultCard: React.FC<Props> = ({ result }) => {
  const { openQrModal, openAnalyticsModal } = useLinkStore();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fullUrl = `${getBaseUrl()}/${result.shortCode}`;

  const copyResultUrl = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-5 p-5 rounded-2xl bento-card-light border-2 border-emerald-400/80 bg-emerald-50/30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <h4 className="text-[14px] font-black text-emerald-900 tracking-tight">
            Deep Link Generated Successfully
          </h4>
        </div>
        <div className="text-[10.5px] font-black uppercase px-2.5 py-0.5 rounded-full pill-lime text-black">
          {result.platform} Intent
        </div>
      </div>

      {/* Main Link Bar */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-emerald-200 mb-3.5 shadow-xs">
        <p className="text-[13.5px] font-mono text-[#121316] font-bold px-2 truncate m-0">
          {fullUrl}
        </p>

        <button
          onClick={copyResultUrl}
          className="px-4 py-2 rounded-xl pill-lime text-[#121316] text-[12px] font-black uppercase flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
        >
          {copied ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      {/* Action Strip */}
      <div className="flex items-center justify-between pt-2.5 border-t border-emerald-200/60 text-[12.5px] font-bold">
        <div className="flex items-center gap-4">
          <button
            onClick={() => openQrModal(result as any)}
            className="text-zinc-700 hover:text-[#2c35af] flex items-center gap-1.5 transition cursor-pointer"
          >
            <QrCode className="h-3.5 w-3.5 text-[#2c35af]" />
            Generate QR
          </button>

          <button
            onClick={() => openAnalyticsModal(result.shortCode)}
            className="text-zinc-700 hover:text-[#2c35af] flex items-center gap-1.5 transition cursor-pointer"
          >
            <BarChart3 className="h-3.5 w-3.5 text-zinc-500" />
            View Clicks
          </button>
        </div>

        <a
          href={`/${result.shortCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:text-emerald-800 font-extrabold flex items-center gap-1 transition"
        >
          Test Link
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Unclaimed Guest Link Conversion Banner */}
      {mounted && !isAuthenticated && (
        <div className="mt-4 pt-3.5 border-t border-emerald-200/80">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#121316] text-white shadow-lg border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                <span className="text-[10.5px] font-black uppercase tracking-wider text-[#ccff00]">
                  Unclaimed Guest Link &middot; Action Needed
                </span>
              </div>
              <p className="text-[13px] font-bold text-white tracking-tight">
                Want live click tracking, geo analytics & full link control?
              </p>
              <p className="text-[11.5px] text-zinc-400 leading-relaxed">
                Sign in to your <span className="text-white font-semibold">Workspace</span> to claim this link, edit destination URLs anytime, and unlock real-time conversion insights forever.
              </p>
            </div>

            <button
              type="button"
              onClick={openAuthModal}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-[#121316] text-[12.5px] font-extrabold flex items-center justify-center gap-2 transition shrink-0 cursor-pointer shadow-md hover:scale-[1.02] active:scale-95"
            >
              <ShieldCheck className="h-4 w-4 text-[#2c35af]" />
              <span>Sign In to Claim Link</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
