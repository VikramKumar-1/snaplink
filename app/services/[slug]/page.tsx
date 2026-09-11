import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/frontend/shared/Navbar";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";
import { ALL_SERVICES, getServiceBySlug } from "@/frontend/modules/services/servicesData";
import { ServiceVisualMockup } from "@/frontend/modules/services/parts/ServiceVisualMockup";
import { ServiceBreadcrumbs } from "@/frontend/modules/services/parts/ServiceBreadcrumbs";
import { ServiceFaqSection } from "@/frontend/modules/services/parts/ServiceFaqSection";
import { ServiceJsonLd } from "@/frontend/modules/services/parts/ServiceJsonLd";
import { ServiceWhatIsItCard } from "@/frontend/modules/services/parts/ServiceWhatIsItCard";
import { ServiceStepsSection } from "@/frontend/modules/services/parts/ServiceStepsSection";
import { CheckCircle2, ShieldCheck, Eye } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: `Service Not Found | ${BRAND_CONFIG.name}` };

  const canonicalUrl = `${BRAND_CONFIG.baseUrl}/services/${service.slug}`;

  return {
    title: `${service.seoTitle} | ${BRAND_CONFIG.name}`,
    description: service.seoDescription,
    keywords: service.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.name} — ${BRAND_CONFIG.name}`,
      description: service.seoDescription,
      url: canonicalUrl,
      siteName: BRAND_CONFIG.name,
      type: "website",
      images: [
        {
          url: "/og-preview.png",
          width: 1200,
          height: 630,
          alt: `${service.name} - ${BRAND_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | ${BRAND_CONFIG.name}`,
      description: service.seoDescription,
      images: ["/og-preview.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#121316] font-sans selection:bg-[#ccff00] selection:text-black">
      <Navbar />
      <ServiceJsonLd service={service} />

      <main className="w-full max-w-5xl mx-auto px-4 py-10 sm:py-14">
        {/* Semantic Breadcrumbs with Microdata */}
        <ServiceBreadcrumbs
          currentCategory={service.category}
          currentName={service.name}
        />

        {/* Hero Title Strip */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e7e5dc] text-[#2c35af] text-[11px] font-black uppercase tracking-wider mb-3 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#2c35af]" />
            <span>{service.badge}</span>
          </div>

          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2c35af] flex items-center justify-center text-white shrink-0 shadow-md">
              <Icon className="h-6 w-6 stroke-[2.2]" />
            </div>
            <h1 className="text-[26px] sm:text-[36px] font-black tracking-tight text-[#121316] uppercase leading-tight">
              {service.name}
            </h1>
          </div>

          <p className="text-[14.5px] sm:text-[16px] text-zinc-600 font-medium leading-relaxed max-w-3xl">
            {service.longDesc}
          </p>
        </header>

        {/* 1. Kya Hai Ye Service (Plain Words & Real-World Scenario) */}
        <ServiceWhatIsItCard
          serviceName={service.name}
          whatIsIt={service.whatIsIt}
          realWorldExample={service.realWorldExample}
          category={service.category}
        />

        {/* 2. Visual Mockup (Kaise Dikhega) & Key Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left Column (5 Cols on Large screens, full width for flow mockup) */}
          <div className={`${service.mockupType === "app-intent" ? "lg:col-span-12" : "lg:col-span-5"} space-y-6`}>
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#2c35af]">
                <Eye className="h-4 w-4 stroke-[2.2]" />
                <h3 className="text-[12px] font-black uppercase tracking-wider text-[#121316]">
                  Live Preview: How It Looks & Works
                </h3>
              </div>
              <ServiceVisualMockup
                type={service.mockupType}
                name={service.name}
                accentColor={service.accentColor}
              />
            </div>

            {/* Why it Matters Card */}
            <div className="p-5 rounded-3xl bento-card-light bg-white border border-[#e7e5dc]">
              <div className="flex items-center gap-2 mb-1.5 text-[#2c35af]">
                <ShieldCheck className="h-4 w-4 stroke-[2.2]" />
                <h4 className="text-[12px] font-black uppercase tracking-wider text-[#121316]">
                  Why Creators & Brands Need This
                </h4>
              </div>
              <p className="text-[12.5px] text-zinc-600 leading-relaxed font-medium">
                {service.whyItMatters}
              </p>
            </div>
          </div>

          {/* Right Column: Key Capabilities Checklist (for non-fullwidth mockups) */}
          {service.mockupType !== "app-intent" && (
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-7 rounded-3xl bento-card-light bg-white border border-[#e7e5dc] h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-[14px] font-black text-[#121316] uppercase tracking-tight mb-4 flex items-center gap-2">
                    <span>Key Capabilities & Architecture</span>
                  </h3>

                  <div className="space-y-3.5 mb-6">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 text-[13px] text-zinc-700 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e7e5dc] text-[11.5px] text-zinc-600 font-medium">
                  <span className="font-bold text-[#2c35af]">Enterprise Reliability:</span> All links run on edge infrastructure with sub-10ms global routing and 99.99% SLA uptime.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Kaise Karna Hai (Simple 3-Step Guide + CTA) */}
        <ServiceStepsSection
          serviceName={service.name}
          steps={service.howToUseSteps}
          actionLabel={service.actionLabel}
          actionUrl={service.actionUrl}
        />

        {/* 4. High-Intent Search FAQs (Matches Google/Bing SERP FAQ Schema) */}
        <ServiceFaqSection faqs={service.faqs} serviceName={service.name} />
      </main>
    </div>
  );
}
