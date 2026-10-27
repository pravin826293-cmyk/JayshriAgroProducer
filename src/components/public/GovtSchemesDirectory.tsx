import React, { useState, useMemo } from 'react';
import { ExternalLink, Landmark, ShieldCheck, CheckCircle2, Search, FileText, Calendar, Info } from 'lucide-react';
import { GovtScheme } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';

export const GovtSchemesDirectory: React.FC = () => {
  const { language, t } = useLanguage();
  const { govtSchemes } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalScheme, setActiveModalScheme] = useState<GovtScheme | null>(null);

  const categories = useMemo(() => {
    const list = Array.from(new Set(govtSchemes.map((s) => s.category)));
    return ['All', ...list];
  }, [govtSchemes]);

  const filteredSchemes = useMemo(() => {
    return govtSchemes.filter((s) => {
      const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.nameMr.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.shortDescMr.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [govtSchemes, selectedCategory, searchQuery]);

  return (
    <section className="py-12 bg-gradient-to-b from-transparent via-emerald-50/30 to-transparent relative" id="govtschemes-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* MahaDBT Prominent Hero Callout Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/25 relative overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                <Landmark className="w-3.5 h-3.5" />
                <span>Maharashtra Government Direct Benefit Transfer</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {language === 'mr'
                  ? 'महाडीबीटी शेतकरी पोर्टल (MahaDBT Farmer Portal)'
                  : 'Official Maharashtra MahaDBT Farmer Portal'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {language === 'mr'
                  ? 'ट्रॅक्टर, ठिबक सिंचन, तुषार, शेततळे, बियाणे आणि सौर कृषी पंपाच्या अनुदानासाठी महाराष्ट्र शासनाचे अधिकृत पोर्टल. एकाच अर्जाद्वारे विविध योजनांचा लाभ मिळवा.'
                  : 'Direct single-window portal by the Government of Maharashtra for agricultural subsidies including tractors, micro-irrigation, horticulture, and farm ponds.'}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href="https://mahadbt.maharashtra.gov.in/Farmer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <span>{t('sec.visitMahaDbt')}</span>
                <ExternalLink className="w-4 h-4 text-slate-900" />
              </a>
            </div>
          </div>
        </div>

        {/* Section Heading & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
              <Landmark className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'शासकीय कृषी योजना मार्गदर्शिका' : 'State Agricultural Directory'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('sec.govtSchemes')}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              {t('sec.govtSchemesSub')}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'mr' ? 'शासकीय योजना शोधा...' : 'Search govt schemes...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat === 'All' ? (language === 'mr' ? 'सर्व शासकीय योजना' : 'All Govt Schemes') : cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => {
            const name = language === 'mr' ? scheme.nameMr : scheme.name;
            const dept = language === 'mr' ? scheme.departmentMr : scheme.department;
            const category = language === 'mr' ? scheme.categoryMr : scheme.category;
            const desc = language === 'mr' ? scheme.shortDescMr : scheme.shortDesc;
            const elig = language === 'mr' ? scheme.eligibilitySummaryMr : scheme.eligibilitySummary;
            const benefits = language === 'mr' ? scheme.benefitsMr : scheme.benefits;

            return (
              <div
                key={scheme.id}
                className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between transition-all group"
              >
                <div className="space-y-4">
                  {/* Category & Verified Badge */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified: {scheme.lastVerifiedDate}</span>
                    </span>
                  </div>

                  {/* Title & Department */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
                      {name}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium block mt-1">
                      {dept}
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {desc}
                  </p>

                  {/* Benefits Box */}
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
                    <span className="font-bold text-emerald-950 uppercase tracking-wider text-[10px] block mb-1">
                      {language === 'mr' ? 'अनुदान / लाभ:' : 'Subsidy & Assistance:'}
                    </span>
                    <p className="text-emerald-900 leading-relaxed line-clamp-2">
                      {benefits}
                    </p>
                  </div>

                  {/* Eligibility summary */}
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800 block text-[11px] mb-0.5">
                      {language === 'mr' ? 'पात्रता सारांश:' : 'Eligibility Summary:'}
                    </span>
                    <p className="line-clamp-2 text-slate-600 text-[11px]">
                      {elig}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalScheme(scheme)}
                    className="text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    {t('btn.viewDetails')}
                  </button>

                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>{language === 'mr' ? 'अधिकृत पोर्टल' : 'Official Portal'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Govt Scheme Detail Modal */}
      {activeModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-2xl w-full glass-dropdown p-6 sm:p-8 rounded-3xl border border-emerald-500/25 max-h-[90vh] overflow-y-auto space-y-6 text-slate-800 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                  {language === 'mr' ? activeModalScheme.categoryMr : activeModalScheme.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 leading-snug">
                  {language === 'mr' ? activeModalScheme.nameMr : activeModalScheme.name}
                </h2>
                <span className="text-xs text-slate-500 block mt-1">
                  {language === 'mr' ? activeModalScheme.departmentMr : activeModalScheme.department}
                </span>
              </div>
              <button
                onClick={() => setActiveModalScheme(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed">
              <div>
                <span className="font-bold text-slate-800 text-xs block mb-1 uppercase tracking-wider">
                  {language === 'mr' ? 'योजनेचा उद्देश:' : 'Scheme Objective & Description:'}
                </span>
                <p className="text-slate-600 text-sm">
                  {language === 'mr' ? activeModalScheme.shortDescMr : activeModalScheme.shortDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-950 text-xs block mb-1">
                  {language === 'mr' ? 'अनुदान स्वरूप व आर्थिक लाभ:' : 'Financial Subsidy Scale:'}
                </span>
                <p className="text-emerald-900">
                  {language === 'mr' ? activeModalScheme.benefitsMr : activeModalScheme.benefits}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 text-xs block mb-1 uppercase tracking-wider">
                  {language === 'mr' ? 'पात्रतेचे निकष:' : 'Detailed Eligibility Criteria:'}
                </span>
                <p className="text-slate-600">
                  {language === 'mr' ? activeModalScheme.eligibilitySummaryMr : activeModalScheme.eligibilitySummary}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 text-xs block mb-2 uppercase tracking-wider">
                  {language === 'mr' ? 'आवश्यक अधिकृत कागदपत्रे:' : 'Required Verification Documents:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalScheme.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-between">
                <span>
                  <strong>{language === 'mr' ? 'अधिकृत स्रोत:' : 'Official Source:'}</strong> {activeModalScheme.officialSource}
                </span>
                <span className="text-[11px] text-slate-500">
                  Verified: {activeModalScheme.lastVerifiedDate}
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <button
                onClick={() => setActiveModalScheme(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {language === 'mr' ? 'बंद करा' : 'Close'}
              </button>

              <a
                href={activeModalScheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
              >
                <span>{language === 'mr' ? 'अधिकृत पोर्टलवर अर्ज करा' : 'Open Official Govt Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
