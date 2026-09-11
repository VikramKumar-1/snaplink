"use client";

import React, { useState } from "react";
import { Users, UserPlus, Shield, Trash2, Mail, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface Member {
  userId?: string;
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
  status: "active" | "invited";
  invitedAt: string;
}

interface Props {
  workspaceId: string;
  members: Member[];
  onRefresh: () => void;
}

export const TeamMembersSection: React.FC<Props> = ({ workspaceId, members, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "member" | "viewer">("member");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/workspaces/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId, email: email.trim(), role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Failed to invite member");

      setEmail("");
      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      setError(err.message || "Failed to invite member");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (memberEmail: string, newRole: "admin" | "member" | "viewer") => {
    try {
      const res = await fetch("/api/workspaces/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId, email: memberEmail, role: newRole }),
      });
      if (res.ok) onRefresh();
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  const handleRemove = async (memberEmail: string) => {
    if (!confirm(`Are you sure you want to remove ${memberEmail} from this workspace?`)) return;
    try {
      const res = await fetch("/api/workspaces/members", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId, email: memberEmail }),
      });
      if (res.ok) onRefresh();
    } catch (err) {
      console.error("Failed to remove member:", err);
    }
  };

  const getRoleBadge = (r: string) => {
    switch (r) {
      case "owner":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "admin":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20";
      case "member":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bento-card-light p-4 rounded-2xl">
        <div>
          <h3 className="text-sm font-bold text-[#121316] flex items-center gap-2">
            <Users className="h-4 w-4 text-[#2c35af]" />
            Workspace Teammates & Roles
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">Manage team access and permissions across all links and domains.</p>
        </div>
        <button
          onClick={() => { setIsModalOpen(true); setError(null); }}
          className="btn-bento-primary flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm cursor-pointer self-start sm:self-auto shrink-0 transition-all active:scale-95"
        >
          <UserPlus className="h-3.5 w-3.5" />
          <span>Invite Teammate</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {members.map((m) => (
          <div key={m.email} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-[#e7e5dc] bg-white shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#f5f4ef] text-[#2c35af] border border-[#e7e5dc]">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-[#121316]">{m.email}</span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getRoleBadge(m.role)}`}>
                    {m.role}
                  </span>
                  <span className="text-[10px] text-zinc-500 flex items-center gap-1 font-medium">
                    {m.status === "active" ? <CheckCircle2 className="h-3 w-3 text-emerald-600" /> : <Clock className="h-3 w-3 text-amber-600" />}
                    {m.status}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 font-mono">Joined: {new Date(m.invitedAt).toLocaleDateString()}</p>
              </div>
            </div>

            {m.role !== "owner" && (
              <div className="flex items-center gap-2 self-end sm:self-center">
                <select
                  value={m.role}
                  onChange={(e) => handleRoleChange(m.email, e.target.value as any)}
                  className="rounded-lg bg-[#faf9f5] border border-[#e7e5dc] px-2.5 py-1 text-xs font-bold text-[#121316] focus:outline-none focus:border-[#2c35af] cursor-pointer"
                >
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                  <option value="viewer">Viewer</option>
                </select>
                <button
                  onClick={() => handleRemove(m.email)}
                  className="p-1.5 rounded-xl border border-[#e7e5dc] bg-white text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer shadow-xs"
                  title="Remove Member"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-[#e7e5dc] bg-white p-6 shadow-2xl space-y-4">
            <form onSubmit={handleInvite} className="space-y-4">
              <h3 className="text-base font-black text-[#121316] uppercase tracking-tight">Invite New Teammate</h3>
              {error && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1.5">Teammate Email</label>
                <input
                  type="email"
                  required
                  placeholder="colleague@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#e7e5dc] bg-[#faf9f5] px-3.5 py-2.5 text-xs font-bold text-[#121316] placeholder-zinc-400 focus:outline-none focus:border-[#2c35af] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1.5">Role & Permissions</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full rounded-xl border border-[#e7e5dc] bg-[#faf9f5] px-3.5 py-2.5 text-xs font-bold text-[#121316] focus:outline-none focus:border-[#2c35af] cursor-pointer"
                >
                  <option value="admin">Admin (Can manage links, domains & members)</option>
                  <option value="member">Member (Can create & edit smart links)</option>
                  <option value="viewer">Viewer (Read-only access to links & analytics)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl px-4 py-2 text-xs font-bold text-zinc-500 hover:text-[#121316] cursor-pointer">Cancel</button>
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="btn-bento-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Inviting..." : "Send Invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
