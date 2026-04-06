'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { getAllTemplates, getTemplateComponent } from '@/lib/templates/registry';
import { TemplateConfig, TemplateId, Resume, DesignState } from '@/types/builder';

// Sample resume data for preview
const sampleResume = {
  contact: {
    name: 'Sarah Johnson',
    role: 'Senior Product Designer',
    email: 'sarah@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarah',


    website: null,
    github: null,
    portfolio: null
  },
  summary: 'Creative product designer with 8+ years of experience crafting user-centered digital experiences. Passionate about solving complex problems through elegant, intuitive design solutions.',
  experience: [
    {
      title: 'Senior Product Designer',
      company: 'TechCorp Inc.',
      period: '2021 - Present',
      bullets: [
        'Led design system initiative resulting in 40% faster development cycles',
        'Mentored team of 5 junior designers',
      ],
      location: null
    },
    {
      title: 'Product Designer',
      company: 'StartupXYZ',
      period: '2018 - 2021',
      bullets: [
        'Designed mobile app with 2M+ downloads',
        'Improved conversion rate by 35%',
      ],
      location: null
    },
  ],
  education: [
    {
      degree: 'BFA in Graphic Design',
      institution: 'California College of the Arts',
      period: '2014 - 2018',
      location: null,
      gpa: null,
      honors: null

    },
  ],
  skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'UI/UX', 'Adobe CC'],
  projects: [
    {
      name: 'Design System Pro',
      description: 'Comprehensive component library used by 50+ teams',
      technologies: ['Figma', 'React', 'Storybook'],
    },
  ],
  certifications: [
    { name: 'Google UX Certificate', issuer: 'Google', date: '2023' },
  ],
  languages: [
    { name: 'English', proficiency: 'native' },
    { name: 'Spanish', proficiency: 'conversational' },
  ],
  achievements: [
    { title: 'Design Excellence Award', description: 'Recognized for outstanding contribution to product design' },
  ],
  volunteer: null,
  publications: null,
  interests: ['Photography', 'Travel', 'Art'],
};

const defaultDesign: DesignState = {
  color: '#4F46E5',
  font: 'Inter',
  spacing: 1,
  template: 'template-one',
};

interface Props {
  filter: string;
  search: string;
}

// Template preview card with scaled live template
function TemplatePreview({ template, design }: { template: TemplateConfig; design: DesignState }) {
  const TemplateComponent = getTemplateComponent(template.id);
  const designWithTemplate = { ...design, template: template.id };

  return (
    <div className="relative group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer">
      {template?.isPremium && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <i className="ri-vip-crown-line text-sm"></i>
          Premium
        </div>
      )}
      <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        ATS 95%+
      </div>

      {/* Live Template Preview */}
      <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-full h-full origin-top scale-[0.35] md:scale-[0.3]">
            <TemplateComponent
              resume={sampleResume}
              design={designWithTemplate}
              activeSection=""
              templateRef={{ current: null }}
            />
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/40 transition-all flex items-center justify-center">
        <Link
          href={`/builder/${template.id}`}
          className="bg-white text-indigo-600 font-bold px-5 py-2.5 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer whitespace-nowrap"
        >
          Use Template
        </Link>
      </div>

      {/* Template Info */}
      <div className="p-3 border-t border-gray-100 bg-white">
        <p className="font-semibold text-gray-900 text-sm">{template.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {template.sections.length} sections &bull; {template.isPremium ? 'Premium' : 'Free'}
        </p>
      </div>
    </div>
  );
}

export function TemplateGrid({ filter, search }: Props) {
  const templates = useMemo(() => getAllTemplates(), []);

  const shown = useMemo(() => {
    return templates.filter(t => {
      const matchesFilter = filter === 'All' ||
        (filter === 'Free' && !t.isPremium) ||
        (filter === 'Premium' && t.isPremium) ||
        t.name.toLowerCase() === filter.toLowerCase();
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [templates, filter, search]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {shown.map(template => (
        <TemplatePreview key={template.id} template={template} design={defaultDesign} />
      ))}
    </div>
  );
}
