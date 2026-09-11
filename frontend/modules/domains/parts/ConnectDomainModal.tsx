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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-[28px] border border-[#e7e5dc] bg-white p-6 sm:p-7 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#e7e5dc] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2c35af]/10 border border-[#2c35af]/20 text-[#2c35af] flex items-center justify-center shrink-0">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#121316] uppercase tracking-tight">Connect Custom Domain</h2>
              <p className="text-xs text-zinc-500 font-medium">Brand your short links with your own personal URL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-zinc-400 hover:bg-[#f5f4ef] hover:text-[#121316] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-black text-[#121316] uppercase tracking-wider mb-1.5">
              Your Domain or Subdomain
            </label>
            <input
              type="text"
              required
              placeholder="links.yourbrand.com or go.domain.com"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              className="w-full rounded-xl border border-[#e7e5dc] bg-[#faf9f5] px-3.5 py-2.5 text-xs font-bold text-[#121316] placeholder-zinc-400 focus:border-[#2c35af] focus:bg-white focus:outline-none transition-colors"
            />
            <p className="mt-1 text-[11px] text-zinc-500 font-mono">
              Tip: We recommend using a subdomain like <code className="text-[#2c35af] font-bold">links.</code> or <code className="text-[#2c35af] font-bold">go.</code>
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-black text-[#121316] uppercase tracking-wider mb-1.5">
              Default Fallback URL <span className="text-zinc-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://yourbrand.com"
              value={fallbackUrl}
              onChange={(e) => setFallbackUrl(e.target.value)}
              className="w-full rounded-xl border border-[#e7e5dc] bg-[#faf9f5] px-3.5 py-2.5 text-xs font-bold text-[#121316] placeholder-zinc-400 focus:border-[#2c35af] focus:bg-white focus:outline-none transition-colors"
            />
            <p className="mt-1 text-[11px] text-zinc-500">
              Where visitors are redirected if they hit your root domain or an invalid link slug.
            </p>
          </div>

          <div className="rounded-xl border border-[#e7e5dc] bg-[#faf9f5] p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#121316]">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Required DNS CNAME Record</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-[#e7e5dc] text-xs">
              <div className="font-mono text-zinc-700">
                <span className="text-zinc-400 mr-2">Target:</span>
                <span className="text-[#2c35af] font-bold">cname.snaplink.to</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard("cname.snaplink.to", "cname")}
                className="flex items-center gap-1 text-[11px] font-bold text-[#2c35af] hover:underline ml-2 cursor-pointer"
              >
                {copiedKey === "cname" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === "cname" ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-500 hover:text-[#121316] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !domainInput.trim()}
              className="btn-bento-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md disabled:opacity-50 cursor-pointer transition-all active:scale-95"
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
