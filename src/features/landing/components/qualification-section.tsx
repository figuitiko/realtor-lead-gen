import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const forYouItems = [
  "Budget of $300,000 USD or more",
  "Ready to move or invest within 90 days",
  "Want curated options — not 200-page MLS dumps",
  "Pre-approved or cash buyer",
  "Value bilingual, personalized guidance",
];

const notForYouItems = [
  "Budget under $300,000 USD",
  "Still \"just exploring\" with no timeline",
  "Expecting generic listings",
  "Need to sell before you can buy",
  "Looking for rentals under $3,000/month",
];

export function QualificationSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Is This Service Right for You?
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            We filter before you start — so both sides save time.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-green-800">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  You&apos;re the right fit if:
                </h3>
                <ul className="space-y-3">
                  {forYouItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-green-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-red-800">
                  <XCircle className="h-5 w-5 text-red-600" />
                  This is NOT for you if:
                </h3>
                <ul className="space-y-3">
                  {notForYouItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-red-700">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
