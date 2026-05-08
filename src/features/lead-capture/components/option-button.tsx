"use client";

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
        "w-full rounded-xl border-2 p-4 text-left transition-all duration-150",
        "hover:border-primary hover:bg-primary/5",
        selected
          ? "border-primary bg-primary/10 ring-2 ring-primary/20"
          : "border-border bg-card"
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className={cn("text-2xl", selected && "scale-110 transition-transform")}>
            {icon}
          </div>
        )}
        <div>
          <div className={cn("font-medium", selected && "text-primary")}>{label}</div>
          {description && (
            <div className="text-sm text-muted-foreground">{description}</div>
          )}
        </div>
        <div className="ml-auto">
          <div
            className={cn(
              "h-4 w-4 rounded-full border-2 transition-colors",
              selected ? "border-primary bg-primary" : "border-muted-foreground"
            )}
          />
        </div>
      </div>
    </button>
  );
}
