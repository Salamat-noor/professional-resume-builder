'use client';
import { useState } from 'react';

export function ProfileSettings() {
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h2>
      <div className="bg-card rounded-2xl border border-border shadow-sm p-7 mb-5">
        <div className="flex items-center gap-5 mb-7 pb-7 border-b border-border">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">JA</div>
            <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center shadow cursor-pointer hover:border-primary hover:text-primary transition-colors">
              <i className="ri-camera-line text-xs text-muted-foreground"></i>
            </button>
          </div>
          <div>
            <p className="font-bold text-foreground">Jordan Anderson</p>
            <p className="text-sm text-muted-foreground">jordan@example.com</p>
            <button className="text-xs text-primary hover:underline mt-1 cursor-pointer whitespace-nowrap">Change photo</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[['Full Name','Jordan Anderson'],['Email','jordan@example.com'],['Phone','+1 (415) 555-0142'],['Location','San Francisco, CA'],['LinkedIn URL','linkedin.com/in/jordan'],['Portfolio URL','jordananderson.design']].map(([l,v]) => (
            <div key={l}>
              <label className="text-xs font-semibold text-foreground block mb-1.5">{l}</label>
              <input defaultValue={v} className="w-full border border-border bg-background rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-2xl border border-destructive/20 shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-foreground mb-1">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button className="border border-destructive/50 text-destructive text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-destructive/10 transition-colors cursor-pointer whitespace-nowrap">Delete Account</button>
      </div>
      <div className="flex justify-end">
        {saved && <span className="text-sm text-green-600 dark:text-green-400 font-medium mr-4 flex items-center gap-1"><i className="ri-checkbox-circle-fill"></i>Changes saved!</span>}
        <button onClick={handleSave} className="bg-primary text-primary-foreground font-semibold px-7 py-2.5 rounded-xl hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap">Save Changes</button>
      </div>
    </div>
  );
}
