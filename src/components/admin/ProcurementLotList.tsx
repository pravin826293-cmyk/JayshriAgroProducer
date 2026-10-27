import React, { useState, useMemo } from 'react';
import {
  Scale,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ProcurementLot } from '../../types';
import { useData } from '../../context/DataContext';

export const ProcurementLotList: React.FC = () => {
  const { lots } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDispatchStatus, setSelectedDispatchStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [inspectingLot, setInspectingLot] = useState<ProcurementLot | null>(null);

  // Filter lots
  const filteredLots = useMemo(() => {
    return lots.filter((lot) => {
      const matchesDispatch =
        selectedDispatchStatus === 'All' || lot.dispatchStatus === selectedDispatchStatus;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lot.farmerName.toLowerCase().includes(q) ||
        lot.lotRefNumber.toLowerCase().includes(q) ||
        lot.billNumber.toLowerCase().includes(q) ||
        lot.lotId.toLowerCase().includes(q) ||
        lot.applicationId.toLowerCase().includes(q);

      return matchesDispatch && matchesSearch;
    });
  }, [lots, selectedDispatchStatus, searchQuery]);

  const totalPages = Math.ceil(filteredLots.length / pageSize) || 1;
  const paginatedLots = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLots.slice(start, start + pageSize);
  }, [filteredLots, currentPage, pageSize]);

  const exportLotsCsv = () => {
    const headers = [
      'Lot Ref Number',
      'Farmer Name',
      'PSS ID',
      'Bill Number',
      'Application ID',
      'Commodity',
      'Bags',
      'Quantity (Qtl)',
      'Price',
      'Trade Value',
      'Dispatch Status',
      'Assaying Params',
      'Date',
    ];
    const rows = filteredLots.map((l) => [
      `"${l.lotRefNumber}"`,
      `"${l.farmerName}"`,
      `"${l.pssId}"`,
      `"${l.billNumber}"`,
      `"${l.applicationId}"`,
      `"${l.commodity}"`,
      l.noOfBags,
      l.actualQuantity || l.quantity,
      l.price,
      l.tradeValue,
      `"${l.dispatchStatus}"`,
      `"${l.assayingParamsValues || ''}"`,
      `"${l.lotCreatedDate}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Jayashree_Procurement_Lots_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-700" />
            <span>PSS Procurement Lots Registry (Kerwadi Center)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed ledger of all {lots.length} gate entries, electronic weighbridge values, and laboratory assaying scores
          </p>
        </div>

        <button
          onClick={exportLotsCsv}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Lots CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by lot ref, farmer, or bill #..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Dispatch Status:</span>
            <select
              value={selectedDispatchStatus}
              onChange={(e) => {
                setSelectedDispatchStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Dispatches</option>
              <option value="Confirmed Dispatch">Confirmed Dispatch</option>
              <option value="Rejected Dispatch">Rejected Dispatch</option>
              <option value="Pending Dispatch">Pending Dispatch</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-emerald-500/20 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 whitespace-nowrap">Lot Reference</th>
                <th className="py-3 px-4 whitespace-nowrap">Farmer Name</th>
                <th className="py-3 px-4 whitespace-nowrap">Bill #</th>
                <th className="py-3 px-4 whitespace-nowrap">Commodity</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Bags (50kg)</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Quantity (Qtl)</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Trade Value (₹)</th>
                <th className="py-3 px-4 whitespace-nowrap">Dispatch Status</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">Assaying Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {paginatedLots.map((lot) => (
                <tr key={lot.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {lot.lotRefNumber}
                  </td>
                  <td className="py-3 px-4 font-sans text-xs font-semibold text-slate-800 whitespace-nowrap">
                    {lot.farmerName}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    #{lot.billNumber}
                  </td>
                  <td className="py-3 px-4 font-sans text-xs text-slate-600 whitespace-nowrap">
                    {lot.commodity}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700 whitespace-nowrap">
                    {lot.noOfBags}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-800 whitespace-nowrap">
                    {lot.actualQuantity || lot.quantity}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 whitespace-nowrap">
                    ₹{lot.tradeValue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lot.dispatchStatus === 'Confirmed Dispatch'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : lot.dispatchStatus === 'Rejected Dispatch'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {lot.dispatchStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => setInspectingLot(lot)}
                      className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                    >
                      View Quality
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-bold font-mono">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-bold font-mono">{Math.min(currentPage * pageSize, filteredLots.length)}</span> of{' '}
            <span className="font-bold font-mono">{filteredLots.length}</span> lots
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lot Inspection Modal */}
      {inspectingLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="max-w-lg w-full glass-dropdown p-6 rounded-3xl border border-emerald-500/25 space-y-4 text-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Lot Quality & Assaying Certificate
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Ref: {inspectingLot.lotRefNumber} · Bill #{inspectingLot.billNumber}
                </span>
              </div>
              <button
                onClick={() => setInspectingLot(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block">Farmer:</span>
                  <span className="font-bold text-slate-800">{inspectingLot.farmerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Commodity:</span>
                  <span className="font-bold text-slate-800">{inspectingLot.commodity}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Quantity Procured:</span>
                  <span className="font-bold font-mono text-emerald-800">{inspectingLot.actualQuantity} Qtl ({inspectingLot.noOfBags} Bags)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Settlement Value:</span>
                  <span className="font-bold font-mono text-slate-900">₹{inspectingLot.tradeValue.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {inspectingLot.parsedAssaying && inspectingLot.parsedAssaying.length > 0 ? (
                <div className="space-y-2">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500 block">
                    Laboratory Tolerances & Test Scores
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {inspectingLot.parsedAssaying.map((p, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                        <span className="text-slate-600 truncate pr-2" title={p.name}>{p.name}:</span>
                        <span className="font-mono font-bold text-emerald-950">{p.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 text-center text-slate-500">
                  Standard FAQ moisture & impurity tolerances satisfied.
                </div>
              )}

              {inspectingLot.remark && (
                <div className="p-2.5 rounded-xl bg-slate-100 text-[11px] text-slate-700">
                  <strong>System Remark:</strong> {inspectingLot.remark}
                </div>
              )}
            </div>

            <div className="pt-2 text-right border-t border-slate-100">
              <button
                onClick={() => setInspectingLot(null)}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
