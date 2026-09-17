import React, { useState } from 'react';
import { ScreenId, InspectionRecord } from '../types';
import { INITIAL_INSPECTIONS } from '../mockData';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';

interface EvidenceViewerScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedInspection: InspectionRecord | null;
}

export function EvidenceViewerScreen({ onNavigate, selectedInspection }: EvidenceViewerScreenProps) {
  const insp = selectedInspection || INITIAL_INSPECTIONS[0];
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedDeclIndex, setSelectedDeclIndex] = useState(0);

  const images = insp.images && insp.images.length > 0 ? insp.images : [
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800'
  ];

  const declarations = insp.declarations || [
    { declaration: 'Manufacturer / Packer', extractedValue: insp.manufacturer, confidence: 98, status: 'Passed', boundingBox: { x: 10, y: 15, w: 40, h: 10 } },
    { declaration: 'Net Quantity', extractedValue: insp.netQuantity, confidence: 96, status: 'Passed', boundingBox: { x: 60, y: 35, w: 30, h: 12 } },
    { declaration: 'Maximum Retail Price (MRP)', extractedValue: insp.mrp, confidence: 99, status: 'Passed', boundingBox: { x: 15, y: 65, w: 35, h: 10 } },
    { declaration: 'Consumer Care Details', extractedValue: '1800-425-9988', confidence: 89, status: 'Review', boundingBox: { x: 20, y: 80, w: 55, h: 12 } }
  ];

  const activeDecl = declarations[selectedDeclIndex] || declarations[0];

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('findings')}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Inspection Evidence Viewer</h2>
            <p className="text-xs text-slate-500">
              {insp.productName} ({insp.inspectionId}) &bull; OCR Bounding Box Inspection
            </p>
          </div>
        </div>

        {/* Zoom & Image controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.2))}
              className="p-1.5 hover:bg-white rounded text-slate-700 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium px-2 text-slate-700">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(2.0, zoomLevel + 0.2))}
              className="p-1.5 hover:bg-white rounded text-slate-700 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
            <button
              onClick={handlePrevImage}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
              title="Previous Photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-slate-600 px-2">
              {activeImageIdx + 1} / {images.length}
            </span>
            <button
              onClick={handleNextImage}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
              title="Next Photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Image, Right Declaration Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Package Photograph with Bounding Boxes */}
        <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden relative flex items-center justify-center p-6 min-h-[500px]">
          <div className="relative overflow-hidden transition-transform duration-200" style={{ transform: `scale(${zoomLevel})` }}>
            <img
              src={images[activeImageIdx]}
              alt="Product package evidence"
              className="max-h-[550px] object-contain rounded-lg shadow-2xl"
            />

            {/* Bounding Boxes overlay */}
            {declarations.map((decl: any, idx: number) => {
              const box = decl.boundingBox || { x: 15 + idx * 15, y: 20 + idx * 18, w: 35, h: 12 };
              const isSelected = selectedDeclIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDeclIndex(idx)}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.w}%`,
                    height: `${box.h}%`
                  }}
                  className={`absolute cursor-pointer rounded border-2 transition-all flex items-start p-1 ${
                    isSelected
                      ? 'border-blue-400 bg-blue-500/20 shadow-lg ring-2 ring-blue-400'
                      : 'border-emerald-400/70 bg-emerald-500/10 hover:border-emerald-400'
                  }`}
                >
                  <span className="bg-slate-900/90 text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow">
                    {decl.declaration} ({decl. confidence}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Detected Declaration Inspector */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-base font-semibold text-slate-950 pb-3 border-b border-slate-100">
              Detected Declaration
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Declaration Field
                </label>
                <p className="text-sm font-bold text-slate-900">{activeDecl.declaration}</p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Extracted Value
                </label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm text-slate-800">
                  {activeDecl.extractedValue}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    AI Confidence
                  </label>
                  <p className="text-base font-bold text-emerald-600">{activeDecl.confidence}%</p>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activeDecl.status === 'Passed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{activeDecl.status === 'Passed' ? 'Verified' : 'Needs Review'}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-3">Select another field to inspect location on package:</p>
              <div className="space-y-2">
                {declarations.map((decl: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDeclIndex(idx)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedDeclIndex === idx
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{decl.declaration}</span>
                    <span className="font-mono">{decl.confidence}%</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
