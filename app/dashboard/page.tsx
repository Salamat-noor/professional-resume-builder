'use client';
import AppSidebar from '@/components/AppSidebar';
import DashHeader from './DashHeader';
import StatsRow from './StatsRow';
import ResumeGrid from './ResumeGrid';
import ATSPromoBanner from './ATSPromoBanner';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <main className="ml-60 flex-1 p-8">
        <DashHeader />
        <StatsRow />
        <ATSPromoBanner />
        <ResumeGrid />
      </main>
    </div>
  );
}
