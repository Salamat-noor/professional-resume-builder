'use client';
import { SettingsSidebar } from '@/components/settings';
import { ProfileSettings } from '@/components/settings';
import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <SidebarProvider style={{ '--sidebar-width': '13rem' } as React.CSSProperties}>
      <div className="flex -m-8">
        <SettingsSidebar active={activeTab} onSelect={setActiveTab} />
        <SidebarInset className="flex-1">
          <div className="p-10 max-w-3xl">
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'billing' && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Billing & Plan</h2>
                <div className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-5">
                  <div className="flex items-center justify-between mb-4">
                    <div><p className="font-bold text-foreground">Free Plan</p><p className="text-sm text-muted-foreground">1 resume · 5 AI credits/day</p></div>
                    <a href="/pricing" className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 cursor-pointer whitespace-nowrap">Upgrade to Pro</a>
                  </div>
                  <div className="h-2 bg-muted rounded-full"><div className="h-full w-1/3 bg-primary rounded-full"></div></div>
                  <p className="text-xs text-muted-foreground mt-2">1 of 3 resumes used</p>
                </div>
                <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                  <p className="font-semibold text-foreground mb-4">Billing History</p>
                  <p className="text-sm text-muted-foreground text-center py-6">No billing history yet. Upgrade to Pro to get started.</p>
                </div>
              </div>
            )}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Notification Preferences</h2>
                <div className="bg-card rounded-2xl border border-border shadow-sm divide-y divide-border">
                  {[['Email notifications','Receive important account and resume updates via email',true],['Application reminders','Get reminded to follow up on job applications',true],['AI writing suggestions','Receive weekly AI tips for improving your resume',false],['Product updates','News about new features and improvements',true],['Marketing emails','Promotions, tips, and career resources',false]].map(([label, desc, on]) => (
                    <div key={label as string} className="flex items-center justify-between p-5">
                      <div><p className="font-medium text-foreground text-sm">{label}</p><p className="text-xs text-muted-foreground mt-0.5">{desc}</p></div>
                      <div className={`w-10 h-6 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${on ? 'bg-primary' : 'bg-muted'}`}><div className={`w-5 h-5 rounded-full bg-card shadow transition-transform ${on ? 'translate-x-4' : 'translate-x-0'}`}></div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!['profile','billing','notifications'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center min-h-64 text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-2xl mb-4"><i className="ri-settings-3-line text-3xl text-primary/50"></i></div>
                <p className="text-lg font-semibold text-foreground mb-2">Coming Soon</p>
                <p className="text-sm text-muted-foreground">This settings section is under construction.</p>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
