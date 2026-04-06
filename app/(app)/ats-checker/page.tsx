'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ATSUpload } from '@/components/ats-checker';
import { ATSAnalyzing } from '@/components/ats-checker';
import { ATSScoreDisplay } from '@/components/ats-checker';
import { ATSChecklist } from '@/components/ats-checker';
import { ATSKeywords } from '@/components/ats-checker';

type Stage = 'upload' | 'analyzing' | 'results';

function ATSCheckerContent() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get('resumeId');
  const [stage, setStage] = useState<Stage>(preselect ? 'analyzing' : 'upload');
  const [resumeTitle, setResumeTitle] = useState(preselect ? 'Senior Product Manager' : '');
  const [activeTab, setActiveTab] = useState<'checklist' | 'keywords'>('checklist');

  const handleSelect = (id: string, title: string) => {
    setResumeTitle(title || 'Uploaded Resume');
    setStage('analyzing');
  };

  const handleAnalysisComplete = () => setStage('results');
  const handleRunNew = () => { setStage('upload'); setResumeTitle(''); };

  return (
    <>
      {stage === 'results' && (
        <div className="bg-card border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={handleRunNew} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-accent cursor-pointer text-muted-foreground transition-colors">
              <i className="ri-arrow-left-line text-base"></i>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-foreground">ATS Report</h1>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">Score: 87</span>
              </div>
              <p className="text-xs text-muted-foreground">{resumeTitle} · Analyzed just now</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href={`/builder/1`} className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap shadow-md shadow-primary/20">
              <i className="ri-edit-line text-sm"></i>Open in Builder
            </a>
            <button className="flex items-center gap-2 border border-border text-muted-foreground text-sm font-medium px-4 py-2 rounded-xl hover:border-primary/50 hover:text-primary transition-all cursor-pointer whitespace-nowrap">
              <i className="ri-download-line text-sm"></i>Export Report
            </button>
          </div>
        </div>
      )}

      <div className="p-8">
        {stage === 'upload' && (
          <ATSUpload onSelect={handleSelect} />
        )}
        {stage === 'analyzing' && (
          <ATSAnalyzing resumeTitle={resumeTitle} onComplete={handleAnalysisComplete} />
        )}
        {stage === 'results' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <ATSScoreDisplay resumeTitle={resumeTitle} onRunNew={handleRunNew} />
            </div>
            <div className="col-span-2 space-y-5">
              <div className="flex items-center gap-2 bg-card rounded-2xl border border-border shadow-sm p-1.5 w-fit">
                {(['checklist', 'keywords'] as const).map(t => (
                  <button key={t} onClick={() => setActiveTab(t)}
                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === t ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                    {t === 'checklist' ? 'Fixes & Checklist' : 'Keywords & Sections'}
                  </button>
                ))}
              </div>
              {activeTab === 'checklist' ? <ATSChecklist /> : <ATSKeywords />}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function ATSCheckerPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    }>
      <ATSCheckerContent />
    </Suspense>
  );
}
