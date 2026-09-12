"use client";

import React from "react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

interface Props {
  username: string;
  setUsername: (v: string) => void;
  displayName: string;
  setDisplayName: (v: string) => void;
  avatarUrl: string;
  setAvatarUrl: (v: string) => void;
  bioText: string;
  setBioText: (v: string) => void;
  theme: "royal_blue" | "glass_dark" | "clay_light" | "emerald" | "sunset" | "midnight_glow" | "cyberpunk";
  setTheme: (v: "royal_blue" | "glass_dark" | "clay_light" | "emerald" | "sunset" | "midnight_glow" | "cyberpunk") => void;
}

const THEMES = [
  { id: "royal_blue", label: "Royal Blue", color: "bg-[#2c35af]" },
  { id: "glass_dark", label: "Pitch Dark", color: "bg-zinc-900" },
  { id: "clay_light", label: "Clay Light", color: "bg-[#f5f4ef] border border-zinc-300" },
  { id: "emerald", label: "Emerald", color: "bg-emerald-700" },
  { id: "sunset", label: "Sunset", color: "bg-gradient-to-r from-rose-600 to-amber-600" },
  { id: "midnight_glow", label: "Midnight Glow", color: "bg-indigo-950" },
  { id: "cyberpunk", label: "Cyberpunk", color: "bg-black border border-yellow-500" },
] as const;

export const BioProfileForm: React.FC<Props> = ({
  username,
  setUsername,
  displayName,
  setDisplayName,
  avatarUrl,
  setAvatarUrl,
  bioText,
  setBioText,
  theme,
  setTheme,
}) => {
  return (
    <div className="p-4 rounded-[20px] bento-card-light space-y-3">
      <div>
        <label className="text-[11px] font-black text-[#121316] uppercase tracking-wider block mb-1">
          Bio Username Handle
        </label>
        <div className="flex items-center bento-input px-3 py-1.5">
          <span className="text-xs text-[#2c35af] font-mono font-bold pr-1 select-none">
            {BRAND_CONFIG.shortDomain}/@
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
            placeholder="yourname"
            required
            maxLength={30}
            className="w-full bg-transparent text-xs text-[#121316] font-mono font-bold focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-black text-[#121316] uppercase tracking-wider block">
              Display Name
            </label>
            <span className="text-[10px] font-mono font-medium text-zinc-400">
              {displayName.length}/32
            </span>
          </div>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value.replace(/[\r\n]+/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            placeholder="e.g. Vikram Tech"
            required
            maxLength={32}
            className="w-full bento-input px-3 py-1.5 text-xs text-[#121316] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[11px] font-black text-[#121316] uppercase tracking-wider block mb-1">
            Avatar Image URL (Optional)
          </label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://... image link"
            className="w-full bento-input px-3 py-1.5 text-xs text-[#121316] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[11px] font-black text-[#121316] uppercase tracking-wider block">
            Short Bio
          </label>
          <span className="text-[10px] font-mono font-medium text-zinc-400">
            {bioText.length}/90
          </span>
        </div>
        <textarea
          value={bioText}
          onChange={(e) => setBioText(e.target.value)}
          placeholder="Tech reviewer, photographer, creator. Check out my latest gear and deals below!"
          maxLength={90}
          rows={2}
          style={{ wordBreak: "break-all" }}
          className="w-full bento-input px-3 py-1.5 text-xs text-[#121316] focus:outline-none resize-none break-all"
        />
      </div>

      <div>
        <label className="text-[11px] font-black text-[#121316] uppercase tracking-wider block mb-1.5">
          Page Visual Theme
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 border transition ${
                theme === t.id
                  ? "border-[#2c35af] bg-indigo-50 text-[#2c35af] ring-2 ring-[#2c35af]/20"
                  : "border-[#e7e5dc] bg-white text-zinc-600 hover:border-zinc-300"
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${t.color}`} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
