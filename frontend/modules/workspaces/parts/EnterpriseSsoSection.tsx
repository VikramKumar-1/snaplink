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
      <div className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Lock className="h-4 w-4 text-violet-400" />
          Enterprise Single Sign-On (SSO / SAML 2.0)
        </h3>
        <p className="text-xs text-zinc-400 mt-0.5">Enforce company identity provider login for all team members.</p>
      </div>

      {message && (
        <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
          message.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-rose-500/10 border-rose-500/20 text-rose-300"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertCircle className="h-4 w-4 text-rose-400" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Service Provider Metadata */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-3 text-xs">
        <div className="font-semibold text-zinc-300 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>SnapLink SAML 2.0 Service Provider Endpoints</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
            <span className="text-zinc-500 font-mono">ACS URL: <span className="text-zinc-200">{acsUrl}</span></span>
            <button onClick={() => copyText(acsUrl, "acs")} className="text-violet-400 hover:text-violet-300 text-[11px] flex items-center gap-1">
              {copiedKey === "acs" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copiedKey === "acs" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="flex items-center justify-between bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
            <span className="text-zinc-500 font-mono">Entity ID: <span className="text-zinc-200">{entityId}</span></span>
            <button onClick={() => copyText(entityId, "entity")} className="text-violet-400 hover:text-violet-300 text-[11px] flex items-center gap-1">
              {copiedKey === "entity" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copiedKey === "entity" ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Identity Provider</label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as any)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="okta">Okta SSO</option>
            <option value="azure_ad">Microsoft Entra ID (Azure AD)</option>
            <option value="google_workspace">Google Workspace SAML</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Corporate Email Domain</label>
          <input
            type="text"
            required
            placeholder="acmecorp.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="rounded border-zinc-800 text-violet-600 focus:ring-violet-500"
          />
          <span className="text-xs text-zinc-300 font-medium">Enforce SAML SSO login for this domain</span>
        </label>

        <button
          type="submit"
          disabled={saving || !domain.trim()}
          className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 disabled:opacity-50 transition cursor-pointer"
        >
          {saving ? "Saving..." : "Save Configuration"}
        </button>
      </form>
    </div>
  );
};
