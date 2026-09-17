import React from 'react';
import { ScreenId } from '../types';
import {
  LayoutDashboard,
  FilePlus2,
  History,
  PackageSearch,
  FileText,
  ShieldCheck,
  Users,
  Settings,
  Scale,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
  mobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

export function Sidebar({ currentScreen, onNavigate, onLogout, mobileMenuOpen, onCloseMobileMenu }: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as ScreenId, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new_inspection' as ScreenId, label: 'New Inspection', icon: FilePlus2 },
    { id: 'history' as ScreenId, label: 'Inspection History', icon: History },
    { id: 'product_details' as ScreenId, label: 'Products', icon: PackageSearch },
    { id: 'report_preview' as ScreenId, label: 'Reports', icon: FileText },
    { id: 'rules' as ScreenId, label: 'Compliance Rules', icon: ShieldCheck },
    { id: 'users' as ScreenId, label: 'Users', icon: Users },
    { id: 'settings' as ScreenId, label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (id: ScreenId) => {
    onNavigate(id);
    if (onCloseMobileMenu) onCloseMobileMenu();
  };

  const sidebarContent = (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shrink-0 border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">Lexmet</h1>
            <p className="text-[11px] text-slate-400">Legal Metrology Portal</p>
          </div>
        </div>
        {mobileMenuOpen && onCloseMobileMenu && (
          <button
            onClick={onCloseMobileMenu}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Enforcement Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || (currentScreen === 'analysis' && item.id === 'new_inspection') || (currentScreen === 'findings' && item.id === 'new_inspection') || (currentScreen === 'evidence_viewer' && item.id === 'new_inspection');
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Officer Profile */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-semibold text-sm">
              RK
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Rajesh Kumar</p>
              <p className="text-xs text-slate-400 truncate">Enforcement Officer</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen">
        {sidebarContent}
      </div>

      {/* Mobile Slide-over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
            onClick={onCloseMobileMenu}
          ></div>
          <div className="relative flex-1 flex max-w-xs w-full bg-slate-900 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
