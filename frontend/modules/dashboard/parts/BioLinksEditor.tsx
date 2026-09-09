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
    <div className="p-6 rounded-[24px] bento-card-light space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[12px] font-black text-[#121316] uppercase tracking-wider block">
          Curated Links
        </label>
        <button
          type="button"
          onClick={addCustomLink}
          className="pill-lime px-3 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 stroke-[3]" />
          <span>Add Link</span>
        </button>
      </div>

      {customLinks.map((link, idx) => (
        <div key={link.id} className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#e7e5dc] space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              value={link.title}
              onChange={(e) => {
                const updated = [...customLinks];
                updated[idx].title = e.target.value;
                setCustomLinks(updated);
              }}
              placeholder="Link Title (e.g. My Gear List or Summer Sale)"
              className="w-full bento-input px-3 py-1.5 text-xs font-bold text-[#121316] bg-white focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeCustomLink(link.id)}
              className="p-1.5 text-zinc-400 hover:text-red-600 transition cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="url"
              value={link.url}
              onChange={(e) => {
                const updated = [...customLinks];
                updated[idx].url = e.target.value;
                setCustomLinks(updated);
              }}
              placeholder="https://..."
              className="w-full bento-input px-3 py-1.5 text-xs text-[#121316] bg-white font-mono focus:outline-none"
            />
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-600 cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={link.isHighlighted || false}
                onChange={(e) => {
                  const updated = [...customLinks];
                  updated[idx].isHighlighted = e.target.checked;
                  setCustomLinks(updated);
                }}
                className="rounded text-[#2c35af]"
              />
              <span>Highlight</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
