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
    <aside className="w-56 bg-background border-r border-border flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-border">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Resume Sections</p>
      </div>
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {sections.map(s => {
          const score = scores[s.id];
          const active = activeSection === s.id;
          return (
            <button key={s.id} onClick={() => onSelect(s.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer font-medium ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-foreground hover:bg-muted'}`}>
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0"><i className={`${s.icon} text-base`}></i></div>
              <span className="flex-1 text-left whitespace-nowrap">{s.label}</span>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${score === 100 ? 'bg-green-500' : score > 60 ? 'bg-yellow-500' : score > 0 ? 'bg-orange-500' : 'bg-border'}`}></div>
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 border-dashed border-border hover:border-primary/30 hover:text-primary text-sm text-muted-foreground transition-all cursor-pointer whitespace-nowrap">
          <div className="w-4 h-4 flex items-center justify-center"><i className="ri-add-line"></i></div>
          Add Section
        </button>
      </div>
    </aside>
  );
}