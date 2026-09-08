"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App boundary error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#121316] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight uppercase mb-3">
        Something went wrong!
      </h2>

      <p className="text-zinc-600 font-medium max-w-md mx-auto mb-8 text-[15px]">
        An unexpected error occurred. Please try again or return to the home screen.
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="btn-bento-primary px-6 py-3.5 rounded-2xl flex items-center gap-2 text-[14px] font-bold"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="px-6 py-3.5 rounded-2xl bg-white border border-[#e7e5dc] text-[14px] font-bold text-zinc-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
