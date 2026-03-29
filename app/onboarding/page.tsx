'use client';
import OnboardingFlow from './OnboardingFlow';
import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      <Link href="/" className="font-['Pacifico'] text-2xl text-indigo-600 mb-10">ClarityCV</Link>
      <OnboardingFlow />
    </div>
  );
}
