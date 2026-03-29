const stats = [
  { icon: 'ri-file-text-line', label: 'Resumes', value: '3', change: '+1 this month', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: 'ri-send-plane-line', label: 'Applications', value: '24', change: '+8 this week', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: 'ri-calendar-check-line', label: 'Interviews', value: '7', change: '3 upcoming', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: 'ri-trophy-line', label: 'Offers', value: '2', change: 'Congratulations!', color: 'text-orange-600', bg: 'bg-orange-50' },
];

export default function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-5 mb-8">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${s.bg}`}>
              <i className={`${s.icon} text-lg ${s.color}`}></i>
            </div>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{s.change}</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-0.5">{s.value}</p>
          <p className="text-sm text-gray-500">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
