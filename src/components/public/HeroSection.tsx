import React from 'react';
import { ArrowRight, Sparkles, Sprout, ShieldCheck, FileText, ChevronRight, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';

interface HeroSectionProps {
  onExploreSchemes: () => void;
  onViewAnnouncements: () => void;
  onOpenMatcher: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSchemes,
  onViewAnnouncements,
  onOpenMatcher,
}) => {
  const { language, t } = useLanguage();
  const { stats } = useData();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background radial aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 via-emerald-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-900 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {language === 'mr' ? (
                <>
                  शेतकऱ्यांचे सक्षमीकरण, <br className="hidden sm:inline" />
                  <span className="text-emerald-700">समृद्धीची नवी क्षितिजे</span>
                </>
              ) : (
                <>
                  Empowering Farmers Through <br className="hidden sm:inline" />
                  <span className="text-emerald-700">Better Agricultural Opportunities</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreSchemes}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 transition-all shadow-md shadow-emerald-700/25 hover:shadow-lg hover:shadow-emerald-700/30 cursor-pointer"
              >
                <span>{t('hero.cta.schemes')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewAnnouncements}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-xl text-slate-700 bg-white/80 hover:bg-white border border-emerald-500/20 hover:border-emerald-500/40 transition-all shadow-xs cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>{t('hero.cta.announcements')}</span>
              </button>

              <button
                onClick={onOpenMatcher}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-xl text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-300/60 transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{t('hero.cta.eligibility')}</span>
              </button>
            </div>

            {/* Key trust bullets */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Fair MSP Electronic Procurement</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Quality Certified Seed Distribution</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>MahaDBT Subsidy Assistance</span>
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Glass Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card frame */}
              <div className="glass-card-emerald p-6 sm:p-8 rounded-3xl shadow-xl shadow-emerald-900/5 relative overflow-hidden">
                {/* Organic badge */}
                <div className="flex items-center justify-between pb-6 border-b border-emerald-500/15">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-700">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                        Operational Center
                      </span>
                      <span className="text-base font-bold text-slate-900">
                        Kerwadi, Parbhani
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">
                    Active FPC
                  </span>
                </div>

                {/* Key live metrics highlight */}
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="p-4 rounded-2xl bg-white/80 border border-emerald-500/15 shadow-xs">
                    <span className="text-xs text-slate-500 block mb-1">
                      {language === 'mr' ? 'नोंदणीकृत शेतकरी' : 'Member Farmers'}
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                      {stats.totalFarmers > 0 ? stats.totalFarmers : '500+'}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                      ↑ Parbhani Cluster
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/80 border border-emerald-500/15 shadow-xs">
                    <span className="text-xs text-slate-500 block mb-1">
                      {language === 'mr' ? 'खरेदी लॉट्स (चना)' : 'Procurement Lots'}
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
                      {stats.activeLots > 0 ? stats.activeLots : '520+'}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      PSS Rabi Season
                    </span>
                  </div>
                </div>

                {/* Banner message */}
                <div className="p-4 rounded-2xl bg-emerald-900 text-white text-xs leading-relaxed space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-300">
                      {language === 'mr' ? 'चालू हमीभाव खरेदी दर' : 'Current MSP Rate (Chana)'}
                    </span>
                    <span className="font-mono font-bold text-amber-300 text-sm">₹5,875 / Qtl</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    {language === 'mr'
                      ? 'केरवाडी केंद्रावर इलेक्ट्रॉनिक वजनकाट्यासह पारदर्शक खरेदी सुरू आहे.'
                      : 'Digital weighing & moisture grading in progress at Kerwadi Center.'}
                  </p>
                </div>

                {/* Action button */}
                <button
                  onClick={onExploreSchemes}
                  className="w-full mt-4 py-2.5 px-4 text-xs font-semibold rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>{language === 'mr' ? 'योजनांची संपूर्ण यादी पहा' : 'View All Active Schemes'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
