'use client';
import Link from 'next/link';
import { Fragment } from 'react/jsx-runtime';

interface Props { onClose: () => void; }

const compare = [
  { label: 'Active Resumes', free: '1', pro: 'Unlimited' },
  { label: 'AI Credits', free: '5 / day', pro: 'Unlimited' },
  { label: 'Templates', free: '10', pro: '40+' },
  { label: 'ATS Checker', free: false, pro: true },
  { label: 'Job Tailoring', free: false, pro: true },
  { label: 'Cover Letters', free: false, pro: true },
  { label: 'Priority Support', free: false, pro: true },
];

export default function UpgradeModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-center">
          <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-2xl mx-auto mb-4"><i className="ri-vip-crown-fill text-3xl text-yellow-300"></i></div>
          <h2 className="text-2xl font-bold text-white mb-2">Upgrade to Pro</h2>
          <p className="text-indigo-200 text-sm">Unlock unlimited resumes, AI credits, and premium features</p>
        </div>
        <div className="p-7">
          <div className="grid grid-cols-3 gap-0 mb-6 text-xs">
            <div></div>
            <div className="text-center font-semibold text-gray-500 pb-2">Free</div>
            <div className="text-center font-semibold text-indigo-600 pb-2">Pro</div>
            {compare.map(r => (
              <Fragment key={r.label}>
                <div key={r.label} className="py-2.5 text-sm text-gray-700 border-t border-gray-100">{r.label}</div>
                <div className="py-2.5 text-center text-sm text-gray-500 border-t border-gray-100">
                  {typeof r.free === 'boolean' ? <i className={r.free ? 'ri-checkbox-circle-fill text-green-500' : 'ri-close-circle-line text-gray-300'}></i> : r.free}
                </div>
                <div className="py-2.5 text-center text-sm font-medium text-indigo-700 border-t border-gray-100">
                  {typeof r.pro === 'boolean' ? <i className={r.pro ? 'ri-checkbox-circle-fill text-green-500' : 'ri-close-circle-line text-gray-300'}></i> : r.pro}
                </div>
              </Fragment>
            ))}
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 text-center mb-5">
            <p className="text-4xl font-bold text-indigo-700 mb-0.5">$9<span className="text-lg font-normal text-gray-500">/month</span></p>
            <p className="text-xs text-green-600 font-semibold">Billed annually · Save 25%</p>
          </div>
          <Link href="/pricing" onClick={onClose} className="block w-full text-center bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">Upgrade Now</Link>
          <p className="text-xs text-center text-gray-400 mt-3">14-day money-back guarantee · Cancel anytime</p>
          <button onClick={onClose} className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-2 cursor-pointer whitespace-nowrap">Continue with Free</button>
        </div>
      </div>
    </div>
  );
}
