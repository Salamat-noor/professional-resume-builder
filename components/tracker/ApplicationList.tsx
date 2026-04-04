'use client';
import { useState } from 'react';

const apps = [
  { id: 1, company: 'Stripe', role: 'Senior Product Manager', status: 'Interviewing', date: 'Mar 15, 2025', stage: 'Round 2', color: 'bg-yellow-100 text-yellow-800' },
  { id: 2, company: 'Google', role: 'Product Lead, Payments', status: 'Applied', date: 'Mar 20, 2025', stage: 'Application Review', color: 'bg-blue-100 text-blue-800' },
  { id: 3, company: 'Airbnb', role: 'Head of Product – Hosting', status: 'Offer', date: 'Feb 28, 2025', stage: '🎉 Offer Received', color: 'bg-green-100 text-green-800' },
  { id: 4, company: 'Linear', role: 'Product Manager', status: 'Applied', date: 'Mar 22, 2025', stage: 'Application Review', color: 'bg-blue-100 text-blue-800' },
  { id: 5, company: 'Notion', role: 'Senior PM, Enterprise', status: 'Interviewing', date: 'Mar 10, 2025', stage: 'Take-home Assignment', color: 'bg-yellow-100 text-yellow-800' },
  { id: 6, company: 'Figma', role: 'Product Manager II', status: 'Rejected', date: 'Mar 5, 2025', stage: 'After phone screen', color: 'bg-red-100 text-red-800' },
  { id: 7, company: 'Vercel', role: 'PM, Developer Platform', status: 'Applied', date: 'Mar 25, 2025', stage: 'Application Review', color: 'bg-blue-100 text-blue-800' },
];

export function ApplicationList() {
  const [openMenu, setOpenMenu] = useState<number|null>(null);
  const [filter, setFilter] = useState('All');
  const filters = ['All','Applied','Interviewing','Offer','Rejected'];
  const shown = filter === 'All' ? apps : apps.filter(a => a.status === filter);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b border-gray-100">
        {filters.map(f => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${filter === f ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>{f}</button>)}
        <div className="ml-auto flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5">
          <div className="w-3 h-3 flex items-center justify-center"><i className="ri-search-line text-gray-400 text-xs"></i></div>
          <input placeholder="Search..." className="text-xs focus:outline-none bg-transparent w-32" />
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {shown.map(a => (
          <div key={a.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold text-sm">{a.company[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{a.role}</p>
              <p className="text-xs text-gray-500">{a.company} · {a.stage}</p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${a.color}`}>{a.status}</span>
            <p className="text-xs text-gray-400 w-24 text-right whitespace-nowrap">{a.date}</p>
            <div className="relative">
              <button onClick={() => setOpenMenu(openMenu === a.id ? null : a.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="ri-more-2-fill text-gray-500 text-sm"></i>
              </button>
              {openMenu === a.id && (
                <div className="absolute right-0 top-8 bg-white shadow-xl border border-gray-100 rounded-xl py-1 z-20 w-40">
                  {['View Details','Add Note','Schedule Follow-up','Mark as Rejected','Delete'].map(m => (
                    <button key={m} onClick={() => setOpenMenu(null)} className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer whitespace-nowrap ${m === 'Delete' || m === 'Mark as Rejected' ? 'text-red-500' : 'text-gray-700'}`}>{m}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
