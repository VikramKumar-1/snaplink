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
      <div className="flex items-center gap-2.5">
        {mounted && !isLoading && !isAuthenticated && (
          <button
            onClick={onOpenAuth}
            className="pill-lime px-4 py-2 text-[12.5px] font-bold flex items-center gap-1.5 shadow-sm hover:scale-102 transition cursor-pointer"
          >
            <span>Sign In / Workspace</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        )}

        {mounted && isAuthenticated && user && (
          <Link
            href="/dashboard"
            className="pill-lime px-4 py-2 text-[12.5px] font-bold flex items-center gap-1.5 shadow-sm hover:scale-102 transition"
          >
            <span>My Workspace</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </Link>
        )}

        {mounted && isAuthenticated && user && (
          <button
            onClick={onLogout}
            className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-red-50 text-[12px] font-bold text-gray-700 hover:text-red-600 transition cursor-pointer"
          >
            Log Out
          </button>
        )}
      </div>
    );
  }
);

NavbarActions.displayName = "NavbarActions";
