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
            Prefer to Talk Before You Start?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Book a free 15-minute call. No pressure, no pitch.
            English or Spanish — you choose.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="font-semibold px-8">
              <Link href={qualifyHref}>Schedule a Call</Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Or{" "}
            <Link href={qualifyHref} className="underline underline-offset-4 hover:text-foreground">
              start the online qualification
            </Link>{" "}
            — takes 5 minutes.
          </p>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            100% confidential. We never share your data.
          </p>
        </div>
      </div>
    </section>
  );
}
