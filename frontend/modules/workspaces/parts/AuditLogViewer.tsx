"use client";

import React, { useState, useEffect } from "react";
import { Shield, RefreshCw, Filter, Clock, Globe } from "lucide-react";

interface AuditLogItem {
  _id: string;
  actorEmail: string;
  action: string;
  resourceId: string;
  details?: Record<string, any>;
  ip?: string;
  createdAt: string;
}

interface Props {
  workspaceId: string;
}

export const AuditLogViewer: React.FC<Props> = ({ workspaceId }) => {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("all");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const url = `/api/workspaces/audit-logs?workspaceId=${workspaceId}${
        actionFilter !== "all" ? `&action=${actionFilter}` : ""
      }`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [workspaceId, actionFilter]);

  const getActionBadge = (action: string) => {
    if (action.includes("created")) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (action.includes("deleted") || action.includes("removed")) return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    if (action.includes("invited")) return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            Compliance & Security Audit Trail
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">Immutable event log tracking all workspace actions, member modifications, and link mutations.</p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-zinc-400">
            <Filter className="h-3.5 w-3.5 text-zinc-500" />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-transparent text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Events</option>
              <option value="link.created">link.created</option>
              <option value="link.deleted">link.deleted</option>
              <option value="member.invited">member.invited</option>
              <option value="member.removed">member.removed</option>
              <option value="role.updated">role.updated</option>
              <option value="sso.configured">sso.configured</option>
            </select>
          </div>

          <button
            onClick={fetchLogs}
            disabled={loading}
            className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer"
            title="Refresh Logs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-violet-400" : ""}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center text-zinc-500">
          <RefreshCw className="h-5 w-5 animate-spin text-violet-500" />
        </div>
      ) : logs.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40">
          <Shield className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-xs text-zinc-400">No audit logs recorded for the selected filter.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log._id} className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded border ${getActionBadge(log.action)}`}>
                  {log.action}
                </span>
                <span className="text-white font-medium">{log.actorEmail}</span>
                <span className="text-zinc-500 font-mono">Target: {log.resourceId}</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-zinc-500 shrink-0">
                {log.ip && (
                  <span className="font-mono flex items-center gap-1">
                    <Globe className="h-3 w-3 text-zinc-600" />
                    {log.ip}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-zinc-600" />
                  {new Date(log.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
