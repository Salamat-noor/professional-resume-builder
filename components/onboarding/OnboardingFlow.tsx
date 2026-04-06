'use client';
import { useState } from 'react';
import Link from 'next/link';

const roles = [
  { id: 'eng', icon: 'ri-code-s-slash-line', label: 'Software Engineer' },
  { id: 'pm', icon: 'ri-road-map-line', label: 'Product Manager' },
  { id: 'design', icon: 'ri-palette-line', label: 'Designer / UX' },
  { id: 'mkt', icon: 'ri-megaphone-line', label: 'Marketing' },
  { id: 'sales', icon: 'ri-bar-chart-line', label: 'Sales / BD' },
  { id: 'other', icon: 'ri-user-3-line', label: 'Other' },
];
const levels = [
  { id: 'entry', label: 'Entry Level', desc: '0–2 years of experience' },
  { id: 'mid', label: 'Mid-Level', desc: '3–5 years of experience' },
  { id: 'senior', label: 'Senior', desc: '6–10 years of experience' },
  { id: 'exec', label: 'Executive', desc: '10+ years of experience' },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');
  const progress = (step / 3) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        {[1,2,3].map(s => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${s < step ? 'bg-indigo-600 text-white' : s === step ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
              {s < step ? <i className="ri-check-line"></i> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-1 rounded-full ${s < step ? 'bg-indigo-600' : 'bg-gray-100'}`}></div>}
          </div>
        ))}
      </div>
      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden mb-6">
        <div className="h-full bg-indigo-600" style={{ width: `${progress}%` }} />
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">What type of role are you targeting?</h2>
          <p className="text-gray-500 text-sm mb-6">We&apos;ll personalize your resume experience based on your field.</p>
          <div className="grid grid-cols-3 gap-3">
            {roles.map(r => (
              <button key={r.id} onClick={() => setRole(r.id)} className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${role === r.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'}`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${role === r.id ? 'bg-indigo-100' : 'bg-gray-50'}`}><i className={`${r.icon} text-xl ${role === r.id ? 'text-indigo-600' : 'text-gray-500'}`}></i></div>
                <span className="text-sm font-medium text-gray-800">{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">What&apos;s your experience level?</h2>
          <p className="text-gray-500 text-sm mb-6">This helps us recommend the best templates and writing style.</p>
          <div className="space-y-3">
            {levels.map(l => (
              <button key={l.id} onClick={() => setLevel(l.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${level === l.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${level === l.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>{level === l.id && <div className="w-2 h-2 rounded-full bg-white"></div>}</div>
                <div><p className="font-semibold text-gray-900 text-sm">{l.label}</p><p className="text-xs text-gray-500">{l.desc}</p></div>
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="text-center py-6">
          <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-2xl mx-auto mb-4"><i className="ri-checkbox-circle-fill text-4xl text-green-500"></i></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re all set!</h2>
          <p className="text-gray-500 mb-6">Your personalized experience is ready. Let&apos;s build your first resume.</p>
          <Link href="/dashboard" className="inline-block bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">Go to Dashboard →</Link>
        </div>
      )}
      {step < 3 && (
        <div className="flex justify-between mt-8">
          <button onClick={() => setStep(Math.max(1, step-1))} className={`text-sm text-gray-500 hover:text-gray-700 px-4 py-2 cursor-pointer whitespace-nowrap ${step === 1 ? 'invisible' : ''}`}>← Back</button>
          <button onClick={() => setStep(step+1)} className="bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">Continue →</button>
        </div>
      )}
    </div>
  );
}
