import { Metadata } from "next";
import { Navbar } from "@/frontend/shared/Navbar";
import { CreatorDashboard } from "@/frontend/modules/dashboard/CreatorDashboard";

export const metadata: Metadata = {
  title: "Creator Dashboard | SmartDeepLink",
  description: "Manage your active smart deep links, edit dynamic destinations in real time, and monitor conversion analytics.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#121316] font-sans relative selection:bg-[#ccff00] selection:text-black">
      <Navbar />
      <main className="w-full relative z-10">
        <CreatorDashboard />
      </main>

      <footer className="w-full border-t border-[#e7e5dc] py-8 text-center bg-[#f0eee6] mt-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] font-medium text-zinc-600">
          <div className="font-mono font-bold text-black">
            smartlink.to &middot; Creator Studio Infrastructure
          </div>
          <div className="flex items-center gap-3">
            <span>Zero Ads</span>
            <span>&middot;</span>
            <span>Dynamic URL Routing</span>
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
