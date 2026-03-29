'use client';
import { useState } from 'react';
import Link from 'next/link';

const resumes = [
  { id: '1', title: 'Senior Product Manager', company: 'Stripe Application', date: 'Edited 2h ago', ats: 96, status: 'Active', img: 'https://readdy.ai/api/search-image?query=clean%20professional%20resume%20document%20white%20background%20minimal%20typography%20indigo%20blue%20accents%20single%20page%20layout&width=300&height=400&seq=r1&orientation=portrait' },
  { id: '2', title: 'Product Lead – Google', company: 'Tailored for Google', date: 'Edited yesterday', ats: 92, status: 'Draft', img: 'https://readdy.ai/api/search-image?query=modern%20two-column%20resume%20template%20white%20background%20blue%20sidebar%20professional%20layout%20clean%20typography&width=300&height=400&seq=r2&orientation=portrait' },
  { id: '3', title: 'Head of Product – Series A', company: 'General Purpose', date: 'Edited 3 days ago', ats: 88, status: 'Draft', img: 'https://readdy.ai/api/search-image?query=minimalist%20resume%20template%20clean%20white%20with%20subtle%20gray%20borders%20professional%20document%20layout%20elegant%20typography&width=300&height=400&seq=r3&orientation=portrait' },
];

const menuItems = ['Edit','Duplicate','Download','Rename','Delete'];

export default function ResumeGrid() {
  const [openMenu, setOpenMenu] = useState<string|null>(null);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Resumes</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Sort:</span>
          <button className="text-indigo-600 font-medium cursor-pointer whitespace-nowrap">Last Modified ↓</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {resumes.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all group overflow-hidden relative">
            <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
              <img src={r.img} alt={r.title} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/40 transition-all flex flex-col items-center justify-center gap-2">
                <Link href={`/builder/${r.id}`} className="bg-white text-indigo-600 font-semibold px-5 py-2.5 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer whitespace-nowrap shadow-lg">
                  Edit Resume
                </Link>
                <Link href={`/ats-checker?resumeId=${r.id}`} className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-lg" style={{ transitionDelay: '50ms' }}>
                  <i className="ri-shield-check-line text-sm"></i>ATS Check
                </Link>
              </div>
              <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">ATS {r.ats}</div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{r.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{r.company}</p>
                  <p className="text-xs text-gray-400 mt-1">{r.date}</p>
                </div>
                <div className="relative">
                  <button onClick={() => setOpenMenu(openMenu === r.id ? null : r.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer"><i className="ri-more-2-fill text-gray-400"></i></button>
                  {openMenu === r.id && (
                    <div className="absolute right-0 top-8 bg-white shadow-xl border border-gray-100 rounded-xl py-1 z-20 w-36">
                      {menuItems.map(m => <button key={m} onClick={() => setOpenMenu(null)} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer whitespace-nowrap ${m === 'Delete' ? 'text-red-500' : 'text-gray-700'}`}>{m}</button>)}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${r.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{r.status}</span>
              </div>
            </div>
          </div>
        ))}
        <Link href="/templates" className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-300 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer min-h-64 group">
          <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 group-hover:bg-indigo-100 rounded-2xl transition-colors"><i className="ri-add-line text-2xl text-indigo-600"></i></div>
          <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition-colors">Create New Resume</span>
        </Link>
      </div>
    </div>
  );
}
