'use client';
import Link from 'next/link';

export default function DashHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage and build your professional resumes</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-white">
          <div className="w-4 h-4 flex items-center justify-center"><i className="ri-search-line text-gray-400 text-sm"></i></div>
          <input placeholder="Search resumes..." className="text-sm focus:outline-none bg-transparent w-44" />
        </div>
        <Link href="/builder/1" className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
          <div className="w-4 h-4 flex items-center justify-center"><i className="ri-add-line"></i></div>
          New Resume
        </Link>
      </div>
    </div>
  );
}
