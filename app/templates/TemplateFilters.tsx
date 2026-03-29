'use client';

interface Props { active: string; onSelect: (f: string) => void; }
const filters = [
  { id: 'All', icon: 'ri-grid-line' },
  { id: 'Modern', icon: 'ri-macbook-line' },
  { id: 'Classic', icon: 'ri-file-text-line' },
  { id: 'Creative', icon: 'ri-palette-line' },
  { id: 'Technical', icon: 'ri-code-s-slash-line' },
  { id: 'Executive', icon: 'ri-vip-crown-line' },
  { id: 'Minimal', icon: 'ri-subtract-line' },
];
export default function TemplateFilters({ active, onSelect }: Props) {
  return (
    <div className="flex items-center gap-2 mb-6 flex-wrap">
      {filters.map(f => (
        <button key={f.id} onClick={() => onSelect(f.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${active === f.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'}`}>
          <div className="w-4 h-4 flex items-center justify-center"><i className={f.icon}></i></div>
          {f.id}
        </button>
      ))}
    </div>
  );
}
