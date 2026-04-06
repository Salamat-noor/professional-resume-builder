const features = [
  { icon: 'ri-sparkling-2-line', color: 'bg-primary/10 text-primary', title: 'AI Writing Assistant', desc: 'Rewrite bullets with measurable impact, generate summaries, and improve clarity with one click.' },
  { icon: 'ri-shield-check-line', color: 'bg-green-50 text-green-600', title: 'ATS Optimization', desc: 'Instantly score your resume against ATS systems with keyword analysis and formatting checks.' },
  { icon: 'ri-layout-grid-line', color: 'bg-blue-50 text-blue-600', title: '40+ Premium Templates', desc: 'Choose from recruiter-approved templates designed for every industry and career level.' },
  { icon: 'ri-briefcase-4-line', color: 'bg-orange-50 text-orange-600', title: 'Job Description Tailoring', desc: 'Paste any job posting and ClarityCV auto-aligns your resume with the right keywords.' },
  { icon: 'ri-mail-send-line', color: 'bg-pink-50 text-pink-600', title: 'Cover Letter Builder', desc: 'Generate personalized, professional cover letters that match your resume in seconds.' },
  { icon: 'ri-kanban-view-2', color: 'bg-purple-50 text-purple-600', title: 'Application Tracker', desc: 'Track every job application, interview, and offer in one organized, visual dashboard.' },
];

export default function LandingFeatures() {
  return (
    <section className="py-24 bg-card" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Everything You Need</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">Professional tools for modern job seekers</h2>
          <p className="text-lg text-muted-foreground">From first draft to final offer — ClarityCV powers every step of your job search.</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-card rounded-2xl border border-border p-7 hover:shadow-xl hover:border-primary/20 transition-all group cursor-default">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${f.color} mb-5`}>
                <i className={`${f.icon} text-xl`}></i>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
              <span className="text-sm text-primary font-medium group-hover:gap-2 flex items-center gap-1 transition-all">Learn more <i className="ri-arrow-right-line"></i></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
