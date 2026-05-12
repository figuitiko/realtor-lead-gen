"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { DEFAULT_REALTOR_SLUG } from "@/features/realtors/constants";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-3xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">We hit a snag.</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          The page didn&apos;t load the way we expected. Try again, or jump back
          to the demo funnel and keep moving.
        </p>
        {error.digest && (
          <p className="mt-4 text-xs font-mono text-muted-foreground/70">
            Reference: {error.digest}
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} size="lg">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/r/${DEFAULT_REALTOR_SLUG}`}>
              Back to demo landing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
