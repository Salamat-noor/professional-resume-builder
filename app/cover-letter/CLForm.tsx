'use client';

interface FormData { 
  company: string; 
  manager: string; 
  jobTitle: string; 
  tone: string;
  jobDescription: string;
}

interface Props { 
  formData: FormData; 
  onChange: (d: FormData) => void; 
  onGenerate: () => void;
  loading: boolean;
}

export default function CLForm({ formData, onChange, onGenerate, loading }: Props) {
  const update = (k: keyof FormData, v: string) => onChange({ ...formData, [k]: v });
  
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-base font-bold text-gray-900">Cover Letter Details</h2>
      <div className="space-y-3">
        <div><label className="text-xs font-semibold text-gray-700 block mb-1.5">Company Name *</label>
          <input value={formData.company} onChange={e => update('company', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" /></div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1.5">Hiring Manager Name <span className="text-gray-400 font-normal">(optional)</span></label>
          <input value={formData.manager} onChange={e => update('manager', e.target.value)} placeholder="e.g. Alex Rivera" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" /></div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1.5">Job Title *</label>
          <input value={formData.jobTitle} onChange={e => update('jobTitle', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" /></div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1.5">Job Description <span className="text-gray-400 font-normal">(for better matching)</span></label>
          <textarea 
            value={formData.jobDescription} 
            onChange={e => update('jobDescription', e.target.value)}
            placeholder="Paste the job description here for better tailored cover letter..."
            rows={4} 
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 resize-none leading-relaxed" 
          /></div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1.5">Tone</label>
          <div className="flex gap-2">
            {['Professional','Enthusiastic','Formal'].map(t => (
              <button key={t} onClick={() => update('tone', t)} className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${formData.tone === t ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1.5">Select Resume to Match</label>
          <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none pr-8 bg-white appearance-none cursor-pointer">
            <option>Senior Product Manager Resume</option><option>Product Lead – Google</option>
          </select>
        </div>
      </div>
      <button 
        onClick={onGenerate} 
        disabled={loading}
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Generating...</> : <><div className="w-4 h-4 flex items-center justify-center"><i className="ri-sparkling-2-line"></i></div>Generate with AI</>}
      </button>
    </div>
  );
}
