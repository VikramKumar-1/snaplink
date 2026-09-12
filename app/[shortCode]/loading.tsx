import React from "react";

export default function RedirectLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-white selection:bg-[#ccff00] selection:text-black">
      <div className="flex flex-col items-center text-center max-w-xs space-y-4 animate-fade-in">
        <div className="relative">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#2c35af] to-[#4338ca] flex items-center justify-center shadow-2xl shadow-[#2c35af]/40">
            <span className="h-4 w-4 rounded-full bg-[#ccff00] animate-ping" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-[17px] font-black tracking-tight text-white">
            Launching App...
          </h2>
          <p className="text-[12px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
            0-Sec Direct Intent &middot; SnapLink
          </p>
        </div>
      </div>
    </div>
  );
}
