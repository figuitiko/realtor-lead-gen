import { Clock, Globe, MapPin, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Clock,
    title: "No Wasted Tours",
    description: "Every showing is pre-vetted for your budget and timeline. Zero generic walkthroughs.",
  },
  {
    icon: Globe,
    title: "English & Spanish",
    description: "Full bilingual support from property search to closing — we work with international buyers.",
  },
  {
    icon: MapPin,
    title: "Miami Market Expertise",
    description: "We know Brickell, Coral Gables, Coconut Grove, and beyond. Hyper-local guidance.",
  },
  {
    icon: BarChart3,
    title: "Investor-Grade Guidance",
    description: "ROI projections, rental yield estimates, and market comps — not just pretty photos.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Why Work With Us
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            We specialize in serious buyers who know what they want — and respect their time.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
