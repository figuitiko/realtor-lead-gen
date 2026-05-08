import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          {/* Brand + license */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              &copy; {new Date().getFullYear()} Miami Premier Realty
            </p>
            <p className="text-xs text-muted-foreground">
              Licensed Real Estate Professional&nbsp;&middot;&nbsp;Miami, FL
            </p>
          </div>

          {/* Legal links */}
          <nav className="flex items-center gap-4" aria-label="Footer navigation">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-foreground/40 text-xs" aria-hidden="true">
              |
            </span>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
