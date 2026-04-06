'use client';
import { useState } from 'react';

interface Application {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';
  applied_at: string;
  notes: string | null;
}

// Temporary mock data until we implement server actions
const mockApplications: Application[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Senior Software Engineer',
    status: 'interview',
    applied_at: new Date().toISOString(),
    notes: null,
  },
  {
    id: '2',
    company: 'Meta',
    position: 'Product Manager',
    status: 'applied',
    applied_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: null,
  },
];

export function ApplicationList() {
  const applications = mockApplications;
  const [openMenu, setOpenMenu] = useState<string|null>(null);
  const [filter, setFilter] = useState('All');
  const filters = ['All','Applied','Interviewing','Offer','Rejected'];

  const shown = filter === 'All' ? applications : applications.filter((a) => a.status === (filter.toLowerCase() as Application['status']));
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
        {shown.map(a => {
          const statusColors = {
            applied: 'bg-blue-100 text-blue-800',
            screening: 'bg-yellow-100 text-yellow-800',
            interview: 'bg-yellow-100 text-yellow-800',
            offer: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
          };
          const color = statusColors[a.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
          const formattedDate = new Date(a.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          
          return (
            <div key={a.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 font-bold text-sm">{a.company[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{a.position}</p>
                <p className="text-xs text-gray-500">{a.company}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${color}`}>{a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span>
              <p className="text-xs text-gray-400 w-24 text-right whitespace-nowrap">{formattedDate}</p>
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
          );
        })}
      </div>
    </div>
  );
}
