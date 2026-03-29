'use client';
import Link from 'next/link';

interface Props { filter: string; search: string; }

const all = [
  { id: '1', name: 'Executive Pro', style: 'Executive', ats: 98, popular: true, img: 'https://readdy.ai/api/search-image?query=executive%20professional%20resume%20template%20clean%20white%20background%20indigo%20blue%20accent%20color%20elegant%20serif%20typography%20minimal%20single%20page%20layout%20ATS%20friendly&width=360&height=480&seq=tg1&orientation=portrait' },
  { id: '2', name: 'Minimal Light', style: 'Minimal', ats: 99, popular: false, img: 'https://readdy.ai/api/search-image?query=minimalist%20resume%20template%20pure%20white%20background%20thin%20gray%20lines%20clean%20sans-serif%20typography%20professional%20document%20simple%20elegant%20layout&width=360&height=480&seq=tg2&orientation=portrait' },
  { id: '3', name: 'Creative Edge', style: 'Creative', ats: 93, popular: true, img: 'https://readdy.ai/api/search-image?query=modern%20creative%20resume%20template%20colorful%20sidebar%20indigo%20purple%20accent%20two%20column%20layout%20designer%20developer%20creative%20professional%20document&width=360&height=480&seq=tg3&orientation=portrait' },
  { id: '4', name: 'Tech Grid', style: 'Technical', ats: 97, popular: false, img: 'https://readdy.ai/api/search-image?query=technical%20resume%20template%20software%20engineer%20developer%20dark%20header%20white%20body%20modern%20sans-serif%20font%20skills%20tags%20section%20clean%20professional&width=360&height=480&seq=tg4&orientation=portrait' },
  { id: '5', name: 'Classic Serif', style: 'Classic', ats: 96, popular: false, img: 'https://readdy.ai/api/search-image?query=classic%20resume%20template%20traditional%20layout%20serif%20typography%20navy%20blue%20accents%20formal%20professional%20document%20clean%20sections%20work%20experience%20education&width=360&height=480&seq=tg5&orientation=portrait' },
  { id: '6', name: 'Modern Bold', style: 'Modern', ats: 95, popular: true, img: 'https://readdy.ai/api/search-image?query=modern%20bold%20resume%20template%20strong%20header%20section%20dark%20background%20white%20text%20body%20professional%20SaaS%20startup%20style%20clean%20layout&width=360&height=480&seq=tg6&orientation=portrait' },
  { id: '7', name: 'Pastel Soft', style: 'Creative', ats: 91, popular: false, img: 'https://readdy.ai/api/search-image?query=pastel%20soft%20resume%20template%20light%20lavender%20accent%20color%20elegant%20feminine%20professional%20document%20clean%20layout%20rounded%20elements%20modern%20typography&width=360&height=480&seq=tg7&orientation=portrait' },
  { id: '8', name: 'Leadership First', style: 'Executive', ats: 97, popular: false, img: 'https://readdy.ai/api/search-image?query=leadership%20executive%20resume%20template%20bold%20strong%20typography%20dark%20header%20achievements%20focused%20metrics%20driven%20professional%20document%20clean%20white&width=360&height=480&seq=tg8&orientation=portrait' },
  { id: '9', name: 'Graduate Fresh', style: 'Modern', ats: 95, popular: false, img: 'https://readdy.ai/api/search-image?query=fresh%20graduate%20entry%20level%20resume%20template%20clean%20white%20background%20green%20accent%20simple%20layout%20education%20emphasis%20modern%20clean%20professional&width=360&height=480&seq=tg9&orientation=portrait' },
  { id: '10', name: 'Sidebar Pro', style: 'Modern', ats: 94, popular: true, img: 'https://readdy.ai/api/search-image?query=two%20column%20resume%20template%20dark%20sidebar%20contact%20skills%20white%20main%20content%20professional%20clean%20modern%20layout%20indigo%20blue%20accent&width=360&height=480&seq=tg10&orientation=portrait' },
  { id: '11', name: 'Pure Minimal', style: 'Minimal', ats: 99, popular: false, img: 'https://readdy.ai/api/search-image?query=pure%20minimal%20resume%20template%20ultra%20clean%20white%20single%20line%20dividers%20small%20typography%20maximum%20whitespace%20professional%20document&width=360&height=480&seq=tg11&orientation=portrait' },
  { id: '12', name: 'Data Driven', style: 'Technical', ats: 96, popular: false, img: 'https://readdy.ai/api/search-image?query=data%20analyst%20resume%20template%20clean%20white%20chart%20icons%20accent%20blue%20color%20professional%20data%20science%20analytics%20clean%20layout&width=360&height=480&seq=tg12&orientation=portrait' },
];

export default function TemplateGrid({ filter, search }: Props) {
  const shown = all.filter(t => (filter === 'All' || t.style === filter) && t.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="grid grid-cols-4 gap-5">
      {shown.map(t => (
        <div key={t.id} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer">
          {t.popular && <div className="absolute top-3 left-3 z-10 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">Popular</div>}
          <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">{t.ats}%</div>
          <div className="aspect-[3/4] overflow-hidden bg-gray-50">
            <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/40 transition-all flex items-center justify-center">
            <Link href="/builder/1" className="bg-white text-indigo-600 font-bold px-5 py-2.5 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer whitespace-nowrap">Use Template</Link>
          </div>
          <div className="p-3.5 border-t border-gray-100">
            <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.style} · ATS {t.ats}%</p>
          </div>
        </div>
      ))}
    </div>
  );
}
