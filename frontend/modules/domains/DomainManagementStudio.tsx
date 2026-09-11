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
    <div className="space-y-4">
      {/* Studio Header Banner */}
      <div className="p-5 rounded-[22px] bento-card-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#2c35af]/10 border border-[#2c35af]/20 text-[#2c35af] flex items-center justify-center shrink-0 shadow-xs">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[16px] font-black text-[#121316] uppercase tracking-tight flex items-center gap-2">
              Custom Branded Domains
            </h2>
            <p className="text-xs text-zinc-500 font-medium mt-0.5 max-w-xl leading-relaxed">
              Route your links through your own custom domain (e.g. <code className="px-1.5 py-0.5 rounded-md bg-[#f5f4ef] border border-[#e7e5dc] text-[#2c35af] font-mono text-[11px] font-bold">links.yourbrand.com</code>) with instant automated SSL.
            </p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-bento-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer shrink-0 self-start sm:self-auto transition-all active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>Connect Domain</span>
        </button>
      </div>

      {notification && (
        <div
          className={`flex items-center gap-2.5 rounded-2xl border p-4 text-xs font-bold animate-in fade-in ${
            notification.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : notification.type === "error"
              ? "border-rose-200 bg-rose-50 text-rose-800"
              : "border-amber-200 bg-amber-50 text-amber-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-zinc-400 font-mono text-xs bento-card-light rounded-[24px]">
          <RefreshCw className="h-6 w-6 animate-spin text-[#2c35af] mb-2" />
          <p>Loading domains...</p>
        </div>
      ) : domains.length === 0 ? (
        <div className="rounded-[28px] bento-card-light p-10 sm:p-14 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-[#f5f4ef] border border-[#e7e5dc] flex items-center justify-center text-[#2c35af] mb-3.5 shadow-inner">
            <Globe className="h-6 w-6" />
          </div>
          <h3 className="text-[17px] font-black text-[#121316] uppercase tracking-tight">No Custom Domains Connected</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Upgrade your audience trust with your own branded short URLs and automated zero-config SSL coverage.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-5 btn-bento-primary px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Connect First Domain</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
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
