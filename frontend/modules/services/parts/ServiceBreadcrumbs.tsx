"use client";

import React, { memo } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface ServiceBreadcrumbsProps {
  currentCategory?: string;
  currentName?: string;
}

export function ServiceBreadcrumbs({
  currentCategory,
  currentName,
}: ServiceBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1.5 text-[12px] font-bold text-zinc-500">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="hover:text-[#2c35af] transition-colors flex items-center gap-1 text-zinc-600 hover:underline"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>

        <li className="text-zinc-300">
          <ChevronRight className="h-3 w-3" />
        </li>

        <li className="flex items-center gap-1.5">
          <Link
            href="/services"
            className={`transition-colors hover:underline ${
              currentName ? "text-zinc-600 hover:text-[#2c35af]" : "text-[#2c35af]"
            }`}
            aria-current={!currentName ? "page" : undefined}
          >
            Services
          </Link>
        </li>

        {currentCategory && (
          <>
            <li className="text-zinc-300">
              <ChevronRight className="h-3 w-3" />
            </li>
            <li className="text-zinc-400 uppercase tracking-wider text-[11px]">
              {currentCategory}
            </li>
          </>
        )}

        {currentName && (
          <>
            <li className="text-zinc-300">
              <ChevronRight className="h-3 w-3" />
            </li>
            <li
              className="text-[#2c35af] truncate max-w-[220px] sm:max-w-none"
              aria-current="page"
            >
              {currentName}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
