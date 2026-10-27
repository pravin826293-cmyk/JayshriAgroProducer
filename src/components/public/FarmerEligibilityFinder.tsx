import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Landmark, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';

export const FarmerEligibilityFinder: React.FC = () => {
  const { language, t } = useLanguage();
  const { companySchemes, govtSchemes } = useData();

  // Filters
  const [crop, setCrop] = useState<string>('chana');
  const [landholding, setLandholding] = useState<string>('small');
  const [farmerCategory, setFarmerCategory] = useState<string>('small_marginal');
  const [irrigation, setIrrigation] = useState<string>('borewell');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  // Matched schemes calculation
  const matchedOpportunities = React.useMemo(() => {
    // Company matches
    const matchedCompany = companySchemes.filter((s) => {
      if (crop === 'chana' && s.id === 'CS-001') return true;
      if (s.id === 'CS-002') return true; // CHC open to all
      if (crop === 'chana' && s.id === 'CS-003') return true; // Chana MSP
      if (s.id === 'CS-004') return true; // Soil test
      return false;
    });

    // Govt matches
    const matchedGovt = govtSchemes.filter((g) => {
      if (g.id === 'GS-001') return true; // Machinery
      if (irrigation !== 'rainfed' && (g.id === 'GS-002' || g.id === 'GS-003')) return true; // Drip/PoCRA
      if (g.id === 'GS-004') return true; // PM Kisan
      if (farmerCategory === 'sc_st' && g.id === 'GS-005') return true; // Ambedkar scheme
      if ((crop === 'horticulture' || landholding !== 'large') && g.id === 'GS-006') return true;
      return false;
    });

    return { company: matchedCompany, govt: matchedGovt };
  }, [crop, landholding, farmerCategory, irrigation, companySchemes, govtSchemes]);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasEvaluated(true);
  };

  return (
    <section className="py-12 relative" id="matcher-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'mr' ? 'डिजिटल योजना पात्रता शोधक' : 'Farmer Scheme Matcher'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('sec.matcherTitle')}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('sec.matcherSub')}
          </p>
        </div>

        {/* Filter Configuration Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-md max-w-4xl mx-auto">
          <form onSubmit={handleEvaluate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Primary Crop */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {language === 'mr' ? '१. मुख्य पीक निवडा' : '1. Primary Crop'}
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
                >
                  <option value="chana">{language === 'mr' ? 'हरभरा (Bengal Gram / Chana)' : 'Bengal Gram (Chana)'}</option>
                  <option value="soybean">{language === 'mr' ? 'सोयाबीन (Soybean)' : 'Soybean'}</option>
                  <option value="cotton">{language === 'mr' ? 'कापूस (Cotton)' : 'Cotton'}</option>
                  <option value="tur">{language === 'mr' ? 'तूर (Pigeon Pea / Tur)' : 'Pigeon Pea (Tur)'}</option>
                  <option value="horticulture">{language === 'mr' ? 'फळबाग (मोसंबी / पेरू / डाळिंब)' : 'Horticulture (Sweet Lime / Guava)'}</option>
                </select>
              </div>

              {/* Landholding Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {language === 'mr' ? '२. शेतजमीन धारणा' : '2. Landholding Size'}
                </label>
                <select
                  value={landholding}
                  onChange={(e) => setLandholding(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
                >
                  <option value="marginal">{language === 'mr' ? 'अत्यल्प भूधारक (< १ हेक्टर / २.५ एकर)' : 'Marginal (< 1 Hectare / 2.5 Acres)'}</option>
                  <option value="small">{language === 'mr' ? 'अल्प भूधारक (१ ते २ हेक्टर / ५ एकर)' : 'Small (1 to 2 Hectares / 5 Acres)'}</option>
                  <option value="medium">{language === 'mr' ? 'मध्यम भूधारक (२ ते ५ हेक्टर)' : 'Medium (2 to 5 Hectares)'}</option>
                  <option value="large">{language === 'mr' ? 'मोठे शेतकरी (> ५ हेक्टर)' : 'Large (> 5 Hectares)'}</option>
                </select>
              </div>

              {/* Irrigation Arrangement */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {language === 'mr' ? '३. पाणी व सिंचन सोय' : '3. Irrigation Status'}
                </label>
                <select
                  value={irrigation}
                  onChange={(e) => setIrrigation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
                >
                  <option value="borewell">{language === 'mr' ? 'विहीर / बोअरवेल (Well/Borewell)' : 'Well / Borewell'}</option>
                  <option value="drip">{language === 'mr' ? 'ठिबक / तुषार सिंचन उपलब्ध' : 'Existing Drip/Sprinkler'}</option>
                  <option value="farm_pond">{language === 'mr' ? 'शेततळे (Farm Pond)' : 'Farm Pond'}</option>
                  <option value="rainfed">{language === 'mr' ? 'कोरडवाहू शेती (Rainfed)' : 'Rainfed / Non-irrigated'}</option>
                </select>
              </div>

              {/* Social / Farmer Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {language === 'mr' ? '४. शेतकरी प्रवर्ग' : '4. Beneficiary Category'}
                </label>
                <select
                  value={farmerCategory}
                  onChange={(e) => setFarmerCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
                >
                  <option value="small_marginal">{language === 'mr' ? 'लहान / अल्पभूधारक (General/OBC)' : 'Small & Marginal Farmer'}</option>
                  <option value="women">{language === 'mr' ? 'महिला शेतकरी (Women Farmer)' : 'Women Farmer (50% Higher Slab)'}</option>
                  <option value="sc_st">{language === 'mr' ? 'अनुसूचित जाती / जमाती (SC/ST)' : 'SC / ST Category'}</option>
                  <option value="general">{language === 'mr' ? 'इतर शेतकरी (General Farmer)' : 'General Farmer'}</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">
                🔒 Privacy guaranteed. No Aadhaar or phone required for matching.
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
              >
                {language === 'mr' ? 'माझ्यासाठी योजना शोधा' : 'Check Matching Opportunities'}
              </button>
            </div>
          </form>
        </div>

        {/* Results Showcase */}
        {hasEvaluated && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Mandatory Regulatory Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300/80 text-amber-950 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">
                  {language === 'mr' ? 'महत्त्वाची सूचना व कायदेशीर अस्वीकरण:' : 'Important Matching Disclaimer:'}
                </span>
                <p className="leading-relaxed">
                  {language === 'mr'
                    ? 'हा शोध केवळ संभाव्य योजनांची माहिती देण्यासाठी आहे. अंतिम पात्रता, कागदपत्रांची छाननी आणि अनुदानाची मंजुरी संबंधित शासकीय विभाग अथवा कंपनीच्या नियमांनुसारच केली जाते.'
                    : 'This tool provides automated matching based on your declared parameters. Final eligibility for government benefits is determined solely by the responsible Maharashtra state department upon official portal verification.'}
                </p>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Matched Company Opportunities */}
              <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-emerald-500/15">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    {language === 'mr' ? 'जयश्री कृषी ॲग्रो कंपनी योजना (शिफारस)' : 'Relevant Jayashree FPC Initiatives'}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold ml-auto">
                    {matchedOpportunities.company.length} Matches
                  </span>
                </div>

                <div className="space-y-3">
                  {matchedOpportunities.company.map((s) => (
                    <div key={s.id} className="p-3.5 rounded-xl bg-white border border-emerald-100 space-y-1.5 shadow-xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{language === 'mr' ? s.titleMr : s.title}</span>
                        <span className="text-emerald-700 font-semibold text-[11px]">{s.category}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {language === 'mr' ? s.shortDescMr : s.shortDesc}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Deadline: {s.endDate}</span>
                        <span className="font-medium text-emerald-700">Kerwadi Center</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matched Government Schemes */}
              <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-blue-500/15">
                  <Landmark className="w-4 h-4 text-blue-700" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    {language === 'mr' ? 'महाराष्ट्र शासन योजना (शिफारस)' : 'Relevant Maharashtra Govt Schemes'}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold ml-auto">
                    {matchedOpportunities.govt.length} Matches
                  </span>
                </div>

                <div className="space-y-3">
                  {matchedOpportunities.govt.map((g) => (
                    <div key={g.id} className="p-3.5 rounded-xl bg-white border border-blue-100 space-y-1.5 shadow-xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{language === 'mr' ? g.nameMr : g.name}</span>
                        <span className="text-blue-700 font-semibold text-[11px]">{g.category}</span>
                      </div>
                      <p className="text-xs text-emerald-900 bg-emerald-50/70 p-2 rounded-lg line-clamp-2">
                        <strong>Subsidy:</strong> {language === 'mr' ? g.benefitsMr : g.benefits}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Portal: {g.officialSource}</span>
                        <a
                          href={g.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 font-semibold inline-flex items-center gap-1 hover:underline"
                        >
                          <span>Apply on Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
