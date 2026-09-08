"use client";

import React from "react";
import { stepperSteps } from "./parts/stepperData";
import { StepCard } from "./parts/StepCard";
import { StepperHeader } from "./parts/StepperHeader";

/** Enterprise-Grade How It Works Stepper (Zero Gradients, Pure Clay & Glass) */
export const HowItWorksStepper: React.FC = React.memo(() => (
  <section className="w-full max-w-6xl mx-auto px-4">
    <StepperHeader />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
      {stepperSteps.map((step, idx) => (
        <StepCard
          key={step.num}
          step={step}
          index={idx}
          isLast={idx === stepperSteps.length - 1}
        />
      ))}
    </div>
  </section>
));

HowItWorksStepper.displayName = "HowItWorksStepper";
