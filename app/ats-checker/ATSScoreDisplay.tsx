'use client';

const subScores = [
  { label: 'Formatting', v: 95, color: 'bg-green-500', textColor: 'text-green-600' },
  { label: 'Keywords', v: 78, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
  { label: 'Content', v: 89, color: 'bg-green-500', textColor: 'text-green-600' },
  { label: 'Structure', v: 92, color: 'bg-green-500', textColor: 'text-green-600' },
  { label: 'Impact', v: 73, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
];

const quickStats = [
  { icon: 'ri-checkbox-circle-fill', label: '6 checks', sub: 'Passed', color: 'text-green-500' },
  { icon: 'ri-error-warning-fill', label: '3 issues', sub: 'To fix', color: 'text-orange-500' },
  { icon: 'ri-price-tag-3-line', label: '11 / 16', sub: 'Keywords', color: 'text-indigo-500' },
];

interface Props { resumeTitle: string; onRunNew: () => void; }

export default function ATSScoreDisplay({ resumeTitle, onRunNew }: Props) {
  const score = 87;
  const circumference = 2 * Math.PI * 60;
  const dash = (score / 100) * circumference;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
        <div className="flex items-center justify-between mb-4">
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ATS Score</p>
            <p className="text-xs text-gray-400 truncate max-w-[120px]">{resumeTitle}</p>
          </div>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">Good</span>
        </div>

        <div className="relative w-36 h-36 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
            <circle cx="72" cy="72" r="60" fill="none" stroke="#EEF2FF" strokeWidth="12"/>
            <circle cx="72" cy="72" r="60" fill="none" stroke="url(#scoreGrad)" strokeWidth="12"
              strokeDasharray={`${dash} ${circumference - dash}`} strokeLinecap="round"/>
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1"/>
                <stop offset="100%" stopColor="#8b5cf6"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-indigo-600">{score}</span>
            <span className="text-xs text-gray-400">/ 100</span>
          </div>
        </div>

        <p className="text-sm font-bold text-green-600 mb-1">Likely to Pass ATS</p>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">A few improvements could push your score to 95+. Fix missing keywords and summary metrics.</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {quickStats.map(s => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
              <div className="w-5 h-5 flex items-center justify-center mx-auto mb-1"><i className={`${s.icon} ${s.color} text-base`}></i></div>
              <p className="text-xs font-bold text-gray-800">{s.label}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2.5 mb-5">
          {subScores.map(m => (
            <div key={m.label} className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16 text-left font-medium">{m.label}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.v}%` }}></div>
              </div>
              <span className={`text-xs font-bold w-7 text-right ${m.textColor}`}>{m.v}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <button className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap text-sm shadow-md shadow-indigo-100">
            Apply All Fixes
          </button>
          <button className="w-full border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all cursor-pointer whitespace-nowrap text-sm flex items-center justify-center gap-1.5">
            <i className="ri-download-line text-sm"></i>Download Report
          </button>
          <button onClick={onRunNew} className="w-full text-xs text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer py-1 whitespace-nowrap">
            ↩ Check another resume
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-5 text-white">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-xl flex-shrink-0">
            <i className="ri-magic-line text-white text-sm"></i>
          </div>
          <div>
            <p className="text-sm font-bold mb-1">Fix with AI in 1 click</p>
            <p className="text-xs text-indigo-200 leading-relaxed mb-3">Let AI rewrite your summary, inject missing keywords, and strengthen your bullets automatically.</p>
            <button className="bg-white text-indigo-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer whitespace-nowrap">Try AI Auto-Fix →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
