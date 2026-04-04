'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const checks = [
  { label: 'Contact info complete', pass: true },
  { label: 'Summary present & strong', pass: true },
  { label: 'Quantified achievements', pass: true },
  { label: 'Keywords match job title', pass: false, fix: 'Add: "cross-functional", "stakeholder"' },
  { label: 'No complex formatting', pass: true },
  { label: 'Standard section headings', pass: true },
  { label: 'Action verbs in bullets', pass: true },
  { label: 'Missing "Certifications"', pass: false, fix: 'Consider adding PMP or similar' },
  { label: 'File size optimized', pass: true },
  { label: 'Consistent date format', pass: true },
];

export function BuilderScorePanel() {
  const score = 87;
  const pct = (score / 100) * 283;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-5">
        <div className="relative w-32 h-32 my-2">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted"/>
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${pct} ${283-pct}`} strokeLinecap="round" className="text-primary"/>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-primary">{score}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-green-600 dark:text-green-400">Good — Likely to Pass ATS</p>
        <div className="grid grid-cols-3 gap-2 w-full mt-3">
          {[
            { label: 'Format', v: 95, c: 'text-green-600 dark:text-green-400' },
            { label: 'Keywords', v: 78, c: 'text-yellow-600 dark:text-yellow-400' },
            { label: 'Content', v: 89, c: 'text-green-600 dark:text-green-400' }
          ].map(m => (
            <div key={m.label} className="text-center p-2 bg-muted/50 rounded-xl">
              <p className={`text-lg font-bold ${m.c}`}>{m.v}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-xs font-semibold text-foreground mb-2.5">Checklist</p>
      <div className="space-y-1.5">
        {checks.map(c => (
          <div
            key={c.label}
            className={`flex items-start gap-2.5 p-2.5 rounded-xl ${
              !c.pass ? 'bg-destructive/5 border border-destructive/20' : ''
            }`}
          >
            <div className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">
              <i className={c.pass ? 'ri-checkbox-circle-fill text-green-500' : 'ri-error-warning-fill text-destructive'}></i>
            </div>
            <div>
              <p className={`text-xs font-medium ${c.pass ? 'text-foreground' : 'text-destructive'}`}>{c.label}</p>
              {c.fix && <p className="text-xs text-destructive/80 mt-0.5">{c.fix}</p>}
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        className="mt-4 w-full"
        render={<Link href="/ats-checker" />}
      >
        View Full ATS Report →
      </Button>
    </div>
  );
}
