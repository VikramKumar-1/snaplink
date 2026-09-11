"use client";

import React, { useState, useEffect } from "react";
import { Building2, Users, Shield, Lock, RefreshCw, ChevronDown } from "lucide-react";
import { TeamMembersSection } from "./parts/TeamMembersSection";
import { AuditLogViewer } from "./parts/AuditLogViewer";
import { EnterpriseSsoSection } from "./parts/EnterpriseSsoSection";

type WsTab = "members" | "audit" | "sso";

export const WorkspaceStudio: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [selectedWsId, setSelectedWsId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<WsTab>("members");
  const [loading, setLoading] = useState(true);

  const fetchWorkspaces = async () => {
    try {
      const res = await fetch("/api/workspaces");
      if (res.ok) {
        const data = await res.json();
        const list = data.workspaces || [];
        setWorkspaces(list);
        if (list.length > 0 && !selectedWsId) {
          setSelectedWsId(list[0]._id);
        }
      }
    } catch (err) {
      console.error("Failed to fetch workspaces:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const currentWorkspace = workspaces.find((w) => w._id === selectedWsId) || workspaces[0];

  if (loading) {
    return (
      <div className="py-16 flex justify-center text-zinc-500">
        <RefreshCw className="h-6 w-6 animate-spin text-violet-500" />
      </div>
    );
  }

  if (!currentWorkspace) {
    return (
      <div className="p-8 text-center rounded-[24px] bento-card-light text-xs text-zinc-500 font-mono">
        No active team workspace found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Workspace Header & Switcher */}
      <div className="p-5 rounded-[22px] bento-card-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl bg-[#2c35af]/10 border border-[#2c35af]/20 text-[#2c35af] flex items-center justify-center shrink-0">
              <Building2 className="h-4.5 w-4.5" />
            </div>
            <h2 className="text-[17px] font-black text-[#121316] uppercase tracking-tight">{currentWorkspace.name}</h2>
            <span className="text-[10px] font-bold uppercase bg-[#2c35af]/10 text-[#2c35af] border border-[#2c35af]/20 px-2 py-0.5 rounded-full font-mono">
              {currentWorkspace.plan || "Team"}
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-mono pl-11.5">slug: {currentWorkspace.slug}</p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#f5f4ef] border border-[#e7e5dc] self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveTab("members")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === "members" ? "bg-white text-[#121316] shadow-xs border border-[#e7e5dc]" : "text-zinc-500 hover:text-[#121316]"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Teammates</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === "audit" ? "bg-white text-[#121316] shadow-xs border border-[#e7e5dc]" : "text-zinc-500 hover:text-[#121316]"
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Audit Trail</span>
          </button>

          <button
            onClick={() => setActiveTab("sso")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === "sso" ? "bg-white text-[#121316] shadow-xs border border-[#e7e5dc]" : "text-zinc-500 hover:text-[#121316]"
            }`}
          >
            <Lock className="h-3.5 w-3.5" />
            <span>SSO</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === "members" && (
        <TeamMembersSection
          workspaceId={currentWorkspace._id}
          members={currentWorkspace.members || []}
          onRefresh={fetchWorkspaces}
        />
      )}

      {activeTab === "audit" && (
        <AuditLogViewer workspaceId={currentWorkspace._id} />
      )}

      {activeTab === "sso" && (
        <EnterpriseSsoSection
          workspaceId={currentWorkspace._id}
          initialSso={currentWorkspace.ssoConfig}
          onRefresh={fetchWorkspaces}
        />
      )}
    </div>
  );
};
