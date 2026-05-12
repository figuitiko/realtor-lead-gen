"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionButtonProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export function OptionButton({ label, description, selected, onClick, icon }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full rounded-2xl border p-4 text-left transition-all duration-150 sm:p-5",
        "hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        selected
          ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/15"
          : "border-border bg-card"
      )}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className={cn("pt-0.5 text-2xl transition-transform", selected && "scale-110")}>
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className={cn("font-medium", selected && "text-primary")}>{label}</div>
          {description && (
            <div className="mt-1 text-sm leading-6 text-muted-foreground">{description}</div>
          )}
        </div>
        <div className="pt-0.5">
          <CheckCircle2
            className={cn(
              "h-5 w-5 transition-colors",
              selected ? "text-primary" : "text-muted-foreground/40 group-hover:text-primary/60"
            )}
          />
        </div>
      </div>
    </button>
  );
}
