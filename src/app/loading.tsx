export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin"
          aria-label="Loading"
          role="status"
        />
        <p className="text-sm text-muted-foreground font-medium tracking-wide">Loading…</p>
      </div>
    </div>
  )
}
