"use client";

import React, { useState } from "react";
import { Lock, KeyRound, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

interface LinkPasswordModalProps {
  shortCode: string;
  title?: string;
  customTitle?: string;
  platform?: string;
}

export const LinkPasswordModal: React.FC<LinkPasswordModalProps> = ({
  shortCode,
  title,
  customTitle,
  platform = "other",
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  const displayTitle = customTitle || title || "VIP Protected Link";

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the password or access PIN.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/links/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortCode, password: password.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Incorrect password. Please try again.");
      }

      setUnlocked(true);

      // Trigger redirect or native app launch
      const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);
      if (isMobile && data.deepLinkInfo?.intentUrl) {
        window.location.href = data.deepLinkInfo.intentUrl;
        setTimeout(() => {
          window.location.href = data.originalUrl;
        }, 1200);
      } else {
        window.location.href = data.originalUrl;
      }
    } catch (err: any) {
      setError(err.message || "Failed to unlock link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-[28px] bento-card-light bg-white border border-[#e7e5dc] shadow-2xl animate-fade-in text-center">
      {/* Icon Badge */}
      <div className="h-16 w-16 rounded-2xl bg-[#f5f4ef] border border-[#e7e5dc] flex items-center justify-center mx-auto mb-5 text-[#2c35af] shadow-xs">
        {unlocked ? (
          <ShieldCheck className="h-8 w-8 text-emerald-600 animate-pulse" />
        ) : (
          <Lock className="h-8 w-8 stroke-[2.5]" />
        )}
      </div>

      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#2c35af] text-[11px] font-black uppercase tracking-wider mb-2">
        <span className="h-2 w-2 rounded-full bg-[#2c35af]" />
        <span>Password Protected</span>
      </div>

      <h2 className="text-[20px] sm:text-[22px] font-black text-[#121316] tracking-tight uppercase leading-snug">
        {displayTitle}
      </h2>

      <p className="text-[13px] text-zinc-500 mt-2 mb-6 font-medium">
        This creator link is protected. Enter the VIP password or passkey to unlock and launch the destination.
      </p>

      {unlocked ? (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[14px] font-bold flex items-center justify-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <span>Access Granted! Opening destination...</span>
        </div>
      ) : (
        <form onSubmit={handleUnlock} className="space-y-4 text-left">
          <div className="relative">
            <div className="flex items-center bento-input px-3.5 py-3 bg-[#faf9f5]">
              <KeyRound className="h-4 w-4 text-zinc-400 mr-2 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access password..."
                className="w-full bg-transparent text-[14px] text-[#121316] placeholder-zinc-400 focus:outline-none font-mono"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-400 hover:text-black transition p-1 cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[12.5px] font-bold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 btn-bento-primary text-[14px] font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? (
              <span>Verifying Passkey...</span>
            ) : (
              <>
                <span>Unlock Destination</span>
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-[11px] font-bold text-zinc-400 font-mono">
        <span>Protected by {BRAND_CONFIG.name} Intent Engine</span>
      </div>
    </div>
  );
};
