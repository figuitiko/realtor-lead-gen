"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Inbox, RefreshCcw } from "lucide-react";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-3xl border bg-card p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Inbox className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">We couldn&apos;t load the dashboard.</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        The leads are safe. Refresh this view and we&apos;ll try again.
      </p>
      {error.digest && (
        <p className="mt-4 text-xs font-mono text-muted-foreground/70">Reference: {error.digest}</p>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button onClick={reset}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Reload dashboard
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Go to leads</Link>
        </Button>
      </div>
    </div>
  );
}
