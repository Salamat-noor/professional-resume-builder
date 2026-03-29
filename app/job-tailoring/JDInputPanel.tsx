'use client';
import { useState } from 'react';

interface Props { onAnalyze: () => void; }

const sampleJD = `Senior Product Manager — Payments Platform
Stripe · San Francisco, CA (Hybrid)

We're looking for a Senior PM to own our payments SDK product. You'll drive a product roadmap that impacts 8,000+ enterprise customers.

Responsibilities:
• Own product strategy and roadmap for core payments infrastructure
• Lead cross-functional teams across Engineering, Design, and Data Science
• Define OKRs, analyze metrics, and run A/B experiments
• Collaborate with enterprise customers on feature requirements
• Partner with GTM to drive adoption and revenue growth

Requirements:
• 5+ years of product management experience
• Strong analytical skills with experience in SQL or data tools
• Experience in B2B SaaS or fintech
• Excellent stakeholder management and communication
• Track record of shipping high-impact features at scale`;

export default function JDInputPanel({ onAnalyze }: Props) {
  const [jd, setJd] = useState(sampleJD);
  const [loading, setLoading] = useState(false);
  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onAnalyze(); }, 1500);
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Job Description</h2>
        <button onClick={() => setJd('')} className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer whitespace-nowrap">Clear</button>
      </div>
      <textarea value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste the full job description here..." rows={16} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 resize-none leading-relaxed" />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{jd.length} / 10,000 characters</span>
        <div className="flex items-center gap-2">
          <select className="text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none pr-8 cursor-pointer bg-white appearance-none">
            <option>Strict match</option>
            <option>Flexible match</option>
          </select>
        </div>
      </div>
      <button onClick={handleAnalyze} disabled={!jd || loading} className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2">
        {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Analyzing...</> : <><div className="w-4 h-4 flex items-center justify-center"><i className="ri-sparkling-2-line"></i></div>Analyze & Tailor</>}
      </button>
      <p className="text-xs text-center text-gray-400">AI will extract keywords and suggest resume improvements</p>
    </div>
  );
}
