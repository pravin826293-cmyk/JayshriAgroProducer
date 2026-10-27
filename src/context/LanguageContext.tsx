import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.brand': 'Jayashree Krishi Agro FPC',
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.companySchemes': 'Company Schemes',
    'nav.govtSchemes': 'Govt Schemes',
    'nav.eligibility': 'Scheme Matcher',
    'nav.announcements': 'Announcements',
    'nav.contact': 'Contact Us',
    'nav.adminPortal': 'Admin Portal',
    'nav.adminLogout': 'Logout',

    // Hero
    'hero.badge': 'Farmer Producer Company • Parbhani, Maharashtra',
    'hero.title': 'Empowering Farmers Through Better Opportunities',
    'hero.subtitle': 'Discover company benefits, verified Maharashtra government schemes, fair MSP procurement, and vital updates for farmers in Parbhani.',
    'hero.cta.schemes': 'Explore Schemes',
    'hero.cta.announcements': 'View Announcements',
    'hero.cta.eligibility': 'Check Scheme Match',

    // Stats
    'stats.farmers': 'Registered Farmers',
    'stats.procurement': 'Procurement Lots',
    'stats.schemes': 'Available Schemes',
    'stats.govtSchemes': 'Govt Schemes',
    'stats.totalQuantity': 'Total Procured (Qtl)',
    'stats.totalDisbursed': 'Trade Value (₹)',

    // Sections
    'sec.featuredSchemes': 'Featured Agricultural Schemes',
    'sec.featuredSchemesSub': 'Subsidized inputs, custom hiring mechanization, and procurement initiatives by Jayashree Krishi Agro FPC.',
    'sec.govtSchemes': 'Maharashtra Government Agricultural Schemes',
    'sec.govtSchemesSub': 'Official direct portals, subsidies, and assistance programs including the MahaDBT Farmer Portal.',
    'sec.visitMahaDbt': 'Visit Official MahaDBT Portal',
    'sec.announcements': 'Latest News & Official Announcements',
    'sec.announcementsSub': 'Timely updates on MSP procurement tokens, monsoon advisories, and subsidy lottery distributions.',
    'sec.matcherTitle': 'Find Schemes Suitable for Your Farm',
    'sec.matcherSub': 'Select your crop and landholding to discover personalized opportunities.',
    'sec.aboutTitle': 'About Jayashree Krishi Agro Farmer Producer Company Ltd.',
    'sec.contactTitle': 'Contact Our Operations Center',

    // Common
    'btn.viewDetails': 'View Details',
    'btn.applyNow': 'Apply / Inquire',
    'btn.readMore': 'Read More',
    'btn.search': 'Search',
    'btn.filter': 'Filter',
    'btn.all': 'All',
    'btn.close': 'Close',
    'btn.login': 'Login',
  },
  mr: {
    // Nav
    'nav.brand': 'जयश्री कृषी ॲग्रो एफपीसी',
    'nav.home': 'मुख्यपृष्ठ',
    'nav.about': 'आमच्याबद्दल',
    'nav.companySchemes': 'कंपनी योजना',
    'nav.govtSchemes': 'शासकीय योजना',
    'nav.eligibility': 'योजना पात्रता शोध',
    'nav.announcements': 'महत्त्वाच्या सूचना',
    'nav.contact': 'संपर्क',
    'nav.adminPortal': 'प्रशासक लॉगिन',
    'nav.adminLogout': 'लॉगआउट',

    // Hero
    'hero.badge': 'शेतकरी उत्पादक कंपनी • परभणी, महाराष्ट्र',
    'hero.title': 'शेतकऱ्यांचे सक्षमीकरण, प्रगतीची नवी दालने',
    'hero.subtitle': 'कृषी योजना, शासकीय अनुदान, हमीभाव खरेदी आणि परभणी जिल्ह्यातील शेतकऱ्यांसाठी महत्त्वाच्या ताज्या घडामोडी.',
    'hero.cta.schemes': 'योजना पहा',
    'hero.cta.announcements': 'सूचना पहा',
    'hero.cta.eligibility': 'पात्रता तपासा',

    // Stats
    'stats.farmers': 'नोंदणीकृत शेतकरी',
    'stats.procurement': 'खरेदी लॉट्स',
    'stats.schemes': 'उपलब्ध योजना',
    'stats.govtSchemes': 'शासकीय योजना',
    'stats.totalQuantity': 'एकूण खरेदी (क्विंटल)',
    'stats.totalDisbursed': 'एकूण रक्कम (₹)',

    // Sections
    'sec.featuredSchemes': 'कंपनीच्या कृषी योजना',
    'sec.featuredSchemesSub': 'जयश्री कृषी ॲग्रो एफपॉसीतर्फे राबविल्या जाणाऱ्या सवलतीचे बियाणे, अवजारे भाडे व हमीभाव खरेदी योजना.',
    'sec.govtSchemes': 'महाराष्ट्र शासन कृषी योजना',
    'sec.govtSchemesSub': 'महाडीबीटी शेतकरी पोर्टल आणि कृषी विभागाच्या अधिकृत अनुदानाच्या योजनांची माहिती.',
    'sec.visitMahaDbt': 'अधिकृत महाडीबीटी पोर्टलला भेट द्या',
    'sec.announcements': 'ताज्या सूचना व कृषी वार्ता',
    'sec.announcementsSub': 'हमीभाव टोकन वाटप, हवामान अंदाज, बियाणे वितरण व अनुदानासंदर्भातील अधिकृत माहिती.',
    'sec.matcherTitle': 'आपल्या शेतीसाठी योग्य योजना शोधा',
    'sec.matcherSub': 'आपले मुख्य पीक आणि जमीन निवडून योजनांचे मार्गदर्शन मिळवा.',
    'sec.aboutTitle': 'जयश्री कृषी ॲग्रो शेतकरी उत्पादक कंपनीविषयी',
    'sec.contactTitle': 'आमच्या संपर्क केंद्राशी संवाद साधा',

    // Common
    'btn.viewDetails': 'तपशील पहा',
    'btn.applyNow': 'अर्ज / संपर्क',
    'btn.readMore': 'अधिक वाचा',
    'btn.search': 'शोधा',
    'btn.filter': 'फिल्टर',
    'btn.all': 'सर्व',
    'btn.close': 'बंद करा',
    'btn.login': 'लॉगिन करा',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('jayashree_lang');
    return (saved === 'mr' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('jayashree_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
