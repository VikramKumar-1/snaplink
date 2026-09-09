"use client";

import React from "react";
import { SlidersHorizontal, Lock } from "lucide-react";

interface EditRoutingSectionProps {
  expiresAt: string;
  setExpiresAt: (val: string) => void;
  maxClicks: string;
  setMaxClicks: (val: string) => void;
  fallbackUrl: string;
  setFallbackUrl: (val: string) => void;
  passwordProtected: boolean;
  setPasswordProtected: (val: boolean) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  isOriginallyProtected?: boolean;
}

export const EditRoutingSection: React.FC<EditRoutingSectionProps> = ({
  expiresAt,
  setExpiresAt,
  maxClicks,
  setMaxClicks,
  fallbackUrl,
  setFallbackUrl,
  passwordProtected,
  setPasswordProtected,
  newPassword,
  setNewPassword,
  isOriginallyProtected,
}) => {
  return (
    <div className="pt-3 border-t border-zinc-200">
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal className="h-4 w-4 text-[#2c35af]" />
        <span className="text-[12px] font-black text-[#121316] uppercase tracking-wider">
          Routing & Expiration Rules
        </span>
      </div>

      <div className="space-y-3 p-3.5 rounded-2xl bg-[#faf9f5] border border-[#e7e5dc]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-zinc-700 block mb-1">
              Expiration Date & Time
            </label>
            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full bento-input px-2.5 py-1.5 text-[12px] text-[#121316] focus:outline-none bg-white"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-zinc-700 block mb-1">
              Click Quota Limit
            </label>
            <input
              type="number"
              min="1"
              value={maxClicks}
              onChange={(e) => setMaxClicks(e.target.value)}
              placeholder="e.g. 100"
              className="w-full bento-input px-2.5 py-1.5 text-[12px] text-[#121316] focus:outline-none bg-white font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-zinc-700 block mb-1">
            Expired Fallback URL
          </label>
          <input
            type="url"
            value={fallbackUrl}
            onChange={(e) => setFallbackUrl(e.target.value)}
            placeholder="https://yourstore.com/deal-ended"
            className="w-full bento-input px-2.5 py-1.5 text-[12px] text-[#121316] focus:outline-none bg-white font-mono"
          />
        </div>

        <div className="pt-2 border-t border-zinc-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#2c35af]" />
              <span className="text-[11.5px] font-bold text-zinc-800">
                VIP Password Protection
              </span>
            </div>
            <input
              type="checkbox"
              checked={passwordProtected}
              onChange={(e) => setPasswordProtected(e.target.checked)}
              className="h-4 w-4 accent-[#2c35af]"
            />
          </div>

          {passwordProtected && (
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={isOriginallyProtected ? "Enter new password (or leave blank to keep)" : "Enter new passcode..."}
              className="w-full bento-input px-2.5 py-1.5 text-[12px] text-[#121316] focus:outline-none bg-white font-mono"
            />
          )}
        </div>
      </div>
    </div>
  );
};
