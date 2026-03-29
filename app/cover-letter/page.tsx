'use client';
import AppSidebar from '@/components/AppSidebar';
import CLForm from './CLForm';
import CLPreview from './CLPreview';
import { useState } from 'react';

export default function CoverLetterPage() {
  const [formData, setFormData] = useState({ company: 'Stripe', manager: 'Alex Rivera', jobTitle: 'Senior Product Manager', tone: 'Professional' });
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <main className="ml-60 flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cover Letter Builder</h1>
          <p className="text-sm text-gray-500 mt-0.5">Generate personalized cover letters matched to your resume</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <CLForm formData={formData} onChange={setFormData} />
          <CLPreview formData={formData} />
        </div>
      </main>
    </div>
  );
}
