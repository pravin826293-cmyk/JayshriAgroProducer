import React, { useState } from 'react';
import { Bell, PlusCircle, Edit2, Trash2, Calendar, FileText, X, Save } from 'lucide-react';
import { Announcement } from '../../types';
import { useData } from '../../context/DataContext';

export const AnnouncementManager: React.FC = () => {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    titleMr: string;
    content: string;
    contentMr: string;
    category: Announcement['category'];
    categoryMr: string;
    priority: Announcement['priority'];
    publishedDate: string;
    expiryDate: string;
    status: Announcement['status'];
    attachmentName: string;
  }>({
    title: '',
    titleMr: '',
    content: '',
    contentMr: '',
    category: 'Procurement',
    categoryMr: 'हमीभाव खरेदी',
    priority: 'Normal',
    publishedDate: new Date().toISOString().split('T')[0],
    expiryDate: '2026-11-30',
    status: 'Published',
    attachmentName: '',
  });

  const openNewForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      titleMr: '',
      content: '',
      contentMr: '',
      category: 'Procurement',
      categoryMr: 'हमीभाव खरेदी',
      priority: 'Normal',
      publishedDate: new Date().toISOString().split('T')[0],
      expiryDate: '2026-11-30',
      status: 'Published',
      attachmentName: '',
    });
    setIsEditing(true);
  };

  const openEditForm = (ann: Announcement) => {
    setEditingId(ann.id);
    setFormData({
      title: ann.title,
      titleMr: ann.titleMr,
      content: ann.content,
      contentMr: ann.contentMr,
      category: ann.category,
      categoryMr: ann.categoryMr,
      priority: ann.priority,
      publishedDate: ann.publishedDate,
      expiryDate: ann.expiryDate || '',
      status: ann.status,
      attachmentName: ann.attachmentName || '',
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const preparedData = {
      title: formData.title,
      titleMr: formData.titleMr || formData.title,
      content: formData.content,
      contentMr: formData.contentMr || formData.content,
      category: formData.category,
      categoryMr: formData.categoryMr,
      priority: formData.priority,
      publishedDate: formData.publishedDate,
      expiryDate: formData.expiryDate || undefined,
      status: formData.status,
      attachmentName: formData.attachmentName || undefined,
    };

    if (editingId) {
      await updateAnnouncement(editingId, preparedData);
    } else {
      await addAnnouncement(preparedData);
    }

    setIsEditing(false);
  };

  const togglePublish = async (ann: Announcement) => {
    const next = ann.status === 'Published' ? 'Draft' : 'Published';
    await updateAnnouncement(ann.id, { status: next });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-700" />
            <span>Announcements & Advisories Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Broadcast emergency weather alerts, MSP lot token bookings, and AGM notices to farmers
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-colors shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish Notice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-3 border border-amber-500/20 shadow-xs"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                  {ann.category}
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ann.priority === 'Urgent'
                        ? 'bg-red-100 text-red-800'
                        : ann.priority === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {ann.priority}
                  </span>

                  <button
                    onClick={() => togglePublish(ann)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      ann.status === 'Published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {ann.status}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {ann.title}
                </h3>
                <span className="text-[11px] text-slate-500 font-serif block mt-0.5">
                  {ann.titleMr}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {ann.content}
              </p>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date: {ann.publishedDate}</span>
                {ann.expiryDate && <span>· Exp: {ann.expiryDate}</span>}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">ID: {ann.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditForm(ann)}
                  className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteAnnouncement(ann.id)}
                  className="p-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-xl w-full glass-dropdown p-6 sm:p-8 rounded-3xl border border-amber-500/25 max-h-[90vh] overflow-y-auto space-y-6 text-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingId ? 'Edit Announcement' : 'Publish New Agricultural Notice'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Notice Title (English) *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Chana Procurement Token Schedule"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Notice Title (मराठी) *</label>
                <input
                  type="text"
                  required
                  value={formData.titleMr}
                  onChange={(e) => setFormData({ ...formData, titleMr: e.target.value })}
                  placeholder="उदा. हरभरा खरेदी टोकन वाटप वेळापत्रक"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Announcement['category'] })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Procurement">Procurement</option>
                    <option value="Weather & Advisory">Weather & Advisory</option>
                    <option value="Subsidies">Subsidies</option>
                    <option value="FPC Notice">FPC Notice</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Announcement['priority'] })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Announcement['status'] })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Notice Content (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Notice Content (मराठी)</label>
                <textarea
                  rows={3}
                  value={formData.contentMr}
                  onChange={(e) => setFormData({ ...formData, contentMr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Publication Date</label>
                  <input
                    type="date"
                    value={formData.publishedDate}
                    onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Optional Document Name</label>
                <input
                  type="text"
                  value={formData.attachmentName}
                  onChange={(e) => setFormData({ ...formData, attachmentName: e.target.value })}
                  placeholder="e.g. Procurement_Schedule_Kerwadi.pdf"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Update Notice' : 'Broadcast Notice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
