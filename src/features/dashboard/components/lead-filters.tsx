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
import { Loader2, X } from "lucide-react";

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

  const hasFilters = Boolean(status || followUp);

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium">Filter leads</p>
        <p className="text-xs text-muted-foreground">Focus the demo on priority level or follow-up stage.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Select value={status} onValueChange={(v) => updateFilter("status", v === "ALL" ? "" : v)}>
          <SelectTrigger className="w-full sm:w-[160px]" disabled={isPending}>
            <SelectValue placeholder="Lead status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="HOT">🔥 Hot</SelectItem>
            <SelectItem value="WARM">⭐ Warm</SelectItem>
            <SelectItem value="COLD">❄️ Cold</SelectItem>
          </SelectContent>
        </Select>

        <Select value={followUp} onValueChange={(v) => updateFilter("followUp", v === "ALL" ? "" : v)}>
          <SelectTrigger className="w-full sm:w-[220px]" disabled={isPending}>
            <SelectValue placeholder="Follow-up stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All follow-ups</SelectItem>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="APPOINTMENT_SCHEDULED">Appointment scheduled</SelectItem>
            <SelectItem value="NOT_QUALIFIED">Not qualified</SelectItem>
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
            Clear filters
          </Button>
        )}

        {isPending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      </div>
    </div>
  );
}
