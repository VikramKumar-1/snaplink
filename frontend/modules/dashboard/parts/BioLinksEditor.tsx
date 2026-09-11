"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";

export interface CustomBioLinkItem {
  id: string;
  title: string;
  url: string;
  isHighlighted?: boolean;
}

interface Props {
  customLinks: CustomBioLinkItem[];
  setCustomLinks: React.Dispatch<React.SetStateAction<CustomBioLinkItem[]>>;
  addCustomLink: () => void;
  removeCustomLink: (id: string) => void;
}

export const BioLinksEditor: React.FC<Props> = ({
  customLinks,
  setCustomLinks,
  addCustomLink,
  removeCustomLink,
}) => {
  return (
    <div className="p-4 rounded-[20px] bento-card-light space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-[11px] font-black text-[#121316] uppercase tracking-wider block">
            Curated Links
          </label>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
            {customLinks.length} links
          </span>
        </div>
        <button
          type="button"
          onClick={addCustomLink}
          className="pill-lime px-2.5 py-1 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
        >
          <Plus className="h-3 w-3 stroke-[3]" />
          <span>Add Link</span>
        </button>
      </div>

      {/* Lazy / Scroll Optimized Links List */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto overscroll-contain pr-1 scrollbar-thin scrollbar-thumb-zinc-300">
        {customLinks.map((link, idx) => (
          <div key={link.id} className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e7e5dc] space-y-2">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={link.title}
                onChange={(e) => {
                  const updated = [...customLinks];
                  updated[idx].title = e.target.value;
                  setCustomLinks(updated);
                }}
                placeholder="Link Title (e.g. My Gear List)"
                className="w-full bento-input px-2.5 py-1.5 text-xs font-bold text-[#121316] bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeCustomLink(link.id)}
                className="p-1 text-zinc-400 hover:text-red-600 transition cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <input
                type="url"
                value={link.url}
                onChange={(e) => {
                  const updated = [...customLinks];
                  updated[idx].url = e.target.value;
                  setCustomLinks(updated);
                }}
                placeholder="https://destination-url.com"
                className="w-full bento-input px-2.5 py-1.5 text-[11px] text-[#121316] bg-white font-mono focus:outline-none"
              />
              <label className="flex items-center gap-1 text-[10.5px] font-bold text-zinc-600 cursor-pointer shrink-0 select-none">
                <input
                  type="checkbox"
                  checked={link.isHighlighted || false}
                  onChange={(e) => {
                    const updated = [...customLinks];
                    updated[idx].isHighlighted = e.target.checked;
                    setCustomLinks(updated);
                  }}
                  className="rounded text-[#2c35af] h-3.5 w-3.5"
                />
                <span>Highlight</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
