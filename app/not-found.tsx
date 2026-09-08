"use client";

import Link from "next/link";
import { Zap, ArrowLeft, Plus } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#121316] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-16 h-16 rounded-3xl bg-[#2c35af] flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-900/10 animate-bounce">
        <Zap className="w-8 h-8 fill-white text-white" />
      </div>

      <div className="inline-block pill-lime px-4 py-1 text-[11px] font-black uppercase tracking-widest mb-4">
        404 &middot; Link Not Found
      </div>

      <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase mb-3">
        Oops! This link is <span className="text-[#2c35af]">missing.</span>
      </h1>

      <p className="text-zinc-600 font-medium max-w-md mx-auto mb-8 text-[15px] leading-relaxed">
        The Smart Deep Link you are trying to visit might have been deleted, expired, or typed incorrectly.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="btn-bento-primary px-6 py-3.5 rounded-2xl flex items-center gap-2 text-[14px] font-bold shadow-md shadow-indigo-900/10"
        >
          <Plus className="w-4 h-4" />
          <span>Create Your Own Smart Link</span>
        </Link>
        <Link
          href="/"
          className="px-6 py-3.5 rounded-2xl bg-white border border-[#e7e5dc] hover:border-[#2c35af] text-[14px] font-bold text-zinc-700 transition"
        >
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="mt-16 text-[12px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
        SmartDeepLink Open Protocol
      </div>
    </div>
  );
}
