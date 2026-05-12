import { Skeleton } from "@/components/ui/skeleton";

export default function RealtorLandingLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-background/95">
        <div className="container flex h-16 items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      <main className="container space-y-8 py-10">
        <Skeleton className="h-[420px] rounded-3xl" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </div>
        <Skeleton className="h-72 rounded-3xl" />
      </main>
    </div>
  );
}
