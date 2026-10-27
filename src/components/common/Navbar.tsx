import React, { useState } from 'react';
import { Sprout, Globe, Shield, Menu, X, ChevronRight, LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAdminLogin,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mr' : 'en');
  };

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'schemes', label: t('nav.companySchemes') },
    { id: 'govtschemes', label: t('nav.govtSchemes') },
    { id: 'matcher', label: t('nav.eligibility') },
    { id: 'announcements', label: t('nav.announcements') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight block leading-tight whitespace-nowrap">
                Jayashree Krishi Agro
              </span>
              <span className="text-xs text-emerald-800 font-medium block whitespace-nowrap">
                Farmer Producer Co. Ltd. • Parbhani
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                  activeTab === link.id
                    ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                    : 'hover:text-emerald-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions (Lang Switch + Admin Button) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Instant Marathi / English Toggle */}
            <button
              onClick={toggleLanguage}
              title="Switch Language / भाषा बदला"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'मराठी' : 'English'}</span>
            </button>

            {/* Admin CTA */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'admin'
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </button>
                <button
                  onClick={logout}
                  title="Logout Admin"
                  className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAdminLogin}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('nav.adminPortal')}</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-500/10 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left font-medium transition-colors cursor-pointer ${
                activeTab === link.id
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
          {isAuthenticated && (
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left font-medium bg-emerald-700 text-white cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </span>
              <ChevronRight className="w-4 h-4 text-emerald-200" />
            </button>
          )}
        </div>
      )}
    </header>
  );
};
