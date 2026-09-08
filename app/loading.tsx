import { Zap } from "lucide-react";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] flex flex-col items-center justify-center p-6">
      <div className="w-14 h-14 rounded-3xl bg-[#2c35af] flex items-center justify-center text-white shadow-xl shadow-indigo-900/10 animate-pulse">
        <Zap className="w-7 h-7 fill-white text-white" />
      </div>
      <div className="mt-4 text-[13px] font-mono font-bold uppercase tracking-widest text-zinc-500">
        Loading {BRAND_CONFIG.name}...
      </div>
    </div>
  );
}
