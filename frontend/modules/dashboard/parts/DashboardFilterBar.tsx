"use client";

import React from "react";
import { Search, X, Filter } from "lucide-react";

interface DashboardFilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (val: string) => void;
}

export const DashboardFilterBar: React.FC<DashboardFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
}) => {
  return (
    <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-[24px] bento-card-light mb-4 sm:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-2.5 bento-input px-3 py-2 sm:px-3.5 sm:py-2.5 flex-1 max-w-md">
        <Search className="h-4 w-4 text-zinc-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search links by slug or destination..."
          className="w-full bg-transparent text-[12.5px] sm:text-[13.5px] text-[#121316] placeholder-zinc-400 focus:outline-none"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="text-zinc-400 hover:text-black shrink-0 p-1">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none -mx-1 px-1">
        <span className="text-[11.5px] font-black uppercase text-zinc-500 mr-1 hidden sm:inline flex items-center gap-1">
          <Filter className="h-3 w-3" /> Filter:
        </span>
        {["all", "youtube", "instagram", "amazon", "myntra", "telegram", "spotify"].map((plat) => (
          <button
            key={plat}
            onClick={() => setSelectedPlatform(plat)}
            className={`px-3 py-1.5 rounded-xl text-[11.5px] font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
              selectedPlatform === plat
                ? "bg-[#121316] text-white shadow-xs"
                : "bg-[#f5f4ef] text-zinc-600 hover:text-black border border-[#e7e5dc]"
            }`}
          >
            {plat === "all" ? "All Platforms" : plat}
          </button>
        ))}
      </div>
    </div>
  );
};
