"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export const NavbarBrand: React.FC = memo(() => (
  <Link href="/" className="flex items-center gap-2.5">
    <div className="h-9 w-9 rounded-2xl bg-[#2c35af] flex items-center justify-center text-white shadow-sm shadow-indigo-900/20">
      <Zap className="h-5 w-5 fill-white text-white" />
    </div>
    <div className="font-extrabold text-[18px] text-[#121316] tracking-tight">
      Snap<span className="text-[#2c35af]">Link</span>
    </div>
  </Link>
));

NavbarBrand.displayName = "NavbarBrand";
