'use client';
import { useState } from 'react';

const testimonials = [
  { name: 'Sarah Chen', role: 'Product Designer at Stripe', quote: 'ClarityCV completely transformed my job search. The AI bullet rewriter helped me quantify my impact in ways I never would have thought of myself. I went from zero callbacks to three offers in 6 weeks.', rating: 5, avatar: 'SC', color: 'bg-pink-400' },
  { name: 'Marcus Williams', role: 'Software Engineer at Google', quote: 'The ATS checker caught issues that were killing my applications silently. After fixing the keyword gaps it found, I started hearing back from companies I had been rejected from before. Absolute game changer.', rating: 5, avatar: 'MW', color: 'bg-blue-500' },
  { name: 'Priya Patel', role: 'Marketing Director at HubSpot', quote: 'I was skeptical about AI resume tools but ClarityCV is different. The job tailoring feature is insanely good — it actually understands the nuance of job descriptions and aligns your resume intelligently.', rating: 5, avatar: 'PP', color: 'bg-purple-500' },
];

export default function LandingTestimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Success Stories</p>
          <h2 className="text-4xl font-bold text-foreground">Hired. Promoted. Thriving.</h2>
        </div>
        <div className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden">
          <div className="grid grid-cols-5">
            <div className="col-span-2 bg-gradient-to-br from-primary to-blue-600 p-10 flex flex-col justify-between">
              <div>
                <div className={`w-20 h-20 rounded-2xl ${t.color} flex items-center justify-center text-2xl font-bold text-white mb-6`}>{t.avatar}</div>
                <h3 className="text-2xl font-bold text-white mb-1">{t.name}</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">{t.role}</p>
                <div className="flex gap-1">{[...Array(t.rating)].map((_,i) => <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>)}</div>
              </div>
              <div className="flex gap-3 mt-8">
                {testimonials.map((_,i) => <button key={i} onClick={() => setActive(i)} className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === active ? 'bg-white scale-125' : 'bg-white/40'}`}></button>)}
              </div>
            </div>
            <div className="col-span-3 p-12 flex flex-col justify-center">
              <div className="w-10 h-10 flex items-center justify-center mb-6"><i className="ri-double-quotes-l text-5xl text-primary/20"></i></div>
              <p className="text-xl text-foreground leading-relaxed mb-8 italic">&ldquo;{t.quote}&ldquo;</p>
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-8 h-8 flex items-center justify-center"><i className="ri-check-double-fill text-green-500 text-xl"></i></div>
                <p className="text-sm text-muted-foreground">Verified ClarityCV user · Resume built in 2025</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-8">
          {[{n:'50K+',l:'Resumes Created'},{n:'94%',l:'Interview Rate Increase'},{n:'3 Weeks',l:'Avg. Time to Offer'}].map(s => (
            <div key={s.l} className="text-center p-6 bg-card rounded-2xl border border-border shadow-sm">
              <p className="text-3xl font-bold text-primary mb-1">{s.n}</p>
              <p className="text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
