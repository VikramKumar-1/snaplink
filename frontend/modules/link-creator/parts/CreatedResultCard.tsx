"use client";

import React, { useState } from "react";
import { Check, Copy, QrCode, BarChart3, ExternalLink, CheckCircle2 } from "lucide-react";
import { useLinkStore } from "@/frontend/shared/store/useLinkStore";
import { getBaseUrl } from "@/frontend/shared/lib/utils";
import { CreatedLinkResult } from "../types";

interface Props {
  result: CreatedLinkResult;
}

export const CreatedResultCard: React.FC<Props> = ({ result }) => {
  const { openQrModal, openAnalyticsModal } = useLinkStore();
  const [copied, setCopied] = useState(false);

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
    </div>
  );
};
