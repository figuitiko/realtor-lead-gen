import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    stat: "#1",
    label: "International real estate market in the US",
    source: "NAR 2024",
  },
  {
    stat: "0%",
    label: "State income tax in Florida",
    source: "Florida Dept. of Revenue",
  },
  {
    stat: "+18%",
    label: "Median home price growth (2022–2024)",
    source: "Miami Realtors Association",
  },
  {
    stat: "$4,200",
    label: "Avg. monthly luxury rental yield — Brickell/Edgewater",
    source: "Zillow Rental Index 2024",
  },
];

export function WhyMiamiSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Why Miami? The numbers speak.
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Not just sunshine and beaches — Miami is one of the strongest real estate markets in North America.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <Card key={item.stat} className="border-slate-200 text-center">
                <CardContent className="pt-6">
                  <p className="mb-2 text-4xl font-bold text-primary">{item.stat}</p>
                  <p className="mb-3 text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.source}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            Stats are illustrative. Consult a licensed advisor for investment decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
