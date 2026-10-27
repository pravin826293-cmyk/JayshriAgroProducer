import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    village: '',
    purpose: 'procurement',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError(language === 'mr' ? 'कृपया आपले पूर्ण नाव प्रविष्ट करा.' : 'Please enter your full name.');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, '').length < 10) {
      setFormError(language === 'mr' ? 'कृपया वैध १० अंकी मोबाईल नंबर प्रविष्ट करा.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        mobile: '',
        village: '',
        purpose: 'procurement',
        message: '',
      });
    }, 600);
  };

  return (
    <section className="py-16 relative" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-md">
            <Mail className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'शेतकरी मदत व संपर्क कक्ष' : 'Farmer Support & Inquiries'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('sec.contactTitle')}
          </h2>
          <p className="text-sm text-slate-600">
            {language === 'mr'
              ? 'खरेदी टोकन, बियाणे उपलब्धता किंवा शासकीय अनुदानासाठी आमच्या केरवाडी केंद्राशी थेट संपर्क साधा.'
              : 'Reach out to our procurement officers and agricultural field staff for inquiries, tokens, or scheme guidance.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coordinates & Center Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 rounded-3xl space-y-6">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                {language === 'mr' ? 'मुख्य खरेदी व संकलन केंद्र' : 'Main Center & Godown Yard'}
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">
                      {language === 'mr' ? 'पत्ता व स्थान:' : 'Office & Procurement Yard:'}
                    </span>
                    <p className="text-slate-600 leading-relaxed mt-0.5">
                      Jayashree Krishi Agro Farmer Producer Company Ltd.<br />
                      At Post Kerwadi, Gangakhed / Palam Taluka,<br />
                      District Parbhani, Maharashtra - 431514
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">
                      {language === 'mr' ? 'थेट संपर्क क्रमांक:' : 'Helpline & In-charge:'}
                    </span>
                    <p className="text-slate-600 leading-relaxed mt-0.5 font-mono">
                      +91 93252 78823 (Center Operations)<br />
                      +91 94236 55666 (Machinery & Inputs)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">
                      {language === 'mr' ? 'अधिकृत ईमेल:' : 'Official Email:'}
                    </span>
                    <p className="text-slate-600 leading-relaxed mt-0.5 font-mono">
                      contact@jayashreeagro.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">
                      {language === 'mr' ? 'कामाचे तास:' : 'Yard Working Hours:'}
                    </span>
                    <p className="text-slate-600 leading-relaxed mt-0.5">
                      Monday to Saturday: 9:00 AM – 6:30 PM<br />
                      (Sunday closed except for emergency seasonal procurement)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-md">
              <h3 className="font-bold text-slate-900 text-base mb-1">
                {language === 'mr' ? 'शेतकरी चौकशी व नोंदणी संदेश' : 'Submit Farmer Inquiry or Token Request'}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {language === 'mr'
                  ? 'आपला संदेश पाठवा, आमचे केंद्र प्रतिनिधी २४ तासांत आपल्याशी संपर्क साधतील.'
                  : 'Fill the form below and our agricultural operations desk will respond within 24 hours.'}
              </p>

              {submitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-950 text-base">
                    {language === 'mr' ? 'संदेश यशस्वीरित्या पाठवला आहे!' : 'Inquiry Successfully Submitted!'}
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    {language === 'mr'
                      ? 'आपला चौकशी संदेश जयश्री कृषी ॲग्रो एफपीसीच्या केरवाडी केंद्रास मिळाला आहे. आमचे प्रतिनिधी लवकरच संपर्क साधतील.'
                      : 'Thank you for reaching out to Jayashree Krishi Agro FPC Ltd. Our field representative will review your message promptly.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 cursor-pointer"
                  >
                    {language === 'mr' ? 'दुसरा संदेश पाठवा' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {formError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 block">
                        {language === 'mr' ? 'शेतकऱ्याचे नाव *' : 'Farmer Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rameshwar Patil"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 block">
                        {language === 'mr' ? 'मोबाईल नंबर *' : 'Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="e.g. 98XXXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 block">
                        {language === 'mr' ? 'गाव / तालुका' : 'Village / Taluka'}
                      </label>
                      <input
                        type="text"
                        value={formData.village}
                        onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                        placeholder="e.g. Kerwadi / Palam"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 block">
                        {language === 'mr' ? 'चौकशीचा विषय' : 'Inquiry Purpose'}
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
                      >
                        <option value="procurement">{language === 'mr' ? 'हमीभाव खरेदी व टोकन' : 'MSP Procurement & Token'}</option>
                        <option value="seeds">{language === 'mr' ? 'प्रमाणित बियाणे वाटप' : 'Certified Seed Distribution'}</option>
                        <option value="machinery">{language === 'mr' ? 'अवजारे भाडे (CHC)' : 'Custom Hiring Machinery Rental'}</option>
                        <option value="mahadbt">{language === 'mr' ? 'महाडीबीटी शासकीय योजना मदत' : 'MahaDBT Subsidy Assistance'}</option>
                        <option value="membership">{language === 'mr' ? 'कंपनी सभासदत्व नोंदणी' : 'FPC Shareholder Membership'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      {language === 'mr' ? 'आपला संदेश / प्रश्न' : 'Detailed Message'}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === 'mr' ? 'आपला संदेश येथे लिहा...' : 'Provide details regarding your query or requirement...'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
                    />
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Sending...' : (language === 'mr' ? 'संदेश पाठवा' : 'Send Inquiry Message')}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
