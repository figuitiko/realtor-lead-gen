import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

interface FinalCtaSectionProps {
  qualifyHref?: string;
}

export function FinalCtaSection({ qualifyHref = "/qualify" }: FinalCtaSectionProps) {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="container text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Your next property is waiting.
            <span className="block text-amber-400">Are you?</span>
          </h2>
          <p className="mb-8 text-slate-300">
            Serious buyers only. If you&apos;re ready to invest $300K+ in Miami in the next 90 days, start now.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-semibold px-10"
          >
            <Link href={qualifyHref}>
              Start My Property Match
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <Shield className="h-3.5 w-3.5" />
            Your information is private and never shared without your consent.
          </p>
        </div>
      </div>
    </section>
  );
}
