import React, { useState } from 'react';
import { ScreenId, NotificationItem } from '../types';
import { NOTIFICATIONS } from '../mockData';
import { Search, Bell, Shield, CheckCircle, AlertTriangle, Info, Menu } from 'lucide-react';

interface TopNavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onToggleMobileMenu: () => void;
}

export function TopNavbar({ currentScreen, onNavigate, onToggleMobileMenu }: TopNavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'dashboard': return 'Dashboard & Analytics';
      case 'new_inspection': return 'New Compliance Audit';
      case 'analysis': return 'Gemini Vision AI & OCR';
      case 'findings': return 'Inspection Findings';
      case 'evidence_viewer': return 'Evidence Inspector';
      case 'history': return 'Audit Logs';
      case 'product_details': return 'Commodity Profile';
      case 'report_preview': return 'Official Report';
      case 'rules': return 'Compliance Rules';
      case 'users': return 'Access Control';
      case 'settings': return 'Settings';
      default: return 'Legal Metrology';
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="bg-white border-b border-slate-200 shrink-0 z-20 shadow-xs">
      {/* Official Government Top Bar */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-emerald-600"></div>
      <div className="px-4 md:px-6 py-2 bg-slate-900 text-slate-300 text-[11px] md:text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="font-bold text-white tracking-wide uppercase text-[10px] md:text-[11px]">Govt of India</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-300 truncate">Ministry of Consumer Affairs</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden sm:inline">NIC Secure Gateway</span>
            <span className="sm:hidden">Secure</span>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline font-mono text-[11px] text-slate-400">Delhi Central Circle-4</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Page Title & Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm md:text-base font-bold text-slate-900 tracking-tight truncate max-w-[180px] sm:max-w-xs md:max-w-md">{getScreenTitle()}</h2>
            <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Shield className="w-2.5 h-2.5 text-blue-600" />
                <span>Statutory Verified</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-48 lg:w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search batch, brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Notifications Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">System Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-blue-600 hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-3 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-blue-50/40' : ''}`}>
                      <div className="flex items-start gap-2.5">
                        {n.type === 'alert' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                        {n.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                        {n.type === 'info' && <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-900">{n.title}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 inline-block font-mono">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Pill */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center shadow-xs">
              RK
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-slate-900">Rajesh Kumar</p>
              <p className="text-[10px] text-slate-500 font-mono">LM-9082</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
