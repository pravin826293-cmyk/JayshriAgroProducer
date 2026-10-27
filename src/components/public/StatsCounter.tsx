import React from 'react';
import { Users, BookOpen, Bell, Landmark, Scale, IndianRupee } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';

export const StatsCounter: React.FC = () => {
  const { language } = useLanguage();
  const { stats, isLoading } = useData();

  const statCards = [
    {
      id: 'farmers',
      label: language === 'mr' ? 'नोंदणीकृत शेतकरी सभासद' : 'Registered Member Farmers',
      value: stats.totalFarmers,
      suffix: '',
      subtext: language === 'mr' ? 'परभणी व लगतचे तालुके' : 'Parbhani & Nearby Talukas',
      icon: Users,
      color: 'emerald',
    },
    {
      id: 'companySchemes',
      label: language === 'mr' ? 'कंपनी कृषी योजना' : 'Available Company Schemes',
      value: stats.publishedCompanySchemes,
      suffix: '',
      subtext: language === 'mr' ? 'बियाणे, अवजारे व खरेदी' : 'Seeds, CHC & Input subsidies',
      icon: BookOpen,
      color: 'teal',
    },
    {
      id: 'govtSchemes',
      label: language === 'mr' ? 'शासकीय कृषी योजना' : 'Govt Agricultural Schemes',
      value: stats.activeGovtSchemes,
      suffix: '',
      subtext: language === 'mr' ? 'महाडीबीटी व कृषी विभाग' : 'MahaDBT & State Portals',
      icon: Landmark,
      color: 'blue',
    },
    {
      id: 'announcements',
      label: language === 'mr' ? 'सक्रिय सूचना व वार्ता' : 'Active Announcements',
      value: stats.activeAnnouncements,
      suffix: '',
      subtext: language === 'mr' ? 'हवामान, टोकन व खरेदी' : 'Procurement & crop advisories',
      icon: Bell,
      color: 'amber',
    },
    {
      id: 'quantity',
      label: language === 'mr' ? 'एकूण हरभरा आवक' : 'Total Procurement Volume',
      value: stats.totalQuantityQtl.toLocaleString('en-IN'),
      suffix: ' Qtl',
      subtext: language === 'mr' ? `${stats.totalBags.toLocaleString('en-IN')} पोती (५० कि.ग्रा.)` : `${stats.totalBags.toLocaleString('en-IN')} Jute Bags (50kg)`,
      icon: Scale,
      color: 'purple',
    },
    {
      id: 'tradeValue',
      label: language === 'mr' ? 'शेतकऱ्यांना वितरित रक्कम' : 'Total Trade Value',
      value: `₹${(stats.totalTradeValue / 100000).toFixed(2)}`,
      suffix: ' Lakhs',
      subtext: language === 'mr' ? 'थेट बँक खात्यात हमीभाव' : 'Direct DBT Bank Payouts',
      icon: IndianRupee,
      color: 'green',
    },
  ];

  return (
    <section className="py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          {statCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="glass-panel glass-panel-hover p-4 rounded-2xl flex flex-col justify-between transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Live Data
                  </span>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono tabular-nums leading-none mb-1">
                    {isLoading ? (
                      <span className="inline-block w-12 h-6 bg-slate-200 animate-pulse rounded" />
                    ) : (
                      <>
                        {item.value}
                        <span className="text-xs font-semibold text-slate-500 ml-0.5">{item.suffix}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-700 line-clamp-1 leading-snug">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {item.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
