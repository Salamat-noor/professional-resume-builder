'use client';
import {OnboardingFlow} from '@/components/onboarding/OnboardingFlow';
import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex flex-col items-center justify-center p-6">
      <Link href="/" className="font-['Pacifico'] text-2xl text-primary mb-10">ClarityCV</Link>
      <OnboardingFlow />
    </div>
  );
}
