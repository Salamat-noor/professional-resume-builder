'use client';
import { useState } from 'react';

interface Props { formData: { company: string; manager: string; jobTitle: string; tone: string; } }

export default function CLPreview({ formData }: Props) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Preview</h2>
        <div className="flex gap-2">
          <button onClick={() => setEditing(!editing)} className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${editing ? 'bg-indigo-50 border-indigo-300 text-indigo-600' : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}>{editing ? 'Done Editing' : 'Edit'}</button>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-indigo-300 cursor-pointer whitespace-nowrap">Download PDF</button>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 font-serif text-gray-800 leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
        <div className="text-right text-sm text-gray-500 mb-6">March 27, 2025</div>
        <div className="mb-4 text-sm">
          <p>{formData.manager || 'Hiring Manager'}</p>
          <p>{formData.jobTitle} Hiring Team</p>
          <p className="font-semibold">{formData.company || 'Company'}</p>
        </div>
        <p className="text-sm mb-4">Dear {formData.manager ? `${formData.manager}` : 'Hiring Manager'},</p>
        <div className={`text-sm space-y-3 ${editing ? 'border border-indigo-200 rounded-lg p-3 bg-white' : ''}`}>
          <p>I am writing to express my strong interest in the <strong>{formData.jobTitle}</strong> role at <strong>{formData.company}</strong>. With over 8 years of product management experience in high-growth B2B SaaS companies, I have consistently driven significant business outcomes through strategic product leadership.</p>
          <p>In my current role as Product Lead at Stripe, I grew platform ARR by 42% through data-driven feature prioritization and led a cross-functional team of 14 engineers, designers, and data scientists. I launched a payments SDK now used by over 8,000 enterprise customers — exactly the type of high-impact, technically complex product challenge that excites me about this opportunity.</p>
          <p>I am particularly drawn to {formData.company}'s mission and the scale of problem you are tackling. I believe my background in payments infrastructure, combined with a strong track record of stakeholder management and go-to-market execution, would allow me to make an immediate and meaningful contribution to your team.</p>
          <p>I would love the opportunity to discuss how my experience aligns with your needs. Thank you for considering my application.</p>
        </div>
        <p className="text-sm mt-4">Sincerely,</p>
        <p className="text-sm font-bold mt-1">Jordan Anderson</p>
        <p className="text-xs text-gray-500 mt-0.5">jordan@example.com · +1 (415) 555-0142</p>
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>Matched to: Senior Product Manager Resume</span>
        <button className="text-indigo-500 hover:underline cursor-pointer whitespace-nowrap">Save Draft</button>
      </div>
    </div>
  );
}
