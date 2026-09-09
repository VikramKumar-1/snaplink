"use client";

import React from "react";
import { Smartphone, ArrowUpRight } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

interface Props {
  username: string;
  displayName: string;
  bioText: string;
  avatarUrl: string;
  customLinks: Array<{ id: string; title: string; url: string; isHighlighted?: boolean }>;
}

export const BioPhonePreview: React.FC<Props> = ({
  username,
  displayName,
  bioText,
  avatarUrl,
  customLinks,
}) => {
  return (
    <div className="lg:col-span-5 sticky top-24">
      <div className="text-center mb-3">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-center gap-1.5">
          <Smartphone className="h-3.5 w-3.5" />
          Live Mobile Viewport Preview
        </span>
      </div>

      <div className="w-full max-w-[320px] mx-auto rounded-[36px] p-4 bg-black shadow-2xl border-4 border-zinc-800">
        <div className="w-full h-[520px] rounded-[28px] overflow-y-auto scrollbar-none p-4 flex flex-col items-center text-center bg-gradient-to-b from-[#101438] to-[#060817] text-white">
          {/* Mockup Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2c35af] to-purple-600 flex items-center justify-center text-xl font-bold mb-2 shadow-lg ring-2 ring-white/20 mt-4 shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
            ) : displayName ? (
              displayName.charAt(0).toUpperCase()
            ) : (
              "U"
            )}
          </div>

          <h3 className="font-black text-sm tracking-tight text-white flex items-center gap-1">
            {displayName || "Your Creator Name"}
          </h3>
          <p className="text-[10px] font-mono opacity-60 mb-2">
            @{username || "username"}
          </p>

          {bioText && (
            <p className="text-[11px] opacity-80 line-clamp-2 mb-3 leading-snug">
              {bioText}
            </p>
          )}

          {/* Mockup Links */}
          <div className="w-full space-y-2 my-auto">
            {customLinks.filter((l) => l.title).length > 0 ? (
              customLinks
                .filter((l) => l.title)
                .map((l) => (
                  <div
                    key={l.id}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                      l.isHighlighted
                        ? "bg-[#2c35af] text-white shadow-md ring-1 ring-[#ccff00]"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    <span className="truncate">{l.title}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </div>
                ))
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-white/20 text-[10px] opacity-50">
                Links will appear here
              </div>
            )}
          </div>

          <div className="mt-auto pt-4 text-[9px] opacity-40 font-mono">
            Powered by {BRAND_CONFIG.name}
          </div>
        </div>
      </div>
    </div>
  );
};
