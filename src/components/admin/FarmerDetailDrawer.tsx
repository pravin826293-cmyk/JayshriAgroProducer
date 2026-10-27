import React, { useState } from 'react';
import { X, User, Phone, MapPin, Scale, ChevronDown, ChevronUp, FileText, CheckCircle2, XCircle, Clock, ShieldCheck, Tag } from 'lucide-react';
import { MasterFarmer, ProcurementLot } from '../../types';
import { useData } from '../../context/DataContext';

interface FarmerDetailDrawerProps {
  farmer: MasterFarmer | null;
  onClose: () => void;
  onEdit: (farmer: MasterFarmer) => void;
}

export const FarmerDetailDrawer: React.FC<FarmerDetailDrawerProps> = ({
  farmer,
  onClose,
  onEdit,
}) => {
  const { getFarmerLots } = useData();
  const [expandedLotId, setExpandedLotId] = useState<string | null>(null);

  if (!farmer) return null;

  const lots = getFarmerLots(farmer.id);

  const toggleExpand = (lotId: string) => {
    setExpandedLotId(expandedLotId === lotId ? null : lotId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl glass-dropdown border-l border-emerald-500/25 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-slate-200/80 bg-white/80 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-md">
                  {farmer.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {farmer.fullName}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-0.5">
                    <span>PSS ID: {farmer.pssId}</span>
                    <span>·</span>
                    <span>Aadhaar: {farmer.aadhaarRef}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(farmer)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                >
                  Edit Profile
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Profile Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Mobile No</span>
                <span className="font-mono font-bold text-slate-800">{farmer.mobileNumber || 'N/A'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Center</span>
                <span className="font-bold text-slate-800">{farmer.center}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Nominee</span>
                <span className="font-semibold text-slate-800 truncate block">{farmer.nomineeName || 'Direct Farmer'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {farmer.status}
                </span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 flex-1">
            {/* Cumulative Procurement Statistics */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between text-xs text-emerald-300">
                <span className="font-semibold uppercase tracking-wider text-[10px]">
                  Procurement Summary (PSS Chana Rabi 2026)
                </span>
                <span className="font-mono">{lots.length} Recorded Entries</span>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-[11px] text-slate-300 block">Total Quantity</span>
                  <span className="text-xl font-bold font-mono text-white">
                    {farmer.totalQuantityQtl} <span className="text-xs font-normal">Qtl</span>
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-300 block">Total Bags (50kg)</span>
                  <span className="text-xl font-bold font-mono text-white">
                    {farmer.totalBags} <span className="text-xs font-normal">Bags</span>
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-300 block">Total Trade Value</span>
                  <span className="text-xl font-bold font-mono text-amber-300">
                    ₹{farmer.totalTradeValue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Linked Procurement Lots Accordion */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-emerald-700" />
                  <span>Procurement Lot History ({lots.length} Lots)</span>
                </h3>
                <span className="text-xs text-slate-400">Click to expand assaying parameters</span>
              </div>

              {lots.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                  No procurement lots recorded for this farmer.
                </div>
              ) : (
                <div className="space-y-3">
                  {lots.map((lot, idx) => {
                    const isExpanded = expandedLotId === lot.id || (lots.length === 1 && expandedLotId === null);
                    return (
                      <div
                        key={lot.id}
                        className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all"
                      >
                        {/* Summary Bar */}
                        <div
                          onClick={() => toggleExpand(lot.id)}
                          className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900 font-mono">
                                Lot #{lot.lotRefNumber || lot.lotId}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  lot.dispatchStatus === 'Confirmed Dispatch'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : lot.dispatchStatus === 'Rejected Dispatch'
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {lot.dispatchStatus}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              Bill #{lot.billNumber} · App ID: {lot.applicationId.slice(-8)} · Date: {lot.lotCreatedDate}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              <span className="font-bold text-xs text-slate-900 font-mono block">
                                {lot.actualQuantity || lot.quantity} Qtl ({lot.noOfBags} Bags)
                              </span>
                              <span className="text-[11px] font-mono text-emerald-700 font-semibold block">
                                ₹{lot.tradeValue.toLocaleString('en-IN')}
                              </span>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </div>

                        {/* Expanded Lot Details & Assaying Parameters */}
                        {isExpanded && (
                          <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-4 text-xs">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                              <div>
                                <span className="text-slate-400 block">Commodity:</span>
                                <span className="font-semibold text-slate-800">{lot.commodity}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Package Type:</span>
                                <span className="font-semibold text-slate-800">{lot.packageType}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">MSP Price / Qtl:</span>
                                <span className="font-semibold font-mono text-slate-800">₹{lot.price}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Doc Generated:</span>
                                <span className="font-semibold text-slate-800">{lot.isDocGenerated}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">QR Scanned:</span>
                                <span className="font-semibold text-slate-800">{lot.qrScannedStatus}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Lot Status:</span>
                                <span className="font-semibold text-slate-800">{lot.lotStatus}</span>
                              </div>
                            </div>

                            {/* Assaying Parameters Breakdown */}
                            {lot.parsedAssaying && lot.parsedAssaying.length > 0 && (
                              <div className="space-y-1.5 pt-2 border-t border-slate-200/80">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                                  Laboratory Assaying & Quality Parameters (FAQ Standards)
                                </span>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                  {lot.parsedAssaying.map((param, pIdx) => (
                                    <div key={pIdx} className="p-2 rounded-lg bg-white border border-slate-200">
                                      <span className="text-[10px] text-slate-400 block truncate" title={param.name}>
                                        {param.name}
                                      </span>
                                      <span className="font-mono font-bold text-slate-800 text-xs">
                                        {param.value}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Remark */}
                            {lot.remark && (
                              <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-950">
                                <strong>Remark / Audit Log:</strong> {lot.remark}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Registered on {farmer.createdAt}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl cursor-pointer"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
