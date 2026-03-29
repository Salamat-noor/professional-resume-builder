'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AppSidebar from '@/components/AppSidebar';
import ATSUpload from './ATSUpload';
import ATSAnalyzing from './ATSAnalyzing';
import ATSScoreDisplay from './ATSScoreDisplay';
import ATSChecklist from './ATSChecklist';
import ATSKeywords from './ATSKeywords';

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
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <main className="ml-60 flex-1">
        {stage === 'results' && (
          <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <button onClick={handleRunNew} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 cursor-pointer text-gray-500 transition-colors">
                <i className="ri-arrow-left-line text-base"></i>
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-gray-900">ATS Report</h1>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Score: 87</span>
                </div>
                <p className="text-xs text-gray-400">{resumeTitle} · Analyzed just now</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href={`/builder/1`} className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap shadow-md shadow-indigo-100">
                <i className="ri-edit-line text-sm"></i>Open in Builder
              </a>
              <button className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-download-line text-sm"></i>Export Report
              </button>
            </div>
          </div>
        )}

        <div className={`p-8 ${stage === 'results' ? '' : ''}`}>
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
                <div className="flex items-center gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5 w-fit">
                  {(['checklist', 'keywords'] as const).map(t => (
                    <button key={t} onClick={() => setActiveTab(t)}
                      className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === t ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      {t === 'checklist' ? 'Fixes & Checklist' : 'Keywords & Sections'}
                    </button>
                  ))}
                </div>
                {activeTab === 'checklist' ? <ATSChecklist /> : <ATSKeywords />}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ATSCheckerPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen bg-slate-50 items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    }>
      <ATSCheckerContent />
    </Suspense>
  );
}
