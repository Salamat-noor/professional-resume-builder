'use client';
import { useState } from 'react';

export default function ProfileSettings() {
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-5">
        <div className="flex items-center gap-5 mb-7 pb-7 border-b border-gray-100">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">JA</div>
            <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow cursor-pointer hover:border-indigo-400 hover:text-indigo-600 transition-colors">
              <i className="ri-camera-line text-xs text-gray-600"></i>
            </button>
          </div>
          <div>
            <p className="font-bold text-gray-900">Jordan Anderson</p>
            <p className="text-sm text-gray-500">jordan@example.com</p>
            <button className="text-xs text-indigo-600 hover:underline mt-1 cursor-pointer whitespace-nowrap">Change photo</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[['Full Name','Jordan Anderson'],['Email','jordan@example.com'],['Phone','+1 (415) 555-0142'],['Location','San Francisco, CA'],['LinkedIn URL','linkedin.com/in/jordan'],['Portfolio URL','jordananderson.design']].map(([l,v]) => (
            <div key={l}>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">{l}</label>
              <input defaultValue={v} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-1">Danger Zone</h3>
        <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button className="border border-red-300 text-red-600 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap">Delete Account</button>
      </div>
      <div className="flex justify-end">
        {saved && <span className="text-sm text-green-600 font-medium mr-4 flex items-center gap-1"><i className="ri-checkbox-circle-fill"></i>Changes saved!</span>}
        <button onClick={handleSave} className="bg-indigo-600 text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">Save Changes</button>
      </div>
    </div>
  );
}
