"use client";

import { Progress } from "@/components/ui/progress";

interface QualificationProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function QualificationProgress({ currentStep, totalSteps }: QualificationProgressProps) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="font-medium text-foreground">Step {currentStep} of {totalSteps}</p>
          <p className="text-xs text-muted-foreground">Short answers now help us prioritize the right follow-up later.</p>
        </div>
        <span className="font-semibold text-primary">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
