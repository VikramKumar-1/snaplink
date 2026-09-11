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
    <div className="rounded-[22px] bento-card-light p-5 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7e5dc] pb-4">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl border ${
            isVerified 
              ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
              : "bg-amber-50 border-amber-200 text-amber-600"
          }`}>
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-[#121316] tracking-tight">{domain.domain}</span>
              <a
                href={`https://${domain.domain}`}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-[#2c35af] transition-colors"
                title="Preview domain"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              {isVerified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Verified & Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-200">
                  <Clock className="h-3 w-3 text-amber-600" />
                  DNS Pending
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#2c35af] border border-blue-200">
                <ShieldCheck className="h-3 w-3" />
                SSL Auto-Provisioned
              </span>
            </div>
            {domain.defaultRedirectUrl && (
              <p className="mt-1 text-xs text-zinc-500 font-medium">
                Fallback: <span className="text-[#121316] font-mono font-semibold">{domain.defaultRedirectUrl}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={handleVerify}
            disabled={verifying || isVerified}
            className="flex items-center gap-1.5 rounded-xl border border-[#e7e5dc] bg-white px-3.5 py-2 text-xs font-bold text-[#121316] hover:bg-[#faf9f5] hover:border-[#2c35af] disabled:opacity-50 transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${verifying ? "animate-spin text-[#2c35af]" : ""}`} />
            <span>{verifying ? "Verifying..." : isVerified ? "Re-Check DNS" : "Verify DNS Now"}</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-xl border border-[#e7e5dc] bg-white p-2 text-zinc-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-xs cursor-pointer"
            title="Disconnect Domain"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* DNS Records Status */}
      <div className="mt-3.5 grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div className="rounded-xl bg-[#faf9f5] p-3 border border-[#e7e5dc] text-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-1">
            <span className="font-bold text-[#121316]">CNAME Record</span>
            <button
              onClick={() => copyToClipboard(domain.targetCname, "cname-" + domain._id)}
              className="flex items-center gap-1 text-[11px] font-bold text-[#2c35af] hover:underline"
            >
              {copiedKey === "cname-" + domain._id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              <span>{copiedKey === "cname-" + domain._id ? "Copied" : "Copy Target"}</span>
            </button>
          </div>
          <div className="font-mono text-zinc-700 truncate font-medium">
            Points to: <span className="text-[#2c35af] font-bold">{domain.targetCname}</span>
          </div>
        </div>

        {domain.verificationToken && (
          <div className="rounded-xl bg-[#faf9f5] p-3 border border-[#e7e5dc] text-xs">
            <div className="flex items-center justify-between text-zinc-500 mb-1">
              <span className="font-bold text-[#121316]">TXT Verification</span>
              <button
                onClick={() => copyToClipboard(`snaplink-verification=${domain.verificationToken}`, "txt-" + domain._id)}
                className="flex items-center gap-1 text-[11px] font-bold text-[#2c35af] hover:underline"
              >
                {copiedKey === "txt-" + domain._id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copiedKey === "txt-" + domain._id ? "Copied" : "Copy Value"}</span>
              </button>
            </div>
            <div className="font-mono text-zinc-700 truncate font-medium">
              Value: <span className="text-zinc-600">snaplink-verification={domain.verificationToken}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
