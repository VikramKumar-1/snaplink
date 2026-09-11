"use client";

import React, { useState, useEffect } from "react";
import { Key, Plus, Copy, Check, Trash2, Shield, AlertTriangle, RefreshCw, CheckCircle2 } from "lucide-react";

interface ApiKeyItem {
  _id: string;
  keyId: string;
  name: string;
  prefix: string;
  permissions: string[];
  rateLimitPerMinute: number;
  status: "active" | "revoked";
  lastUsedAt?: string;
  createdAt: string;
}

export const ApiKeyManager: React.FC = () => {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [creating, setCreating] = useState(false);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchKeys = async () => {
    try {
      const res = await fetch("/api/developers/keys");
      if (res.ok) {
        const data = await res.json();
        setKeys(data.keys || []);
      }
    } catch (err) {
      console.error("Failed to load API keys:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    setCreating(true);
    setError(null);

    try {
      const res = await fetch("/api/developers/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newKeyName.trim(),
          permissions: ["links:read", "links:write", "analytics:read"],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Failed to create key");

      setRevealedKey(data.plaintextKey);
      setNewKeyName("");
      fetchKeys();
    } catch (err: any) {
      setError(err.message || "Failed to generate API key");
    } finally {
      setCreating(false);
    }
  };

  const handleRevoke = async (keyId: string) => {
    if (!confirm("Are you sure you want to revoke this API key? Any applications using it will immediately stop working.")) return;
    try {
      const res = await fetch(`/api/developers/keys?keyId=${keyId}`, { method: "DELETE" });
      if (res.ok) {
        setKeys((prev) => prev.map((k) => (k.keyId === keyId ? { ...k, status: "revoked" } : k)));
      }
    } catch (err) {
      console.error("Failed to revoke key:", err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bento-card-light p-4 rounded-2xl">
        <div>
          <h3 className="text-sm font-bold text-[#121316] flex items-center gap-2">
            <Key className="h-4 w-4 text-[#2c35af]" />
            Secret API Keys
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">Use secret keys to authenticate automated requests to the SnapLink REST API.</p>
        </div>
        <button
          onClick={() => { setIsModalOpen(true); setRevealedKey(null); setError(null); }}
          className="btn-bento-primary flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm cursor-pointer self-start sm:self-auto shrink-0 transition-all active:scale-95"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Generate New Key</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center text-zinc-400 font-mono text-xs bento-card-light rounded-2xl">
          <RefreshCw className="h-5 w-5 animate-spin text-[#2c35af]" />
        </div>
      ) : keys.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bento-card-light">
          <Key className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
          <p className="text-xs text-zinc-500 font-medium">No API keys created yet. Generate your first key to start using the REST API.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {keys.map((k) => (
            <div key={k.keyId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[#e7e5dc] bg-white shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-[#121316]">{k.name}</span>
                  <span className="font-mono text-xs text-zinc-600 bg-[#f5f4ef] px-2 py-0.5 rounded border border-[#e7e5dc]">{k.prefix}</span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                    k.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-zinc-100 text-zinc-500 border-zinc-200"
                  }`}>
                    {k.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-zinc-500 flex-wrap font-medium">
                  <span>Created: {new Date(k.createdAt).toLocaleDateString()}</span>
                  <span>Last used: {k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleDateString() : "Never"}</span>
                  <span>Limit: {k.rateLimitPerMinute} req/min</span>
                </div>
              </div>
              {k.status === "active" && (
                <button
                  onClick={() => handleRevoke(k.keyId)}
                  className="self-end sm:self-center p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 border border-[#e7e5dc] transition cursor-pointer shadow-xs"
                  title="Revoke Key"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Key Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-[#e7e5dc] bg-white p-6 shadow-2xl space-y-4">
            {revealedKey ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-700 text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>API Key Generated Successfully</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Copy this key immediately. For security, it will never be displayed again.</span>
                </div>
                <div className="flex items-center justify-between bg-[#faf9f5] border border-[#e7e5dc] rounded-xl p-3 font-mono text-xs text-[#121316]">
                  <span className="truncate mr-2 font-bold">{revealedKey}</span>
                  <button
                    onClick={() => copyToClipboard(revealedKey)}
                    className="flex items-center gap-1 text-[#2c35af] hover:underline shrink-0 font-sans text-xs font-bold cursor-pointer"
                  >
                    {copiedKey ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedKey ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full btn-bento-primary py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="space-y-4">
                <h3 className="text-base font-black text-[#121316] uppercase tracking-tight">Generate Secret API Key</h3>
                {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}
                <div>
                  <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1.5">Key Name / Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Zapier Integration, Production Server"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full rounded-xl border border-[#e7e5dc] bg-[#faf9f5] px-3.5 py-2.5 text-xs font-bold text-[#121316] placeholder-zinc-400 focus:outline-none focus:border-[#2c35af] focus:bg-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl px-4 py-2 text-xs font-bold text-zinc-500 hover:text-[#121316] cursor-pointer">Cancel</button>
                  <button
                    type="submit"
                    disabled={creating || !newKeyName.trim()}
                    className="btn-bento-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                  >
                    {creating ? "Generating..." : "Generate Key"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
