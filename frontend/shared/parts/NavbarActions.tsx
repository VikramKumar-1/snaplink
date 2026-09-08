"use client";

import React, { memo } from "react";
import { ArrowUpRight } from "lucide-react";

interface NavbarActionsProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const NavbarActions: React.FC<NavbarActionsProps> = memo(
  ({ isAuthenticated, isLoading, user, onOpenAuth, onLogout }) => (
    <div className="flex items-center gap-2.5">
      {!isLoading && !isAuthenticated && (
        <button
          onClick={onOpenAuth}
          className="hidden sm:flex px-4 py-2 rounded-xl bg-white border border-[#e7e5dc] hover:border-[#2c35af] text-[12.5px] font-bold text-[#121316] hover:text-[#2c35af] transition shadow-2xs"
        >
          Sign In
        </button>
      )}

      {isAuthenticated && user && (
        <button
          onClick={onLogout}
          className="hidden sm:flex px-4 py-2 rounded-xl bg-gray-100 hover:bg-red-50 text-[12.5px] font-bold text-gray-700 hover:text-red-600 transition"
        >
          Log Out
        </button>
      )}

      <a
        href="/#creator-card"
        className="pill-lime px-4 py-2 text-[12px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
      >
        <span>Create Link</span>
        <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
      </a>
    </div>
  )
);

NavbarActions.displayName = "NavbarActions";
