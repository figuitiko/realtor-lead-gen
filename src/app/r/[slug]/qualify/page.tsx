import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { QualificationFlow } from "@/features/lead-capture/components/qualification-flow";
import { getRealtorBySlug } from "@/lib/server-only/lead.repository";

interface RealtorQualifyPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata = {
  title: "See If You Qualify | Miami Premier Realty",
  description: "Answer a few quick questions to see if you qualify for our Miami real estate advisory service.",
};

export default async function RealtorQualifyPage({ params }: RealtorQualifyPageProps) {
  const { slug } = await params;
  const realtor = await getRealtorBySlug(slug);

  if (!realtor) notFound();

  const homeHref = `/r/${realtor.slug}`;

  return (
    <>
      <SiteHeader homeHref={homeHref} qualifyHref={`${homeHref}/qualify`} />
      <main className="min-h-screen bg-muted/30 py-12">
        <div className="container">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s see how ready this opportunity is.
            </h1>
            <p className="mt-3 text-muted-foreground sm:text-base">
              Four short qualification questions and one contact step. We use your answers to prioritize serious Miami buyers and prepare the right follow-up.
            </p>
          </div>

          <QualificationFlow realtorSlug={realtor.slug} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
