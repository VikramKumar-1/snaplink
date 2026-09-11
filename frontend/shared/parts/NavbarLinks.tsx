"use client";

import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ServicesMegaMenu } from "./ServicesMegaMenu";

export function NavbarLinks() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  }, []);

  const closeDropdown = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen((prev) => !prev);
  }, []);

  return (
    <nav className="hidden md:flex items-center gap-6 text-[13.5px] font-semibold text-zinc-600">
      <Link href="/" className="hover:text-black transition-colors">
        Home
      </Link>

      {/* Services Dropdown Trigger with Graceful Hover Bridge */}
      <div
        ref={dropdownRef}
        className="relative py-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={toggleDropdown}
          aria-expanded={dropdownOpen}
          className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Services</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              dropdownOpen ? "rotate-180 text-[#2c35af]" : ""
            }`}
          />
        </button>

        {dropdownOpen && <ServicesMegaMenu onClose={closeDropdown} />}
      </div>


      <Link href="/#comparison" className="hover:text-black transition-colors">
        Why It Works
      </Link>
      <Link href="/#platforms" className="hover:text-black transition-colors">
        Integrations
      </Link>
      <Link href="/#faqs" className="hover:text-black transition-colors">
        FAQs
      </Link>
    </nav>
  );
}
