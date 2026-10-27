import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, CheckCircle2, AlertTriangle, Download, FileText } from 'lucide-react';
import { CsvValidationResult } from '../../types';
import { useData } from '../../context/DataContext';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CsvImportModal: React.FC<CsvImportModalProps> = ({ isOpen, onClose }) => {
  const { importCsvData } = useData();

  const [csvContent, setCsvContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [validationResult, setValidationResult] = useState<CsvValidationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setValidationResult(null);
    setImportSuccess(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvContent(text);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handlePreviewAndValidate = () => {
    if (!csvContent.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const result = importCsvData(csvContent);
      setValidationResult(result);
      setImportSuccess(true);
      setIsProcessing(false);
    }, 400);
  };

  const downloadErrorReport = () => {
    if (!validationResult || validationResult.errors.length === 0) return;

    const errorCsv = 'Row,Error,Details\n' + validationResult.errors.map((e) => `${e.row},"${e.error}","${e.rawData?.rowData || ''}"`).join('\n');
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + errorCsv);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Import_Errors_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-w-2xl w-full glass-dropdown p-6 sm:p-8 rounded-3xl border border-emerald-500/25 max-h-[90vh] overflow-y-auto space-y-6 text-slate-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Import Farmer & Procurement Lot CSV
              </h3>
              <span className="text-xs text-slate-500">
                Safe column mapping, duplicate detection, and audit reconciliation
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
            Or Select Local CSV File (UTF-8)
          </label>
          <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center space-y-2 bg-slate-50/50 transition-colors">
            <Upload className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-xs text-slate-600">
              <label className="font-semibold text-emerald-700 hover:underline cursor-pointer">
                <span>Browse file from computer</span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-slate-400 text-[11px] mt-1">Supports PSS Lot Entry formats with Marathi & English columns</p>
            </div>
            {fileName && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/70 text-emerald-900 font-mono text-xs font-bold mt-2">
                <FileText className="w-3.5 h-3.5" />
                <span>{fileName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Validation & Import Summary */}
        {validationResult && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
                <span>CSV Processing & Ingestion Report</span>
                {importSuccess && (
                  <span className="flex items-center gap-1 text-emerald-700 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Merged Successfully</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-bold">Total Rows</span>
                  <span className="text-base font-black font-mono text-slate-800">{validationResult.totalRows}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 block font-bold">Valid Lots</span>
                  <span className="text-base font-black font-mono text-emerald-900">{validationResult.validRows}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] text-blue-700 block font-bold">Master Farmers</span>
                  <span className="text-base font-black font-mono text-blue-900">{validationResult.importedFarmersCount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-amber-700 block font-bold">Duplicate Lots</span>
                  <span className="text-base font-black font-mono text-amber-900">{validationResult.duplicateRows}</span>
                </div>
              </div>

              {/* Errors if any */}
              {validationResult.errors.length > 0 && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-red-900 font-bold">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>{validationResult.errors.length} Invalid / Skipped Rows Detected</span>
                    </span>
                    <button
                      onClick={downloadErrorReport}
                      className="text-red-700 hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download Error Report</span>
                    </button>
                  </div>
                  <div className="max-h-24 overflow-y-auto space-y-1 text-[11px] text-red-700 font-mono">
                    {validationResult.errors.slice(0, 4).map((err, idx) => (
                      <div key={idx}>Row {err.row}: {err.error}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
          <span className="text-slate-400">
            {csvContent ? `${csvContent.split('\n').length} lines loaded` : 'No file loaded'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            {csvContent && !importSuccess && (
              <button
                onClick={handlePreviewAndValidate}
                disabled={isProcessing}
                className="px-5 py-2 text-xs font-bold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
              >
                {isProcessing ? 'Validating...' : 'Parse & Ingest CSV'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
