import React, { useState } from 'react';
import { BookOpen, PlusCircle, Edit2, Trash2, CheckCircle2, Clock, Eye, Sparkles, X, Save } from 'lucide-react';
import { CompanyScheme } from '../../types';
import { useData } from '../../context/DataContext';

export const SchemeManager: React.FC = () => {
  const { companySchemes, addCompanyScheme, updateCompanyScheme, deleteCompanyScheme } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    titleMr: string;
    category: CompanyScheme['category'];
    categoryMr: string;
    shortDesc: string;
    shortDescMr: string;
    fullDesc: string;
    fullDescMr: string;
    benefits: string;
    benefitsMr: string;
    eligibility: string;
    eligibilityMr: string;
    requiredDocuments: string;
    applicationProcedure: string;
    startDate: string;
    endDate: string;
    status: CompanyScheme['status'];
    isFeatured: boolean;
    contactInfo: string;
  }>({
    title: '',
    titleMr: '',
    category: 'Seeds & Inputs',
    categoryMr: 'बियाणे व निविष्ठा',
    shortDesc: '',
    shortDescMr: '',
    fullDesc: '',
    fullDescMr: '',
    benefits: '',
    benefitsMr: '',
    eligibility: '',
    eligibilityMr: '',
    requiredDocuments: '',
    applicationProcedure: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-12-31',
    status: 'Published',
    isFeatured: false,
    contactInfo: 'Kerwadi Center: +91 9325278823',
  });

  const openNewForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      titleMr: '',
      category: 'Seeds & Inputs',
      categoryMr: 'बियाणे व निविष्ठा',
      shortDesc: '',
      shortDescMr: '',
      fullDesc: '',
      fullDescMr: '',
      benefits: '25% subsidized rates\nDoorstep village distribution\nTechnical guidance',
      benefitsMr: '२५% सवलतीचे दर\nगावात मोफत वितरण\nतज्ज्ञांचे मार्गदर्शन',
      eligibility: 'Member of Jayashree Krishi Agro FPC\n7/12 land extract in Parbhani',
      eligibilityMr: 'जयश्री कृषी ॲग्रो एफपीसीचे सभासद\nपरभणी जिल्ह्यातील ७/१२ उतारा',
      requiredDocuments: '7/12 Extract, Aadhaar Card, Member Certificate',
      applicationProcedure: 'Submit form at Kerwadi Center or through local village coordinator.',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      status: 'Published',
      isFeatured: false,
      contactInfo: 'Kerwadi Center: +91 9325278823',
    });
    setIsEditing(true);
  };

  const openEditForm = (scheme: CompanyScheme) => {
    setEditingId(scheme.id);
    setFormData({
      title: scheme.title,
      titleMr: scheme.titleMr,
      category: scheme.category,
      categoryMr: scheme.categoryMr,
      shortDesc: scheme.shortDesc,
      shortDescMr: scheme.shortDescMr,
      fullDesc: scheme.fullDesc,
      fullDescMr: scheme.fullDescMr,
      benefits: scheme.benefits.join('\n'),
      benefitsMr: scheme.benefitsMr.join('\n'),
      eligibility: scheme.eligibility.join('\n'),
      eligibilityMr: scheme.eligibilityMr.join('\n'),
      requiredDocuments: scheme.requiredDocuments.join(', '),
      applicationProcedure: scheme.applicationProcedure,
      startDate: scheme.startDate,
      endDate: scheme.endDate,
      status: scheme.status,
      isFeatured: scheme.isFeatured,
      contactInfo: scheme.contactInfo || '',
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const preparedData = {
      title: formData.title,
      titleMr: formData.titleMr || formData.title,
      category: formData.category,
      categoryMr: formData.categoryMr,
      shortDesc: formData.shortDesc,
      shortDescMr: formData.shortDescMr || formData.shortDesc,
      fullDesc: formData.fullDesc || formData.shortDesc,
      fullDescMr: formData.fullDescMr || formData.shortDescMr || formData.shortDesc,
      benefits: formData.benefits.split('\n').filter(Boolean),
      benefitsMr: (formData.benefitsMr || formData.benefits).split('\n').filter(Boolean),
      eligibility: formData.eligibility.split('\n').filter(Boolean),
      eligibilityMr: (formData.eligibilityMr || formData.eligibility).split('\n').filter(Boolean),
      requiredDocuments: formData.requiredDocuments.split(',').map((d) => d.trim()).filter(Boolean),
      applicationProcedure: formData.applicationProcedure,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status,
      isFeatured: formData.isFeatured,
      contactInfo: formData.contactInfo,
    };

    if (editingId) {
      await updateCompanyScheme(editingId, preparedData);
    } else {
      await addCompanyScheme(preparedData);
    }

    setIsEditing(false);
  };

  const handleStatusToggle = async (scheme: CompanyScheme) => {
    const nextStatus = scheme.status === 'Published' ? 'Draft' : 'Published';
    await updateCompanyScheme(scheme.id, { status: nextStatus });
  };

  const handleFeaturedToggle = async (scheme: CompanyScheme) => {
    await updateCompanyScheme(scheme.id, { isFeatured: !scheme.isFeatured });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <span>Company Agricultural Schemes Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Administer internal cooperative schemes, seed subsidies, custom hiring mechanization, and MSP procurement
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Scheme</span>
        </button>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companySchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-4 border border-emerald-500/20 shadow-xs relative"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {scheme.category}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleFeaturedToggle(scheme)}
                    title="Toggle Featured on Home Page"
                    className={`p-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                      scheme.isFeatured
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-400 hover:text-amber-700'
                    }`}
                  >
                    ★
                  </button>
                  <button
                    onClick={() => handleStatusToggle(scheme)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                      scheme.status === 'Published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {scheme.status}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {scheme.title}
                </h3>
                <span className="text-[11px] text-slate-500 block font-serif mt-0.5">
                  {scheme.titleMr}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {scheme.shortDesc}
              </p>

              <div className="text-[11px] text-slate-500 font-mono">
                Deadline: {scheme.endDate}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">ID: {scheme.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditForm(scheme)}
                  className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg cursor-pointer"
                  title="Edit Scheme"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteCompanyScheme(scheme.id)}
                  className="p-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                  title="Delete Scheme"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Scheme Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-2xl w-full glass-dropdown p-6 sm:p-8 rounded-3xl border border-emerald-500/25 max-h-[90vh] overflow-y-auto space-y-6 text-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingId ? 'Edit Company Scheme' : 'Create New Company Scheme'}
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
                  <label className="font-semibold text-slate-700 block">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Certified Chana Seed Distribution"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Title (मराठी) *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleMr}
                    onChange={(e) => setFormData({ ...formData, titleMr: e.target.value })}
                    placeholder="उदा. प्रमाणित हरभरा बियाणे वाटप"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CompanyScheme['category'] })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Seeds & Inputs">Seeds & Inputs</option>
                    <option value="Machinery Rental">Machinery Rental</option>
                    <option value="Procurement & Storage">Procurement & Storage</option>
                    <option value="Soil & Water Testing">Soil & Water Testing</option>
                    <option value="Farmer Subsidies">Farmer Subsidies</option>
                    <option value="Organic Certification">Organic Certification</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as CompanyScheme['status'] })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Expired">Expired</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Short Description (English)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Short Description (मराठी)</label>
                <textarea
                  rows={2}
                  value={formData.shortDescMr}
                  onChange={(e) => setFormData({ ...formData, shortDescMr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Benefits (One per line)</label>
                  <textarea
                    rows={3}
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Eligibility Criteria (One per line)</label>
                  <textarea
                    rows={3}
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheckbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <label htmlFor="featuredCheckbox" className="font-semibold text-slate-800 cursor-pointer">
                  Highlight as Featured Scheme on Public Home Page
                </label>
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
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 font-bold shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Update Scheme' : 'Publish Scheme'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
