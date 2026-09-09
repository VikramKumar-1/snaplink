"use client";

import React, { useState } from "react";
import { X, Copy, Check, Globe, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDomainAdded: () => void;
}

export const ConnectDomainModal: React.FC<Props> = ({ isOpen, onClose, onDomainAdded }) => {
  const [domainInput, setDomainInput] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: domainInput.trim().toLowerCase(),
          defaultRedirectUrl: fallbackUrl.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add domain");
      }

      setDomainInput("");
      setFallbackUrl("");
      onDomainAdded();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Connect Custom Domain</h2>
              <p className="text-xs text-zinc-400">Brand all your smart links with your own custom URL</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Your Domain or Subdomain
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="links.yourbrand.com or go.domain.com"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
              />
            </div>
            <p className="mt-1 text-[11px] text-zinc-500">We recommend using a subdomain like <code className="text-zinc-400">links.</code> or <code className="text-zinc-400">go.</code></p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Default Fallback URL <span className="text-zinc-500 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://yourbrand.com"
              value={fallbackUrl}
              onChange={(e) => setFallbackUrl(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
            />
            <p className="mt-1 text-[11px] text-zinc-500">Where visitors go if they visit your root domain or an invalid slug.</p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3.5 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Required DNS CNAME Record</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-zinc-950 px-3 py-2 border border-zinc-800 text-xs">
              <div className="font-mono text-zinc-300">
                <span className="text-zinc-500 mr-2">Target:</span>cname.snaplink.to
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard("cname.snaplink.to", "cname")}
                className="flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-300 transition-colors ml-2"
              >
                {copiedKey === "cname" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === "cname" ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-xs font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !domainInput.trim()}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : (
                <>
                  <span>Add Domain</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
