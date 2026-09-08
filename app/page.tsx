import { Navbar } from "@/frontend/shared/Navbar";
import { HeroSplitSection } from "@/frontend/modules/link-creator/HeroSplitSection";
import { FloatingGalleryParallax } from "@/frontend/modules/landing/FloatingGalleryParallax";
import { ComparisonWidget } from "@/frontend/modules/link-creator/parts/ComparisonWidget";
import { SupportedPlatforms } from "@/frontend/modules/landing/SupportedPlatforms";
import { SocialPreviewDemo } from "@/frontend/modules/landing/SocialPreviewDemo";
import { ComparisonTable } from "@/frontend/modules/landing/ComparisonTable";
import { FaqSection } from "@/frontend/modules/landing/FaqSection";
import { RecentLinks } from "@/frontend/modules/recent-links/RecentLinks";
import { QRCodeModal } from "@/frontend/modules/qr-code/QRCodeModal";
import { AnalyticsModal } from "@/frontend/modules/analytics/AnalyticsModal";
import AllFeaturesGrid from "@/frontend/modules/landing/AllFeaturesGrid";
import { HowItWorksStepper } from "@/frontend/modules/landing/HowItWorksStepper";

import { ServiceMarquee } from "@/frontend/modules/landing/ServiceMarquee";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#121316] font-sans relative selection:bg-[#ccff00] selection:text-black overflow-x-hidden">
      {/* Top Sticky Navbar with Dribbble Styling */}
      <Navbar />

      <main className="w-full flex flex-col items-center relative z-10 overflow-x-hidden">
        {/* 1. HERO SECTION: Split Layout (Headline left, Creator Box right) */}
        <HeroSplitSection />

        {/* 2. RECENT ACTIVE USER LINKS: Directly below Hero Section */}
        <div className="w-full max-w-6xl mx-auto px-4 mt-2 sm:mt-4">
          <RecentLinks />
        </div>

        {/* 2.5 Infinite Service Marquee */}
        <div className="w-full max-w-6xl mx-auto px-4">
          <ServiceMarquee />
        </div>

        {/* 3. REVERSE PARALLAX FLOATING GALLERY */}
        <FloatingGalleryParallax />

        {/* 4. The Before vs After In-App Browser Conversion Comparison */}
        <div id="comparison" className="w-full mt-12 sm:mt-16">
          <ComparisonWidget />
        </div>

        {/* 5. Supported Platforms with Real Brand Vectors */}
        <div id="platforms" className="w-full mt-12 sm:mt-16">
          <SupportedPlatforms />
        </div>

        {/* 5.5 Playful Numbered Process Stepper (How It Works) */}
        <div className="w-full mt-12 sm:mt-16">
          <HowItWorksStepper />
        </div>

        {/* 6. Custom WhatsApp & Twitter Preview Demo */}
        <div className="w-full mt-12 sm:mt-16">
          <SocialPreviewDemo />
        </div>

        {/* 7. Honest Comparison Table vs Bitly & OpeninApp */}
        <div className="w-full mt-12 sm:mt-16">
          <ComparisonTable />
        </div>

        {/* 8. All Features / Services Grid */}
        <div className="w-full mt-12 sm:mt-16">
          <AllFeaturesGrid />
        </div>

        {/* 9. Frequently Asked Questions Accordion */}
        <div id="faqs" className="w-full mt-12 sm:mt-16">
          <FaqSection />
        </div>

        {/* 11. Playful Bottom Quote */}
        <div className="w-full max-w-4xl mx-auto my-8 sm:my-10 px-4 text-center">
          <div className="flex items-center justify-center gap-3 select-none text-[#2c35af] text-[28px] font-black mb-3">
            <span>✱</span>
            <span className="text-[#2c35af] text-[20px]">•</span>
            <span>✱</span>
          </div>
          <p className="font-display text-[20px] sm:text-[28px] md:text-[34px] font-extrabold tracking-tight uppercase leading-snug">
            KEEP <span className="underline decoration-[#ccff00] decoration-wavy decoration-4">CREATING</span> UNTIL YOU FIND YOUR OWN <span className="text-[#2c35af]">AUDIENCE.</span>
          </p>
          <div className="text-[12px] sm:text-[13px] font-mono text-zinc-500 font-bold uppercase mt-3 tracking-widest">
            SnapLink Open Protocol &middot; Built For Modern Creators
          </div>
        </div>
      </main>

      {/* Global Modals */}
      <QRCodeModal />
      <AnalyticsModal />

      {/* Footer */}
      <footer className="w-full border-t border-[#e7e5dc] py-8 text-center bg-[#f0eee6]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] font-medium text-zinc-600">
          <div className="font-mono font-bold text-black">
            snaplink.to &middot; The Open Deep Link Infrastructure
          </div>
          <div className="flex items-center gap-3">
            <span>Zero Ads</span>
            <span>&middot;</span>
            <span>Zero Tracking</span>
            <span>&middot;</span>
            <span className="text-black font-extrabold pill-lime px-3 py-0.5 text-[11px] uppercase tracking-wider">
              100% Free Forever
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
