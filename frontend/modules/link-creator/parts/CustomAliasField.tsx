"use client";

import React from "react";
import { AtSign, Shuffle } from "lucide-react";

interface Props {
  customSlug: string;
  setCustomSlug: (v: string) => void;
}

export const CustomAliasField: React.FC<Props> = ({ customSlug, setCustomSlug }) => {
  const generateRandomSlug = () => {
    const prefixes = ["reel", "deal", "video", "drop", "shop", "vip", "post", "app"];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(100 + Math.random() * 900);
    setCustomSlug(`${randomPrefix}-${randomNum}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[12px] font-black text-[#121316] uppercase tracking-wider block">
          Custom Short Alias <span className="text-zinc-400 font-normal text-[11px] lowercase">(optional)</span>
        </label>
        <button
          type="button"
          onClick={generateRandomSlug}
          className="text-[11px] font-bold text-[#2c35af] hover:text-black flex items-center gap-1 transition cursor-pointer px-2 py-0.5 rounded-md hover:bg-zinc-100"
          title="Auto-generate a readable alias"
        >
          <Shuffle className="h-3 w-3 text-[#2c35af]" />
          <span>Generate</span>
        </button>
      </div>

      <div className="flex items-center bento-input px-3.5 py-3">
        <div className="flex items-center gap-1 text-[13px] text-[#2c35af] font-mono select-none pr-1.5 font-bold">
          <AtSign className="h-3.5 w-3.5 text-[#2c35af]" />
          smartlink.to/
        </div>
        <input
          type="text"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
          placeholder="my-viral-deal"
          className="w-full bg-transparent text-[13.5px] text-[#121316] placeholder-zinc-400 focus:outline-none font-mono font-medium"
        />
      </div>
    </div>
  );
};
