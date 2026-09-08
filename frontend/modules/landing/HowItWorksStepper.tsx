"use client";

import React from "react";
import { stepperSteps } from "./parts/stepperData";
import { StepCard } from "./parts/StepCard";
import { StepperHeader } from "./parts/StepperHeader";

/** Enterprise-Grade How It Works Stepper (Zero Gradients, Pure Clay & Glass) */
export const HowItWorksStepper: React.FC = React.memo(() => (
  <section className="w-full max-w-6xl mx-auto px-4">
    <StepperHeader />

    {/* 📱 Mobile: Horizontal Snap Track | 🖥️ Desktop: 4-Column Grid */}
    <div className="flex sm:grid overflow-x-auto sm:overflow-visible scrollbar-none snap-x snap-mandatory sm:snap-none gap-4 sm:gap-6 pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-4">
      {stepperSteps.map((step, idx) => (
        <StepCard
          key={step.num}
          step={step}
          index={idx}
          isLast={idx === stepperSteps.length - 1}
        />
      ))}
    </div>
    <div className="sm:hidden text-center text-[10.5px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-2">
      ← Swipe steps 01 to 04 →
    </div>
  </section>
));

HowItWorksStepper.displayName = "HowItWorksStepper";
