"use client";

import React from "react";
import { Clock, Lock, ChevronDown, ChevronUp, SlidersHorizontal, ShieldAlert } from "lucide-react";

export interface RoutingState {
  expiresAt: string;
  maxClicks: string;
  expiredFallbackUrl: string;
  passwordProtected: boolean;
  password: string;
}

interface AdvancedRoutingOptionsProps {
  showRouting: boolean;
  setShowRouting: React.Dispatch<React.SetStateAction<boolean>>;
  routing: RoutingState;
  setRouting: React.Dispatch<React.SetStateAction<RoutingState>>;
}

export const AdvancedRoutingOptions: React.FC<AdvancedRoutingOptionsProps> = ({
  showRouting,
  setShowRouting,
  routing,
  setRouting,
}) => {
  const isRoutingActive =
    Boolean(routing.expiresAt) ||
    Boolean(routing.maxClicks) ||
    Boolean(routing.expiredFallbackUrl) ||
    routing.passwordProtected;

  return (
    <div className="border border-[#e7e5dc] rounded-2xl overflow-hidden bg-[#faf9f5]">
      <button
        type="button"
        onClick={() => setShowRouting(!showRouting)}
        className="w-full px-4 py-3 flex items-center justify-between text-left text-zinc-700 hover:text-black transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#2c35af]" />
          <span className="text-[13px] font-bold">
            Smart Routing & Automation
          </span>
          {isRoutingActive && (
            <span className="h-2 w-2 rounded-full bg-[#2c35af]" title="Routing rules configured" />
          )}
        </div>
        {showRouting ? (
          <ChevronUp className="h-4 w-4 text-zinc-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        )}
      </button>

      {showRouting && (
        <div className="p-4 pt-1 space-y-4 border-t border-[#e7e5dc] bg-white">
          {/* Expiration Date & Time */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-black text-[#121316] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#2c35af]" />
              Expire on Date & Time (Optional)
            </label>
            <input
              type="datetime-local"
              value={routing.expiresAt}
              onChange={(e) => setRouting((prev) => ({ ...prev, expiresAt: e.target.value }))}
              className="w-full bento-input px-3.5 py-2.5 text-[13px] text-[#121316] focus:outline-none"
            />
            <p className="text-[11px] text-zinc-400">
              Link will automatically expire and stop redirecting after this time.
            </p>
          </div>

          {/* Click Limit Cap */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-black text-[#121316] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
              Maximum Click Limit (Optional)
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={routing.maxClicks}
              onChange={(e) => setRouting((prev) => ({ ...prev, maxClicks: e.target.value }))}
              placeholder="e.g. 100 for first 100 people only"
              className="w-full bento-input px-3.5 py-2.5 text-[13px] text-[#121316] focus:outline-none font-mono"
            />
            <p className="text-[11px] text-zinc-400">
              Ideal for exclusive drops. Link expires automatically when click cap is reached.
            </p>
          </div>

          {/* Fallback Destination URL */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-black text-[#121316] uppercase tracking-wider block">
              Expired Fallback Destination (Optional)
            </label>
            <input
              type="url"
              value={routing.expiredFallbackUrl}
              onChange={(e) => setRouting((prev) => ({ ...prev, expiredFallbackUrl: e.target.value }))}
              placeholder="https://yourwebsite.com/deal-ended"
              className="w-full bento-input px-3.5 py-2.5 text-[13px] text-[#121316] focus:outline-none font-mono"
            />
            <p className="text-[11px] text-zinc-400">
              If expired, send users here instead of showing the default &quot;Expired&quot; card.
            </p>
          </div>

          {/* Password Protection */}
          <div className="pt-2 border-t border-zinc-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#2c35af]" />
                <span className="text-[12px] font-black text-[#121316] uppercase tracking-wider">
                  Password / PIN Protection
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={routing.passwordProtected}
                  onChange={(e) =>
                    setRouting((prev) => ({ ...prev, passwordProtected: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2c35af]"></div>
              </label>
            </div>

            {routing.passwordProtected && (
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={routing.password}
                  onChange={(e) => setRouting((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Set VIP passcode or PIN..."
                  maxLength={50}
                  className="w-full bento-input px-3.5 py-2.5 text-[13px] text-[#121316] focus:outline-none font-mono"
                />
                <p className="text-[11px] text-zinc-400">
                  Visitors must enter this passcode before the destination URL or app intent launches.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
