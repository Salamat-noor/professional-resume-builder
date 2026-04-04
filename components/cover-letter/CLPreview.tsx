'use client';
import { useState } from 'react';
import type { CoverLetter } from '@/lib/ai';

interface Props { 
  formData: { company: string; manager: string; jobTitle: string; tone: string; };
  generatedLetter: CoverLetter | null;
  loading: boolean;
}

export function CLPreview({ formData, generatedLetter, loading }: Props) {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  // Use generated content or fallback to template
  const displayContent = generatedLetter?.content || editedContent;
  const highlights = generatedLetter?.highlights || [];

  // Template content when no generated letter
  const templateContent = `I am writing to express my strong interest in the ${formData.jobTitle} role at ${formData.company}. With over 8 years of product management experience in high-growth B2B SaaS companies, I have consistently driven significant business outcomes through strategic product leadership.

In my current role as Product Lead at Stripe, I grew platform ARR by 42% through data-driven feature prioritization and led a cross-functional team of 14 engineers, designers, and data scientists. I launched a payments SDK now used by over 8,000 enterprise customers — exactly the type of high-impact, technically complex product challenge that excites me about this opportunity.

I am particularly drawn to ${formData.company}'s mission and the scale of problem you are tackling. I believe my background in payments infrastructure, combined with a strong track record of stakeholder management and go-to-market execution, would allow me to make an immediate and meaningful contribution to your team.

I would love the opportunity to discuss how my experience aligns with your needs. Thank you for considering my application.`;

  const contentToShow = displayContent || templateContent;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Preview</h2>
        <div className="flex gap-2">
          <button onClick={() => setEditing(!editing)} className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${editing ? 'bg-indigo-50 border-indigo-300 text-indigo-600' : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}>{editing ? 'Done Editing' : 'Edit'}</button>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-indigo-300 cursor-pointer whitespace-nowrap">Download PDF</button>
        </div>
      </div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
          <p className="text-xs font-semibold text-indigo-700 mb-2">Key Highlights:</p>
          <ul className="text-xs text-indigo-600 space-y-1">
            {highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-1">
                <span>•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 font-serif text-gray-800 leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <span className="ml-3 text-sm text-gray-500">Generating your cover letter...</span>
          </div>
        ) : (
          <>
            <div className="text-right text-sm text-gray-500 mb-6">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            <div className="mb-4 text-sm">
              <p>{formData.manager || 'Hiring Manager'}</p>
              <p>{formData.jobTitle} Hiring Team</p>
              <p className="font-semibold">{formData.company || 'Company'}</p>
            </div>
            <p className="text-sm mb-4">Dear {formData.manager ? `${formData.manager}` : 'Hiring Manager'},</p>
            
            {editing ? (
              <textarea
                value={contentToShow}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-64 p-3 text-sm border border-indigo-200 rounded-lg bg-white resize-none focus:outline-none focus:border-indigo-500"
              />
            ) : (
              <div className="text-sm space-y-3 whitespace-pre-line">
                {contentToShow}
              </div>
            )}
            
            <p className="text-sm mt-4">Sincerely,</p>
            <p className="text-sm font-bold mt-1">Jordan Anderson</p>
            <p className="text-xs text-gray-500 mt-0.5">jordan@example.com · +1 (415) 555-0142</p>
          </>
        )}
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>Matched to: Senior Product Manager Resume</span>
        <button className="text-indigo-500 hover:underline cursor-pointer whitespace-nowrap">Save Draft</button>
      </div>
    </div>
  );
}
