'use client';
import { useState } from 'react';
const faqs = [
  { q:'Can I try Pro before paying?', a:'Yes! Every new account gets a 14-day free trial of Pro with no credit card required. You\'ll only be charged after the trial ends if you choose to continue.' },
  { q:'What is an ATS and why does it matter?', a:'Applicant Tracking Systems (ATS) are software used by 99% of Fortune 500 companies to filter resumes before a human sees them. Our ATS checker ensures your resume passes these filters.' },
  { q:'Can I cancel my subscription anytime?', a:'Absolutely. Cancel anytime with no cancellation fees. Your Pro features remain active until the end of your billing period.' },
  { q:'Does AI write my entire resume for me?', a:'ClarityCV\'s AI enhances and improves what you write — rewriting bullets for more impact, generating summaries, and matching keywords. You stay in control of your story.' },
  { q:'Are my resumes saved securely?', a:'Yes. All your data is encrypted at rest and in transit. We never share your personal information with third parties.' },
  { q:'Can I download my resume as a Word document?', a:'DOCX export is available on Pro and Teams plans. Free plan supports PDF export only.' },
];
export default function PricingFAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
          <p className="text-gray-600">Everything you need to know about ClarityCV.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-900 text-sm pr-4">{f.q}</span>
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0"><i className={`${open === i ? 'ri-subtract-line' : 'ri-add-line'} text-indigo-600`}></i></div>
              </button>
              {open === i && <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
