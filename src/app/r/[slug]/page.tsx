import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/features/landing/components/hero-section";
import { QualificationSection } from "@/features/landing/components/qualification-section";
import { HowItWorksSection } from "@/features/landing/components/how-it-works-section";
import { BenefitsSection } from "@/features/landing/components/benefits-section";
import { WhyMiamiSection } from "@/features/landing/components/why-miami-section";
import { SocialProofSection } from "@/features/landing/components/social-proof-section";
import { ContactSection } from "@/features/landing/components/contact-section";
import { FinalCtaSection } from "@/features/landing/components/final-cta-section";
import { getRealtorBySlug } from "@/lib/server-only/lead.repository";

interface RealtorLandingPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RealtorLandingPage({ params }: RealtorLandingPageProps) {
  const { slug } = await params;
  const realtor = await getRealtorBySlug(slug);

  if (!realtor) notFound();

  const homeHref = `/r/${realtor.slug}`;
  const qualifyHref = `${homeHref}/qualify`;

  return (
    <>
      <SiteHeader homeHref={homeHref} qualifyHref={qualifyHref} />
      <main>
        <HeroSection qualifyHref={qualifyHref} />
        <QualificationSection />
        <HowItWorksSection />
        <BenefitsSection />
        <WhyMiamiSection />
        <SocialProofSection />
        <ContactSection qualifyHref={qualifyHref} />
        <FinalCtaSection qualifyHref={qualifyHref} />
      </main>
      <SiteFooter />
    </>
  );
}
