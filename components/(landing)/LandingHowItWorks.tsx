import Image from "next/image";

const steps = [
  { num: '01', icon: 'ri-layout-grid-line', title: 'Pick a Template', desc: 'Choose from 40+ ATS-optimized templates designed by professional recruiters and career coaches.' },
  { num: '02', icon: 'ri-edit-2-line', title: 'Add Your Content', desc: 'Fill in your experience, skills, and education. Our smart editor formats everything perfectly.' },
  { num: '03', icon: 'ri-sparkling-2-line', title: 'Let AI Enhance It', desc: 'Use AI to rewrite bullets with impact, generate your summary, and match job descriptions.' },
  { num: '04', icon: 'ri-download-cloud-line', title: 'Export & Apply', desc: 'Download a pixel-perfect PDF optimized for both ATS systems and human hiring managers.' },
];

export default function LandingHowItWorks() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Simple Process</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">From blank page to job offer</h2>
          <p className="text-lg text-muted-foreground">Create a professional resume in under 15 minutes. No design skills required.</p>
        </div>
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-px bg-border hidden md:block" style={{left:'12.5%', right:'12.5%'}}></div>
          <div className="grid grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="relative text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary/10 border-2 border-card shadow-md mx-auto mb-5 relative z-10">
                  <i className={`${s.icon} text-2xl text-primary`}></i>
                </div>
                <span className="text-xs font-bold text-primary/50 tracking-widest">{s.num}</span>
                <h3 className="text-lg font-bold text-foreground mt-1 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/5 dark:to-blue-950/20 rounded-3xl p-10 flex items-center gap-10">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">See it in action</h3>
            <p className="text-muted-foreground mb-5">Watch how our AI transforms a basic resume into a job-winning document in real time.</p>
            <button className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap">
              <div className="w-5 h-5 flex items-center justify-center"><i className="ri-play-circle-line text-lg"></i></div>
              Watch Demo (2 min)
            </button>
          </div>
          <div className="w-80 h-48 rounded-2xl overflow-hidden shadow-xl bg-muted relative">
            <Image fill src="https://readdy.ai/api/search-image?query=modern%20resume%20builder%20web%20application%20interface%20on%20laptop%20screen%20showing%20AI%20writing%20assistant%20and%20resume%20preview%20side%20by%20side%20clean%20indigo%20blue%20UI%20professional%20SaaS%20product%20screenshot%20realistic&width=640&height=384&seq=demo1&orientation=landscape" alt="Demo" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
              <div className="w-14 h-14 flex items-center justify-center bg-card/90 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"><i className="ri-play-fill text-2xl text-primary ml-1"></i></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
