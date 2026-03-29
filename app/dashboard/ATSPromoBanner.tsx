'use client';
import Link from 'next/link';

export default function ATSPromoBanner() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-2xl overflow-hidden mb-8">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>
      <div className="relative flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-2xl flex-shrink-0">
            <i className="ri-shield-check-line text-white text-2xl"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white">Check Your ATS Score</h3>
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-0.5 rounded-full">Free</span>
            </div>
            <p className="text-sm text-indigo-200">Find out how your resume performs against Applicant Tracking Systems. Get instant fixes to land more interviews.</p>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">87%</p>
            <p className="text-xs text-indigo-300">Avg. score</p>
          </div>
          <div className="w-px h-10 bg-white/20"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">94%</p>
            <p className="text-xs text-indigo-300">Pass rate after fixes</p>
          </div>
          <div className="w-px h-10 bg-white/20"></div>
          <Link href="/ats-checker"
            className="flex items-center gap-2 bg-white text-indigo-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer whitespace-nowrap shadow-lg">
            <i className="ri-shield-check-line text-base"></i>
            Run ATS Check
          </Link>
        </div>
      </div>
    </div>
  );
}
