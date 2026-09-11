"use client";

import React, { useState } from "react";
import { Lock, Copy, Check, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  workspaceId: string;
  initialSso?: {
    provider: "okta" | "azure_ad" | "google_workspace";
    domain: string;
    enabled: boolean;
  };
  onRefresh: () => void;
}

export const EnterpriseSsoSection: React.FC<Props> = ({ workspaceId, initialSso, onRefresh }) => {
  const [provider, setProvider] = useState(initialSso?.provider || "okta");
  const [domain, setDomain] = useState(initialSso?.domain || "");
  const [enabled, setEnabled] = useState(Boolean(initialSso?.enabled));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const acsUrl = "https://snaplink.to/api/auth/sso/callback";
  const entityId = "https://snaplink.to/sso/sp/metadata";

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/workspaces/sso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId,
          provider,
          domain: domain.trim().toLowerCase(),
          enabled,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Failed to update SSO configuration");

      setMessage({ type: "success", text: "SSO configuration saved successfully." });
      onRefresh();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save configuration." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bento-card-light p-5 rounded-2xl border border-[#e7e5dc] bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#2c35af]/10 flex items-center justify-center text-[#2c35af] shrink-0">
            <Lock className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#121316]">
              Enterprise Single Sign-On (SSO / SAML 2.0)
            </h3>
            <p className="text-xs text-[#525866] mt-0.5">
              Enforce corporate identity provider authentication for all workspace team members.
            </p>
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 font-medium ${
          message.type === "success" 
            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
            : "bg-rose-50 border-rose-200 text-rose-800"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> : <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Service Provider Metadata */}
      <div className="rounded-2xl border border-[#e7e5dc] bg-[#faf9f5] p-5 space-y-3.5 text-xs shadow-xs">
        <div className="font-bold text-[#121316] flex items-center gap-2 text-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>SnapLink SAML 2.0 Service Provider Endpoints</span>
        </div>
        <p className="text-[12px] text-[#525866]">
          Configure these SP endpoints in your identity provider (Okta, Azure AD, or Google Workspace).
        </p>

        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#e7e5dc] shadow-2xs">
            <span className="text-[#525866] font-mono text-xs">ACS URL: <span className="text-[#121316] font-semibold">{acsUrl}</span></span>
            <button 
              onClick={() => copyText(acsUrl, "acs")} 
              className="text-[#2c35af] hover:text-[#1e247a] text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2c35af]/5 hover:bg-[#2c35af]/10 transition"
            >
              {copiedKey === "acs" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedKey === "acs" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#e7e5dc] shadow-2xs">
            <span className="text-[#525866] font-mono text-xs">Entity ID: <span className="text-[#121316] font-semibold">{entityId}</span></span>
            <button 
              onClick={() => copyText(entityId, "entity")} 
              className="text-[#2c35af] hover:text-[#1e247a] text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2c35af]/5 hover:bg-[#2c35af]/10 transition"
            >
              {copiedKey === "entity" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedKey === "entity" ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 rounded-2xl border border-[#e7e5dc] bg-white/80 backdrop-blur-md p-5 shadow-sm">
        <div>
          <label className="block text-[11px] font-bold text-[#525866] uppercase tracking-wider mb-1.5">
            Identity Provider
          </label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as any)}
            className="w-full rounded-xl border border-[#e7e5dc] bg-[#faf9f5] px-3.5 py-2.5 text-sm text-[#121316] font-medium focus:outline-none focus:border-[#2c35af] focus:bg-white transition cursor-pointer"
          >
            <option value="okta">Okta SSO</option>
            <option value="azure_ad">Microsoft Entra ID (Azure AD)</option>
            <option value="google_workspace">Google Workspace SAML</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#525866] uppercase tracking-wider mb-1.5">
            Corporate Email Domain
          </label>
          <input
            type="text"
            required
            placeholder="acmecorp.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full rounded-xl border border-[#e7e5dc] bg-[#faf9f5] px-3.5 py-2.5 text-sm text-[#121316] placeholder-[#8c92a4] focus:outline-none focus:border-[#2c35af] focus:bg-white transition"
          />
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="rounded border-[#d1cfc7] text-[#2c35af] focus:ring-[#2c35af] h-4 w-4"
          />
          <span className="text-xs text-[#121316] font-medium">Enforce SAML SSO login for this domain</span>
        </label>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving || !domain.trim()}
            className="rounded-xl bg-[#2c35af] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#232a8f] disabled:opacity-50 transition cursor-pointer shadow-sm"
          >
            {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
};
