'use client';
import { useState } from 'react';
import Link from 'next/link';

const plans = [
  { name: 'Free', price: { m: '0', y: '0' }, desc: 'Perfect for trying out ClarityCV', cta: 'Get Started', ctaStyle: 'border border-gray-200 text-gray-700 hover:border-indigo-300', features: ['1 active resume','5 AI credits / day','10 templates','PDF export','Basic ATS check'], missing: ['Job tailoring','Cover letters','Application tracker','Priority support'] },
  { name: 'Pro', price: { m: '12', y: '9' }, desc: 'For serious job seekers', cta: 'Start Free Trial', ctaStyle: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200', popular: true, features: ['Unlimited resumes','Unlimited AI credits','40+ templates','PDF + DOCX export','Advanced ATS checker','Job description tailoring','Cover letter builder','Application tracker','Priority support'], missing: [] },
  { name: 'Teams', price: { m: '39', y: '29' }, desc: 'For career coaches & teams', cta: 'Contact Sales', ctaStyle: 'border border-gray-200 text-gray-700 hover:border-indigo-300', features: ['Everything in Pro','Up to 10 team members','Admin dashboard','Custom templates','Team analytics','Dedicated support','SSO / SAML','API access'], missing: [] },
];

export default function LandingPricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full p-1 mt-2">
            <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${!annual ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${annual ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>Annual <span className="text-green-600 font-semibold ml-1">–25%</span></button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {plans.map(p => (
            <div key={p.name} className={`relative rounded-2xl p-8 ${p.popular ? 'border-2 border-indigo-600 shadow-xl' : 'border border-gray-200'}`}>
              {p.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">MOST POPULAR</div>}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{p.desc}</p>
              <div className="mb-5"><span className="text-5xl font-bold text-gray-900">${annual ? p.price.y : p.price.m}</span><span className="text-gray-500 ml-1">/mo</span></div>
              <Link href={p.name === 'Teams' ? '/' : '/auth'} className={`block w-full text-center py-3 rounded-xl font-semibold text-sm mb-6 transition-all cursor-pointer whitespace-nowrap ${p.ctaStyle}`}>{p.cta}</Link>
              <ul className="space-y-2.5">
                {p.features.map(f => <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700"><div className="w-4 h-4 flex items-center justify-center flex-shrink-0"><i className="ri-checkbox-circle-fill text-green-500"></i></div>{f}</li>)}
                {p.missing.map(f => <li key={f} className="flex items-center gap-2.5 text-sm text-gray-400"><div className="w-4 h-4 flex items-center justify-center flex-shrink-0"><i className="ri-close-circle-line text-gray-300"></i></div>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">All plans include 14-day money-back guarantee · No credit card required for free plan</p>
      </div>
    </section>
  );
}
