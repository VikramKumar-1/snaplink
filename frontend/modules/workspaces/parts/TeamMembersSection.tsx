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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="h-4 w-4 text-violet-400" />
            Workspace Teammates & Roles
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">Manage team access and permissions across all links and domains.</p>
        </div>
        <button
          onClick={() => { setIsModalOpen(true); setError(null); }}
          className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition cursor-pointer self-start sm:self-auto shrink-0 shadow-sm"
        >
          <UserPlus className="h-3.5 w-3.5" />
          <span>Invite Teammate</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {members.map((m) => (
          <div key={m.email} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-white">{m.email}</span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getRoleBadge(m.role)}`}>
                    {m.role}
                  </span>
                  <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                    {m.status === "active" ? <CheckCircle2 className="h-3 w-3 text-emerald-400" /> : <Clock className="h-3 w-3 text-amber-400" />}
                    {m.status}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500">Joined: {new Date(m.invitedAt).toLocaleDateString()}</p>
              </div>
            </div>

            {m.role !== "owner" && (
              <div className="flex items-center gap-2 self-end sm:self-center">
                <select
                  value={m.role}
                  onChange={(e) => handleRoleChange(m.email, e.target.value as any)}
                  className="rounded-lg bg-zinc-950 border border-zinc-800 px-2.5 py-1 text-xs text-zinc-300 focus:outline-none focus:border-violet-500 cursor-pointer"
                >
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                  <option value="viewer">Viewer</option>
                </select>
                <button
                  onClick={() => handleRemove(m.email)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            <form onSubmit={handleInvite} className="space-y-4">
              <h3 className="text-base font-bold text-white">Invite New Teammate</h3>
              {error && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Teammate Email</label>
                <input
                  type="email"
                  required
                  placeholder="colleague@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Role & Permissions</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 cursor-pointer"
                >
                  <option value="admin">Admin (Can manage links, domains & members)</option>
                  <option value="member">Member (Can create & edit smart links)</option>
                  <option value="viewer">Viewer (Read-only access to links & analytics)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl px-4 py-2 text-xs text-zinc-400 hover:text-white">Cancel</button>
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
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
