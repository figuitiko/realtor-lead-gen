"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SiteHeaderProps {
  homeHref?: string;
  qualifyHref?: string;
}

export function SiteHeader({ homeHref = "/", qualifyHref = "/qualify" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={homeHref} className="flex flex-col leading-tight group" aria-label="Miami Premier Realty — home">
          <span className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors">
            Miami Premier
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Realty
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <Link
            href={homeHref}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Button asChild size="sm" className="font-semibold">
            <Link href={qualifyHref}>See If I Qualify</Link>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background px-4 pb-4 pt-2 space-y-3">
          <Link
            href={homeHref}
            className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Button asChild size="sm" className="w-full font-semibold">
            <Link href={qualifyHref} onClick={() => setMenuOpen(false)}>
              See If I Qualify
            </Link>
          </Button>
        </div>
      )}
    </header>
  )
}
