"use client";

import React from "react";
import { PasteStage, DetectStage } from "./StepStagesOneTwo";
import { LaunchStage, ConvertStage } from "./StepStagesThreeFour";

export const StepMockup: React.FC<{ stepIndex: number }> = ({ stepIndex }) => {
  if (stepIndex === 0) return <PasteStage />;
  if (stepIndex === 1) return <DetectStage />;
  if (stepIndex === 2) return <LaunchStage />;
  return <ConvertStage />;
};
