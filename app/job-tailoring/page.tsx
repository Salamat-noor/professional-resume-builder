'use client';
import AppSidebar from '@/components/AppSidebar';
import JDInputPanel from './JDInputPanel';
import TailoringResults from './TailoringResults';
import { useState } from 'react';

export default function JobTailoringPage() {
  const [analyzed, setAnalyzed] = useState(true);
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <main className="ml-60 flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">JD Tailoring</h1>
          <p className="text-sm text-gray-500 mt-0.5">Paste a job description and align your resume with the right keywords</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <JDInputPanel onAnalyze={() => setAnalyzed(true)} />
          <TailoringResults visible={analyzed} />
        </div>
      </main>
    </div>
  );
}
