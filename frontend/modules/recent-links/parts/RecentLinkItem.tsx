"use client";

import React, { memo } from "react";
import { CreatedLink } from "@/frontend/shared/store/useLinkStore";
import { RecentLinkActions } from "./RecentLinkActions";

interface RecentLinkItemProps {
  link: CreatedLink;
  isCopied: boolean;
  onCopy: (code: string) => void;
  onOpenQr: (link: CreatedLink) => void;
  onOpenAnalytics: (code: string) => void;
}

export const RecentLinkItem: React.FC<RecentLinkItemProps> = memo(
  ({ link, isCopied, onCopy, onOpenQr, onOpenAnalytics }) => (
    <div className="p-4 rounded-2xl bento-card-light hover:border-[#2c35af] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transform-gpu">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-[15px] font-black text-[#121316] font-mono tracking-tight group-hover:text-[#2c35af] transition m-0">
            /{link.shortCode}
          </h4>
          <div className="text-[10px] font-black uppercase text-zinc-700 bg-[#f5f4ef] border border-[#e7e5dc] rounded-md px-2 py-0.5">
            {link.platform}
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 font-bold ml-auto sm:ml-2">
            <div className="h-2 w-2 rounded-full bg-[#ccff00] ring-2 ring-[#ccff00]/40" />
            {link.clicks || 0} clicks
          </div>
        </div>
        <p className="text-[13px] text-zinc-500 truncate m-0 font-medium">{link.originalUrl}</p>
      </div>

      <RecentLinkActions
        link={link}
        isCopied={isCopied}
        onCopy={onCopy}
        onOpenQr={onOpenQr}
        onOpenAnalytics={onOpenAnalytics}
      />
    </div>
  )
);

RecentLinkItem.displayName = "RecentLinkItem";
