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
            Ready to see if you&apos;re a fit?
            <span className="block text-amber-400">Let&apos;s qualify the opportunity first.</span>
          </h2>
          <p className="mb-8 text-slate-300">
            If you&apos;re planning to buy or invest in Miami with a $300K+ budget, complete the intake now and we&apos;ll prioritize the right next conversation.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-amber-400 px-10 font-semibold text-slate-900 hover:bg-amber-300"
          >
            <Link href={qualifyHref}>
              Start my qualification
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <Shield className="h-3.5 w-3.5" />
            Your information stays private and is only used to prepare the right follow-up.
          </p>
        </div>
      </div>
    </section>
  );
}
