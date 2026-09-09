"use client";

import React, { useState, useEffect } from "react";
import { Globe, Plus, RefreshCw, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { DomainCardItem, CustomDomainItem } from "./parts/DomainCardItem";
import { ConnectDomainModal } from "./parts/ConnectDomainModal";

export const DomainManagementStudio: React.FC = () => {
  const [domains, setDomains] = useState<CustomDomainItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  const fetchDomains = async () => {
    try {
      const res = await fetch("/api/domains");
      if (res.ok) {
        const data = await res.json();
        setDomains(data.domains || []);
      }
    } catch (err) {
      console.error("Failed to load domains:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  const handleVerify = async (domainId: string) => {
    setNotification(null);
    try {
      const res = await fetch("/api/domains/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setNotification({ type: "error", message: data.error || "Verification failed" });
      } else if (data.verified) {
        setNotification({ type: "success", message: "DNS verification succeeded! Your custom domain is now active." });
      } else {
        setNotification({
          type: "info",
          message: data.message || "DNS records not detected yet. DNS propagation can take up to 24 hours.",
        });
      }
      await fetchDomains();
    } catch {
      setNotification({ type: "error", message: "Failed to connect to verification server." });
    }
  };

  const handleDelete = async (domainId: string) => {
    try {
      const res = await fetch("/api/domains", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainId }),
      });
      if (res.ok) {
        setDomains((prev) => prev.filter((d) => d._id !== domainId));
        setNotification({ type: "success", message: "Custom domain disconnected successfully." });
      }
    } catch {
      setNotification({ type: "error", message: "Failed to disconnect domain." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Globe className="h-5 w-5 text-violet-400" />
            Custom Branded Domains
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Point your own CNAME record to route your branded links (e.g. <code className="text-zinc-300">links.yourbrand.com</code>) directly through SnapLink with instant SSL.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Connect Domain</span>
        </button>
      </div>

      {notification && (
        <div
          className={`flex items-center gap-2 rounded-xl border p-3.5 text-xs animate-in fade-in ${
            notification.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
              : notification.type === "error"
              ? "border-rose-500/20 bg-rose-500/10 text-rose-300"
              : "border-amber-500/20 bg-amber-500/10 text-amber-300"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
          <RefreshCw className="h-6 w-6 animate-spin text-violet-500 mb-2" />
          <p className="text-xs">Loading domains...</p>
        </div>
      ) : domains.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-zinc-400 mb-4">
            <Globe className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-white">No Custom Domains Connected</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Upgrade your audience experience with your own branded short URLs and full SSL coverage.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Connect First Domain</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {domains.map((d) => (
            <DomainCardItem
              key={d._id}
              domain={d}
              onVerify={handleVerify}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ConnectDomainModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDomainAdded={fetchDomains}
      />
    </div>
  );
};
