'use client';
import Link from 'next/link';
import { useState } from 'react';

interface Props { onExport: ()=>void; onUpgrade: ()=>void; resumeId: string; }

export default function BuilderTopBar({ onExport, onUpgrade, resumeId }: Props) {
  const [title, setTitle] = useState('Senior Product Manager Resume');
  const [editing, setEditing] = useState(false);
  return (
    <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="font-['Pacifico'] text-lg text-indigo-600 mr-2 whitespace-nowrap cursor-pointer">ClarityCV</Link>
        <div className="w-px h-5 bg-gray-200"></div>
        {editing ? (
          <input value={title} onChange={e => setTitle(e.target.value)} onBlur={() => setEditing(false)} autoFocus className="text-sm font-medium text-gray-900 border-b border-indigo-500 focus:outline-none bg-transparent" />
        ) : (
          <button onClick={() => setEditing(true)} className="text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
            {title} <i className="ri-pencil-line text-gray-400 text-xs"></i>
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>Saved 1m ago</div>
        <div className="w-px h-5 bg-gray-200 mx-1"></div>
        <Link href="/ats-checker" className="flex items-center gap-1.5 text-xs border border-gray-200 px-3 py-2 rounded-lg text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all cursor-pointer whitespace-nowrap">
          <div className="w-4 h-4 flex items-center justify-center"><i className="ri-shield-check-line"></i></div>ATS Check
        </Link>
        <button onClick={onExport} className="flex items-center gap-1.5 text-xs border border-gray-200 px-3 py-2 rounded-lg text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all cursor-pointer whitespace-nowrap">
          <div className="w-4 h-4 flex items-center justify-center"><i className="ri-download-2-line"></i></div>Export
        </button>
        <button onClick={onUpgrade} className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap font-semibold">
          <i className="ri-vip-crown-line mr-1"></i>Upgrade
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">JA</div>
      </div>
    </div>
  );
}
