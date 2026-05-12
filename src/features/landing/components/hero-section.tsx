import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  qualifyHref?: string;
}

export function HeroSection({ qualifyHref = "/qualify" }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="container relative py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge
            className="mb-6 border-amber-400/30 bg-amber-400/10 px-3 py-1 text-amber-300"
            variant="outline"
          >
            <MapPin className="mr-1 h-3 w-3" />
            Miami buyers · $300K+ budget · Bilingual advisory
          </Badge>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            We qualify serious Miami buyers
            <span className="block text-amber-400">before we spend time on tours.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg md:text-xl">
            Miami Premier Realty uses a short qualification flow to focus on buyers who are ready, funded, and clear on their next move.
          </p>

          <div className="mx-auto mt-6 grid max-w-3xl gap-3 text-left text-sm text-slate-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Intent first</p>
              <p className="mt-1 text-slate-400">We separate serious residents and investors from casual browsing.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Speed matters</p>
              <p className="mt-1 text-slate-400">Timeline and financing tell us who needs immediate follow-up.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">High-touch service</p>
              <p className="mt-1 text-slate-400">Qualified buyers get curated inventory, not a generic MLS dump.</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full px-8 font-semibold text-slate-900 sm:w-auto bg-amber-400 hover:bg-amber-300"
            >
              <Link href={qualifyHref}>
                Check if I qualify
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-sm text-slate-400">Takes about 2 minutes · No obligation · Private by default</p>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            Serious buyers only · Personalized property guidance · English &amp; Spanish support
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
