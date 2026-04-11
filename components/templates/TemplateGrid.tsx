'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TemplateConfig } from '@/types/builder';
import Image from 'next/image';

interface Props {
  filter: string;
  search: string;
}

async function getTemplates(): Promise<TemplateConfig[]> {
  const response = await fetch('/api/templates');
  if (!response.ok) {
    console.error('Error fetching templates', response);
    return [];
  }
  return response.json();
}

// Template preview card with scaled live template
function TemplatePreview({ template }: { template: TemplateConfig }) {
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
      <div className="aspect-[3/4] overflow-hidden bg-[rgba(0,0,0,0.9)] relative">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Image fill src={template?.thumbnail} alt={template?.category} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/40 transition-all flex items-center justify-center">
        <Link
          href={`/builder/${template?.template_id}`}
          className="bg-white text-indigo-600 font-bold px-5 py-2.5 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer whitespace-nowrap"
        >
          Use Template
        </Link>
      </div>

      {/* Template Info */}
      <div className="p-3 border-t border-gray-100 bg-white">
        <p className="font-semibold text-gray-900 text-sm">{template?.category}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {template?.sections?.length} sections &bull; {template?.isPremium ? 'Premium' : 'Free'}
        </p>
      </div>
    </div>
  );
}

export function TemplateGrid({ filter, search }: Props) {
  const [templates, setTemplates] = useState<TemplateConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTemplates().then(setTemplates).finally(() => setLoading(false));
  }, []);

  const shown = templates?.filter(t => {
    const matchesFilter = filter === 'All' ||
      (filter === 'Free' && !t?.isPremium) ||
      (filter === 'Premium' && t?.isPremium) ||
      t?.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = t?.category?.toLowerCase().includes(search.toLowerCase()) ||
      t?.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div>Loading templates...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {shown.map(template => (
        <TemplatePreview key={template.id} template={template} />
      ))}
    </div>
  );
}
