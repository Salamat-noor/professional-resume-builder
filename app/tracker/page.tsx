'use client';
import AppSidebar from '@/components/AppSidebar';
import TrackerStats from './TrackerStats';
import ApplicationList from './ApplicationList';
import { useState } from 'react';

export default function TrackerPage() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <main className="ml-60 flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-gray-900">Application Tracker</h1><p className="text-sm text-gray-500 mt-0.5">Track every application, interview, and offer in one place</p></div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-add-line"></i></div>Add Application
          </button>
        </div>
        <TrackerStats />
        <ApplicationList />
        {showAdd && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7">
              <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-bold text-gray-900">Add Application</h2><button onClick={() => setShowAdd(false)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer"><i className="ri-close-line text-gray-500"></i></button></div>
              <div className="space-y-3">
                {[['Company Name','e.g. Google'],['Job Title','e.g. Senior PM'],['Job URL','https://...']].map(([l,p]) => <div key={l}><label className="text-xs font-semibold text-gray-700 block mb-1">{l}</label><input placeholder={p} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" /></div>)}
                <div><label className="text-xs font-semibold text-gray-700 block mb-1">Status</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none pr-8 bg-white appearance-none cursor-pointer"><option>Applied</option><option>Interviewing</option><option>Offer</option><option>Rejected</option></select></div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 cursor-pointer whitespace-nowrap">Cancel</button>
                <button onClick={() => setShowAdd(false)} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 cursor-pointer whitespace-nowrap">Add Application</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
