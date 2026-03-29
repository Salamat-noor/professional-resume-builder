'use client';
import AuthForm from './AuthForm';
import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-['Pacifico'] text-3xl text-indigo-600">ClarityCV</Link>
          <p className="text-gray-500 text-sm mt-2">Build resumes that get you hired</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
