import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/frontend/shared/Navbar";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";
import { ALL_SERVICES } from "@/frontend/modules/services/servicesData";
import { ServiceBreadcrumbs } from "@/frontend/modules/services/parts/ServiceBreadcrumbs";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const baseUrl = BRAND_CONFIG.baseUrl;

export const metadata: Metadata = {
  title: `Link Services & Creator Infrastructure Directory | ${BRAND_CONFIG.name}`,
  description:
    "Explore all 10 core link infrastructure services: 0ms mobile app openers, vector QR code generator, creator link-in-bio hubs, sub-10ms click analytics, dynamic smart routing, and developer APIs.",
  keywords: [
    "link infrastructure services",
    "free app opener service",
    "branded vector qr codes",
    "creator link in bio maker",
    "real time url click analytics",
    "smart geo routing links",
    "custom domain link shortener",
    "password protected url sharing",
    "cta link banner overlay",
    "link shortener rest api"
  ],
  alternates: {
    canonical: `${baseUrl}/services`,
  },
  openGraph: {
    title: `Link Services & Creator Infrastructure Directory | ${BRAND_CONFIG.name}`,
    description:
      "Explore 10 enterprise and creator link tools built for maximum speed and conversion.",
    url: `${baseUrl}/services`,
    siteName: BRAND_CONFIG.name,
    type: "website",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.name} Services Directory`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Link Services Directory | ${BRAND_CONFIG.name}`,
    description: "Explore 10 enterprise and creator link tools built for speed and conversion.",
    images: ["/og-preview.png"],
  },
};

export default function ServicesHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${BRAND_CONFIG.name} Services Directory`,
    url: `${baseUrl}/services`,
    description: "Directory of link optimization, deep linking, and creator tools.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: ALL_SERVICES.map((s, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: s.name,
        url: `${baseUrl}/services/${s.slug}`,
        description: s.shortDesc,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#121316] font-sans selection:bg-[#ccff00] selection:text-black">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="w-full max-w-6xl mx-auto px-4 py-10 sm:py-14">
        {/* Semantic Breadcrumbs */}
        <ServiceBreadcrumbs />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e7e5dc] text-[#2c35af] text-[11px] font-black uppercase tracking-wider mb-4 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#2c35af]" />
            <span>Full-Stack Link Infrastructure</span>
          </div>

          <h1 className="text-[32px] sm:text-[46px] font-black tracking-tight text-[#121316] uppercase leading-[1.1] mb-4">
            Services Built for <span className="text-[#2c35af]">Modern Growth</span>
          </h1>

          <p className="text-[14.5px] sm:text-[16px] text-zinc-600 font-medium leading-relaxed">
            From zero-latency app openers to branded vector QR codes and multi-tenant workspaces. Discover everything {BRAND_CONFIG.name} provides to accelerate your traffic.
          </p>
        </div>

        {/* 10 Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.slug}
                className="rounded-3xl bento-card-light bg-white border border-[#e7e5dc] p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#2c35af]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#f5f4ef] border border-[#e7e5dc] flex items-center justify-center text-[#2c35af] group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#2c35af]">
                      {s.badge}
                    </span>
                  </div>

                  <div className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    {s.category}
                  </div>
                  <h3 className="text-[18px] font-black text-[#121316] tracking-tight mb-2">
                    {s.name}
                  </h3>
                  <p className="text-[13px] text-zinc-600 leading-relaxed mb-4">
                    {s.shortDesc}
                  </p>

                  <div className="space-y-1.5 mb-5 pt-3 border-t border-zinc-100">
                    {s.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-[12px] text-zinc-700 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100/80 mt-auto">
                  <Link
                    href={`/services/${s.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#121316] hover:bg-[#2c35af] text-white text-[12px] font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm group-hover:shadow-md"
                  >
                    <span>View Service Details</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
