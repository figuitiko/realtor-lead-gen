import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RealtorQualifyLoading() {
  return (
    <main className="min-h-screen bg-muted/30 py-12">
      <div className="container max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <Skeleton className="mx-auto h-8 w-72" />
          <Skeleton className="mx-auto h-4 w-80" />
        </div>

        <Card className="mx-auto max-w-lg shadow-lg">
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-20 rounded-2xl" />
              ))}
            </div>
          </CardContent>
          <CardFooter className="gap-3 pt-0">
            <Skeleton className="h-11 flex-1" />
            <Skeleton className="h-11 flex-1" />
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
