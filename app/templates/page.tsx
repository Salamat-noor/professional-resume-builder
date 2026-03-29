'use client';
import AppSidebar from '@/components/AppSidebar';
import TemplateFilters from './TemplateFilters';
import TemplateGrid from './TemplateGrid';
import { useState } from 'react';

export default function TemplatesPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <main className="ml-60 flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Template Library</h1>
            <p className="text-sm text-gray-500 mt-0.5">40+ ATS-optimized designs for every industry</p>
          </div>
          <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5">
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-search-line text-gray-400 text-sm"></i></div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..." className="text-sm focus:outline-none bg-transparent w-48" />
          </div>
        </div>
        <TemplateFilters active={filter} onSelect={setFilter} />
        <TemplateGrid filter={filter} search={search} />
      </main>
    </div>
  );
}
