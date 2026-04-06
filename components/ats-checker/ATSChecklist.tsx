'use client';
import { useState } from 'react';

const passed = [
  { label: 'Standard section headings used', desc: 'Experience, Education, Skills properly labeled' },
  { label: 'Contact information complete', desc: 'Name, email, phone, location all present' },
  { label: 'No complex formatting detected', desc: 'Tables, text boxes, and images avoided' },
  { label: 'Consistent date formatting', desc: 'All dates follow Month YYYY pattern' },
  { label: 'Action verbs in bullets', desc: 'Strong verbs like "Led", "Spearheaded", "Drove"' },
  { label: 'File size optimized', desc: 'Document is under 1MB for ATS parsing' },
];

const issues = [
  {
    label: 'Missing 3 high-value keywords',
    desc: '"cross-functional", "stakeholder management", "agile"',
    fix: 'Add these keywords naturally to your experience bullets and professional summary.',
    priority: 'high',
    effort: 'Quick fix · ~5 min'
  },
  {
    label: 'Summary lacks impact metrics',
    desc: 'Generic description without quantified achievements or years of experience',
    fix: 'Add "8+ years of product experience" and "delivered 40% revenue growth" to your summary.',
    priority: 'medium',
    effort: 'Moderate · ~10 min'
  },
  {
    label: 'Skills section is too broad',
    desc: '18 skills listed may dilute relevance signals for ATS',
    fix: 'Narrow down to 8–10 most relevant skills for your target role. Remove soft skills.',
    priority: 'low',
    effort: 'Quick fix · ~3 min'
  },
];

const priorityConfig = {
  high: { border: 'border-red-400', bg: 'bg-red-50', icon: 'text-red-600', badge: 'bg-red-100 text-red-600', label: 'High Priority' },
  medium: { border: 'border-orange-400', bg: 'bg-orange-50', icon: 'text-orange-600', badge: 'bg-orange-100 text-orange-600', label: 'Medium Priority' },
  low: { border: 'border-yellow-400', bg: 'bg-yellow-50', icon: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-600', label: 'Low Priority' },
};

export function ATSChecklist() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [fixed, setFixed] = useState<string[]>([]);

  const handleFix = (label: string) => {
    setFixed(prev => [...prev, label]);
    setExpanded(null);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-lg">
              <i className="ri-checkbox-circle-fill text-green-600 text-sm"></i>
            </div>
            <h2 className="text-base font-bold text-gray-900">Passing Checks</h2>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">{passed.length}</span>
          </div>
          <span className="text-xs text-gray-400">All clear — no action needed</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {passed.map(c => (
            <div key={c.label} className="flex items-start gap-3 p-3.5 bg-green-50 border border-green-100 rounded-xl">
              <div className="w-5 h-5 flex items-center justify-center bg-green-200 rounded-full mt-0.5 flex-shrink-0">
                <i className="ri-check-line text-green-700 text-xs"></i>
              </div>
              <div>
                <p className="text-xs font-semibold text-green-900 leading-snug">{c.label}</p>
                <p className="text-xs text-green-600 mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center bg-orange-100 rounded-lg">
              <i className="ri-tools-fill text-orange-600 text-sm"></i>
            </div>
            <h2 className="text-base font-bold text-gray-900">Issues to Fix</h2>
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">{issues.filter(i => !fixed.includes(i.label)).length}</span>
          </div>
          {fixed.length > 0 && <span className="text-xs text-green-600 font-medium">{fixed.length} fixed so far!</span>}
        </div>
        <div className="space-y-3">
          {issues.map(issue => {
            const cfg = priorityConfig[issue.priority as keyof typeof priorityConfig];
            const isFixed = fixed.includes(issue.label);
            if (isFixed) return (
              <div key={issue.label} className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="w-8 h-8 flex items-center justify-center bg-green-200 rounded-xl flex-shrink-0">
                  <i className="ri-check-line text-green-700"></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-800 line-through">{issue.label}</p>
                  <p className="text-xs text-green-600">Fixed successfully!</p>
                </div>
              </div>
            );
            return (
              <div key={issue.label} className={`border-l-4 ${cfg.border} ${cfg.bg} rounded-xl overflow-hidden`}>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl flex-shrink-0 shadow-sm mt-0.5">
                        <i className={`ri-alert-fill ${cfg.icon} text-sm`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-bold text-gray-900">{issue.label}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cfg.badge}`}>{cfg.label}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{issue.desc}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <i className="ri-time-line"></i>{issue.effort}
                        </p>
                        {expanded === issue.label && (
                          <div className="mt-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <p className="text-xs font-bold text-indigo-600 mb-2 flex items-center gap-1">
                              <i className="ri-lightbulb-line"></i>Recommended Fix
                            </p>
                            <p className="text-xs text-gray-700 leading-relaxed mb-3">{issue.fix}</p>
                            <div className="flex gap-2">
                              <button onClick={() => handleFix(issue.label)} className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer font-semibold whitespace-nowrap transition-colors">
                                Apply Fix
                              </button>
                              <button onClick={() => setExpanded(null)} className="text-xs text-gray-400 px-3 py-2 hover:text-gray-600 cursor-pointer whitespace-nowrap">Dismiss</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setExpanded(expanded === issue.label ? null : issue.label)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer whitespace-nowrap bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0">
                      {expanded === issue.label ? 'Hide' : 'How to Fix'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-white mb-1">Want a perfect 100 score?</p>
          <p className="text-xs text-slate-300">Tailor your resume to a specific job description and instantly close the keyword gap.</p>
        </div>
        <a href="/job-tailoring" className="flex-shrink-0 bg-white text-indigo-700 font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer whitespace-nowrap">Try Job Tailoring →</a>
      </div>
    </div>
  );
}
