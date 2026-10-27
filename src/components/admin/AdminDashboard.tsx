import React from 'react';
import {
  Users,
  Scale,
  BookOpen,
  Bell,
  PlusCircle,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminDashboardProps {
  onNavigate: (section: string) => void;
  onOpenAddFarmer: () => void;
  onOpenAddScheme: () => void;
  onOpenAddAnnouncement: () => void;
  onOpenImportCsv: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  onOpenAddFarmer,
  onOpenAddScheme,
  onOpenAddAnnouncement,
  onOpenImportCsv,
}) => {
  const { stats, farmers, lots, isLoading } = useData();

  // Recent farmers
  const recentFarmers = farmers.slice(0, 5);
  // Recent lots
  const recentLots = lots.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-emerald-300 font-semibold text-xs uppercase tracking-wider block">
              Cooperative Management Command Center
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Jayashree Krishi Agro Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Monitoring 500+ farmer records, PSS Bengal Gram procurement at Kerwadi center, and digital scheme delivery across Parbhani district.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenAddFarmer}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Farmer</span>
            </button>
            <button
              onClick={onOpenImportCsv}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-white/20"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
              <span>Import CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Statistical KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Farmers */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Farmers</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              {stats.totalFarmers}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">All active members</span>
          </div>
        </div>

        {/* Procured Lots */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Procured Lots</span>
            <Scale className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
              {stats.activeLots}
            </div>
            <span className="text-[10px] text-slate-500">PSS Chana 2026</span>
          </div>
        </div>

        {/* Total Quantity */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Volume</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              {stats.totalQuantityQtl.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-500 ml-1">Qtl</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">{stats.totalBags.toLocaleString('en-IN')} Bags</span>
          </div>
        </div>

        {/* Total Trade Value */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Disbursed Value</span>
            <span className="text-xs font-bold text-emerald-600">₹</span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              ₹{(stats.totalTradeValue / 100000).toFixed(1)}L
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">MSP Direct Payment</span>
          </div>
        </div>

        {/* Published Schemes */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">FPC Schemes</span>
            <BookOpen className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              {stats.publishedCompanySchemes}
            </div>
            <span className="text-[10px] text-slate-500">{stats.draftCompanySchemes} drafts</span>
          </div>
        </div>

        {/* Active Announcements */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Announcements</span>
            <Bell className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              {stats.activeAnnouncements}
            </div>
            <span className="text-[10px] text-slate-500">Public Bulletins</span>
          </div>
        </div>
      </div>

      {/* Dispatch Status Progress Bar */}
      <div className="glass-panel p-5 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900 text-sm">PSS Lot Dispatch Reconciliation</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">Kerwadi Center</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Confirmed: {stats.dispatchedLots}</span>
            </span>
            <span className="flex items-center gap-1 text-red-700">
              <XCircle className="w-3.5 h-3.5 text-red-600" />
              <span>Rejected: {stats.rejectedLots}</span>
            </span>
            <span className="flex items-center gap-1 text-amber-700">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Pending: {stats.pendingLots}</span>
            </span>
          </div>
        </div>

        {/* Visual progress bar */}
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${stats.activeLots > 0 ? (stats.dispatchedLots / stats.activeLots) * 100 : 0}%` }}
            className="bg-emerald-600 transition-all duration-500"
            title={`Confirmed Dispatches: ${stats.dispatchedLots}`}
          />
          <div
            style={{ width: `${stats.activeLots > 0 ? (stats.rejectedLots / stats.activeLots) * 100 : 0}%` }}
            className="bg-red-500 transition-all duration-500"
            title={`Rejected Dispatches: ${stats.rejectedLots}`}
          />
          <div
            style={{ width: `${stats.activeLots > 0 ? (stats.pendingLots / stats.activeLots) * 100 : 0}%` }}
            className="bg-amber-400 transition-all duration-500"
            title={`Pending Dispatches: ${stats.pendingLots}`}
          />
        </div>
      </div>

      {/* Quick Launchpad & Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <button
          onClick={onOpenAddFarmer}
          className="p-4 rounded-2xl glass-panel glass-panel-hover text-left space-y-1.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <PlusCircle className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900">Add New Farmer</h4>
          <p className="text-[11px] text-slate-500 leading-tight">Register profile with PSS ID & nominee</p>
        </button>

        <button
          onClick={() => onNavigate('farmers')}
          className="p-4 rounded-2xl glass-panel glass-panel-hover text-left space-y-1.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900">View All Farmers</h4>
          <p className="text-[11px] text-slate-500 leading-tight">Browse {farmers.length} registered profiles</p>
        </button>

        <button
          onClick={onOpenAddScheme}
          className="p-4 rounded-2xl glass-panel glass-panel-hover text-left space-y-1.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900">Add Company Scheme</h4>
          <p className="text-[11px] text-slate-500 leading-tight">Publish seeds, CHC, or subsidies</p>
        </button>

        <button
          onClick={onOpenAddAnnouncement}
          className="p-4 rounded-2xl glass-panel glass-panel-hover text-left space-y-1.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900">Publish Notice</h4>
          <p className="text-[11px] text-slate-500 leading-tight">Broadcast procurement tokens & advisories</p>
        </button>

        <button
          onClick={onOpenImportCsv}
          className="p-4 rounded-2xl glass-panel glass-panel-hover text-left space-y-1.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900">Import Farmer CSV</h4>
          <p className="text-[11px] text-slate-500 leading-tight">Upload new lots or re-sync dataset</p>
        </button>
      </div>

      {/* Two Column Recents Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Farmers */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-sm text-slate-900">Recently Added Farmers</h3>
            </div>
            <button
              onClick={() => onNavigate('farmers')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentFarmers.map((f) => (
              <div key={f.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{f.fullName}</span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                    <span>PSS: {f.pssId}</span>
                    <span>·</span>
                    <span>{f.village || f.center}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 block">
                    {f.totalQuantityQtl} Qtl
                  </span>
                  <span className="text-[11px] text-emerald-700 font-mono">
                    ₹{f.totalTradeValue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Lots */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-sm text-slate-900">Recent Procurement Lots (Kerwadi)</h3>
            </div>
            <button
              onClick={() => onNavigate('lots')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentLots.map((l) => (
              <div key={l.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{l.farmerName}</span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                    <span>Lot Ref: {l.lotRefNumber}</span>
                    <span>·</span>
                    <span>Bill #{l.billNumber}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 block">
                    {l.actualQuantity || l.quantity} Qtl ({l.noOfBags} Bags)
                  </span>
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded mt-0.5 ${
                      l.dispatchStatus === 'Confirmed Dispatch'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : l.dispatchStatus === 'Rejected Dispatch'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {l.dispatchStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
