'use client';
import { useState } from 'react';

interface Props { visible: boolean; }
const found = ['Product Management','A/B Testing','Roadmap','Cross-functional','SQL','B2B SaaS','OKRs','Stakeholder Management'];
const partial = ['Data Science','Fintech','GTM Strategy'];
const missing = ['Payments SDK','Enterprise Sales','Infrastructure'];

const suggestions = [
  { section: 'Summary', text: 'Add "fintech" and "payments infrastructure" to your opening summary line.', easy: true },
  { section: 'Experience (Stripe)', text: 'Include "payments SDK" in your primary bullet — it appears 3x in the JD.', easy: true },
  { section: 'Skills', text: 'Add "enterprise stakeholder management" and "GTM strategy" to skills section.', easy: false },
];

export default function TailoringResults({ visible }: Props) {
  const [applied, setApplied] = useState<number[]>([]);
  if (!visible) return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center min-h-96">
      <div className="w-14 h-14 flex items-center justify-center bg-indigo-50 rounded-2xl mb-4"><i className="ri-magic-line text-3xl text-indigo-300"></i></div>
      <p className="text-gray-500 text-sm text-center">Paste a job description and click Analyze to see your match score and suggestions.</p>
    </div>
  );
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="#EEF2FF" strokeWidth="8"/>
              <circle cx="40" cy="40" r="36" fill="none" stroke="#4F46E5" strokeWidth="8" strokeDasharray="175 226" strokeLinecap="round"/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-bold text-indigo-600">78%</span></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Good Match</h3>
            <p className="text-sm text-gray-600 mt-0.5">Your resume matches 78% of this job description. Apply the 3 suggestions below to reach 92%+.</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{found.length} found</span>
              <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">{partial.length} partial</span>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">{missing.length} missing</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Keyword Analysis</h3>
        <div className="flex flex-wrap gap-2">
          {found.map(k => <span key={k} className="text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-800 font-medium">{k}</span>)}
          {partial.map(k => <span key={k} className="text-xs px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">{k} ~</span>)}
          {missing.map(k => <span key={k} className="text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-800 font-medium">{k} ✗</span>)}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900">Recommended Changes</h3>
          <button className="text-xs text-indigo-600 font-semibold hover:underline cursor-pointer whitespace-nowrap">Apply All</button>
        </div>
        <div className="space-y-3">
          {suggestions.map((s, i) => (
            <div key={i} className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border transition-all ${applied.includes(i) ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex-1">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{s.section}</span>
                <p className="text-xs text-gray-700 mt-1.5 leading-relaxed">{s.text}</p>
              </div>
              {!applied.includes(i) ? (
                <button onClick={() => setApplied([...applied, i])} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 cursor-pointer whitespace-nowrap flex-shrink-0">Apply</button>
              ) : <span className="text-xs text-green-600 font-semibold flex-shrink-0">✓ Applied</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
