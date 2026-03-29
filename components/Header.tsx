'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-['Pacifico'] text-2xl text-indigo-600 whitespace-nowrap">ClarityCV</Link>
        <nav className="hidden md:flex items-center gap-8">
          {['Features','Templates','Pricing','Blog'].map(n => (
            <Link key={n} href={n === 'Templates' ? '/templates' : n === 'Pricing' ? '/pricing' : '/'} className="text-sm text-gray-600 hover:text-indigo-600 transition-colors whitespace-nowrap">{n}</Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth" className="text-sm text-gray-700 hover:text-indigo-600 px-4 py-2 whitespace-nowrap cursor-pointer">Sign In</Link>
          <Link href="/auth" className="text-sm bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer">Get Started Free</Link>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-8 h-8 flex items-center justify-center cursor-pointer">
          <i className="ri-menu-line text-xl text-gray-700"></i>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          {['Features','Templates','Pricing','Blog'].map(n => (
            <Link key={n} href="/" className="text-sm text-gray-700 py-2 cursor-pointer">{n}</Link>
          ))}
          <Link href="/auth" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-xl text-center cursor-pointer">Get Started Free</Link>
        </div>
      )}
    </header>
  );
}
