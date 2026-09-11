"use client";

import React, { memo } from "react";
import Link from "next/link";
import {
  Zap,
  QrCode,
  UserCheck,
  BarChart3,
  Compass,
  Globe2,
  Lock,
  Megaphone,
  Target,
  Code2,
  ArrowRight,
  ArrowUpRight,
  X,
} from "lucide-react";

interface NavbarMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onOpenAuth: () => void;
}

const MOBILE_SERVICES = [
  { slug: "app-openers", name: "App Openers", badge: "0ms", icon: Zap },
  { slug: "qr-codes", name: "QR Studio", badge: "Vector", icon: QrCode },
  { slug: "link-in-bio", name: "Link-in-Bio Hub", badge: "Bio", icon: UserCheck },
  { slug: "analytics", name: "Click Analytics", badge: "Live", icon: BarChart3 },
  { slug: "smart-routing", name: "Smart Routing", badge: "Rules", icon: Compass },
  { slug: "custom-domains", name: "Custom Domains", badge: "White-Label", icon: Globe2 },
  { slug: "link-security", name: "Link Security", badge: "Zero-Leak", icon: Lock },
  { slug: "cta-overlays", name: "CTA Overlays", badge: "Leads", icon: Megaphone },
  { slug: "utm-retargeting", name: "UTM Retargeting", badge: "Pixel", icon: Target },
  { slug: "developer-api", name: "Developer API", badge: "REST", icon: Code2 },
];

export function NavbarMobileDrawer({
  isOpen,
  onClose,
  isAuthenticated,
  onOpenAuth,
}: NavbarMobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-16 z-50 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in">
      <div className="bg-white border-b border-[#e7e5dc] shadow-2xl max-h-[calc(100vh-64px)] overflow-y-auto p-5 space-y-5">
        {/* Top Quick Links */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
            Services Directory
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-100 text-zinc-600 hover:text-black cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 10 Services 2-Column Grid */}
        <div className="grid grid-cols-2 gap-2">
          {MOBILE_SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                onClick={onClose}
                className="p-2.5 rounded-xl bg-[#f5f4ef]/80 hover:bg-zinc-100 border border-[#e7e5dc] flex items-center gap-2 transition"
              >
                <div className="w-6 h-6 rounded-lg bg-white border border-[#e7e5dc] flex items-center justify-center text-[#2c35af] shrink-0">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11.5px] font-bold text-[#121316] truncate">
                    {s.name}
                  </div>
                  <div className="text-[9px] font-black uppercase text-zinc-400">
                    {s.badge}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Directory Link */}
        <Link
          href="/services"
          onClick={onClose}
          className="w-full py-2.5 px-3 rounded-xl bg-[#121316] text-white text-[12px] font-bold flex items-center justify-between"
        >
          <span>View All 10 Services</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        {/* Nav Links */}
        <div className="space-y-1 pt-3 border-t border-zinc-100 text-[13px] font-bold text-zinc-700">
          {isAuthenticated && (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="block p-2 rounded-lg hover:bg-[#f5f4ef] text-[#2c35af]"
            >
              My Workspace
            </Link>
          )}
          <Link
            href="/overview"
            onClick={onClose}
            className="block p-2 rounded-lg hover:bg-[#f5f4ef]"
          >
            Platform Overview Map
          </Link>
          <Link
            href="/#comparison"
            onClick={onClose}
            className="block p-2 rounded-lg hover:bg-[#f5f4ef]"
          >
            Why It Works
          </Link>
          <Link
            href="/#faqs"
            onClick={onClose}
            className="block p-2 rounded-lg hover:bg-[#f5f4ef]"
          >
            FAQs
          </Link>
        </div>

        {/* Auth Button */}
        {!isAuthenticated && (
          <div className="pt-2 border-t border-zinc-100">
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full py-3 rounded-xl pill-lime text-[13px] font-black uppercase tracking-wider text-black text-center flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <span>Sign In / Workspace</span>
              <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
