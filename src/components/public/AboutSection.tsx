import React from 'react';
import { Sprout, Users, ShieldCheck, Target, Award, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();

  const values = [
    {
      icon: Users,
      title: language === 'mr' ? 'शेतकरी केंद्रित सहकार्य' : 'Farmer-Led Collective',
      desc: language === 'mr'
        ? 'शेतकऱ्यांनी शेतकऱ्यांच्या कल्याणासाठी स्थापन केलेली अधिकृत संस्था, जिथे प्रत्येक सदस्याला मतदानाचा व लाभांशाचा हक्क आहे.'
        : 'Organized and steered by local agricultural producers to ensure fair pricing, transparent representation, and collective bargaining.',
    },
    {
      icon: ShieldCheck,
      title: language === 'mr' ? 'पारदर्शक वजन व खरेदी' : 'Transparent PSS Procurement',
      desc: language === 'mr'
        ? 'इलेक्ट्रॉनिक वजनकाटा व अधिकृत लॅब गुणवत्ता तपासणीद्वारे दलालांशिवाय थेट शासकीय हमीभाव (MSP) मिळवून देण्याची हमी.'
        : 'Digital weighbridge calibration and standardized FAQ grading ensuring zero middlemen exploitation at the Kerwadi procurement yard.',
    },
    {
      icon: Sprout,
      title: language === 'mr' ? 'उच्च दर्जाची कृषी निविष्ठा' : 'Certified Seeds & Subsidies',
      desc: language === 'mr'
        ? 'प्रमाणित बियाणे, जैविक खते आणि आधुनिक यंत्रे सवलतीच्या दरात शेतकऱ्यांना गावात उपलब्ध करून देणे.'
        : 'Direct linkage with agricultural universities and research institutes for foundation seed varieties and customized organic inputs.',
    },
    {
      icon: Target,
      title: language === 'mr' ? 'शासकीय योजनांचे सहकार्य' : 'MahaDBT & Welfare Linkage',
      desc: language === 'mr'
        ? 'ठिबक सिंचन, कृषी यांत्रिकीकरण व पोकरा योजनांसाठी शेतकऱ्यांना अर्ज भरण्यापासून मंजुरीपर्यंत मोफत मार्गदर्शन.'
        : 'End-to-end handholding for smallholders to apply and receive MahaDBT and central farm welfare subsidies without bureaucratic delay.',
    },
  ];

  return (
    <section className="py-16 relative" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-md">
              <Sprout className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'आमची ओळख व ध्येय' : 'About Our Organization'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {language === 'mr'
                ? 'जयश्री कृषी ॲग्रो शेतकरी उत्पादक कंपनी लि., परभणी'
                : 'Jayashree Krishi Agro Farmer Producer Company Ltd.'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'जयश्री कृषी ॲग्रो शेतकरी उत्पादक कंपनी लि. ही महाराष्ट्र शासनाच्या परभणी जिल्ह्यातील केरवाडी येथे कार्यरत असलेली अग्रगण्य शेतकरी उत्पादक संस्था आहे. ग्रामीण अर्थव्यवस्थेला चालना देण्यासाठी आणि पारंपारिक शेतीला शाश्वत नफ्यात बदलण्यासाठी कंपनीने शेकडो शेतकऱ्यांना एकत्र आणले आहे.'
                : 'Headquartered in Kerwadi, Parbhani District, Jayashree Krishi Agro Farmer Producer Company Ltd. operates as a vital agricultural pillar across Marathwada. By aggregating produce and integrating modern digital lot-tracking, we connect local cultivators directly to institutional buyers and government procurement mechanisms.'}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'कंपनीच्या केरवाडी खरेदी केंद्रावर हरभरा, सोयाबीन व इतर पिकांची नोंदणीकृत पारदर्शक खरेदी केली जाते. यासोबतच आधुनिक कृषी यंत्रे भाडेतत्त्वावर देणे व माती परीक्षण शिबिरांचे आयोजन केले जाते.'
                : 'With over 500 active member farmers recorded in our centralized registry, the FPC oversees transparent electronic gate entry, weighment, grading, and prompt Direct Benefit Transfer payments under central Price Support Schemes (PSS).'}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-emerald-800">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Kerwadi, Dist. Parbhani</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Ministry of Corporate Affairs Reg.</span>
              </span>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5">
            <div className="glass-card-emerald p-6 sm:p-8 rounded-3xl space-y-4 shadow-lg border border-emerald-500/20">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'mr' ? 'महत्त्वाचे उद्दिष्टे (Mission)' : 'Core Mission & Vision'}
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>
                    <strong>Fair Remuneration:</strong> Guaranteeing full Minimum Support Price (MSP) realization without weight deduction or transit delays.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>
                    <strong>Input Cost Reduction:</strong> Wholesale procurement of certified seeds and bio-fertilizers passed directly to farmers at cost price.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>
                    <strong>Climate Resilience:</strong> Encouraging micro-irrigation and drought-resistant crops in the Marathwada agro-climatic zone.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>
                    <strong>Digital Inclusion:</strong> Educating member farmers to access MahaDBT subsidies and digital gate receipts without paperwork barriers.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="glass-panel p-5 rounded-2xl space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{v.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
