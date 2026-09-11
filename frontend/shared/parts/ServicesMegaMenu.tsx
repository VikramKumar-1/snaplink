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
} from "lucide-react";

interface ServicesMegaMenuProps {
  onClose: () => void;
}

interface ServiceItem {
  slug: string;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES_LIST: ServiceItem[] = [
  { slug: "app-openers", name: "App Openers", desc: "0ms direct mobile app launch", icon: Zap },
  { slug: "smart-routing", name: "Smart Routing", desc: "Device & country redirects", icon: Compass },
  { slug: "cta-overlays", name: "CTA Overlays", desc: "Banner overlays on external links", icon: Megaphone },
  { slug: "qr-codes", name: "QR Studio", desc: "Custom vector & print QR codes", icon: QrCode },
  { slug: "link-in-bio", name: "Link-in-Bio", desc: "Mobile creator profile page", icon: UserCheck },
  { slug: "custom-domains", name: "Custom Domains", desc: "Connect your branded domain", icon: Globe2 },
  { slug: "analytics", name: "Click Analytics", desc: "Real-time geo & device insights", icon: BarChart3 },
  { slug: "link-security", name: "Link Security", desc: "PIN protection & click limits", icon: Lock },
  { slug: "utm-retargeting", name: "UTM Retargeting", desc: "Meta & Google pixel tracking", icon: Target },
  { slug: "developer-api", name: "Developer API", desc: "REST v1 API & webhook triggers", icon: Code2 },
];

export const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = memo(({ onClose }) => (
  <div className="absolute top-full -left-28 sm:-left-44 md:-left-56 lg:-left-64 pt-2.5 z-50">
    <div className="w-[780px] max-w-[calc(100vw-32px)] bg-white border border-[#e7e5dc] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-4 text-left">
      {/* Horizontal 3-Column Services Shelf */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {SERVICES_LIST.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              onClick={onClose}
              className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#f5f4ef] border border-transparent hover:border-[#e7e5dc] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f5f4ef] border border-[#e7e5dc] flex items-center justify-center text-zinc-700 group-hover:bg-[#121316] group-hover:text-white transition-colors shrink-0 mt-0.5">
                <Icon className="h-4 w-4 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-[#121316] group-hover:text-[#2c35af] transition-colors leading-tight">
                  {item.name}
                </div>
                <p className="text-[11.5px] text-zinc-500 mt-1 leading-snug font-normal">
                  {item.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Clean Minimal Bottom Bar */}
      <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between px-2 text-[12px]">
        <span className="font-semibold text-zinc-400 text-[11px]">
          10 Native Tools &middot; 100% Free
        </span>
        <Link
          href="/services"
          onClick={onClose}
          className="font-bold text-[#2c35af] hover:text-black flex items-center gap-1 transition-colors text-[12px]"
        >
          <span>Explore All 10 Services</span>
          <ArrowRight className="h-3.5 w-3.5 stroke-[2.2]" />
        </Link>
      </div>
    </div>
  </div>
));

ServicesMegaMenu.displayName = "ServicesMegaMenu";
