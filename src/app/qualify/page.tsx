import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { QualificationFlow } from "@/features/lead-capture/components/qualification-flow";

export const metadata = {
  title: "See If You Qualify | Miami Premier Realty",
  description: "Answer a few quick questions to see if you qualify for our Miami real estate advisory service.",
};

export default function QualifyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-muted/30 py-12">
        <div className="container">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Let&apos;s See If We&apos;re a Good Fit
            </h1>
            <p className="mt-2 text-muted-foreground">
              Answer 4 quick questions. Takes less than 2 minutes.
            </p>
          </div>

          <QualificationFlow />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
