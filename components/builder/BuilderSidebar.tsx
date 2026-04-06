'use client';

interface Props { activeSection: string; onSelect: (s: string) => void; }

const sections = [
  { id: 'contact', icon: 'ri-user-3-line', label: 'Contact Info' },
  { id: 'summary', icon: 'ri-file-text-line', label: 'Summary' },
  { id: 'experience', icon: 'ri-briefcase-4-line', label: 'Experience' },
  { id: 'education', icon: 'ri-graduation-cap-line', label: 'Education' },
  { id: 'skills', icon: 'ri-tools-line', label: 'Skills' },
  { id: 'projects', icon: 'ri-code-s-slash-line', label: 'Projects' },
  { id: 'certifications', icon: 'ri-award-line', label: 'Certifications' },
  { id: 'languages', icon: 'ri-translate-2', label: 'Languages' },
];

const scores: Record<string, number> = { contact: 100, summary: 85, experience: 90, education: 100, skills: 75, projects: 60, certifications: 0, languages: 0 };

export function BuilderSidebar({ activeSection, onSelect }: Props) {
  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Resume Sections</p>
      </div>
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {sections.map(s => {
          const score = scores[s.id];
          const active = activeSection === s.id;
          return (
            <button key={s.id} onClick={() => onSelect(s.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0"><i className={`${s.icon} text-base`}></i></div>
              <span className="flex-1 text-left font-medium whitespace-nowrap">{s.label}</span>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${score === 100 ? 'bg-green-400' : score > 60 ? 'bg-yellow-400' : score > 0 ? 'bg-orange-400' : 'bg-gray-200'}`}></div>
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:text-indigo-600 text-sm text-gray-500 transition-all cursor-pointer whitespace-nowrap">
          <div className="w-4 h-4 flex items-center justify-center"><i className="ri-add-line"></i></div>
          Add Section
        </button>
      </div>
    </aside>
  );
}