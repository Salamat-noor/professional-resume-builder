'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LandingHero from '../components/LandingHero';
import LandingFeatures from '../components/LandingFeatures';
import LandingTemplates from '../components/LandingTemplates';
import LandingHowItWorks from '../components/LandingHowItWorks';
import LandingTestimonials from '../components/LandingTestimonials';
import LandingPricing from '../components/LandingPricing';
import LandingCTA from '../components/LandingCTA';

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
