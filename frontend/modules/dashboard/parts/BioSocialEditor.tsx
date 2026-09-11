"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import {
  InstagramLogo,
  YoutubeLogo,
  TelegramLogo,
  SpotifyLogo,
  TwitterXLogo,
  FacebookLogo,
} from "@/frontend/shared/icons/PlatformIcons";

export interface SocialLink {
  platform: string;
  url: string;
  handle?: string;
}

interface Props {
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  addSocialLink: (platform: string) => void;
  removeSocialLink: (platform: string) => void;
}

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: <InstagramLogo className="h-3.5 w-3.5" /> },
  { id: "youtube", label: "YouTube", icon: <YoutubeLogo className="h-3.5 w-3.5" /> },
  { id: "telegram", label: "Telegram", icon: <TelegramLogo className="h-3.5 w-3.5 text-sky-400" /> },
  { id: "spotify", label: "Spotify", icon: <SpotifyLogo className="h-3.5 w-3.5 text-emerald-400" /> },
  { id: "x", label: "X (Twitter)", icon: <TwitterXLogo className="h-3 w-3" /> },
  { id: "facebook", label: "Facebook", icon: <FacebookLogo className="h-3.5 w-3.5 text-blue-600" /> },
] as const;

const cleanHandleInput = (input: string): string => {
  let val = input.trim();
  try {
    if (val.includes("youtube.com/") || val.includes("youtu.be/")) {
      const u = new URL(val.startsWith("http") ? val : `https://${val}`);
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length > 0) val = parts[parts.length - 1];
    } else if (val.includes("instagram.com/") || val.includes("x.com/") || val.includes("twitter.com/") || val.includes("t.me/")) {
      const u = new URL(val.startsWith("http") ? val : `https://${val}`);
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length > 0) val = parts[parts.length - 1];
    }
  } catch {}
  return val.replace(/[\r\n]+/g, "").slice(0, 24);
};

const buildPlatformUrl = (platform: string, handle: string): string => {
  const clean = handle.replace(/^[@/]+/, "").trim();
  if (!clean) return "";
  switch (platform.toLowerCase()) {
    case "youtube": return `https://youtube.com/@${clean}`;
    case "instagram": return `https://instagram.com/${clean}`;
    case "telegram": return `https://t.me/${clean}`;
    case "spotify": return `https://open.spotify.com/artist/${clean}`;
    case "x": return `https://x.com/${clean}`;
    case "facebook": return `https://facebook.com/${clean}`;
    case "github": return `https://github.com/${clean}`;
    case "linkedin": return `https://linkedin.com/in/${clean}`;
    default: return `https://${platform}.com/${clean}`;
  }
};

export const BioSocialEditor: React.FC<Props> = ({
  socialLinks,
  setSocialLinks,
  addSocialLink,
  removeSocialLink,
}) => {
  return (
    <div className="p-4 rounded-[20px] bento-card-light space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <label className="text-[11px] font-black text-[#121316] uppercase tracking-wider block">
          Social Profiles
        </label>
        <div className="flex flex-wrap items-center gap-1">
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              type="button"
              onClick={() => addSocialLink(plat.id)}
              className="px-2 py-1 rounded-lg bg-white border border-[#e7e5dc] text-[10px] font-bold uppercase hover:border-[#2c35af] flex items-center gap-1 shadow-xs transition-colors"
            >
              {plat.icon}
              <span>+{plat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5 mt-3 max-h-[340px] overflow-y-auto overscroll-contain pr-1 scrollbar-thin scrollbar-thumb-zinc-300">
        {socialLinks.map((s, idx) => {
          const platDef = PLATFORMS.find((p) => p.id === s.platform);
          return (
            <div key={idx} className="flex flex-col gap-2 p-2.5 bg-white border border-[#e7e5dc] rounded-xl relative shadow-xs">
              <button
                type="button"
                onClick={() => removeSocialLink(s.platform)}
                className="absolute top-2.5 right-2.5 p-1 text-zinc-400 hover:text-red-600 transition bg-white border border-[#e7e5dc] rounded-md shadow-xs"
              >
                <Trash2 className="h-3 w-3" />
              </button>

              <div className="flex items-center gap-1.5">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#f8f7f4] border border-[#e7e5dc] shadow-xs shrink-0">
                  {platDef ? platDef.icon : <span className="text-[9px] font-bold">{s.platform.charAt(0).toUpperCase()}</span>}
                </span>
                <span className="text-[10.5px] font-black uppercase text-[#121316] tracking-wider">{s.platform}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-[9.5px] font-bold text-zinc-500 uppercase block">Display Username</label>
                    <span className="text-[8.5px] font-mono text-zinc-400">
                      {(s.handle || "").length}/24
                    </span>
                  </div>
                  <input
                    type="text"
                    value={s.handle || ""}
                    maxLength={24}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const val = cleanHandleInput(raw);
                      const newSocial = [...socialLinks];
                      newSocial[idx].handle = val;

                      const clean = val.replace(/^[@/]+/, "").trim();
                      if (clean && (!s.url || s.url.includes(s.platform) || s.url.includes("t.me") || s.url.includes("spotify"))) {
                        newSocial[idx].url = buildPlatformUrl(s.platform, clean);
                      }
                      setSocialLinks(newSocial);
                    }}
                    onBlur={(e) => {
                      const val = e.target.value.trim();
                      if (val && !val.startsWith("@") && !val.startsWith("/")) {
                        const newSocial = [...socialLinks];
                        newSocial[idx].handle = `@${val}`;
                        setSocialLinks(newSocial);
                      }
                    }}
                    placeholder="@username"
                    className="w-full bento-input px-2.5 py-1.5 text-xs font-bold text-[#121316] focus:outline-none"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-[9.5px] font-bold text-zinc-500 uppercase block">Destination URL</label>
                    <span className="text-[8.5px] font-mono text-zinc-400">Auto adds https://</span>
                  </div>
                  <input
                    type="url"
                    value={s.url}
                    onChange={(e) => {
                      const newSocial = [...socialLinks];
                      newSocial[idx].url = e.target.value;
                      setSocialLinks(newSocial);
                    }}
                    onBlur={(e) => {
                      let val = e.target.value.trim();
                      if (val && !val.startsWith("http://") && !val.startsWith("https://")) {
                        val = `https://${val}`;
                        const newSocial = [...socialLinks];
                        newSocial[idx].url = val;
                        setSocialLinks(newSocial);
                      }
                    }}
                    placeholder={`https://${s.platform}.com/...`}
                    className="w-full bento-input px-2.5 py-1.5 text-[11px] text-[#121316] font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
