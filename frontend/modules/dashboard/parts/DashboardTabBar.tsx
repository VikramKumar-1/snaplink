"use client";

import React from "react";
import { Link2, User, Globe, Code2, Building2 } from "lucide-react";

export type DashboardTab = "links" | "bio" | "domains" | "developers" | "team";

interface Props {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export const DashboardTabBar: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#e7e5dc] border border-[#d6d3c7] w-fit mb-8 flex-wrap">
      <button
        type="button"
        onClick={() => onTabChange("links")}
        className={`px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 transition cursor-pointer ${
          activeTab === "links" ? "bg-[#121316] text-white shadow-xs" : "text-zinc-600 hover:text-black"
        }`}
      >
        <Link2 className="h-4 w-4" />
        <span>Links Hub</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("bio")}
        className={`px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 transition cursor-pointer ${
          activeTab === "bio" ? "bg-[#121316] text-white shadow-xs" : "text-zinc-600 hover:text-black"
        }`}
      >
        <User className="h-4 w-4 text-[#ccff00]" />
        <span>Bio Studio</span>
        <span className="pill-lime text-[10px] font-black uppercase px-2 py-0.5 text-black">Bio</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("domains")}
        className={`px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 transition cursor-pointer ${
          activeTab === "domains" ? "bg-[#121316] text-white shadow-xs" : "text-zinc-600 hover:text-black"
        }`}
      >
        <Globe className="h-4 w-4 text-violet-400" />
        <span>Custom Domains</span>
        <span className="bg-violet-600 text-[10px] font-bold uppercase px-2 py-0.5 text-white rounded-full">CNAME</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("developers")}
        className={`px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 transition cursor-pointer ${
          activeTab === "developers" ? "bg-[#121316] text-white shadow-xs" : "text-zinc-600 hover:text-black"
        }`}
      >
        <Code2 className="h-4 w-4 text-emerald-400" />
        <span>Developers</span>
        <span className="bg-emerald-600 text-[10px] font-bold uppercase px-2 py-0.5 text-white rounded-full">API</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("team")}
        className={`px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 transition cursor-pointer ${
          activeTab === "team" ? "bg-[#121316] text-white shadow-xs" : "text-zinc-600 hover:text-black"
        }`}
      >
        <Building2 className="h-4 w-4 text-amber-400" />
        <span>Team</span>
        <span className="bg-amber-600 text-[10px] font-bold uppercase px-2 py-0.5 text-white rounded-full">RBAC</span>
      </button>
    </div>
  );
};
