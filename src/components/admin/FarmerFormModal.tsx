import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save, AlertCircle } from 'lucide-react';
import { MasterFarmer } from '../../types';
import { useData } from '../../context/DataContext';

interface FarmerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmerToEdit?: MasterFarmer | null;
}

export const FarmerFormModal: React.FC<FarmerFormModalProps> = ({
  isOpen,
  onClose,
  farmerToEdit,
}) => {
  const { addFarmer, updateFarmer, farmers } = useData();

  const [formData, setFormData] = useState({
    fullName: '',
    pssId: '',
    mobileNumber: '',
    aadhaarRef: '',
    center: 'KERWADI',
    village: 'Kerwadi',
    taluka: 'Palam / Gangakhed',
    district: 'Parbhani',
    nomineeName: '',
    procuredFrom: 'FARMER',
    sellerTmId: 'S42595',
    category: 'Small Farmer' as MasterFarmer['category'],
    status: 'Active' as MasterFarmer['status'],
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (farmerToEdit) {
      setFormData({
        fullName: farmerToEdit.fullName,
        pssId: farmerToEdit.pssId,
        mobileNumber: farmerToEdit.mobileNumber,
        aadhaarRef: farmerToEdit.aadhaarRef,
        center: farmerToEdit.center || 'KERWADI',
        village: farmerToEdit.village || 'Kerwadi',
        taluka: farmerToEdit.taluka || 'Palam / Gangakhed',
        district: farmerToEdit.district || 'Parbhani',
        nomineeName: farmerToEdit.nomineeName || '',
        procuredFrom: farmerToEdit.procuredFrom || 'FARMER',
        sellerTmId: farmerToEdit.sellerTmId || 'S42595',
        category: farmerToEdit.category || 'Small Farmer',
        status: farmerToEdit.status || 'Active',
      });
    } else {
      setFormData({
        fullName: '',
        pssId: '',
        mobileNumber: '',
        aadhaarRef: '',
        center: 'KERWADI',
        village: 'Kerwadi',
        taluka: 'Palam / Gangakhed',
        district: 'Parbhani',
        nomineeName: '',
        procuredFrom: 'FARMER',
        sellerTmId: 'S42595',
        category: 'Small Farmer',
        status: 'Active',
      });
    }
    setErrorMessage('');
  }, [farmerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Farmer full name is required.');
      return;
    }

    if (!formData.pssId.trim()) {
      setErrorMessage('PSS Identification Number is required.');
      return;
    }

    // Check duplicate PSS ID if new
    if (!farmerToEdit) {
      const exists = farmers.some(
        (f) => f.pssId.trim() === formData.pssId.trim()
      );
      if (exists) {
        setErrorMessage(`A farmer with PSS ID "${formData.pssId}" is already registered.`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (farmerToEdit) {
        await updateFarmer(farmerToEdit.id, formData);
      } else {
        await addFarmer(formData);
      }
      setIsSubmitting(false);
      onClose();
    } catch {
      setIsSubmitting(false);
      setErrorMessage('Failed to save farmer details.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-w-xl w-full glass-dropdown p-6 sm:p-8 rounded-3xl border border-emerald-500/25 max-h-[90vh] overflow-y-auto space-y-6 text-slate-800 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {farmerToEdit ? 'Edit Farmer Master Record' : 'Register New Member Farmer'}
              </h3>
              <span className="text-xs text-slate-500">Jayashree Krishi Agro FPC Database</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Full Name & PSS ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Farmer Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Balasaheb Narayan Patil"
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">PSS ID Number *</label>
              <input
                type="text"
                required
                value={formData.pssId}
                onChange={(e) => setFormData({ ...formData, pssId: e.target.value })}
                placeholder="e.g. 9274894123004683"
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs font-mono"
              />
            </div>
          </div>

          {/* Mobile & Aadhaar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Mobile Phone Number</label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                placeholder="e.g. 9822000000"
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Aadhaar Ref / Masked Number</label>
              <input
                type="text"
                value={formData.aadhaarRef}
                onChange={(e) => setFormData({ ...formData, aadhaarRef: e.target.value })}
                placeholder="e.g. •••• •••• 4045"
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs font-mono"
              />
            </div>
          </div>

          {/* Nominee & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Nominee Full Name</label>
              <input
                type="text"
                value={formData.nomineeName}
                onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                placeholder="e.g. Amol Balasaheb Patil"
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Farmer Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as MasterFarmer['category'] })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
              >
                <option value="Small Farmer">Small Farmer (1-2 Ha)</option>
                <option value="Marginal Farmer">Marginal Farmer (&lt; 1 Ha)</option>
                <option value="Large Farmer">Large Farmer (&gt; 2 Ha)</option>
                <option value="General">General Category</option>
              </select>
            </div>
          </div>

          {/* Center & Village */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Procurement Center</label>
              <input
                type="text"
                value={formData.center}
                onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Village</label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Registration Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as MasterFarmer['status'] })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : (farmerToEdit ? 'Update Farmer' : 'Save Record')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
