"use client";

import React, { useState } from "react";
import { Globe, CheckCircle2, Clock, AlertCircle, RefreshCw, Trash2, ExternalLink, ShieldCheck, Copy, Check } from "lucide-react";

export interface CustomDomainItem {
  _id: string;
  domain: string;
  status: "pending" | "active" | "failed";
  targetCname: string;
  verificationToken?: string;
  defaultRedirectUrl?: string;
  sslStatus: "active" | "pending" | "failed";
  lastCheckedAt?: string;
  createdAt: string;
}

interface Props {
  domain: CustomDomainItem;
  onVerify: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const DomainCardItem: React.FC<Props> = ({ domain, onVerify, onDelete }) => {
  const [verifying, setVerifying] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleVerify = async () => {
    setVerifying(true);
    try {
      await onVerify(domain._id);
    } finally {
      setVerifying(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to disconnect ${domain.domain}?`)) return;
    setDeleting(true);
    try {
      await onDelete(domain._id);
    } finally {
      setDeleting(false);
    }
  };

  const isVerified = domain.status === "active";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm transition-all hover:border-zinc-700/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl border ${
            isVerified 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
          }`}>
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-white tracking-tight">{domain.domain}</span>
              <a
                href={`https://${domain.domain}`}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Preview domain"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              {isVerified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified & Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400 border border-amber-500/20">
                  <Clock className="h-3 w-3" />
                  DNS Pending
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-400 border border-violet-500/20">
                <ShieldCheck className="h-3 w-3" />
                SSL Auto-Provisioned
              </span>
            </div>
            {domain.defaultRedirectUrl && (
              <p className="mt-1 text-xs text-zinc-400">
                Fallback: <span className="text-zinc-300 font-mono">{domain.defaultRedirectUrl}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={handleVerify}
            disabled={verifying || isVerified}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-zinc-700 hover:border-zinc-600 disabled:opacity-50 transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${verifying ? "animate-spin text-violet-400" : ""}`} />
            <span>{verifying ? "Verifying..." : isVerified ? "Re-Check DNS" : "Verify DNS Now"}</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2 text-zinc-400 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
            title="Disconnect Domain"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* DNS Records Status */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-zinc-950/80 p-3 border border-zinc-800/80 text-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="font-semibold text-zinc-300">CNAME Record</span>
            <button
              onClick={() => copyToClipboard(domain.targetCname, "cname-" + domain._id)}
              className="flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-300"
            >
              {copiedKey === "cname-" + domain._id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copiedKey === "cname-" + domain._id ? "Copied" : "Copy Target"}</span>
            </button>
          </div>
          <div className="font-mono text-zinc-200 truncate">
            Points to: <span className="text-violet-400">{domain.targetCname}</span>
          </div>
        </div>

        {domain.verificationToken && (
          <div className="rounded-xl bg-zinc-950/80 p-3 border border-zinc-800/80 text-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="font-semibold text-zinc-300">TXT Verification</span>
              <button
                onClick={() => copyToClipboard(`snaplink-verification=${domain.verificationToken}`, "txt-" + domain._id)}
                className="flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-300"
              >
                {copiedKey === "txt-" + domain._id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedKey === "txt-" + domain._id ? "Copied" : "Copy Value"}</span>
              </button>
            </div>
            <div className="font-mono text-zinc-200 truncate">
              Value: <span className="text-zinc-400">snaplink-verification={domain.verificationToken}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
