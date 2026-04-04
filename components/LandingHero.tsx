'use client';
import Link from 'next/link';

const ResumePreview = () => (
  <div className="bg-card rounded-2xl shadow-2xl p-6 w-72 text-left border border-border">
    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-primary font-bold text-lg">JA</span>
      </div>
      <div>
        <p className="font-bold text-foreground text-sm">Jordan Anderson</p>
        <p className="text-xs text-primary">Senior Product Manager</p>
        <p className="text-xs text-muted-foreground">San Francisco, CA</p>
      </div>
    </div>
    <div className="mb-3">
      <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Experience</p>
      <div className="space-y-2">
        <div><p className="text-xs font-semibold text-foreground">Product Lead · Stripe</p><p className="text-xs text-muted-foreground">2022 – Present</p><p className="text-xs text-muted-foreground mt-0.5">• Grew ARR by 42% through data-driven feature prioritization</p></div>
        <div><p className="text-xs font-semibold text-foreground">PM II · Airbnb</p><p className="text-xs text-muted-foreground">2019 – 2022</p><p className="text-xs text-muted-foreground mt-0.5">• Led cross-functional team of 14 across 3 product lines</p></div>
      </div>
    </div>
    <div>
      <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Skills</p>
      <div className="flex flex-wrap gap-1">
        {['Strategy','Analytics','Figma','SQL','Roadmaps'].map(s => <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>)}
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
      <div className="w-6 h-6 flex items-center justify-center"><i className="ri-shield-check-fill text-green-500 text-sm"></i></div>
      <span className="text-xs font-semibold text-green-600">ATS Score: 96/100</span>
    </div>
  </div>
);

export default function LandingHero() {
  return (
    <section className="pt-28 pb-20 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-16">
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-sparkling-2-fill text-sm"></i></div>
            AI-Powered · ATS-Optimized · Hired Faster
          </div>
          <h1 className="text-6xl font-bold text-foreground leading-tight mb-5">
            Build Resumes<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">That Get You</span><br />
            Hired
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">Create ATS-optimized, professionally designed resumes with AI-powered writing assistance. Land interviews 3x faster.</p>
          <div className="flex items-center gap-4 mb-8">
            <Link href="/auth" className="bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 whitespace-nowrap cursor-pointer">Start Building Free</Link>
            <Link href="/templates" className="text-primary font-medium hover:text-primary/80 flex items-center gap-1.5 whitespace-nowrap cursor-pointer">See Templates <i className="ri-arrow-right-line"></i></Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['bg-primary','bg-blue-400','bg-purple-400','bg-pink-400'].map((c,i) => <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-background`}></div>)}
            </div>
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">50,000+</span> job seekers use ClarityCV</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute -top-8 -right-8 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
          <div className="relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <ResumePreview />
          </div>
          <div className="absolute -left-12 top-12 bg-card rounded-xl shadow-lg p-3 border border-border transform -rotate-6 z-20">
            <div className="flex items-center gap-2"><div className="w-5 h-5 flex items-center justify-center"><i className="ri-robot-2-line text-primary text-sm"></i></div><p className="text-xs font-semibold text-foreground">AI Improved your bullet</p></div>
            <p className="text-xs text-green-600 mt-0.5">+23% impact score</p>
          </div>
          <div className="absolute -right-4 bottom-8 bg-card rounded-xl shadow-lg p-3 border border-border transform rotate-3 z-20">
            <div className="flex items-center gap-2"><div className="w-5 h-5 flex items-center justify-center"><i className="ri-bar-chart-fill text-green-500 text-sm"></i></div><p className="text-xs font-semibold text-foreground">Interview Rate</p></div>
            <p className="text-lg font-bold text-foreground">3.2x <span className="text-xs text-green-600 font-normal">higher</span></p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-10 border-t border-border">
        <p className="text-xs text-center text-muted-foreground uppercase tracking-widest font-medium mb-6">Trusted by professionals at</p>
        <div className="flex items-center justify-center gap-12 opacity-50">
          {['Google','Stripe','Airbnb','Figma','Notion','Linear'].map(c => <span key={c} className="text-lg font-bold text-muted-foreground">{c}</span>)}
        </div>
      </div>
    </section>
  );
}
