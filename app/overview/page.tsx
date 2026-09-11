import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/frontend/shared/Navbar";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";
import { ServiceBreadcrumbs } from "@/frontend/modules/services/parts/ServiceBreadcrumbs";
import { FeatureCard } from "./parts/FeatureCard";
import { OVERVIEW_FEATURES } from "./parts/overviewData";
import { CheckCircle2 } from "lucide-react";

const baseUrl = BRAND_CONFIG.baseUrl;

export const metadata: Metadata = {
  title: `Platform Architecture, Features & Services Map | ${BRAND_CONFIG.name}`,
  description:
    "Complete architectural overview of all 12 core modules built into SnapLink: deep link intent engine, vector QR studio, bio hubs, real-time analytics, smart routing, and developer APIs.",
  keywords: [
    "smart link platform architecture",
    "deep link features overview",
    "openinapp alternative architecture",
    "link shortener enterprise modules",
    "real-time link tracking system",
    "branded qr code generator studio",
    "custom domain link shortener",
    "url shortener rest api"
  ],
  alternates: {
    canonical: `${baseUrl}/overview`,
  },
  openGraph: {
    title: `Platform Map & Feature Directory | ${BRAND_CONFIG.name}`,
    description: "A complete architectural overview of all 12 modules, services, and developer endpoints.",
    url: `${baseUrl}/overview`,
    siteName: BRAND_CONFIG.name,
    type: "website",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.name} Overview & Architecture`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Platform Map & Feature Directory | ${BRAND_CONFIG.name}`,
    description: "Complete architectural overview of all 12 modules built into SnapLink.",
    images: ["/og-preview.png"],
  },
};

export default function OverviewPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${BRAND_CONFIG.name} Platform Architecture & Overview`,
    url: `${baseUrl}/overview`,
    description: "Complete overview of all 12 platform features, tools, and developer modules.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Platform Overview", item: `${baseUrl}/overview` },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: OVERVIEW_FEATURES.map((f, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: f.title,
        description: f.description,
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
        {/* Semantic Visual Breadcrumbs */}
        <ServiceBreadcrumbs currentName="Platform Overview" />

        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e7e5dc] text-[#2c35af] text-[11px] font-black uppercase tracking-wider mb-4 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#2c35af]" />
            <span>Complete Platform Feature Map</span>
          </div>

          <h1 className="text-[32px] sm:text-[46px] font-black tracking-tight text-[#121316] uppercase leading-[1.1] mb-4">
            Everything Built Inside <span className="text-[#2c35af]">{BRAND_CONFIG.name}</span>
          </h1>

          <p className="text-[14.5px] sm:text-[16px] text-zinc-600 font-medium leading-relaxed">
            All 12 core architectural modules built into your enterprise smart link platform. Here is exactly what each feature provides and how to access it.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-zinc-600 bg-white px-3 py-1.5 rounded-xl border border-[#e7e5dc]">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>12 Production Modules</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-zinc-600 bg-white px-3 py-1.5 rounded-xl border border-[#e7e5dc]">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>31 API Endpoints</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-zinc-600 bg-white px-3 py-1.5 rounded-xl border border-[#e7e5dc]">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Sub-15ms Redirection</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-zinc-600 bg-white px-3 py-1.5 rounded-xl border border-[#e7e5dc]">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Google & Bing Rich Schema</span>
            </div>
          </div>
        </div>

        {/* 12 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OVERVIEW_FEATURES.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </main>
    </div>
  );
}
