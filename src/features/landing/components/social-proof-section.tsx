import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Carlos M.",
    location: "Buenos Aires → Miami, FL",
    quote:
      "Found our Brickell condo in 3 weeks. The bilingual support made the entire process seamless from Argentina.",
  },
  {
    name: "Andrea & James T.",
    location: "New York, NY → Coral Gables, FL",
    quote:
      "We toured only 4 properties and closed on one. No time wasted, no generic listings — exactly what we needed.",
  },
  {
    name: "Roberto S.",
    location: "Bogotá, CO → Edgewater, FL",
    quote:
      "As an investor, I needed ROI data, not just pretty photos. They delivered comps and rental projections upfront.",
  },
];

export function SocialProofSection() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
            What Serious Buyers Say
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Real buyers. Real results. Real Miami.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-4 text-xs">
                    Verified buyer
                  </Badge>
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
