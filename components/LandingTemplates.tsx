'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const templates = [
  { name: 'Executive Pro', style: 'Modern', ats: 98, img: 'https://readdy.ai/api/search-image?query=professional%20executive%20resume%20template%20clean%20white%20background%20blue%20accent%20color%20elegant%20typography%20minimal%20layout%20with%20header%20experience%20skills%20sections%2C%20flat%20design%20print%20ready%20ATS%20friendly%20single%20page&width=480&height=640&seq=tpl1&orientation=portrait' },
  { name: 'Creative Edge', style: 'Creative', ats: 94, img: 'https://readdy.ai/api/search-image?query=modern%20creative%20resume%20template%20two%20column%20layout%20indigo%20sidebar%20white%20main%20section%20bold%20typography%20professional%20job%20seeker%20document%20design%20premium%20clean&width=480&height=640&seq=tpl2&orientation=portrait' },
  { name: 'Minimal Clean', style: 'Classic', ats: 99, img: 'https://readdy.ai/api/search-image?query=minimalist%20clean%20resume%20template%20white%20background%20black%20typography%20simple%20single%20column%20layout%20professional%20document%20with%20subtle%20gray%20borders%20and%20clean%20sections&width=480&height=640&seq=tpl3&orientation=portrait' },
  { name: 'Tech Stack', style: 'Modern', ats: 97, img: 'https://readdy.ai/api/search-image?query=tech%20professional%20resume%20template%20dark%20header%20section%20white%20body%20modern%20sans-serif%20typography%20skills%20section%20with%20tags%20software%20engineer%20developer%20cv%20design&width=480&height=640&seq=tpl4&orientation=portrait' },
  { name: 'Corporate Plus', style: 'Classic', ats: 96, img: 'https://readdy.ai/api/search-image?query=corporate%20professional%20resume%20template%20classic%20design%20navy%20blue%20accents%20traditional%20layout%20with%20clear%20section%20headers%20formal%20business%20document%20clean%20typography&width=480&height=640&seq=tpl5&orientation=portrait' },
  { name: 'Designer Focus', style: 'Creative', ats: 92, img: 'https://readdy.ai/api/search-image?query=designer%20portfolio%20resume%20template%20creative%20layout%20with%20color%20blocks%20modern%20typeface%20visual%20hierarchy%20purple%20accent%20portfolio%20section%20included%20clean%20elegant&width=480&height=640&seq=tpl6&orientation=portrait' },
  { name: 'Graduate Fresh', style: 'Modern', ats: 95, img: 'https://readdy.ai/api/search-image?query=entry%20level%20fresh%20graduate%20resume%20template%20clean%20simple%20white%20background%20green%20accent%20color%20modern%20layout%20education%20focus%20clean%20lines%20professional&width=480&height=640&seq=tpl7&orientation=portrait' },
  { name: 'Leadership Bold', style: 'Classic', ats: 97, img: 'https://readdy.ai/api/search-image?query=leadership%20executive%20resume%20template%20bold%20header%20dark%20section%20professional%20sophisticated%20layout%20with%20metrics%20focus%20achievement%20oriented%20design%20clean%20white&width=480&height=640&seq=tpl8&orientation=portrait' },
];

const filters = ['All','Modern','Classic','Creative'];

export default function LandingTemplates() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? templates : templates.filter(t => t.style === active);
  return (
    <section className="py-24 bg-gradient-to-b from-card to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Template Library</p>
            <h2 className="text-4xl font-bold text-foreground">40+ ATS-optimized templates</h2>
          </div>
          <div className="flex gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${active === f ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card border border-border text-muted-foreground hover:border-primary/30'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {filtered.map(t => (
            <div key={t.name} className="group relative rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <Image src={t.img} fill alt={t.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">ATS {t.ats}%</div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link href="/auth" className="bg-card text-primary font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-primary/10 transition-colors cursor-pointer whitespace-nowrap">Use Template</Link>
              </div>
              <div className="p-3 bg-card">
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.style}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/templates" className="inline-flex items-center gap-2 border border-border text-muted-foreground px-6 py-3 rounded-xl hover:border-primary/30 hover:text-primary transition-all text-sm font-medium cursor-pointer whitespace-nowrap">Browse All Templates <i className="ri-arrow-right-line"></i></Link>
        </div>
      </div>
    </section>
  );
}
