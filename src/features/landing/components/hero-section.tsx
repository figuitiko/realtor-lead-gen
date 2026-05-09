import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin } from "lucide-react";

interface HeroSectionProps {
  qualifyHref?: string;
}

export function HeroSection({ qualifyHref = "/qualify" }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="container relative py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            className="mb-6 border-amber-400/30 bg-amber-400/10 text-amber-400"
            variant="outline"
          >
            <MapPin className="mr-1 h-3 w-3" />
            Miami · $300K+ · 90-Day Program
          </Badge>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            We don&apos;t work with everyone.
            <span className="block text-amber-400">We work with the right buyer.</span>
          </h1>

          <p className="mb-4 text-lg text-slate-300 md:text-xl">
            Minimum investment $300,000 USD. English &amp; Spanish.
            Ready to close in 90 days? Let&apos;s find your property.
          </p>

          <p className="mb-10 text-sm text-slate-400">
            This is not a generic listing platform. We only accept qualified buyers.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-semibold px-8"
            >
              <Link href={qualifyHref}>
                Start My Property Match
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-xs text-slate-500">
            Serious buyers only · Personalized property guidance · Bilingual support
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
