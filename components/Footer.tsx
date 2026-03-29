import Link from 'next/link';

const cols = [
  { title: 'Product', links: ['Features', 'Templates', 'Pricing', 'Integrations', 'Changelog'] },
  { title: 'Resources', links: ['Resume Examples', 'Career Advice', 'Help Center', 'Blog', 'API Docs'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Press Kit', 'Contact', 'Partners'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Security', 'GDPR', 'Cookie Policy'] },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-5 gap-8 pb-12 border-b border-gray-800">
          <div className="col-span-1">
            <div className="font-['Pacifico'] text-2xl text-white mb-3">ClarityCV</div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">Build resumes that get you hired. AI-powered, ATS-optimized, professionally designed.</p>
            <div className="flex gap-3">
              {['ri-twitter-x-fill','ri-linkedin-fill','ri-instagram-fill'].map(ic => (
                <div key={ic} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors cursor-pointer">
                  <i className={`${ic} text-sm text-white`}></i>
                </div>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l}><Link href="/" className="text-sm text-gray-500 hover:text-indigo-400 transition-colors cursor-pointer">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-8">
          <p className="text-xs text-gray-600">© 2025 ClarityCV, Inc. All rights reserved.</p>
          <p className="text-xs text-gray-600">Made with care for job seekers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
