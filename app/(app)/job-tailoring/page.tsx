'use client';
import { JDInputPanel } from '@/components/job-tailoring';
import { TailoringResults } from '@/components/job-tailoring';
import { useState } from 'react';

export default function JobTailoringPage() {
  const [analyzed, setAnalyzed] = useState(true);
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">JD Tailoring</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Paste a job description and align your resume with the right keywords</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <JDInputPanel onAnalyze={() => setAnalyzed(true)} />
        <TailoringResults visible={analyzed} />
      </div>
    </>
  );
}
