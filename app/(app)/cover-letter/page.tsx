'use client';
import { CLForm } from '@/components/cover-letter';
import { CLPreview } from '@/components/cover-letter';
import { useState } from 'react';
import { useCoverLetter } from '@/hooks/useAI';
import type { CoverLetter } from '@/lib/ai';

// Sample resume for demo - in production, this would come from context/store
const sampleResume = {
  contact: {
    name: "Alex Chen",
    role: "Senior Product Manager",
    location: "San Francisco, CA",
    email: "alex@example.com",
    phone: "+1 555-123-4567",
    linkedin: "linkedin.com/in/alexchen"
  },
  summary: "Experienced product manager with 8+ years in B2B SaaS and fintech",
  experience: [
    {
      title: "Senior Product Manager",
      company: "Stripe",
      period: "2020 - Present",
      bullets: ["Led product growth by 42%", "Managed cross-functional teams"]
    }
  ],
  education: [
    {
      degree: "MBA",
      institution: "Stanford University",
      period: "2018 - 2020"
    }
  ],
  skills: ["Product Management", "B2B SaaS", "Fintech", "Leadership"]
};

export default function CoverLetterPage() {
  const [formData, setFormData] = useState({ 
    company: 'Stripe', 
    manager: 'Alex Rivera', 
    jobTitle: 'Senior Product Manager', 
    tone: 'Professional',
    jobDescription: ''
  });
  const [generatedLetter, setGeneratedLetter] = useState<CoverLetter | null>(null);
  
  const { mutate: generateCoverLetter, isPending: loading } = useCoverLetter();

  const handleGenerate = () => {
    generateCoverLetter(
      {
        resume: sampleResume,
        jobDescription: formData.jobDescription || `Senior Product Manager role at ${formData.company}`,
        company: formData.company,
        hiringManager: formData.manager,
        tone: formData.tone,
      },
      {
        onSuccess: (data) => {
          setGeneratedLetter(data);
        },
      }
    );
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Cover Letter Builder</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Generate personalized cover letters matched to your resume</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <CLForm
          formData={formData}
          onChange={setFormData}
          onGenerate={handleGenerate}
          loading={loading}
        />
        <CLPreview
          formData={formData}
          generatedLetter={generatedLetter}
          loading={loading}
        />
      </div>
    </>
  );
}
