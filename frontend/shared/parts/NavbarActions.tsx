"use client";

import React, { memo, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface NavbarActionsProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const NavbarActions: React.FC<NavbarActionsProps> = memo(
  ({ isAuthenticated, isLoading, user, onOpenAuth, onLogout }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    return (
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {mounted && !isLoading && !isAuthenticated && (
          <button
            type="button"
            onClick={onOpenAuth}
            aria-label="Sign In to Workspace"
            className="pill-lime px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11.5px] sm:text-[12.5px] font-bold flex items-center gap-1 sm:gap-1.5 shadow-sm hover:scale-102 transition cursor-pointer active:scale-98 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Sign In / Workspace</span>
            <span className="sm:hidden">Sign In</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5] shrink-0" />
          </button>
        )}

        {mounted && isAuthenticated && user && (
          <Link
            href="/dashboard"
            className="pill-lime px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11.5px] sm:text-[12.5px] font-bold flex items-center gap-1 sm:gap-1.5 shadow-sm hover:scale-102 transition whitespace-nowrap"
          >
            <span className="hidden sm:inline">My Workspace</span>
            <span className="sm:hidden">Workspace</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5] shrink-0" />
          </Link>
        )}

        {mounted && isAuthenticated && user && (
          <button
            onClick={onLogout}
            className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-red-50 text-[11px] sm:text-[12px] font-bold text-gray-700 hover:text-red-600 transition cursor-pointer whitespace-nowrap"
          >
            Log Out
          </button>
        )}
      </div>
    );
  }
);

NavbarActions.displayName = "NavbarActions";
