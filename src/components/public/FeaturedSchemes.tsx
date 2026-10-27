import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Calendar, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { CompanyScheme } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SchemeDetailModal } from './SchemeDetailModal';

export const FeaturedSchemes: React.FC<{ onNavigateToContact: () => void }> = ({ onNavigateToContact }) => {
  const { language, t } = useLanguage();
  const { companySchemes } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedScheme, setSelectedScheme] = useState<CompanyScheme | null>(null);

  // Available categories
  const categories = useMemo(() => {
    const list = Array.from(new Set(companySchemes.map((s) => s.category)));
    return ['All', ...list];
  }, [companySchemes]);

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return companySchemes.filter((scheme) => {
      // Must be published or featured
      if (scheme.status !== 'Published' && scheme.status !== 'Expired') return false;

      const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        scheme.title.toLowerCase().includes(q) ||
        scheme.titleMr.toLowerCase().includes(q) ||
        scheme.shortDesc.toLowerCase().includes(q) ||
        scheme.shortDescMr.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [companySchemes, selectedCategory, searchQuery]);

  return (
    <section className="py-12 relative" id="schemes-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'जयश्री कृषी ॲग्रो उपक्रम' : 'Company Initiatives'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('sec.featuredSchemes')}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              {t('sec.featuredSchemesSub')}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'mr' ? 'योजना शोधा...' : 'Search company schemes...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat === 'All' ? (language === 'mr' ? 'सर्व योजना' : 'All Schemes') : cat}
            </button>
          ))}
        </div>

        {/* Scheme Cards Grid */}
        {filteredSchemes.length === 0 ? (
          <div className="p-12 text-center glass-panel rounded-2xl text-slate-500 text-xs">
            {language === 'mr' ? 'या वर्गवारीत कोणतीही योजना उपलब्ध नाही.' : 'No schemes match your criteria.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => {
              const title = language === 'mr' ? scheme.titleMr : scheme.title;
              const shortDesc = language === 'mr' ? scheme.shortDescMr : scheme.shortDesc;
              const benefits = language === 'mr' ? scheme.benefitsMr : scheme.benefits;
              const category = language === 'mr' ? scheme.categoryMr : scheme.category;
              const isExpired = scheme.status === 'Expired' || new Date(scheme.endDate) < new Date();

              return (
                <div
                  key={scheme.id}
                  className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between transition-all relative overflow-hidden group"
                >
                  {scheme.isFeatured && (
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                      <div className="bg-amber-500 text-white text-[9px] font-bold py-0.5 w-24 text-center transform rotate-45 translate-x-6 translate-y-3 shadow-xs">
                        FEATURED
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Category & Status */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
                        {category}
                      </span>
                      {isExpired ? (
                        <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-200">
                          {language === 'mr' ? 'मुदत संपली' : 'Expired'}
                        </span>
                      ) : (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200">
                          {language === 'mr' ? 'सक्रिय' : 'Active'}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
                      {title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {shortDesc}
                    </p>

                    {/* Benefits Preview */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        {language === 'mr' ? 'मुख्य फायदे:' : 'Key Benefits:'}
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {benefits.slice(0, 2).map((b, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer metadata & Details action */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{scheme.endDate}</span>
                    </div>

                    <button
                      onClick={() => setSelectedScheme(scheme)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      <span>{t('btn.viewDetails')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
          onContactClick={onNavigateToContact}
        />
      )}
    </section>
  );
};
