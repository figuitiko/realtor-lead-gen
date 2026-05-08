"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FollowUpStatus } from "@prisma/client";

interface FollowUpStatusSelectProps {
  value: FollowUpStatus;
  onChange: (value: FollowUpStatus) => void;
  disabled?: boolean;
}

const options: { value: FollowUpStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "APPOINTMENT_SCHEDULED", label: "Appointment Scheduled" },
  { value: "NOT_QUALIFIED", label: "Not Qualified" },
  { value: "CLOSED", label: "Closed" },
];

export function FollowUpStatusSelect({ value, onChange, disabled }: FollowUpStatusSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as FollowUpStatus)}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
