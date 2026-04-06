import LandingHero from '@/components/LandingHero';
import LandingFeatures from '@/components/LandingFeatures';
import LandingTemplates from '@/components/LandingTemplates';
import LandingHowItWorks from '@/components/LandingHowItWorks';
import LandingTestimonials from '@/components/LandingTestimonials';
import LandingPricing from '@/components/LandingPricing';
import LandingCTA from '@/components/LandingCTA';

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
