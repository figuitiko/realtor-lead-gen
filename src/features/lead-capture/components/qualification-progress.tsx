"use client";

import { Progress } from "@/components/ui/progress";

interface QualificationProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function QualificationProgress({ currentStep, totalSteps }: QualificationProgressProps) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="font-medium text-primary">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
