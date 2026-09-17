import React, { useState } from 'react';
import { ScreenId } from '../types';
import { User, Bell, Shield, FileText, Cpu, Check } from 'lucide-react';

interface SettingsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

export function SettingsScreen({ onNavigate, theme, onThemeChange }: SettingsScreenProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'reports' | 'system'>('profile');
  const [saved, setSaved] = useState(false);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [autoOcr, setAutoOcr] = useState(true);
  const [darkThemeExport, setDarkThemeExport] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">System Settings & Preferences</h2>
          <p className="text-xs text-slate-500 mt-0.5">Configure officer profile, notification thresholds, security policies, and report templates.</p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200 animate-pulse">
            <Check className="w-4 h-4" />
            Settings Saved
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tabs sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Officer Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'security' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security & 2FA</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'reports' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Report Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'system' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>System Preferences</span>
          </button>
        </div>

        {/* Tab Content (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 pb-3 border-b border-slate-100">Officer Profile Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                    <input type="text" defaultValue="Rajesh Kumar" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Officer Badge ID</label>
                    <input type="text" defaultValue="LM-9082" disabled className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Official Email</label>
                    <input type="email" defaultValue="rajesh.kumar@legalmetrology.gov.in" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Assigned Inspection Circle</label>
                    <input type="text" defaultValue="New Delhi Circle - Zone 4" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 pb-3 border-b border-slate-100">Notification Channels</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Email Alerts</p>
                      <p className="text-xs text-slate-500">Receive instant email notifications when inspection reports are reviewed.</p>
                    </div>
                    <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">SMS / WhatsApp Dispatch Alerts</p>
                      <p className="text-xs text-slate-500">Receive SMS alerts for urgent potential violation flags.</p>
                    </div>
                    <input type="checkbox" checked={smsAlerts} onChange={(e) => setSmsAlerts(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 pb-3 border-b border-slate-100">Security & Authentication</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200 text-xs text-blue-900">
                    <p className="font-semibold mb-1">Government Two-Factor Authentication (2FA)</p>
                    <p>Enforced via National Informatics Centre (NIC) Aadhaar / GovSSO certificate.</p>
                  </div>
                  <button type="button" onClick={() => alert('Redirecting to NIC GovSSO password change portal...')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 shadow-xs">
                    Change GovSSO Password →
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 pb-3 border-b border-slate-100">Report Preferences</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Default Inspection District</label>
                    <input type="text" defaultValue="New Delhi Central" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">PDF Watermark</label>
                    <input type="text" defaultValue="GOVERNMENT OF INDIA - LEGAL METROLOGY INSPECTION" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-mono" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 pb-3 border-b border-slate-100">System Preferences</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Automated Gemini OCR Vision Engine</p>
                      <p className="text-xs text-slate-500">Automatically extract declarations upon package photo upload.</p>
                    </div>
                    <input type="checkbox" checked={autoOcr} onChange={(e) => setAutoOcr(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                  </label>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Field Inspection Display Theme</p>
                      <p className="text-xs text-slate-500">Choose between light mode (bright outdoor daylight) and dark mode (low-light / night enforcement conditions).</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => onThemeChange('light')}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          theme === 'light'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <span className="block text-xs">☀️ Light Mode</span>
                        <span className="block text-[10px] opacity-80 mt-0.5">High daylight contrast</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onThemeChange('dark')}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          theme === 'dark'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <span className="block text-xs">🌙 Dark Mode</span>
                        <span className="block text-[10px] opacity-80 mt-0.5">Low-light / Night</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onThemeChange('system')}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          theme === 'system'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <span className="block text-xs">⚙️ System Default</span>
                        <span className="block text-[10px] opacity-80 mt-0.5">Match device setting</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors shadow-sm"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
