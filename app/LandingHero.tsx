'use client';
import Link from 'next/link';

const ResumePreview = () => (
  <div className="bg-white rounded-2xl shadow-2xl p-6 w-72 text-left border border-gray-100">
    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
        <span className="text-indigo-600 font-bold text-lg">JA</span>
      </div>
      <div>
        <p className="font-bold text-gray-900 text-sm">Jordan Anderson</p>
        <p className="text-xs text-indigo-600">Senior Product Manager</p>
        <p className="text-xs text-gray-400">San Francisco, CA</p>
      </div>
    </div>
    <div className="mb-3">
      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5">Experience</p>
      <div className="space-y-2">
        <div><p className="text-xs font-semibold text-gray-800">Product Lead · Stripe</p><p className="text-xs text-gray-500">2022 – Present</p><p className="text-xs text-gray-600 mt-0.5">• Grew ARR by 42% through data-driven feature prioritization</p></div>
        <div><p className="text-xs font-semibold text-gray-800">PM II · Airbnb</p><p className="text-xs text-gray-500">2019 – 2022</p><p className="text-xs text-gray-600 mt-0.5">• Led cross-functional team of 14 across 3 product lines</p></div>
      </div>
    </div>
    <div>
      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1.5">Skills</p>
      <div className="flex flex-wrap gap-1">
        {['Strategy','Analytics','Figma','SQL','Roadmaps'].map(s => <span key={s} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{s}</span>)}
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
      <div className="w-6 h-6 flex items-center justify-center"><i className="ri-shield-check-fill text-green-500 text-sm"></i></div>
      <span className="text-xs font-semibold text-green-600">ATS Score: 96/100</span>
    </div>
  </div>
);

export default function LandingHero() {
  return (
    <section className="pt-28 pb-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-16">
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-sparkling-2-fill text-sm"></i></div>
            AI-Powered · ATS-Optimized · Hired Faster
          </div>
          <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-5">
            Build Resumes<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">That Get You</span><br />
            Hired
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">Create ATS-optimized, professionally designed resumes with AI-powered writing assistance. Land interviews 3x faster.</p>
          <div className="flex items-center gap-4 mb-8">
            <Link href="/auth" className="bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 whitespace-nowrap cursor-pointer">Start Building Free</Link>
            <Link href="/templates" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1.5 whitespace-nowrap cursor-pointer">See Templates <i className="ri-arrow-right-line"></i></Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['bg-indigo-400','bg-blue-400','bg-purple-400','bg-pink-400'].map((c,i) => <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white`}></div>)}
            </div>
            <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">50,000+</span> job seekers use ClarityCV</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute -top-8 -right-8 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
          <div className="relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <ResumePreview />
          </div>
          <div className="absolute -left-12 top-12 bg-white rounded-xl shadow-lg p-3 border border-gray-100 transform -rotate-6 z-20">
            <div className="flex items-center gap-2"><div className="w-5 h-5 flex items-center justify-center"><i className="ri-robot-2-line text-indigo-500 text-sm"></i></div><p className="text-xs font-semibold text-gray-700">AI Improved your bullet</p></div>
            <p className="text-xs text-green-600 mt-0.5">+23% impact score</p>
          </div>
          <div className="absolute -right-4 bottom-8 bg-white rounded-xl shadow-lg p-3 border border-gray-100 transform rotate-3 z-20">
            <div className="flex items-center gap-2"><div className="w-5 h-5 flex items-center justify-center"><i className="ri-bar-chart-fill text-green-500 text-sm"></i></div><p className="text-xs font-semibold text-gray-700">Interview Rate</p></div>
            <p className="text-lg font-bold text-gray-900">3.2x <span className="text-xs text-green-600 font-normal">higher</span></p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-10 border-t border-gray-100">
        <p className="text-xs text-center text-gray-400 uppercase tracking-widest font-medium mb-6">Trusted by professionals at</p>
        <div className="flex items-center justify-center gap-12 opacity-50">
          {['Google','Stripe','Airbnb','Figma','Notion','Linear'].map(c => <span key={c} className="text-lg font-bold text-gray-500">{c}</span>)}
        </div>
      </div>
    </section>
  );
}
