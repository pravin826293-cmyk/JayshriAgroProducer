/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Public Portal Components
import { HeroSection } from './components/public/HeroSection';
import { StatsCounter } from './components/public/StatsCounter';
import { FeaturedSchemes } from './components/public/FeaturedSchemes';
import { GovtSchemesDirectory } from './components/public/GovtSchemesDirectory';
import { FarmerEligibilityFinder } from './components/public/FarmerEligibilityFinder';
import { AnnouncementsFeed } from './components/public/AnnouncementsFeed';
import { AboutSection } from './components/public/AboutSection';
import { ContactSection } from './components/public/ContactSection';

// Admin Portal Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FarmerList } from './components/admin/FarmerList';
import { ProcurementLotList } from './components/admin/ProcurementLotList';
import { CsvImportModal } from './components/admin/CsvImportModal';
import { FarmerFormModal } from './components/admin/FarmerFormModal';
import { SchemeManager } from './components/admin/SchemeManager';
import { GovtSchemeManager } from './components/admin/GovtSchemeManager';
import { AnnouncementManager } from './components/admin/AnnouncementManager';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { Shield, Lock } from 'lucide-react';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const { isLoading } = useData();
  const { language } = useLanguage();

  // Navigation tab in public portal or admin mode
  const [activeTab, setActiveTab] = useState<string>('home');
  // Section inside admin portal
  const [adminSection, setAdminSection] = useState<string>('dashboard');

  // Modals
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [addFarmerModalOpen, setAddFarmerModalOpen] = useState<boolean>(false);
  const [importCsvModalOpen, setImportCsvModalOpen] = useState<boolean>(false);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      setActiveTab('admin');
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setActiveTab('admin');
  };

  // If in admin tab but not authenticated, render login prompt
  if (activeTab === 'admin' && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-between">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openAdminLogin={() => setLoginModalOpen(true)}
        />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-panel p-8 rounded-3xl text-center space-y-4 border border-emerald-500/25">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-800">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Protected Administrator Area
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              This section contains sensitive farmer profiles, PSS ID registries, and internal cooperative accounting. Authorized credentials are required to proceed.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-md cursor-pointer"
              >
                Sign In to Admin Portal
              </button>
            </div>
          </div>
        </div>
        <Footer onNavigate={setActiveTab} />
        <AdminLoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  // Admin Portal View
  if (activeTab === 'admin' && isAuthenticated) {
    return (
      <>
        <AdminLayout
          currentSection={adminSection}
          setCurrentSection={setAdminSection}
          onExitToPublic={() => setActiveTab('home')}
        >
          {adminSection === 'dashboard' && (
            <AdminDashboard
              onNavigate={setAdminSection}
              onOpenAddFarmer={() => setAddFarmerModalOpen(true)}
              onOpenAddScheme={() => setAdminSection('schemes')}
              onOpenAddAnnouncement={() => setAdminSection('announcements')}
              onOpenImportCsv={() => setImportCsvModalOpen(true)}
            />
          )}

          {adminSection === 'farmers' && (
            <FarmerList onOpenAddFarmer={() => setAddFarmerModalOpen(true)} />
          )}

          {adminSection === 'lots' && <ProcurementLotList />}

          {adminSection === 'csv-import' && (
            <div className="space-y-6">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 space-y-4">
                <h2 className="text-xl font-extrabold text-slate-900">
                  CSV Ingestion & Audit Management
                </h2>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  Import and update farmer records, gate weights, PSS IDs, and quality assaying parameters. All imports perform validation checks and prevent destructive overwriting of historical data.
                </p>
                <button
                  onClick={() => setImportCsvModalOpen(true)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Open CSV Importer & Validator
                </button>
              </div>
              <ProcurementLotList />
            </div>
          )}

          {adminSection === 'schemes' && <SchemeManager />}

          {adminSection === 'govt-schemes' && <GovtSchemeManager />}

          {adminSection === 'announcements' && <AnnouncementManager />}
        </AdminLayout>

        {/* Global Admin Modals */}
        <FarmerFormModal
          isOpen={addFarmerModalOpen}
          onClose={() => setAddFarmerModalOpen(false)}
        />
        <CsvImportModal
          isOpen={importCsvModalOpen}
          onClose={() => setImportCsvModalOpen(false)}
        />
      </>
    );
  }

  // Public Portal View
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAF9]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAdminLogin={handleAdminClick}
      />

      {/* Main Public Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExploreSchemes={() => setActiveTab('schemes')}
              onViewAnnouncements={() => setActiveTab('announcements')}
              onOpenMatcher={() => setActiveTab('matcher')}
            />
            <StatsCounter />
            <FeaturedSchemes onNavigateToContact={() => setActiveTab('contact')} />
            <GovtSchemesDirectory />
            <FarmerEligibilityFinder />
            <AnnouncementsFeed />
            <AboutSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'schemes' && (
          <div className="pt-4">
            <FeaturedSchemes onNavigateToContact={() => setActiveTab('contact')} />
          </div>
        )}

        {activeTab === 'govtschemes' && (
          <div className="pt-4">
            <GovtSchemesDirectory />
          </div>
        )}

        {activeTab === 'matcher' && (
          <div className="pt-4">
            <FarmerEligibilityFinder />
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="pt-4">
            <AnnouncementsFeed />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-4">
            <AboutSection />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-4">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Admin Login Dialog */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
          <MainApp />
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
