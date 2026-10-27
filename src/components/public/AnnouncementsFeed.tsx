import React, { useState } from 'react';
import { Bell, Calendar, ArrowRight, X, AlertCircle, FileText } from 'lucide-react';
import { Announcement } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';

export const AnnouncementsFeed: React.FC = () => {
  const { language, t } = useLanguage();
  const { announcements } = useData();

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // Only published announcements
  const publishedList = announcements.filter((a) => a.status === 'Published');

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <section className="py-12 relative" id="announcements-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
              <Bell className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'अधिकृत घोषणा' : 'Official Bulletins'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('sec.announcements')}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              {t('sec.announcementsSub')}
            </p>
          </div>
        </div>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {publishedList.map((ann) => {
            const title = language === 'mr' ? ann.titleMr : ann.title;
            const content = language === 'mr' ? ann.contentMr : ann.content;
            const category = language === 'mr' ? ann.categoryMr : ann.category;

            return (
              <div
                key={ann.id}
                className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityStyle(ann.priority)}`}>
                        {ann.priority}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>{ann.publishedDate}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {content}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  {ann.attachmentName ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700">
                      <FileText className="w-3 h-3" />
                      <span className="line-clamp-1">{ann.attachmentName}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Kerwadi Center Notice</span>
                  )}

                  <button
                    onClick={() => setSelectedAnnouncement(ann)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                  >
                    <span>{t('btn.readMore')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Announcement Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-lg w-full glass-dropdown p-6 sm:p-8 rounded-3xl border border-emerald-500/25 space-y-5 text-slate-800 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
              <div>
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${getPriorityStyle(selectedAnnouncement.priority)}`}>
                  {selectedAnnouncement.priority} Priority
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 leading-snug">
                  {language === 'mr' ? selectedAnnouncement.titleMr : selectedAnnouncement.title}
                </h3>
                <span className="text-xs text-slate-500 font-mono block mt-1">
                  Published: {selectedAnnouncement.publishedDate}
                </span>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {language === 'mr' ? selectedAnnouncement.contentMr : selectedAnnouncement.content}
            </div>

            {selectedAnnouncement.attachmentName && (
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between text-emerald-900">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>{selectedAnnouncement.attachmentName}</span>
                </span>
                <span className="text-[11px] font-medium text-emerald-700">Official Circular</span>
              </div>
            )}

            <div className="pt-2 text-right border-t border-slate-100">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                {language === 'mr' ? 'समजले / बंद करा' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
