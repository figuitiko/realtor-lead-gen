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
  helperText?: string;
  options: Option[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

export function QuestionStep({
  question,
  subtitle,
  helperText,
  options,
  selectedValue,
  onSelect,
}: QuestionStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{question}</h2>
        {subtitle && <p className="text-sm text-muted-foreground md:text-base">{subtitle}</p>}
        {helperText && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900 sm:text-sm">
            {helperText}
          </p>
        )}
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
