import React from 'react';
import { X, CheckCircle2, FileText, Calendar, Phone, ExternalLink, AlertTriangle } from 'lucide-react';
import { CompanyScheme } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface SchemeDetailModalProps {
  scheme: CompanyScheme | null;
  onClose: () => void;
  onContactClick?: () => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
  onContactClick,
}) => {
  const { language } = useLanguage();

  if (!scheme) return null;

  const title = language === 'mr' ? scheme.titleMr : scheme.title;
  const shortDesc = language === 'mr' ? scheme.shortDescMr : scheme.shortDesc;
  const fullDesc = language === 'mr' ? scheme.fullDescMr : scheme.fullDesc;
  const benefits = language === 'mr' ? scheme.benefitsMr : scheme.benefits;
  const eligibility = language === 'mr' ? scheme.eligibilityMr : scheme.eligibility;
  const category = language === 'mr' ? scheme.categoryMr : scheme.category;

  const isExpired = scheme.status === 'Expired' || new Date(scheme.endDate) < new Date();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-w-2xl w-full glass-dropdown p-6 sm:p-8 rounded-3xl border border-emerald-500/25 max-h-[90vh] overflow-y-auto space-y-6 text-slate-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-emerald-500/15 pb-4">
          <div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 leading-snug">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Expired banner if applicable */}
        {isExpired && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {language === 'mr'
                ? 'ही योजना सध्या बंद झाली आहे किंवा अर्जाची मुदत संपली आहे. पुढील हंगामात पुन्हा सुरू होईल.'
                : 'This scheme is currently expired or no longer accepting new applications. Please contact the center for updates.'}
            </span>
          </div>
        )}

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'mr' ? 'योजनेचा तपशील' : 'Scheme Overview'}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {fullDesc || shortDesc}
          </p>
        </div>

        {/* Key Benefits */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'mr' ? 'शेतकऱ्यांसाठी लाभ' : 'Key Benefits & Assistance'}
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {benefits.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Eligibility Criteria */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'mr' ? 'पात्रता निकष' : 'Eligibility Requirements'}
          </h3>
          <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
            {eligibility.map((e, idx) => (
              <li key={idx}>{e}</li>
            ))}
          </ul>
        </div>

        {/* Required Documents */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'mr' ? 'आवश्यक कागदपत्रे' : 'Required Documents'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {scheme.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 text-slate-700">
                <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="line-clamp-1">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline & Procedure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block mb-0.5">{language === 'mr' ? 'कालावधी / मुदत' : 'Timeline & Deadline'}</span>
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{scheme.startDate} to {scheme.endDate}</span>
            </div>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">{language === 'mr' ? 'संपर्क व केंद्र' : 'Inquiries / Contact'}</span>
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{scheme.contactInfo || 'Kerwadi Center: +91 9325278823'}</span>
            </div>
          </div>
        </div>

        {/* Procedure */}
        {scheme.applicationProcedure && (
          <div className="text-xs text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
            <span className="font-semibold text-emerald-900 block mb-1">
              {language === 'mr' ? 'अर्ज प्रक्रिया:' : 'How to Apply:'}
            </span>
            <p>{scheme.applicationProcedure}</p>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {language === 'mr' ? 'बंद करा' : 'Close'}
          </button>
          {onContactClick && !isExpired && (
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
            >
              {language === 'mr' ? 'केंद्राशी संपर्क साधा' : 'Inquire with Operations'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
