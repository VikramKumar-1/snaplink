"use client";

import React, { memo } from "react";

export const NavbarLinks: React.FC = memo(() => (
  <nav className="hidden md:flex items-center gap-7 text-[12.5px] font-bold tracking-wide uppercase text-zinc-600">
    <a href="/" className="hover:text-black transition-colors">Home</a>
    <a href="/dashboard" className="text-[#2c35af] hover:text-black font-extrabold transition-colors flex items-center gap-1">
      <span>Dashboard</span>
      <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00]" />
    </a>
    <a href="/#comparison" className="hover:text-black transition-colors">Why It Works</a>
    <a href="/#platforms" className="hover:text-black transition-colors">Integrations</a>
    <a href="/#faqs" className="hover:text-black transition-colors">FAQs</a>
  </nav>
));

NavbarLinks.displayName = "NavbarLinks";
