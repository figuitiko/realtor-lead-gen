import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import { DEFAULT_REALTOR_SLUG } from "@/features/realtors/constants";

export default function NotFound() {
  const landingHref = `/r/${DEFAULT_REALTOR_SLUG}`;
  const qualifyHref = `${landingHref}/qualify`;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <SearchX className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">We couldn&apos;t find that page.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
          That demo link may be expired, the realtor slug may be wrong, or the page was moved while we were refining the funnel.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href={landingHref}>Open demo landing</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={qualifyHref}>Go to qualification flow</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
