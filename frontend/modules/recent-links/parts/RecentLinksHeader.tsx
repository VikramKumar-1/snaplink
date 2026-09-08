"use client";

import React, { memo } from "react";
import { Link as LinkIcon } from "lucide-react";

interface RecentLinksHeaderProps {
  count: number;
}

export const RecentLinksHeader: React.FC<RecentLinksHeaderProps> = memo(({ count }) => (
  <div className="flex items-center justify-between mb-3 px-1">
    <div className="flex items-center gap-2">
      <LinkIcon className="h-4 w-4 text-[#2c35af]" />
      <h3 className="text-[13px] font-black uppercase tracking-wider text-[#121316]">
        Active Smart Links
      </h3>
    </div>
    <div className="text-[11px] font-black uppercase pill-lime px-3 py-0.5 text-black">
      {count} {count === 1 ? "Link" : "Links"} Active
    </div>
  </div>
));

RecentLinksHeader.displayName = "RecentLinksHeader";
