"use client";

import React from "react";
import { Trash2 } from "lucide-react";

export interface SocialLink {
  platform: string;
  url: string;
}

interface Props {
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  addSocialLink: (platform: string) => void;
  removeSocialLink: (platform: string) => void;
}

const PLATFORMS = ["instagram", "youtube", "telegram", "spotify", "twitter"] as const;

export const BioSocialEditor: React.FC<Props> = ({
  socialLinks,
  setSocialLinks,
  addSocialLink,
  removeSocialLink,
}) => {
  return (
    <div className="p-6 rounded-[24px] bento-card-light space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[12px] font-black text-[#121316] uppercase tracking-wider block">
          Social Profiles
        </label>
        <div className="flex items-center gap-1.5">
          {PLATFORMS.map((plat) => (
            <button
              key={plat}
              type="button"
              onClick={() => addSocialLink(plat)}
              className="px-2 py-1 rounded-lg bg-white border border-[#e7e5dc] text-[11px] font-bold uppercase hover:border-[#2c35af]"
            >
              +{plat}
            </button>
          ))}
        </div>
      </div>

      {socialLinks.map((s, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase w-20 text-zinc-500 shrink-0">
            {s.platform}
          </span>
          <input
            type="url"
            value={s.url}
            onChange={(e) => {
              const newSocial = [...socialLinks];
              newSocial[idx].url = e.target.value;
              setSocialLinks(newSocial);
            }}
            placeholder={`https://${s.platform}.com/...`}
            className="w-full bento-input px-3 py-2 text-xs text-[#121316] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => removeSocialLink(s.platform)}
            className="p-2 text-zinc-400 hover:text-red-600 transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
