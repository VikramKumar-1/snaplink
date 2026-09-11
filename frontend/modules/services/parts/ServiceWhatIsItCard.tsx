"use client";

import React from "react";
import { RealWorldExample } from "../types";
import { HelpCircle, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  serviceName: string;
  whatIsIt: string;
  realWorldExample: RealWorldExample;
  category: string;
}

export const ServiceWhatIsItCard: React.FC<Props> = ({
  serviceName,
  whatIsIt,
  realWorldExample,
  category,
}) => {
  return (
    <section
      aria-label={`What is ${serviceName}`}
      className="mb-8 p-6 sm:p-7 rounded-3xl bento-card-light bg-white border border-[#e7e5dc] shadow-sm"
    >
      {/* Title & Definition */}
      <div className="flex items-center gap-2 mb-2 text-[#2c35af]">
        <HelpCircle className="h-4 w-4 stroke-[2.5]" />
        <h2 className="text-[13px] font-black uppercase tracking-wider text-[#121316]">
          What is {serviceName}?
        </h2>
      </div>

      <p className="text-[14.5px] sm:text-[15.5px] text-zinc-700 font-medium leading-relaxed mb-6">
        {whatIsIt}
      </p>

      {/* Real-World Before vs After Card */}
      <div className="rounded-2xl bg-[#faf9f5] border border-[#e7e5dc] p-4 sm:p-5">
        <div className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-3">
          Real-World Scenario: {realWorldExample.scenario}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Before */}
          <div className="p-3.5 rounded-xl bg-white border border-red-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-red-600 text-[11px] font-extrabold uppercase mb-1.5">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Without SnapLink</span>
            </div>
            <p className="text-[12px] text-zinc-600 leading-relaxed font-medium">
              {realWorldExample.before}
            </p>
          </div>

          {/* After */}
          <div className="p-3.5 rounded-xl bg-white border border-emerald-300 shadow-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-extrabold uppercase mb-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>With SnapLink</span>
            </div>
            <p className="text-[12px] text-zinc-700 leading-relaxed font-medium">
              {realWorldExample.after}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
