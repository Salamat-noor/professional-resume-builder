'use client';
import { useEffect, useState } from 'react';

const steps = [
  { icon: 'ri-file-search-line', label: 'Reading document structure…', sub: 'Parsing sections, headers and layout' },
  { icon: 'ri-scan-2-line', label: 'Scanning formatting rules…', sub: 'Checking fonts, tables, and spacing' },
  { icon: 'ri-search-eye-line', label: 'Analyzing keyword density…', sub: 'Matching against 2,400 ATS systems' },
  { icon: 'ri-brain-line', label: 'Running AI content review…', sub: 'Evaluating bullet strength and impact' },
  { icon: 'ri-bar-chart-grouped-line', label: 'Generating your score…', sub: 'Compiling actionable recommendations' },
];

interface Props { resumeTitle: string; onComplete: () => void; }

export function ATSAnalyzing({ resumeTitle, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 2;
        if (next >= 100) { clearInterval(interval); setTimeout(onComplete, 600); return 100; }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    setStep(Math.min(Math.floor(progress / 20), steps.length - 1));
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-lg text-center">
        <div className="relative w-36 h-36 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
            <circle cx="72" cy="72" r="64" fill="none" stroke="#EEF2FF" strokeWidth="8"/>
            <circle cx="72" cy="72" r="64" fill="none" stroke="#4F46E5" strokeWidth="8"
              strokeDasharray={`${(progress / 100) * 402} ${402}`}
              strokeLinecap="round"
              className="transition-all duration-100"/>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-indigo-600">{progress}<span className="text-base">%</span></span>
            <span className="text-xs text-gray-400 mt-0.5">Scanning</span>
          </div>
        </div>

        <div className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4">
          <div className="w-3.5 h-3.5 flex items-center justify-center"><i className="ri-file-text-fill"></i></div>
          {resumeTitle}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing your resume…</h2>
        <p className="text-sm text-gray-500 mb-8">This only takes a few seconds. Checking against 2,400+ ATS rules.</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left space-y-3 mb-6">
          {steps.map((s, i) => (
            <div key={s.label} className={`flex items-center gap-3 transition-all ${i < step ? 'opacity-40' : i === step ? 'opacity-100' : 'opacity-20'}`}>
              <div className={`w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 ${i < step ? 'bg-green-100' : i === step ? 'bg-indigo-100' : 'bg-gray-50'}`}>
                {i < step
                  ? <i className="ri-check-line text-green-600 text-base"></i>
                  : <i className={`${s.icon} text-base ${i === step ? 'text-indigo-600' : 'text-gray-300'}`}></i>}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${i === step ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</p>
                {i === step && <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>}
              </div>
              {i < step && (
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-check-double-line text-green-500 text-sm"></i></div>
              )}
              {i === step && (
                <div className="flex gap-0.5">
                  {[0, 1, 2].map(d => (
                    <div key={d} className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: `${d * 0.15}s` }}></div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-xs text-gray-400 mt-2">{progress}% complete</p>
      </div>
    </div>
  );
}
