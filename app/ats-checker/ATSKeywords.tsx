'use client';
import { useState } from 'react';

const found = ['Product Strategy','Stakeholder Communication','Data-Driven','Team Leadership','Go-to-Market','Roadmap Planning','KPI Tracking','SQL','A/B Testing','User Research','OKRs'];
const missing = ['Cross-Functional','Agile Methodology','Sprint Planning','P&L Ownership','Vendor Management'];
const suggested = ['Customer Discovery','Feature Prioritization','Revenue Growth','Cost Optimization','Market Expansion'];

const sections = [
  { name: 'Summary', score: 72, issues: ['No years of experience mentioned', 'Missing revenue/growth metric'] },
  { name: 'Work Experience', score: 91, issues: ['Bullet in Stripe role lacks quantification'] },
  { name: 'Skills', score: 64, issues: ['Too many skills (18) — reduce to 8–10', 'Missing "Agile" and "Scrum"'] },
  { name: 'Education', score: 98, issues: [] },
  { name: 'Contact Info', score: 100, issues: [] },
];

export default function ATSKeywords() {
  const [tab, setTab] = useState<'keywords' | 'sections'>('keywords');

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 pt-5 pb-0 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">Keyword & Section Analysis</h2>
          <span className="text-xs text-gray-400">Based on 450+ job postings in your field</span>
        </div>
        <div className="flex gap-1">
          {(['keywords', 'sections'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all capitalize cursor-pointer whitespace-nowrap ${tab === t ? 'bg-indigo-50 text-indigo-600 border-t border-x border-indigo-100' : 'text-gray-500 hover:text-gray-700'}`}>
              {t === 'keywords' ? 'Keywords' : 'Section Scores'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {tab === 'keywords' && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Found in Resume ({found.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {found.map(k => (
                  <span key={k} className="bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <i className="ri-check-line text-xs"></i>{k}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Missing Keywords ({missing.length})</span>
                <span className="text-xs text-red-500 font-medium">— High priority</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {missing.map(k => (
                  <span key={k} className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer hover:bg-red-100 transition-colors">
                    <i className="ri-add-line text-xs"></i>{k}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <i className="ri-lightbulb-line"></i>Click a keyword to add it to your resume
              </p>
            </div>
            <div className="border-t border-gray-100 pt-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">AI Suggested ({suggested.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggested.map(k => (
                  <span key={k} className="bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer hover:bg-indigo-100 transition-colors">
                    <i className="ri-sparkling-2-line text-xs"></i>{k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'sections' && (
          <div className="space-y-4">
            {sections.map(s => (
              <div key={s.name} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.score >= 90 ? 'bg-green-500' : s.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${s.score}%` }}></div>
                    </div>
                    <span className={`text-xs font-bold w-8 ${s.score >= 90 ? 'text-green-600' : s.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>{s.score}</span>
                  </div>
                </div>
                {s.issues.length > 0 ? (
                  <div className="space-y-1.5">
                    {s.issues.map(issue => (
                      <div key={issue} className="flex items-start gap-2 bg-orange-50 rounded-lg p-2">
                        <div className="w-3.5 h-3.5 flex items-center justify-center mt-0.5 flex-shrink-0"><i className="ri-error-warning-line text-orange-500 text-xs"></i></div>
                        <p className="text-xs text-orange-700">{issue}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-green-600">
                    <i className="ri-checkbox-circle-fill"></i>No issues found
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
