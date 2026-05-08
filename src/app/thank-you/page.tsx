import Link from "next/link";
import { CheckCircle, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata = {
  title: "Thank You | Miami Premier Realty",
};

export default function ThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-muted/30 py-16">
        <div className="container">
          <div className="mx-auto max-w-lg text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-5">
                <CheckCircle className="h-14 w-14 text-green-600" />
              </div>
            </div>

            <h1 className="mb-3 text-3xl font-bold tracking-tight">
              You&apos;re All Set!
            </h1>
            <p className="mb-8 text-muted-foreground text-lg">
              We received your information and will be in touch soon.
            </p>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="pt-5 text-center">
                  <Clock className="mx-auto mb-2 h-7 w-7 text-primary" />
                  <h3 className="font-semibold">Fast Response</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our team responds within 24 hours on business days.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-5 text-center">
                  <Phone className="mx-auto mb-2 h-7 w-7 text-primary" />
                  <h3 className="font-semibold">Personal Call</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Expect a direct call from a real estate specialist.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
