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

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <QualificationSection />
        <HowItWorksSection />
        <BenefitsSection />
        <WhyMiamiSection />
        <SocialProofSection />
        <ContactSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
