import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-3">
        <p className="text-7xl font-extrabold text-primary/20 select-none">404</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Page Not Found</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/qualify">See If I Qualify</Link>
        </Button>
      </div>
    </div>
  )
}
