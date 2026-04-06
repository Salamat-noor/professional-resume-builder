import Link from 'next/link';
interface Props { annual: boolean; }
const plans = [
  { name:'Free', m:'0', y:'0', desc:'Perfect for getting started', cta:'Get Started Free', href:'/auth', style:'border-border hover:border-primary/30 bg-card', btn:'border border-border text-foreground hover:border-primary hover:bg-primary/5',
    features:['1 active resume','5 AI credits per day','10 resume templates','PDF export','Basic ATS score'], miss:['Job tailoring','Cover letters','Application tracker','Priority support','DOCX export'] },
  { name:'Pro', m:'12', y:'9', desc:'For serious job seekers', cta:'Start 14-Day Free Trial', href:'/auth', style:'border-primary shadow-xl shadow-primary/10 bg-card ring-1 ring-primary/20', btn:'bg-primary text-primary-foreground hover:bg-primary/90', popular:true,
    features:['Unlimited resumes','Unlimited AI credits','40+ premium templates','PDF & DOCX export','Advanced ATS checker','Job description tailoring','Cover letter builder','Application tracker','Priority support'], miss:[] },
  { name:'Teams', m:'39', y:'29', desc:'For coaches and hiring teams', cta:'Contact Sales', href:'/', style:'border-border hover:border-primary/30 bg-card', btn:'border border-border text-foreground hover:border-primary hover:bg-primary/5',
    features:['Everything in Pro','Up to 10 team members','Admin dashboard','Custom templates','Team analytics','Dedicated support','SSO/SAML login','API access'], miss:[] },
];
export function PricingCards({ annual }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {plans.map(p => (
          <div key={p.name} className={`relative rounded-2xl border-2 p-6 lg:p-8 transition-all flex flex-col h-full ${p.style}`}>
            {p.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap shadow-lg">MOST POPULAR</div>}
            <div className="flex-shrink-0">
              <h3 className="text-xl font-bold text-foreground mb-1">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{p.desc}</p>
              <div className="mb-6">
                <span className="text-4xl lg:text-5xl font-bold text-foreground">${annual ? p.y : p.m}</span>
                <span className="text-muted-foreground ml-1 text-base">/mo</span>
                {annual && p.m !== '0' && <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-semibold">Save 25%</span>}
              </div>
            </div>
            <Link href={p.href} className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm mb-6 transition-all cursor-pointer whitespace-nowrap ${p.btn}`}>{p.cta}</Link>
            <div className="border-t border-border pt-5 flex-grow">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">What&apos;s included</p>
              <ul className="space-y-2.5">
                {p.features.map(f => <li key={f} className="flex items-center gap-2.5 text-sm text-foreground"><div className="w-4 h-4 flex items-center justify-center flex-shrink-0"><i className="ri-checkbox-circle-fill text-green-500 text-base"></i></div>{f}</li>)}
                {p.miss.map(f => <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground/60"><div className="w-4 h-4 flex items-center justify-center flex-shrink-0"><i className="ri-close-circle-line text-muted-foreground/40 text-base"></i></div>{f}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground mt-8">All paid plans include 14-day money-back guarantee · Cancel anytime · No hidden fees</p>
    </section>
  );
}
