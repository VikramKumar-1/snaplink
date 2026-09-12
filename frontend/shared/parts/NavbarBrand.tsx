"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export const NavbarBrand: React.FC = memo(() => (
  <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl sm:rounded-2xl bg-[#2c35af] flex items-center justify-center text-white shadow-sm shadow-indigo-900/20 shrink-0">
      <Zap className="h-4 w-4 sm:h-5 sm:w-5 fill-white text-white" />
    </div>
    <div className="font-extrabold text-[16px] sm:text-[18px] text-[#121316] tracking-tight whitespace-nowrap">
      Snap<span className="text-[#2c35af]">Link</span>
    </div>
  </Link>
));

NavbarBrand.displayName = "NavbarBrand";
