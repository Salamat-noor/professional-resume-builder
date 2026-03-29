'use client';
import Link from 'next/link';

const checks = [
  { label: 'Contact info complete', pass: true },
  { label: 'Summary present & strong', pass: true },
  { label: 'Quantified achievements', pass: true },
  { label: 'Keywords match job title', pass: false, fix: 'Add: "cross-functional", "stakeholder"' },
  { label: 'No complex formatting', pass: true },
  { label: 'Standard section headings', pass: true },
  { label: 'Action verbs in bullets', pass: true },
  { label: 'Missing "Certifications"', pass: false, fix: 'Consider adding PMP or similar' },
  { label: 'File size optimized', pass: true },
  { label: 'Consistent date format', pass: true },
];

export default function BuilderScorePanel() {
  const score = 87;
  const pct = (score / 100) * 283;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-5">
        <div className="relative w-32 h-32 my-2">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#EEF2FF" strokeWidth="8"/>
            <circle cx="50" cy="50" r="45" fill="none" stroke="#4F46E5" strokeWidth="8" strokeDasharray={`${pct} ${283-pct}`} strokeLinecap="round"/>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-indigo-600">{score}</span>
            <span className="text-xs text-gray-500">/ 100</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-green-600">Good — Likely to Pass ATS</p>
        <div className="grid grid-cols-3 gap-2 w-full mt-3">
          {[{label:'Format',v:95,c:'text-green-600'},{label:'Keywords',v:78,c:'text-yellow-600'},{label:'Content',v:89,c:'text-green-600'}].map(m => (
            <div key={m.label} className="text-center p-2 bg-gray-50 rounded-xl">
              <p className={`text-lg font-bold ${m.c}`}>{m.v}</p>
              <p className="text-xs text-gray-500">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs font-semibold text-gray-700 mb-2.5">Checklist</p>
      <div className="space-y-1.5">
        {checks.map(c => (
          <div key={c.label} className={`flex items-start gap-2.5 p-2.5 rounded-xl ${!c.pass ? 'bg-red-50 border border-red-100' : ''}`}>
            <div className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">
              <i className={c.pass ? 'ri-checkbox-circle-fill text-green-500' : 'ri-error-warning-fill text-red-500'}></i>
            </div>
            <div>
              <p className={`text-xs font-medium ${c.pass ? 'text-gray-700' : 'text-red-700'}`}>{c.label}</p>
              {c.fix && <p className="text-xs text-red-500 mt-0.5">{c.fix}</p>}
            </div>
          </div>
        ))}
      </div>
      <Link href="/ats-checker" className="mt-4 block w-full text-center text-xs font-semibold text-indigo-600 border border-indigo-200 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer whitespace-nowrap">View Full ATS Report →</Link>
    </div>
  );
}
