interface Props { active: string; onSelect: (t: string) => void; }
const tabs = [
  { id: 'profile', icon: 'ri-user-3-line', label: 'Profile' },
  { id: 'account', icon: 'ri-shield-keyhole-line', label: 'Account' },
  { id: 'billing', icon: 'ri-bank-card-line', label: 'Billing' },
  { id: 'notifications', icon: 'ri-notification-3-line', label: 'Notifications' },
  { id: 'privacy', icon: 'ri-lock-line', label: 'Privacy' },
  { id: 'integrations', icon: 'ri-puzzle-line', label: 'Integrations' },
];
export default function SettingsSidebar({ active, onSelect }: Props) {
  return (
    <aside className="w-52 bg-white border-r border-gray-100 py-6 px-3 flex-shrink-0">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Settings</p>
      <nav className="space-y-0.5">
        {tabs.map(t => (
          <button key={t.id} onClick={() => onSelect(t.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer whitespace-nowrap text-left ${active === t.id ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
            <div className="w-5 h-5 flex items-center justify-center"><i className={`${t.icon} text-base`}></i></div>
            {t.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
