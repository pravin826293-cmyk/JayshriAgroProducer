import React, { useState } from 'react';
import { Landmark, PlusCircle, Edit2, Trash2, ShieldCheck, ExternalLink, X, Save } from 'lucide-react';
import { GovtScheme } from '../../types';
import { useData } from '../../context/DataContext';

export const GovtSchemeManager: React.FC = () => {
  const { govtSchemes, addGovtScheme, updateGovtScheme, deleteGovtScheme } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    nameMr: string;
    department: string;
    departmentMr: string;
    category: GovtScheme['category'];
    categoryMr: string;
    shortDesc: string;
    shortDescMr: string;
    eligibilitySummary: string;
    eligibilitySummaryMr: string;
    benefits: string;
    benefitsMr: string;
    requiredDocuments: string;
    officialSource: string;
    officialUrl: string;
    lastVerifiedDate: string;
    status: GovtScheme['status'];
  }>({
    name: '',
    nameMr: '',
    department: 'Department of Agriculture, Maharashtra',
    departmentMr: 'कृषी विभाग, महाराष्ट्र शासन',
    category: 'Agricultural Machinery',
    categoryMr: 'कृषी यंत्रे व अवजारे',
    shortDesc: '',
    shortDescMr: '',
    eligibilitySummary: '',
    eligibilitySummaryMr: '',
    benefits: '',
    benefitsMr: '',
    requiredDocuments: '',
    officialSource: 'MahaDBT Farmer Portal',
    officialUrl: 'https://mahadbt.maharashtra.gov.in/Farmer',
    lastVerifiedDate: new Date().toISOString().split('T')[0],
    status: 'Active',
  });

  const openNewForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      nameMr: '',
      department: 'Department of Agriculture, Maharashtra',
      departmentMr: 'कृषी विभाग, महाराष्ट्र शासन',
      category: 'Agricultural Machinery',
      categoryMr: 'कृषी यंत्रे व अवजारे',
      shortDesc: '',
      shortDescMr: '',
      eligibilitySummary: '',
      eligibilitySummaryMr: '',
      benefits: '',
      benefitsMr: '',
      requiredDocuments: '7/12 & 8A Extract, Aadhaar Card, Bank Passbook',
      officialSource: 'MahaDBT Farmer Portal',
      officialUrl: 'https://mahadbt.maharashtra.gov.in/Farmer',
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    });
    setIsEditing(true);
  };

  const openEditForm = (scheme: GovtScheme) => {
    setEditingId(scheme.id);
    setFormData({
      name: scheme.name,
      nameMr: scheme.nameMr,
      department: scheme.department,
      departmentMr: scheme.departmentMr,
      category: scheme.category,
      categoryMr: scheme.categoryMr,
      shortDesc: scheme.shortDesc,
      shortDescMr: scheme.shortDescMr,
      eligibilitySummary: scheme.eligibilitySummary,
      eligibilitySummaryMr: scheme.eligibilitySummaryMr,
      benefits: scheme.benefits,
      benefitsMr: scheme.benefitsMr,
      requiredDocuments: scheme.requiredDocuments.join(', '),
      officialSource: scheme.officialSource,
      officialUrl: scheme.officialUrl,
      lastVerifiedDate: scheme.lastVerifiedDate,
      status: scheme.status,
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const preparedData = {
      name: formData.name,
      nameMr: formData.nameMr || formData.name,
      department: formData.department,
      departmentMr: formData.departmentMr,
      category: formData.category,
      categoryMr: formData.categoryMr,
      shortDesc: formData.shortDesc,
      shortDescMr: formData.shortDescMr || formData.shortDesc,
      eligibilitySummary: formData.eligibilitySummary,
      eligibilitySummaryMr: formData.eligibilitySummaryMr || formData.eligibilitySummary,
      benefits: formData.benefits,
      benefitsMr: formData.benefitsMr || formData.benefits,
      requiredDocuments: formData.requiredDocuments.split(',').map((d) => d.trim()).filter(Boolean),
      officialSource: formData.officialSource,
      officialUrl: formData.officialUrl,
      lastVerifiedDate: formData.lastVerifiedDate,
      status: formData.status,
    };

    if (editingId) {
      await updateGovtScheme(editingId, preparedData);
    } else {
      await addGovtScheme(preparedData);
    }

    setIsEditing(false);
  };

  const verifyToday = async (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    await updateGovtScheme(id, { lastVerifiedDate: today });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Landmark className="w-5 h-5 text-blue-700" />
            <span>Maharashtra Government Schemes Directory</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Maintain accurate subsidy percentages, official MahaDBT links, and compliance verification dates
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-blue-700 hover:bg-blue-800 text-white transition-colors shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Govt Scheme</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {govtSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-4 border border-blue-500/20 shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {scheme.category}
                </span>
                <button
                  onClick={() => verifyToday(scheme.id)}
                  title="Click to stamp verification date today"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified: {scheme.lastVerifiedDate}</span>
                </button>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {scheme.name}
                </h3>
                <span className="text-[11px] text-slate-500 block font-serif mt-0.5">
                  {scheme.nameMr}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-950">
                <strong>Subsidy:</strong> {scheme.benefits}
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {scheme.shortDesc}
              </p>

              <div className="text-[11px] text-slate-500">
                Source: <strong>{scheme.officialSource}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline flex items-center gap-1 text-[11px] font-semibold"
              >
                <span>Portal Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditForm(scheme)}
                  className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteGovtScheme(scheme.id)}
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
          <div className="max-w-2xl w-full glass-dropdown p-6 sm:p-8 rounded-3xl border border-blue-500/25 max-h-[90vh] overflow-y-auto space-y-6 text-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingId ? 'Edit Government Scheme' : 'Add Government Scheme Record'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Scheme Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Scheme Name (मराठी) *</label>
                  <input
                    type="text"
                    required
                    value={formData.nameMr}
                    onChange={(e) => setFormData({ ...formData, nameMr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as GovtScheme['category'] })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Agricultural Machinery">Agricultural Machinery</option>
                    <option value="Irrigation & Micro-Irrigation">Irrigation & Micro-Irrigation</option>
                    <option value="Horticulture & Planting">Horticulture & Planting</option>
                    <option value="Crop Protection & Inputs">Crop Protection & Inputs</option>
                    <option value="Financial & Insurance">Financial & Insurance</option>
                    <option value="Infrastructure & Warehousing">Infrastructure & Warehousing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Official Source</label>
                  <input
                    type="text"
                    value={formData.officialSource}
                    onChange={(e) => setFormData({ ...formData, officialSource: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Verification Date</label>
                  <input
                    type="date"
                    value={formData.lastVerifiedDate}
                    onChange={(e) => setFormData({ ...formData, lastVerifiedDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Official Application URL *</label>
                <input
                  type="url"
                  required
                  value={formData.officialUrl}
                  onChange={(e) => setFormData({ ...formData, officialUrl: e.target.value })}
                  placeholder="https://mahadbt.maharashtra.gov.in/Farmer"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Subsidy & Financial Benefit</label>
                <input
                  type="text"
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  placeholder="e.g. 50% subsidy up to ₹1,25,000 for tractors"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Eligibility Summary</label>
                <textarea
                  rows={2}
                  value={formData.eligibilitySummary}
                  onChange={(e) => setFormData({ ...formData, eligibilitySummary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500"
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
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-white bg-blue-700 hover:bg-blue-800 font-bold shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Update Govt Scheme' : 'Save Scheme'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
