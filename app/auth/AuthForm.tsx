'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AuthForm() {
  const [mode, setMode] = useState<'signin'|'signup'>('signup');
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
      <p className="text-sm text-gray-500 mb-6">{mode === 'signup' ? 'Start building your professional resume today' : 'Sign in to continue to ClarityCV'}</p>
      <div className="space-y-3 mb-5">
        {[{icon:'ri-google-fill',label:'Continue with Google',bg:'hover:bg-gray-50'},{icon:'ri-linkedin-box-fill',label:'Continue with LinkedIn',bg:'hover:bg-blue-50'}].map(b => (
          <button key={b.label} className={`w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 ${b.bg} transition-colors cursor-pointer whitespace-nowrap`}>
            <div className="w-5 h-5 flex items-center justify-center"><i className={`${b.icon} text-base`}></i></div>
            {b.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gray-200"></div><span className="text-xs text-gray-400">or</span><div className="flex-1 h-px bg-gray-200"></div>
      </div>
      <div className="space-y-3 mb-4">
        {mode === 'signup' && <input placeholder="Full name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />}
        <input type="email" placeholder="Email address" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        <input type="password" placeholder="Password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {mode === 'signup' && <input type="password" placeholder="Confirm password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />}
      </div>
      {mode === 'signup' && (
        <label className="flex items-center gap-2 mb-4 cursor-pointer">
          <input type="checkbox" className="rounded" />
          <span className="text-xs text-gray-600">I agree to the <span className="text-indigo-600">Terms of Service</span> and <span className="text-indigo-600">Privacy Policy</span></span>
        </label>
      )}
      <Link href="/onboarding" className="block w-full text-center bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap mb-4">
        {mode === 'signup' ? 'Create Account' : 'Sign In'}
      </Link>
      <p className="text-center text-sm text-gray-500">
        {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
        <button onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')} className="text-indigo-600 font-medium hover:underline cursor-pointer whitespace-nowrap">
          {mode === 'signup' ? 'Sign In' : 'Create Account'}
        </button>
      </p>
    </div>
  );
}
