"use client";

import React from "react";
import { StepItem } from "./stepperData";
import { StepMockup } from "./StepMockup";
import { StepCardTop } from "./StepCardTop";
import { StepCardBottom } from "./StepCardBottom";

interface StepCardProps {
  step: StepItem;
  index: number;
  isLast: boolean;
}

/** Tactile Step Progression Card with Subtle Light Tint & Solid Black Icons */
export const StepCard: React.FC<StepCardProps> = React.memo(({ step, index, isLast }) => (
  <div
    className={`p-5 sm:p-6 rounded-[28px] ${step.cardBg} border ${step.borderTint} shadow-[inset_0_2px_2px_rgba(255,255,255,0.95),0_12px_30px_-8px_rgba(30,35,70,0.06)] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 transform-gpu`}
  >
    <div>
      <StepCardTop
        Icon={step.icon}
        num={step.num}
        badge={step.badge}
        badgeBg={step.badgeBg}
        title={step.title}
        subtitle={step.subtitle}
      />
      <div className="mb-4">
        <StepMockup stepIndex={index} />
      </div>
    </div>
    <StepCardBottom isLast={isLast} />
  </div>
));

StepCard.displayName = "StepCard";
