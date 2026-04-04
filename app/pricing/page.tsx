'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PricingCards } from '@/components/pricing';
import { PricingFAQ } from '@/components/pricing';

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background text-center">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Pricing</p>
        <h1 className="text-5xl font-bold text-foreground mb-4">Choose the plan that fits your goals</h1>
        <p className="text-lg text-muted-foreground mb-8">All plans include core features. Upgrade anytime. No contracts.</p>
        <div className="inline-flex items-center bg-muted rounded-full p-1">
          <button onClick={() => setAnnual(false)} className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${!annual ? 'bg-card shadow text-foreground' : 'text-muted-foreground'}`}>Monthly</button>
          <button onClick={() => setAnnual(true)} className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${annual ? 'bg-card shadow text-foreground' : 'text-muted-foreground'}`}>Annual <span className="text-green-600 font-bold ml-1">–25%</span></button>
        </div>
      </section>
      <PricingCards annual={annual} />
      <PricingFAQ />
      <Footer />
    </div>
  );
}
