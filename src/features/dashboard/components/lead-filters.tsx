"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function LeadFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const status = searchParams.get("status") ?? "";
  const followUp = searchParams.get("followUp") ?? "";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function clearFilters() {
    startTransition(() => {
      router.push(pathname);
    });
  }

  const hasFilters = status || followUp;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={status} onValueChange={(v) => updateFilter("status", v === "ALL" ? "" : v)}>
        <SelectTrigger className="w-[150px]" disabled={isPending}>
          <SelectValue placeholder="Lead Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Statuses</SelectItem>
          <SelectItem value="HOT">🔥 Hot</SelectItem>
          <SelectItem value="WARM">⭐ Warm</SelectItem>
          <SelectItem value="COLD">❄️ Cold</SelectItem>
        </SelectContent>
      </Select>

      <Select value={followUp} onValueChange={(v) => updateFilter("followUp", v === "ALL" ? "" : v)}>
        <SelectTrigger className="w-[200px]" disabled={isPending}>
          <SelectValue placeholder="Follow-up Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Follow-ups</SelectItem>
          <SelectItem value="NEW">New</SelectItem>
          <SelectItem value="CONTACTED">Contacted</SelectItem>
          <SelectItem value="APPOINTMENT_SCHEDULED">Appointment Scheduled</SelectItem>
          <SelectItem value="NOT_QUALIFIED">Not Qualified</SelectItem>
          <SelectItem value="CLOSED">Closed</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          disabled={isPending}
          className="text-muted-foreground"
        >
          <X className="mr-1 h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  );
}
