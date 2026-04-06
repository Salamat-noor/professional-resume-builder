'use client';
import { useState } from 'react';

const resumes = [
  { id: '1', title: 'Senior Product Manager', company: 'Stripe Application', ats: 96, date: 'Edited 2h ago', status: 'Active' },
  { id: '2', title: 'Product Lead – Google', company: 'Tailored for Google', ats: 92, date: 'Edited yesterday', status: 'Draft' },
  { id: '3', title: 'Head of Product – Series A', company: 'General Purpose', ats: 88, date: 'Edited 3 days ago', status: 'Draft' },
];

const checks = [
  { icon: 'ri-file-text-line', label: 'Formatting & Structure', desc: 'Headers, sections, fonts, spacing' },
  { icon: 'ri-search-eye-line', label: 'Keyword Density', desc: 'Job-relevant terms and phrases' },
  { icon: 'ri-layout-line', label: 'Readability Score', desc: 'Parsing ease for ATS systems' },
  { icon: 'ri-bar-chart-line', label: 'Content Quality', desc: 'Bullet strength and impact metrics' },
  { icon: 'ri-contacts-line', label: 'Contact Completeness', desc: 'Name, email, phone, LinkedIn' },
  { icon: 'ri-calendar-check-line', label: 'Date Consistency', desc: 'Chronology and date formats' },
];

interface Props { onSelect: (id: string, title: string) => void; }

export function ATSUpload({ onSelect }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
          <div className="w-4 h-4 flex items-center justify-center"><i className="ri-shield-check-line"></i></div>
          Free ATS Analysis
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">How ATS-Ready Is Your Resume?</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">Upload or select a resume and get an instant compatibility score with actionable fixes to help you land more interviews.</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center"><i className="ri-file-list-3-line text-indigo-500"></i></div>
            Select an Existing Resume
          </h2>
          <div className="space-y-3">
            {resumes.map(r => (
              <div key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedId === r.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${selectedId === r.id ? 'bg-indigo-600' : 'bg-gray-100'}`}>
                    <i className={`ri-file-text-fill text-lg ${selectedId === r.id ? 'text-white' : 'text-gray-400'}`}></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{r.title}</p>
                    <p className="text-xs text-gray-400">{r.company} · {r.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.ats >= 90 ? 'bg-green-100 text-green-700' : r.ats >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    ATS {r.ats}
                  </div>
                  {selectedId === r.id && (
                    <div className="w-5 h-5 flex items-center justify-center bg-indigo-600 rounded-full">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            disabled={!selectedId}
            onClick={() => selectedId && onSelect(selectedId, resumes.find(r => r.id === selectedId)?.title || '')}
            className={`mt-4 w-full py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${selectedId ? 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer shadow-lg shadow-indigo-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            Run ATS Check →
          </button>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center"><i className="ri-upload-cloud-line text-indigo-500"></i></div>
            Upload a New Resume
          </h2>
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); onSelect('upload', 'Uploaded Resume'); }}
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30'}`}>
            <div className="w-16 h-16 flex items-center justify-center bg-indigo-50 rounded-2xl mx-auto mb-4">
              <i className="ri-upload-cloud-2-line text-3xl text-indigo-500"></i>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Drop your resume here</p>
            <p className="text-xs text-gray-400 mb-4">PDF, DOCX, or TXT · Max 5MB</p>
            <button
              onClick={() => onSelect('upload', 'Uploaded Resume')}
              className="bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
              Browse File
            </button>
          </div>

          <div className="mt-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5">
            <p className="text-xs font-bold text-indigo-700 mb-3 uppercase tracking-wider">What We Analyze</p>
            <div className="grid grid-cols-2 gap-2.5">
              {checks.map(c => (
                <div key={c.label} className="flex items-start gap-2">
                  <div className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0"><i className={`${c.icon} text-indigo-500 text-xs`}></i></div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{c.label}</p>
                    <p className="text-xs text-gray-500">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <p className="text-xs text-center text-gray-400 mb-6">Trusted by 120,000+ job seekers · 98% satisfaction · Bank-level encryption</p>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: 'ri-timer-flash-line', label: '< 30 sec', desc: 'Analysis time' },
            { icon: 'ri-robot-2-line', label: 'AI-powered', desc: 'Deep NLP scanning' },
            { icon: 'ri-shield-keyhole-line', label: 'Private', desc: 'Never stored or shared' },
            { icon: 'ri-award-line', label: '94% pass rate', desc: 'After applying fixes' },
          ].map(s => (
            <div key={s.label} className="text-center p-4 bg-white rounded-2xl border border-gray-100">
              <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2"><i className={`${s.icon} text-xl text-indigo-500`}></i></div>
              <p className="text-sm font-bold text-gray-900">{s.label}</p>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
