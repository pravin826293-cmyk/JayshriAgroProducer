import React, { useState } from 'react';
import { Sprout, ExternalLink, MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-emerald-900/40 relative overflow-hidden">
      {/* Subtle organic background mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Organization Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Jayashree Krishi Agro
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'mr'
                ? 'जयश्री कृषी ॲग्रो शेतकरी उत्पादक कंपनी लि. (परभणी, महाराष्ट्र). शेतकरी सदस्यांना बियाणे, हमीभाव खरेदी, आधुनिक अवजारे व शासकीय योजनांचे थेट लाभ मिळवून देण्यासाठी कटिबद्ध.'
                : 'A recognized Farmer Producer Company incorporated in Parbhani, Maharashtra. Empowering member farmers through organized procurement, quality agricultural inputs, custom mechanization, and welfare schemes.'}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MCA Registered • Kerwadi Center</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'mr' ? 'जलद दुवे' : 'Portal Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'mr' ? 'मुख्यपृष्ठ' : 'Home Page'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schemes')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'mr' ? 'कंपनी कृषी योजना' : 'Company Agricultural Schemes'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('govtschemes')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'mr' ? 'महाराष्ट्र शासकीय योजना' : 'Maharashtra Government Schemes'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('matcher')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'mr' ? 'शेतकरी योजना पात्रता शोधक' : 'Farmer Scheme Matcher'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('announcements')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'mr' ? 'खरेदी व हवामान सूचना' : 'Official Announcements'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Maharashtra Portals */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'mr' ? 'शासकीय पोर्टल दुवे' : 'Government Portals'}
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href="https://mahadbt.maharashtra.gov.in/Farmer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2 text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
                  <div>
                    <span className="font-semibold block text-white group-hover:text-emerald-300">
                      MahaDBT Farmer Portal
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {language === 'mr' ? 'शासकीय अनुदानासाठी अधिकृत पोर्टल' : 'Official MahaDBT Maharashtra Portal'}
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://krishi.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2 text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
                  <div>
                    <span className="font-semibold block text-white group-hover:text-emerald-300">
                      Maharashtra Krishi Vibhag
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {language === 'mr' ? 'कृषी विभाग महाराष्ट्र शासन' : 'Department of Agriculture'}
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2 text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
                  <div>
                    <span className="font-semibold block text-white group-hover:text-emerald-300">
                      PM-KISAN Samman Nidhi
                    </span>
                    <span className="text-[11px] text-slate-400">₹6,000 Annual Center Support</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations Office */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'mr' ? 'कार्यालय व खरेदी केंद्र' : 'Operations & Center'}
            </h4>
            <div className="flex items-start gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                At Post Kerwadi, Gangakhed / Palam Taluka, District Parbhani, Maharashtra - 431514
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>+91 93252 78823 / +91 94236 55666</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>contact@jayashreeagro.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Jayashree Krishi Agro Farmer Producer Company Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {language === 'mr' ? 'गोपनीयता धोरण' : 'Privacy Policy'}
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {language === 'mr' ? 'अटी व शर्ती' : 'Terms & Conditions'}
            </button>
          </div>
        </div>

        {/* Disclaimer on Government Information */}
        <div className="mt-6 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 text-center leading-relaxed">
          <span className="font-semibold text-slate-300">Disclaimer: </span>
          Jayashree Krishi Agro Farmer Producer Company Ltd. is a producer collective organization facilitating agricultural trade and farmer welfare. Official government schemes listed herein are administered directly by the Government of Maharashtra and Central Government departments. Final eligibility, scrutiny, and fund disbursements are subject to official government guidelines and competent authority sanction.
        </div>
      </div>

      {/* Legal Dialogs */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full glass-dropdown p-6 rounded-2xl border border-emerald-500/20 text-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {legalModal === 'privacy' ? 'Farmer Data Privacy Policy' : 'Terms of Use & Fair Dealing'}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2 max-h-72 overflow-y-auto leading-relaxed pr-2">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Confidentiality:</strong> Farmer personal data, Aadhaar reference numbers, phone numbers, and bank account linkages collected during PSS procurement at Kerwadi center are held strictly confidential and never displayed on the public website.
                  </p>
                  <p>
                    <strong>2. Access Control:</strong> Only authorized FPC personnel with verified credentials can inspect full lot procurement records and individual farmer profiles.
                  </p>
                  <p>
                    <strong>3. Data Integrity:</strong> We do not sell or transfer farmer membership details to commercial third parties.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Informational Service:</strong> Information concerning government schemes is provided for convenience and guidance based on verified government circulars.
                  </p>
                  <p>
                    <strong>2. Procurement Guidelines:</strong> Commodity procurement is subject to FAQ moisture, foreign matter, and impurity tolerances specified by government procurement agencies.
                  </p>
                </>
              )}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800 cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
