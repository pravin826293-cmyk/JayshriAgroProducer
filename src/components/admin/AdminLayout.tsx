import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Scale,
  FileSpreadsheet,
  BookOpen,
  Landmark,
  Bell,
  LogOut,
  ExternalLink,
  ChevronRight,
  Shield,
  Menu,
  X,
  Sprout,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  onExitToPublic: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentSection,
  setCurrentSection,
  onExitToPublic,
  children,
}) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'farmers', label: 'Farmer Management', icon: Users },
    { id: 'lots', label: 'Procurement Lots', icon: Scale },
    { id: 'csv-import', label: 'CSV Import & Sync', icon: FileSpreadsheet },
    { id: 'schemes', label: 'Company Schemes', icon: BookOpen },
    { id: 'govt-schemes', label: 'Govt Schemes Directory', icon: Landmark },
    { id: 'announcements', label: 'Announcements Manager', icon: Bell },
  ];

  const currentLabel = menuItems.find((m) => m.id === currentSection)?.label || 'Overview';

  return (
    <div className="min-h-screen bg-slate-900/5 text-slate-800 flex flex-col lg:flex-row relative">
      {/* Mobile Header */}
      <header className="lg:hidden glass-nav px-4 py-3 border-b border-emerald-500/15 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm block leading-tight">Admin Console</span>
            <span className="text-[10px] text-emerald-700 font-medium">Jayashree Krishi Agro</span>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Desktop Sidebar / Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 glass-panel border-r border-emerald-500/20 bg-white/95 backdrop-blur-xl flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:h-screen lg:shrink-0`}
      >
        <div className="p-5 space-y-6">
          {/* Logo Lockup */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-800/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm block leading-tight">
                Jayashree Agro
              </span>
              <span className="text-[11px] text-emerald-800 font-semibold block">
                Admin Control Room
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 block mb-2">
              Management Modules
            </span>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-200" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200/80 space-y-3 bg-slate-50/60">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-emerald-300 font-bold text-xs flex items-center justify-center font-mono">
              PP
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-slate-900 block truncate">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-emerald-700 font-medium block truncate">
                {user?.email || 'admin@jayashreeagro.com'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <button
              onClick={onExitToPublic}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-[11px] font-semibold"
            >
              <ExternalLink className="w-3 h-3 text-emerald-600" />
              <span>Public Site</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer text-[11px] font-semibold"
            >
              <LogOut className="w-3 h-3 text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Admin Top Navigation Contract */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 glass-nav border-b border-emerald-500/15 sticky top-0 z-30">
          {/* Breadcrumb trail */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => setCurrentSection('dashboard')}>
              Jayashree Agro FPC
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900 text-sm">{currentLabel}</span>
          </div>

          {/* Top bar right zone */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="font-semibold">Parbhani System Active</span>
              <span className="text-slate-400">·</span>
              <span className="font-mono text-slate-600">Kerwadi Yard</span>
            </div>

            <button
              onClick={onExitToPublic}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              <span>Back to Public Portal</span>
            </button>

            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
