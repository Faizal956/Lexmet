import React from 'react';
import { ScreenId, InspectionRecord } from '../types';
import { INITIAL_INSPECTIONS } from '../mockData';
import { ArrowLeft, Download, Printer, Save, CheckCircle2, Shield } from 'lucide-react';

interface ReportPreviewScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedInspection: InspectionRecord | null;
}

export function ReportPreviewScreen({ onNavigate, selectedInspection }: ReportPreviewScreenProps) {
  const insp = selectedInspection || INITIAL_INSPECTIONS[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert(`Generating official PDF report for Inspection ${insp.inspectionId}... Download started.`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('findings')}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-slate-900">Official Inspection Report Preview</h2>
            <p className="text-xs text-slate-500">Legal Metrology Act, 2009 & Packaged Commodities Rules 2011</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Report saved to officer secure draft repository.')}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* A4 Document Container */}
      <div className="bg-white p-12 rounded-xl border border-slate-300 shadow-md max-w-[210mm] mx-auto space-y-8 text-slate-900 font-sans">
        {/* Document Header */}
        <div className="text-center border-b-2 border-slate-900 pb-6 space-y-2">
          <div className="flex items-center justify-center gap-2 text-blue-700 mb-1">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold tracking-wider uppercase text-slate-900">Government of India</h1>
          <h2 className="text-sm font-semibold tracking-wide text-slate-700">Department of Consumer Affairs — Legal Metrology Division</h2>
          <h3 className="text-base font-extrabold tracking-wide pt-2 text-slate-900">LEGAL METROLOGY INSPECTION & COMPLIANCE REPORT</h3>
          <p className="text-xs text-slate-500 font-mono">Issued under Rule 27 of Packaged Commodities Rules, 2011</p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block">Inspection ID:</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{insp.inspectionId}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Inspection Date:</span>
            <span className="font-semibold text-slate-900">{insp.date}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Inspecting Officer:</span>
            <span className="font-semibold text-slate-900">{insp.officer} (ID: LM-9082)</span>
          </div>
          <div>
            <span className="text-slate-500 block">Inspection Circle:</span>
            <span className="font-semibold text-slate-900">New Delhi Zone 4</span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1">
            1. Packaged Commodity Details
          </h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
            <div><span className="text-slate-500">Product Name:</span> <strong className="text-slate-900">{insp.productName}</strong></div>
            <div><span className="text-slate-500">Brand Name:</span> <strong className="text-slate-900">{insp.brand}</strong></div>
            <div><span className="text-slate-500">Manufacturer / Packer:</span> <strong className="text-slate-900">{insp.manufacturer}</strong></div>
            <div><span className="text-slate-500">Commodity Category:</span> <strong className="text-slate-900">{insp.category}</strong></div>
            <div><span className="text-slate-500">Declared MRP:</span> <strong className="text-slate-900 font-mono">{insp.mrp}</strong></div>
            <div><span className="text-slate-500">Declared Net Quantity:</span> <strong className="text-slate-900 font-mono">{insp.netQuantity}</strong></div>
            <div><span className="text-slate-500">Batch / Lot Number:</span> <strong className="text-slate-900 font-mono">{insp.batchNumber}</strong></div>
          </div>
        </div>

        {/* Declaration Verification Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1">
            2. Mandatory Declaration Verification Summary
          </h4>
          <table className="w-full text-left text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold">
                <th className="p-2.5 border border-slate-300">Statutory Requirement</th>
                <th className="p-2.5 border border-slate-300">Detected Value (OCR)</th>
                <th className="p-2.5 border border-slate-300">Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2.5 border border-slate-300 font-medium">Manufacturer / Packer Details</td>
                <td className="p-2.5 border border-slate-300 font-mono">{insp.manufacturer}</td>
                <td className="p-2.5 border border-slate-300 font-semibold text-emerald-700">Passed</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-slate-300 font-medium">Net Quantity Declaration</td>
                <td className="p-2.5 border border-slate-300 font-mono">{insp.netQuantity}</td>
                <td className="p-2.5 border border-slate-300 font-semibold text-emerald-700">Passed</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-slate-300 font-medium">Maximum Retail Price (MRP)</td>
                <td className="p-2.5 border border-slate-300 font-mono">{insp.mrp}</td>
                <td className="p-2.5 border border-slate-300 font-semibold text-emerald-700">Passed</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-slate-300 font-medium">Consumer Care Helpline</td>
                <td className="p-2.5 border border-slate-300 font-mono">1800-425-xxxx</td>
                <td className="p-2.5 border border-slate-300 font-semibold text-amber-700">Review Required</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Officer Notes & Conclusion */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1">
            3. Enforcement Officer Remarks & Conclusion
          </h4>
          <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs leading-relaxed text-slate-700">
            <p>
              Physical and digital OCR inspection performed at retail distribution center. The product packaging conforms substantially to Legal Metrology Packaged Commodities norms with minor advisory note issued regarding consumer care font prominence.
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-12 grid grid-cols-2 gap-8 text-xs">
          <div>
            <div className="h-12 border-b border-slate-400 mb-2"></div>
            <p className="font-bold text-slate-900">Rajesh Kumar</p>
            <p className="text-slate-500">Enforcement Officer, Legal Metrology</p>
          </div>
          <div className="text-right">
            <div className="h-12 border-b border-slate-400 mb-2"></div>
            <p className="font-bold text-slate-900">Authorized Signatory / Controller</p>
            <p className="text-slate-500">Central Compliance Directorate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
