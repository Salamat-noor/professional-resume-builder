import Link from 'next/link';

export default function LandingCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-8 right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-full mb-8">
          <div className="w-4 h-4 flex items-center justify-center"><i className="ri-rocket-line"></i></div>
          Join 50,000+ job seekers already using ClarityCV
        </div>
        <h2 className="text-5xl font-bold text-white mb-5 leading-tight">Ready to land your<br />dream job?</h2>
        <p className="text-xl text-indigo-100 mb-10 max-w-xl mx-auto">Start building for free. No credit card, no limits on what you can create. Your next career move starts here.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/auth" className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-xl whitespace-nowrap cursor-pointer text-lg">Start Building Free</Link>
          <Link href="/templates" className="border border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer text-lg">Browse Templates</Link>
        </div>
        <div className="flex items-center justify-center gap-8 mt-10">
          {['No credit card required','14-day money-back guarantee','Cancel anytime'].map(t => (
            <div key={t} className="flex items-center gap-2 text-indigo-200 text-sm">
              <div className="w-4 h-4 flex items-center justify-center"><i className="ri-checkbox-circle-fill text-green-400"></i></div>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
