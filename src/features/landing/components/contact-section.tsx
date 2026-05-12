import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Shield } from "lucide-react";

interface ContactSectionProps {
  qualifyHref?: string;
}

export function ContactSection({ qualifyHref = "/qualify" }: ContactSectionProps) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Want a quick conversation before you qualify?
          </h2>
          <p className="mb-3 text-muted-foreground">
            Start with the form if you want the fastest response.
          </p>
          <p className="mb-8 text-muted-foreground">
            If you prefer to talk first, use the same short intake and we&apos;ll reach out with the right next step.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="px-8 font-semibold">
              <Link href={qualifyHref}>Start the qualification</Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            We review budget, timing, and financing first so the conversation stays productive.
          </p>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            Private inquiry. No spam, no public sharing, no wasted calls.
          </p>
        </div>
      </div>
    </section>
  );
}
