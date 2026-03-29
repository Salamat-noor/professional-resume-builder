'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: 'ri-dashboard-line', label: 'Dashboard', href: '/dashboard' },
  { icon: 'ri-file-text-line', label: 'My Resumes', href: '/dashboard' },
  { icon: 'ri-layout-grid-line', label: 'Templates', href: '/templates' },
  { icon: 'ri-robot-line', label: 'AI Assistant', href: '/builder/1' },
  { icon: 'ri-shield-check-line', label: 'ATS Checker', href: '/ats-checker' },
  { icon: 'ri-briefcase-line', label: 'Job Tailoring', href: '/job-tailoring' },
  { icon: 'ri-mail-line', label: 'Cover Letters', href: '/cover-letter' },
  { icon: 'ri-kanban-view', label: 'Job Tracker', href: '/tracker' },
];

export default function AppSidebar() {
  const path = usePathname();
  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-100 flex flex-col pt-4 pb-6 fixed left-0 top-0">
      <div className="px-5 mb-6 mt-2">
        <Link href="/" className="font-['Pacifico'] text-xl text-indigo-600">ClarityCV</Link>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(item => {
          const active = path === item.href;
          return (
            <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer whitespace-nowrap ${active ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
              <div className="w-5 h-5 flex items-center justify-center"><i className={`${item.icon} text-base`}></i></div>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 mt-4 space-y-1">
        <div className="mx-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
          <p className="text-xs font-semibold text-indigo-700 mb-0.5">Free Plan</p>
          <p className="text-xs text-indigo-500 mb-2">1/3 resumes used</p>
          <div className="h-1.5 bg-indigo-100 rounded-full"><div className="h-full w-1/3 bg-indigo-500 rounded-full"></div></div>
          <Link href="/pricing" className="mt-2 block text-xs font-medium text-indigo-600 hover:underline cursor-pointer">Upgrade to Pro →</Link>
        </div>
        <Link href="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${path === '/settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
          <div className="w-5 h-5 flex items-center justify-center"><i className="ri-settings-3-line text-base"></i></div>
          Settings
        </Link>
      </div>
    </aside>
  );
}
