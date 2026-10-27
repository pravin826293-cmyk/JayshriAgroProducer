import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  PlusCircle,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Download,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { MasterFarmer } from '../../types';
import { useData } from '../../context/DataContext';
import { FarmerDetailDrawer } from './FarmerDetailDrawer';
import { FarmerFormModal } from './FarmerFormModal';

export const FarmerList: React.FC<{ onOpenAddFarmer: () => void }> = ({ onOpenAddFarmer }) => {
  const { farmers, deleteFarmer } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortField, setSortField] = useState<keyof MasterFarmer>('fullName');
  const [sortAsc, setSortAsc] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Drawers & Modals
  const [viewingFarmer, setViewingFarmer] = useState<MasterFarmer | null>(null);
  const [editingFarmer, setEditingFarmer] = useState<MasterFarmer | null>(null);
  const [farmerToDelete, setFarmerToDelete] = useState<MasterFarmer | null>(null);

  // Unique centers
  const centers = useMemo(() => {
    const list = Array.from(new Set(farmers.map((f) => f.center).filter(Boolean)));
    return ['All', ...list];
  }, [farmers]);

  // Filter & Search
  const filteredFarmers = useMemo(() => {
    return farmers.filter((farmer) => {
      const matchesCenter = selectedCenter === 'All' || farmer.center === selectedCenter;
      const matchesStatus = selectedStatus === 'All' || farmer.status === selectedStatus;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        farmer.fullName.toLowerCase().includes(q) ||
        farmer.pssId.toLowerCase().includes(q) ||
        farmer.mobileNumber.toLowerCase().includes(q) ||
        farmer.nomineeName.toLowerCase().includes(q) ||
        (farmer.village && farmer.village.toLowerCase().includes(q));

      return matchesCenter && matchesStatus && matchesSearch;
    });
  }, [farmers, selectedCenter, selectedStatus, searchQuery]);

  // Sorting
  const sortedFarmers = useMemo(() => {
    return [...filteredFarmers].sort((a, b) => {
      const aRaw = a[sortField];
      const bRaw = b[sortField];

      const aVal = typeof aRaw === 'string' ? aRaw.toLowerCase() : (aRaw ?? 0);
      const bVal = typeof bRaw === 'string' ? bRaw.toLowerCase() : (bRaw ?? 0);

      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredFarmers, sortField, sortAsc]);

  // Paginated chunk
  const totalPages = Math.ceil(sortedFarmers.length / pageSize) || 1;
  const paginatedFarmers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedFarmers.slice(start, start + pageSize);
  }, [sortedFarmers, currentPage, pageSize]);

  const handleSort = (field: keyof MasterFarmer) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleDelete = async () => {
    if (farmerToDelete) {
      await deleteFarmer(farmerToDelete.id);
      setFarmerToDelete(null);
    }
  };

  const exportFilteredCsv = () => {
    const headers = ['Farmer Name', 'PSS ID', 'Mobile No', 'Aadhaar Ref', 'Center', 'Nominee', 'Total Lots', 'Total Qtl', 'Trade Value', 'Status'];
    const rows = sortedFarmers.map((f) => [
      `"${f.fullName}"`,
      `"${f.pssId}"`,
      `"${f.mobileNumber}"`,
      `"${f.aadhaarRef}"`,
      `"${f.center}"`,
      `"${f.nomineeName}"`,
      f.totalLotsCount,
      f.totalQuantityQtl,
      f.totalTradeValue,
      `"${f.status}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Jayashree_Farmers_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" />
            <span>Farmer Master Registry</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Managing {farmers.length} registered farmer profiles with PSS identifiers and linked lot records
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportFilteredCsv}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            title="Export filtered farmers to CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenAddFarmer}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Farmer</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, PSS ID, mobile, or village..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto">
          {/* Center */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-slate-500">Center:</span>
            <select
              value={selectedCenter}
              onChange={(e) => {
                setSelectedCenter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {centers.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-slate-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Page size */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-slate-500">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Farmers Data Table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-emerald-500/20 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th
                  onClick={() => handleSort('fullName')}
                  className="py-3.5 px-4 cursor-pointer hover:text-emerald-700 select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <span>Farmer Name</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 whitespace-nowrap">PSS ID</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Mobile / Contact</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Center & Location</th>
                <th
                  onClick={() => handleSort('totalLotsCount')}
                  className="py-3.5 px-4 cursor-pointer hover:text-emerald-700 select-none text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Lots</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('totalQuantityQtl')}
                  className="py-3.5 px-4 cursor-pointer hover:text-emerald-700 select-none text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Quantity (Qtl)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('totalTradeValue')}
                  className="py-3.5 px-4 cursor-pointer hover:text-emerald-700 select-none text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Trade Value (₹)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedFarmers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    No farmer records found matching the query.
                  </td>
                </tr>
              ) : (
                paginatedFarmers.map((farmer) => (
                  <tr
                    key={farmer.id}
                    className="hover:bg-emerald-50/40 transition-colors group cursor-pointer"
                    onClick={() => setViewingFarmer(farmer)}
                  >
                    {/* Farmer Name */}
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                          {farmer.fullName.charAt(0)}
                        </div>
                        <span className="group-hover:text-emerald-700 transition-colors">
                          {farmer.fullName}
                        </span>
                      </div>
                    </td>

                    {/* PSS ID */}
                    <td className="py-3.5 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {farmer.pssId}
                    </td>

                    {/* Mobile */}
                    <td className="py-3.5 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {farmer.mobileNumber || 'N/A'}
                    </td>

                    {/* Center */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      <span>{farmer.center}</span>
                      {farmer.village && (
                        <span className="text-[11px] text-slate-400 block">{farmer.village}</span>
                      )}
                    </td>

                    {/* Lots Count */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800 whitespace-nowrap">
                      {farmer.totalLotsCount}
                    </td>

                    {/* Quantity Qtl */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-800 whitespace-nowrap">
                      {farmer.totalQuantityQtl}
                    </td>

                    {/* Trade Value */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      ₹{farmer.totalTradeValue.toLocaleString('en-IN')}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          farmer.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {farmer.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td
                      className="py-3.5 px-4 text-center whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setViewingFarmer(farmer)}
                          title="View Profile & Lots"
                          className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingFarmer(farmer)}
                          title="Edit Profile"
                          className="p-1.5 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setFarmerToDelete(farmer)}
                          title="Archive / Delete"
                          className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing{' '}
            <span className="font-bold text-slate-800 font-mono">
              {sortedFarmers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </span>{' '}
            to{' '}
            <span className="font-bold text-slate-800 font-mono">
              {Math.min(currentPage * pageSize, sortedFarmers.length)}
            </span>{' '}
            of <span className="font-bold text-slate-800 font-mono">{sortedFarmers.length}</span> farmers
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs font-semibold px-2">
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

      {/* Farmer Detail Drawer */}
      <FarmerDetailDrawer
        farmer={viewingFarmer}
        onClose={() => setViewingFarmer(null)}
        onEdit={(f) => {
          setViewingFarmer(null);
          setEditingFarmer(f);
        }}
      />

      {/* Edit Farmer Modal */}
      {editingFarmer && (
        <FarmerFormModal
          isOpen={true}
          farmerToEdit={editingFarmer}
          onClose={() => setEditingFarmer(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {farmerToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="max-w-md w-full glass-dropdown p-6 rounded-2xl border border-red-500/20 text-slate-800 space-y-4">
            <h3 className="text-base font-bold text-red-950">Confirm Farmer Record Deletion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove <strong>{farmerToDelete.fullName}</strong> (PSS ID: {farmerToDelete.pssId}) from the farmer database? This will also un-link their associated procurement lots.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setFarmerToDelete(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
