"use client";

import React, { memo } from "react";
import { StepItem } from "./stepperData";
import { StepMockup } from "./StepMockup";
import { StepCardTop } from "./StepCardTop";
import { StepCardBottom } from "./StepCardBottom";

interface StepCardProps {
  step: StepItem;
  index: number;
  isLast: boolean;
}

export const StepCard: React.FC<StepCardProps> = memo(({ step, index, isLast }) => (
  <div
    className="w-[260px] sm:w-auto shrink-0 sm:shrink snap-center p-4 sm:p-6 rounded-[22px] sm:rounded-[28px] clay-card-glass flex flex-col justify-between group transition-all duration-300 sm:hover:-translate-y-1.5 transform-gpu will-change-transform"
  >
    <div>
      <StepCardTop
        Icon={step.icon}
        num={step.num}
        title={step.title}
        subtitle={step.subtitle}
        accentColor={step.accentColor}
      />
      <div className="mb-4">
        <StepMockup stepIndex={index} />
      </div>
    </div>
    <StepCardBottom isLast={isLast} />
  </div>
));

StepCard.displayName = "StepCard";
