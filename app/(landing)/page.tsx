import LandingHero from '@/components/(landing)/LandingHero';
import LandingFeatures from '@/components/(landing)/LandingFeatures';
import LandingTemplates from '@/components/(landing)/LandingTemplates';
import LandingHowItWorks from '@/components/(landing)/LandingHowItWorks';
import LandingTestimonials from '@/components/(landing)/LandingTestimonials';
import LandingPricing from '@/components/(landing)/LandingPricing';
import LandingCTA from '@/components/(landing)/LandingCTA';

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <LandingTemplates />
      <LandingHowItWorks />
      <LandingTestimonials />
      <LandingPricing />
      <LandingCTA />
    </>
  );
}
