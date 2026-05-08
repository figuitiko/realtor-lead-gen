"use client";

import { OptionButton } from "./option-button";

interface Option {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface QuestionStepProps {
  question: string;
  subtitle?: string;
  options: Option[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

export function QuestionStep({
  question,
  subtitle,
  options,
  selectedValue,
  onSelect,
}: QuestionStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{question}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="grid gap-3">
        {options.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
