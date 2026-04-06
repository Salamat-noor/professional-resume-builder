const stats = [
  { label: 'Applied', value: 24, icon: 'ri-send-plane-line', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Interviewing', value: 7, icon: 'ri-chat-3-line', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { label: 'Offers', value: 2, icon: 'ri-trophy-line', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Rejected', value: 8, icon: 'ri-close-circle-line', color: 'text-red-600', bg: 'bg-red-50' },
];
export function TrackerStats() {
  return (
    <div className="grid grid-cols-4 gap-5 mb-7">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${s.bg}`}><i className={`${s.icon} text-lg ${s.color}`}></i></div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-0.5">{s.value}</p>
          <p className="text-sm text-gray-500">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
