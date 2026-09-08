"use client";

import React, { memo } from "react";
import { Copy, Check, QrCode, BarChart2, ExternalLink } from "lucide-react";
import { CreatedLink } from "@/frontend/shared/store/useLinkStore";

interface RecentLinkActionsProps {
  link: CreatedLink;
  isCopied: boolean;
  onCopy: (code: string) => void;
  onOpenQr: (link: CreatedLink) => void;
  onOpenAnalytics: (code: string) => void;
}

export const RecentLinkActions: React.FC<RecentLinkActionsProps> = memo(
  ({ link, isCopied, onCopy, onOpenQr, onOpenAnalytics }) => (
    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
      <button
        onClick={() => onCopy(link.shortCode)}
        className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-black transition active:scale-95 cursor-pointer shadow-2xs"
        title="Copy Short Link"
      >
        {isCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
      </button>
      <button
        onClick={() => onOpenQr(link)}
        className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-black transition active:scale-95 cursor-pointer shadow-2xs"
        title="QR Code Studio"
      >
        <QrCode className="h-4 w-4 text-[#2c35af]" />
      </button>
      <button
        onClick={() => onOpenAnalytics(link.shortCode)}
        className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-[#2c35af] text-zinc-700 hover:text-black transition active:scale-95 cursor-pointer shadow-2xs"
        title="Analytics"
      >
        <BarChart2 className="h-4 w-4 text-zinc-500" />
      </button>
      <a
        href={`/${link.shortCode}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] hover:bg-white hover:border-emerald-500 text-emerald-700 hover:text-emerald-800 transition active:scale-95 cursor-pointer shadow-2xs"
        title="Test Link"
      >
        <ExternalLink className="h-4 w-4 text-emerald-600" />
      </a>
    </div>
  )
);

RecentLinkActions.displayName = "RecentLinkActions";
