import React from 'react';
import { ScreenId, InspectionRecord } from '../types';
import { INITIAL_INSPECTIONS } from '../mockData';
import { CheckCircle2, Package, ArrowLeft, ShieldCheck, Calendar, FileText } from 'lucide-react';

interface ProductDetailsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedInspection: InspectionRecord | null;
}

export function ProductDetailsScreen({ onNavigate, selectedInspection }: ProductDetailsScreenProps) {
  const insp = selectedInspection || INITIAL_INSPECTIONS[0];
  const productInspections = INITIAL_INSPECTIONS.filter(i => i.productName.toLowerCase() === insp.productName.toLowerCase());

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Top Navigation / Back */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('history')}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-slate-900">Product Profile & Specifications</h2>
      </div>

      {/* Header Profile Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
            <img
              src={insp.images[0] || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800'}
              alt={insp.productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-slate-900">{insp.productName}</h3>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                insp.status === 'Compliant' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{insp.status}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Brand: <strong className="text-slate-800">{insp.brand}</strong> &bull; Packer: {insp.manufacturer}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('new_inspection')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs transition-colors shadow-sm"
          >
            Re-Inspect Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Product Info & Declarations Checklist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Information */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-semibold text-slate-900 pb-3 border-b border-slate-100">Product Information</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block uppercase font-medium">Brand</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{insp.brand}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium">Category</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{insp.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium">Net Quantity</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block font-mono">{insp.netQuantity}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium">MRP</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block font-mono">{insp.mrp}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium">Manufacturer</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{insp.manufacturer}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium">Batch Number</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block font-mono">{insp.batchNumber}</span>
              </div>
            </div>
          </div>

          {/* Declarations Checklist */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-semibold text-slate-900 pb-3 border-b border-slate-100">Mandatory Declarations Verification</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-medium text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Manufacturer / Packer Details
                </span>
                <span className="text-xs font-semibold text-emerald-600">Verified</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-medium text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Net Quantity Declaration
                </span>
                <span className="text-xs font-semibold text-emerald-600">Verified</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-medium text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Maximum Retail Price (MRP)
                </span>
                <span className="text-xs font-semibold text-emerald-600">Verified</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-medium text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Month and Year of Packing
                </span>
                <span className="text-xs font-semibold text-emerald-600">Verified</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-medium text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Consumer Care Helpline Details
                </span>
                <span className="text-xs font-semibold text-emerald-600">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Inspection History Timeline */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-semibold text-slate-900 pb-3 border-b border-slate-100">Inspection History</h3>
            <div className="space-y-4">
              {productInspections.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs relative pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.inspectionId}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-500">{item.date}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">Officer: {item.officer}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-semibold">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
