'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LandingHero from './LandingHero';
import LandingFeatures from './LandingFeatures';
import LandingTemplates from './LandingTemplates';
import LandingHowItWorks from './LandingHowItWorks';
import LandingTestimonials from './LandingTestimonials';
import LandingPricing from './LandingPricing';
import LandingCTA from './LandingCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <LandingHero />
      <LandingFeatures />
      <LandingTemplates />
      <LandingHowItWorks />
      <LandingTestimonials />
      <LandingPricing />
      <LandingCTA />
      <Footer />
    </div>
  );
}
